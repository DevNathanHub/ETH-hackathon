//-----------------------IMPORTS & CONFIG----------------------------
const express = require('express');
const dotenv = require('dotenv');
const { Telegraf } = require('telegraf');
const mongoose = require('mongoose');
const axios = require('axios');
const cron = require('node-cron');
const { GoogleGenerativeAI } = require('@google/generative-ai');


dotenv.config();

const app = express();
const port = 3000;

const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
const api_key = process.env.MPESA_PAYMENT_KEY;
const payment_url = 'https://lipia-api.kreativelabske.com/api/request/stk';
const mongo_uri = process.env.MONGO_URI;
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

if (!telegramToken || !api_key || !mongo_uri) {
  console.error('Required environment variables are missing.');
  process.exit(1);
}

//-----------------------MONGODB CONFIG----------------------------

mongoose.connect(mongo_uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ Connected to MongoDB');
}).catch(err => {
  console.error('❌ MongoDB connection error:', err);
});

const userSchema = new mongoose.Schema({
  telegramId: { type: String, required: true, unique: true },
  phone: String,
  balance: { type: Number, default: 0 },
  transactions: [
    {
      type: { type: String }, // 'deposit', 'withdrawal', etc.
      amount: Number,
      date: { type: Date, default: Date.now },
      reference: String
    }
  ]
});

const User = mongoose.model('User', userSchema);

//-----------------------TELEGRAM BOT----------------------------

const bot = new Telegraf(telegramToken);

const mainMenu = `Welcome to ETH Wallet Services:
1. Send ETH
2. Withdraw ETH
3. Deposit ETH with M-Pesa
4. My Collections
5. Contact Support and Moderators
6. My Account

Please reply with a number (1-6) to continue.

If you need assistance, type /help or /cancel to stop the current action.

For any issues, contact support. @astrawrldke 
`;


const userStates = new Map(); // track user step e.g. awaiting phone




bot.start((ctx) => {
  ctx.reply(mainMenu);
  ctx.reply(`If you need assistance, type /help or /cancel to stop the current action. For any issues, contact support. @astrawrldke `)
  userStates.set(ctx.from.id, null);
});

async function fetchTrendingCoins() {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/search/trending');
    const coins = response.data.coins;
    return coins.map((c, i) => `${i + 1}. ${c.item.name} (${c.item.symbol}) - Rank: ${c.item.market_cap_rank}`);
  } catch (err) {
    console.error('❌ Failed to fetch trending coins:', err.message);
    return [];
  }
}

async function summarizeTrendingCoins(trendingList) {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

  const input = `Summarize the current cryptocurrency trends based on these coins:\n${trendingList.join('\n')}\n
  Provide a concise and friendly summary suitable for Telegram users. Don't forget to pursuade users gracefully to visit our site AfriNFT`;

  const result = await model.generateContent(input);
  return result.response.text().trim();
}

cron.schedule('*/1 * * * *', async () => {
  console.log('📊 Fetching trending crypto coins and summarizing...');

  try {
    const trendingList = await fetchTrendingCoins();

    if (trendingList.length === 0) return;

    const summary = await summarizeTrendingCoins(trendingList);
    const users = await User.find({});

    for (const user of users) {
      try {
        await bot.telegram.sendMessage(user.telegramId, summary, { parse_mode: 'Markdown' });        console.log(`✅ Sent summary to ${user.telegramId}`);
      } catch (err) {
        console.error(`❌ Failed to send message to ${user.telegramId}:`, err.message);
      }
    }
  } catch (err) {
    console.error('❌ Cron job failed:', err.message);
  }
});




bot.on('text', async (ctx) => {
  const userId = ctx.from.id;
  const input = ctx.message.text.trim();

  // Ignore if it's a command
  if (input.startsWith('/')) return;

  let session = userStates.get(userId) || {};

  // Step 1: Expecting phone
  if (session.step === 'awaiting_deposit_phone') {
    const phone = input.replace(/\s+/g, '');

    if (!/^07\d{8}$/.test(phone)) {
      ctx.reply('❌ Invalid phone number. Please enter a valid Safaricom number starting with 07...');
      return;
    }

    // Store valid phone in session
    session.phone = phone;
    session.step = 'awaiting_deposit_amount';
    userStates.set(userId, session);

    ctx.reply('✅ Phone number received.\nPlease enter the amount to deposit (e.g., 100):');
    return;
  }

  // Step 2: Expecting amount
  if (session.step === 'awaiting_deposit_amount' && session.phone) {
    const amount = parseFloat(input);

    if (isNaN(amount) || amount < 1) {
      ctx.reply('❌ Invalid amount. Please enter a valid number greater than 0.');
      return;
    }

    try {
      const response = await axios.post(payment_url, {
        phone: session.phone,
        amount
      }, {
        headers: {
          Authorization: `Bearer ${api_key}`
        }
      });

      const ref = response.data.data.refference;
      console.log('STK Push response:', response.data);
      // //convert deposit amount to Eth using coingecko API
      // //--TODO--
      // const ethRate = 2000; // Example rate, replace with actual API call
      // const ethAmount = amount / ethRate;

      // Fetch ETH to KES rate
    let ethAmount = 0;
    try {
      const ethRes = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
        params: {
          ids: 'ethereum',
          vs_currencies: 'kes'
        }
      });
    
      const ethRate = ethRes.data?.ethereum?.kes;
      console.log('ETH to KES rate:', ethRate);
    
      if (!ethRate) throw new Error('Invalid ETH rate from API');

      ethAmount = amount / ethRate; // Convert KES to ETH


      // Save to DB
      await User.findOneAndUpdate(
        { telegramId: userId.toString() },
        {
          telegramId: userId.toString(),
          phone: session.phone,
          $push: {
        transactions: {
          type: 'deposit',
          amount: ethAmount,
          reference: ref
        }
          },
          $inc: { balance: ethAmount }
        },
        { upsert: true, new: true }
      );

      ctx.reply(`Transaction of KES ${amount} to ${session.phone} Successful. Eth credited to your account.\nReference: ${ref}`);
    } catch (err) {
      console.error('STK error:', err.response?.data || err.message);
      ctx.reply(`❌ Failed to send STK push. ${err.response?.data?.message || 'Please try again.'}`);
    }

    userStates.delete(userId); // Reset session
    return;
  } catch (err) {
      console.error('Error fetching ETH rate:', err);
      ctx.reply('❌ Failed to fetch ETH rate. Please try again later.');
      return;
    }
  }




  switch (input) {
    case '1':
      ctx.reply('Coming soon! Stay tuned for updates on sending ETH.');

      break;
    case '2':
        ctx.reply('Coming soon! Stay tuned for updates on receiving ETH.');
        break;
    case '3':
      ctx.reply('📥 Deposit ETH with M-Pesa\nEnter your phone number (e.g., 2547xxxxxxx or 07xxxxxxx):');
      userStates.set(userId, { step: 'awaiting_deposit_phone' }); // FIXED LINE
      break;
    case '4':
        ctx.reply('Coming soon! Stay tuned for updates on buying Viewing NFT Collections .');
        break;
    case '5':
      ctx.reply('Contact Support and Moderators');
      break;
    case '6':
      const user = await User.findOne({ telegramId: userId.toString() });
      if (user) {
        ctx.reply(`👤 Account Info:\nPhone: ${user.phone}\nBalance: ${user.balance} ETH`);
      } else {
        ctx.reply('⚠️ No account info found. Try depositing first.');
      }
      break;
    default:
      ctx.reply('❌ Invalid option. Please enter a number between 1 and 6.');
      ctx.reply(mainMenu);
  }
});

//adding Start, Mini App, Cancel buttons persist
bot.hears('Cancel', (ctx) => {
  userStates.delete(ctx.from.id);
  ctx.reply('❌ Action cancelled. You can start over by typing "Start". \n /help for more options.');
});

bot.command('cancel', (ctx) => {
  userStates.delete(ctx.from.id);
  ctx.reply('❌ Action cancelled. You can start over by typing "Start".\n /help for more options.');
});



//  the help
bot.command('help', (ctx) => {
  ctx.reply(`ℹ️ Help Menu:
1. Send ETH - Send Ethereum to another user.
2. Withdraw ETH - Withdraw Ethereum to your M-Pesa.
3. Deposit ETH with M-Pesa - Deposit Ethereum using M-Pesa.
4. Buy Airtime - Purchase airtime using your balance.
5. My Collections - AfriNFT collections.
6. My Account - View your account details and balance.
Useful commands:
/start - Start the bot and view the main menu.
  /cancel - Cancel any ongoing action.
  /help - View this help menu again.
Please reply with a number (1-6) to continue or type /cancel to stop the current action.
\n\n
Note: Ensure your phone number is registered with M-Pesa for deposits and withdrawals to work.
\n
If you need assistance, type /help or /cancel to stop the current action.
For any issues, contact support. @astrawrldke `);
}
);



bot.launch().then(() => {
  console.log('✅ Telegram bot is running...');
}).catch(err => {
  console.error('❌ Failed to start the Telegram bot:', err);
});

//-----------------------EXPRESS APP----------------------------

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`🚀 Server is running at http://localhost:${port}`);
});
