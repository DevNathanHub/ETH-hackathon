
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MintNFTForm } from "@/components/MintNFTForm";
import { ArtworkGrid } from "@/components/ArtworkGrid";
import { OrdersTable } from "@/components/OrdersTable";
import { Plus, Palette, Package, TrendingUp } from "lucide-react";

interface SellerDashboardProps {
  walletAddress: string;
}

export const SellerDashboard = ({ walletAddress }: SellerDashboardProps) => {
  const [artworks, setArtworks] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [showMintForm, setShowMintForm] = useState(false);

  useEffect(() => {
    const savedArtworks = localStorage.getItem(`artworks_${walletAddress}`);
    const savedOrders = localStorage.getItem(`orders_${walletAddress}`);
    
    if (savedArtworks) {
      setArtworks(JSON.parse(savedArtworks));
    }
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, [walletAddress]);

  const handleMintSuccess = (newArtwork: any) => {
    const updatedArtworks = [...artworks, newArtwork];
    setArtworks(updatedArtworks);
    localStorage.setItem(`artworks_${walletAddress}`, JSON.stringify(updatedArtworks));
    setShowMintForm(false);
  };

  const handleApproveOrder = (orderId: string) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId ? { ...order, status: "approved" } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem(`orders_${walletAddress}`, JSON.stringify(updatedOrders));
  };

  const stats = {
    totalArtworks: artworks.length,
    totalSales: orders.filter(o => o.status === "completed").length,
    pendingOrders: orders.filter(o => o.status === "pending").length,
    totalEarnings: orders
      .filter(o => o.status === "completed")
      .reduce((sum, o) => sum + o.price, 0)
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Artworks</p>
                <p className="text-2xl font-bold text-orange-600">{stats.totalArtworks}</p>
              </div>
              <Palette className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Sales</p>
                <p className="text-2xl font-bold text-green-600">{stats.totalSales}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Orders</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pendingOrders}</p>
              </div>
              <Package className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Earnings</p>
                <p className="text-2xl font-bold text-blue-600">{stats.totalEarnings} LSK</p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="artworks" className="w-full">
        <TabsList>
          <TabsTrigger value="artworks">My Artworks</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
        </TabsList>
        
        <TabsContent value="artworks" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">My Artworks</h2>
            <Button 
              onClick={() => setShowMintForm(true)}
              className="bg-gradient-to-r from-orange-600 to-red-600"
            >
              <Plus className="w-4 h-4 mr-2" />
              Mint New NFT
            </Button>
          </div>
          
          {showMintForm && (
            <MintNFTForm 
              onSuccess={handleMintSuccess}
              onCancel={() => setShowMintForm(false)}
              walletAddress={walletAddress}
            />
          )}
          
          <ArtworkGrid artworks={artworks} isOwner={true} />
        </TabsContent>
        
        <TabsContent value="orders">
          <div>
            <h2 className="text-2xl font-semibold mb-6">Orders</h2>
            <OrdersTable 
              orders={orders} 
              onApprove={handleApproveOrder}
              isOwner={true}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
