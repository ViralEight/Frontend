<script lang="ts">
  import '../app.css';
  import { onMount } from 'svelte';
  
  let { children } = $props();
  let mounted = $state(false);
  
  onMount(() => {
    mounted = true;
  });
</script>

<div class="min-h-screen bg-background font-sans antialiased">
  <!-- Added simple navigation header -->
  <header class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div class="container flex h-14 items-center justify-between">
      <div class="flex items-center space-x-6">
        <a href="/" class="flex items-center space-x-2">
          <img src="/viral8-logo.jpg" alt="Viral8" class="h-8 w-8 rounded-full" />
          <span class="font-bold text-xl">Viral8</span>
        </a>
        <nav class="hidden md:flex items-center space-x-6 text-sm font-medium">
          <a href="/" class="transition-colors hover:text-primary">Home</a>
          <a href="/dashboard" class="transition-colors hover:text-primary">Dashboard</a>
          <a href="/blog" class="transition-colors hover:text-primary">Blog</a>
        </nav>
      </div>
    </div>
  </header>

  <main>
    {@render children()}
  </main>
</div>