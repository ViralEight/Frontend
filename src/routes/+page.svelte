<script>
  import { Button } from '$lib/components/ui/button';
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Input } from '$lib/components/ui/input';
  import { Badge } from '$lib/components/ui/badge';
  import { 
    Youtube, 
    Twitter, 
    Instagram, 
    Facebook,
    ExternalLink,
    Copy,
    TrendingUp,
    Coins,
    Shield,
    Zap,
    Users,
    BarChart3
  } from 'lucide-svelte';
  import { API_BASE_URL } from '$lib/config/api.js';

  let email = $state('');
  let isSubmitting = $state(false);
  let submitMessage = $state('');

  const platforms = [
    { name: 'YouTube', icon: Youtube, color: 'text-red-500' },
    { name: 'TikTok', icon: TrendingUp, color: 'text-pink-500' },
    { name: 'Twitter', icon: Twitter, color: 'text-blue-400' },
    { name: 'Instagram', icon: Instagram, color: 'text-purple-500' },
    { name: 'Facebook', icon: Facebook, color: 'text-blue-600' }
  ];

  const tokens = ['SOL', 'USDC', 'EURC', 'VR8'];
  const contractAddress = '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU';

  async function handleWaitlistSubmit() {
    if (!email) return;
    
    isSubmitting = true;
    try {
      const response = await fetch(`${API_BASE_URL}/api/waitlist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      
      if (response.ok) {
        submitMessage = 'Successfully joined the waitlist!';
        email = '';
      } else {
        submitMessage = 'Error joining waitlist. Please try again.';
      }
    } catch (error) {
      submitMessage = 'Error joining waitlist. Please try again.';
    } finally {
      isSubmitting = false;
      setTimeout(() => submitMessage = '', 3000);
    }
  }

  function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
  }
</script>

<svelte:head>
  <title>Viral8 - The Future of Social Media Predictions on Solana</title>
  <meta name="description" content="Bet on the virality of social media content across YouTube, TikTok, Twitter, Instagram, and Facebook using SOL, USDC, EURC tokens on Solana blockchain." />
</svelte:head>

<div class="min-h-screen bg-black text-white overflow-hidden">
  <!-- Hero Section -->
  <section class="relative min-h-screen flex items-center justify-center grid-bg">
    <!-- Floating trending icons -->
    <div class="absolute w-8 h-8 top-20 left-10 opacity-30 text-green-500 rising-icon">
      <TrendingUp class="w-full h-full" />
    </div>
    <div class="absolute w-6 h-6 top-40 right-20 opacity-20 text-green-500 rising-icon" style="animation-delay: -2s;">
      <TrendingUp class="w-full h-full" />
    </div>
    <div class="absolute w-10 h-10 bottom-32 left-1/4 opacity-25 text-green-500 rising-icon" style="animation-delay: -4s;">
      <TrendingUp class="w-full h-full" />
    </div>
    
    <div class="container mx-auto px-4 text-center relative z-10">
      <div class="max-w-4xl mx-auto space-y-8">
        <!-- Logo -->
        <div class="flex justify-center mb-8">
          <img src="/viral8-logo.jpg" alt="Viral8 Logo" class="h-20 w-20 rounded-full" />
        </div>
        
        <!-- Main heading -->
        <h1 class="text-6xl md:text-8xl font-bold text-balance">
          Viral<span class="text-green-400">8</span>
        </h1>
        
        <p class="text-xl md:text-2xl text-gray-300 text-balance max-w-3xl mx-auto">
          The Future of Social Media Predictions on Solana
        </p>
        
        <p class="text-lg text-gray-400 text-pretty max-w-2xl mx-auto">
          Bet on the virality potential of content across major social media platforms. 
          Stake tokens on the next viral sensation.
        </p>
        
        <!-- Token badges with icons -->
        <div class="flex flex-wrap justify-center gap-4 mt-8">
          <div class="flex items-center gap-2 bg-gray-800/50 px-4 py-2 rounded-lg border border-green-500/30">
            <img src="/icons8-solana-64(1).png" alt="Solana" class="h-6 w-6" />
            <span class="text-green-400 font-semibold">SOL</span>
          </div>
          <div class="flex items-center gap-2 bg-gray-800/50 px-4 py-2 rounded-lg border border-blue-500/30">
            <img src="/icons8-dollar-50.png" alt="USDC" class="h-6 w-6" />
            <span class="text-blue-400 font-semibold">USDC</span>
          </div>
          <div class="flex items-center gap-2 bg-gray-800/50 px-4 py-2 rounded-lg border border-purple-500/30">
            <img src="/icons8-euro-50.png" alt="EURC" class="h-6 w-6" />
            <span class="text-purple-400 font-semibold">EURC</span>
          </div>
          <div class="flex items-center gap-2 bg-gray-800/50 px-4 py-2 rounded-lg border border-green-500/30">
            <Coins class="h-6 w-6 text-green-400" />
            <span class="text-green-400 font-semibold">VR8</span>
          </div>
        </div>
        
        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <Button size="lg" class="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg glow-green">
            <TrendingUp class="mr-2 h-5 w-5" />
            Start Predicting
          </Button>
          <Button variant="outline" size="lg" class="border-green-500/50 text-green-400 hover:bg-green-500/10 px-8 py-4 text-lg">
            <BarChart3 class="mr-2 h-5 w-5" />
            View Analytics
          </Button>
        </div>
      </div>
    </div>
  </section>

  <!-- Supported Platforms Section -->
  <section class="py-20 bg-gradient-to-b from-black to-gray-900">
    <div class="container mx-auto px-4">
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold mb-6 text-balance">
          Supported <span class="text-green-400">Platforms</span>
        </h2>
        <p class="text-xl text-gray-400 max-w-2xl mx-auto text-pretty">
          Predict virality across the world's most popular social media platforms
        </p>
      </div>
      
      <div class="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-4xl mx-auto">
        {#each platforms as platform}
          <Card class="interactive-card text-center p-6 hover:scale-105 transition-transform">
            <CardContent class="flex flex-col items-center space-y-4 p-0">
              <platform.icon class="h-12 w-12 {platform.color}" />
              <h3 class="text-lg font-semibold text-white">{platform.name}</h3>
            </CardContent>
          </Card>
        {/each}
      </div>
    </div>
  </section>

  <!-- Features Section -->
  <section class="py-20 bg-gray-900">
    <div class="container mx-auto px-4">
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold mb-6 text-balance">
          Why Choose <span class="text-green-400">Viral8</span>?
        </h2>
      </div>
      
      <div class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <Card class="interactive-card p-6">
          <CardHeader class="text-center">
            <div class="flex justify-center mb-4">
              <img src="/icons8-solana-64(1).png" alt="Lightning Fast" class="h-12 w-12" />
            </div>
            <CardTitle class="text-xl text-white">Lightning Fast</CardTitle>
          </CardHeader>
          <CardContent>
            <p class="text-gray-400 text-center">
              Leverage Solana's high-speed, low-cost transactions for instant betting and payouts
            </p>
          </CardContent>
        </Card>
        
        <Card class="interactive-card p-6">
          <CardHeader class="text-center">
            <div class="flex justify-center mb-4">
              <Shield class="h-12 w-12 text-green-400" />
            </div>
            <CardTitle class="text-xl text-white">Transparent & Secure</CardTitle>
          </CardHeader>
          <CardContent>
            <p class="text-gray-400 text-center">
              All predictions and payouts handled through auditable smart contracts
            </p>
          </CardContent>
        </Card>
        
        <Card class="interactive-card p-6">
          <CardHeader class="text-center">
            <div class="flex justify-center mb-4">
              <img src="/icons8-dollar-50.png" alt="Earn Rewards" class="h-12 w-12" />
            </div>
            <CardTitle class="text-xl text-white">Earn Rewards</CardTitle>
          </CardHeader>
          <CardContent>
            <p class="text-gray-400 text-center">
              Win tokens for accurate predictions through smart contract automation
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>

  <!-- Deployed Contract Section -->
  <section class="py-20 bg-black">
    <div class="container mx-auto px-4">
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold mb-6 text-balance">
          Deployed <span class="text-green-400">Contract</span>
        </h2>
        <p class="text-xl text-gray-400 max-w-2xl mx-auto text-pretty">
          Our smart contract is live on Solana mainnet, ensuring transparency and security
        </p>
      </div>
      
      <div class="max-w-4xl mx-auto">
        <Card class="interactive-card p-8">
          <CardContent class="space-y-6">
            <div class="text-center">
              <h3 class="text-2xl font-bold text-white mb-4">Contract Address</h3>
              <div class="contract-address text-green-400 flex items-center justify-between">
                <span class="flex-1">{contractAddress}</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onclick={() => copyToClipboard(contractAddress)}
                  class="ml-2 text-green-400 hover:text-green-300"
                >
                  <Copy class="h-4 w-4" />
                </Button>
              </div>
              <div class="mt-4 flex justify-center">
                <img src="/icons8-solana-64(1).png" alt="Solana" class="h-8 w-8 opacity-70" />
              </div>
            </div>
            
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" class="border-green-500/50 text-green-400 hover:bg-green-500/10">
                <ExternalLink class="mr-2 h-4 w-4" />
                View on Solana Explorer
              </Button>
              <Button variant="outline" class="border-green-500/50 text-green-400 hover:bg-green-500/10">
                <ExternalLink class="mr-2 h-4 w-4" />
                Read Documentation
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>

  <!-- VR8 Token Section -->
  <section class="py-20 bg-gradient-to-b from-gray-900 to-black">
    <div class="container mx-auto px-4">
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold mb-6 text-balance">
          <span class="text-green-400">VR8</span> Token
        </h2>
        <p class="text-xl text-gray-400 max-w-2xl mx-auto text-pretty">
          The native utility token powering the Viral8 ecosystem
        </p>
      </div>
      
      <div class="max-w-4xl mx-auto">
        <Card class="interactive-card p-8">
          <CardContent class="space-y-8">
            <div class="text-center">
              <div class="inline-flex items-center justify-center w-20 h-20 bg-green-500/20 rounded-full mb-6">
                <Coins class="h-10 w-10 text-green-400" />
              </div>
              <h3 class="text-3xl font-bold text-white mb-4">Coming Soon</h3>
              <p class="text-lg text-gray-400 text-pretty">
                VR8 will be the primary token for staking, governance, and earning rewards 
                for accurate virality predictions on the Viral8 platform.
              </p>
            </div>
            
            <div class="grid md:grid-cols-3 gap-6 mt-12">
              <div class="text-center">
                <div class="flex justify-center mb-3">
                  <img src="/icons8-solana-64(1).png" alt="Stake" class="h-8 w-8" />
                </div>
                <h4 class="text-lg font-semibold text-white mb-2">Stake & Earn</h4>
                <p class="text-sm text-gray-400">Stake VR8 tokens to participate in predictions</p>
              </div>
              <div class="text-center">
                <div class="flex justify-center mb-3">
                  <Users class="h-8 w-8 text-green-400" />
                </div>
                <h4 class="text-lg font-semibold text-white mb-2">Governance</h4>
                <p class="text-sm text-gray-400">Vote on platform decisions and improvements</p>
              </div>
              <div class="text-center">
                <div class="flex justify-center mb-3">
                  <img src="/icons8-dollar-50.png" alt="Rewards" class="h-8 w-8" />
                </div>
                <h4 class="text-lg font-semibold text-white mb-2">Rewards</h4>
                <p class="text-sm text-gray-400">Earn VR8 for accurate predictions</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>

  <!-- CTA Section -->
  <section class="py-20 bg-black relative">
    <div class="absolute w-7 h-7 top-10 right-10 opacity-20 text-green-500 rising-icon">
      <TrendingUp class="w-full h-full" />
    </div>
    <div class="absolute w-9 h-9 bottom-10 left-10 opacity-25 text-green-500 rising-icon" style="animation-delay: -3s;">
      <TrendingUp class="w-full h-full" />
    </div>
    
    <div class="container mx-auto px-4 text-center relative z-10">
      <div class="max-w-2xl mx-auto">
        <h2 class="text-4xl md:text-5xl font-bold mb-6 text-balance">
          Ready to Start <span class="text-green-400">Predicting</span>?
        </h2>
        <p class="text-xl text-gray-400 mb-8 text-pretty">
          Join the waitlist to be the first to know when Viral8 launches
        </p>
        
        <Card class="interactive-card p-8">
          <CardContent class="space-y-6">
            <div class="flex flex-col sm:flex-row gap-4">
              <Input 
                bind:value={email}
                placeholder="Enter your email address"
                type="email"
                class="flex-1 bg-gray-800 border-green-500/30 text-white placeholder-gray-400"
              />
              <Button 
                onclick={handleWaitlistSubmit}
                disabled={isSubmitting || !email}
                class="bg-green-600 hover:bg-green-700 text-white px-8 glow-green"
              >
                {isSubmitting ? 'Joining...' : 'Join Waitlist'}
              </Button>
            </div>
            
            {#if submitMessage}
              <p class="text-sm {submitMessage.includes('Success') ? 'text-green-400' : 'text-red-400'}">
                {submitMessage}
              </p>
            {/if}
            
            <div class="text-center">
              <Badge variant="outline" class="px-6 py-2 text-lg border-green-500/30 text-green-400 bg-green-500/10">
                Coming Soon
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
</div>
