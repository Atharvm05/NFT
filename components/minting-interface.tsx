"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Loader2, Sparkles, Crown, Zap, Star } from "lucide-react"

interface NFTTier {
  id: string
  name: string
  price: string
  icon: string
  benefits: string[]
  rarity: string
  color: string
  gradient: string
}

const nftTiers: NFTTier[] = [
  {
    id: "genesis",
    name: "Genesis Passport",
    price: "0.05",
    icon: "🎫",
    benefits: ["Discord Access", "Basic Events", "Community Forum"],
    rarity: "Common",
    color: "from-gray-400 to-gray-600",
    gradient: "from-gray-500/20 to-gray-600/20",
  },
  {
    id: "gold",
    name: "Gold Passport",
    price: "0.15",
    icon: "🎫",
    benefits: ["All Genesis Benefits", "Premium Courses", "VIP Events", "Partner Discounts"],
    rarity: "Rare",
    color: "from-yellow-400 to-orange-500",
    gradient: "from-yellow-500/20 to-orange-500/20",
  },
  {
    id: "legendary",
    name: "Legendary Passport",
    price: "0.5",
    icon: "🎫",
    benefits: ["All Gold Benefits", "1-on-1 Sessions", "Exclusive Meetups", "Early Access", "Governance Rights"],
    rarity: "Legendary",
    color: "from-purple-400 to-pink-500",
    gradient: "from-purple-500/20 to-pink-500/20",
  },
]

export function MintingInterface() {
  const [selectedTier, setSelectedTier] = useState<NFTTier>(nftTiers[0])
  const [quantity, setQuantity] = useState(1)
  const [isMinting, setIsMinting] = useState(false)
  const [mintingProgress, setMintingProgress] = useState(0)
  const [mintingStep, setMintingStep] = useState("")
  const [mintSuccess, setMintSuccess] = useState(false)
  const [mintedTokenId, setMintedTokenId] = useState("")

  const handleMint = async () => {
    setIsMinting(true)
    setMintingProgress(0)
    setMintingStep("Preparing transaction...")

    // Simulate minting process
    const steps = [
      { progress: 20, step: "Validating wallet connection..." },
      { progress: 40, step: "Generating NFT metadata..." },
      { progress: 60, step: "Uploading to IPFS..." },
      { progress: 80, step: "Minting on Polygon..." },
      { progress: 100, step: "Transaction confirmed!" },
    ]

    for (const { progress, step } of steps) {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setMintingProgress(progress)
      setMintingStep(step)
    }

    setMintedTokenId(`#${Math.floor(Math.random() * 10000)}`)
    setMintSuccess(true)
    setIsMinting(false)
  }

  if (mintSuccess) {
    return (
      <div className="max-w-2xl mx-auto text-center">
        <Card className="p-8 bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-sm border-green-500/30">
          <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white mb-4">Minting Successful!</h2>
          <p className="text-white/80 mb-6">Your {selectedTier.name} has been minted successfully.</p>

          <div className="bg-white/10 rounded-lg p-6 mb-6">
            <div
              className={`w-32 h-32 bg-gradient-to-br ${selectedTier.color} rounded-lg mx-auto mb-4 flex items-center justify-center text-6xl border-2 border-white/20`}
            >
              {selectedTier.icon}
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">{selectedTier.name}</h3>
            <Badge className="bg-green-500/20 text-green-300 border-green-500/30 mb-2">Token ID: {mintedTokenId}</Badge>
            <p className="text-white/60 text-sm">Minted on Polygon Network</p>
          </div>

          <div className="flex gap-4 justify-center">
            <Button
              onClick={() => setMintSuccess(false)}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              Mint Another
            </Button>
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
              View in Wallet
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  if (isMinting) {
    return (
      <div className="max-w-2xl mx-auto text-center">
        <Card className="p-8 bg-white/5 backdrop-blur-sm border-white/10">
          <Loader2 className="w-16 h-16 text-purple-400 mx-auto mb-4 animate-spin" />
          <h2 className="text-3xl font-bold text-white mb-4">Minting Your NFT Passport</h2>
          <p className="text-white/80 mb-6">{mintingStep}</p>

          <div className="mb-6">
            <Progress value={mintingProgress} className="h-3 bg-white/10" />
            <p className="text-white/60 text-sm mt-2">{mintingProgress}% Complete</p>
          </div>

          <div
            className={`w-32 h-32 bg-gradient-to-br ${selectedTier.color} rounded-lg mx-auto mb-4 flex items-center justify-center text-6xl animate-pulse`}
          >
            {selectedTier.icon}
          </div>

          <p className="text-white/60">Please don't close this window...</p>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <Badge className="mb-4 bg-purple-500/20 text-purple-300 border-purple-500/30">
          <Sparkles className="w-3 h-3 mr-1" />
          Mint Your Passport
        </Badge>
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Choose Your Access Level</h1>
        <p className="text-xl text-white/80 max-w-3xl mx-auto">
          Select the NFT tier that matches your needs. Each passport unlocks different levels of access and benefits.
        </p>
      </div>

      <Tabs defaultValue="select" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-white/10 border-white/20">
          <TabsTrigger value="select" className="data-[state=active]:bg-white/20 text-white">
            Select Tier
          </TabsTrigger>
          <TabsTrigger value="customize" className="data-[state=active]:bg-white/20 text-white">
            Customize
          </TabsTrigger>
        </TabsList>

        <TabsContent value="select" className="mt-8">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {nftTiers.map((tier) => (
              <Card
                key={tier.id}
                className={`p-6 cursor-pointer transition-all border-2 ${
                  selectedTier.id === tier.id
                    ? "border-purple-400 bg-purple-500/20"
                    : "border-white/10 bg-white/5 hover:bg-white/10"
                } backdrop-blur-sm`}
                onClick={() => setSelectedTier(tier)}
              >
                <div className="text-center">
                  <div
                    className={`w-24 h-24 bg-gradient-to-br ${tier.color} rounded-lg mx-auto mb-4 flex items-center justify-center text-4xl ${
                      tier.id === "legendary" ? "animate-pulse border-2 border-purple-400" : ""
                    }`}
                  >
                    {tier.icon}
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">{tier.name}</h3>

                  <div className="flex justify-center items-center space-x-2 mb-4">
                    <Badge
                      className={`${
                        tier.rarity === "Common"
                          ? "bg-gray-500/20 text-gray-300"
                          : tier.rarity === "Rare"
                            ? "bg-yellow-500/20 text-yellow-300"
                            : "bg-purple-500/20 text-purple-300"
                      }`}
                    >
                      {tier.rarity === "Legendary" && <Crown className="w-3 h-3 mr-1" />}
                      {tier.rarity === "Rare" && <Star className="w-3 h-3 mr-1" />}
                      {tier.rarity}
                    </Badge>
                  </div>

                  <div className="text-3xl font-bold text-white mb-4">
                    {tier.price} <span className="text-lg text-white/60">MATIC</span>
                  </div>

                  <div className="space-y-2 text-left">
                    {tier.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                        <span className="text-white/80 text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="customize" className="mt-8">
          <Card className="p-6 bg-white/5 backdrop-blur-sm border-white/10">
            <h3 className="text-xl font-bold text-white mb-4">Customize Your Mint</h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="quantity" className="text-white mb-2 block">
                  Quantity
                </Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  max="10"
                  value={quantity}
                  onChange={(e) => setQuantity(Number.parseInt(e.target.value) || 1)}
                  className="bg-white/10 border-white/20 text-white"
                />
                <p className="text-white/60 text-sm mt-1">Maximum 10 per transaction</p>
              </div>

              <div>
                <Label className="text-white mb-2 block">Total Cost</Label>
                <div className="text-2xl font-bold text-white">
                  {(Number.parseFloat(selectedTier.price) * quantity).toFixed(3)} MATIC
                </div>
                <p className="text-white/60 text-sm">
                  ≈ ${(Number.parseFloat(selectedTier.price) * quantity * 0.85).toFixed(2)} USD
                </p>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Mint Button */}
      <Card className="mt-8 p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm border-white/20">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">Ready to Mint</h3>
            <p className="text-white/70">
              {quantity}x {selectedTier.name} • {(Number.parseFloat(selectedTier.price) * quantity).toFixed(3)} MATIC
            </p>
          </div>
          <Button
            onClick={handleMint}
            size="lg"
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8"
          >
            <Zap className="w-5 h-5 mr-2" />
            Mint NFT Passport
          </Button>
        </div>
      </Card>
    </div>
  )
}
