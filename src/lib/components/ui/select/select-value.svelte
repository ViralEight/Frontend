<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { type VariantProps, tv } from 'tailwind-variants';
  import type { Snippet } from 'svelte';
  import type { HTMLBitsProps } from '$lib/types';
  import { cn } from '$lib/utils';

  type $Props = HTMLBitsProps<HTMLSpanElement> & {
    placeholder?: string;
    children?: Snippet;
  };

  let {
    class: className,
    placeholder,
    children,
    ...restProps
  }: $Props = $props();
</script>

<span
  class={cn('pointer-events-none', className)}
  {...restProps}
>
  {children ?? placeholder ?? ''}
</span>