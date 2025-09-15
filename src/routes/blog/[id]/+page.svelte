<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { Card, CardContent, CardHeader } from '$lib/components/ui/card';
  import { Button } from '$lib/components/ui/button';
  import { Badge } from '$lib/components/ui/badge';
  import { Skeleton } from '$lib/components/ui/skeleton';
  import { Calendar, User, ArrowLeft, Share2 } from 'lucide-svelte';
  import { API_BASE_URL } from '$lib/config/api.js';

  let blog = $state(null);
  let loading = $state(true);
  let error = $state(null);
  let relatedBlogs = $state([]);

  onMount(async () => {
    const blogId = $page.params.id;
    
    try {
      // Fetch the specific blog post
      const response = await fetch(`${API_BASE_URL}/api/blogs/${blogId}`);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Blog post not found');
        }
        throw new Error('Failed to fetch blog post');
      }
      blog = await response.json();

      // Fetch all blogs for related posts
      const allBlogsResponse = await fetch(`${API_BASE_URL}/api/blogs`);
      if (allBlogsResponse.ok) {
        const allBlogs = await allBlogsResponse.json();
        relatedBlogs = allBlogs
          .filter(b => b.id !== blogId)
          .slice(0, 3);
      }
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

  function sharePost() {
    if (navigator.share && blog) {
      navigator.share({
        title: blog.title,
        text: blog.excerpt,
        url: window.location.href
      });
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href);
      // You could show a toast notification here
    }
  }
</script>

<svelte:head>
  {#if blog}
    <title>{blog.title} - Viral8 Blog</title>
    <meta name="description" content={blog.excerpt} />
    <meta property="og:title" content={blog.title} />
    <meta property="og:description" content={blog.excerpt} />
    <meta property="og:type" content="article" />
  {:else}
    <title>Blog Post - Viral8</title>
  {/if}
</svelte:head>

<div class="min-h-screen bg-background">
  {#if loading}
    <div class="mx-auto max-w-4xl px-6 py-16 lg:px-8">
      <!-- Back button skeleton -->
      <Skeleton class="h-10 w-32 mb-8" />
      
      <!-- Article header skeleton -->
      <div class="mb-8">
        <Skeleton class="h-12 w-3/4 mb-4" />
        <div class="flex items-center gap-4 mb-6">
          <Skeleton class="h-4 w-24" />
          <Skeleton class="h-4 w-20" />
        </div>
        <Skeleton class="h-6 w-full mb-2" />
        <Skeleton class="h-6 w-2/3" />
      </div>
      
      <!-- Content skeleton -->
      <div class="space-y-4">
        {#each Array(8) as _}
          <Skeleton class="h-4 w-full" />
        {/each}
      </div>
    </div>
  {:else if error}
    <div class="mx-auto max-w-4xl px-6 py-16 lg:px-8">
      <div class="text-center py-12">
        <div class="mx-auto max-w-md">
          <div class="rounded-lg border border-destructive/20 bg-destructive/5 p-6">
            <h3 class="text-lg font-semibold text-destructive">Error Loading Blog Post</h3>
            <p class="mt-2 text-sm text-muted-foreground">{error}</p>
            <div class="mt-4 flex gap-2 justify-center">
              <Button 
                variant="outline" 
                onclick={() => window.history.back()}
              >
                <ArrowLeft class="mr-2 h-4 w-4" />
                Go Back
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onclick={() => window.location.reload()}
              >
                Try Again
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  {:else if blog}
    <article class="mx-auto max-w-4xl px-6 py-16 lg:px-8">
      <!-- Back Navigation -->
      <Button 
        variant="ghost" 
        class="mb-8 p-0 h-auto font-medium hover:text-primary"
        onclick={() => window.history.back()}
      >
        <ArrowLeft class="mr-2 h-4 w-4" />
        Back to Blog
      </Button>

      <!-- Article Header -->
      <header class="mb-12">
        <h1 class="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-6 text-balance">
          {blog.title}
        </h1>
        
        <div class="flex items-center justify-between flex-wrap gap-4 mb-6">
          <div class="flex items-center gap-4 text-sm text-muted-foreground">
            <div class="flex items-center gap-2">
              <Calendar class="h-4 w-4" />
              <span>{formatDate(blog.date)}</span>
            </div>
            <span>•</span>
            <div class="flex items-center gap-2">
              <User class="h-4 w-4" />
              <span>{blog.author}</span>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            size="sm"
            onclick={sharePost}
          >
            <Share2 class="mr-2 h-4 w-4" />
            Share
          </Button>
        </div>

        {#if blog.excerpt}
          <p class="text-xl text-muted-foreground leading-relaxed text-pretty">
            {blog.excerpt}
          </p>
        {/if}
      </header>

      <!-- Article Content -->
      <div class="prose prose-lg prose-slate dark:prose-invert max-w-none">
        <div class="whitespace-pre-wrap leading-relaxed">
          {blog.content}
        </div>
      </div>

      <!-- Article Footer -->
      <footer class="mt-16 pt-8 border-t">
        <div class="flex items-center justify-between">
          <div class="text-sm text-muted-foreground">
            Published on {formatDate(blog.date)} by {blog.author}
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onclick={sharePost}
          >
            <Share2 class="mr-2 h-4 w-4" />
            Share Post
          </Button>
        </div>
      </footer>
    </article>

    <!-- Related Posts -->
    {#if relatedBlogs.length > 0}
      <section class="bg-muted/30 border-t">
        <div class="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <h2 class="text-2xl font-bold text-foreground mb-8">Related Posts</h2>
          <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {#each relatedBlogs as relatedBlog (relatedBlog.id)}
              <Card class="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1">
                <CardHeader>
                  <div class="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                    <Calendar class="h-3 w-3" />
                    <span>{formatDate(relatedBlog.date)}</span>
                  </div>
                  <a href={`/blog/${relatedBlog.id}`} class="font-semibold group-hover:text-primary transition-colors cursor-pointer">
                    {relatedBlog.title}
                  </a>
                </CardHeader>
                <CardContent>
                  <p class="text-sm text-muted-foreground mb-4">
                    {relatedBlog.excerpt}
                  </p>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    class="p-0 h-auto font-medium text-primary hover:text-primary/80"
                    onclick={() => window.location.href = `/blog/${relatedBlog.id}`}
                  >
                    Read More
                  </Button>
                </CardContent>
              </Card>
            {/each}
          </div>
        </div>
      </section>
    {/if}
  {/if}
</div>
