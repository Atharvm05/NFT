import { create } from "ipfs-http-client"

const projectId = process.env.NEXT_PUBLIC_IPFS_PROJECT_ID
const projectSecret = process.env.NEXT_PUBLIC_IPFS_PROJECT_SECRET

const auth = "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64")

const ipfs = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
})

export interface NFTMetadata {
  name: string
  description: string
  image: string
  tier: "GENESIS" | "GOLD" | "LEGENDARY"
  level: number
  xp: number
  attributes: Array<{
    trait_type: string
    value: string | number
  }>
  benefits: string[]
  mintTimestamp: number
}

export class MetadataManager {
  static async uploadToIPFS(data: any): Promise<string> {
    try {
      const result = await ipfs.add(JSON.stringify(data, null, 2))
      return `https://ipfs.infura.io/ipfs/${result.path}`
    } catch (error) {
      console.error("IPFS upload error:", error)
      throw new Error("Failed to upload to IPFS")
    }
  }

  static async uploadImageToIPFS(imageFile: File): Promise<string> {
    try {
      const result = await ipfs.add(imageFile)
      return `https://ipfs.infura.io/ipfs/${result.path}`
    } catch (error) {
      console.error("Image upload error:", error)
      throw new Error("Failed to upload image to IPFS")
    }
  }

  static generateMetadata(tier: "GENESIS" | "GOLD" | "LEGENDARY", level = 1, xp = 0, tokenId?: number): NFTMetadata {
    const tierData = {
      GENESIS: {
        name: "Genesis Access Passport",
        description:
          "Your entry point into the exclusive Web3 community. Unlock basic benefits and start your journey.",
        benefits: ["Discord Access", "Basic Courses", "Community Events"],
        image: "/images/genesis-passport.png",
      },
      GOLD: {
        name: "Gold Access Passport",
        description: "Enhanced membership with premium benefits and exclusive access to advanced features.",
        benefits: ["Premium Discord", "Advanced Courses", "VIP Events", "Partner Discounts"],
        image: "/images/gold-passport.png",
      },
      LEGENDARY: {
        name: "Legendary Access Passport",
        description: "The ultimate membership tier with maximum benefits and exclusive legendary perks.",
        benefits: ["Legendary Discord", "All Courses", "Exclusive Events", "Maximum Discounts", "Direct Access"],
        image: "/images/legendary-passport.png",
      },
    }

    const data = tierData[tier]
    const levelSuffix = level > 1 ? ` - Level ${level}` : ""

    return {
      name: `${data.name}${levelSuffix}${tokenId ? ` #${tokenId}` : ""}`,
      description: `${data.description} Current Level: ${level}, XP: ${xp}`,
      image: data.image,
      tier,
      level,
      xp,
      attributes: [
        { trait_type: "Tier", value: tier },
        { trait_type: "Level", value: level },
        { trait_type: "XP", value: xp },
        { trait_type: "Rarity", value: this.calculateRarity(tier, level) },
        { trait_type: "Benefits Count", value: data.benefits.length },
      ],
      benefits: data.benefits,
      mintTimestamp: Date.now(),
    }
  }

  static calculateRarity(tier: string, level: number): string {
    const baseRarity = {
      GENESIS: "Common",
      GOLD: "Rare",
      LEGENDARY: "Epic",
    }

    if (level >= 5) return "Legendary"
    if (level >= 3) return "Epic"
    return baseRarity[tier as keyof typeof baseRarity] || "Common"
  }

  static async updateNFTMetadata(
    tokenId: number,
    tier: "GENESIS" | "GOLD" | "LEGENDARY",
    level: number,
    xp: number,
  ): Promise<string> {
    const metadata = this.generateMetadata(tier, level, xp, tokenId)
    return await this.uploadToIPFS(metadata)
  }
}
