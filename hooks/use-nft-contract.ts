"use client"

import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi"
import { parseEther, formatEther } from "viem"
import { NFT_CONTRACT_ADDRESS, NFT_CONTRACT_ABI, TIER_PRICES } from "@/lib/web3-config"
import { uploadMetadataToIPFS, generateNFTMetadata } from "@/lib/ipfs-client"

export function useNFTContract() {
  const { writeContract, data: hash, isPending, error } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  // Write contract functions
  const mintNFT = async (tier: number, quantity = 1, userAddress: `0x${string}`) => {
    try {
      // Generate metadata and upload to IPFS
      const metadata = generateNFTMetadata(tier)
      const metadataURI = await uploadMetadataToIPFS(metadata)

      // Calculate total price
      const pricePerToken = parseEther(TIER_PRICES[tier as keyof typeof TIER_PRICES])
      const totalPrice = pricePerToken * BigInt(quantity)

      // Mint NFT
      writeContract({
        address: NFT_CONTRACT_ADDRESS,
        abi: NFT_CONTRACT_ABI,
        functionName: "mintPassport",
        args: [userAddress, BigInt(tier), metadataURI],
        value: totalPrice,
      })

      return { hash, metadataURI }
    } catch (error) {
      console.error("Error minting NFT:", error)
      throw error
    }
  }

  const addExperience = async (tokenId: number, xpAmount: number) => {
    try {
      writeContract({
        address: NFT_CONTRACT_ADDRESS,
        abi: NFT_CONTRACT_ABI,
        functionName: "addExperience",
        args: [BigInt(tokenId), BigInt(xpAmount)],
      })

      return hash
    } catch (error) {
      console.error("Error adding experience:", error)
      throw error
    }
  }

  const updateNFTMetadata = async (tokenId: number, tier: number, newLevel: number, newXP: number) => {
    try {
      // Generate new metadata
      const metadata = generateNFTMetadata(tier, newLevel, newXP, tokenId)
      const metadataURI = await uploadMetadataToIPFS(metadata)

      // Update metadata on-chain
      writeContract({
        address: NFT_CONTRACT_ADDRESS,
        abi: NFT_CONTRACT_ABI,
        functionName: "updateMetadata",
        args: [BigInt(tokenId), metadataURI],
      })

      return { hash, metadataURI }
    } catch (error) {
      console.error("Error updating NFT metadata:", error)
      throw error
    }
  }

  return {
    // Write functions
    mintNFT,
    addExperience,
    updateNFTMetadata,

    // Transaction state
    hash,
    isPending,
    isConfirming,
    isConfirmed,
    error,
  }
}

// Separate hooks for reading contract data
export function useMintPrice(tier: number) {
  return useReadContract({
    address: NFT_CONTRACT_ADDRESS,
    abi: NFT_CONTRACT_ABI,
    functionName: "getMintPrice",
    args: [BigInt(tier)],
  })
}

export function useUserBalance(address: `0x${string}` | undefined) {
  return useReadContract({
    address: NFT_CONTRACT_ADDRESS,
    abi: NFT_CONTRACT_ABI,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  })
}

export function useTokenURI(tokenId: number) {
  return useReadContract({
    address: NFT_CONTRACT_ADDRESS,
    abi: NFT_CONTRACT_ABI,
    functionName: "tokenURI",
    args: [BigInt(tokenId)],
  })
}

export function useTokenTier(tokenId: number) {
  return useReadContract({
    address: NFT_CONTRACT_ADDRESS,
    abi: NFT_CONTRACT_ABI,
    functionName: "getTokenTier",
    args: [BigInt(tokenId)],
  })
}

export function useTokenLevel(tokenId: number) {
  return useReadContract({
    address: NFT_CONTRACT_ADDRESS,
    abi: NFT_CONTRACT_ABI,
    functionName: "getTokenLevel",
    args: [BigInt(tokenId)],
  })
}

export function useUserTokenByIndex(address: `0x${string}` | undefined, index: number) {
  return useReadContract({
    address: NFT_CONTRACT_ADDRESS,
    abi: NFT_CONTRACT_ABI,
    functionName: "tokenOfOwnerByIndex",
    args: address ? [address, BigInt(index)] : undefined,
    query: {
      enabled: !!address,
    },
  })
}

// Helper function to format prices
export function formatPrice(priceInWei: bigint): string {
  return formatEther(priceInWei)
}

// Helper function to get tier name
export function getTierName(tier: number): string {
  const names = ["Genesis", "Gold", "Legendary"]
  return names[tier] || "Unknown"
}
