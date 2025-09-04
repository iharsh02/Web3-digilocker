"use client";

import { useMemo } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { gql, useQuery } from "urql";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { downloadFromIrys } from "@/lib/Lit/getDataFromIrys";
import { decryptImageFile } from "@/lib/Lit/decryptData";

type IrysTag = { name: string; value: string };
type Node = { id: string; address: string; tags?: IrysTag[] };
type Resp = { transactions: { edges: { node: Node }[] } };
type Vars = { owners: string[] };

const Query = gql`
  query getByOwner($owners: [String!]!) {
    transactions(owners: $owners, hasTags: true) {
      edges {
        node {
          id
          address
          tags {
            name
            value
          }
        }
      }
    }
  }
`;

const getTag = (tags: IrysTag[] | undefined, key: string) => {
  const k = key.toLowerCase();
  return tags?.find((t) => t.name.toLowerCase() === k)?.value;
};

// "public-image" | "encrypted-image" | "other"
function classifyNode(
  node: Node,
): "public-image" | "encrypted-image" | "other" {
  const tags = node.tags ?? [];
  const ct = getTag(tags, "Content-Type") ?? "";
  const origCT = getTag(tags, "X-Original-Content-Type") ?? "";

  if (ct.startsWith("image/")) return "public-image";
  if (ct === "application/octet-stream" && origCT.startsWith("image/")) {
    return "encrypted-image";
  }
  return "other";
}

export default function UserFilesTest() {
  const wallet = useWallet();

  const [{ data, fetching, error }] = useQuery<Resp, Vars>({
    query: Query,
    variables: {
      owners: wallet.publicKey ? [wallet.publicKey.toBase58()] : [],
    },
    pause: !wallet.publicKey,
  });

  const nodes = useMemo(
    () => data?.transactions?.edges?.map((e) => e.node) ?? [],
    [data],
  );

  if (!wallet.publicKey)
    return <div className="p-8 text-center">Connect wallet</div>;
  if (fetching) return <div className="p-8 text-center">Loading…</div>;
  if (error)
    return (
      <div className="p-8 text-center text-red-500">Error: {error.message}</div>
    );
  if (!nodes.length) return <div className="p-8 text-center">No files</div>;

  // get Encrypted Image

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 p-4">
      {nodes.map((n) => {
        const kind = classifyNode(n);
        const publicURL = `https://gateway.irys.xyz/${n.id}`;
        const fileName =
          getTag(n.tags, "File-Name") ??
          getTag(n.tags, "X-Original-File-Name") ??
          n.id;

        return (
          <div
            key={n.id}
            className="rounded-lg border bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
          >
            {kind === "public-image" && (
              <div className="mb-3">
                <Image
                  src={publicURL}
                  alt={fileName}
                  width={200}
                  height={200}
                  className="h-40 w-full rounded-md object-cover"
                />
              </div>
            )}

            {kind === "encrypted-image" && (
              <div className="mb-3 flex h-40 flex-col items-center justify-center space-y-3 rounded-md bg-gray-100">
                <div className="text-center text-gray-600">
                  <div className="mb-1 text-2xl">🔒</div>
                  <div className="text-sm">Encrypted image</div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={async () => {
                    console.log("Downloading and decrypting image...");
                  }}
                >
                  Get Image
                </Button>
              </div>
            )}

            {kind === "other" && (
              <div className="mb-3 flex h-40 flex-col items-center justify-center rounded-md bg-gray-50">
                <div className="mb-2 text-4xl">📄</div>
                <div className="text-sm text-gray-600">Other file</div>
              </div>
            )}

            <div className="space-y-2">
              <div title={fileName} className="truncate text-sm font-medium">
                {fileName}
              </div>
              <div className="rounded bg-gray-50 p-2 font-mono text-xs break-all text-gray-500">
                {n.id}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
