"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useIrys } from "@/hooks/useIrys";
import { useWallet } from "@solana/wallet-adapter-react";

export const DocumentUpload = () => {
  const wallet = useWallet();
  const { uploadFile, loading, error } = useIrys(wallet);

  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState<string | null>(null);

  const handleUpload = async () => {
    if (!file) return;
    try {
      const result = await uploadFile(file);
      if (result) {
        setUrl(result.url);
      }
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  return (
    <div>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
      />

      <Button onClick={handleUpload} disabled={!file || loading}>
        {loading ? "Uploading..." : "Upload"}
      </Button>

      {error && <p className="text-red-500">{error}</p>}

      {url && (
        <div>
          <p>
            ✅ Uploaded!{" "}
            <a href={url} target="_blank" rel="noopener noreferrer">
              View on Irys
            </a>
          </p>
        </div>
      )}
    </div>
  );
};
