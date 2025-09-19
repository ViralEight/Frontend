<script>
  import { setNetworkContext } from '$lib/contexts/network.svelte.js';
  
  let { children } = $props();
  
  // Initialize the context
  setNetworkContext();
</script>

{@render children()}