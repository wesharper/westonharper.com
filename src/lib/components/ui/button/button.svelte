<script lang="ts" module>
  import type { WithElementRef } from "bits-ui";
  import type {
    HTMLAnchorAttributes,
    HTMLButtonAttributes,
  } from "svelte/elements";
  import { type VariantProps, tv } from "tailwind-variants";

  export const buttonVariants = tv({
    base: "ring-offset-background focus-visible:ring-ring inline-flex cursor-pointer items-center justify-center gap-2 rounded-md whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-medium",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 text-sm font-medium",
        outline:
          "border-input bg-background hover:bg-accent hover:text-accent-foreground border text-sm font-medium",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 text-sm font-medium",
        ghost:
          "text-foreground hover:text-foreground/60 !bg-transparent text-sm font-medium",
        link: "hover:decoration-primary hover:text-primary underline decoration-transparent transition-colors duration-300 ease-out",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
        link: "w-fit",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  });

  export type ButtonVariant = VariantProps<typeof buttonVariants>["variant"];
  export type ButtonSize = VariantProps<typeof buttonVariants>["size"];

  export type ButtonProps = WithElementRef<HTMLButtonAttributes> &
    WithElementRef<HTMLAnchorAttributes> & {
      variant?: ButtonVariant;
      size?: ButtonSize;
    };
</script>

<script lang="ts">
  import { cn } from "$lib/utils/shad.js";

  let {
    class: className,
    variant = "default",
    size: _size = "default",
    ref = $bindable(null),
    href = undefined,
    type = "button",
    children,
    ...restProps
  }: ButtonProps = $props();

  const size = $derived(variant === "link" ? "link" : _size);
</script>

{#if href}
  <a
    bind:this={ref}
    class={cn(buttonVariants({ variant, size }), className)}
    {href}
    {...restProps}
  >
    {@render children?.()}
  </a>
{:else}
  <button
    bind:this={ref}
    class={cn(buttonVariants({ variant, size }), className)}
    {type}
    {...restProps}
  >
    {@render children?.()}
  </button>
{/if}
