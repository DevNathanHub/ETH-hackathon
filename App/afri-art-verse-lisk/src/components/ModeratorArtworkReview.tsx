
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Eye, Flag } from "lucide-react";

export const ModeratorArtworkReview = () => {
  const [artworks, setArtworks] = useState<any[]>([]);

  useEffect(() => {
    // Load all artworks from all artists
    const allKeys = Object.keys(localStorage);
    const artworkKeys = allKeys.filter(key => key.startsWith('artworks_'));
    let allArt: any[] = [];
    
    artworkKeys.forEach(key => {
      const artworks = JSON.parse(localStorage.getItem(key) || '[]');
      allArt = [...allArt, ...artworks.map(art => ({ ...art, storageKey: key }))];
    });
    
    setArtworks(allArt);
  }, []);

  const handleApprove = (artwork: any) => {
    const updatedArtwork = { ...artwork, status: 'approved', available: true };
    updateArtworkStatus(updatedArtwork);
  };

  const handleReject = (artwork: any) => {
    const updatedArtwork = { ...artwork, status: 'rejected', available: false };
    updateArtworkStatus(updatedArtwork);
  };

  const updateArtworkStatus = (updatedArtwork: any) => {
    const storageKey = updatedArtwork.storageKey;
    const artworks = JSON.parse(localStorage.getItem(storageKey) || '[]');
    const updatedArtworks = artworks.map((art: any) => 
      art.id === updatedArtwork.id ? updatedArtwork : art
    );
    localStorage.setItem(storageKey, JSON.stringify(updatedArtworks));
    
    // Update local state
    setArtworks(prev => prev.map(art => 
      art.id === updatedArtwork.id ? updatedArtwork : art
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'default';
      case 'rejected':
        return 'destructive';
      case 'pending':
        return 'secondary';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-6">Artwork Review</h2>
      
      {artworks.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <Eye className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No Artworks to Review</h3>
            <p className="text-gray-500">Artworks submitted by artists will appear here for review</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {artworks.map((artwork) => (
            <Card key={artwork.id} className="overflow-hidden">
              <div className="aspect-square overflow-hidden">
                {artwork.image ? (
                  <img 
                    src={artwork.image} 
                    alt={artwork.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <Eye className="w-12 h-12 text-gray-400" />
                  </div>
                )}
              </div>
              
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg truncate">{artwork.title}</h3>
                  <Badge variant={getStatusColor(artwork.status || 'pending')}>
                    {artwork.status || 'pending'}
                  </Badge>
                </div>
                
                <p className="text-gray-600 text-sm mb-2 line-clamp-2">{artwork.description}</p>
                
                <div className="flex justify-between items-center mb-4">
                  <span className="font-bold text-orange-600">{artwork.price} LSK</span>
                  <span className="text-xs text-gray-500">
                    {artwork.creator?.slice(0, 6)}...{artwork.creator?.slice(-4)}
                  </span>
                </div>
                
                {artwork.status === 'pending' && (
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      onClick={() => handleApprove(artwork)}
                      className="flex-1 bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Approve
                    </Button>
                    <Button 
                      size="sm" 
                      variant="destructive"
                      onClick={() => handleReject(artwork)}
                      className="flex-1"
                    >
                      <XCircle className="w-4 h-4 mr-1" />
                      Reject
                    </Button>
                  </div>
                )}
                
                {artwork.status === 'approved' && (
                  <Button 
                    size="sm" 
                    variant="destructive"
                    onClick={() => handleReject(artwork)}
                    className="w-full"
                  >
                    <Flag className="w-4 h-4 mr-1" />
                    Flag as Inappropriate
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
