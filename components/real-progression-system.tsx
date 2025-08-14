"use client"

import { useState, useEffect } from "react"
import { useAccount } from "wagmi"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { useRealNFTContract, useUserTokens } from "@/hooks/use-real-nft-contract"
import { Trophy, Users, BookOpen, Calendar, Gift, Star } from "lucide-react"

const CHALLENGES = [
  {
    id: 1,
    title: "Join Discord Community",
    description: "Connect with fellow NFT holders",
    category: "social",
    xp: 50,
    icon: Users,
    completed: false,
  },
  {
    id: 2,
    title: "Complete First Course",
    description: "Finish any premium course",
    category: "learning",
    xp: 100,
    icon: BookOpen,
    completed: false,
  },
  {
    id: 3,
    title: "Attend Virtual Event",
    description: "Join a live community event",
    category: "events",
    xp: 75,
    icon: Calendar,
    completed: false,
  },
  {
    id: 4,
    title: "Refer a Friend",
    description: "Invite someone to mint an NFT",
    category: "referrals",
    xp: 150,
    icon: Gift,
    completed: false,
  },
]

const EVOLUTION_LEVELS = [
  { level: 1, name: "Genesis", xp: 0, color: "bg-gray-500" },
  { level: 2, name: "Bronze", xp: 100, color: "bg-amber-600" },
  { level: 3, name: "Silver", xp: 300, color: "bg-gray-400" },
  { level: 4, name: "Gold", xp: 600, color: "bg-yellow-500" },
  { level: 5, name: "Legendary", xp: 1000, color: "bg-purple-600" },
]

export function RealProgressionSystem() {
  const { address } = useAccount()
  const { updatePassportLevel } = useRealNFTContract()
  const { tokenIds, isLoading: tokensLoading } = useUserTokens(address)
  const [userNFTs, setUserNFTs] = useState<any[]>([])
  const [challenges, setChallenges] = useState(CHALLENGES)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (tokenIds.length > 0) {
      loadNFTData()
    }
  }, [tokenIds])

  const loadNFTData = async () => {
    setLoading(true)
    const nftData = []

    for (const tokenId of tokenIds) {
      // For now, we'll use mock data since we need to restructure the passport data hook
      nftData.push({
        tokenId,
        tier: 1,
        level: 1,
        xp: 50,
      })
    }

    setUserNFTs(nftData)
    setLoading(false)
  }

  const completeChallenge = async (challengeId: number, tokenId: string) => {
    const challenge = challenges.find((c) => c.id === challengeId)
    if (!challenge) return

    try {
      setLoading(true)

      // Update challenge completion
      setChallenges((prev) => prev.map((c) => (c.id === challengeId ? { ...c, completed: true } : c)))

      // Update NFT progression on blockchain
      await updatePassportLevel(tokenId, challenge.xp)

      // Reload user data
      await loadNFTData()
    } catch (error) {
      console.error("Error completing challenge:", error)
    } finally {
      setLoading(false)
    }
  }

  const getCurrentLevel = (xp: number) => {
    return EVOLUTION_LEVELS.reduce((prev, current) => (xp >= current.xp ? current : prev))
  }

  const getNextLevel = (xp: number) => {
    return EVOLUTION_LEVELS.find((level) => level.xp > xp) || EVOLUTION_LEVELS[EVOLUTION_LEVELS.length - 1]
  }

  if (!address) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4 text-white">Connect Your Wallet</h2>
        <p className="text-gray-300">Connect your wallet to view your NFT progression</p>
      </div>
    )
  }

  if (tokensLoading || loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400 mx-auto"></div>
        <p className="mt-4 text-white">Loading your NFT progression...</p>
      </div>
    )
  }

  if (userNFTs.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4 text-white">No NFTs Found</h2>
        <p className="text-gray-300 mb-6">Mint your first NFT Access Passport to start your journey</p>
        <Button asChild>
          <a href="/mint">Mint Your NFT</a>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* NFT Overview */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {userNFTs.map((nft) => {
          const currentLevel = getCurrentLevel(nft.xp)
          const nextLevel = getNextLevel(nft.xp)
          const progress = nextLevel ? ((nft.xp - currentLevel.xp) / (nextLevel.xp - currentLevel.xp)) * 100 : 100

          return (
            <Card key={nft.tokenId} className="relative overflow-hidden bg-white/10 backdrop-blur-sm border-white/20">
              <div className={`absolute inset-0 opacity-10 ${currentLevel.color}`} />
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">NFT #{nft.tokenId}</CardTitle>
                  <Badge variant="secondary" className={`${currentLevel.color} text-white`}>
                    {currentLevel.name}
                  </Badge>
                </div>
                <CardDescription className="text-gray-300">
                  Level {nft.level} • {nft.xp} XP
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2 text-gray-300">
                      <span>Progress to {nextLevel.name}</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                  <div className="text-sm text-gray-400">{nextLevel.xp - nft.xp} XP needed for next level</div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Challenges */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Trophy className="h-5 w-5" />
            Complete Challenges
          </CardTitle>
          <CardDescription className="text-gray-300">
            Complete challenges to earn XP and level up your NFTs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {challenges.map((challenge) => {
              const Icon = challenge.icon
              return (
                <div
                  key={challenge.id}
                  className="flex items-center justify-between p-4 border border-white/20 rounded-lg bg-white/5"
                >
                  <div className="flex items-center gap-4">
                    <Icon className="h-8 w-8 text-purple-400" />
                    <div>
                      <h3 className="font-semibold text-white">{challenge.title}</h3>
                      <p className="text-sm text-gray-300">{challenge.description}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm font-medium text-gray-300">{challenge.xp} XP</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {userNFTs.map((nft) => (
                      <Button
                        key={nft.tokenId}
                        size="sm"
                        disabled={challenge.completed || loading}
                        onClick={() => completeChallenge(challenge.id, nft.tokenId.toString())}
                      >
                        {challenge.completed ? "Completed" : `Complete for NFT #${nft.tokenId}`}
                      </Button>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
