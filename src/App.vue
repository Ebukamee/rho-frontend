<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

const isLinkActive = (path: string) => {
  return route.path === path
}
</script>

<template>
  <div class="bg-surface-container-lowest text-on-surface font-body-md text-body-md min-h-screen selection:bg-primary-container selection:text-on-primary-container">
    <header v-if="route.path === '/'" class="fixed top-0 left-0 w-full z-50 bg-surface-container-lowest/80 backdrop-blur-xl border-b border-surface-container-high/70">
      <div class="h-header-height max-w-7xl mx-auto px-space-base lg:px-space-xl flex items-center justify-between gap-space-md">
        <RouterLink class="flex items-center gap-space-sm group shrink-0" to="/">
          <img alt="Rho Logo" class="h-8 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1XWLoAM8a2PEkbAg-mDDjEBMZQKzG21WmEh24Etm0tW8_de9k_Q1SVhK9KZp7VdBF-LCJMe-NczY9qHgTbp_HUcANBD9ui2qQa1Nn-C878ersvMkX6hA32NQWC3dvItCzwoxLKx3DhJfcIrAX0lZh0Tt94uM4gUhIIE-Y35qqkK85OPqpptPQJhI2N59mW1_6YWQaXmqbY1c8gF2j4zHul7KDX9xLbL3LtYlW9mL29SgslbiWcnhUr1Qw" />
          <span class="font-headline-sm text-headline-sm font-semibold tracking-tight text-on-surface">Rho</span>
          <span class="font-label-code text-label-code px-space-xs py-space-2xs rounded bg-surface-container text-on-surface-variant">v0.2.0</span>
        </RouterLink>

        <nav class="hidden md:flex items-center gap-space-xs ml-auto">
          <a class="px-space-sm py-space-xs rounded-lg font-label-ui text-label-ui text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors" href="#features">Features</a>
          <a class="px-space-sm py-space-xs rounded-lg font-label-ui text-label-ui text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors" href="#quickstart">Quickstart</a>
          <RouterLink class="px-space-sm py-space-xs rounded-lg font-label-ui text-label-ui text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors" to="/docs/getting-started">Documentation</RouterLink>
          <a class="px-space-sm py-space-xs rounded-lg font-label-ui text-label-ui text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors" href="https://github.com/Ebukamee/Rho" rel="noreferrer" target="_blank">GitHub</a>
        </nav>

        <RouterLink class="inline-flex items-center gap-space-xs px-space-md py-space-xs rounded-lg bg-primary-container hover:bg-primary text-on-primary-container font-label-ui text-label-ui font-semibold transition-colors shrink-0" to="/docs/getting-started">
          <span>Get Started</span>
          <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
        </RouterLink>
      </div>
    </header>

    <header v-else class="fixed top-0 left-0 w-full z-50 bg-surface-container-lowest/90 backdrop-blur-xl border-b border-surface-container-high">
      <div class="h-header-height w-full px-space-base lg:px-space-xl flex items-center justify-between gap-space-md">
        <div class="flex items-center gap-space-lg">
          <RouterLink class="flex items-center gap-space-sm group" to="/">
            <img alt="Rho Logo" class="h-8 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1XWLoAM8a2PEkbAg-mDDjEBMZQKzG21WmEh24Etm0tW8_de9k_Q1SVhK9KZp7VdBF-LCJMe-NczY9qHgTbp_HUcANBD9ui2qQa1Nn-C878ersvMkX6hA32NQWC3dvItCzwoxLKx3DhJfcIrAX0lZh0Tt94uM4gUhIIE-Y35qqkK85OPqpptPQJhI2N59mW1_6YWQaXmqbY1c8gF2j4zHul7KDX9xLbL3LtYlW9mL29SgslbiWcnhUr1Qw" />
            <span class="font-headline-sm text-headline-sm font-semibold tracking-tight text-on-surface">Rho</span>
            <span class="font-label-code text-label-code px-space-xs py-space-2xs rounded bg-surface-container text-on-surface-variant">v0.2.0</span>
          </RouterLink>
          <nav class="hidden xl:flex items-center gap-space-xs">
            <RouterLink class="px-space-sm py-space-xs rounded-lg font-label-ui text-label-ui transition-colors" :class="isLinkActive('/docs/getting-started') ? 'bg-surface-container-high text-primary font-semibold' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'" to="/docs/getting-started">Getting Started</RouterLink>
            <RouterLink class="px-space-sm py-space-xs rounded-lg font-label-ui text-label-ui transition-colors" :class="isLinkActive('/docs/architecture') ? 'bg-surface-container-high text-primary font-semibold' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'" to="/docs/architecture">Architecture</RouterLink>
            <RouterLink class="px-space-sm py-space-xs rounded-lg font-label-ui text-label-ui transition-colors" :class="isLinkActive('/docs/storefront') ? 'bg-surface-container-high text-primary font-semibold' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'" to="/docs/storefront">Core Commerce</RouterLink>
            <RouterLink class="px-space-sm py-space-xs rounded-lg font-label-ui text-label-ui transition-colors" :class="isLinkActive('/docs/payments') ? 'bg-surface-container-high text-primary font-semibold' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'" to="/docs/payments">Payments</RouterLink>
            <RouterLink class="px-space-sm py-space-xs rounded-lg font-label-ui text-label-ui transition-colors" :class="isLinkActive('/docs/api-reference') ? 'bg-surface-container-high text-primary font-semibold' : 'text-on-surface-variant hover:text-surface-container-high'" to="/docs/api-reference">API Reference</RouterLink>
            <RouterLink class="px-space-sm py-space-xs rounded-lg font-label-ui text-label-ui transition-colors" :class="isLinkActive('/docs/sdk') ? 'bg-surface-container-high text-primary font-semibold' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'" to="/docs/sdk">SDK</RouterLink>
          </nav>
        </div>
        <div class="flex-1 max-w-md hidden md:flex items-center justify-center">
          <button class="w-full flex items-center justify-between px-space-md py-space-xs rounded-lg bg-surface-container-low border border-surface-container-high hover:border-outline text-on-surface-variant font-body-sm text-body-sm transition-colors">
            <div class="flex items-center gap-space-sm"><span class="material-symbols-outlined text-[18px] text-on-surface-variant">search</span><span>Search documentation, schema, APIs...</span></div>
            <div class="flex items-center gap-space-2xs"><kbd class="px-space-xs py-space-2xs rounded bg-surface-container-high font-label-code text-label-code text-on-surface-variant border border-surface-variant">Ctrl</kbd><kbd class="px-space-xs py-space-2xs rounded bg-surface-container-high font-label-code text-label-code text-on-surface-variant border border-surface-variant">K</kbd></div>
          </button>
        </div>
        <div class="flex items-center gap-space-sm">
          <a class="hidden sm:flex items-center gap-space-xs px-space-sm py-space-xs rounded-lg bg-surface-container-low border border-surface-container-high hover:bg-surface-container hover:text-on-surface font-label-code text-label-code text-on-surface-variant transition-colors" href="https://github.com/Ebukamee/Rho" rel="noreferrer" target="_blank"><span>Ebukamee/Rho</span><span class="material-symbols-outlined text-[14px] text-on-surface-variant">arrow_outward</span></a>
          <RouterLink class="flex items-center gap-space-xs px-space-md py-space-xs rounded-lg bg-primary-container hover:bg-secondary-container text-on-primary-container font-label-ui text-label-ui font-semibold transition-colors" to="/docs/getting-started"><span>Quickstart</span><span class="material-symbols-outlined text-[16px]">arrow_forward</span></RouterLink>
        </div>
      </div>
    </header>

    <aside v-if="route.path !== '/'" class="fixed left-0 top-header-height bottom-0 w-sidebar-left-width z-40 bg-surface-container-lowest border-r border-surface-container-high overflow-y-auto hidden md:flex flex-col py-space-md px-space-sm">
      <div class="px-space-sm pb-space-xs font-label-code text-label-code uppercase tracking-wider text-outline font-semibold">Start Here</div>
      <nav class="flex flex-col gap-space-2xs mb-space-lg">
        <RouterLink class="px-space-sm py-space-xs rounded-lg font-body-sm text-body-sm transition-colors flex items-center justify-between" :class="isLinkActive('/docs/getting-started') ? 'bg-surface-container-high text-primary font-semibold' : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'" to="/docs/getting-started">Getting Started</RouterLink>
        <RouterLink class="px-space-sm py-space-xs rounded-lg font-body-sm text-body-sm transition-colors flex items-center justify-between" :class="isLinkActive('/docs/architecture') ? 'bg-surface-container-high text-primary font-semibold' : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'" to="/docs/architecture">Architecture</RouterLink>
      </nav>

      <div class="px-space-sm pb-space-xs font-label-code text-label-code uppercase tracking-wider text-outline font-semibold">Core Commerce</div>
      <nav class="flex flex-col gap-space-2xs mb-space-lg">
        <RouterLink class="px-space-sm py-space-xs rounded-lg font-body-sm text-body-sm transition-colors flex items-center justify-between" :class="isLinkActive('/docs/auth') ? 'bg-surface-container-high text-primary font-semibold' : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'" to="/docs/auth">Auth</RouterLink>
        <RouterLink class="px-space-sm py-space-xs rounded-lg font-body-sm text-body-sm transition-colors flex items-center justify-between" :class="isLinkActive('/docs/storefront') ? 'bg-surface-container-high text-primary font-semibold' : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'" to="/docs/storefront">Storefront</RouterLink>
        <RouterLink class="px-space-sm py-space-xs rounded-lg font-body-sm text-body-sm transition-colors flex items-center justify-between" :class="isLinkActive('/docs/cart-checkout') ? 'bg-surface-container-high text-primary font-semibold' : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'" to="/docs/cart-checkout">Cart &amp; Checkout</RouterLink>
        <RouterLink class="px-space-sm py-space-xs rounded-lg font-body-sm text-body-sm transition-colors flex items-center justify-between" :class="isLinkActive('/docs/orders') ? 'bg-surface-container-high text-primary font-semibold' : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'" to="/docs/orders">Orders</RouterLink>
      </nav>

      <div class="px-space-sm pb-space-xs font-label-code text-label-code uppercase tracking-wider text-outline font-semibold">Payments &amp; Fulfillment</div>
      <nav class="flex flex-col gap-space-2xs mb-space-lg">
        <RouterLink class="px-space-sm py-space-xs rounded-lg font-body-sm text-body-sm transition-colors flex items-center justify-between" :class="isLinkActive('/docs/payments') ? 'bg-surface-container-high text-primary font-semibold' : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'" to="/docs/payments">Payments (Paystack)</RouterLink>
        <RouterLink class="px-space-sm py-space-xs rounded-lg font-body-sm text-body-sm transition-colors flex items-center justify-between" :class="isLinkActive('/docs/inventory-discounts') ? 'bg-surface-container-high text-primary font-semibold' : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'" to="/docs/inventory-discounts">Inventory &amp; Discounts</RouterLink>
        <RouterLink class="px-space-sm py-space-xs rounded-lg font-body-sm text-body-sm transition-colors flex items-center justify-between" :class="isLinkActive('/docs/addresses-shipping') ? 'bg-surface-container-high text-primary font-semibold' : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'" to="/docs/addresses-shipping">Addresses &amp; Shipping</RouterLink>
        <RouterLink class="px-space-sm py-space-xs rounded-lg font-body-sm text-body-sm transition-colors flex items-center justify-between" :class="isLinkActive('/docs/notifications') ? 'bg-surface-container-high text-primary font-semibold' : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'" to="/docs/notifications">Notifications</RouterLink>
      </nav>

      <div class="px-space-sm pb-space-xs font-label-code text-label-code uppercase tracking-wider text-outline font-semibold">Reference</div>
      <nav class="flex flex-col gap-space-2xs mb-space-lg">
        <RouterLink class="px-space-sm py-space-xs rounded-lg font-body-sm text-body-sm transition-colors flex items-center justify-between" :class="isLinkActive('/docs/api-reference') ? 'bg-surface-container-high text-primary font-semibold' : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'" to="/docs/api-reference">API Reference</RouterLink>
        <RouterLink class="px-space-sm py-space-xs rounded-lg font-body-sm text-body-sm transition-colors flex items-center justify-between" :class="isLinkActive('/docs/sdk') ? 'bg-surface-container-high text-primary font-semibold' : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'" to="/docs/sdk">SDK</RouterLink>
      </nav>

      <div class="px-space-sm pb-space-xs font-label-code text-label-code uppercase tracking-wider text-outline font-semibold">Operate</div>
      <nav class="flex flex-col gap-space-2xs">
        <RouterLink class="px-space-sm py-space-xs rounded-lg font-body-sm text-body-sm transition-colors flex items-center justify-between" :class="isLinkActive('/docs/deployment') ? 'bg-surface-container-high text-primary font-semibold' : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'" to="/docs/deployment">Deployment</RouterLink>
        <RouterLink class="px-space-sm py-space-xs rounded-lg font-body-sm text-body-sm transition-colors flex items-center justify-between" :class="isLinkActive('/docs/contributing') ? 'bg-surface-container-high text-primary font-semibold' : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'" to="/docs/contributing">Contributing</RouterLink>
      </nav>
    </aside>

    <RouterView />
  </div>
</template>
