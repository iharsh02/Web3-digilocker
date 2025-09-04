export function getUnifiedAccessControlConditions(): object[] {
  return [
    {
      conditionType: "solRpc",
      method: "getBalance",
      params: [":userAddress"],
      pdaParams: [],
      pdaInterface: { offset: 0, fields: {} },
      pdaKey: "",
      chain: "solana",
      returnValueTest: {
        key: "",
        comparator: ">=",
        value: "100000000", // equals 0.1 SOL
      },
    },
  ];
}
