/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
// 	Dialog,
// 	DialogContent,
// 	DialogHeader,
// 	DialogTitle,
// 	DialogTrigger,
// } from "@/components/ui/dialog";
import { Wallet, Copy, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface WalletConnectionProps {
	walletConnected: boolean;
	walletAddress: string;
	onConnect: (connected: boolean) => void;
	onAddressChange: (address: string) => void;
}
interface NewWindow {
	ethereum: string;
}

export const WalletConnection = ({
	walletConnected,
	walletAddress,
	onConnect,
	onAddressChange,
}: WalletConnectionProps) => {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [inputAddress, setInputAddress] = useState("");
	const { toast } = useToast();

	const connectWallet = () => {
		console.log("Connecting wallet...");
		if ((window as any).ethereum) {
			(window as any).ethereum
				.request({ method: "eth_requestAccounts" })
				.then((accounts: string[]) => {
					const address = accounts[0];
					setInputAddress(address);
					onAddressChange(address);
					onConnect(true);
					setIsDialogOpen(false);
					toast({
						title: "Wallet Connected",
						description: "Wallet connected successfully",
					});
					localStorage.setItem("walletAddress", address);
					console.log("Wallet address:", address);
					// Optionally fetch and store balance here
				})
				.catch(() => {
					toast({
						title: "Connection Denied",
						description: "User denied wallet connection",
						variant: "destructive",
					});
				});
		} else {
			toast({
				title: "MetaMask Not Installed",
				description:
					"MetaMask is not installed. Please install it to use this feature.",
				variant: "destructive",
			});
		}
	};

	const disconnectWallet = () => {
		localStorage.removeItem("walletAddress");
		localStorage.removeItem("walletBalance");
		onAddressChange("");
		onConnect(false);
		toast({
			title: "Wallet Disconnected",
			description: "Wallet has been disconnected",
		});
	};

	const copyAddress = () => {
		navigator.clipboard.writeText(walletAddress);
		toast({
			title: "Address Copied",
			description: "Wallet address copied to clipboard",
		});
	};

	if (walletConnected) {
		return (
			<div className="flex items-center gap-4">
				<div className="bg-white rounded-lg px-4 py-2 border">
					<div className="text-sm text-gray-600">Balance</div>
					<div className="font-semibold">
						{localStorage.getItem("walletBalance") || "0"} LSK
					</div>
				</div>
				<div className="bg-white rounded-lg px-4 py-2 border flex items-center gap-2">
					<Wallet className="w-4 h-4 text-orange-600" />
					<span className="text-sm font-mono">
						{walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
					</span>
					<Button variant="ghost" size="sm" onClick={copyAddress}>
						<Copy className="w-3 h-3" />
					</Button>
				</div>
				<Button variant="outline" onClick={disconnectWallet}>
					<LogOut className="w-4 h-4 mr-2" />
					Disconnect
				</Button>
			</div>
		);
	}

	return (
		<div>
			<div>
				<Button
					onClick={connectWallet}
					className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
				>
					<Wallet className="w-4 h-4 mr-2" />
					Connect Wallet
				</Button>
			</div>
			{/* <DialogContent>
				<DialogHeader>
					<DialogTitle>Connect Lisk Wallet</DialogTitle>
				</DialogHeader>
				<div className="space-y-4">
					<div>
						<label className="text-sm font-medium">Wallet Address</label>
						<Input
							placeholder="Enter your Lisk wallet address"
							value={inputAddress}
							onChange={(e) => setInputAddress(e.target.value)}
						/>
					</div>
					<Button onClick={connectWallet} className="w-full">
						Connect Wallet
					</Button>
				</div>
			</DialogContent> */}
		</div>
	);
};
