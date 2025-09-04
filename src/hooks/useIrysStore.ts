"use client";

import { getIrys } from "@/lib/getIrys";
import { EncryptFile } from "@/lib/Lit/encryptFile";
import { getUnifiedAccessControlConditions } from "@/lib/Lit/litUac";
import type { WalletContextState } from "@solana/wallet-adapter-react";

export const useIrysStorage = (wallet: WalletContextState) => {
  const uploadFile = async (file: File) => {
    if (!wallet?.publicKey) throw new Error("Wallet not connected");

    const irys = await getIrys(wallet);

    const { ciphertext, dataToEncryptHash } = await EncryptFile(file);

    const dataToUpload = {
      cipherText: ciphertext,
      dataToEncryptHash: dataToEncryptHash,
      accessControlConditions: getUnifiedAccessControlConditions(),
    };

    const tags = [
      { name: "Content-Type", value: "application/octet-stream" },
      { name: "X-Original-Content-Type", value: file.type },
      { name: "X-Original-File-Name", value: file.name },
      { name: "X-Data-Hash", value: dataToEncryptHash },
      //   TODO : Change the app name senpai
      { name: "App-Name", value: "DigitalVault" },
    ];

    const receipt = await irys.upload(JSON.stringify(dataToUpload), { tags });

    return {
      receipt,
      id: receipt.id,
      url: `https://gateway.irys.xyz/${receipt.id}`,
      dataToEncryptHash,
    };
  };

  return { uploadFile };
};
