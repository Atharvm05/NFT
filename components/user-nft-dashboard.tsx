"use client"

import { useAccount } from "wagmi"
import { useUserBalance, useUserTokenByIndex, useTokenTier, useTokenLevel } from "@/hooks/use-nft-contract"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Crown, Gem, TrendingUp } from "lucide-react"

const TIER_CONFIG = [
  { name: "Genesis", icon: Star, color: "from-blue-500 to-cyan-500" },
  { name: "Gold", icon: Crown, color: "from-yellow-500 to-orange-500" },
  { name: "Legendary", icon: Gem, color: "from-purple-500 to-pink-500" },
]

export function UserNFTDashboard() {
  const { address, isConnected } = useAccount()
  const { data: balance } = useUserBalance(address)

  if (!isConnected || !address) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Connect Wallet</CardTitle>
          <CardDescription>Please connect your wallet to view your NFTs</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  if (!balance || balance === 0n) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No NFTs Found</CardTitle>
          <CardDescription>You don't own any NFT Access Passports yet</CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild>
            <a href="/mint">Mint Your First NFT</a>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Your NFT Collection</h2>
        <Badge variant="secondary">
          {Number(balance)} NFT{Number(balance) > 1 ? "s" : ""}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: Number(balance) }, (_, index) => (
          <NFTCard key={index} address={address} tokenIndex={index} />
        ))}
      </div>
    </div>
  )
}

function NFTCard({ address, tokenIndex }: { address: `0x${string}`; tokenIndex: number }) {
  const { data: tokenId } = useUserTokenByIndex(address, tokenIndex)
  const { data: tier } = useTokenTier(tokenId ? Number(tokenId) : 0)
  const { data: level } = useTokenLevel(tokenId ? Number(tokenId) : 0)

  const tierConfig = TIER_CONFIG[tier ? Number(tier) : 0]
  const Icon = tierConfig?.icon || Star

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className={`p-2 rounded-full bg-gradient-to-r ${tierConfig?.color || "from-gray-500 to-gray-600"}`}>
              <Icon className="w-4 h-4 text-white" />
            </div>
            <div>
              <CardTitle className="text-lg">#{tokenId ? Number(tokenId) : "..."}</CardTitle>
              <CardDescription>{tierConfig?.name || "Loading..."} Tier</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="flex items-center space-x-1">
            <TrendingUp className="w-3 h-3" />
            <span>Level {level ? Number(level) : 1}</span>
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="aspect-square bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 rounded-lg mb-4 flex items-center justify-center">
          <Icon className="w-16 h-16 text-purple-600 dark:text-purple-400" />
        </div>
        <Button variant="outline" className="w-full bg-transparent">
          View Details
        </Button>
      </CardContent>
    </Card>
  )
}
