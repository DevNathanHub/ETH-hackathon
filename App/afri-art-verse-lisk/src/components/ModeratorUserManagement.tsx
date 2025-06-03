
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Users, Ban, Shield, Eye } from "lucide-react";

export const ModeratorUserManagement = () => {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    // Extract user data from localStorage
    const allKeys = Object.keys(localStorage);
    const userMap = new Map();

    // Get users from artwork creation
    const artworkKeys = allKeys.filter(key => key.startsWith('artworks_'));
    artworkKeys.forEach(key => {
      const walletAddress = key.replace('artworks_', '');
      const artworks = JSON.parse(localStorage.getItem(key) || '[]');
      
      if (artworks.length > 0) {
        userMap.set(walletAddress, {
          address: walletAddress,
          role: 'Artist',
          artworksCount: artworks.length,
          ordersCount: 0,
          status: 'active',
          joinDate: new Date().toISOString()
        });
      }
    });

    // Get users from orders
    const orderKeys = allKeys.filter(key => key.startsWith('buyer_orders_'));
    orderKeys.forEach(key => {
      const walletAddress = key.replace('buyer_orders_', '');
      const orders = JSON.parse(localStorage.getItem(key) || '[]');
      
      if (orders.length > 0) {
        if (userMap.has(walletAddress)) {
          userMap.get(walletAddress).ordersCount = orders.length;
          userMap.get(walletAddress).role = 'Artist & Buyer';
        } else {
          userMap.set(walletAddress, {
            address: walletAddress,
            role: 'Buyer',
            artworksCount: 0,
            ordersCount: orders.length,
            status: 'active',
            joinDate: new Date().toISOString()
          });
        }
      }
    });

    setUsers(Array.from(userMap.values()));
  }, []);

  const handleBanUser = (userAddress: string) => {
    setUsers(prev => prev.map(user => 
      user.address === userAddress 
        ? { ...user, status: user.status === 'banned' ? 'active' : 'banned' }
        : user
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'default';
      case 'banned':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Artist':
        return 'bg-purple-100 text-purple-800';
      case 'Buyer':
        return 'bg-blue-100 text-blue-800';
      case 'Artist & Buyer':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-6">User Management</h2>
      
      {users.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No Users Found</h3>
            <p className="text-gray-500">Users will appear here as they join the platform</p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Platform Users</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Wallet Address</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Artworks</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.address}>
                    <TableCell>
                      <div className="font-mono text-sm">
                        {user.address.slice(0, 8)}...{user.address.slice(-6)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getRoleColor(user.role)}>
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.artworksCount}</TableCell>
                    <TableCell>{user.ordersCount}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(user.status)}>
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="text-xs"
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          View
                        </Button>
                        <Button 
                          size="sm" 
                          variant={user.status === 'banned' ? 'default' : 'destructive'}
                          onClick={() => handleBanUser(user.address)}
                          className="text-xs"
                        >
                          {user.status === 'banned' ? (
                            <>
                              <Shield className="w-3 h-3 mr-1" />
                              Unban
                            </>
                          ) : (
                            <>
                              <Ban className="w-3 h-3 mr-1" />
                              Ban
                            </>
                          )}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
