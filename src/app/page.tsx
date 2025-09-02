import ConnectIrys from "@/modules/app/irys/ConnectIrys";
import { DocumentUpload } from "@/modules/app/irys/uploadDocs";
import { UserBalance } from "@/modules/app/wallet/userBalance";
import { WalletButton } from "@/modules/app/wallet/WalletButton";

export default async function Home() {
  return (
    <main className="flex flex-col min-h-screen items-center justify-center gap-5">
      <div className=" flex items-center justify-center gap-5">
        <WalletButton />
        <UserBalance />
        <ConnectIrys />
      </div>
      <div>
        <DocumentUpload />
      </div>
    </main>
  );
}
