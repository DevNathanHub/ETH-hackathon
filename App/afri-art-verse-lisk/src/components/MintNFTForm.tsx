
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { X, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MintNFTFormProps {
  onSuccess: (artwork: any) => void;
  onCancel: () => void;
  walletAddress: string;
}

export const MintNFTForm = ({ onSuccess, onCancel, walletAddress }: MintNFTFormProps) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
    category: "",
    royaltyPercentage: "10"
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({ ...prev, image: e.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const newArtwork = {
        id: Date.now().toString(),
        title: formData.title,
        description: formData.description,
        price: parseFloat(formData.price),
        image: formData.image,
        category: formData.category,
        creator: walletAddress,
        royaltyPercentage: parseInt(formData.royaltyPercentage),
        available: true,
        mintTimestamp: new Date().toISOString(),
        tokenId: `AFR-${Date.now()}`
      };

      onSuccess(newArtwork);
      
      toast({
        title: "NFT Minted Successfully!",
        description: `${formData.title} has been minted and listed on the marketplace.`,
      });
    } catch (error) {
      toast({
        title: "Minting Failed",
        description: "There was an error minting your NFT. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Mint New NFT</CardTitle>
        <Button variant="ghost" size="sm" onClick={onCancel}>
          <X className="w-4 h-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Artwork Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter artwork title"
                  required
                />
              </div>

              <div>
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  placeholder="e.g., Painting, Sculpture, Digital Art"
                  required
                />
              </div>

              <div>
                <Label htmlFor="price">Price (LSK)</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                  placeholder="Enter price in LSK"
                  required
                />
              </div>

              <div>
                <Label htmlFor="royalty">Royalty Percentage</Label>
                <Input
                  id="royalty"
                  type="number"
                  min="0"
                  max="50"
                  value={formData.royaltyPercentage}
                  onChange={(e) => setFormData(prev => ({ ...prev, royaltyPercentage: e.target.value }))}
                  placeholder="10"
                />
                <p className="text-xs text-gray-500 mt-1">Percentage of future sales you'll receive</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="image">Artwork Image</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  {formData.image ? (
                    <img 
                      src={formData.image} 
                      alt="Preview" 
                      className="max-h-40 mx-auto rounded-lg"
                    />
                  ) : (
                    <div>
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">Upload artwork image</p>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <Label htmlFor="image-upload" className="cursor-pointer">
                    <Button type="button" variant="outline" className="mt-2">
                      Choose File
                    </Button>
                  </Label>
                </div>
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe your artwork, inspiration, materials used..."
              rows={4}
              required
            />
          </div>

          <div className="flex gap-4">
            <Button 
              type="submit" 
              disabled={isLoading}
              className="flex-1 bg-gradient-to-r from-orange-600 to-red-600"
            >
              {isLoading ? "Minting..." : "Mint NFT"}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
