import { decryptToFile } from "@lit-protocol/encryption";
import { litClient } from "./litClient";

export const decryptImageFile = async ({
  ciphertext,
  dataToEncryptHash,
  unifiedAccessControlConditions,
}: {
  ciphertext: string;
  dataToEncryptHash: string;
  unifiedAccessControlConditions: object[];
}) => {
  await litClient.connect();

  const decryptedFile = await decryptToFile(
    {
      unifiedAccessControlConditions,
      chain: "solana",
      ciphertext,
      dataToEncryptHash,
    },
    litClient,
  );
  console.log("decryptedFile", decryptedFile);
  return decryptedFile;
};
