import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi"
import { parseEther } from "viem"
import { MetadataManager } from "@/lib/metadata-manager"
import { NFT_CONTRACT_ABI, NFT_CONTRACT_ADDRESS } from "@/lib/web3-config"

export function useRealNFTContract() {
  const { writeContract, data: hash, isPending, error } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const mintNFT = async (tier: "GENESIS" | "GOLD" | "LEGENDARY", quantity = 1) => {
    try {
      // Generate metadata and upload to IPFS
      const metadata = MetadataManager.generateMetadata(tier)
      const metadataURI = await MetadataManager.uploadToIPFS(metadata)

      // Get tier pricing
      const tierPrices = {
        GENESIS: "0.1",
        GOLD: "0.25",
        LEGENDARY: "0.5",
      }

      const totalPrice = parseEther((Number.parseFloat(tierPrices[tier]) * quantity).toString())
      const tierIndex = { GENESIS: 0, GOLD: 1, LEGENDARY: 2 }[tier]

      // Mint NFT
      writeContract({
        address: NFT_CONTRACT_ADDRESS,
        abi: NFT_CONTRACT_ABI,
        functionName: "mintPassport",
        args: [tierIndex, metadataURI],
        value: totalPrice,
      })

      return { hash, metadataURI }
    } catch (error) {
      console.error("Minting error:", error)
      throw error
    }
  }

  const updatePassportLevel = async (tokenId: string, xpGained: number) => {
    try {
      writeContract({
        address: NFT_CONTRACT_ADDRESS,
        abi: NFT_CONTRACT_ABI,
        functionName: "updatePassportLevel",
        args: [tokenId, xpGained],
      })
      return hash
    } catch (error) {
      console.error("Error updating passport level:", error)
      throw error
    }
  }

  return {
    mintNFT,
    updatePassportLevel,
    isPending,
    isConfirming,
    isSuccess,
    error,
    hash,
  }
}

export function useUserTokens(address?: string) {
  const {
    data: tokenIds,
    isLoading,
    error,
  } = useReadContract({
    address: NFT_CONTRACT_ADDRESS,
    abi: NFT_CONTRACT_ABI,
    functionName: "getUserTokens",
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  return {
    tokenIds: (tokenIds as number[]) || [],
    isLoading,
    error,
    getUserTokens: async (userAddress: string) => {
      // This is just a wrapper for consistency
      return (tokenIds as number[]) || []
    },
  }
}

export function usePassportData(tokenId?: number) {
  const {
    data: passportData,
    isLoading,
    error,
  } = useReadContract({
    address: NFT_CONTRACT_ADDRESS,
    abi: NFT_CONTRACT_ABI,
    functionName: "getPassportData",
    args: tokenId ? [tokenId] : undefined,
    query: { enabled: !!tokenId && tokenId > 0 },
  })

  return {
    passportData,
    isLoading,
    error,
    getPassportData: async (id: number) => {
      // This is just a wrapper for consistency
      return passportData
    },
  }
}

export function useNFTContract() {
  const { writeContract, data: hash, isPending, error } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const mintNFT = async (tier: "GENESIS" | "GOLD" | "LEGENDARY", quantity = 1) => {
    try {
      // Generate metadata and upload to IPFS
      const metadata = MetadataManager.generateMetadata(tier)
      const metadataURI = await MetadataManager.uploadToIPFS(metadata)

      // Get tier pricing
      const tierPrices = {
        GENESIS: "0.1",
        GOLD: "0.25",
        LEGENDARY: "0.5",
      }

      const totalPrice = parseEther((Number.parseFloat(tierPrices[tier]) * quantity).toString())
      const tierIndex = { GENESIS: 0, GOLD: 1, LEGENDARY: 2 }[tier]

      // Mint NFT
      writeContract({
        address: NFT_CONTRACT_ADDRESS,
        abi: NFT_CONTRACT_ABI,
        functionName: "mintPassport",
        args: [tierIndex, metadataURI],
        value: totalPrice,
      })

      return { hash, metadataURI }
    } catch (error) {
      console.error("Minting error:", error)
      throw error
    }
  }

  return {
    mintNFT,
    isPending,
    isConfirming,
    isSuccess,
    error,
    hash,
  }
}

export function useUserNFTs(address?: string) {
  const { data: tokenIds } = useReadContract({
    address: NFT_CONTRACT_ADDRESS,
    abi: NFT_CONTRACT_ABI,
    functionName: "getUserTokens",
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  const { data: balance } = useReadContract({
    address: NFT_CONTRACT_ADDRESS,
    abi: NFT_CONTRACT_ABI,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  return {
    tokenIds: (tokenIds as number[]) || [],
    balance: (balance as number) || 0,
  }
}

export function useNFTData(tokenId: number) {
  const { data: passportData } = useReadContract({
    address: NFT_CONTRACT_ADDRESS,
    abi: NFT_CONTRACT_ABI,
    functionName: "getPassportData",
    args: [tokenId],
    query: { enabled: tokenId > 0 },
  })

  const { data: tokenURI } = useReadContract({
    address: NFT_CONTRACT_ADDRESS,
    abi: NFT_CONTRACT_ABI,
    functionName: "tokenURI",
    args: [tokenId],
    query: { enabled: tokenId > 0 },
  })

  return {
    passportData,
    tokenURI,
  }
}
