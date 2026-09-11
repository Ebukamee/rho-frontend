<script setup lang="ts">
import { ref } from 'vue'

// Active Code Tab State: 'ts', 'go', or 'sql'
const activeTab = ref<'ts' | 'go' | 'sql'>('ts')

// CLI Copy Command States
const showCliToast = ref(false)
const cliIcon = ref('content_copy')

// Docker Copy Command States
const showDockerToast = ref(false)
const dockerCopyText = ref('Copy')
const dockerIcon = ref('content_copy')

// Copy CLI command to clipboard
const copyHeroCommand = async () => {
  const cmd = "git clone https://github.com/Ebukamee/Rho.git && cd Rho"
  try {
    await navigator.clipboard.writeText(cmd)
    cliIcon.value = 'check'
    showCliToast.value = true
    setTimeout(() => {
      cliIcon.value = 'content_copy'
      showCliToast.value = false
    }, 2200)
  } catch (err) {
    console.error('Failed to copy: ', err)
  }
}

// Copy Docker command to clipboard
const copyDockerCommand = async () => {
  const cmd = "docker compose up --build"
  try {
    await navigator.clipboard.writeText(cmd)
    dockerIcon.value = 'check'
    dockerCopyText.value = 'Copied!'
    showDockerToast.value = true
    setTimeout(() => {
      dockerIcon.value = 'content_copy'
      dockerCopyText.value = 'Copy'
      showDockerToast.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy: ', err)
  }
}
</script>

<template>
  <main class="w-full pt-14 bg-surface">
    <!-- Spotlight & Grid spans full width edge-to-edge -->
    <div class="relative w-full overflow-hidden border-b border-surface-container-high/50">
      <!-- SVG Architectural Grid Background -->
      <div class="absolute inset-0 pointer-events-none opacity-20 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]">
        <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern height="48" id="arch-grid" patternUnits="userSpaceOnUse" width="48">
              <path class="text-outline-variant" d="M 48 0 L 0 0 0 48" fill="none" stroke="currentColor" stroke-width="0.5"></path>
              <circle class="fill-outline" cx="48" cy="48" r="1.5"></circle>
            </pattern>
          </defs>
          <rect fill="url(#arch-grid)" height="100%" width="100%"></rect>
        </svg>
      </div>
      <!-- Radiant Angular Light Beams -->
      <div class="absolute -top-40 left-1/2 -translate-x-1/2 w-[840px] h-[520px] bg-gradient-to-tr from-primary/10 via-primary-container/20 to-transparent blur-[110px] pointer-events-none rounded-full"></div>
      <div class="absolute -top-10 left-1/2 -translate-x-1/2 w-[380px] h-[220px] bg-tertiary/15 blur-[80px] pointer-events-none rounded-full"></div>

      <!-- Centered Content wrapper for the Hero -->
      <div class="max-w-7xl mx-auto px-space-base lg:px-space-xl relative z-10">
        <!-- 1. HERO SECTION -->
        <section class="relative pt-space-2xl pb-space-3xl flex flex-col items-center text-center">
          <!-- Monumental Headline with Spotlight Highlight Box -->
          <div class="max-w-4xl mx-auto px-space-base">
            <h1 class="font-headline-lg text-display-hero lg:text-[68px] lg:leading-[74px] tracking-tight text-on-surface font-normal">
              Commerce infrastructure you
              <span class="relative inline-block px-space-md py-space-2xs mx-space-xs mt-space-xs rounded-xl bg-surface-container/70 shadow-[0_0_45px_-8px_rgba(16,185,129,0.35)] backdrop-blur-md">
                <span class="relative z-10 bg-gradient-to-r from-on-surface via-primary-fixed to-primary bg-clip-text text-transparent font-medium">
                  keep the keys to.
                </span>
              </span>
            </h1>
            <p class="mt-space-lg text-body-lg font-body-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
              Rho is a self-hosted, API-first commerce backend written in Go, backed by PostgreSQL. Auth, catalog, cart, checkout, payments, inventory, discounts, addresses, shipping, and notifications — one API, your own database, no platform fees.
            </p>
          </div>

          <!-- Action Buttons: Dual CTAs -->
            <div class="mt-space-2xl flex flex-col sm:flex-row items-center justify-center gap-space-base w-full max-w-xl px-space-base">
            <RouterLink class="w-full sm:w-auto h-12 inline-flex items-center justify-center gap-space-sm px-space-xl rounded-full bg-primary-container text-on-primary font-label-ui text-label-ui font-semibold shadow-lg hover:bg-primary transition-all duration-150" to="/docs/getting-started">
              <span>Get Started Free</span>
              <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
            </RouterLink>
            <!-- Interactive CLI command pill with instant copy -->
            <div class="w-full sm:w-auto h-12 flex items-center justify-between gap-space-md px-space-lg rounded-full bg-surface-container-lowest shadow-md hover:bg-surface-container-low transition-colors group cursor-pointer" id="cli-box" @click="copyHeroCommand">
              <div class="flex items-center gap-space-sm font-label-code text-label-code text-on-surface-variant overflow-x-auto select-all">
                <span class="text-primary select-none">$</span>
                <span class="text-on-surface tracking-tight font-medium" id="cli-cmd-text">git clone https://github.com/Ebukamee/Rho.git</span>
              </div>
              <button aria-label="Copy Command" class="flex items-center justify-center text-on-surface-variant group-hover:text-primary transition-colors" type="button">
                <span class="material-symbols-outlined text-[18px]" id="cli-copy-icon">{{ cliIcon }}</span>
              </button>
            </div>
          </div>

          <!-- Live Notification Toast for Copy Action -->
          <div class="transition-opacity duration-200 mt-space-sm font-label-code text-label-code text-primary flex items-center gap-space-xs" :class="showCliToast ? 'opacity-100' : 'opacity-0'">
            <span class="material-symbols-outlined text-[14px]">check_circle</span>
            <span>Copied clone command to clipboard</span>
          </div>

          <!-- Engineering Facts Strip -->
          <div class="mt-space-2xl grid grid-cols-2 md:grid-cols-4 gap-space-md max-w-4xl mx-auto w-full px-space-base pt-space-lg">
            <div class="flex flex-col items-center p-space-md rounded-lg bg-surface-container-lowest/60 backdrop-blur-sm">
              <span class="font-headline-md text-headline-md text-primary font-semibold">17</span>
              <span class="font-label-code text-label-code text-on-surface-variant mt-space-2xs uppercase tracking-wider">Domain Modules</span>
            </div>
            <div class="flex flex-col items-center p-space-md rounded-lg bg-surface-container-lowest/60 backdrop-blur-sm">
              <span class="font-headline-md text-headline-md text-on-surface font-semibold">PostgreSQL</span>
              <span class="font-label-code text-label-code text-on-surface-variant mt-space-2xs uppercase tracking-wider">via pgx, no ORM</span>
            </div>
            <div class="flex flex-col items-center p-space-md rounded-lg bg-surface-container-lowest/60 backdrop-blur-sm">
              <span class="font-headline-md text-headline-md text-primary font-semibold">0%</span>
              <span class="font-label-code text-label-code text-on-surface-variant mt-space-2xs uppercase tracking-wider">Platform Fees</span>
            </div>
            <div class="flex flex-col items-center p-space-md rounded-lg bg-surface-container-lowest/60 backdrop-blur-sm">
              <span class="font-headline-md text-headline-md text-on-surface font-semibold">15m / 7d</span>
              <span class="font-label-code text-label-code text-on-surface-variant mt-space-2xs uppercase tracking-wider">Access / Refresh Tokens</span>
            </div>
          </div>
        </section>
      </div>
    </div>

    <!-- Centered Content wrapper for the remaining sections -->
    <div class="max-w-7xl mx-auto px-space-base lg:px-space-xl">
      <div class="flex flex-col w-full">
        <!-- 2. CHECKOUT CODE PREVIEW -->
        <section class="py-space-2xl w-full">
          <div class="rounded-xl bg-surface-container-low shadow-xl p-space-lg md:p-space-xl">
            <!-- Section Header -->
            <div class="flex flex-col md:flex-row md:items-end justify-between mb-space-xl gap-space-md">
              <div>
                <span class="font-label-code text-label-code text-primary uppercase tracking-wider">Typed Client, Explicit Backend</span>
                <h2 class="font-headline-lg text-headline-lg text-on-surface mt-space-xs">One transaction. No surprises.</h2>
              </div>
            </div>
            <!-- Split Layout: Code Workbench + Checkout Guarantees Card -->
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
              <!-- Code Workbench (7 cols) -->
              <div class="lg:col-span-7 flex flex-col rounded-lg bg-surface-container-lowest overflow-hidden shadow-inner">
                <!-- Code Block Header Strip -->
                <div class="flex items-center justify-between px-space-base py-space-sm bg-surface-container">
                  <div class="flex items-center gap-space-md">
                    <div class="flex items-center gap-space-xs">
                      <span class="w-2.5 h-2.5 rounded-full bg-error/60"></span>
                      <span class="w-2.5 h-2.5 rounded-full bg-tertiary-container/60"></span>
                      <span class="w-2.5 h-2.5 rounded-full bg-primary/60"></span>
                    </div>
                    <div class="flex items-center gap-space-xs">
                      <button class="font-label-code text-label-code px-space-sm py-space-2xs rounded transition-colors" :class="activeTab === 'ts' ? 'bg-surface-container-lowest text-primary font-semibold' : 'text-on-surface-variant hover:text-on-surface'" @click="activeTab = 'ts'">checkout.ts</button>
                      <button class="font-label-code text-label-code px-space-sm py-space-2xs rounded transition-colors" :class="activeTab === 'go' ? 'bg-surface-container-lowest text-primary font-semibold' : 'text-on-surface-variant hover:text-on-surface'" @click="activeTab = 'go'">checkout.go</button>
                      <button class="font-label-code text-label-code px-space-sm py-space-2xs rounded transition-colors" :class="activeTab === 'sql' ? 'bg-surface-container-lowest text-primary font-semibold' : 'text-on-surface-variant hover:text-on-surface'" @click="activeTab = 'sql'">reserve.sql</button>
                    </div>
                  </div>
                  <span class="font-label-code text-label-code text-on-surface-variant">for illustration</span>
                </div>
                <!-- Code View Area -->
                <div class="p-space-lg overflow-x-auto font-code-block text-code-block leading-relaxed select-all">
                  <div v-if="activeTab === 'ts'" class="space-y-1 text-on-surface">
                    <div><span class="text-tertiary">import</span> { RhoClient } <span class="text-tertiary">from</span> <span class="text-primary-fixed">"@rho-commerce/sdk"</span>;</div>
                    <div><span class="text-tertiary">const</span> rho = <span class="text-tertiary">new</span> <span class="text-primary">RhoClient</span>({ baseURL: process.env.RHO_API_URL, token });</div>
                    <div class="h-2"></div>
                    <div class="text-on-surface-variant">// Recalculates totals from the DB before charging anything</div>
                    <div><span class="text-tertiary">const</span> preview = <span class="text-tertiary">await</span> rho.checkout.<span class="text-primary">preview</span>({ discountCode: <span class="text-primary-fixed">"WELCOME10"</span> });</div>
                    <div>console.<span class="text-primary">log</span>(preview.total);</div>
                    <div class="h-2"></div>
                    <div><span class="text-tertiary">const</span> checkout = <span class="text-tertiary">await</span> rho.checkout.<span class="text-primary">create</span>({ discountCode: <span class="text-primary-fixed">"WELCOME10"</span> });</div>
                    <div><span class="text-tertiary">const</span> orderId = checkout.orderId;</div>
                  </div>
                  <div v-else-if="activeTab === 'go'" class="space-y-1 text-on-surface">
                    <div><span class="text-tertiary">package</span> checkout</div>
                    <div class="h-2"></div>
                    <div><span class="text-tertiary">func</span> (s *<span class="text-primary">Service</span>) <span class="text-primary-fixed">Create</span>(ctx context.Context, userID <span class="text-secondary">string</span>, req <span class="text-secondary">CreateRequest</span>) (*<span class="text-secondary">Order</span>, <span class="text-secondary">error</span>) {</div>
                    <div class="pl-4">tx, err := s.db.<span class="text-primary">Begin</span>(ctx)</div>
                    <div class="pl-4"><span class="text-tertiary">if</span> err != nil { <span class="text-tertiary">return</span> nil, err }</div>
                    <div class="pl-4"><span class="text-tertiary">defer</span> tx.<span class="text-primary">Rollback</span>(ctx)</div>
                    <div class="h-2"></div>
                    <div class="pl-4"><span class="text-on-surface-variant">// read cart, reprice from Postgres, apply discount,</span></div>
                    <div class="pl-4"><span class="text-on-surface-variant">// reserve inventory, create the order + items</span></div>
                    <div class="pl-4">order, err := s.<span class="text-primary">execute</span>(ctx, tx, userID, req)</div>
                    <div class="pl-4"><span class="text-tertiary">if</span> err != nil { <span class="text-tertiary">return</span> nil, err }</div>
                    <div class="h-2"></div>
                    <div class="pl-4"><span class="text-tertiary">return</span> order, tx.<span class="text-primary">Commit</span>(ctx)</div>
                    <div>}</div>
                  </div>
                  <div v-else-if="activeTab === 'sql'" class="space-y-1 text-on-surface">
                    <div><span class="text-tertiary">-- available = quantity - reserved, enforced by check constraints</span></div>
                    <div><span class="text-tertiary">UPDATE</span> inventory</div>
                    <div><span class="text-tertiary">SET</span> reserved = reserved + <span class="text-secondary-fixed">$2</span>,</div>
                    <div class="pl-4">updated_at = now()</div>
                    <div><span class="text-tertiary">WHERE</span> product_id = <span class="text-secondary-fixed">$1</span></div>
                    <div><span class="text-tertiary">AND</span> quantity - reserved &gt;= <span class="text-secondary-fixed">$2</span>;</div>
                    <div class="h-2"></div>
                    <div><span class="text-tertiary">-- no matching row → insufficient stock → transaction rolls back</span></div>
                  </div>
                </div>
              </div>
              <!-- Checkout Guarantees Card (5 cols) -->
              <div class="lg:col-span-5 flex flex-col justify-between p-space-lg rounded-lg bg-surface-container shadow-md">
                <div>
                  <div class="flex items-center justify-between pb-space-sm">
                    <div class="flex items-center gap-space-xs">
                      <span class="w-2 h-2 rounded-full bg-primary"></span>
                      <span class="font-label-code text-label-code text-on-surface font-semibold">Checkout Guarantees</span>
                    </div>
                    <span class="font-label-code text-label-code text-primary bg-primary/10 px-space-xs py-space-2xs rounded">ONE TRANSACTION</span>
                  </div>
                  <div class="mt-space-md space-y-space-sm">
                    <div class="flex items-center justify-between p-space-sm rounded bg-surface-container-lowest">
                      <span class="font-body-sm text-body-sm text-on-surface-variant">Pricing source</span>
                      <span class="font-label-code text-label-code text-primary font-bold">Server, not client</span>
                    </div>
                    <div class="flex items-center justify-between p-space-sm rounded bg-surface-container-lowest">
                      <span class="font-body-sm text-body-sm text-on-surface-variant">Currency per order</span>
                      <span class="font-label-code text-label-code text-on-surface">Single, enforced</span>
                    </div>
                    <div class="flex items-center justify-between p-space-sm rounded bg-surface-container-lowest">
                      <span class="font-body-sm text-body-sm text-on-surface-variant">Partial failure</span>
                      <span class="font-label-code text-label-code text-primary font-bold">Impossible — full rollback</span>
                    </div>
                  </div>
                  <!-- Checkout transaction sequence -->
                  <div class="mt-space-lg">
                    <span class="font-label-code text-label-code text-on-surface-variant uppercase tracking-wider block mb-space-xs">Checkout Transaction Sequence</span>
                    <div class="space-y-space-xs">
                      <div class="flex items-center justify-between text-body-sm p-space-xs rounded bg-surface-container-low">
                        <span class="flex items-center gap-space-xs font-label-code text-label-code text-on-surface">
                          <span class="material-symbols-outlined text-[14px] text-primary">check_circle</span>
                          Load cart, reprice from Postgres
                        </span>
                      </div>
                      <div class="flex items-center justify-between text-body-sm p-space-xs rounded bg-surface-container-low">
                        <span class="flex items-center gap-space-xs font-label-code text-label-code text-on-surface">
                          <span class="material-symbols-outlined text-[14px] text-primary">check_circle</span>
                          Apply discount, reserve inventory
                        </span>
                      </div>
                      <div class="flex items-center justify-between text-body-sm p-space-xs rounded bg-surface-container-low">
                        <span class="flex items-center gap-space-xs font-label-code text-label-code text-on-surface">
                          <span class="material-symbols-outlined text-[14px] text-primary">check_circle</span>
                          Create order, clear cart, commit
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="mt-space-lg pt-space-sm flex items-center justify-between">
                  <span class="font-label-code text-label-code text-on-surface-variant">Order creation is checkout-only</span>
                  <RouterLink class="font-label-code text-label-code text-primary hover:underline flex items-center gap-space-2xs" to="/docs/cart-checkout">
                    <span>Read the full sequence</span>
                    <span class="material-symbols-outlined text-[12px]">open_in_new</span>
                  </RouterLink>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 3. CORE VALUE PILLARS -->
        <section class="py-space-2xl w-full">
          <div class="text-center max-w-2xl mx-auto mb-space-2xl">
            <span class="font-label-code text-label-code text-primary uppercase tracking-wider">Deliberately Simple Architecture</span>
            <h2 class="font-headline-lg text-headline-lg text-on-surface mt-space-xs">Built for teams who want to own their commerce backend.</h2>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
            <!-- Pillar 1 -->
            <div class="p-space-xl rounded-xl bg-surface-container-low shadow-md hover:bg-surface-container transition-all flex flex-col justify-between group">
              <div>
                <div class="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center mb-space-lg group-hover:scale-110 transition-transform">
                  <span class="material-symbols-outlined text-primary text-[24px]">percent</span>
                </div>
                <h3 class="font-headline-sm text-headline-sm text-on-surface mb-space-sm">No platform fees</h3>
                <p class="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  Rho isn't a hosted service — it's software you run. You deploy the API and PostgreSQL yourself, on your own infrastructure, with no usage-based billing built into the product.
                </p>
              </div>
              <div class="mt-space-xl pt-space-sm font-label-code text-label-code text-primary flex items-center gap-space-xs">
                <span>You own the deployment</span>
              </div>
            </div>
            <!-- Pillar 2 -->
            <div class="p-space-xl rounded-xl bg-surface-container-low shadow-md hover:bg-surface-container transition-all flex flex-col justify-between group">
              <div>
                <div class="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center mb-space-lg group-hover:scale-110 transition-transform">
                  <span class="material-symbols-outlined text-primary text-[24px]">layers</span>
                </div>
                <h3 class="font-headline-sm text-headline-sm text-on-surface mb-space-sm">One Go binary, one database</h3>
                <p class="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  No message queue, no cache layer, no separate app server required. The Dockerfile is a multi-stage build that compiles the API and runs it in a minimal Alpine image under a non-root user.
                </p>
              </div>
              <div class="mt-space-xl pt-space-sm font-label-code text-label-code text-primary flex items-center gap-space-xs">
                <span>docker compose up --build</span>
              </div>
            </div>
            <!-- Pillar 3 -->
            <div class="p-space-xl rounded-xl bg-surface-container-low shadow-md hover:bg-surface-container transition-all flex flex-col justify-between group">
              <div>
                <div class="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center mb-space-lg group-hover:scale-110 transition-transform">
                  <span class="material-symbols-outlined text-primary text-[24px]">lock</span>
                </div>
                <h3 class="font-headline-sm text-headline-sm text-on-surface mb-space-sm">Inventory that can't oversell</h3>
                <p class="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  Available stock is <code class="font-code-inline text-code-inline text-primary-fixed bg-surface-container px-1 py-0.5 rounded">quantity − reserved</code>, and reservation happens inside the checkout transaction — not when a cart is built. Two customers can't both buy the last unit.
                </p>
              </div>
              <div class="mt-space-xl pt-space-sm font-label-code text-label-code text-primary flex items-center gap-space-xs">
                <span>Enforced by DB constraints</span>
              </div>
            </div>
          </div>
        </section>

        <!-- 4. MODULAR ENGINE ANATOMY (Interactive Module Grid) -->
        <section class="py-space-2xl w-full">
          <div class="flex flex-col md:flex-row items-start md:items-end justify-between mb-space-xl">
            <div>
              <span class="font-label-code text-label-code text-primary uppercase tracking-wider">Module Anatomy</span>
              <h2 class="font-headline-lg text-headline-lg text-on-surface mt-space-xs">One package per commerce domain.</h2>
            </div>
            <span class="font-body-sm text-body-sm text-on-surface-variant mt-space-sm md:mt-0">17 internal packages, each with its own repository, service, and handler.</span>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-md">
            <!-- Module 1: Catalog -->
            <div class="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-lg transition-all flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between mb-space-md">
                  <span class="font-label-code text-label-code px-space-xs py-space-2xs rounded bg-surface-container text-tertiary">GET /api/v1/storefront/products</span>
                  <span class="font-label-code text-label-code text-on-surface-variant">internal/product</span>
                </div>
                <h4 class="font-headline-sm text-headline-sm text-on-surface mb-space-xs">Catalog</h4>
                <p class="font-body-sm text-body-sm text-on-surface-variant">Public, read-only storefront endpoints sit in front of authenticated admin CRUD — customer-facing browsing evolves independently of catalog management.</p>
              </div>
              <div class="mt-space-md pt-space-sm flex items-center justify-between text-on-surface-variant font-label-code text-label-code">
                <span>Public reads</span>
              </div>
            </div>
            <!-- Module 2: Cart -->
            <div class="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-lg transition-all flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between mb-space-md">
                  <span class="font-label-code text-label-code px-space-xs py-space-2xs rounded bg-surface-container text-primary">POST /api/v1/cart/items</span>
                  <span class="font-label-code text-label-code text-on-surface-variant">internal/cart</span>
                </div>
                <h4 class="font-headline-sm text-headline-sm text-on-surface mb-space-xs">Cart</h4>
                <p class="font-body-sm text-body-sm text-on-surface-variant">One cart per authenticated user, one row per product. There's no cart ID to guess — every route is scoped to the caller.</p>
              </div>
              <div class="mt-space-md pt-space-sm flex items-center justify-between text-on-surface-variant font-label-code text-label-code">
                <span>Owner-scoped</span>
              </div>
            </div>
            <!-- Module 3: Checkout -->
            <div class="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-lg transition-all flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between mb-space-md">
                  <span class="font-label-code text-label-code px-space-xs py-space-2xs rounded bg-surface-container text-secondary">POST /api/v1/checkout</span>
                  <span class="font-label-code text-label-code text-on-surface-variant">internal/checkout</span>
                </div>
                <h4 class="font-headline-sm text-headline-sm text-on-surface mb-space-xs">Checkout</h4>
                <p class="font-body-sm text-body-sm text-on-surface-variant">Reprices from the database, applies discounts, reserves inventory, and creates the order — all inside one transaction. Direct order creation is admin-only.</p>
              </div>
              <div class="mt-space-md pt-space-sm flex items-center justify-between text-on-surface-variant font-label-code text-label-code">
                <span>Single DB transaction</span>
              </div>
            </div>
            <!-- Module 4: Payments -->
            <div class="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-lg transition-all flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between mb-space-md">
                  <span class="font-label-code text-label-code px-space-xs py-space-2xs rounded bg-surface-container text-tertiary">POST /api/v1/payments/initialize</span>
                  <span class="font-label-code text-label-code text-on-surface-variant">internal/payment</span>
                </div>
                <h4 class="font-headline-sm text-headline-sm text-on-surface mb-space-xs">Payments</h4>
                <p class="font-body-sm text-body-sm text-on-surface-variant">Provider registry behind a provider-independent model — Paystack today. Charged amount and currency always come from the stored order, never the client.</p>
              </div>
              <div class="mt-space-md pt-space-sm flex items-center justify-between text-on-surface-variant font-label-code text-label-code">
                <span>Server-authoritative amount</span>
              </div>
            </div>
            <!-- Module 5: Inventory -->
            <div class="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-lg transition-all flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between mb-space-md">
                  <span class="font-label-code text-label-code px-space-xs py-space-2xs rounded bg-surface-container text-primary">POST /api/v1/inventory/product/:id/adjust</span>
                  <span class="font-label-code text-label-code text-on-surface-variant">internal/inventory</span>
                </div>
                <h4 class="font-headline-sm text-headline-sm text-on-surface mb-space-xs">Inventory</h4>
                <p class="font-body-sm text-body-sm text-on-surface-variant">Quantity and reserved stock are tracked per product, with <code class="font-code-inline text-code-inline text-primary-fixed bg-surface-container px-1 py-0.5 rounded">reserved &lt;= quantity</code> enforced at the database level.</p>
              </div>
              <div class="mt-space-md pt-space-sm flex items-center justify-between text-on-surface-variant font-label-code text-label-code">
                <span>DB-enforced constraints</span>
              </div>
            </div>
            <!-- Module 6: Webhooks -->
            <div class="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-lg transition-all flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between mb-space-md">
                  <span class="font-label-code text-label-code px-space-xs py-space-2xs rounded bg-surface-container text-secondary">POST /api/v1/webhooks/paystack</span>
                  <span class="font-label-code text-label-code text-on-surface-variant">internal/webhook</span>
                </div>
                <h4 class="font-headline-sm text-headline-sm text-on-surface mb-space-xs">Webhooks</h4>
                <p class="font-body-sm text-body-sm text-on-surface-variant">Paystack callbacks are verified with an HMAC-SHA512 signature before anything touches payment or order state — never trusted on payload alone.</p>
              </div>
              <div class="mt-space-md pt-space-sm flex items-center justify-between text-on-surface-variant font-label-code text-label-code">
                <span>Signature-verified</span>
              </div>
            </div>
          </div>
        </section>

        <!-- 5. SECURITY & ARCHITECTURE BOUNDARIES -->
        <section class="py-space-2xl w-full">
          <div class="rounded-xl bg-surface-container p-space-lg md:p-space-2xl shadow-xl">
            <div class="max-w-3xl mb-space-xl">
              <span class="font-label-code text-label-code text-primary uppercase tracking-wider">Enforced, Not Just Documented</span>
              <h2 class="font-headline-lg text-headline-lg text-on-surface mt-space-xs">Boundaries the backend checks on every request.</h2>
              <p class="mt-space-sm text-body-md font-body-md text-on-surface-variant">
                Authentication answers who's asking. Authorization answers whether they're allowed to. Rho enforces both at the route and at the data-access layer.
              </p>
            </div>
            <!-- Security boundary list -->
            <div class="space-y-space-lg">
              <div class="p-space-md rounded-lg bg-surface-container-lowest">
                <div class="flex items-center justify-between font-label-code text-label-code mb-space-xs">
                  <span class="text-on-surface font-semibold flex items-center gap-space-xs">
                    <span class="w-2 h-2 rounded-full bg-primary"></span>
                    Ownership scoping
                  </span>
                </div>
                <p class="font-body-sm text-body-sm text-on-surface-variant">Order, address, cart, and notification reads are scoped to the authenticated user — knowing another user's order ID isn't enough to read it.</p>
              </div>
              <div class="p-space-md rounded-lg bg-surface-container-lowest">
                <div class="flex items-center justify-between font-label-code text-label-code mb-space-xs">
                  <span class="text-on-surface font-semibold flex items-center gap-space-xs">
                    <span class="w-2 h-2 rounded-full bg-primary"></span>
                    Server-authoritative money
                  </span>
                </div>
                <p class="font-body-sm text-body-sm text-on-surface-variant">Payment initialization reads the amount and currency from the stored order. Verification checks the provider's response against those stored values before marking anything paid.</p>
              </div>
              <div class="p-space-md rounded-lg bg-surface-container-lowest">
                <div class="flex items-center justify-between font-label-code text-label-code mb-space-xs">
                  <span class="text-on-surface font-semibold flex items-center gap-space-xs">
                    <span class="w-2 h-2 rounded-full bg-primary"></span>
                    Role escalation control
                  </span>
                </div>
                <p class="font-body-sm text-body-sm text-on-surface-variant">Only an existing super_admin can promote another user to super_admin — an ordinary admin can't self-escalate.</p>
              </div>
            </div>
            <!-- Fact grid -->
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-space-md mt-space-xl pt-space-lg">
              <div class="p-space-sm rounded bg-surface-container-lowest text-center">
                <span class="font-headline-sm text-headline-sm text-primary font-semibold">17</span>
                <span class="block font-label-code text-label-code text-on-surface-variant mt-space-2xs">Internal packages</span>
              </div>
              <div class="p-space-sm rounded bg-surface-container-lowest text-center">
                <span class="font-headline-sm text-headline-sm text-primary font-semibold">Postgres 17</span>
                <span class="block font-label-code text-label-code text-on-surface-variant mt-space-2xs">via Docker Compose</span>
              </div>
              <div class="p-space-sm rounded bg-surface-container-lowest text-center">
                <span class="font-headline-sm text-headline-sm text-primary font-semibold">15m / 7d</span>
                <span class="block font-label-code text-label-code text-on-surface-variant mt-space-2xs">Access / refresh JWTs</span>
              </div>
              <div class="p-space-sm rounded bg-surface-container-lowest text-center">
                <span class="font-headline-sm text-headline-sm text-primary font-semibold">11</span>
                <span class="block font-label-code text-label-code text-on-surface-variant mt-space-2xs">Checkout transaction steps</span>
              </div>
            </div>
          </div>
        </section>

        <!-- 6. FRAMEWORK COMPATIBILITY -->
        <section class="py-space-2xl w-full">
          <div class="flex flex-col md:flex-row md:items-end justify-between mb-space-xl">
            <div>
              <span class="font-label-code text-label-code text-primary uppercase tracking-wider">Frontend-Agnostic</span>
              <h2 class="font-headline-lg text-headline-lg text-on-surface mt-space-xs">Bring your own framework.</h2>
            </div>
            <RouterLink class="font-label-ui text-label-ui text-primary hover:underline flex items-center gap-space-2xs mt-space-sm md:mt-0" to="/docs/sdk">
              <span>Read the SDK docs</span>
              <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
            </RouterLink>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
            <!-- React -->
            <RouterLink class="p-space-lg rounded-xl bg-surface-container-low hover:bg-surface-container transition-all group flex flex-col justify-between shadow-sm" to="/docs/sdk">
              <div>
                <div class="flex items-center justify-between mb-space-md">
                  <span class="font-headline-sm text-headline-sm text-on-surface font-semibold">React</span>
                  <span class="font-label-code text-label-code px-space-xs py-space-2xs rounded bg-surface-container-highest text-primary">SDK</span>
                </div>
                <p class="font-body-sm text-body-sm text-on-surface-variant">Call the typed client from any React app — no required routing or build convention.</p>
              </div>
              <div class="mt-space-lg flex items-center justify-between text-on-surface font-label-code text-label-code group-hover:text-primary transition-colors">
                <span>npm install @rho-commerce/sdk</span>
                <span class="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </div>
            </RouterLink>
            <!-- Vue -->
            <RouterLink class="p-space-lg rounded-xl bg-surface-container-low hover:bg-surface-container transition-all group flex flex-col justify-between shadow-sm" to="/docs/sdk">
              <div>
                <div class="flex items-center justify-between mb-space-md">
                  <span class="font-headline-sm text-headline-sm text-on-surface font-semibold">Vue</span>
                  <span class="font-label-code text-label-code px-space-xs py-space-2xs rounded bg-surface-container-highest text-tertiary">SDK</span>
                </div>
                <p class="font-body-sm text-body-sm text-on-surface-variant">The client is plain TypeScript — drop it into any Vue composable or store.</p>
              </div>
              <div class="mt-space-lg flex items-center justify-between text-on-surface font-label-code text-label-code group-hover:text-primary transition-colors">
                <span>npm install @rho-commerce/sdk</span>
                <span class="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </div>
            </RouterLink>
            <!-- Nuxt / Next.js -->
            <RouterLink class="p-space-lg rounded-xl bg-surface-container-low hover:bg-surface-container transition-all group flex flex-col justify-between shadow-sm" to="/docs/sdk">
              <div>
                <div class="flex items-center justify-between mb-space-md">
                  <span class="font-headline-sm text-headline-sm text-on-surface font-semibold">Nuxt / Next.js</span>
                  <span class="font-label-code text-label-code px-space-xs py-space-2xs rounded bg-surface-container-highest text-secondary">SDK</span>
                </div>
                <p class="font-body-sm text-body-sm text-on-surface-variant">Works from server or client code — the SDK doesn't assume a runtime.</p>
              </div>
              <div class="mt-space-lg flex items-center justify-between text-on-surface font-label-code text-label-code group-hover:text-primary transition-colors">
                <span>npm install @rho-commerce/sdk</span>
                <span class="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </div>
            </RouterLink>
            <!-- Svelte / Mobile -->
            <RouterLink class="p-space-lg rounded-xl bg-surface-container-low hover:bg-surface-container transition-all group flex flex-col justify-between shadow-sm" to="/docs/sdk">
              <div>
                <div class="flex items-center justify-between mb-space-md">
                  <span class="font-headline-sm text-headline-sm text-on-surface font-semibold">Svelte / Mobile</span>
                  <span class="font-label-code text-label-code px-space-xs py-space-2xs rounded bg-surface-container-highest text-primary-fixed">HTTP</span>
                </div>
                <p class="font-body-sm text-body-sm text-on-surface-variant">Or skip the SDK entirely and call the REST API directly — it's the same contract either way.</p>
              </div>
              <div class="mt-space-lg flex items-center justify-between text-on-surface font-label-code text-label-code group-hover:text-primary transition-colors">
                <span>/api/v1</span>
                <span class="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </div>
            </RouterLink>
          </div>
        </section>

        <!-- 7. FINAL CALL TO ACTION BANNER -->
        <section class="relative my-space-3xl rounded-2xl bg-surface-container-low p-space-xl md:p-space-3xl overflow-hidden shadow-2xl" id="quickstart">
          <!-- Ambient glow behind CTA -->
          <div class="absolute -right-20 -bottom-20 w-96 h-96 bg-primary-container/20 rounded-full blur-3xl pointer-events-none"></div>
          <div class="relative z-10 max-w-2xl">
            <span class="font-label-code text-label-code text-primary uppercase tracking-wider">Runs Anywhere Go and Postgres Do</span>
            <h2 class="font-headline-lg text-headline-lg text-on-surface mt-space-xs">Ready to run your own commerce backend?</h2>
            <p class="mt-space-sm text-body-md font-body-md text-on-surface-variant leading-relaxed">
              Rho runs on any Docker host or Linux VM with PostgreSQL. Clone it, configure your environment variables, and it's up.
            </p>
            <!-- Terminal Command Copy -->
            <div class="mt-space-xl p-space-md rounded-lg bg-surface-container-lowest flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-space-md shadow-inner">
              <div class="font-label-code text-label-code text-on-surface select-all overflow-x-auto py-space-2xs">
                <span class="text-primary mr-2">$</span>
                <span>docker compose up --build</span>
              </div>
              <button class="shrink-0 inline-flex items-center justify-center gap-space-xs px-space-md py-space-xs rounded bg-surface-container hover:bg-surface-container-high text-on-surface font-label-ui text-label-ui transition-colors" @click="copyDockerCommand">
                <span class="material-symbols-outlined text-[16px]" id="docker-copy-icon">{{ dockerIcon }}</span>
                <span id="docker-copy-text">{{ dockerCopyText }}</span>
              </button>
            </div>
            <div class="mt-space-lg flex flex-wrap items-center gap-space-lg">
              <RouterLink class="inline-flex items-center gap-space-xs px-space-xl py-space-md rounded-full bg-primary-container text-on-primary font-label-ui text-label-ui font-semibold hover:bg-primary transition-all" to="/docs/getting-started">
                <span>Read Complete Documentation</span>
                <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
              </RouterLink>
              <a class="inline-flex items-center gap-space-xs text-on-surface hover:text-primary font-label-ui text-label-ui transition-colors" href="https://github.com/Ebukamee/Rho" rel="noreferrer" target="_blank">
                <span class="material-symbols-outlined text-[18px]">terminal</span>
                <span>Inspect Source on GitHub</span>
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>

    <!-- Footer segment (nav unchanged) -->
    <footer class="w-full bg-surface-container-lowest mt-space-3xl py-space-2xl border-t border-surface-container-high">
      <div class="max-w-7xl mx-auto px-space-base lg:px-space-xl">
        <div class="grid grid-cols-2 md:grid-cols-5 gap-space-xl mb-space-2xl">
          <div class="col-span-2 space-y-space-sm">
            <div class="flex items-center gap-space-xs">
              <span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span class="font-label-code text-label-code text-primary">All systems operational</span>
            </div>
            <p class="font-body-sm text-body-sm text-on-surface-variant max-w-sm">Self-hosted, headless e-commerce backend built with Go, PostgreSQL, and a typed API contract.</p>
            <p class="font-label-code text-label-code text-on-surface-variant">© 2025 Rho. See LICENSE in the repository.</p>
          </div>
          <div class="flex flex-col gap-space-sm">
            <span class="font-label-ui text-label-ui text-on-surface font-semibold uppercase tracking-wider">Platform</span>
            <RouterLink class="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors" to="/docs/architecture">Architecture</RouterLink>
            <RouterLink class="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors" to="/docs/storefront">Modules</RouterLink>
            <RouterLink class="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors" to="/docs/sdk">Client SDKs</RouterLink>
            <RouterLink class="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors" to="/docs/getting-started">Deploy to Cloud</RouterLink>
          </div>
          <div class="flex flex-col gap-space-sm">
            <span class="font-label-ui text-label-ui text-on-surface font-semibold uppercase tracking-wider">Resources</span>
            <RouterLink class="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors" to="/docs/getting-started">Documentation</RouterLink>
            <RouterLink class="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors" to="/docs/getting-started">Changelog</RouterLink>
            <RouterLink class="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors" to="/docs/deployment">Self-Hosted Licensing</RouterLink>
            <RouterLink class="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors" to="/docs/getting-started">Cloud Console</RouterLink>
          </div>
          <div class="flex flex-col gap-space-sm">
            <span class="font-label-ui text-label-ui text-on-surface font-semibold uppercase tracking-wider">Community</span>
            <a class="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors" href="https://github.com/Ebukamee/Rho" rel="noreferrer" target="_blank">GitHub</a>
            <a class="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors" href="https://discord.com" rel="noreferrer" target="_blank">Discord</a>
            <RouterLink class="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors" to="/docs/contributing">Contributing</RouterLink>
          </div>
        </div>
      </div>
    </footer>
  </main>
</template>