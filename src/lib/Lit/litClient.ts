"use client";
import { LitNodeClient } from "@lit-protocol/lit-node-client";
import { LIT_NETWORK } from "@lit-protocol/constants";

export const litClient = new LitNodeClient({
  litNetwork: LIT_NETWORK.DatilDev,
  debug: true,
});
