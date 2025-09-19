<script>
  import { networkStore } from '$lib/contexts/network.svelte.js';
  import { Button } from '$lib/components/ui/button';
  import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { NETWORKS } from '$lib/config/networks.js';

  let faucets = $derived.by(() => {
    const currentNetwork = networkStore.network;
    if (currentNetwork?.id === NETWORKS.SOLANA.id) {
      return [
        { name: 'SOL Faucet', url: NETWORKS.SOLANA.faucetUrl },
        { name: 'USDC/EURC Faucet', url: NETWORKS.SOLANA.circleFaucetUrl }
      ];
    } else if (currentNetwork?.id === NETWORKS.GORBAGANA.id) {
      return [
        { name: 'GOR Faucet', url: NETWORKS.GORBAGANA.faucetUrl }
      ];
    }
    return [];
  });
</script>

<section id="test-viral8" class="py-20">
  <div class="container mx-auto px-4">
    <div class="text-center mb-16">
      <h2 class="text-4xl md:text-5xl font-bold mb-6 text-balance">
        Wanna Test <span class="text-green-400">Viral8</span>?
      </h2>
      <p class="text-xl text-gray-400 max-w-2xl mx-auto text-pretty">
        Grab some tokens here to get started on the {networkStore.network?.name} {networkStore.network?.networkType}.
      </p>
    </div>
    
    <div class="max-w-2xl mx-auto">
      <Card class="interactive-card p-8">
        <CardContent class="flex flex-col sm:flex-row gap-4 justify-center">
          {#each faucets as faucet}
            <Button as="a" href={faucet.url} target="_blank" rel="noopener noreferrer" size="lg" class="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg glow-green">
              {faucet.name}
            </Button>
          {/each}
        </CardContent>
      </Card>
    </div>
  </div>
</section>