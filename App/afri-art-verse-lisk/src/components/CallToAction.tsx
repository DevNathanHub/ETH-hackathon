
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Users, 
  Code, 
  Palette, 
  MessageSquare, 
  ArrowRight,
  Github,
  Mail,
  Globe
} from "lucide-react";

export const CallToAction = () => {
  const roles = [
    {
      icon: <Code className="w-8 h-8 text-blue-600" />,
      title: "Smart Contract Developers",
      description: "Help build Lisk modules for NFTs, royalties, and redemption systems",
      skills: ["Lisk SDK", "JavaScript", "Blockchain"],
      color: "from-blue-100 to-blue-50"
    },
    {
      icon: <Palette className="w-8 h-8 text-purple-600" />,
      title: "UI/UX Designers",
      description: "Design intuitive marketplace flows and mobile-responsive interfaces",
      skills: ["UI Design", "UX Research", "Mobile Design"],
      color: "from-purple-100 to-purple-50"
    },
    {
      icon: <Users className="w-8 h-8 text-green-600" />,
      title: "Backend Developers",
      description: "Build escrow systems, KYC integration, and redemption tracking",
      skills: ["Node.js", "API Design", "Database"],
      color: "from-green-100 to-green-50"
    },
    {
      icon: <MessageSquare className="w-8 h-8 text-orange-600" />,
      title: "Community & Growth",
      description: "Drive outreach across Africa and diaspora communities",
      skills: ["Marketing", "Community", "Social Media"],
      color: "from-orange-100 to-orange-50"
    }
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
      <div className="container mx-auto max-w-6xl">
        {/* Main CTA Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
            Join the Revolution
          </h2>
          <p className="text-xl md:text-2xl opacity-90 max-w-4xl mx-auto mb-8">
            Help us build the future of African art on the blockchain. 
            We're looking for passionate developers, designers, and community builders 
            to make AfriNFT a reality at ETHGlobal ETH Brigade 2025.
          </p>
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 rounded-full text-lg font-medium">
            🎯 Goal: Working MVP on Lisk Blockchain
          </div>
        </div>

        {/* Roles We Need */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-12">We Need Your Skills</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {roles.map((role, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/15 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      {role.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold mb-2">{role.title}</h4>
                      <p className="text-white/80 mb-4 text-sm">{role.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {role.skills.map((skill, skillIndex) => (
                          <span 
                            key={skillIndex}
                            className="px-3 py-1 bg-white/20 rounded-full text-xs"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Information */}
        <Card className="bg-gradient-to-r from-orange-600 to-red-600 border-0 mb-12">
          <CardContent className="p-8 md:p-12 text-center">
            <h3 className="text-3xl font-bold mb-6">Ready to Build the Future?</h3>
            <p className="text-xl mb-8 opacity-90">
              Connect with us and be part of the team that revolutionizes African art through blockchain technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg"
                className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-4 text-lg rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <Mail className="w-5 h-5 mr-2" />
                Contact Team
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 text-lg rounded-full transition-all duration-300"
              >
                <Github className="w-5 h-5 mr-2" />
                View on GitHub
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Final Message */}
        <div className="text-center">
          <div className="inline-flex items-center space-x-4 text-lg">
            <Globe className="w-6 h-6 text-orange-400" />
            <span className="opacity-90">Building bridges between African creativity and global opportunities</span>
            <ArrowRight className="w-6 h-6 text-orange-400" />
          </div>
        </div>
      </div>
    </section>
  );
};
