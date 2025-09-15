<script>
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card/index.js';
  import { Button } from '$lib/components/ui/button/index.js';
  import { Input } from '$lib/components/ui/input/index.js';
  import { Separator } from '$lib/components/ui/separator/index.js';
  import { 
    TrendingUp, 
    Search, 
    Plus, 
    BarChart3, 
    Activity,
    RefreshCw
  } from 'lucide-svelte';
</script>

<svelte:head>
  <title>Market Management - Viral8 Admin</title>
</svelte:head>

<div class="space-y-6">
  <!-- Header -->
  <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
    <div>
      <h1 class="text-3xl font-bold text-primary">Market Management</h1>
      <p class="text-muted-foreground">Create and manage prediction markets</p>
    </div>
    
    <div class="flex items-center gap-4">
      <!-- Search -->
      <div class="relative">
        <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search markets..."
          class="pl-10 w-64"
          disabled
        />
      </div>
      
      <!-- Action Buttons -->
      <Button variant="outline" disabled>
        <RefreshCw class="h-4 w-4" />
      </Button>
      
      <Button disabled class="gap-2">
        <Plus class="h-4 w-4" />
        Create Market
      </Button>
    </div>
  </div>

  <Separator />

  <!-- Placeholder Content -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    <!-- Quick Stats -->
    <Card class="interactive-card">
      <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle class="text-sm font-medium">Active Markets</CardTitle>
        <TrendingUp class="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div class="text-2xl font-bold text-primary">--</div>
        <p class="text-xs text-muted-foreground">Coming soon</p>
      </CardContent>
    </Card>

    <Card class="interactive-card">
      <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle class="text-sm font-medium">Total Volume</CardTitle>
        <BarChart3 class="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div class="text-2xl font-bold text-primary">--</div>
        <p class="text-xs text-muted-foreground">Coming soon</p>
      </CardContent>
    </Card>

    <Card class="interactive-card">
      <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle class="text-sm font-medium">Settled Markets</CardTitle>
        <Activity class="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div class="text-2xl font-bold text-primary">--</div>
        <p class="text-xs text-muted-foreground">Coming soon</p>
      </CardContent>
    </Card>

    <Card class="interactive-card">
      <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle class="text-sm font-medium">Pending Markets</CardTitle>
        <TrendingUp class="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div class="text-2xl font-bold text-primary">--</div>
        <p class="text-xs text-muted-foreground">Coming soon</p>
      </CardContent>
    </Card>
  </div>

  <!-- Main Content -->
  <Card>
    <CardContent class="pt-6">
      <div class="text-center py-12">
        <TrendingUp class="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h3 class="text-xl font-semibold mb-2">Market Management</h3>
        <p class="text-muted-foreground mb-6 max-w-md mx-auto">
          This section will contain market management functionality including creating new markets, 
          monitoring active markets, settling outcomes, and analyzing market performance.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <Button disabled variant="outline" class="gap-2">
            <Plus class="h-4 w-4" />
            Create Market
          </Button>
          <Button disabled variant="outline" class="gap-2">
            <BarChart3 class="h-4 w-4" />
            Market Analytics
          </Button>
          <Button disabled variant="outline" class="gap-2">
            <Activity class="h-4 w-4" />
            Settlement Queue
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>
</div>
