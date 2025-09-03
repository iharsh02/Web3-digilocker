"use client";

import { Client, Provider, cacheExchange, fetchExchange } from "urql";

const client = new Client({
  url: "https://uploader.irys.xyz/graphql",
  exchanges: [cacheExchange, fetchExchange],
});

export default function QueryClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider value={client}>{children}</Provider>;
}
