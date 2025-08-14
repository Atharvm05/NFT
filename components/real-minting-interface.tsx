"use client"

import { useState, useEffect } from "react"
import { useAccount } from "wagmi"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { useNFTContract } from "@/hooks/use-real-nft-contract"
import { Loader2, CheckCircle, AlertCircle, Star, Crown, Gem } from "lucide-react"

const TIER_CONFIG = [
  {
    id: "GENESIS" as const,
    name: "Genesis",
    price: "0.1",
    icon: Star,
    color: "from-blue-500 to-cyan-500",
    benefits: ["Discord Access", "Monthly Newsletter", "Community Events", "Basic Support"],
  },
  {
    id: "GOLD" as const,
    name: "Gold",
    price: "0.25",
    icon: Crown,
    color: "from-yellow-500 to-orange-500",
    benefits: ["All Genesis Benefits", "Premium Courses", "Weekly AMAs", "Partner Discounts", "Priority Support"],
  },
  {
    id: "LEGENDARY" as const,
    name: "Legendary",
    price: "0.5",
    icon: Gem,
    color: "from-purple-500 to-pink-500",
    benefits: ["All Gold Benefits", "VIP Events", "Direct Founder Access", "Early Product Access", "Revenue Sharing"],
  },
]

export function RealMintingInterface() {
  const { address, isConnected } = useAccount()
  const { mintNFT, isPending, isConfirming, isSuccess, error, hash } = useNFTContract()
  const [selectedTier, setSelectedTier] = useState<"GENESIS" | "GOLD" | "LEGENDARY">("GENESIS")
  const [quantity, setQuantity] = useState(1)
  const [mintingStep, setMintingStep] = useState<"idle" | "uploading" | "minting" | "confirming" | "success" | "error">(
    "idle",
  )

  useEffect(() => {
    if (isPending) {
      setMintingStep("minting")
    } else if (isConfirming) {
      setMintingStep("confirming")
    } else if (isSuccess) {
      setMintingStep("success")
    } else if (error) {
      setMintingStep("error")
    }
  }, [isPending, isConfirming, isSuccess, error])

  const handleMint = async () => {
    if (!address || !isConnected) return

    try {
      setMintingStep("uploading")
      await mintNFT(selectedTier, quantity)
    } catch (err) {
      console.error("Minting error:", err)
      setMintingStep("error")
    }
  }

  const selectedTierConfig = TIER_CONFIG.find((tier) => tier.id === selectedTier)!
  const totalPrice = Number.parseFloat(selectedTierConfig.price) * quantity

  if (!isConnected) {
    return (
      <Card className="max-w-md mx-auto">
        <CardHeader className="text-center">
          <CardTitle>Connect Your Wallet</CardTitle>
          <CardDescription>Please connect your wallet to mint your NFT Access Passport</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  if (mintingStep === "success") {
    return (
      <Card className="max-w-md mx-auto">
        <CardHeader className="text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <CardTitle className="text-green-500">Minting Successful!</CardTitle>
          <CardDescription>Your NFT Access Passport has been minted successfully</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">Transaction Hash:</p>
            <p className="text-xs font-mono bg-muted p-2 rounded break-all">{hash}</p>
          </div>
          <div className="text-center">
            <Badge variant="secondary" className="mb-2">
              {selectedTierConfig.name} Tier
            </Badge>
            <p className="text-sm">Quantity: {quantity}</p>
            <p className="text-sm">Total Paid: {totalPrice} MATIC</p>
          </div>
          <Button
            onClick={() => {
              setMintingStep("idle")
              setQuantity(1)
            }}
            className="w-full"
          >
            Mint Another
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (mintingStep === "error") {
    return (
      <Card className="max-w-md mx-auto">
        <CardHeader className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <CardTitle className="text-red-500">Minting Failed</CardTitle>
          <CardDescription>There was an error minting your NFT</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">Error Details:</p>
            <p className="text-xs bg-red-50 dark:bg-red-950 p-2 rounded text-red-600 dark:text-red-400">
              {error?.message || "Unknown error occurred"}
            </p>
          </div>
          <Button onClick={() => setMintingStep("idle")} variant="outline" className="w-full">
            Try Again
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (mintingStep !== "idle") {
    const steps = [
      { key: "uploading", label: "Uploading to IPFS", progress: 25 },
      { key: "minting", label: "Confirming Transaction", progress: 50 },
      { key: "confirming", label: "Mining Block", progress: 75 },
      { key: "success", label: "Complete", progress: 100 },
    ]

    const currentStep = steps.find((step) => step.key === mintingStep)
    const progress = currentStep?.progress || 0

    return (
      <Card className="max-w-md mx-auto">
        <CardHeader className="text-center">
          <Loader2 className="w-16 h-16 animate-spin text-purple-500 mx-auto mb-4" />
          <CardTitle>Minting Your NFT</CardTitle>
          <CardDescription>{currentStep?.label}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Progress value={progress} className="w-full" />
          <div className="text-center text-sm text-muted-foreground">
            <p>Please don't close this window</p>
            <p>This may take a few minutes</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Mint Your NFT Access Passport
        </h1>
        <p className="text-xl text-muted-foreground">Choose your tier and start your Web3 journey</p>
      </div>

      <Tabs value={selectedTier} onValueChange={(value) => setSelectedTier(value as "GENESIS" | "GOLD" | "LEGENDARY")}>
        <TabsList className="grid w-full grid-cols-3">
          {TIER_CONFIG.map((tier) => {
            const Icon = tier.icon
            return (
              <TabsTrigger key={tier.id} value={tier.id} className="flex items-center space-x-2">
                <Icon className="w-4 h-4" />
                <span>{tier.name}</span>
              </TabsTrigger>
            )
          })}
        </TabsList>

        {TIER_CONFIG.map((tier) => {
          const Icon = tier.icon
          return (
            <TabsContent key={tier.id} value={tier.id}>
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className={`p-3 rounded-full bg-gradient-to-r ${tier.color}`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="flex items-center space-x-2">
                        <span>{tier.name} Tier</span>
                        <Badge variant="secondary">{tier.price} MATIC</Badge>
                      </CardTitle>
                      <CardDescription>Premium Web3 membership with exclusive benefits</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3">Included Benefits:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {tier.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="quantity">Quantity</Label>
                      <Input
                        id="quantity"
                        type="number"
                        min="1"
                        max="10"
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
                        className="mt-1"
                      />
                    </div>

                    <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                      <span className="font-semibold">Total Cost:</span>
                      <span className="text-xl font-bold">{totalPrice.toFixed(3)} MATIC</span>
                    </div>

                    <Button
                      onClick={handleMint}
                      disabled={isPending || isConfirming}
                      className={`w-full bg-gradient-to-r ${tier.color} hover:opacity-90 text-white`}
                    >
                      {isPending || isConfirming ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Minting...
                        </>
                      ) : (
                        `Mint ${tier.name} NFT${quantity > 1 ? `s (${quantity})` : ""}`
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )
        })}
      </Tabs>
    </div>
  )
}
