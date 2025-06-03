
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Eye, Palette } from "lucide-react";

interface ArtworkGridProps {
  artworks: any[];
  isOwner: boolean;
  onPurchase?: (artwork: any) => void;
}

export const ArtworkGrid = ({ artworks, isOwner, onPurchase }: ArtworkGridProps) => {
  if (artworks.length === 0) {
    return (
      <div className="text-center py-12">
        <Palette className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-600 mb-2">
          {isOwner ? "No artworks yet" : "No artworks available"}
        </h3>
        <p className="text-gray-500">
          {isOwner ? "Start by minting your first NFT" : "Check back later for new artwork"}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {artworks.map((artwork) => (
        <Card key={artwork.id} className="overflow-hidden hover:shadow-lg transition-shadow">
          <div className="aspect-square overflow-hidden">
            {artwork.image ? (
              <img 
                src={artwork.image} 
                alt={artwork.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <Palette className="w-12 h-12 text-gray-400" />
              </div>
            )}
          </div>
          
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-lg line-clamp-1">{artwork.title}</h3>
              <Badge variant="secondary">{artwork.category}</Badge>
            </div>
            
            <p className="text-gray-600 text-sm line-clamp-2 mb-3">
              {artwork.description}
            </p>
            
            <div className="flex justify-between items-center">
              <div>
                <span className="text-2xl font-bold text-orange-600">
                  {artwork.price} LSK
                </span>
                {artwork.royaltyPercentage && (
                  <p className="text-xs text-gray-500">
                    {artwork.royaltyPercentage}% royalty
                  </p>
                )}
              </div>
              
              {isOwner ? (
                <Badge variant={artwork.available ? "default" : "secondary"}>
                  {artwork.available ? "Listed" : "Sold"}
                </Badge>
              ) : (
                <div className="text-xs text-gray-500">
                  Token: {artwork.tokenId}
                </div>
              )}
            </div>
          </CardContent>
          
          {!isOwner && artwork.available && (
            <CardFooter className="p-4 pt-0">
              <Button 
                onClick={() => onPurchase?.(artwork)}
                className="w-full bg-gradient-to-r from-orange-600 to-red-600"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Buy NFT
              </Button>
            </CardFooter>
          )}
        </Card>
      ))}
    </div>
  );
};
