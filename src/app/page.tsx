import { UserBalance } from "@/modules/app/wallet/userBalance";
import { WalletButton } from "@/modules/app/wallet/WalletButton";

export default async function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <WalletButton />
      <UserBalance />
    </main>
  );
}
