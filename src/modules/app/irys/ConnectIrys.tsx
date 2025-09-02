"use client";

import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { getIrys } from "@/lib/getIrys";

const ConnectIrys = () => {
  const wallet = useWallet();
  const [isConnected, setIsConnected] = useState<boolean>(false);

  const connectToIrys = async () => {
    if (!wallet) {
      console.log("Wallet not connected");
      return;
    }

    try {
       await getIrys(wallet);
      setIsConnected(true);
    } catch (error) {
      console.log("Error connecting to Irys", error);
    }
  };

  return (
    <div>
      <button onClick={connectToIrys}>
        {isConnected ? "Connected to Irys" : "Connect Irys"}
      </button>
    </div>
  );
};

export default ConnectIrys;
