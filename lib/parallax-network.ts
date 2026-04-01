export const PARALLAX_CHAIN_ID = "0x83E";
export const STORAGE_KEY = "parallax-network-added";

declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
    };
  }
}

export async function checkParallaxAdded(): Promise<boolean> {
  if (!window.ethereum) return false;

  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: PARALLAX_CHAIN_ID }],
    });
    localStorage.setItem(STORAGE_KEY, "true");
    return true;
  } catch (err: unknown) {
    const error = err as { code?: number };
    if (error.code === 4902) return false;
    // Other errors (user rejected switch, etc.) — assume added
    return true;
  }
}

export async function addParallaxNetwork(): Promise<void> {
  if (!window.ethereum) return;

  await window.ethereum.request({
    method: "wallet_addEthereumChain",
    params: [
      {
        chainId: PARALLAX_CHAIN_ID,
        chainName: "Parallax",
        nativeCurrency: {
          name: "Lax",
          symbol: "LAX",
          decimals: 18,
        },
        rpcUrls: ["https://rpc.parallaxprotocol.org"],
        blockExplorerUrls: ["https://explorer.parallaxprotocol.org"],
      },
    ],
  });
}
