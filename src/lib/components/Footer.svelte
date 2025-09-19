<script>
  import NetworkSelector from '$lib/components/NetworkSelector.svelte';
</script>

<footer class="py-8">
  <div class="container mx-auto px-4">
    <div class="flex flex-col md:flex-row items-center justify-between gap-8 rounded-2xl bg-zinc-900/80 p-8 shadow-lg backdrop-blur-md border border-zinc-800">
      <div class="flex items-center space-x-3">
        <img src="/viral8-logo.jpg" alt="Viral8" class="h-10 w-10 rounded-full" />
        <span class="font-bold text-xl text-white">Viral8</span>
      </div>
      
      <nav class="flex flex-wrap justify-center gap-x-6 gap-y-2 text-base font-medium text-gray-300">
        <a href="/#platforms" class="transition-colors hover:text-white">Platforms</a>
        <a href="/#features" class="transition-colors hover:text-white">Features</a>
        <a href="/#contract" class="transition-colors hover:text-white">Contract</a>
        <a href="/#vr8-token" class="transition-colors hover:text-white">VR8 Token</a>
        <a href="/#test-viral8" class="transition-colors hover:text-white">Test</a>
      </nav>
      
      <div class="flex items-center space-x-4">
        <NetworkSelector />
      </div>
    </div>
  </div>
</footer>