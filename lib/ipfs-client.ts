const ipfsClient: any = null

const initIPFS = async () => {
  if (typeof window === "undefined") return null

  try {
    const ipfsModule = await import("ipfs-http-client").catch(() => null)
    if (!ipfsModule) return null

    const { create } = ipfsModule

    const projectId = process.env.NEXT_PUBLIC_IPFS_PROJECT_ID
    const projectSecret = process.env.NEXT_PUBLIC_IPFS_PROJECT_SECRET

    if (!projectId || !projectSecret) {
      console.warn("IPFS credentials not found, using fallback")
      return null
    }

    const auth = "Basic " + btoa(projectId + ":" + projectSecret)

    return create({
      host: "ipfs.infura.io",
      port: 5001,
      protocol: "https",
      headers: { authorization: auth },
    })
  } catch (error) {
    console.error("Failed to initialize IPFS client:", error)
    return null
  }
}

export interface NFTMetadata {
  name: string
  description: string
  image: string
  tier: number
  level: number
  xp: number
  attributes: Array<{
    trait_type: string
    value: string | number
  }>
  benefits: string[]
  created_at: string
  last_updated: string
}

export async function uploadMetadataToIPFS(metadata: NFTMetadata): Promise<string> {
  try {
    const response = await fetch("/api/ipfs/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: metadata,
        type: "json",
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to upload to IPFS")
    }

    const result = await response.json()
    return result.url
  } catch (error) {
    console.error("Error uploading to IPFS:", error)
    throw new Error("Failed to upload metadata to IPFS")
  }
}

export async function uploadImageToIPFS(imageFile: File): Promise<string> {
  try {
    // Convert file to base64 for API transmission
    const fileData = await new Promise<string>((resolve) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result as string)
      reader.readAsDataURL(imageFile)
    })

    const response = await fetch("/api/ipfs/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: fileData,
        type: "file",
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to upload image to IPFS")
    }

    const result = await response.json()
    return result.url
  } catch (error) {
    console.error("Error uploading image to IPFS:", error)
    throw new Error("Failed to upload image to IPFS")
  }
}

export function generateNFTMetadata(tier: number, level = 1, xp = 0, tokenId?: number): NFTMetadata {
  const tierNames = ["Genesis", "Gold", "Legendary"]
  const tierName = tierNames[tier] || "Genesis"

  const benefits = getBenefitsForTier(tier, level)

  return {
    name: `NFT Access Passport #${tokenId || "TBD"} - ${tierName}`,
    description: `A dynamic NFT Access Passport that evolves with your engagement. Current tier: ${tierName}, Level: ${level}`,
    image: generateNFTImageURL(tier, level),
    tier,
    level,
    xp,
    attributes: [
      { trait_type: "Tier", value: tierName },
      { trait_type: "Level", value: level },
      { trait_type: "Experience Points", value: xp },
      { trait_type: "Benefits Count", value: benefits.length },
      { trait_type: "Rarity", value: getRarityForLevel(level) },
    ],
    benefits,
    created_at: new Date().toISOString(),
    last_updated: new Date().toISOString(),
  }
}

function getBenefitsForTier(tier: number, level: number): string[] {
  const baseBenefits = ["Discord Access", "Monthly Newsletter", "Community Events"]

  if (tier >= 1) {
    baseBenefits.push("Premium Courses", "Weekly AMAs", "Partner Discounts")
  }

  if (tier >= 2) {
    baseBenefits.push("VIP Events", "Direct Founder Access", "Early Product Access")
  }

  // Add level-based benefits
  if (level >= 5) baseBenefits.push("Mentor Program Access")
  if (level >= 10) baseBenefits.push("Advisory Board Voting")
  if (level >= 15) baseBenefits.push("Revenue Sharing Program")

  return baseBenefits
}

function getRarityForLevel(level: number): string {
  if (level >= 20) return "Legendary"
  if (level >= 15) return "Epic"
  if (level >= 10) return "Rare"
  if (level >= 5) return "Uncommon"
  return "Common"
}

function generateNFTImageURL(tier: number, level: number): string {
  // This would typically point to dynamically generated images based on tier/level
  // For now, using placeholder images with tier/level parameters
  return `/placeholder.svg?height=400&width=400&query=NFT+Passport+Tier+${tier}+Level+${level}+Badge`
}
