<script>
  import { onMount } from 'svelte';
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Button } from '$lib/components/ui/button';
  import { Badge } from '$lib/components/ui/badge';
  import { Skeleton } from '$lib/components/ui/skeleton';
  import { Calendar, User, ArrowRight } from 'lucide-svelte';
  import { API_BASE_URL } from '$lib/config/api.js';

  let blogs = $state([]);
  let loading = $state(true);
  let error = $state(null);

  onMount(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/blogs`);
      if (!response.ok) {
        throw new Error('Failed to fetch blogs');
      }
      blogs = await response.json();
    } catch (err) {
      error = err.message;
    } finally {
      loading = false;
    }
  });

  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  function truncateContent(content, maxLength = 150) {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  }
</script>

<svelte:head>
  <title>Blog - Viral8</title>
  <meta name="description" content="Latest insights and updates from the Viral8 team about social media predictions and blockchain technology." />
</svelte:head>

<div class="min-h-screen bg-background">
  <!-- Hero Section -->
  <div class="relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
    <div class="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]"></div>
    <div class="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
      <div class="mx-auto max-w-2xl text-center">
        <h1 class="text-4xl font-bold tracking-tight text-foreground sm:text-6xl text-balance">
          Viral8 <span class="text-primary">Blog</span>
        </h1>
        <p class="mt-6 text-lg leading-8 text-muted-foreground text-pretty">
          Insights, updates, and deep dives into the future of social media predictions on the blockchain.
        </p>
      </div>
    </div>
  </div>

  <!-- Blog Posts -->
  <div class="mx-auto max-w-7xl px-6 py-16 lg:px-8">
    {#if loading}
      <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {#each Array(6) as _}
          <Card class="overflow-hidden">
            <CardHeader>
              <Skeleton class="h-4 w-3/4" />
              <Skeleton class="h-3 w-1/2" />
            </CardHeader>
            <CardContent>
              <Skeleton class="h-20 w-full" />
              <div class="mt-4 flex items-center gap-4">
                <Skeleton class="h-3 w-20" />
                <Skeleton class="h-3 w-16" />
              </div>
            </CardContent>
          </Card>
        {/each}
      </div>
    {:else if error}
      <div class="text-center py-12">
        <div class="mx-auto max-w-md">
          <div class="rounded-lg border border-destructive/20 bg-destructive/5 p-6">
            <h3 class="text-lg font-semibold text-destructive">Error Loading Blogs</h3>
            <p class="mt-2 text-sm text-muted-foreground">{error}</p>
            <Button 
              variant="outline" 
              class="mt-4"
              onclick={() => window.location.reload()}
            >
              Try Again
            </Button>
          </div>
        </div>
      </div>
    {:else if blogs.length === 0}
      <div class="text-center py-12">
        <div class="mx-auto max-w-md">
          <h3 class="text-lg font-semibold text-foreground">No Blog Posts Yet</h3>
          <p class="mt-2 text-sm text-muted-foreground">
            Check back soon for the latest insights from the Viral8 team.
          </p>
        </div>
      </div>
    {:else}
      <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {#each blogs as blog (blog.id)}
          <Card class="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1">
            <CardHeader>
              <div class="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                <Calendar class="h-3 w-3" />
                <span>{formatDate(blog.date)}</span>
                <span>•</span>
                <User class="h-3 w-3" />
                <span>{blog.author}</span>
              </div>
              <CardTitle class="text-xl group-hover:text-primary transition-colors">
                {blog.title}
              </CardTitle>
              <CardDescription class="text-sm">
                {blog.excerpt}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p class="text-sm text-muted-foreground leading-relaxed mb-4">
                {truncateContent(blog.content)}
              </p>
              <Button 
                variant="ghost" 
                size="sm"
                class="group/btn p-0 h-auto font-medium text-primary hover:text-primary/80"
                onclick={() => window.location.href = `/blog/${blog.id}`}
              >
                Read More
                <ArrowRight class="ml-1 h-3 w-3 transition-transform group-hover/btn:translate-x-1" />
              </Button>
            </CardContent>
          </Card>
        {/each}
      </div>
    {/if}
  </div>

  <!-- Newsletter CTA -->
  <div class="bg-primary/5 border-t">
    <div class="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <div class="mx-auto max-w-2xl text-center">
        <h2 class="text-3xl font-bold tracking-tight text-foreground">
          Stay Updated
        </h2>
        <p class="mt-4 text-lg text-muted-foreground">
          Get the latest insights delivered to your inbox when we launch.
        </p>
        <Button 
          class="mt-6"
          onclick={() => window.location.href = '/#waitlist'}
        >
          Join Waitlist
        </Button>
      </div>
    </div>
  </div>
</div>

<style>
  .bg-grid-white\/\[0\.02\] {
    background-image: radial-gradient(circle, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
  }
</style>
