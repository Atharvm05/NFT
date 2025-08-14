import { type NextRequest, NextResponse } from "next/server"
import { create } from "ipfs-http-client"

const projectId = process.env.IPFS_PROJECT_ID
const projectSecret = process.env.IPFS_PROJECT_SECRET

let ipfsClient: any = null

const getIPFSClient = () => {
  if (!ipfsClient && projectId && projectSecret) {
    const auth = "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64")

    ipfsClient = create({
      host: "ipfs.infura.io",
      port: 5001,
      protocol: "https",
      headers: {
        authorization: auth,
      },
    })
  }
  return ipfsClient
}

export async function POST(request: NextRequest) {
  try {
    const { data, type } = await request.json()

    const client = getIPFSClient()
    if (!client) {
      return NextResponse.json({ error: "IPFS client not available" }, { status: 500 })
    }

    let result
    if (type === "json") {
      result = await client.add(JSON.stringify(data, null, 2))
    } else if (type === "file") {
      // Handle file upload
      result = await client.add(data)
    }

    const ipfsUrl = `https://ipfs.infura.io/ipfs/${result.path}`

    return NextResponse.json({ url: ipfsUrl, cid: result.path })
  } catch (error) {
    console.error("IPFS upload error:", error)
    return NextResponse.json({ error: "Failed to upload to IPFS" }, { status: 500 })
  }
}
