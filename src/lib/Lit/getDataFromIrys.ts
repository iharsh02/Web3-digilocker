const gatewayAddress = "https://gateway.irys.xyz/";

export const downloadFromIrys = async (id: string) => {
  const url = `${gatewayAddress}${id}`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to retrieve data for ID: ${id}`);
    const data = await response.json();
    const ciphertext = data.cipherText;
    const dataToEncryptHash = data.dataToEncryptHash;
    const unifiedAccessControlConditions = data.accessControlConditions;
    return [ciphertext, dataToEncryptHash, unifiedAccessControlConditions];
  } catch (error) {
    console.error("Error retrieving data: ", error);
    return ["", "", []];
  }
};
