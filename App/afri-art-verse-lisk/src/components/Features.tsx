
import { Card, CardContent } from "@/components/ui/card";
import { 
  Coins, 
  Shield, 
  Globe, 
  Repeat, 
  Zap, 
  Heart,
  TrendingUp,
  Lock
} from "lucide-react";

export const Features = () => {
  const features = [
    {
      icon: <Coins className="w-8 h-8 text-orange-600" />,
      title: "Zero Platform Fees",
      description: "Artists keep 100% of their initial sales. No hidden charges, no exploitative cuts.",
      gradient: "from-orange-100 to-orange-50"
    },
    {
      icon: <Repeat className="w-8 h-8 text-red-600" />,
      title: "Automated Royalties",
      description: "Earn forever from secondary sales with smart contract-enforced royalty payments.",
      gradient: "from-red-100 to-red-50"
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-600" />,
      title: "Lightning Fast & Cheap",
      description: "Built on Lisk for sub-second transactions with minimal fees using LSK tokens.",
      gradient: "from-yellow-100 to-yellow-50"
    },
    {
      icon: <Shield className="w-8 h-8 text-green-600" />,
      title: "Verified Authenticity",
      description: "Blockchain-verified provenance and authenticity for every piece of art.",
      gradient: "from-green-100 to-green-50"
    },
    {
      icon: <Globe className="w-8 h-8 text-blue-600" />,
      title: "Global Marketplace",
      description: "Connect African artists with collectors worldwide, breaking geographical barriers.",
      gradient: "from-blue-100 to-blue-50"
    },
    {
      icon: <Lock className="w-8 h-8 text-purple-600" />,
      title: "Physical Redemption",
      description: "Unique system allowing NFT holders to claim the actual physical artwork.",
      gradient: "from-purple-100 to-purple-50"
    }
  ];

  return (
    <section className="py-20 px-6 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Why Choose AfriNFT?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're revolutionizing how African art reaches the world, ensuring artists are fairly 
            compensated and collectors get authentic, verifiable pieces.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 overflow-hidden"
            >
              <CardContent className={`p-8 bg-gradient-to-br ${feature.gradient} h-full`}>
                <div className="mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to action within features */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-full font-medium hover:shadow-lg transition-all duration-300 cursor-pointer">
            <Heart className="w-5 h-5 mr-2" />
            Built for African Artists, By African Innovators
          </div>
        </div>
      </div>
    </section>
  );
};
