"use client"

import { useAccount, useConnect, useDisconnect } from "wagmi"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Copy, Wallet } from "lucide-react"

export function WalletConnect() {
  const { address, isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address)
    }
  }

  if (isConnected && address) {
    return (
      <Card className="p-4 bg-white/10 backdrop-blur-sm border-white/20">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <Badge variant="secondary" className="bg-green-500/20 text-green-300">
              Connected
            </Badge>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-white/80">
              {address.slice(0, 6)}...{address.slice(-4)}
            </span>
            <Button
              size="sm"
              variant="ghost"
              onClick={copyAddress}
              className="h-6 w-6 p-0 text-white/60 hover:text-white"
            >
              <Copy className="w-3 h-3" />
            </Button>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={() => disconnect()}
            className="border-white/20 text-white hover:bg-white/10 bg-transparent"
          >
            Disconnect
          </Button>
        </div>
      </Card>
    )
  }

  return (
    <div className="flex gap-2">
      {connectors.map((connector) => (
        <Button
          key={connector.uid}
          onClick={() => connect({ connector })}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
        >
          <Wallet className="w-4 h-4 mr-2" />
          Connect {connector.name}
        </Button>
      ))}
    </div>
  )
}
