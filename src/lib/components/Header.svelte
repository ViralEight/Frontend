<script>
  import { networkStore } from '$lib/contexts/network.svelte.js';
  import NetworkSelector from '$lib/components/NetworkSelector.svelte';
  import { Button } from '$lib/components/ui/button';

  // Mock function to simulate wallet connection
  // In a real app, this would be replaced with actual wallet connection logic
  function handleConnectWallet() {
    networkStore.connectWallet('example wallet address');
  }
</script>

<header class="sticky top-0 z-50 w-full py-4">
  <div class="container mx-auto px-4">
    <div class="flex h-16 items-center justify-between rounded-full bg-zinc-900/80 px-6 shadow-lg backdrop-blur-md border border-zinc-800">
      <div class="flex items-center space-x-8">
        <a href="/" class="flex items-center space-x-3">
          <img src="/viral8-logo.jpg" alt="Viral8" class="h-10 w-10 rounded-full" />
          <span class="font-bold text-xl text-white">Viral8</span>
        </a>
        <nav class="hidden md:flex items-center space-x-6 text-base font-medium text-gray-300">
          <a href="/#platforms" class="transition-colors hover:text-white">Platforms</a>
          <a href="/#features" class="transition-colors hover:text-white">Features</a>
          <a href="/#contract" class="transition-colors hover:text-white">Contract</a>
          <a href="/#vr8-token" class="transition-colors hover:text-white">VR8 Token</a>
          {#if networkStore.connected}
            <a href="/dashboard" class="transition-colors hover:text-white">Dashboard</a>
          {/if}
        </nav>
      </div>
      
      <div class="flex items-center space-x-4">
        <NetworkSelector />
        {#if networkStore.connected}
          <Button 
            variant="ghost"
            onclick={networkStore.disconnectWallet}
            class="text-gray-300 hover:text-white"
          >
            Disconnect
          </Button>
        {:else}
          <Button 
            onclick={handleConnectWallet}
            class="bg-green-500 hover:bg-green-600 text-white rounded-full"
          >
            Connect Wallet
          </Button>
        {/if}
      </div>
    </div>
  </div>
</header>