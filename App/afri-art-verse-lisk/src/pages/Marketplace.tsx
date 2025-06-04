import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WalletConnection } from "@/components/WalletConnection";
import { SellerDashboard } from "@/components/SellerDashboard";
import { BuyerDashboard } from "@/components/BuyerDashboard";
import { Wallet, Store, ShoppingBag } from "lucide-react";

const Marketplace = () => {
	const [walletConnected, setWalletConnected] = useState(false);
	const [walletAddress, setWalletAddress] = useState("");

	useEffect(() => {
		const savedWallet = localStorage.getItem("walletAddress");
		if (savedWallet) {
			setWalletAddress(savedWallet);
			setWalletConnected(true);
		}
	}, []);

	return (
		<div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
			<div className="container mx-auto px-6 py-8">
				{/* Header */}
				<div className="flex justify-between items-center mb-8">
					<div>
						<h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
							AfriNFT Marketplace
						</h1>
						<p className="text-gray-600 mt-2">
							Decentralized African Art Marketplace
						</p>
					</div>
					<WalletConnection
						walletConnected={walletConnected}
						walletAddress={walletAddress}
						onConnect={setWalletConnected}
						onAddressChange={setWalletAddress}
					/>
				</div>

				{walletConnected ? (
					<Tabs defaultValue="buyer" className="w-full">
						<TabsList className="grid w-full grid-cols-2 mb-8">
							<TabsTrigger value="buyer" className="flex items-center gap-2">
								<ShoppingBag className="w-4 h-4" />
								Buyer Dashboard
							</TabsTrigger>
							<TabsTrigger value="seller" className="flex items-center gap-2">
								<Store className="w-4 h-4" />
								Artist Dashboard
							</TabsTrigger>
						</TabsList>

						<TabsContent value="buyer">
							<BuyerDashboard walletAddress={walletAddress} />
						</TabsContent>

						<TabsContent value="seller">
							<SellerDashboard walletAddress={walletAddress} />
						</TabsContent>
					</Tabs>
				) : (
					<div className="text-center py-20">
						<Wallet className="w-16 h-16 text-orange-600 mx-auto mb-4" />
						<h2 className="text-2xl font-semibold text-gray-800 mb-4">
							Connect Your Wallet to Continue
						</h2>
						<p className="text-gray-600 mb-8">
							Please connect your Lisk wallet to access the marketplace
						</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default Marketplace;
