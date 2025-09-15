<script>
  import { browser } from '$app/environment';
  import { API_BASE_URL } from '$lib/config/api.js';
  import { getAuthToken } from '$lib/services/auth.js';
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card/index.js';
  import { Button } from '$lib/components/ui/button/index.js';
  import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '$lib/components/ui/select/index.js';
  import { Separator } from '$lib/components/ui/separator/index.js';
  import { 
    TrendingUp, 
    Users, 
    DollarSign, 
    Activity,
    Vault,
    ArrowUpDown,
    RefreshCw
  } from 'lucide-svelte';

  let mounted = $state(false);
  let metrics = $state(null);
  let loading = $state(true);
  let error = $state(null);
  let selectedCurrency = $state('USD');
  let exchangeRates = $state({ USD: 1, EUR: 0.85, GBP: 0.73, JPY: 110 });

  // Currency options
  const currencies = [
    { value: 'USD', label: 'USD ($)' },
    { value: 'EUR', label: 'EUR (€)' },
    { value: 'GBP', label: 'GBP (£)' },
    { value: 'JPY', label: 'JPY (¥)' }
  ];

  // Fetch metrics from API
  async function fetchMetrics() {
    if (!browser) return;
    
    const token = getAuthToken();
    if (!token) return;

    try {
      loading = true;
      error = null;
      
      const response = await fetch(`${API_BASE_URL}/api/admin/metrics`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch metrics');
      }

      metrics = await response.json();
    } catch (err) {
      console.error('Error fetching metrics:', err);
      error = err.message;
    } finally {
      loading = false;
    }
  }

  // Format currency value
  function formatCurrency(value, currency = selectedCurrency) {
    const convertedValue = value * exchangeRates[currency];
    
    const formatters = {
      USD: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }),
      EUR: new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }),
      GBP: new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }),
      JPY: new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' })
    };

    return formatters[currency].format(convertedValue);
  }

  // Format number with commas
  function formatNumber(value) {
    return new Intl.NumberFormat().format(value);
  }

  // Handle currency change
  function handleCurrencyChange(value) {
    selectedCurrency = value;
  }

  // Initialize component
  $effect(() => {
    mounted = true;
    fetchMetrics();
  });
</script>

<svelte:head>
  <title>Dashboard - Viral8 Admin</title>
</svelte:head>

<div class="space-y-6">
  <!-- Header -->
  <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
    <div>
      <h1 class="text-3xl font-bold text-primary">Dashboard</h1>
      <p class="text-muted-foreground">Overview of your platform metrics</p>
    </div>
    
    <div class="flex items-center gap-4">
      <!-- Currency Selector -->
      <div class="flex items-center gap-2">
        <ArrowUpDown class="h-4 w-4 text-muted-foreground" />
        <Select type="single" value={selectedCurrency} onValueChange={handleCurrencyChange}>
          <SelectTrigger class="w-32">
            <SelectValue placeholder="Currency">
              <div class="flex items-center gap-2">
                {#if selectedCurrency === 'USD'}
                  <img src="/icons8-dollar-50.png" alt="USD" class="h-4 w-4" />
                {:else if selectedCurrency === 'EUR'}
                  <img src="/icons8-euro-50.png" alt="EUR" class="h-4 w-4" />
                {:else}
                  <DollarSign class="h-4 w-4" />
                {/if}
                <span>{selectedCurrency}</span>
              </div>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {#each currencies as currency}
              <SelectItem value={currency.value}>
                <div class="flex items-center gap-2">
                  {#if currency.value === 'USD'}
                    <img src="/icons8-dollar-50.png" alt="USD" class="h-4 w-4" />
                  {:else if currency.value === 'EUR'}
                    <img src="/icons8-euro-50.png" alt="EUR" class="h-4 w-4" />
                  {:else}
                    <DollarSign class="h-4 w-4" />
                  {/if}
                  <span>{currency.label}</span>
                </div>
              </SelectItem>
            {/each}
          </SelectContent>
        </Select>
      </div>
      
      <!-- Refresh Button -->
      <Button variant="outline" onclick={fetchMetrics} disabled={loading}>
        <RefreshCw class="h-4 w-4 {loading ? 'animate-spin' : ''}" />
      </Button>
    </div>
  </div>

  <Separator />

  {#if loading && !metrics}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {#each Array(8) as _}
        <Card class="animate-pulse">
          <CardHeader class="pb-2">
            <div class="h-4 bg-muted rounded w-3/4"></div>
            <div class="h-6 bg-muted rounded w-1/2 mt-2"></div>
          </CardHeader>
        </Card>
      {/each}
    </div>
  {:else if error}
    <Card class="border-destructive">
      <CardContent class="pt-6">
        <div class="text-center">
          <p class="text-destructive mb-4">Error loading metrics: {error}</p>
          <Button onclick={fetchMetrics}>Try Again</Button>
        </div>
      </CardContent>
    </Card>
  {:else if metrics}
    <!-- Metrics Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <!-- Total Markets -->
      <Card class="interactive-card">
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">Total Markets</CardTitle>
          <TrendingUp class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold text-primary">{formatNumber(metrics.total_markets)}</div>
          <p class="text-xs text-muted-foreground">Active prediction markets</p>
        </CardContent>
      </Card>

      <!-- Total Users -->
      <Card class="interactive-card">
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">Total Users</CardTitle>
          <Users class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold text-primary">{formatNumber(metrics.total_users)}</div>
          <p class="text-xs text-muted-foreground">Registered users</p>
        </CardContent>
      </Card>

      <!-- Profit/Loss -->
      <Card class="interactive-card">
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">Profit/Loss</CardTitle>
          <DollarSign class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold {metrics.profit_loss >= 0 ? 'text-green-500' : 'text-red-500'}">
            {formatCurrency(metrics.profit_loss)}
          </div>
          <p class="text-xs text-muted-foreground">Platform P&L</p>
        </CardContent>
      </Card>

      <!-- TVL -->
      <Card class="interactive-card">
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">Total Value Locked</CardTitle>
          <Vault class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold text-primary">{formatCurrency(metrics.tvl)}</div>
          <p class="text-xs text-muted-foreground">Locked in markets</p>
        </CardContent>
      </Card>

      <!-- Total Bets -->
      <Card class="interactive-card">
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">Total Bets</CardTitle>
          <Activity class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold text-primary">{formatNumber(metrics.total_bets)}</div>
          <p class="text-xs text-muted-foreground">All time bets</p>
        </CardContent>
      </Card>

      <!-- Total Deposits -->
      <Card class="interactive-card">
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">Total Deposits</CardTitle>
          <TrendingUp class="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold text-green-500">{formatCurrency(metrics.total_deposit)}</div>
          <p class="text-xs text-muted-foreground">User deposits</p>
        </CardContent>
      </Card>

      <!-- Total Withdrawals -->
      <Card class="interactive-card">
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">Total Withdrawals</CardTitle>
          <TrendingUp class="h-4 w-4 text-red-500 rotate-180" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold text-red-500">{formatCurrency(metrics.total_withdrawn)}</div>
          <p class="text-xs text-muted-foreground">User withdrawals</p>
        </CardContent>
      </Card>

      <!-- Vault Balance -->
      <Card class="interactive-card">
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">Vault Balance</CardTitle>
          <Vault class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold text-primary">{formatCurrency(metrics.vault_balance)}</div>
          <p class="text-xs text-muted-foreground">Available funds</p>
        </CardContent>
      </Card>
    </div>

    <!-- Additional Stats -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card class="interactive-card">
        <CardHeader>
          <CardTitle>Betting Activity</CardTitle>
          <CardDescription>Overview of betting statistics</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="flex justify-between items-center">
            <span class="text-sm text-muted-foreground">Settled Bets</span>
            <span class="font-semibold">{formatNumber(metrics.total_settled_bets)}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-sm text-muted-foreground">Open Bets</span>
            <span class="font-semibold">{formatNumber(metrics.total_open_bets)}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-sm text-muted-foreground">Settlement Rate</span>
            <span class="font-semibold">
              {metrics.total_bets > 0 ? ((metrics.total_settled_bets / metrics.total_bets) * 100).toFixed(1) : 0}%
            </span>
          </div>
        </CardContent>
      </Card>

      <Card class="interactive-card">
        <CardHeader>
          <CardTitle>Financial Overview</CardTitle>
          <CardDescription>Key financial metrics in {selectedCurrency}</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="flex justify-between items-center">
            <span class="text-sm text-muted-foreground">Net Flow</span>
            <span class="font-semibold {(metrics.total_deposit - metrics.total_withdrawn) >= 0 ? 'text-green-500' : 'text-red-500'}">
              {formatCurrency(metrics.total_deposit - metrics.total_withdrawn)}
            </span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-sm text-muted-foreground">Utilization Rate</span>
            <span class="font-semibold">
              {metrics.vault_balance > 0 ? ((metrics.tvl / metrics.vault_balance) * 100).toFixed(1) : 0}%
            </span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-sm text-muted-foreground">Avg Bet Size</span>
            <span class="font-semibold">
              {metrics.total_bets > 0 ? formatCurrency(metrics.tvl / metrics.total_bets) : formatCurrency(0)}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  {/if}
</div>
