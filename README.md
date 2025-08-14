# 🎟 NFT Access Passport

An evolving NFT-based access system that unlocks **exclusive online & offline experiences**.  
Built for the **Gated NFTs University Hackathon**.

## 🚀 Features
- 🔑 **Token-gated access** — Unlock hidden pages, Discord channels, or real-world events.
- 🌀 **Dynamic NFTs** — Your NFT evolves as you complete challenges or attend events.
- ⚡ **Polygon blockchain** — Fast & eco-friendly transactions.
- 🔗 **WalletConnect / RainbowKit** — Connect with MetaMask, WalletConnect, Coinbase Wallet, and more.
- 🛠 **Thirdweb SDK integration** — Easy NFT minting & contract interaction.

## 🛠 Tech Stack
- **Frontend:** Next.js, TailwindCSS
- **Blockchain:** Polygon (ERC-721)
- **NFT Management:** Thirdweb SDK
- **Wallet Integration:** WalletConnect / RainbowKit
- **Smart Contract:** Solidity + OpenZeppelin

## 📦 Getting Started

### 1️⃣ Clone the repository
```bash
git clone https://github.com/Atharvm05/NFT.git
cd NFT
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Create `.env.local` file
```env
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id
NEXT_PUBLIC_NFT_CONTRACT_ADDRESS=0xYourNFTContractAddress
```
- **`NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`** → Get from [WalletConnect Cloud](https://cloud.walletconnect.com)
- **`NEXT_PUBLIC_NFT_CONTRACT_ADDRESS`** → Your deployed NFT contract address (Polygon)

### 4️⃣ Run locally
```bash
npm run dev
```
Visit: [http://localhost:3000](http://localhost:3000)

## 📜 Smart Contract
- **Network:** Polygon Mainnet or Mumbai Testnet  
- **Standard:** ERC-721  
- Deployed using Thirdweb / Remix / Hardhat  
- Contract address must match your `.env.local` value.



## 📄 License
MIT License
