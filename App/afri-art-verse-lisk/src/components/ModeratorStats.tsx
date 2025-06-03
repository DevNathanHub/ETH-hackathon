
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Palette, ShoppingBag, Users, AlertTriangle, TrendingUp, Clock } from "lucide-react";

export const ModeratorStats = () => {
  const [stats, setStats] = useState({
    totalArtworks: 0,
    pendingArtworks: 0,
    totalOrders: 0,
    totalUsers: 0,
    reportedItems: 0,
    totalVolume: 0
  });

  useEffect(() => {
    // Calculate stats from localStorage
    const allKeys = Object.keys(localStorage);
    
    // Count all artworks
    const artworkKeys = allKeys.filter(key => key.startsWith('artworks_'));
    let totalArtworks = 0;
    let pendingArtworks = 0;
    
    artworkKeys.forEach(key => {
      const artworks = JSON.parse(localStorage.getItem(key) || '[]');
      totalArtworks += artworks.length;
      pendingArtworks += artworks.filter((art: any) => art.status === 'pending').length;
    });

    // Count all orders
    const orderKeys = allKeys.filter(key => key.startsWith('orders_') || key.startsWith('buyer_orders_'));
    let totalOrders = 0;
    let totalVolume = 0;
    
    orderKeys.forEach(key => {
      const orders = JSON.parse(localStorage.getItem(key) || '[]');
      totalOrders += orders.length;
      totalVolume += orders.reduce((sum: number, order: any) => sum + order.price, 0);
    });

    // Count unique users (wallet addresses)
    const walletKeys = allKeys.filter(key => key.includes('_0x') || key.includes('walletAddress'));
    const totalUsers = new Set(walletKeys.map(key => key.split('_').pop())).size;

    setStats({
      totalArtworks,
      pendingArtworks,
      totalOrders,
      totalUsers,
      reportedItems: 0, // Placeholder for reports
      totalVolume
    });
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-6">Platform Statistics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Artworks</p>
                <p className="text-2xl font-bold text-purple-600">{stats.totalArtworks}</p>
              </div>
              <Palette className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Review</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pendingArtworks}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-blue-600">{stats.totalOrders}</p>
              </div>
              <ShoppingBag className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-green-600">{stats.totalUsers}</p>
              </div>
              <Users className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Volume Traded</p>
                <p className="text-2xl font-bold text-indigo-600">{stats.totalVolume} LSK</p>
              </div>
              <TrendingUp className="w-8 h-8 text-indigo-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Reported Items</p>
                <p className="text-2xl font-bold text-red-600">{stats.reportedItems}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
