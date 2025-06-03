
import { Card, CardContent } from "@/components/ui/card";
import { 
  Upload, 
  Coins, 
  ShoppingCart, 
  Package,
  ArrowRight,
  CheckCircle
} from "lucide-react";

export const HowItWorks = () => {
  const steps = [
    {
      icon: <Upload className="w-12 h-12 text-orange-600" />,
      title: "1. Mint Your Art",
      description: "Artists upload high-quality images of their physical artwork and create NFTs with detailed metadata.",
      details: ["Upload artwork photos", "Add description & story", "Set royalty percentage", "Mint on Lisk blockchain"]
    },
    {
      icon: <ShoppingCart className="w-12 h-12 text-red-600" />,
      title: "2. List & Sell",
      description: "Set your price in LSK tokens and list your NFT on our global marketplace for instant discovery.",
      details: ["Set LSK price", "Choose auction or fixed price", "Global marketplace listing", "Instant visibility"]
    },
    {
      icon: <Coins className="w-12 h-12 text-yellow-600" />,
      title: "3. Earn Royalties",
      description: "Every time your NFT is resold, you automatically receive royalties directly to your Lisk wallet.",
      details: ["Automatic royalty payments", "Forever passive income", "Direct to your wallet", "No intermediaries"]
    },
    {
      icon: <Package className="w-12 h-12 text-green-600" />,
      title: "4. Physical Redemption",
      description: "NFT holders can redeem their tokens for the actual physical artwork through our verified system.",
      details: ["Verified redemption process", "Secure shipping", "Authenticity certificates", "Blockchain tracking"]
    }
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-gray-50 to-orange-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            How AfriNFT Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From creation to collection, we've streamlined the entire process to make 
            NFT creation and trading accessible to everyone.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {steps.map((step, index) => (
            <div key={index} className="flex items-start space-x-6">
              <Card className="group hover:shadow-xl transition-all duration-300 w-full border-0">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-6">
                    <div className="flex-shrink-0 mb-4 group-hover:scale-110 transition-transform duration-300">
                      {step.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-800 mb-3">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {step.description}
                      </p>
                      <ul className="space-y-2">
                        {step.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex items-center text-sm text-gray-500">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
              {index < steps.length - 1 && index % 2 === 0 && (
                <div className="hidden lg:flex items-center justify-center w-8">
                  <ArrowRight className="w-6 h-6 text-orange-400" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Process Flow Visualization */}
        <div className="bg-white rounded-3xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">
            Seamless Integration with Lisk Ecosystem
          </h3>
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-orange-600 font-bold text-xl">LSK</span>
              </div>
              <p className="text-sm text-gray-600">Lisk Token Payments</p>
            </div>
            <ArrowRight className="w-6 h-6 text-gray-400 hidden md:block" />
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Package className="w-8 h-8 text-red-600" />
              </div>
              <p className="text-sm text-gray-600">Smart Contracts</p>
            </div>
            <ArrowRight className="w-6 h-6 text-gray-400 hidden md:block" />
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <p className="text-sm text-gray-600">Instant Settlement</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
