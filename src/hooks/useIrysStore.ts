"use client";

import { getIrys } from "@/lib/getIrys";
import type { WalletContextState } from "@solana/wallet-adapter-react";

export const useIrysStorage = (wallet: WalletContextState) => {
  const uploadFile = async (file: File) => {
    const irys = await getIrys(wallet);

    const buffer = Buffer.from(await file.arrayBuffer());

    const receipt = await irys.upload(buffer, {
      tags: [
        { name: "Content-Type", value: file.type },
        { name: "File-Name", value: file.name },
        //  TODO : Change to the final name
        { name: "App-Name", value: "DigitalVault" },
      ],
    });

    return {
      receipt,
      id: receipt.id,
      url: `https://gateway.irys.xyz/${receipt.id}`,
    };
  };

  return { uploadFile };
};
