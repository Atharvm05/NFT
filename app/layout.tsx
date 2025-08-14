import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk, DM_Sans } from "next/font/google"
import { Web3Provider } from "@/components/providers/web3-provider"
import "./globals.css"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
  weight: ["400", "500", "600", "700"],
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
  weight: ["400", "500", "600"],
})

export const metadata: Metadata = {
  title: "NFT Access Passport - Your Gateway to the Future",
  description: "Unlock exclusive Web3 experiences with dynamic NFT membership. Join the revolution.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`dark ${spaceGrotesk.variable} ${dmSans.variable}`}>
      <body className={`${dmSans.className} antialiased`}>
        <Web3Provider>{children}</Web3Provider>
      </body>
    </html>
  )
}
