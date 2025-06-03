
import { Card, CardContent } from "@/components/ui/card";
import { 
  Code, 
  Zap, 
  Shield, 
  Smartphone,
  Database,
  Globe,
  Cpu,
  Lock
} from "lucide-react";

export const TechStack = () => {
  const technologies = [
    {
      icon: <Code className="w-8 h-8 text-blue-600" />,
      name: "Lisk SDK",
      description: "JavaScript-native blockchain for seamless NFT modules and smart contracts",
      color: "from-blue-100 to-blue-50"
    },
    {
      icon: <Globe className="w-8 h-8 text-cyan-600" />,
      name: "React.js Frontend",
      description: "Modern, responsive web application with intuitive user experience",
      color: "from-cyan-100 to-cyan-50"
    },
    {
      icon: <Lock className="w-8 h-8 text-green-600" />,
      name: "Lisk Wallet",
      description: "Secure wallet integration for LSK transactions and NFT management",
      color: "from-green-100 to-green-50"
    },
    {
      icon: <Database className="w-8 h-8 text-purple-600" />,
      name: "IPFS Hybrid Storage",
      description: "Decentralized metadata storage ensuring permanence and accessibility",
      color: "from-purple-100 to-purple-50"
    },
    {
      icon: <Shield className="w-8 h-8 text-red-600" />,
      name: "Smart Contracts",
      description: "Automated royalty distribution and escrow for physical redemption",
      color: "from-red-100 to-red-50"
    },
    {
      icon: <Smartphone className="w-8 h-8 text-orange-600" />,
      name: "Mobile Responsive",
      description: "Optimized for mobile devices to reach artists across Africa",
      color: "from-orange-100 to-orange-50"
    }
  ];

  const features = [
    {
      icon: <Zap className="w-6 h-6 text-yellow-600" />,
      title: "Lightning Fast",
      value: "Sub-second transactions"
    },
    {
      icon: <Cpu className="w-6 h-6 text-blue-600" />,
      title: "Low Cost",
      value: "Minimal gas fees"
    },
    {
      icon: <Shield className="w-6 h-6 text-green-600" />,
      title: "Secure",
      value: "Blockchain verified"
    },
    {
      icon: <Code className="w-6 h-6 text-purple-600" />,
      title: "Developer Friendly",
      value: "JavaScript native"
    }
  ];

  return (
    <section className="py-20 px-6 bg-white">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Built on Cutting-Edge Technology
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Leveraging Lisk's developer-first blockchain ecosystem to create a fast, 
            secure, and cost-effective NFT marketplace designed for African artists.
          </p>
        </div>

        {/* Lisk Highlight */}
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white mb-16 border-0">
          <CardContent className="p-8 md:p-12 text-center">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Code className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-3xl font-bold mb-4">Powered by Lisk Blockchain</h3>
            <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
              The first JavaScript-native blockchain that makes development accessible, 
              transactions affordable, and scaling effortless — perfect for empowering African creators.
            </p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-2">
                    {feature.icon}
                  </div>
                  <div className="font-semibold text-sm">{feature.title}</div>
                  <div className="text-xs opacity-80">{feature.value}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Technology Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {technologies.map((tech, index) => (
            <Card 
              key={index}
              className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0"
            >
              <CardContent className={`p-6 bg-gradient-to-br ${tech.color} h-full`}>
                <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                  {tech.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-3">
                  {tech.name}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {tech.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* ETH Global Badge */}
        <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">
              🚀 Building at ETHGlobal ETH Brigade 2025
            </h3>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Join us in creating a working Lisk-based MVP that will revolutionize how African artists 
              connect with global markets through blockchain technology.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
