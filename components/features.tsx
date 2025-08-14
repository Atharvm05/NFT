import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, GraduationCap, QrCode, TrendingUp, Gift, Shield, Sparkles, Globe } from "lucide-react"

const features = [
  {
    icon: Users,
    title: "Exclusive Communities",
    description: "Access private Discord channels, forums, and member-only discussions with verified holders.",
    badge: "Social",
    color: "from-blue-500/20 to-cyan-500/20",
    iconColor: "text-blue-400",
  },
  {
    icon: GraduationCap,
    title: "Premium Courses",
    description: "Unlock educational content, webinars, and expert-led workshops in Web3 and beyond.",
    badge: "Learning",
    color: "from-purple-500/20 to-pink-500/20",
    iconColor: "text-purple-400",
  },
  {
    icon: QrCode,
    title: "Event Access",
    description: "QR code scanning for physical events, meetups, and exclusive gatherings worldwide.",
    badge: "Events",
    color: "from-green-500/20 to-emerald-500/20",
    iconColor: "text-green-400",
  },
  {
    icon: TrendingUp,
    title: "Dynamic Progression",
    description: "Your NFT evolves as you engage - attend events, complete challenges, refer friends.",
    badge: "Gamified",
    color: "from-orange-500/20 to-red-500/20",
    iconColor: "text-orange-400",
  },
  {
    icon: Gift,
    title: "Partner Perks",
    description: "Discounts at partner stores, early access to products, and special member offers.",
    badge: "Benefits",
    color: "from-yellow-500/20 to-amber-500/20",
    iconColor: "text-yellow-400",
  },
  {
    icon: Shield,
    title: "Secure & Verified",
    description: "Blockchain-verified ownership with tamper-proof access control and authentication.",
    badge: "Security",
    color: "from-primary/20 to-secondary/20",
    iconColor: "text-primary",
  },
]

export function Features() {
  return (
    <div className="mb-20 relative">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none"></div>

      <div className="text-center mb-16 relative z-10">
        <Badge className="mb-6 bg-secondary/20 text-secondary border-secondary/30 holographic-glow font-space-grotesk tracking-wider">
          <Globe className="w-3 h-3 mr-2 animate-spin" style={{ animationDuration: "3s" }} />
          CROSS-PLATFORM ACCESS
        </Badge>
        <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 font-space-grotesk">
          ONE NFT,{" "}
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">UNLIMITED</span>{" "}
          POSSIBILITIES
        </h2>
        <p className="text-white/90 max-w-3xl mx-auto text-lg font-dm-sans leading-relaxed">
          Your dynamic passport opens doors across digital and physical worlds, growing more valuable as you engage with
          our ecosystem.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
        {features.map((feature, index) => (
          <Card
            key={index}
            className="futuristic-card p-8 group relative overflow-hidden"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
            ></div>
            <div className="relative z-10">
              <div className="flex items-start space-x-4 mb-4">
                <div className={`p-3 bg-gradient-to-br ${feature.color} rounded-xl holographic-glow`}>
                  <feature.icon className={`w-7 h-7 ${feature.iconColor}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <h3 className="font-bold text-white text-lg font-space-grotesk">{feature.title}</h3>
                    <Badge
                      variant="secondary"
                      className="text-xs bg-white/10 text-white/80 border-white/20 font-space-grotesk"
                    >
                      {feature.badge}
                    </Badge>
                  </div>
                  <p className="text-white/80 font-dm-sans leading-relaxed">{feature.description}</p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="mt-16 p-10 futuristic-card relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5"></div>
        <div className="relative z-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full mb-4 holographic-glow">
              <Sparkles className="w-8 h-8 text-white animate-pulse" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-3 font-space-grotesk">NFT EVOLUTION PREVIEW</h3>
            <p className="text-white/80 text-lg font-dm-sans">Watch your passport transform as you engage</p>
          </div>

          <div className="flex justify-center space-x-12">
            {[
              { name: "GENESIS", emoji: "🎫", gradient: "from-gray-400 to-gray-600", border: "", glow: "" },
              {
                name: "GOLD TIER",
                emoji: "🎫",
                gradient: "from-yellow-400 to-orange-500",
                border: "border-2 border-yellow-400",
                glow: "holographic-glow",
              },
              {
                name: "LEGENDARY",
                emoji: "🎫",
                gradient: "from-primary to-secondary",
                border: "border-2 border-primary",
                glow: "holographic-glow animate-pulse",
              },
            ].map((tier, index) => (
              <div key={tier.name} className="text-center group">
                <div
                  className={`w-24 h-24 bg-gradient-to-br ${tier.gradient} rounded-xl mb-3 flex items-center justify-center text-3xl ${tier.border} ${tier.glow} transition-transform group-hover:scale-110`}
                >
                  {tier.emoji}
                </div>
                <p className="text-white/80 font-space-grotesk font-semibold tracking-wider">{tier.name}</p>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  )
}
