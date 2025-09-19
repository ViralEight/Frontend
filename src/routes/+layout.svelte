<script lang="ts">
  import '../app.css';
  import { onMount } from 'svelte';
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  
  let { children } = $props();
  let mounted = $state(false);
  
  onMount(() => {
    mounted = true;
  });
</script>

<div class="min-h-screen bg-background font-sans antialiased flex flex-col">
  <Header />
  <main class="flex-grow">
    {@render children()}
  </main>
  <Footer />
</div>