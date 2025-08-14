"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  Trophy,
  Calendar,
  BarChart3,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Ban,
  CheckCircle,
  Crown,
  Star,
  Zap,
  AlertTriangle,
} from "lucide-react"

interface User {
  id: string
  address: string
  tier: "genesis" | "gold" | "legendary"
  level: number
  xp: number
  joinDate: string
  status: "active" | "banned" | "pending"
  nftCount: number
}

interface Event {
  id: string
  title: string
  date: string
  type: "virtual" | "physical"
  attendees: number
  maxAttendees: number
  status: "upcoming" | "ongoing" | "completed"
  requiredTier: "genesis" | "gold" | "legendary"
}

interface Challenge {
  id: string
  title: string
  type: "social" | "learning" | "event" | "referral"
  xpReward: number
  completions: number
  status: "active" | "paused" | "draft"
}

const mockUsers: User[] = [
  {
    id: "1",
    address: "0x742d35Cc6634C0532925a3b8D4",
    tier: "legendary",
    level: 5,
    xp: 2500,
    joinDate: "2024-01-15",
    status: "active",
    nftCount: 3,
  },
  {
    id: "2",
    address: "0x8f3a9B2E7c1d4F6a8b5e3c9d2f",
    tier: "gold",
    level: 4,
    xp: 1800,
    joinDate: "2024-02-20",
    status: "active",
    nftCount: 2,
  },
  {
    id: "3",
    address: "0x1c5d7A8F9e2b4C1d6a8c3E9B5f",
    tier: "genesis",
    level: 2,
    xp: 450,
    joinDate: "2024-03-10",
    status: "pending",
    nftCount: 1,
  },
]

const mockEvents: Event[] = [
  {
    id: "1",
    title: "NYC Web3 Meetup",
    date: "2024-12-15",
    type: "physical",
    attendees: 45,
    maxAttendees: 50,
    status: "upcoming",
    requiredTier: "gold",
  },
  {
    id: "2",
    title: "Virtual AMA Session",
    date: "2024-12-20",
    type: "virtual",
    attendees: 120,
    maxAttendees: 200,
    status: "upcoming",
    requiredTier: "genesis",
  },
  {
    id: "3",
    title: "DeFi Workshop",
    date: "2024-11-30",
    type: "virtual",
    attendees: 85,
    maxAttendees: 100,
    status: "completed",
    requiredTier: "gold",
  },
]

const mockChallenges: Challenge[] = [
  {
    id: "1",
    title: "Community Welcome",
    type: "social",
    xpReward: 50,
    completions: 234,
    status: "active",
  },
  {
    id: "2",
    title: "First Course Complete",
    type: "learning",
    xpReward: 100,
    completions: 156,
    status: "active",
  },
  {
    id: "3",
    title: "Event Attendee",
    type: "event",
    xpReward: 150,
    completions: 89,
    status: "paused",
  },
]

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-300"
      case "banned":
        return "bg-red-500/20 text-red-300"
      case "pending":
        return "bg-yellow-500/20 text-yellow-300"
      case "upcoming":
        return "bg-blue-500/20 text-blue-300"
      case "ongoing":
        return "bg-green-500/20 text-green-300"
      case "completed":
        return "bg-gray-500/20 text-gray-300"
      case "paused":
        return "bg-orange-500/20 text-orange-300"
      case "draft":
        return "bg-gray-500/20 text-gray-300"
      default:
        return "bg-gray-500/20 text-gray-300"
    }
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Admin Overview Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <Card className="p-6 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-sm border-blue-500/20">
          <div className="flex items-center space-x-3">
            <Users className="w-8 h-8 text-blue-400" />
            <div>
              <p className="text-blue-300 text-sm">Total Users</p>
              <p className="text-2xl font-bold text-white">1,247</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 backdrop-blur-sm border-green-500/20">
          <div className="flex items-center space-x-3">
            <Trophy className="w-8 h-8 text-green-400" />
            <div>
              <p className="text-green-300 text-sm">NFTs Minted</p>
              <p className="text-2xl font-bold text-white">2,891</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm border-purple-500/20">
          <div className="flex items-center space-x-3">
            <Calendar className="w-8 h-8 text-purple-400" />
            <div>
              <p className="text-purple-300 text-sm">Active Events</p>
              <p className="text-2xl font-bold text-white">12</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 backdrop-blur-sm border-yellow-500/20">
          <div className="flex items-center space-x-3">
            <BarChart3 className="w-8 h-8 text-yellow-400" />
            <div>
              <p className="text-yellow-300 text-sm">Revenue (ETH)</p>
              <p className="text-2xl font-bold text-white">145.7</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Main Admin Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-white/10 border-white/20 mb-8">
          <TabsTrigger value="overview" className="data-[state=active]:bg-white/20 text-white">
            Overview
          </TabsTrigger>
          <TabsTrigger value="users" className="data-[state=active]:bg-white/20 text-white">
            Users
          </TabsTrigger>
          <TabsTrigger value="events" className="data-[state=active]:bg-white/20 text-white">
            Events
          </TabsTrigger>
          <TabsTrigger value="challenges" className="data-[state=active]:bg-white/20 text-white">
            Challenges
          </TabsTrigger>
          <TabsTrigger value="settings" className="data-[state=active]:bg-white/20 text-white">
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="space-y-6">
            {/* Recent Activity */}
            <Card className="p-6 bg-white/5 backdrop-blur-sm border-white/10">
              <h3 className="text-xl font-bold text-white mb-4">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <div>
                      <p className="text-white font-medium">New user registered</p>
                      <p className="text-white/60 text-sm">0x742d...8D4C joined the platform</p>
                    </div>
                  </div>
                  <span className="text-white/60 text-sm">2 min ago</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Trophy className="w-5 h-5 text-yellow-400" />
                    <div>
                      <p className="text-white font-medium">NFT minted</p>
                      <p className="text-white/60 text-sm">Gold Passport #7429 minted</p>
                    </div>
                  </div>
                  <span className="text-white/60 text-sm">5 min ago</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-purple-400" />
                    <div>
                      <p className="text-white font-medium">Event created</p>
                      <p className="text-white/60 text-sm">NYC Web3 Meetup scheduled</p>
                    </div>
                  </div>
                  <span className="text-white/60 text-sm">1 hour ago</span>
                </div>
              </div>
            </Card>

            {/* Platform Analytics */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 bg-white/5 backdrop-blur-sm border-white/10">
                <h3 className="text-xl font-bold text-white mb-4">User Growth</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">This Month</span>
                    <span className="text-green-400 font-semibold">+23%</span>
                  </div>
                  <Progress value={75} className="h-2 bg-white/10" />
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">New Users: 187</span>
                    <span className="text-white/60">Target: 250</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-white/5 backdrop-blur-sm border-white/10">
                <h3 className="text-xl font-bold text-white mb-4">Tier Distribution</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                      <span className="text-white/70">Genesis</span>
                    </div>
                    <span className="text-white">65%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <span className="text-white/70">Gold</span>
                    </div>
                    <span className="text-white">28%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                      <span className="text-white/70">Legendary</span>
                    </div>
                    <span className="text-white">7%</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="users">
          <div className="space-y-6">
            {/* User Management Header */}
            <Card className="p-6 bg-white/5 backdrop-blur-sm border-white/10">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                <h3 className="text-xl font-bold text-white">User Management</h3>
                <div className="flex space-x-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
                    <Input
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-white/10 border-white/20 text-white"
                    />
                  </div>
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </Card>

            {/* Users Table */}
            <Card className="p-6 bg-white/5 backdrop-blur-sm border-white/10">
              <div className="space-y-4">
                {mockUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold">
                        {user.address.slice(2, 4).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-white font-medium">{user.address}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge className={getTierColor(user.tier)}>
                            {user.tier === "legendary" && <Crown className="w-3 h-3 mr-1" />}
                            {user.tier === "gold" && <Star className="w-3 h-3 mr-1" />}
                            {user.tier.charAt(0).toUpperCase() + user.tier.slice(1)}
                          </Badge>
                          <Badge variant="outline" className="border-white/20 text-white/70 text-xs">
                            Level {user.level}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-white font-medium">{user.xp} XP</p>
                      <p className="text-white/60 text-sm">{user.nftCount} NFTs</p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(user.status)}>
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </Badge>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                      >
                        <Eye className="w-3 h-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                      >
                        <Edit className="w-3 h-3" />
                      </Button>
                      {user.status !== "banned" && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-red-500/20 text-red-300 hover:bg-red-500/10 bg-transparent"
                        >
                          <Ban className="w-3 h-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="events">
          <div className="space-y-6">
            {/* Event Management Header */}
            <Card className="p-6 bg-white/5 backdrop-blur-sm border-white/10">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                <h3 className="text-xl font-bold text-white">Event Management</h3>
                <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Event
                </Button>
              </div>
            </Card>

            {/* Events List */}
            <div className="grid md:grid-cols-2 gap-6">
              {mockEvents.map((event) => (
                <Card key={event.id} className="p-6 bg-white/5 backdrop-blur-sm border-white/10">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">{event.title}</h4>
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge className={getStatusColor(event.status)}>
                          {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                        </Badge>
                        <Badge className={getTierColor(event.requiredTier)}>
                          {event.requiredTier.charAt(0).toUpperCase() + event.requiredTier.slice(1)}+ Required
                        </Badge>
                      </div>
                      <p className="text-white/60 text-sm">
                        {event.date} • {event.type}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                      >
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-red-500/20 text-red-300 hover:bg-red-500/10 bg-transparent"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-white/60">Attendance</span>
                        <span className="text-white/60">
                          {event.attendees}/{event.maxAttendees}
                        </span>
                      </div>
                      <Progress value={(event.attendees / event.maxAttendees) * 100} className="h-2 bg-white/10" />
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-white/60 text-sm">
                        {event.maxAttendees - event.attendees} spots remaining
                      </span>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="challenges">
          <div className="space-y-6">
            {/* Challenge Management Header */}
            <Card className="p-6 bg-white/5 backdrop-blur-sm border-white/10">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                <h3 className="text-xl font-bold text-white">Challenge Management</h3>
                <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Challenge
                </Button>
              </div>
            </Card>

            {/* Challenges List */}
            <div className="space-y-4">
              {mockChallenges.map((challenge) => (
                <Card key={challenge.id} className="p-6 bg-white/5 backdrop-blur-sm border-white/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg">
                        <Zap className="w-6 h-6 text-purple-300" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-1">{challenge.title}</h4>
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(challenge.status)}>
                            {challenge.status.charAt(0).toUpperCase() + challenge.status.slice(1)}
                          </Badge>
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
                            {challenge.type.charAt(0).toUpperCase() + challenge.type.slice(1)}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-white font-semibold">+{challenge.xpReward} XP</p>
                      <p className="text-white/60 text-sm">{challenge.completions} completions</p>
                    </div>

                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                      >
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-yellow-500/20 text-yellow-300 hover:bg-yellow-500/10 bg-transparent"
                      >
                        {challenge.status === "active" ? "Pause" : "Activate"}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-red-500/20 text-red-300 hover:bg-red-500/10 bg-transparent"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="settings">
          <div className="space-y-6">
            <Card className="p-6 bg-white/5 backdrop-blur-sm border-white/10">
              <h3 className="text-xl font-bold text-white mb-6">Platform Settings</h3>

              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="mintPrice" className="text-white mb-2 block">
                      Genesis Mint Price (MATIC)
                    </Label>
                    <Input
                      id="mintPrice"
                      type="number"
                      defaultValue="0.05"
                      step="0.01"
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>

                  <div>
                    <Label htmlFor="maxSupply" className="text-white mb-2 block">
                      Max NFT Supply
                    </Label>
                    <Input
                      id="maxSupply"
                      type="number"
                      defaultValue="10000"
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="xpMultiplier" className="text-white mb-2 block">
                      XP Multiplier
                    </Label>
                    <Input
                      id="xpMultiplier"
                      type="number"
                      defaultValue="1.0"
                      step="0.1"
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>

                  <div>
                    <Label htmlFor="referralBonus" className="text-white mb-2 block">
                      Referral Bonus (%)
                    </Label>
                    <Input
                      id="referralBonus"
                      type="number"
                      defaultValue="10"
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                    Save Settings
                  </Button>
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                    Reset to Default
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-r from-red-500/10 to-orange-500/10 backdrop-blur-sm border-red-500/20">
              <div className="flex items-center space-x-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-red-400" />
                <h3 className="text-xl font-bold text-white">Danger Zone</h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <div>
                    <h4 className="text-white font-semibold">Pause Platform</h4>
                    <p className="text-white/70 text-sm">Temporarily disable all platform functions</p>
                  </div>
                  <Button
                    variant="outline"
                    className="border-red-500/20 text-red-300 hover:bg-red-500/10 bg-transparent"
                  >
                    Pause Platform
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <div>
                    <h4 className="text-white font-semibold">Emergency Withdrawal</h4>
                    <p className="text-white/70 text-sm">Withdraw all funds from smart contracts</p>
                  </div>
                  <Button
                    variant="outline"
                    className="border-red-500/20 text-red-300 hover:bg-red-500/10 bg-transparent"
                  >
                    Emergency Withdraw
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
