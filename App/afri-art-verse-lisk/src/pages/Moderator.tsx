
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WalletConnection } from "@/components/WalletConnection";
import { ModeratorArtworkReview } from "@/components/ModeratorArtworkReview";
import { ModeratorUserManagement } from "@/components/ModeratorUserManagement";
import { ModeratorStats } from "@/components/ModeratorStats";
import { Shield, AlertTriangle, Users, BarChart3 } from "lucide-react";

const Moderator = () => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [isModerator, setIsModerator] = useState(false);

  useEffect(() => {
    const savedWallet = localStorage.getItem("walletAddress");
    if (savedWallet) {
      setWalletAddress(savedWallet);
      setWalletConnected(true);
      
      // Check if user is moderator (simple check for demo)
      const moderators = JSON.parse(localStorage.getItem("moderators") || '["0x1234567890abcdef"]');
      setIsModerator(moderators.includes(savedWallet));
    }
  }, []);

  if (!walletConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
        <div className="container mx-auto px-6 py-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Moderator Panel
              </h1>
              <p className="text-gray-600 mt-2">Marketplace Content Management</p>
            </div>
            <WalletConnection 
              walletConnected={walletConnected}
              walletAddress={walletAddress}
              onConnect={setWalletConnected}
              onAddressChange={setWalletAddress}
            />
          </div>
          
          <div className="text-center py-20">
            <Shield className="w-16 h-16 text-purple-600 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Connect Your Wallet to Continue
            </h2>
            <p className="text-gray-600 mb-8">
              Please connect your wallet to access the moderator panel
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!isModerator) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center py-20">
            <AlertTriangle className="w-16 h-16 text-red-600 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Access Denied
            </h2>
            <p className="text-gray-600 mb-8">
              You don't have moderator privileges to access this panel
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Moderator Panel
            </h1>
            <p className="text-gray-600 mt-2">Marketplace Content Management</p>
          </div>
          <WalletConnection 
            walletConnected={walletConnected}
            walletAddress={walletAddress}
            onConnect={setWalletConnected}
            onAddressChange={setWalletAddress}
          />
        </div>

        <Tabs defaultValue="stats" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="stats" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Statistics
            </TabsTrigger>
            <TabsTrigger value="artworks" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Artwork Review
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              User Management
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Reports
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="stats">
            <ModeratorStats />
          </TabsContent>
          
          <TabsContent value="artworks">
            <ModeratorArtworkReview />
          </TabsContent>
          
          <TabsContent value="users">
            <ModeratorUserManagement />
          </TabsContent>
          
          <TabsContent value="reports">
            <div className="text-center py-20">
              <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">No Reports</h3>
              <p className="text-gray-500">User reports will appear here when submitted</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Moderator;
