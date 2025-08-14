"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useAccount } from "wagmi"
import { useRealNFTContract } from "@/hooks/use-real-nft-contract"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Lock, Unlock, Crown } from "lucide-react"

interface GatedAccessCheckerProps {
  requiredTier?: number
  requiredLevel?: number
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function GatedAccessChecker({
  requiredTier = 1,
  requiredLevel = 1,
  children,
  fallback,
}: GatedAccessCheckerProps) {
  const { address } = useAccount()
  const { getUserTokens, getPassportData } = useRealNFTContract()
  const [hasAccess, setHasAccess] = useState(false)
  const [loading, setLoading] = useState(true)
  const [userNFTs, setUserNFTs] = useState<any[]>([])

  useEffect(() => {
    checkAccess()
  }, [address, requiredTier, requiredLevel])

  const checkAccess = async () => {
    if (!address) {
      setHasAccess(false)
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      const tokens = await getUserTokens(address)

      if (tokens.length === 0) {
        setHasAccess(false)
        setUserNFTs([])
        return
      }

      const nftData = []
      let accessGranted = false

      for (const tokenId of tokens) {
        const passportData = await getPassportData(tokenId)
        nftData.push({
          tokenId,
          ...passportData,
        })

        // Check if this NFT meets the requirements
        if (passportData.tier >= requiredTier && passportData.level >= requiredLevel) {
          accessGranted = true
        }
      }

      setUserNFTs(nftData)
      setHasAccess(accessGranted)
    } catch (error) {
      console.error("Error checking access:", error)
      setHasAccess(false)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (hasAccess) {
    return (
      <div>
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center gap-2 text-green-800">
            <Unlock className="h-5 w-5" />
            <span className="font-medium">Access Granted</span>
          </div>
        </div>
        {children}
      </div>
    )
  }

  if (fallback) {
    return <>{fallback}</>
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 p-3 bg-red-100 rounded-full w-fit">
          <Lock className="h-8 w-8 text-red-600" />
        </div>
        <CardTitle className="text-2xl">Access Restricted</CardTitle>
        <CardDescription>This content requires a higher tier NFT Access Passport</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Crown className="h-5 w-5 text-yellow-500" />
            <span className="font-semibold">Requirements:</span>
          </div>
          <div className="space-y-1">
            <Badge variant="outline">Tier {requiredTier}+ NFT</Badge>
            <Badge variant="outline">Level {requiredLevel}+</Badge>
          </div>
        </div>

        {!address ? (
          <div className="text-center">
            <p className="text-muted-foreground mb-4">Connect your wallet to check your NFT Access Passport</p>
          </div>
        ) : userNFTs.length === 0 ? (
          <div className="text-center">
            <p className="text-muted-foreground mb-4">You don't have an NFT Access Passport yet</p>
            <Button asChild>
              <a href="/mint">Mint Your NFT</a>
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-muted-foreground mb-4">Your current NFTs don't meet the requirements</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Your NFTs:</h4>
              {userNFTs.map((nft) => (
                <div key={nft.tokenId} className="flex items-center justify-between p-3 border rounded-lg">
                  <span>NFT #{nft.tokenId}</span>
                  <div className="flex gap-2">
                    <Badge variant={nft.tier >= requiredTier ? "default" : "secondary"}>Tier {nft.tier}</Badge>
                    <Badge variant={nft.level >= requiredLevel ? "default" : "secondary"}>Level {nft.level}</Badge>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center">
              <Button asChild>
                <a href="/progression">Level Up Your NFT</a>
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
