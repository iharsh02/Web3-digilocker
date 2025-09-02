import { WebUploader } from "@irys/web-upload";
import type { WalletContextState } from "@solana/wallet-adapter-react";
import { WebSolana } from "@irys/web-upload-solana";

export const getIrys = async (wallet: WalletContextState) => {
  try {
    const irysUploader = await WebUploader(WebSolana).withProvider(wallet);

    return irysUploader;
  } catch (error) {
    console.error("Error connecting to Irys:", error);
    throw new Error("Error connecting to Irys");
  }
};
