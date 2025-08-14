import { createConfig, http } from "wagmi"
import { polygon, polygonAmoy } from "wagmi/chains"
import { injected, walletConnect } from "wagmi/connectors"

const getWalletConnectProjectId = () => {
  if (typeof window === "undefined") return ""
  return process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || ""
}

export const config = createConfig({
  chains: [polygon, polygonAmoy],
  connectors: [
    injected(),
    ...(getWalletConnectProjectId()
      ? [
          walletConnect({
            projectId: getWalletConnectProjectId(),
          }),
        ]
      : []),
  ],
  transports: {
    [polygon.id]: http(),
    [polygonAmoy.id]: http(),
  },
  ssr: true,
})

// Smart Contract Configuration
export const NFT_CONTRACT_ADDRESS = (
  typeof window !== "undefined" ? process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS : ""
) as `0x${string}`

export const NFT_CONTRACT_ABI = [
  {
    inputs: [
      { internalType: "enum NFTAccessPassport.Tier", name: "_tier", type: "uint8" },
      { internalType: "string", name: "_metadataURI", type: "string" },
    ],
    name: "mintPassport",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "tokenURI",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_user", type: "address" }],
    name: "getUserTokens",
    outputs: [{ internalType: "uint256[]", name: "", type: "uint256[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_tokenId", type: "uint256" }],
    name: "getPassportData",
    outputs: [
      {
        components: [
          { internalType: "enum NFTAccessPassport.Tier", name: "tier", type: "uint8" },
          { internalType: "uint256", name: "level", type: "uint256" },
          { internalType: "uint256", name: "xp", type: "uint256" },
          { internalType: "uint256", name: "mintTimestamp", type: "uint256" },
          { internalType: "string", name: "metadataURI", type: "string" },
        ],
        internalType: "struct NFTAccessPassport.PassportData",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_tokenId", type: "uint256" },
      { internalType: "uint256", name: "_xpAmount", type: "uint256" },
    ],
    name: "addXP",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_tokenId", type: "uint256" },
      { internalType: "string", name: "_newMetadataURI", type: "string" },
    ],
    name: "updateMetadata",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "enum NFTAccessPassport.Tier", name: "", type: "uint8" }],
    name: "tierPrices",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_xp", type: "uint256" }],
    name: "calculateLevel",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  // Events
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "to", type: "address" },
      { indexed: true, internalType: "uint256", name: "tokenId", type: "uint256" },
      { indexed: false, internalType: "enum NFTAccessPassport.Tier", name: "tier", type: "uint8" },
    ],
    name: "PassportMinted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "uint256", name: "tokenId", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "newLevel", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "newXP", type: "uint256" },
    ],
    name: "PassportLevelUp",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "uint256", name: "tokenId", type: "uint256" },
      { indexed: false, internalType: "string", name: "newMetadataURI", type: "string" },
    ],
    name: "MetadataUpdated",
    type: "event",
  },
] as const

export const TIER_PRICES = {
  GENESIS: "0.1", // Genesis - 0.1 MATIC
  GOLD: "0.25", // Gold - 0.25 MATIC
  LEGENDARY: "0.5", // Legendary - 0.5 MATIC
}

export const TIER_NAMES = ["Genesis", "Gold", "Legendary"]
