"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import ConnectIrys from "@/modules/app/irys/ConnectIrys";
import { DocumentUpload } from "@/modules/app/irys/uploadDocs";
import { UserBalance } from "@/modules/app/wallet/userBalance";
import UserFiles from "./irys/userFiles";

export default function App() {
  const { connected } = useWallet();

  return (
    <div className="flex flex-col items-center justify-center gap-5">
      {connected ? (
        <>
          <div className="flex items-center justify-center gap-5">
            <UserBalance />
            <ConnectIrys />
          </div>
          <div>
            <DocumentUpload />
            <UserFiles />
          </div>
        </>
      ) : (
        <p>Please connect your wallet to continue.</p>
      )}
    </div>
  );
}
