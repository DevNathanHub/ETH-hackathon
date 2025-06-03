
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Clock, Package, Flame } from "lucide-react";

interface OrdersTableProps {
  orders: any[];
  onApprove?: (orderId: string) => void;
  onBurn?: (orderId: string) => void;
  isOwner: boolean;
}

export const OrdersTable = ({ orders, onApprove, onBurn, isOwner }: OrdersTableProps) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case "approved":
        return <Package className="w-4 h-4 text-blue-600" />;
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "default";
      case "approved":
        return "secondary";
      case "completed":
        return "default";
      default:
        return "secondary";
    }
  };

  if (orders.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">No Orders Yet</h3>
          <p className="text-gray-500">
            {isOwner ? "Orders will appear here when buyers purchase your artwork" : "Your purchases will appear here"}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isOwner ? "Incoming Orders" : "Purchase History"}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Artwork</TableHead>
              <TableHead>{isOwner ? "Buyer" : "Seller"}</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    {order.artwork?.image ? (
                      <img 
                        src={order.artwork.image} 
                        alt={order.artwork.title}
                        className="w-12 h-12 rounded object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                        <Package className="w-6 h-6 text-gray-400" />
                      </div>
                    )}
                    <div>
                      <p className="font-medium">{order.artwork?.title || "Unknown Artwork"}</p>
                      <p className="text-xs text-gray-500">#{order.artworkId}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="font-mono text-xs">
                    {isOwner ? 
                      `${order.buyerAddress.slice(0, 6)}...${order.buyerAddress.slice(-4)}` :
                      `${order.sellerAddress.slice(0, 6)}...${order.sellerAddress.slice(-4)}`
                    }
                  </div>
                </TableCell>
                <TableCell>
                  <span className="font-semibold">{order.price} LSK</span>
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusColor(order.status)} className="flex items-center gap-1 w-fit">
                    {getStatusIcon(order.status)}
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    {order.burned && <Flame className="w-3 h-3 text-orange-500" />}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="text-sm text-gray-600">
                    {new Date(order.timestamp).toLocaleDateString()}
                  </div>
                </TableCell>
                <TableCell>
                  {isOwner && order.status === "pending" && (
                    <Button 
                      size="sm" 
                      onClick={() => onApprove?.(order.id)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Approve & Ship
                    </Button>
                  )}
                  {!isOwner && order.status === "approved" && !order.burned && (
                    <Button 
                      size="sm" 
                      variant="destructive"
                      onClick={() => onBurn?.(order.id)}
                    >
                      <Flame className="w-4 h-4 mr-1" />
                      Burn NFT
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
