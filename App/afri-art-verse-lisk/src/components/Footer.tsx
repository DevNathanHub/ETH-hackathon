
import { 
  Github, 
  Twitter, 
  MessageCircle, 
  Mail,
  Globe,
  Heart
} from "lucide-react";

export const Footer = () => {
  const links = {
    product: [
      "Marketplace",
      "For Artists",
      "For Collectors",
      "Roadmap"
    ],
    resources: [
      "Documentation",
      "API Reference",
      "Community",
      "Support"
    ],
    company: [
      "About Us",
      "Team",
      "Careers",
      "Press Kit"
    ]
  };

  const socialLinks = [
    { icon: <Twitter className="w-5 h-5" />, label: "Twitter", href: "#" },
    { icon: <Github className="w-5 h-5" />, label: "GitHub", href: "#" },
    { icon: <MessageCircle className="w-5 h-5" />, label: "Discord", href: "#" },
    { icon: <Mail className="w-5 h-5" />, label: "Email", href: "#" }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-4">
              AfriNFT
            </h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Empowering African artists through decentralized blockchain technology. 
              Built on Lisk for fast, affordable, and secure NFT transactions.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a 
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors duration-300"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-semibold mb-4 text-orange-400">Product</h4>
            <ul className="space-y-2">
              {links.product.map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="font-semibold mb-4 text-orange-400">Resources</h4>
            <ul className="space-y-2">
              {links.resources.map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold mb-4 text-orange-400">Company</h4>
            <ul className="space-y-2">
              {links.company.map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ETH Global Section */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="text-center">
            <div className="inline-flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-orange-600/20 to-red-600/20 rounded-full border border-orange-600/30">
              <Globe className="w-5 h-5 text-orange-400" />
              <span className="text-sm">Building at ETHGlobal ETH Brigade 2025</span>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2025 AfriNFT. Built with <Heart className="w-4 h-4 inline text-red-500" /> for African artists.
          </div>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
