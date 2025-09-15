<script>
  import { onMount } from 'svelte';
  import { Button } from '$lib/components/ui/button';
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Badge } from '$lib/components/ui/badge';
  import { Input } from '$lib/components/ui/input';
  import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '$lib/components/ui/select';
  import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '$lib/components/ui/dialog';
  import { 
    Youtube, 
    Twitter, 
    Instagram, 
    Facebook,
    TrendingUp,
    TrendingDown,
    Clock,
    Users,
    Eye,
    Heart,
    MessageCircle,
    Share,
    DollarSign,
    Coins,
    Timer,
    Target,
    BarChart3,
    Activity
  } from 'lucide-svelte';
  import { API_BASE_URL } from '$lib/config/api.js';

  let mounted = $state(false);
  let loading = $state(true);
  let contentItems = $state([]);
  let userBalance = $state({ sol: 0, usdc: 0, eurc: 0 });
  let selectedToken = $state('SOL');
  let betAmount = $state('');
  let selectedPrediction = $state('');
  let showBetDialog = $state(false);
  let selectedContent = $state(null);

  const platforms = {
    youtube: { name: 'YouTube', icon: Youtube, color: 'text-red-500', bg: 'bg-red-500/10' },
    tiktok: { name: 'TikTok', icon: TrendingUp, color: 'text-pink-500', bg: 'bg-pink-500/10' },
    twitter: { name: 'Twitter', icon: Twitter, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    instagram: { name: 'Instagram', icon: Instagram, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    facebook: { name: 'Facebook', icon: Facebook, color: 'text-blue-600', bg: 'bg-blue-600/10' }
  };

  const mockContent = [
    {
      id: 1,
      platform: 'youtube',
      title: 'Amazing AI Robot Dance Performance',
      creator: '@TechDancer',
      thumbnail: '/placeholder.svg?height=200&width=300',
      currentViews: 125000,
      timePosted: '2 hours ago',
      viralityScore: 85,
      odds: { viral: 1.8, notViral: 2.1 },
      engagement: { likes: 8500, comments: 1200, shares: 450 },
      prediction: 'Rising fast - high viral potential'
    },
    {
      id: 2,
      platform: 'tiktok',
      title: 'Cat Learns to Use Smartphone',
      creator: '@PetTech',
      thumbnail: '/placeholder.svg?height=200&width=300',
      currentViews: 89000,
      timePosted: '4 hours ago',
      viralityScore: 92,
      odds: { viral: 1.5, notViral: 2.8 },
      engagement: { likes: 12000, comments: 890, shares: 2100 },
      prediction: 'Extremely high viral potential'
    },
    {
      id: 3,
      platform: 'twitter',
      title: 'Breaking: New Crypto Regulation Announced',
      creator: '@CryptoNews',
      thumbnail: '/placeholder.svg?height=200&width=300',
      currentViews: 45000,
      timePosted: '1 hour ago',
      viralityScore: 78,
      odds: { viral: 2.2, notViral: 1.7 },
      engagement: { likes: 3200, comments: 890, shares: 1500 },
      prediction: 'Moderate viral potential'
    },
    {
      id: 4,
      platform: 'instagram',
      title: 'Sunset Time-lapse from Space Station',
      creator: '@SpacePhotography',
      thumbnail: '/placeholder.svg?height=200&width=300',
      currentViews: 67000,
      timePosted: '3 hours ago',
      viralityScore: 88,
      odds: { viral: 1.6, notViral: 2.4 },
      engagement: { likes: 5600, comments: 340, shares: 780 },
      prediction: 'High viral potential'
    },
    {
      id: 5,
      platform: 'facebook',
      title: 'Grandmother Learns VR Gaming',
      creator: '@FamilyTech',
      thumbnail: '/placeholder.svg?height=200&width=300',
      currentViews: 156000,
      timePosted: '5 hours ago',
      viralityScore: 94,
      odds: { viral: 1.4, notViral: 3.1 },
      engagement: { likes: 18000, comments: 2300, shares: 4500 },
      prediction: 'Extremely high viral potential'
    },
    {
      id: 6,
      platform: 'youtube',
      title: 'DIY Hologram Projector Tutorial',
      creator: '@MakerSpace',
      thumbnail: '/placeholder.svg?height=200&width=300',
      currentViews: 34000,
      timePosted: '6 hours ago',
      viralityScore: 72,
      odds: { viral: 2.5, notViral: 1.5 },
      engagement: { likes: 2800, comments: 450, shares: 320 },
      prediction: 'Moderate viral potential'
    }
  ];

  onMount(() => {
    mounted = true;
    loadContent();
    loadUserBalance();
  });

  async function loadContent() {
    loading = true;
    try {
      // Simulate API call - replace with actual API
      await new Promise(resolve => setTimeout(resolve, 1000));
      contentItems = mockContent;
    } catch (error) {
      console.error('Failed to load content:', error);
    } finally {
      loading = false;
    }
  }

  async function loadUserBalance() {
    try {
      // Simulate balance loading - replace with actual API
      userBalance = { sol: 12.5, usdc: 450.75, eurc: 380.20 };
    } catch (error) {
      console.error('Failed to load balance:', error);
    }
  }

  function openBetDialog(content) {
    selectedContent = content;
    showBetDialog = true;
  }

  function formatNumber(num) {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  }

  function getViralityColor(score) {
    if (score >= 90) return 'text-green-400';
    if (score >= 75) return 'text-yellow-400';
    return 'text-red-400';
  }

  function getViralityBg(score) {
    if (score >= 90) return 'bg-green-400/20';
    if (score >= 75) return 'bg-yellow-400/20';
    return 'bg-red-400/20';
  }

  async function placeBet() {
    if (!betAmount || !selectedPrediction) return;
    
    try {
      // Simulate bet placement - replace with actual API
      console.log('[v0] Placing bet:', {
        content: selectedContent.id,
        amount: betAmount,
        token: selectedToken,
        prediction: selectedPrediction
      });
      
      showBetDialog = false;
      betAmount = '';
      selectedPrediction = '';
      selectedContent = null;
    } catch (error) {
      console.error('Failed to place bet:', error);
    }
  }
</script>

<svelte:head>
  <title>Dashboard - Viral8</title>
</svelte:head>

{#if mounted}
<div class="min-h-screen bg-black text-white">
  <!-- Header -->
  <div class="border-b border-green-500/20 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-40">
    <div class="container mx-auto px-4 py-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <h1 class="text-2xl font-bold text-green-400">Viral8 Dashboard</h1>
          <Badge variant="outline" class="border-green-500/30 text-green-400">
            <Activity class="mr-1 h-3 w-3" />
            Live
          </Badge>
        </div>
        
        <!-- Balance Display -->
        <div class="flex items-center space-x-6">
          <div class="flex items-center space-x-4 text-sm">
            <div class="flex items-center space-x-1">
              <Coins class="h-4 w-4 text-yellow-400" />
              <span class="text-gray-400">SOL:</span>
              <span class="text-white font-semibold">{userBalance.sol}</span>
            </div>
            <div class="flex items-center space-x-1">
              <Coins class="h-4 w-4 text-blue-400" />
              <span class="text-gray-400">USDC:</span>
              <span class="text-white font-semibold">{userBalance.usdc}</span>
            </div>
            <div class="flex items-center space-x-1">
              <Coins class="h-4 w-4 text-purple-400" />
              <span class="text-gray-400">EURC:</span>
              <span class="text-white font-semibold">{userBalance.eurc}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Main Content -->
  <div class="container mx-auto px-4 py-8">
    <!-- Stats Overview -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <Card class="interactive-card">
        <CardHeader class="pb-2">
          <CardTitle class="text-sm font-medium text-gray-400">Active Bets</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold text-white">12</div>
          <p class="text-xs text-green-400 flex items-center">
            <TrendingUp class="mr-1 h-3 w-3" />
            +2 from yesterday
          </p>
        </CardContent>
      </Card>
      
      <Card class="interactive-card">
        <CardHeader class="pb-2">
          <CardTitle class="text-sm font-medium text-gray-400">Win Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold text-white">78.5%</div>
          <p class="text-xs text-green-400 flex items-center">
            <Target class="mr-1 h-3 w-3" />
            Above average
          </p>
        </CardContent>
      </Card>
      
      <Card class="interactive-card">
        <CardHeader class="pb-2">
          <CardTitle class="text-sm font-medium text-gray-400">Total Earnings</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold text-white">24.8 SOL</div>
          <p class="text-xs text-green-400 flex items-center">
            <DollarSign class="mr-1 h-3 w-3" />
            +15.2% this week
          </p>
        </CardContent>
      </Card>
      
      <Card class="interactive-card">
        <CardHeader class="pb-2">
          <CardTitle class="text-sm font-medium text-gray-400">Trending Content</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold text-white">156</div>
          <p class="text-xs text-yellow-400 flex items-center">
            <BarChart3 class="mr-1 h-3 w-3" />
            Available to bet
          </p>
        </CardContent>
      </Card>
    </div>

    <!-- Content Grid -->
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <h2 class="text-3xl font-bold text-white">Trending Content</h2>
        <div class="flex items-center space-x-4">
          <Select bind:value={selectedToken} type="single">
            <SelectTrigger class="w-32 bg-gray-800 border-green-500/30">
              <SelectValue placeholder="Token" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="SOL">SOL</SelectItem>
              <SelectItem value="USDC">USDC</SelectItem>
              <SelectItem value="EURC">EURC</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {#if loading}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {#each Array(6) as _}
            <Card class="interactive-card animate-pulse">
              <div class="h-48 bg-gray-700 rounded-t-lg"></div>
              <CardContent class="p-4 space-y-3">
                <div class="h-4 bg-gray-700 rounded"></div>
                <div class="h-3 bg-gray-700 rounded w-3/4"></div>
                <div class="h-3 bg-gray-700 rounded w-1/2"></div>
              </CardContent>
            </Card>
          {/each}
        </div>
      {:else}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {#each contentItems as content}
            <Card class="interactive-card overflow-hidden group">
              <!-- Platform Badge -->
              <div class="absolute top-4 left-4 z-10">
                <Badge class="flex items-center space-x-1 {platforms[content.platform].bg} {platforms[content.platform].color} border-0">
                  {@const SvelteComponent = platforms[content.platform].icon}
                  <SvelteComponent class="h-3 w-3" />
                  <span>{platforms[content.platform].name}</span>
                </Badge>
              </div>
              
              <!-- Virality Score -->
              <div class="absolute top-4 right-4 z-10">
                <Badge class="flex items-center space-x-1 {getViralityBg(content.viralityScore)} {getViralityColor(content.viralityScore)} border-0">
                  <TrendingUp class="h-3 w-3" />
                  <span>{content.viralityScore}%</span>
                </Badge>
              </div>

              <!-- Thumbnail -->
              <div class="relative h-48 overflow-hidden">
                <img 
                  src={content.thumbnail || "/placeholder.svg"} 
                  alt={content.title}
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>

              <CardContent class="p-4 space-y-4">
                <!-- Content Info -->
                <div class="space-y-2">
                  <h3 class="font-semibold text-white text-sm line-clamp-2">{content.title}</h3>
                  <div class="flex items-center justify-between text-xs text-gray-400">
                    <span>{content.creator}</span>
                    <span class="flex items-center">
                      <Clock class="mr-1 h-3 w-3" />
                      {content.timePosted}
                    </span>
                  </div>
                </div>

                <!-- Engagement Stats -->
                <div class="grid grid-cols-3 gap-2 text-xs">
                  <div class="flex items-center space-x-1 text-gray-400">
                    <Eye class="h-3 w-3" />
                    <span>{formatNumber(content.currentViews)}</span>
                  </div>
                  <div class="flex items-center space-x-1 text-gray-400">
                    <Heart class="h-3 w-3" />
                    <span>{formatNumber(content.engagement.likes)}</span>
                  </div>
                  <div class="flex items-center space-x-1 text-gray-400">
                    <Share class="h-3 w-3" />
                    <span>{formatNumber(content.engagement.shares)}</span>
                  </div>
                </div>

                <!-- Prediction -->
                <div class="text-xs {getViralityColor(content.viralityScore)} font-medium">
                  {content.prediction}
                </div>

                <!-- Betting Odds -->
                <div class="flex items-center justify-between text-xs">
                  <div class="space-y-1">
                    <div class="text-gray-400">Will go viral:</div>
                    <div class="text-green-400 font-semibold">{content.odds.viral}x</div>
                  </div>
                  <div class="space-y-1 text-right">
                    <div class="text-gray-400">Won't go viral:</div>
                    <div class="text-red-400 font-semibold">{content.odds.notViral}x</div>
                  </div>
                </div>

                <!-- Bet Button -->
                <Button 
                  onclick={() => openBetDialog(content)}
                  class="w-full bg-green-600 hover:bg-green-700 text-white glow-green"
                  size="sm"
                >
                  <Target class="mr-2 h-4 w-4" />
                  Place Bet
                </Button>
              </CardContent>
            </Card>
          {/each}
        </div>
      {/if}
    </div>
  </div>

  <!-- Bet Dialog -->
  <Dialog bind:open={showBetDialog}>
    <DialogContent class="bg-gray-900 border-green-500/30 text-white max-w-md">
      <DialogHeader>
        <DialogTitle class="text-green-400">Place Your Bet</DialogTitle>
        <DialogDescription class="text-gray-400">
          {selectedContent ? `Betting on: ${selectedContent.title}` : ''}
        </DialogDescription>
      </DialogHeader>
      
      {#if selectedContent}
        <div class="space-y-4">
          <!-- Token Selection -->
          <div class="space-y-2">
            <label for="token-select" class="text-sm font-medium text-gray-300">Token</label>
            <Select bind:value={selectedToken} type="single" id="token-select">
              <SelectTrigger class="bg-gray-800 border-green-500/30">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="SOL">SOL (Balance: {userBalance.sol})</SelectItem>
                <SelectItem value="USDC">USDC (Balance: {userBalance.usdc})</SelectItem>
                <SelectItem value="EURC">EURC (Balance: {userBalance.eurc})</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <!-- Bet Amount -->
          <div class="space-y-2">
            <label for="bet-amount" class="text-sm font-medium text-gray-300">Amount</label>
            <Input 
              bind:value={betAmount}
              placeholder="Enter amount"
              type="number"
              step="0.01"
              class="bg-gray-800 border-green-500/30 text-white"
              id="bet-amount"
            />
          </div>

          <!-- Prediction -->
          <div class="space-y-2">
            <label for="prediction-select" class="text-sm font-medium text-gray-300">Prediction</label>
            <Select bind:value={selectedPrediction} type="single" id="prediction-select">
              <SelectTrigger class="bg-gray-800 border-green-500/30">
                <SelectValue placeholder="Select prediction" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="viral">Will go viral ({selectedContent.odds.viral}x)</SelectItem>
                <SelectItem value="not-viral">Won't go viral ({selectedContent.odds.notViral}x)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <!-- Potential Payout -->
          {#if betAmount && selectedPrediction}
            <div class="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
              <div class="text-sm text-gray-400">Potential Payout:</div>
              <div class="text-lg font-semibold text-green-400">
                {(parseFloat(betAmount) * (selectedPrediction === 'viral' ? selectedContent.odds.viral : selectedContent.odds.notViral)).toFixed(2)} {selectedToken}
              </div>
            </div>
          {/if}

          <!-- Action Buttons -->
          <div class="flex space-x-3 pt-4">
            <Button 
              variant="outline" 
              onclick={() => showBetDialog = false}
              class="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              Cancel
            </Button>
            <Button 
              onclick={placeBet}
              disabled={!betAmount || !selectedPrediction}
              class="flex-1 bg-green-600 hover:bg-green-700 text-white glow-green"
            >
              Place Bet
            </Button>
          </div>
        </div>
      {/if}
    </DialogContent>
  </Dialog>
</div>
{/if}
