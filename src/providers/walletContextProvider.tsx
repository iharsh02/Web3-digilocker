"use client";
import { useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";

import { clusterApiUrl } from "@solana/web3.js";
import "@solana/wallet-adapter-react-ui/styles.css";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";

export const WalletContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const endpoint = clusterApiUrl("devnet");
  const wallets = useMemo(() => [], []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets}>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
