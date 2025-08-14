"use client"

import { useAccount } from "wagmi"
import { useUserNFTs, useNFTData } from "@/hooks/use-real-nft-contract"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Star, Crown, Gem, Users, BookOpen, Calendar, Gift } from "lucide-react"
import { WalletConnect } from "./wallet-connect"

export function RealDashboard() {
  const { address, isConnected } = useAccount()
  const { tokenIds, balance } = useUserNFTs(address)

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardHeader className="text-center">
            <CardTitle>Connect Your Wallet</CardTitle>
            <CardDescription>Please connect your wallet to access your NFT dashboard</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <WalletConnect />
          </CardContent>
        </Card>
      </div>
    )
  }

  if (balance === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardHeader className="text-center">
            <CardTitle>No NFTs Found</CardTitle>
            <CardDescription>You don't have any NFT Access Passports yet</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button asChild>
              <a href="/mint">Mint Your First NFT</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg"></div>
            <h1 className="text-2xl font-bold text-white">NFT Passport Dashboard</h1>
          </div>
          <WalletConnect />
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* NFT Collection Overview */}
          <div className="lg:col-span-1">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Your NFT Collection</CardTitle>
                <CardDescription className="text-gray-300">
                  You own {balance} NFT Access Passport{balance !== 1 ? "s" : ""}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {tokenIds.map((tokenId) => (
                  <NFTCard key={tokenId} tokenId={tokenId} />
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Access Dashboard */}
          <div className="lg:col-span-2">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Your Access Dashboard</CardTitle>
                <CardDescription className="text-gray-300">
                  Exclusive benefits and content for NFT holders
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="community" className="w-full">
                  <TabsList className="grid w-full grid-cols-4 bg-white/10">
                    <TabsTrigger value="community" className="text-white data-[state=active]:bg-white/20">
                      <Users className="w-4 h-4 mr-2" />
                      Community
                    </TabsTrigger>
                    <TabsTrigger value="courses" className="text-white data-[state=active]:bg-white/20">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Courses
                    </TabsTrigger>
                    <TabsTrigger value="events" className="text-white data-[state=active]:bg-white/20">
                      <Calendar className="w-4 h-4 mr-2" />
                      Events
                    </TabsTrigger>
                    <TabsTrigger value="rewards" className="text-white data-[state=active]:bg-white/20">
                      <Gift className="w-4 h-4 mr-2" />
                      Rewards
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="community" className="mt-6">
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card className="bg-white/5 border-white/10">
                          <CardContent className="p-4">
                            <h3 className="text-white font-semibold mb-2">Discord Access</h3>
                            <p className="text-gray-300 text-sm mb-3">Join our exclusive Discord community</p>
                            <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                              Join Discord
                            </Button>
                          </CardContent>
                        </Card>
                        <Card className="bg-white/5 border-white/10">
                          <CardContent className="p-4">
                            <h3 className="text-white font-semibold mb-2">Private Forums</h3>
                            <p className="text-gray-300 text-sm mb-3">Access member-only discussions</p>
                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                              Enter Forums
                            </Button>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="courses" className="mt-6">
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card className="bg-white/5 border-white/10">
                          <CardContent className="p-4">
                            <h3 className="text-white font-semibold mb-2">Web3 Fundamentals</h3>
                            <p className="text-gray-300 text-sm mb-3">Learn the basics of blockchain technology</p>
                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                              Start Course
                            </Button>
                          </CardContent>
                        </Card>
                        <Card className="bg-white/5 border-white/10">
                          <CardContent className="p-4">
                            <h3 className="text-white font-semibold mb-2">DeFi Strategies</h3>
                            <p className="text-gray-300 text-sm mb-3">Advanced DeFi investment strategies</p>
                            <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700">
                              Start Course
                            </Button>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="events" className="mt-6">
                    <div className="space-y-4">
                      <Card className="bg-white/5 border-white/10">
                        <CardContent className="p-4">
                          <h3 className="text-white font-semibold mb-2">Upcoming Events</h3>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="text-white text-sm">Web3 Workshop</p>
                                <p className="text-gray-400 text-xs">Dec 15, 2024 - 2:00 PM UTC</p>
                              </div>
                              <Button size="sm">RSVP</Button>
                            </div>
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="text-white text-sm">Community Meetup</p>
                                <p className="text-gray-400 text-xs">Dec 20, 2024 - 6:00 PM UTC</p>
                              </div>
                              <Button size="sm">RSVP</Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="rewards" className="mt-6">
                    <div className="space-y-4">
                      <Card className="bg-white/5 border-white/10">
                        <CardContent className="p-4">
                          <h3 className="text-white font-semibold mb-2">Available Rewards</h3>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="text-white text-sm">Partner Store 20% Off</p>
                                <p className="text-gray-400 text-xs">Valid until Dec 31, 2024</p>
                              </div>
                              <Button size="sm">Claim</Button>
                            </div>
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="text-white text-sm">Exclusive NFT Drop</p>
                                <p className="text-gray-400 text-xs">Limited time offer</p>
                              </div>
                              <Button size="sm">Claim</Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

function NFTCard({ tokenId }: { tokenId: number }) {
  const { passportData } = useNFTData(tokenId)

  if (!passportData) {
    return (
      <Card className="bg-white/5 border-white/10">
        <CardContent className="p-4">
          <div className="animate-pulse">
            <div className="h-4 bg-white/20 rounded mb-2"></div>
            <div className="h-3 bg-white/10 rounded"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const tierIcons = {
    0: Star,
    1: Crown,
    2: Gem,
  }

  const tierNames = {
    0: "Genesis",
    1: "Gold",
    2: "Legendary",
  }

  const tierColors = {
    0: "from-blue-500 to-cyan-500",
    1: "from-yellow-500 to-orange-500",
    2: "from-purple-500 to-pink-500",
  }

  const Icon = tierIcons[passportData.tier as keyof typeof tierIcons] || Star
  const tierName = tierNames[passportData.tier as keyof typeof tierNames] || "Genesis"
  const tierColor = tierColors[passportData.tier as keyof typeof tierColors] || "from-blue-500 to-cyan-500"

  return (
    <Card className="bg-white/5 border-white/10">
      <CardContent className="p-4">
        <div className="flex items-center space-x-3 mb-3">
          <div className={`p-2 rounded-full bg-gradient-to-r ${tierColor}`}>
            <Icon className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-white font-semibold">#{tokenId}</h3>
            <Badge variant="secondary" className="text-xs">
              {tierName}
            </Badge>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-300">Level:</span>
            <span className="text-white">{Number(passportData.level)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-300">XP:</span>
            <span className="text-white">{Number(passportData.xp)}</span>
          </div>
          <Progress value={Number(passportData.xp) % 100} className="h-2" />
        </div>
      </CardContent>
    </Card>
  )
}
