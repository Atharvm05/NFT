import { WalletConnect } from "@/components/wallet-connect"
import { HeroSection } from "@/components/hero"
import { Features } from "@/components/features"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(21,128,61,0.15)_0%,transparent_50%)]"></div>
        <div
          className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,rgba(99,102,241,0.1)_0deg,transparent_60deg,rgba(21,128,61,0.1)_120deg,transparent_180deg)] animate-spin"
          style={{ animationDuration: "20s" }}
        ></div>
      </div>

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-px h-20 bg-gradient-to-b from-transparent via-primary/30 to-transparent"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animation: "matrix-rain 8s linear infinite",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-16">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-xl holographic-glow"></div>
              <div className="absolute inset-0 w-10 h-10 bg-gradient-to-r from-primary/50 to-secondary/50 rounded-xl blur-sm"></div>
            </div>
            <h1 className="text-2xl font-bold font-space-grotesk neon-text">NFT PASSPORT</h1>
          </div>

          <div className="flex items-center space-x-6">
            <nav className="hidden md:flex space-x-8">
              {[
                { href: "/mint", label: "MINT" },
                { href: "/dashboard", label: "DASHBOARD" },
                { href: "/progression", label: "PROGRESSION" },
                { href: "/benefits", label: "BENEFITS" },
                { href: "/admin", label: "ADMIN" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative text-white/80 hover:text-primary transition-all duration-300 font-space-grotesk font-medium tracking-wider text-sm cyber-border px-3 py-2"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <WalletConnect />
          </div>
        </header>

        <HeroSection />
        <Features />
      </div>
    </div>
  )
}
