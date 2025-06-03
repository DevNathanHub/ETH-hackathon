import React from 'react';

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with African-inspired gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-100 via-red-50 to-yellow-100" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-orange-300 rounded-full opacity-20 animate-pulse" />
      <div className="absolute bottom-20 right-10 w-24 h-24 bg-red-300 rounded-full opacity-30 animate-bounce" />
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-yellow-300 rounded-full opacity-25 animate-ping" />
      
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-yellow-600 bg-clip-text text-transparent mb-6">
          AfriNFT
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-700 mb-4 font-medium">
          Empowering African Artists Through Blockchain
        </p>
        
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          A decentralized marketplace where African artists mint, sell, and trade their physical artwork as NFTs on the Lisk blockchain. Connect directly with collectors worldwide.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <a
            href="/marketplace"
            className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            Enter Marketplace
          </a>
          
          <a
            href="#how-it-works"
            className="border-2 border-orange-600 text-orange-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange-50 transition-all duration-300"
          >
            Learn More
          </a>
          
          <a
            href="/moderator"
            className="border-2 border-purple-600 text-purple-600 px-6 py-3 rounded-lg font-medium text-sm hover:bg-purple-50 transition-all duration-300"
          >
            Moderator Panel
          </a>
        </div>
        
        <div className="flex justify-center items-center gap-8 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>Built on Lisk</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span>Low Gas Fees</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
            <span>Artist Royalties</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
