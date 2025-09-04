"use client";

import { useState } from "react";
import { getIrys } from "@/lib/getIrys";
import { EncryptFile } from "@/lib/Lit/encryptData";
import { getUnifiedAccessControlConditions } from "@/lib/Lit/litUac";
import type { WalletContextState } from "@solana/wallet-adapter-react";

export const useIrys = (wallet: WalletContextState) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadFile = async (file: File) => {
    if (!wallet?.publicKey) throw new Error("Wallet not connected");

    setLoading(true);
    setError(null);

    try {
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
        { name: "App-Name", value: "DigitalVault" },
      ];

      const receipt = await irys.upload(JSON.stringify(dataToUpload), { tags });

      return {
        receipt,
        id: receipt.id,
        url: `https://gateway.irys.xyz/${receipt.id}`,
        dataToEncryptHash,
      };
    } catch (e) {
      console.error("Error uploading file:", e);
      setError("Error uploading file. Please try again.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { uploadFile, loading, error };
};