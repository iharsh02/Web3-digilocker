"use client";

import App from "@/modules/app/App";
import { WalletButton } from "@/modules/app/wallet/WalletButton";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-5">
      <WalletButton />
      <App />
    </main>
  );
}
