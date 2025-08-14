import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Gift, Zap } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <div className="text-center mb-20 relative">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute top-1/3 right-1/4 w-64 h-64 bg-secondary/10 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="mb-8 relative">
        <Badge className="mb-6 bg-primary/20 text-primary border-primary/30 holographic-glow font-space-grotesk tracking-wider">
          <Zap className="w-3 h-3 mr-2 animate-pulse" />
          DYNAMIC WEB3 MEMBERSHIP
        </Badge>

        <h1 className="text-6xl md:text-8xl font-bold font-space-grotesk text-white mb-8 leading-tight">
          UNLOCK YOUR
          <span className="block bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent neon-text animate-pulse">
            FUTURE
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto mb-10 font-dm-sans leading-relaxed">
          Your NFT Access Passport Awaits! Seamlessly connect to exclusive experiences, communities, and benefits.{" "}
          <span className="text-primary font-semibold">Your journey starts here.</span>
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
        <Link href="/mint">
          <Button
            size="lg"
            className="cyber-button bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 text-white px-10 py-4 text-lg font-space-grotesk font-semibold tracking-wider"
          >
            <Shield className="w-6 h-6 mr-3" />
            JOIN THE REVOLUTION
          </Button>
        </Link>
        <Link href="/benefits">
          <Button
            size="lg"
            variant="outline"
            className="border-primary/50 text-primary hover:bg-primary/10 bg-transparent backdrop-blur-sm px-10 py-4 text-lg font-space-grotesk font-semibold tracking-wider cyber-border"
          >
            <Gift className="w-6 h-6 mr-3" />
            EXPLORE BENEFITS
          </Button>
        </Link>
      </div>

      <Card className="max-w-md mx-auto futuristic-card p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5"></div>
        <div className="relative z-10">
          <div className="aspect-square bg-gradient-to-br from-primary via-secondary to-primary rounded-xl mb-6 flex items-center justify-center relative overflow-hidden holographic-glow">
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent"></div>
            <div className="text-white text-7xl relative z-10">🎫</div>
            <div className="absolute top-2 right-2 w-3 h-3 bg-primary rounded-full animate-pulse"></div>
          </div>
          <h3 className="text-white font-bold text-xl mb-3 font-space-grotesk">GENESIS PASSPORT</h3>
          <div className="flex justify-between items-center">
            <Badge className="bg-primary/20 text-primary border-primary/30 font-space-grotesk">LEVEL 01</Badge>
            <span className="text-white/80 font-dm-sans font-semibold">0.05 MATIC</span>
          </div>
        </div>
      </Card>
    </div>
  )
}
