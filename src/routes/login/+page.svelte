<script>
  import { browser } from '$app/environment';
  import { goto } from '$app/navigation';
  import { Button } from '$lib/components/ui/button';
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Input } from '$lib/components/ui/input';
  import { login } from '$lib/services/auth.js';
  import { Key } from 'lucide-svelte';

  let username = $state('');
  let password = $state('');
  let loading = $state(false);
  let error = $state('');

  

  async function handleSubmit() {
    if (!username || !password) {
      error = 'Please enter both username and password';
      return;
    }

    loading = true;
    error = '';

    try {
      await login(username, password);
      goto('/admin/dashboard');
    } catch (err) {
      error = err.message || 'Login failed. Please check your credentials.';
    } finally {
      loading = false;
    }
  }
</script>

<svelte:head>
  <title>Login - Viral8 Admin</title>
</svelte:head>

<div class="min-h-screen bg-black flex items-center justify-center p-4">
  <Card class="w-full max-w-md bg-gray-900 border-green-500/30">
    <CardHeader class="text-center">
      <div class="flex justify-center mb-4">
        <div class="bg-green-500/10 p-3 rounded-full">
          <Key class="h-8 w-8 text-green-400" />
        </div>
      </div>
      <CardTitle class="text-2xl font-bold text-white">Admin Login</CardTitle>
      <CardDescription class="text-gray-400">
        Sign in to access the Viral8 admin panel
      </CardDescription>
    </CardHeader>
    <CardContent>
      <form on:submit|preventDefault={handleSubmit} class="space-y-4">
        {#if error}
          <div class="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        {/if}
        
        <div class="space-y-2">
          <label for="username" class="text-sm font-medium text-gray-300">Username</label>
          <Input
            id="username"
            bind:value={username}
            placeholder="Enter your username"
            class="bg-gray-800 border-green-500/30 text-white"
            disabled={loading}
          />
        </div>
        
        <div class="space-y-2">
          <label for="password" class="text-sm font-medium text-gray-300">Password</label>
          <Input
            id="password"
            bind:value={password}
            type="password"
            placeholder="Enter your password"
            class="bg-gray-800 border-green-500/30 text-white"
            disabled={loading}
          />
        </div>
        
        <Button
          type="submit"
          disabled={loading || !username || !password}
          class="w-full bg-green-600 hover:bg-green-700 text-white glow-green"
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </Button>
      </form>
    </CardContent>
  </Card>
</div>