
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArtworkGrid } from "@/components/ArtworkGrid";
import { OrdersTable } from "@/components/OrdersTable";
import { ShoppingBag, Package, Heart, TrendingUp } from "lucide-react";

interface BuyerDashboardProps {
  walletAddress: string;
}

export const BuyerDashboard = ({ walletAddress }: BuyerDashboardProps) => {
  const [allArtworks, setAllArtworks] = useState<any[]>([]);
  const [myOrders, setMyOrders] = useState<any[]>([]);
  const [myCollection, setMyCollection] = useState<any[]>([]);

  useEffect(() => {
    // Load all artworks from all artists
    const allKeys = Object.keys(localStorage);
    const artworkKeys = allKeys.filter(key => key.startsWith('artworks_'));
    let allArt: any[] = [];
    
    artworkKeys.forEach(key => {
      const artworks = JSON.parse(localStorage.getItem(key) || '[]');
      allArt = [...allArt, ...artworks];
    });
    
    setAllArtworks(allArt);

    // Load buyer's orders
    const savedOrders = localStorage.getItem(`buyer_orders_${walletAddress}`);
    if (savedOrders) {
      setMyOrders(JSON.parse(savedOrders));
    }

    // Load buyer's collection (owned NFTs)
    const savedCollection = localStorage.getItem(`collection_${walletAddress}`);
    if (savedCollection) {
      setMyCollection(JSON.parse(savedCollection));
    }
  }, [walletAddress]);

  const handlePurchase = (artwork: any) => {
    const newOrder = {
      id: Date.now().toString(),
      artworkId: artwork.id,
      buyerAddress: walletAddress,
      sellerAddress: artwork.creator,
      price: artwork.price,
      status: "pending",
      timestamp: new Date().toISOString(),
      artwork: artwork
    };

    // Add to buyer's orders
    const updatedOrders = [...myOrders, newOrder];
    setMyOrders(updatedOrders);
    localStorage.setItem(`buyer_orders_${walletAddress}`, JSON.stringify(updatedOrders));

    // Add to seller's orders
    const sellerOrders = JSON.parse(localStorage.getItem(`orders_${artwork.creator}`) || '[]');
    sellerOrders.push(newOrder);
    localStorage.setItem(`orders_${artwork.creator}`, JSON.stringify(sellerOrders));

    // Update wallet balance
    const currentBalance = parseInt(localStorage.getItem("walletBalance") || "1000");
    const newBalance = currentBalance - artwork.price;
    localStorage.setItem("walletBalance", newBalance.toString());
  };

  const handleBurnNFT = (orderId: string) => {
    // Mark NFT as burned (physical artwork delivered)
    const updatedOrders = myOrders.map(order => 
      order.id === orderId ? { ...order, status: "completed", burned: true } : order
    );
    setMyOrders(updatedOrders);
    localStorage.setItem(`buyer_orders_${walletAddress}`, JSON.stringify(updatedOrders));

    // Update seller's orders
    const order = myOrders.find(o => o.id === orderId);
    if (order) {
      const sellerOrders = JSON.parse(localStorage.getItem(`orders_${order.sellerAddress}`) || '[]');
      const updatedSellerOrders = sellerOrders.map((o: any) => 
        o.id === orderId ? { ...o, status: "completed", burned: true } : o
      );
      localStorage.setItem(`orders_${order.sellerAddress}`, JSON.stringify(updatedSellerOrders));
    }
  };

  const stats = {
    totalPurchases: myOrders.length,
    completedOrders: myOrders.filter(o => o.status === "completed").length,
    pendingOrders: myOrders.filter(o => o.status === "pending").length,
    totalSpent: myOrders.reduce((sum, o) => sum + o.price, 0)
  };

  const availableArtworks = allArtworks.filter(art => 
    art.creator !== walletAddress && art.available
  );

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Purchases</p>
                <p className="text-2xl font-bold text-blue-600">{stats.totalPurchases}</p>
              </div>
              <ShoppingBag className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-green-600">{stats.completedOrders}</p>
              </div>
              <Package className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pendingOrders}</p>
              </div>
              <Heart className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Spent</p>
                <p className="text-2xl font-bold text-red-600">{stats.totalSpent} LSK</p>
              </div>
              <TrendingUp className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="marketplace" className="w-full">
        <TabsList>
          <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
          <TabsTrigger value="orders">My Orders</TabsTrigger>
          <TabsTrigger value="collection">My Collection</TabsTrigger>
        </TabsList>
        
        <TabsContent value="marketplace" className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-6">Available Artworks</h2>
            <ArtworkGrid 
              artworks={availableArtworks} 
              isOwner={false}
              onPurchase={handlePurchase}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="orders">
          <div>
            <h2 className="text-2xl font-semibold mb-6">My Orders</h2>
            <OrdersTable 
              orders={myOrders} 
              onBurn={handleBurnNFT}
              isOwner={false}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="collection">
          <div>
            <h2 className="text-2xl font-semibold mb-6">My Collection</h2>
            <ArtworkGrid artworks={myCollection} isOwner={false} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
