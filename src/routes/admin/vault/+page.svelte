<script>
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Separator } from '$lib/components/ui/separator';
  import { 
    Vault, 
    Search, 
    DollarSign, 
    TrendingUp, 
    TrendingDown,
    RefreshCw,
    Shield
  } from 'lucide-svelte';
</script>

<svelte:head>
  <title>Vault Management - Viral8 Admin</title>
</svelte:head>

<div class="space-y-6">
  <!-- Header -->
  <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
    <div>
      <h1 class="text-3xl font-bold text-primary">Vault Management</h1>
      <p class="text-muted-foreground">Monitor and manage platform treasury</p>
    </div>
    
    <div class="flex items-center gap-4">
      <!-- Search -->
      <div class="relative">
        <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search transactions..."
          class="pl-10 w-64"
          disabled
        />
      </div>
      
      <!-- Action Buttons -->
      <Button variant="outline" disabled>
        <RefreshCw class="h-4 w-4" />
      </Button>
    </div>
  </div>

  <Separator />

  <!-- Placeholder Content -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    <!-- Quick Stats -->
    <Card class="interactive-card">
      <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle class="text-sm font-medium">Vault Balance</CardTitle>
        <div class="flex justify-center">
          <img src="/icons8-solana-64(1).png" alt="Solana" class="h-4 w-4 opacity-70" />
        </div>
      </CardHeader>
      <CardContent>
        <div class="text-2xl font-bold text-primary">--</div>
        <p class="text-xs text-muted-foreground">Coming soon</p>
      </CardContent>
    </Card>

    <Card class="interactive-card">
      <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle class="text-sm font-medium">Total Deposits</CardTitle>
        <TrendingUp class="h-4 w-4 text-green-500" />
      </CardHeader>
      <CardContent>
        <div class="text-2xl font-bold text-green-500">--</div>
        <p class="text-xs text-muted-foreground">Coming soon</p>
      </CardContent>
    </Card>

    <Card class="interactive-card">
      <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle class="text-sm font-medium">Total Withdrawals</CardTitle>
        <TrendingDown class="h-4 w-4 text-red-500" />
      </CardHeader>
      <CardContent>
        <div class="text-2xl font-bold text-red-500">--</div>
        <p class="text-xs text-muted-foreground">Coming soon</p>
      </CardContent>
    </Card>

    <Card class="interactive-card">
      <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle class="text-sm font-medium">Reserved Funds</CardTitle>
        <Shield class="h-4 w-4 text-muted-foreground" />
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
        <div class="flex justify-center mb-4">
          <img src="/icons8-solana-64(1).png" alt="Solana" class="h-16 w-16 opacity-70" />
        </div>
        <h3 class="text-xl font-semibold mb-2">Vault Management</h3>
        <p class="text-muted-foreground mb-6 max-w-md mx-auto">
          This section will contain vault management functionality including treasury monitoring, 
          transaction history, fund allocation, and security controls.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <Button disabled variant="outline" class="gap-2">
            <img src="/icons8-dollar-50.png" alt="Transactions" class="h-4 w-4" />
            Transaction History
          </Button>
          <Button disabled variant="outline" class="gap-2">
            <Shield class="h-4 w-4" />
            Security Settings
          </Button>
          <Button disabled variant="outline" class="gap-2">
            <TrendingUp class="h-4 w-4" />
            Fund Allocation
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>
</div>
