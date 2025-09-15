<script>
  import { browser } from '$app/environment';
  import { API_BASE_URL } from '$lib/config/api.js';
  import { getAuthToken } from '$lib/services/auth.js';
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card/index.js';
  import { Button } from '$lib/components/ui/button/index.js';
  import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '$lib/components/ui/dialog/index.js';
  import { Input } from '$lib/components/ui/input/index.js';
  import { Label } from '$lib/components/ui/label/index.js';
  import { Textarea } from '$lib/components/ui/textarea/index.js';
  import { Separator } from '$lib/components/ui/separator/index.js';
  import { Badge } from '$lib/components/ui/badge/index.js';
  import { 
    Plus, 
    FileText, 
    Calendar, 
    User, 
    Edit, 
    Trash2, 
    RefreshCw,
    Search
  } from 'lucide-svelte';

  let mounted = $state(false);
  let blogs = $state([]);
  let searchQuery = $state('');
  let loading = $state(true);
  let error = $state(null);
  let createDialogOpen = $state(false);
  let creating = $state(false);
  let newBlog = $state({
    title: '',
    content: '',
    excerpt: '',
    author: ''
  });

  // Fetch blogs from API
  async function fetchBlogs() {
    if (!browser) return;
    
    try {
      loading = true;
      error = null;
      
      const response = await fetch(`${API_BASE_URL}/api/blogs`);

      if (!response.ok) {
        throw new Error('Failed to fetch blogs');
      }

      const fetchedBlogs = await response.json();
      blogs = fetchedBlogs;
    } catch (err) {
      console.error('Error fetching blogs:', err);
      error = err.message;
    } finally {
      loading = false;
    }
  }

  // Create new blog
  async function createBlog() {
    if (!browser) return;
    
    const token = getAuthToken();
    if (!token) return;

    // Validate form
    if (!newBlog.title.trim() || !newBlog.content.trim() || !newBlog.excerpt.trim() || !newBlog.author.trim()) {
      error = 'All fields are required';
      return;
    }

    try {
      creating = true;
      error = null;
      
      const response = await fetch(`${API_BASE_URL}/api/blogs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newBlog)
      });

      if (!response.ok) {
        throw new Error('Failed to create blog');
      }

      const createdBlog = await response.json();
      blogs = [createdBlog, ...blogs];
      
      // Reset form
      newBlog = {
        title: '',
        content: '',
        excerpt: '',
        author: ''
      };
      
      createDialogOpen = false;
    } catch (err) {
      console.error('Error creating blog:', err);
      error = err.message;
    } finally {
      creating = false;
    }
  }

  // Format date
  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  const filteredBlogs = $derived(
    blogs.filter(blog => 
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  // Handle form submission
  function handleSubmit(event) {
    event.preventDefault();
    createBlog();
  }

  // Initialize component
  $effect(() => {
    if (!mounted) {
      mounted = true;
      fetchBlogs();
    }
  });
</script>

<svelte:head>
  <title>Blog Management - Viral8 Admin</title>
</svelte:head>

<div class="space-y-6">
  <!-- Header -->
  <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
    <div>
      <h1 class="text-3xl font-bold text-primary">Blog Management</h1>
      <p class="text-muted-foreground">Create and manage blog posts</p>
    </div>
    
    <div class="flex items-center gap-4">
      <!-- Search -->
      <div class="relative">
        <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search blogs..."
          bind:value={searchQuery}
          class="pl-10 w-64"
        />
      </div>
      
      <!-- Refresh Button -->
      <Button variant="outline" onclick={fetchBlogs} disabled={loading}>
        <RefreshCw class="h-4 w-4 {loading ? 'animate-spin' : ''}" />
      </Button>
      
      <!-- Create Blog Button -->
      <Dialog bind:open={createDialogOpen}>
        <DialogTrigger asChild >
          {#snippet children({ builder })}
                    <Button builders={[builder]} class="gap-2">
              <Plus class="h-4 w-4" />
              New Blog
            </Button>
                            {/snippet}
                </DialogTrigger>
        <DialogContent class="sm:max-w-[600px] bg-card">
          <DialogHeader>
            <DialogTitle>Create New Blog Post</DialogTitle>
            <DialogDescription>
              Fill in the details to create a new blog post.
            </DialogDescription>
          </DialogHeader>
          
          <form onsubmit={handleSubmit} class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-2">
                <Label for="title">Title</Label>
                <Input
                  id="title"
                  type="text"
                  bind:value={newBlog.title}
                  placeholder="Enter blog title"
                  required
                />
              </div>
              <div class="space-y-2">
                <Label for="author">Author</Label>
                <Input
                  id="author"
                  type="text"
                  bind:value={newBlog.author}
                  placeholder="Enter author name"
                  required
                />
              </div>
            </div>
            
            <div class="space-y-2">
              <Label for="excerpt">Excerpt</Label>
              <Textarea
                id="excerpt"
                bind:value={newBlog.excerpt}
                placeholder="Enter a brief excerpt"
                rows="3"
                required
              />
            </div>
            
            <div class="space-y-2">
              <Label for="content">Content</Label>
              <Textarea
                id="content"
                bind:value={newBlog.content}
                placeholder="Enter the full blog content"
                rows="8"
                required
              />
            </div>
            
            {#if error}
              <div class="text-sm text-destructive">{error}</div>
            {/if}
            
            <div class="flex justify-end gap-2">
              <Button 
                type="button" 
                variant="outline" 
                onclick={() => createDialogOpen = false}
                disabled={creating}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={creating}>
                {#if creating}
                  <RefreshCw class="h-4 w-4 animate-spin mr-2" />
                  Creating...
                {:else}
                  Create Blog
                {/if}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  </div>

  <Separator />

  {#if loading && blogs.length === 0}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each Array(6) as _}
        <Card class="animate-pulse">
          <CardHeader>
            <div class="h-4 bg-muted rounded w-3/4"></div>
            <div class="h-3 bg-muted rounded w-1/2 mt-2"></div>
          </CardHeader>
          <CardContent>
            <div class="space-y-2">
              <div class="h-3 bg-muted rounded"></div>
              <div class="h-3 bg-muted rounded w-5/6"></div>
            </div>
          </CardContent>
        </Card>
      {/each}
    </div>
  {:else if error && blogs.length === 0}
    <Card class="border-destructive">
      <CardContent class="pt-6">
        <div class="text-center">
          <FileText class="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p class="text-destructive mb-4">Error loading blogs: {error}</p>
          <Button onclick={fetchBlogs}>Try Again</Button>
        </div>
      </CardContent>
    </Card>
  {:else if filteredBlogs.length === 0}
    <Card>
      <CardContent class="pt-6">
        <div class="text-center">
          <FileText class="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 class="text-lg font-semibold mb-2">
            {searchQuery ? 'No blogs found' : 'No blogs yet'}
          </h3>
          <p class="text-muted-foreground mb-4">
            {searchQuery 
              ? `No blogs match "${searchQuery}". Try a different search term.`
              : 'Get started by creating your first blog post.'
            }
          </p>
          {#if !searchQuery}
            <Button onclick={() => createDialogOpen = true} class="gap-2">
              <Plus class="h-4 w-4" />
              Create First Blog
            </Button>
          {/if}
        </div>
      </CardContent>
    </Card>
  {:else}
    <!-- Blog Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each filteredBlogs as blog}
        <Card class="interactive-card">
          <CardHeader>
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <CardTitle class="text-lg line-clamp-2">{blog.title}</CardTitle>
                <CardDescription class="flex items-center gap-2 mt-2">
                  <User class="h-3 w-3" />
                  {blog.author}
                </CardDescription>
              </div>
              <Badge variant="secondary" class="ml-2">
                <Calendar class="h-3 w-3 mr-1" />
                {formatDate(blog.date)}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p class="text-sm text-muted-foreground line-clamp-3 mb-4">
              {blog.excerpt}
            </p>
            
            <div class="flex items-center justify-between">
              <div class="text-xs text-muted-foreground">
                ID: {blog.id.slice(0, 8)}...
              </div>
              <div class="flex gap-2">
                <Button size="sm" variant="outline" disabled>
                  <Edit class="h-3 w-3" />
                </Button>
                <Button size="sm" variant="outline" disabled>
                  <Trash2 class="h-3 w-3" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      {/each}
    </div>
    
    <!-- Results Summary -->
    {#if searchQuery}
      <div class="text-center text-sm text-muted-foreground">
        Showing {filteredBlogs.length} of {blogs.length} blogs
      </div>
    {/if}
  {/if}
</div>
