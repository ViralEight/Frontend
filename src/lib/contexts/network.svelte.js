import { NETWORKS, DEFAULT_NETWORK } from '$lib/config/networks.js';

function createNetworkStore() {
  let network = $state(DEFAULT_NETWORK);
  let connected = $state(false);
  let address = $state(null);

  return {
    get network() {
      return network;
    },
    get connected() {
      return connected;
    },
    get address() {
      return address;
    },
    switchNetwork(networkId) {
      network = NETWORKS[networkId.toUpperCase()] || DEFAULT_NETWORK;
    },
    connectWallet(newAddress) {
      connected = true;
      address = newAddress;
    },
    disconnectWallet() {
      connected = false;
      address = null;
    }
  };
}

export const networkStore = createNetworkStore();