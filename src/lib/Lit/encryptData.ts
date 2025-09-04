import { litClient } from "./litClient";
import { getUnifiedAccessControlConditions } from "./litUac";
import { encryptFile } from "@lit-protocol/encryption";

export const EncryptFile = async (
  file: File,
): Promise<{ ciphertext: string; dataToEncryptHash: string }> => {
  await litClient.connect();

  const unifiedAccessControlConditions = getUnifiedAccessControlConditions();

  const { ciphertext, dataToEncryptHash } = await encryptFile(
    {
      file,
      unifiedAccessControlConditions,
      chain: "solana",
    },
    litClient,
  );

  return { ciphertext, dataToEncryptHash };
};
