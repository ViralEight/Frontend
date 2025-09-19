import { 
  PUBLIC_SOLANA_RPC_URL,
  PUBLIC_SOLANA_FAUCET_URL,
  PUBLIC_USDC_EURC_FAUCET_URL,
  PUBLIC_SOLANA_EXPLORER_URL,
  PUBLIC_SOLANA_NETWORK_TYPE,
  PUBLIC_GORBAGANA_RPC_URL,
  PUBLIC_GORBAGANA_FAUCET_URL,
  PUBLIC_GORBAGANA_EXPLORER_URL,
  PUBLIC_GORBAGANA_NETWORK_TYPE
} from '$env/static/public';

// Network configuration
export const NETWORKS = {
  SOLANA: {
    id: 'solana',
    name: 'Solana',
    rpcUrl: PUBLIC_SOLANA_RPC_URL,
    faucetUrl: PUBLIC_SOLANA_FAUCET_URL,
    explorerUrl: PUBLIC_SOLANA_EXPLORER_URL,
    circleFaucetUrl: PUBLIC_USDC_EURC_FAUCET_URL,
    networkType: PUBLIC_SOLANA_NETWORK_TYPE,
    tokens: ['SOL', 'USDC', 'EURC', 'VR8']
  },
  GORBAGANA: {
    id: 'gorbagana',
    name: 'Gorbagana',
    rpcUrl: PUBLIC_GORBAGANA_RPC_URL,
    faucetUrl: PUBLIC_GORBAGANA_FAUCET_URL,
    explorerUrl: PUBLIC_GORBAGANA_EXPLORER_URL,
    networkType: PUBLIC_GORBAGANA_NETWORK_TYPE,
    tokens: ['GOR', 'VR8'] // Only GOR (Solana equivalent) and VR8
  }
};

// Default network
export const DEFAULT_NETWORK = NETWORKS.SOLANA;