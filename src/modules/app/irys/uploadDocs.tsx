"use client";

import { useState } from "react";
import { useIrysStorage } from "@/hooks/useIrysStore";
import { useWallet } from "@solana/wallet-adapter-react";

export const DocumentUpload = () => {
  const wallet = useWallet();
  const { uploadFile } = useIrysStorage(wallet);
  const { connected } = wallet;

  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState<string | null>(null);

  const handleUpload = async () => {
    if (!file) return;
    try {
      const result = await uploadFile(file);
      setUrl(result.url);
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  return (
    <div>
      {!connected && <p>⚠️ Connect Phantom wallet first</p>}

      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
      />

      <button onClick={handleUpload} disabled={!file || !connected}>
        Upload
      </button>

      {url && (
        <div>
          <p>
            ✅ Uploaded!{" "}
            <a href={url} target="_blank" rel="noopener noreferrer">
              View on Arweave
            </a>
          </p>
        </div>
      )}
    </div>
  );
};
