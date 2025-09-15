<script>
  import { browser } from '$app/environment';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { isAuthenticated, getUserInfo, logout } from '$lib/services/auth.js';
  import { Button } from '$lib/components/ui/button/index.js';
  import { Card } from '$lib/components/ui/card/index.js';
  import { Separator } from '$lib/components/ui/separator/index.js';
  import { 
    LayoutDashboard, 
    FileText, 
    Users, 
    TrendingUp, 
    Vault, 
    LogOut,
    Menu,
    X
  } from 'lucide-svelte';

  let { children } = $props();
  
  let mounted = $state(false);
  let user = $state(null);
  let loading = $state(true);
  let sidebarOpen = $state(false);

  // Navigation items
  const navItems = [
    { href: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/admin/blogs', icon: FileText, label: 'Blogs' },
    { href: '/admin/users', icon: Users, label: 'Users' },
    { href: '/admin/markets', icon: TrendingUp, label: 'Markets' },
    { href: '/admin/vault', icon: Vault, label: 'Vault' }
  ];

  // Check authentication and get user info
  async function checkAuth() {
    if (!browser) return;
    
    if (!isAuthenticated()) {
      goto('/login');
      return;
    }

    try {
      user = await getUserInfo();
    } catch (error) {
      console.error('Failed to get user info:', error);
      goto('/login');
    } finally {
      loading = false;
    }
  }

  // Handle logout
  function handleLogout() {
    logout();
    goto('/login');
  }

  // Toggle sidebar on mobile
  function toggleSidebar() {
    sidebarOpen = !sidebarOpen;
  }

  // Close sidebar when clicking outside on mobile
  function closeSidebar() {
    sidebarOpen = false;
  }

  // Initialize component
  $effect(() => {
    if (!mounted) {
      mounted = true;
      checkAuth();
    }
  });

  // Close sidebar when route changes
  $effect(() => {
    if ($page.url.pathname) {
      sidebarOpen = false;
    }
  });
</script>

{#if mounted && !loading}
  <div class="min-h-screen bg-black text-white">
    <!-- Mobile menu button -->
    <div class="lg:hidden fixed top-4 left-4 z-50">
      <Button
        variant="outline"
        size="icon"
        onclick={toggleSidebar}
        class="bg-card border-border"
      >
        {#if sidebarOpen}
          <X class="h-4 w-4" />
        {:else}
          <Menu class="h-4 w-4" />
        {/if}
      </Button>
    </div>

    <!-- Sidebar overlay for mobile -->
    {#if sidebarOpen}
      <div 
        class="lg:hidden fixed inset-0 bg-black/50 z-40"
        role="button"
        tabindex="0"
        aria-label="Close sidebar"
        onclick={closeSidebar}
        onkeydown={(event) => {
          if (event.key === 'Escape') {
            closeSidebar();
          }
        }}
      ></div>
    {/if}

    <!-- Sidebar -->
    <aside class="fixed left-0 top-0 h-full w-64 bg-card border-r border-border z-40 transform transition-transform duration-300 ease-in-out {sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0">
      <div class="flex flex-col h-full">
        <!-- Header -->
        <div class="p-6 border-b border-border">
          <h1 class="text-2xl font-bold text-primary glow-green">Viral8 Admin</h1>
          {#if user}
            <p class="text-sm text-muted-foreground mt-1">Welcome, {user.name}</p>
          {/if}
        </div>

        <!-- Navigation -->
        <nav class="flex-1 p-4 space-y-2">
          {#each navItems as item}
            <a
              href={item.href}
              class="flex items-center gap-3 px-3 py-2 rounded-lg text-foreground hover:bg-accent hover:text-accent-foreground transition-colors {$page.url.pathname === item.href ? 'bg-accent text-accent-foreground' : ''}"
              role="button"
              tabindex="0"
              aria-label={`Go to ${item.label}`}
              onkeydown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  goto(item.href);
                }
              }}
            >
              <item.icon class="h-4 w-4" />
              {item.label}
            </a>
          {/each}
        </nav>

        <!-- Footer -->
        <div class="p-4 border-t border-border">
          <Button
            variant="outline"
            onclick={handleLogout}
            class="w-full justify-start gap-2"
            role="button"
            tabindex="0"
            aria-label="Logout"
            onkeydown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                handleLogout();
              }
            }}
          >
            <LogOut class="h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </aside>

    <!-- Main content -->
    <main class="lg:ml-64 min-h-screen">
      <div class="p-6">
        {@render children()}
      </div>
    </main>
  </div>
{:else if loading}
  <div class="min-h-screen bg-black flex items-center justify-center">
    <div class="text-center">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
      <p class="text-muted-foreground">Loading...</p>
    </div>
  </div>
{:else}
  <div class="min-h-screen bg-black flex items-center justify-center">
    <Card class="p-6">
      <p class="text-center text-muted-foreground">Redirecting to login...</p>
    </Card>
  </div>
{/if}
