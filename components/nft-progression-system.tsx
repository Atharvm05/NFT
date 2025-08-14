"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Trophy,
  Crown,
  Users,
  Calendar,
  GraduationCap,
  MessageCircle,
  Gift,
  TrendingUp,
  CheckCircle,
  Lock,
  Sparkles,
  Award,
} from "lucide-react"

interface Challenge {
  id: string
  title: string
  description: string
  type: "social" | "learning" | "event" | "referral"
  xpReward: number
  status: "available" | "completed" | "locked"
  progress: number
  maxProgress: number
  icon: any
  requirements?: string[]
}

interface NFTEvolution {
  level: number
  name: string
  tier: "genesis" | "gold" | "legendary"
  requiredXP: number
  visualChanges: string[]
  unlockedBenefits: string[]
  icon: string
  gradient: string
}

const challenges: Challenge[] = [
  {
    id: "1",
    title: "Community Welcome",
    description: "Join Discord and introduce yourself",
    type: "social",
    xpReward: 50,
    status: "completed",
    progress: 1,
    maxProgress: 1,
    icon: MessageCircle,
  },
  {
    id: "2",
    title: "First Course Complete",
    description: "Complete your first Web3 course",
    type: "learning",
    xpReward: 100,
    status: "available",
    progress: 3,
    maxProgress: 8,
    icon: GraduationCap,
  },
  {
    id: "3",
    title: "Event Attendee",
    description: "Attend 3 community events",
    type: "event",
    xpReward: 150,
    status: "available",
    progress: 2,
    maxProgress: 3,
    icon: Calendar,
  },
  {
    id: "4",
    title: "Community Builder",
    description: "Refer 5 friends to mint NFT passports",
    type: "referral",
    xpReward: 200,
    status: "available",
    progress: 1,
    maxProgress: 5,
    icon: Users,
  },
  {
    id: "5",
    title: "Knowledge Master",
    description: "Complete all available courses",
    type: "learning",
    xpReward: 300,
    status: "locked",
    progress: 0,
    maxProgress: 12,
    icon: Trophy,
    requirements: ["Requires Gold Tier"],
  },
  {
    id: "6",
    title: "VIP Networker",
    description: "Attend 10 exclusive events",
    type: "event",
    xpReward: 500,
    status: "locked",
    progress: 0,
    maxProgress: 10,
    icon: Crown,
    requirements: ["Requires Legendary Tier"],
  },
]

const nftEvolutions: NFTEvolution[] = [
  {
    level: 1,
    name: "Genesis Passport",
    tier: "genesis",
    requiredXP: 0,
    visualChanges: ["Basic design", "Gray border"],
    unlockedBenefits: ["Discord access", "Basic events"],
    icon: "🎫",
    gradient: "from-gray-400 to-gray-600",
  },
  {
    level: 2,
    name: "Active Member",
    tier: "genesis",
    requiredXP: 200,
    visualChanges: ["Subtle glow effect", "Silver border"],
    unlockedBenefits: ["Forum moderator badge", "Early event access"],
    icon: "🎫",
    gradient: "from-gray-300 to-gray-500",
  },
  {
    level: 3,
    name: "Gold Passport",
    tier: "gold",
    requiredXP: 500,
    visualChanges: ["Golden border", "Animated sparkles"],
    unlockedBenefits: ["Premium courses", "VIP events", "Partner discounts"],
    icon: "🎫",
    gradient: "from-yellow-400 to-orange-500",
  },
  {
    level: 4,
    name: "Elite Member",
    tier: "gold",
    requiredXP: 1000,
    visualChanges: ["Enhanced golden glow", "Rotating animation"],
    unlockedBenefits: ["1-on-1 mentorship", "Exclusive merchandise"],
    icon: "🎫",
    gradient: "from-yellow-300 to-orange-600",
  },
  {
    level: 5,
    name: "Legendary Passport",
    tier: "legendary",
    requiredXP: 2000,
    visualChanges: ["Rainbow border", "Particle effects", "Holographic background"],
    unlockedBenefits: ["Governance rights", "Revenue sharing", "Founder access"],
    icon: "🎫",
    gradient: "from-purple-400 to-pink-500",
  },
]

export function NFTProgressionSystem() {
  const [currentXP, setCurrentXP] = useState(750)
  const [selectedEvolution, setSelectedEvolution] = useState<NFTEvolution | null>(null)

  const getCurrentLevel = () => {
    for (let i = nftEvolutions.length - 1; i >= 0; i--) {
      if (currentXP >= nftEvolutions[i].requiredXP) {
        return nftEvolutions[i]
      }
    }
    return nftEvolutions[0]
  }

  const getNextLevel = () => {
    const currentLevel = getCurrentLevel()
    const currentIndex = nftEvolutions.findIndex((evo) => evo.level === currentLevel.level)
    return currentIndex < nftEvolutions.length - 1 ? nftEvolutions[currentIndex + 1] : null
  }

  const completeChallenge = (challengeId: string) => {
    const challenge = challenges.find((c) => c.id === challengeId)
    if (challenge && challenge.status === "available") {
      setCurrentXP((prev) => prev + challenge.xpReward)
      challenge.status = "completed"
      challenge.progress = challenge.maxProgress
    }
  }

  const currentLevel = getCurrentLevel()
  const nextLevel = getNextLevel()
  const progressToNext = nextLevel
    ? ((currentXP - currentLevel.requiredXP) / (nextLevel.requiredXP - currentLevel.requiredXP)) * 100
    : 100

  return (
    <div className="max-w-7xl mx-auto">
      {/* Current NFT Status */}
      <Card className="mb-8 p-8 bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm border-white/20">
        <div className="text-center mb-8">
          <Badge className="mb-4 bg-purple-500/20 text-purple-300 border-purple-500/30">
            <TrendingUp className="w-3 h-3 mr-1" />
            Dynamic NFT Evolution
          </Badge>
          <h1 className="text-4xl font-bold text-white mb-2">Your NFT Journey</h1>
          <p className="text-white/80">Complete challenges to evolve your NFT and unlock new benefits</p>
        </div>

        <div className="flex flex-col lg:flex-row items-center space-y-6 lg:space-y-0 lg:space-x-8">
          {/* Current NFT Display */}
          <div className="text-center">
            <div
              className={`w-48 h-48 bg-gradient-to-br ${currentLevel.gradient} rounded-2xl flex items-center justify-center text-8xl border-4 border-white/20 mb-4 ${
                currentLevel.tier === "legendary" ? "animate-pulse" : ""
              }`}
            >
              {currentLevel.icon}
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">{currentLevel.name}</h3>
            <Badge
              className={`${
                currentLevel.tier === "genesis"
                  ? "bg-gray-500/20 text-gray-300"
                  : currentLevel.tier === "gold"
                    ? "bg-yellow-500/20 text-yellow-300"
                    : "bg-purple-500/20 text-purple-300"
              }`}
            >
              Level {currentLevel.level}
            </Badge>
          </div>

          {/* Progress Info */}
          <div className="flex-1 w-full">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-white font-semibold">Current XP: {currentXP}</span>
                {nextLevel && <span className="text-white/70">Next: {nextLevel.requiredXP} XP</span>}
              </div>
              <Progress value={progressToNext} className="h-4 bg-white/10" />
              {nextLevel && (
                <p className="text-white/60 text-sm mt-2">
                  {nextLevel.requiredXP - currentXP} XP needed for {nextLevel.name}
                </p>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-white font-semibold mb-2">Current Benefits</h4>
                <div className="space-y-1">
                  {currentLevel.unlockedBenefits.map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-white/80 text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {nextLevel && (
                <div>
                  <h4 className="text-white font-semibold mb-2">Next Level Benefits</h4>
                  <div className="space-y-1">
                    {nextLevel.unlockedBenefits.slice(-2).map((benefit, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Lock className="w-4 h-4 text-yellow-400" />
                        <span className="text-white/60 text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Main Tabs */}
      <Tabs defaultValue="challenges" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-white/10 border-white/20 mb-8">
          <TabsTrigger value="challenges" className="data-[state=active]:bg-white/20 text-white">
            Active Challenges
          </TabsTrigger>
          <TabsTrigger value="evolution" className="data-[state=active]:bg-white/20 text-white">
            Evolution Path
          </TabsTrigger>
          <TabsTrigger value="leaderboard" className="data-[state=active]:bg-white/20 text-white">
            Leaderboard
          </TabsTrigger>
        </TabsList>

        <TabsContent value="challenges">
          <div className="grid md:grid-cols-2 gap-6">
            {challenges.map((challenge) => {
              const IconComponent = challenge.icon
              const isCompleted = challenge.status === "completed"
              const isLocked = challenge.status === "locked"

              return (
                <Card
                  key={challenge.id}
                  className={`p-6 backdrop-blur-sm border transition-all ${
                    isCompleted
                      ? "bg-green-500/10 border-green-500/30"
                      : isLocked
                        ? "bg-red-500/5 border-red-500/20"
                        : "bg-white/5 border-white/10 hover:bg-white/10"
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div
                      className={`p-3 rounded-lg ${
                        isCompleted
                          ? "bg-green-500/20"
                          : isLocked
                            ? "bg-red-500/20"
                            : "bg-gradient-to-r from-purple-500/20 to-pink-500/20"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle className="w-6 h-6 text-green-400" />
                      ) : isLocked ? (
                        <Lock className="w-6 h-6 text-red-300" />
                      ) : (
                        <IconComponent className="w-6 h-6 text-purple-300" />
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-white">{challenge.title}</h3>
                        <Badge
                          className={`${
                            challenge.type === "social"
                              ? "bg-blue-500/20 text-blue-300"
                              : challenge.type === "learning"
                                ? "bg-green-500/20 text-green-300"
                                : challenge.type === "event"
                                  ? "bg-purple-500/20 text-purple-300"
                                  : "bg-yellow-500/20 text-yellow-300"
                          }`}
                        >
                          +{challenge.xpReward} XP
                        </Badge>
                      </div>

                      <p className="text-white/70 text-sm mb-3">{challenge.description}</p>

                      {challenge.requirements && (
                        <div className="mb-3">
                          {challenge.requirements.map((req, index) => (
                            <Badge key={index} variant="outline" className="border-red-500/30 text-red-300 text-xs">
                              {req}
                            </Badge>
                          ))}
                        </div>
                      )}

                      {!isCompleted && !isLocked && (
                        <div className="mb-3">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-white/60">Progress</span>
                            <span className="text-white/60">
                              {challenge.progress}/{challenge.maxProgress}
                            </span>
                          </div>
                          <Progress
                            value={(challenge.progress / challenge.maxProgress) * 100}
                            className="h-2 bg-white/10"
                          />
                        </div>
                      )}

                      <div className="flex justify-between items-center">
                        <Badge variant="outline" className="border-white/20 text-white/70 text-xs">
                          {challenge.type.charAt(0).toUpperCase() + challenge.type.slice(1)}
                        </Badge>

                        {isCompleted ? (
                          <Badge className="bg-green-500/20 text-green-300">Completed</Badge>
                        ) : isLocked ? (
                          <Badge className="bg-red-500/20 text-red-300">Locked</Badge>
                        ) : challenge.progress === challenge.maxProgress ? (
                          <Button
                            size="sm"
                            onClick={() => completeChallenge(challenge.id)}
                            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                          >
                            <Award className="w-3 h-3 mr-1" />
                            Claim XP
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                          >
                            In Progress
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="evolution">
          <div className="space-y-6">
            <Card className="p-6 bg-white/5 backdrop-blur-sm border-white/10">
              <h3 className="text-xl font-bold text-white mb-4">NFT Evolution Timeline</h3>
              <div className="space-y-6">
                {nftEvolutions.map((evolution, index) => {
                  const isUnlocked = currentXP >= evolution.requiredXP
                  const isCurrent = evolution.level === currentLevel.level

                  return (
                    <div
                      key={evolution.level}
                      className={`flex items-center space-x-6 p-4 rounded-lg cursor-pointer transition-all ${
                        isCurrent
                          ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30"
                          : isUnlocked
                            ? "bg-white/5 hover:bg-white/10"
                            : "bg-white/5 opacity-50"
                      }`}
                      onClick={() => setSelectedEvolution(evolution)}
                    >
                      <div className="relative">
                        <div
                          className={`w-16 h-16 bg-gradient-to-br ${evolution.gradient} rounded-lg flex items-center justify-center text-2xl border-2 ${
                            isUnlocked ? "border-white/20" : "border-white/10"
                          } ${evolution.tier === "legendary" && isUnlocked ? "animate-pulse" : ""}`}
                        >
                          {evolution.icon}
                        </div>
                        {isCurrent && (
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-1">
                          <h4 className="font-semibold text-white">{evolution.name}</h4>
                          <Badge
                            className={`${
                              evolution.tier === "genesis"
                                ? "bg-gray-500/20 text-gray-300"
                                : evolution.tier === "gold"
                                  ? "bg-yellow-500/20 text-yellow-300"
                                  : "bg-purple-500/20 text-purple-300"
                            }`}
                          >
                            Level {evolution.level}
                          </Badge>
                          {!isUnlocked && (
                            <Badge variant="outline" className="border-white/20 text-white/60 text-xs">
                              {evolution.requiredXP} XP Required
                            </Badge>
                          )}
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-white/60 mb-1">Visual Changes:</p>
                            <div className="space-y-1">
                              {evolution.visualChanges.map((change, idx) => (
                                <div key={idx} className="flex items-center space-x-2">
                                  <Sparkles className="w-3 h-3 text-purple-300" />
                                  <span className="text-white/80">{change}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div>
                            <p className="text-white/60 mb-1">New Benefits:</p>
                            <div className="space-y-1">
                              {evolution.unlockedBenefits.slice(-2).map((benefit, idx) => (
                                <div key={idx} className="flex items-center space-x-2">
                                  <Gift className="w-3 h-3 text-green-400" />
                                  <span className="text-white/80">{benefit}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {index < nftEvolutions.length - 1 && <div className="w-px h-8 bg-white/20 mx-4" />}
                    </div>
                  )
                })}
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="leaderboard">
          <Card className="p-6 bg-white/5 backdrop-blur-sm border-white/10">
            <h3 className="text-xl font-bold text-white mb-6">Community Leaderboard</h3>
            <div className="space-y-4">
              {[
                { rank: 1, address: "0x742d...8D4C", xp: 2500, level: 5, tier: "legendary" },
                { rank: 2, address: "0x8f3a...9B2E", xp: 1800, level: 4, tier: "gold" },
                { rank: 3, address: "0x1c5d...7A8F", xp: 1200, level: 3, tier: "gold" },
                { rank: 4, address: "0x9e2b...4C1D", xp: 750, level: 3, tier: "gold" },
                { rank: 5, address: "0x6a8c...3E9B", xp: 450, level: 2, tier: "genesis" },
              ].map((user) => (
                <div
                  key={user.rank}
                  className={`flex items-center justify-between p-4 rounded-lg ${
                    user.rank <= 3
                      ? "bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20"
                      : "bg-white/5"
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                        user.rank === 1
                          ? "bg-yellow-400 text-black"
                          : user.rank === 2
                            ? "bg-gray-300 text-black"
                            : user.rank === 3
                              ? "bg-orange-400 text-black"
                              : "bg-white/20 text-white"
                      }`}
                    >
                      {user.rank}
                    </div>
                    <div>
                      <p className="text-white font-medium">{user.address}</p>
                      <p className="text-white/60 text-sm">Level {user.level}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-white font-semibold">{user.xp} XP</p>
                    <Badge
                      className={`${
                        user.tier === "genesis"
                          ? "bg-gray-500/20 text-gray-300"
                          : user.tier === "gold"
                            ? "bg-yellow-500/20 text-yellow-300"
                            : "bg-purple-500/20 text-purple-300"
                      }`}
                    >
                      {user.tier.charAt(0).toUpperCase() + user.tier.slice(1)}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
