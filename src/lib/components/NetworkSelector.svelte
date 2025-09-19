<script>
  import { Select, SelectContent, SelectItem, SelectTrigger } from '$lib/components/ui/select';
  import { networkStore } from '$lib/contexts/network.svelte.js';
  import { NETWORKS } from '$lib/config/networks.js';
  
  function handleNetworkChange(value) {
    if (value) {
      networkStore.switchNetwork(value);
    }
  }
</script>

{#if networkStore.network}
<Select type="single" value={networkStore.network?.id} onValueChange={handleNetworkChange}>
  <SelectTrigger class="w-[180px] rounded-full bg-zinc-800 border-zinc-700 border text-white">
    {networkStore.network?.name || 'Select Network'}
  </SelectTrigger>
  <SelectContent class="bg-zinc-800 border-zinc-700 text-white">
    <SelectItem value={NETWORKS.SOLANA.id}>{NETWORKS.SOLANA.name}</SelectItem>
    <SelectItem value={NETWORKS.GORBAGANA.id}>{NETWORKS.GORBAGANA.name}</SelectItem>
  </SelectContent>
</Select>
{:else}
<div class="w-[180px] h-10 bg-gray-200 rounded animate-pulse"></div>
{/if}