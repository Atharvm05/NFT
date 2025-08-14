"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import {
  Gift,
  ShoppingBag,
  Ticket,
  Coffee,
  Gamepad2,
  Headphones,
  Plane,
  Home,
  ExternalLink,
  Copy,
  CheckCircle,
  Clock,
  Star,
  Crown,
  Sparkles,
  Search,
  MapPin,
  Calendar,
  Percent,
} from "lucide-react"

interface Partner {
  id: string
  name: string
  category: "retail" | "food" | "tech" | "travel" | "lifestyle" | "entertainment"
  logo: string
  description: string
  website: string
  discount: number
  discountType: "percentage" | "fixed" | "bogo"
  requiredTier: "genesis" | "gold" | "legendary"
  location?: string
  validUntil?: string
  usageLimit?: number
  usedCount?: number
  featured: boolean
}

interface Perk {
  id: string
  title: string
  description: string
  type: "discount" | "exclusive" | "early_access" | "free_item"
  partner: string
  value: string
  code?: string
  qrCode?: string
  requiredTier: "genesis" | "gold" | "legendary"
  status: "available" | "claimed" | "expired"
  expiresAt?: string
  category: string
}

const partners: Partner[] = [
  {
    id: "1",
    name: "TechGear Pro",
    category: "tech",
    logo: "🎧",
    description: "Premium headphones and audio equipment",
    website: "techgearpro.com",
    discount: 25,
    discountType: "percentage",
    requiredTier: "genesis",
    validUntil: "2024-12-31",
    featured: true,
  },
  {
    id: "2",
    name: "Crypto Coffee",
    category: "food",
    logo: "☕",
    description: "Blockchain-themed coffee shop chain",
    website: "cryptocoffee.io",
    discount: 15,
    discountType: "percentage",
    requiredTier: "genesis",
    location: "NYC, SF, LA",
    featured: false,
  },
  {
    id: "3",
    name: "Web3 Apparel",
    category: "retail",
    logo: "👕",
    description: "Exclusive NFT and crypto-themed clothing",
    website: "web3apparel.com",
    discount: 30,
    discountType: "percentage",
    requiredTier: "gold",
    featured: true,
  },
  {
    id: "4",
    name: "DeFi Travel",
    category: "travel",
    logo: "✈️",
    description: "Crypto-friendly travel booking platform",
    website: "defitravel.com",
    discount: 200,
    discountType: "fixed",
    requiredTier: "gold",
    featured: false,
  },
  {
    id: "5",
    name: "MetaVerse Gaming",
    category: "entertainment",
    logo: "🎮",
    description: "Premium gaming accessories and NFT games",
    website: "metaversegaming.gg",
    discount: 40,
    discountType: "percentage",
    requiredTier: "legendary",
    featured: true,
  },
  {
    id: "6",
    name: "Luxury Crypto Stays",
    category: "travel",
    logo: "🏨",
    description: "High-end accommodations accepting crypto",
    website: "luxurycryptostays.com",
    discount: 500,
    discountType: "fixed",
    requiredTier: "legendary",
    featured: false,
  },
]

const perks: Perk[] = [
  {
    id: "1",
    title: "25% Off Premium Headphones",
    description: "Get 25% off any premium headphone purchase",
    type: "discount",
    partner: "TechGear Pro",
    value: "25% OFF",
    code: "NFT25TECH",
    requiredTier: "genesis",
    status: "available",
    expiresAt: "2024-12-31",
    category: "tech",
  },
  {
    id: "2",
    title: "Free Coffee Upgrade",
    description: "Upgrade any coffee size for free",
    type: "free_item",
    partner: "Crypto Coffee",
    value: "Free Upgrade",
    qrCode: "QR_COFFEE_001",
    requiredTier: "genesis",
    status: "claimed",
    category: "food",
  },
  {
    id: "3",
    title: "Exclusive NFT Hoodie",
    description: "Limited edition hoodie only for Gold+ members",
    type: "exclusive",
    partner: "Web3 Apparel",
    value: "Exclusive Item",
    code: "GOLD_HOODIE_2024",
    requiredTier: "gold",
    status: "available",
    category: "retail",
  },
  {
    id: "4",
    title: "Early Access: New Game Launch",
    description: "48-hour early access to upcoming NFT game",
    type: "early_access",
    partner: "MetaVerse Gaming",
    value: "Early Access",
    requiredTier: "legendary",
    status: "available",
    expiresAt: "2024-12-20",
    category: "entertainment",
  },
]

export function BenefitsHub() {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [copiedCode, setCopiedCode] = useState("")

  const userTier = "gold" // Mock user tier

  const getAccessStatus = (requiredTier: string) => {
    const tierHierarchy = { genesis: 1, gold: 2, legendary: 3 }
    const userTierLevel = tierHierarchy[userTier as keyof typeof tierHierarchy]
    const requiredTierLevel = tierHierarchy[requiredTier as keyof typeof tierHierarchy]
    return userTierLevel >= requiredTierLevel
  }

  const getTierColor = (tier: string) => {
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

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "retail":
        return ShoppingBag
      case "food":
        return Coffee
      case "tech":
        return Headphones
      case "travel":
        return Plane
      case "lifestyle":
        return Home
      case "entertainment":
        return Gamepad2
      default:
        return Gift
    }
  }

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(""), 2000)
  }

  const filteredPartners = partners.filter((partner) => {
    const matchesSearch = partner.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || partner.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const availablePerks = perks.filter((perk) => getAccessStatus(perk.requiredTier))

  return (
    <div className="max-w-7xl mx-auto">
      {/* Benefits Overview Header */}
      <Card className="mb-8 p-8 bg-gradient-to-r from-green-500/10 to-emerald-500/10 backdrop-blur-sm border-green-500/20">
        <div className="text-center mb-8">
          <Badge className="mb-4 bg-green-500/20 text-green-300 border-green-500/30">
            <Gift className="w-3 h-3 mr-1" />
            Exclusive Benefits
          </Badge>
          <h1 className="text-4xl font-bold text-white mb-4">Your Perks & Benefits</h1>
          <p className="text-white/80 max-w-3xl mx-auto">
            Access exclusive discounts, early releases, and special offers from our premium partners. Your {userTier}{" "}
            tier unlocks amazing benefits.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          <Card className="p-4 bg-white/10 backdrop-blur-sm border-white/20">
            <div className="text-center">
              <ShoppingBag className="w-8 h-8 text-purple-300 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{partners.length}</p>
              <p className="text-white/70 text-sm">Partner Stores</p>
            </div>
          </Card>

          <Card className="p-4 bg-white/10 backdrop-blur-sm border-white/20">
            <div className="text-center">
              <Percent className="w-8 h-8 text-green-300 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">
                {Math.round(partners.reduce((acc, p) => acc + p.discount, 0) / partners.length)}%
              </p>
              <p className="text-white/70 text-sm">Avg. Discount</p>
            </div>
          </Card>

          <Card className="p-4 bg-white/10 backdrop-blur-sm border-white/20">
            <div className="text-center">
              <Ticket className="w-8 h-8 text-yellow-300 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{availablePerks.length}</p>
              <p className="text-white/70 text-sm">Available Perks</p>
            </div>
          </Card>

          <Card className="p-4 bg-white/10 backdrop-blur-sm border-white/20">
            <div className="text-center">
              <Star className="w-8 h-8 text-blue-300 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{userTier}</p>
              <p className="text-white/70 text-sm">Your Tier</p>
            </div>
          </Card>
        </div>
      </Card>

      {/* Main Benefits Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-white/10 border-white/20 mb-8">
          <TabsTrigger value="overview" className="data-[state=active]:bg-white/20 text-white">
            Overview
          </TabsTrigger>
          <TabsTrigger value="partners" className="data-[state=active]:bg-white/20 text-white">
            Partners
          </TabsTrigger>
          <TabsTrigger value="perks" className="data-[state=active]:bg-white/20 text-white">
            My Perks
          </TabsTrigger>
          <TabsTrigger value="redeem" className="data-[state=active]:bg-white/20 text-white">
            Redeem
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="space-y-8">
            {/* Featured Partners */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Featured Partners</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {partners
                  .filter((partner) => partner.featured && getAccessStatus(partner.requiredTier))
                  .map((partner) => {
                    const IconComponent = getCategoryIcon(partner.category)
                    return (
                      <Card
                        key={partner.id}
                        className="p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm border-purple-500/20 hover:border-purple-400/40 transition-all"
                      >
                        <div className="text-center">
                          <div className="text-4xl mb-3">{partner.logo}</div>
                          <h4 className="text-lg font-bold text-white mb-2">{partner.name}</h4>
                          <p className="text-white/70 text-sm mb-4">{partner.description}</p>

                          <div className="flex justify-center items-center space-x-2 mb-4">
                            <Badge className="bg-green-500/20 text-green-300">
                              {partner.discountType === "percentage"
                                ? `${partner.discount}% OFF`
                                : partner.discountType === "fixed"
                                  ? `$${partner.discount} OFF`
                                  : "BOGO"}
                            </Badge>
                            <Badge className={getTierColor(partner.requiredTier)}>
                              {partner.requiredTier === "legendary" && <Crown className="w-3 h-3 mr-1" />}
                              {partner.requiredTier === "gold" && <Star className="w-3 h-3 mr-1" />}
                              {partner.requiredTier.charAt(0).toUpperCase() + partner.requiredTier.slice(1)}+
                            </Badge>
                          </div>

                          <Button
                            size="sm"
                            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 w-full"
                          >
                            <ExternalLink className="w-3 h-3 mr-2" />
                            Visit Store
                          </Button>
                        </div>
                      </Card>
                    )
                  })}
              </div>
            </div>

            {/* Quick Actions */}
            <Card className="p-6 bg-white/5 backdrop-blur-sm border-white/10">
              <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <Button
                  onClick={() => setActiveTab("perks")}
                  className="justify-start h-auto p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 hover:from-green-500/30 hover:to-emerald-500/30 border border-green-500/30"
                >
                  <Ticket className="w-5 h-5 mr-3" />
                  <div className="text-left">
                    <div className="font-semibold">View My Perks</div>
                    <div className="text-xs opacity-80">{availablePerks.length} available</div>
                  </div>
                </Button>

                <Button
                  onClick={() => setActiveTab("partners")}
                  className="justify-start h-auto p-4 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 hover:from-blue-500/30 hover:to-cyan-500/30 border border-blue-500/30"
                >
                  <ShoppingBag className="w-5 h-5 mr-3" />
                  <div className="text-left">
                    <div className="font-semibold">Browse Partners</div>
                    <div className="text-xs opacity-80">{partners.length} partners</div>
                  </div>
                </Button>

                <Button
                  onClick={() => setActiveTab("redeem")}
                  className="justify-start h-auto p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 border border-purple-500/30"
                >
                  <Gift className="w-5 h-5 mr-3" />
                  <div className="text-left">
                    <div className="font-semibold">Redeem Codes</div>
                    <div className="text-xs opacity-80">Get discount codes</div>
                  </div>
                </Button>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="partners">
          <div className="space-y-6">
            {/* Search and Filter */}
            <Card className="p-6 bg-white/5 backdrop-blur-sm border-white/10">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                <h3 className="text-xl font-bold text-white">Partner Directory</h3>
                <div className="flex space-x-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
                    <Input
                      placeholder="Search partners..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-white/10 border-white/20 text-white"
                    />
                  </div>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white"
                  >
                    <option value="all">All Categories</option>
                    <option value="retail">Retail</option>
                    <option value="food">Food & Drink</option>
                    <option value="tech">Technology</option>
                    <option value="travel">Travel</option>
                    <option value="entertainment">Entertainment</option>
                  </select>
                </div>
              </div>
            </Card>

            {/* Partners Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPartners.map((partner) => {
                const hasAccess = getAccessStatus(partner.requiredTier)
                const IconComponent = getCategoryIcon(partner.category)

                return (
                  <Card
                    key={partner.id}
                    className={`p-6 backdrop-blur-sm border transition-all ${
                      hasAccess ? "bg-white/5 border-white/10 hover:bg-white/10" : "bg-red-500/5 border-red-500/20"
                    }`}
                  >
                    <div className="flex items-start space-x-4 mb-4">
                      <div className="text-3xl">{partner.logo}</div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-white mb-1">{partner.name}</h4>
                        <p className="text-white/70 text-sm mb-2">{partner.description}</p>
                        <div className="flex items-center space-x-2">
                          <Badge className={`text-xs ${getTierColor(partner.category)}`}>
                            <IconComponent className="w-3 h-3 mr-1" />
                            {partner.category.charAt(0).toUpperCase() + partner.category.slice(1)}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Badge className="bg-green-500/20 text-green-300">
                          {partner.discountType === "percentage"
                            ? `${partner.discount}% OFF`
                            : partner.discountType === "fixed"
                              ? `$${partner.discount} OFF`
                              : "BOGO"}
                        </Badge>
                        <Badge className={getTierColor(partner.requiredTier)}>
                          {partner.requiredTier.charAt(0).toUpperCase() + partner.requiredTier.slice(1)}+ Required
                        </Badge>
                      </div>

                      {partner.location && (
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-white/60" />
                          <span className="text-white/70 text-sm">{partner.location}</span>
                        </div>
                      )}

                      {partner.validUntil && (
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-white/60" />
                          <span className="text-white/70 text-sm">Valid until {partner.validUntil}</span>
                        </div>
                      )}

                      <Button
                        disabled={!hasAccess}
                        className={
                          hasAccess
                            ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 w-full"
                            : "bg-gray-500/20 text-gray-400 w-full cursor-not-allowed"
                        }
                      >
                        <ExternalLink className="w-3 h-3 mr-2" />
                        {hasAccess ? "Visit Store" : "Tier Required"}
                      </Button>
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="perks">
          <div className="space-y-6">
            <Card className="p-6 bg-white/5 backdrop-blur-sm border-white/10">
              <h3 className="text-xl font-bold text-white mb-4">Your Available Perks</h3>
              <p className="text-white/70">
                These perks are available based on your {userTier} tier membership. Click to redeem or get codes.
              </p>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              {availablePerks.map((perk) => (
                <Card
                  key={perk.id}
                  className={`p-6 backdrop-blur-sm border ${
                    perk.status === "available"
                      ? "bg-white/5 border-white/10"
                      : perk.status === "claimed"
                        ? "bg-green-500/10 border-green-500/20"
                        : "bg-gray-500/10 border-gray-500/20"
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h4 className="font-semibold text-white mb-2">{perk.title}</h4>
                      <p className="text-white/70 text-sm mb-3">{perk.description}</p>
                      <div className="flex items-center space-x-2 mb-3">
                        <Badge className="bg-purple-500/20 text-purple-300">{perk.partner}</Badge>
                        <Badge className={getTierColor(perk.requiredTier)}>
                          {perk.requiredTier.charAt(0).toUpperCase() + perk.requiredTier.slice(1)}+
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge
                        className={`${
                          perk.status === "available"
                            ? "bg-green-500/20 text-green-300"
                            : perk.status === "claimed"
                              ? "bg-blue-500/20 text-blue-300"
                              : "bg-gray-500/20 text-gray-300"
                        }`}
                      >
                        {perk.status === "available" && <CheckCircle className="w-3 h-3 mr-1" />}
                        {perk.status === "claimed" && <CheckCircle className="w-3 h-3 mr-1" />}
                        {perk.status === "expired" && <Clock className="w-3 h-3 mr-1" />}
                        {perk.status.charAt(0).toUpperCase() + perk.status.slice(1)}
                      </Badge>
                    </div>
                  </div>

                  {perk.expiresAt && (
                    <div className="flex items-center space-x-2 mb-4">
                      <Clock className="w-4 h-4 text-yellow-400" />
                      <span className="text-yellow-300 text-sm">Expires: {perk.expiresAt}</span>
                    </div>
                  )}

                  {perk.code && perk.status === "available" && (
                    <div className="flex items-center space-x-2 mb-4 p-3 bg-white/10 rounded-lg">
                      <code className="text-white font-mono text-sm flex-1">{perk.code}</code>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyCode(perk.code!)}
                        className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                      >
                        {copiedCode === perk.code ? <CheckCircle className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      </Button>
                    </div>
                  )}

                  <Button
                    disabled={perk.status !== "available"}
                    className={
                      perk.status === "available"
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 w-full"
                        : "bg-gray-500/20 text-gray-400 w-full cursor-not-allowed"
                    }
                  >
                    {perk.status === "available" && <Gift className="w-3 h-3 mr-2" />}
                    {perk.status === "claimed" && <CheckCircle className="w-3 h-3 mr-2" />}
                    {perk.status === "available"
                      ? "Redeem Now"
                      : perk.status === "claimed"
                        ? "Already Claimed"
                        : "Expired"}
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="redeem">
          <div className="space-y-6">
            <Card className="p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm border-purple-500/20">
              <div className="text-center">
                <Sparkles className="w-12 h-12 text-purple-300 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-4">Redeem Your Benefits</h3>
                <p className="text-white/80 mb-6">
                  Generate discount codes and access exclusive offers from our partner network.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
                  <h4 className="font-semibold text-white mb-3">Generate Discount Code</h4>
                  <p className="text-white/70 text-sm mb-4">
                    Get a unique discount code for any available partner offer.
                  </p>
                  <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 w-full">
                    <Ticket className="w-4 h-4 mr-2" />
                    Generate Code
                  </Button>
                </Card>

                <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
                  <h4 className="font-semibold text-white mb-3">QR Code Access</h4>
                  <p className="text-white/70 text-sm mb-4">
                    Show QR codes at partner locations for instant discounts.
                  </p>
                  <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 w-full">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Show QR Code
                  </Button>
                </Card>
              </div>
            </Card>

            {/* Recent Redemptions */}
            <Card className="p-6 bg-white/5 backdrop-blur-sm border-white/10">
              <h3 className="text-xl font-bold text-white mb-4">Recent Redemptions</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <div>
                      <p className="text-white font-medium">TechGear Pro - 25% Off</p>
                      <p className="text-white/60 text-sm">Redeemed 2 days ago</p>
                    </div>
                  </div>
                  <Badge className="bg-green-500/20 text-green-300">$47 Saved</Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <div>
                      <p className="text-white font-medium">Crypto Coffee - Free Upgrade</p>
                      <p className="text-white/60 text-sm">Redeemed 1 week ago</p>
                    </div>
                  </div>
                  <Badge className="bg-green-500/20 text-green-300">$3 Saved</Badge>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
