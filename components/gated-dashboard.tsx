"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  GraduationCap,
  Calendar,
  Gift,
  QrCode,
  Crown,
  Star,
  Lock,
  Unlock,
  ExternalLink,
  Play,
  Download,
  MessageCircle,
  Trophy,
  Zap,
} from "lucide-react"

interface UserNFT {
  id: string
  name: string
  tier: "genesis" | "gold" | "legendary"
  level: number
  experience: number
  maxExperience: number
  benefits: string[]
  tokenId: string
}

interface AccessItem {
  id: string
  title: string
  description: string
  type: "discord" | "course" | "event" | "perk" | "content"
  requiredTier: "genesis" | "gold" | "legendary"
  icon: any
  status: "available" | "locked" | "completed"
  url?: string
}

const mockUserNFT: UserNFT = {
  id: "1",
  name: "Gold Passport",
  tier: "gold",
  level: 3,
  experience: 750,
  maxExperience: 1000,
  benefits: ["Discord Access", "Premium Courses", "VIP Events", "Partner Discounts"],
  tokenId: "#7429",
}

const accessItems: AccessItem[] = [
  {
    id: "1",
    title: "Exclusive Discord Server",
    description: "Join our private community with 2,500+ members",
    type: "discord",
    requiredTier: "genesis",
    icon: MessageCircle,
    status: "available",
    url: "https://discord.gg/nftpassport",
  },
  {
    id: "2",
    title: "Web3 Development Course",
    description: "Complete 8-week course on blockchain development",
    type: "course",
    requiredTier: "genesis",
    icon: GraduationCap,
    status: "available",
  },
  {
    id: "3",
    title: "Advanced DeFi Strategies",
    description: "Premium course on yield farming and liquidity mining",
    type: "course",
    requiredTier: "gold",
    icon: GraduationCap,
    status: "available",
  },
  {
    id: "4",
    title: "Monthly VIP Meetup",
    description: "Exclusive in-person networking event in NYC",
    type: "event",
    requiredTier: "gold",
    icon: Calendar,
    status: "available",
  },
  {
    id: "5",
    title: "1-on-1 Mentorship Session",
    description: "Personal guidance from industry experts",
    type: "content",
    requiredTier: "legendary",
    icon: Crown,
    status: "locked",
  },
  {
    id: "6",
    title: "Partner Store Discounts",
    description: "20% off at 50+ partner retailers",
    type: "perk",
    requiredTier: "gold",
    icon: Gift,
    status: "available",
  },
]

export function GatedDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const userTier = mockUserNFT.tier

  const getAccessStatus = (requiredTier: string) => {
    const tierHierarchy = { genesis: 1, gold: 2, legendary: 3 }
    const userTierLevel = tierHierarchy[userTier as keyof typeof tierHierarchy]
    const requiredTierLevel = tierHierarchy[requiredTier as keyof typeof tierHierarchy]
    return userTierLevel >= requiredTierLevel
  }

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "genesis":
        return "from-gray-400 to-gray-600"
      case "gold":
        return "from-yellow-400 to-orange-500"
      case "legendary":
        return "from-purple-400 to-pink-500"
      default:
        return "from-gray-400 to-gray-600"
    }
  }

  const getTierBadgeColor = (tier: string) => {
    switch (tier) {
      case "genesis":
        return "bg-gray-500/20 text-gray-300"
      case "gold":
        return "bg-yellow-500/20 text-yellow-300"
      case "legendary":
        return "bg-purple-500/20 text-purple-300"
      default:
        return "bg-gray-500/20 text-gray-300"
    }
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* User NFT Overview */}
      <Card className="mb-8 p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm border-white/20">
        <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
          <div
            className={`w-24 h-24 bg-gradient-to-br ${getTierColor(userTier)} rounded-lg flex items-center justify-center text-4xl border-2 border-white/20`}
          >
            🎫
          </div>

          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h2 className="text-2xl font-bold text-white">{mockUserNFT.name}</h2>
              <Badge className={getTierBadgeColor(userTier)}>
                {userTier === "legendary" && <Crown className="w-3 h-3 mr-1" />}
                {userTier === "gold" && <Star className="w-3 h-3 mr-1" />}
                {userTier.charAt(0).toUpperCase() + userTier.slice(1)}
              </Badge>
              <Badge variant="outline" className="border-white/20 text-white/70">
                {mockUserNFT.tokenId}
              </Badge>
            </div>

            <div className="mb-3">
              <div className="flex items-center space-x-2 mb-1">
                <Trophy className="w-4 h-4 text-yellow-400" />
                <span className="text-white/80">Level {mockUserNFT.level}</span>
              </div>
              <Progress
                value={(mockUserNFT.experience / mockUserNFT.maxExperience) * 100}
                className="h-2 bg-white/10"
              />
              <p className="text-white/60 text-sm mt-1">
                {mockUserNFT.experience} / {mockUserNFT.maxExperience} XP to next level
              </p>
            </div>
          </div>

          <div className="text-right">
            <p className="text-white/60 text-sm mb-1">Access Level</p>
            <div className="flex space-x-1">
              {["genesis", "gold", "legendary"].map((tier, index) => (
                <div
                  key={tier}
                  className={`w-3 h-3 rounded-full ${getAccessStatus(tier) ? "bg-green-400" : "bg-white/20"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Main Dashboard Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-white/10 border-white/20 mb-8">
          <TabsTrigger value="overview" className="data-[state=active]:bg-white/20 text-white">
            Overview
          </TabsTrigger>
          <TabsTrigger value="access" className="data-[state=active]:bg-white/20 text-white">
            My Access
          </TabsTrigger>
          <TabsTrigger value="events" className="data-[state=active]:bg-white/20 text-white">
            Events
          </TabsTrigger>
          <TabsTrigger value="rewards" className="data-[state=active]:bg-white/20 text-white">
            Rewards
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {accessItems.map((item) => {
              const hasAccess = getAccessStatus(item.requiredTier)
              const IconComponent = item.icon

              return (
                <Card
                  key={item.id}
                  className={`p-6 backdrop-blur-sm border transition-all ${
                    hasAccess ? "bg-white/5 border-white/10 hover:bg-white/10" : "bg-red-500/5 border-red-500/20"
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div
                      className={`p-2 rounded-lg ${
                        hasAccess ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20" : "bg-red-500/20"
                      }`}
                    >
                      {hasAccess ? (
                        <IconComponent className="w-6 h-6 text-purple-300" />
                      ) : (
                        <Lock className="w-6 h-6 text-red-300" />
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold text-white">{item.title}</h3>
                        {hasAccess ? (
                          <Unlock className="w-4 h-4 text-green-400" />
                        ) : (
                          <Lock className="w-4 h-4 text-red-400" />
                        )}
                      </div>

                      <p className="text-white/70 text-sm mb-3">{item.description}</p>

                      <div className="flex items-center justify-between">
                        <Badge className={`text-xs ${getTierBadgeColor(item.requiredTier)}`}>
                          {item.requiredTier.charAt(0).toUpperCase() + item.requiredTier.slice(1)}+ Required
                        </Badge>

                        {hasAccess ? (
                          <Button
                            size="sm"
                            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                          >
                            <ExternalLink className="w-3 h-3 mr-1" />
                            Access
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            variant="outline"
                            disabled
                            className="border-red-500/20 text-red-300 bg-transparent"
                          >
                            Locked
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

        <TabsContent value="access">
          <div className="space-y-6">
            <Card className="p-6 bg-white/5 backdrop-blur-sm border-white/10">
              <h3 className="text-xl font-bold text-white mb-4">Quick Access Links</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <Button className="justify-start h-auto p-4 bg-[#5865F2] hover:bg-[#4752C4]">
                  <MessageCircle className="w-5 h-5 mr-3" />
                  <div className="text-left">
                    <div className="font-semibold">Join Discord</div>
                    <div className="text-xs opacity-80">2,547 members online</div>
                  </div>
                </Button>

                <Button className="justify-start h-auto p-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                  <Play className="w-5 h-5 mr-3" />
                  <div className="text-left">
                    <div className="font-semibold">Start Learning</div>
                    <div className="text-xs opacity-80">3 courses available</div>
                  </div>
                </Button>
              </div>
            </Card>

            <Card className="p-6 bg-white/5 backdrop-blur-sm border-white/10">
              <h3 className="text-xl font-bold text-white mb-4">Available Downloads</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Download className="w-5 h-5 text-purple-300" />
                    <div>
                      <p className="text-white font-medium">Web3 Development Guide</p>
                      <p className="text-white/60 text-sm">Complete PDF guide - 127 pages</p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                  >
                    Download
                  </Button>
                </div>

                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Download className="w-5 h-5 text-purple-300" />
                    <div>
                      <p className="text-white font-medium">DeFi Strategy Templates</p>
                      <p className="text-white/60 text-sm">Excel templates for yield farming</p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                  >
                    Download
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="events">
          <div className="space-y-6">
            <Card className="p-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 backdrop-blur-sm border-green-500/20">
              <div className="flex items-center space-x-3 mb-4">
                <Calendar className="w-6 h-6 text-green-400" />
                <h3 className="text-xl font-bold text-white">Upcoming Events</h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <div>
                    <h4 className="text-white font-semibold">NYC Web3 Meetup</h4>
                    <p className="text-white/70 text-sm">December 15, 2024 • 6:00 PM EST</p>
                    <Badge className="mt-2 bg-yellow-500/20 text-yellow-300">Gold+ Required</Badge>
                  </div>
                  <div className="text-right">
                    <QrCode className="w-8 h-8 text-purple-300 mb-2" />
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    >
                      Get QR Code
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <div>
                    <h4 className="text-white font-semibold">Virtual AMA Session</h4>
                    <p className="text-white/70 text-sm">December 20, 2024 • 3:00 PM EST</p>
                    <Badge className="mt-2 bg-gray-500/20 text-gray-300">Genesis+ Required</Badge>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                  >
                    Join Waitlist
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="rewards">
          <div className="space-y-6">
            <Card className="p-6 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 backdrop-blur-sm border-yellow-500/20">
              <div className="flex items-center space-x-3 mb-4">
                <Trophy className="w-6 h-6 text-yellow-400" />
                <h3 className="text-xl font-bold text-white">Achievement Progress</h3>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-white/5 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white font-semibold">Community Contributor</h4>
                    <Badge className="bg-green-500/20 text-green-300">Completed</Badge>
                  </div>
                  <p className="text-white/70 text-sm mb-2">Join Discord and make 10 posts</p>
                  <Progress value={100} className="h-2 bg-white/10" />
                </div>

                <div className="p-4 bg-white/5 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white font-semibold">Event Enthusiast</h4>
                    <Badge className="bg-blue-500/20 text-blue-300">In Progress</Badge>
                  </div>
                  <p className="text-white/70 text-sm mb-2">Attend 3 events (2/3 completed)</p>
                  <Progress value={67} className="h-2 bg-white/10" />
                </div>

                <div className="p-4 bg-white/5 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white font-semibold">Knowledge Seeker</h4>
                    <Badge className="bg-purple-500/20 text-purple-300">Locked</Badge>
                  </div>
                  <p className="text-white/70 text-sm mb-2">Complete 5 courses (Requires Gold+)</p>
                  <Progress value={0} className="h-2 bg-white/10" />
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white/5 backdrop-blur-sm border-white/10">
              <h3 className="text-xl font-bold text-white mb-4">Available Rewards</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/20">
                  <Gift className="w-8 h-8 text-purple-300 mb-2" />
                  <h4 className="text-white font-semibold mb-1">Exclusive NFT Badge</h4>
                  <p className="text-white/70 text-sm mb-3">Unlock special badge for your profile</p>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  >
                    <Zap className="w-3 h-3 mr-1" />
                    Claim (500 XP)
                  </Button>
                </div>

                <div className="p-4 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-lg border border-yellow-500/20">
                  <Crown className="w-8 h-8 text-yellow-300 mb-2" />
                  <h4 className="text-white font-semibold mb-1">Tier Upgrade</h4>
                  <p className="text-white/70 text-sm mb-3">Upgrade to next tier with achievements</p>
                  <Button
                    size="sm"
                    variant="outline"
                    disabled
                    className="border-yellow-500/20 text-yellow-300 bg-transparent"
                  >
                    750 XP Required
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
