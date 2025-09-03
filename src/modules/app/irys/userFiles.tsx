"use client";
import { useWallet } from "@solana/wallet-adapter-react";
import { gql, useQuery } from "urql";
import Image from "next/image";

const UserFilesQuery = gql`
  query getByOwner($owners: [String!]!) {
    transactions(owners: $owners) {
      edges {
        node {
          id
          address
        }
      }
    }
  }
`;

interface TransactionNode {
  id: string;
  address: string;
}

interface TransactionsResponse {
  transactions: {
    edges: {
      node: TransactionNode;
    }[];
  };
}

interface TransactionsVariables {
  owners: string[];
}

export function UserFiles() {
  const wallet = useWallet();
  const [result] = useQuery<TransactionsResponse, TransactionsVariables>({
    query: UserFilesQuery,
    variables: {
      owners: wallet.publicKey ? [wallet.publicKey.toBase58()] : [],
    },
    pause: !wallet.publicKey,
  });

  const { data, fetching, error } = result;
  console.log("UserFiles data:", data);
  if (fetching) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data?.transactions?.edges?.length)
    return <div>No transactions found</div>;

  return (
    <div>
      {data.transactions.edges.map((edge) => (
        <div key={edge.node.id}>
          <Image
            src={`https://gateway.irys.xyz/${edge.node.id}`}
            alt="vault"
            width={200}
            height={200}
          />
        </div>
      ))}
    </div>
  );
}
