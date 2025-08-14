import { AdminDashboard } from "@/components/admin-dashboard"
import { WalletConnect } from "@/components/wallet-connect"

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg"></div>
            <h1 className="text-2xl font-bold text-white">NFT Passport Admin</h1>
          </div>
          <WalletConnect />
        </header>

        <AdminDashboard />
      </div>
    </div>
  )
}
