import {
    getDefaultConfig,
} from '@rainbow-me/rainbowkit';
import { http } from "wagmi";
import { base, baseSepolia, hardhat, kakarotStarknetSepolia } from "wagmi/chains";

export const isDevelopment = process.env.NODE_ENV === 'development';

let networks = {};

if (isDevelopment) {
    networks = {
        chains: [hardhat, baseSepolia],
        transports: {
            [hardhat.id]: http(
                "http://127.0.0.1:8545",
            ),
            [baseSepolia.id]: http(
                `https://base-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`,
            ),
        },
    }
} else {
    networks = {
        chains: [base, baseSepolia, kakarotStarknetSepolia],
        transports: {
            [baseSepolia.id]: http(
                `https://base-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`,
            ),
            [base.id]: http(
                `https://base-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`,
            ),
            [kakarotStarknetSepolia.id]: http(
                "https://sepolia-rpc.kakarot.org",
            )
        },

    }
}

export const config = getDefaultConfig({
    appName: "PayFriends",
    appIcon: "https://payfriends.xyz/android-chrome-192x192.png",
    appUrl: "https://payfriends.xyz",
    appDescription: "Share Expenses, Save on Fees - Powered by Crypto",
    projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
    ...networks as any
});


