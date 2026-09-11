<script setup lang="ts">
import { ref } from 'vue'

// Persona Toggle State: 'dev' or 'agent'
const activePersona = ref<'dev' | 'agent'>('dev')

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
  const cmd = "curl -fsSL https://rho.dev/install | sh"
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
  const cmd = "docker run -p 8080:8080 -e DATABASE_URL=postgres://... rhosystems/rho:latest"
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

// Toggle persona handler
const setPersona = (persona: 'dev' | 'agent') => {
  activePersona.value = persona
  if (persona === 'agent') {
    activeTab.value = 'ts' // reset tab to ts when displaying agent (which shows mcp server ts code)
  }
}
</script>

<template>
  <main class="w-full pt-14 bg-surface">
    <div class="max-w-7xl mx-auto px-space-base lg:px-space-xl">
      <div class="flex flex-col w-full">
        <!-- Top Ambient Spotlight & Blueprint Grid Mesh -->
        <div class="relative w-full overflow-hidden">
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
          <!-- Radiant Angular Light Beam inspired by OutRay -->
          <div class="absolute -top-40 left-1/2 -translate-x-1/2 w-[840px] h-[520px] bg-gradient-to-tr from-primary/10 via-primary-container/20 to-transparent blur-[110px] pointer-events-none rounded-full"></div>
          <div class="absolute -top-10 left-1/2 -translate-x-1/2 w-[380px] h-[220px] bg-tertiary/15 blur-[80px] pointer-events-none rounded-full"></div>

          <!-- 1. HERO SECTION -->
          <section class="relative pt-space-2xl pb-space-3xl flex flex-col items-center text-center">
            <!-- Beta Announcement Pill -->
            <RouterLink class="inline-flex items-center gap-space-sm px-space-md py-space-xs rounded-full bg-surface-container-low hover:bg-surface-container transition-colors shadow-sm mb-space-xl group" to="/docs/getting-started">
              <span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span class="font-label-code text-label-code text-primary font-medium tracking-wide">v0.1.4 Public Beta</span>
              <span class="font-body-sm text-body-sm text-on-surface-variant">Zero platform fees • Own your database</span>
              <span class="font-label-ui text-label-ui text-on-surface group-hover:translate-x-0.5 transition-transform">→</span>
            </RouterLink>
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
                Rho is a self-hosted Go engine and typed TypeScript SDK that gives you full production-grade checkout, inventory row-locks, and multi-currency payments on your own PostgreSQL cluster.
              </p>
            </div>
            <!-- Action Buttons: Next.js / OutRay Style Dual CTAs -->
            <div class="mt-space-2xl flex flex-col sm:flex-row items-center justify-center gap-space-base w-full max-w-xl px-space-base">
              <RouterLink class="w-full sm:w-auto inline-flex items-center justify-center gap-space-sm px-space-xl py-space-md rounded-full bg-primary-container text-on-primary font-label-ui text-label-ui font-semibold shadow-lg hover:bg-primary transition-all duration-150" to="/docs/getting-started">
                <span>Get Started Free</span>
                <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
              </RouterLink>
              <!-- Interactive CLI command pill with instant copy -->
              <div class="w-full sm:w-auto flex items-center justify-between gap-space-md px-space-lg py-space-sm rounded-full bg-surface-container-lowest shadow-md hover:bg-surface-container-low transition-colors group cursor-pointer" id="cli-box" @click="copyHeroCommand">
                <div class="flex items-center gap-space-sm font-label-code text-label-code text-on-surface-variant overflow-x-auto select-all">
                  <span class="text-primary select-none">$</span>
                  <span class="text-on-surface tracking-tight font-medium" id="cli-cmd-text">curl -fsSL https://rho.dev/install | sh</span>
                </div>
                <button aria-label="Copy Command" class="flex items-center justify-center text-on-surface-variant group-hover:text-primary transition-colors" type="button">
                  <span class="material-symbols-outlined text-[18px]" id="cli-copy-icon">{{ cliIcon }}</span>
                </button>
              </div>
            </div>
            <!-- Live Notification Toast for Copy Action -->
            <div class="transition-opacity duration-200 mt-space-sm font-label-code text-label-code text-primary flex items-center gap-space-xs" :class="showCliToast ? 'opacity-100' : 'opacity-0'">
              <span class="material-symbols-outlined text-[14px]">check_circle</span>
              <span>Copied script to clipboard</span>
            </div>
            <!-- Social Proof / Engineering Metrics Strip -->
            <div class="mt-space-2xl grid grid-cols-2 md:grid-cols-4 gap-space-md max-w-4xl mx-auto w-full px-space-base pt-space-lg">
              <div class="flex flex-col items-center p-space-md rounded-lg bg-surface-container-lowest/60 backdrop-blur-sm">
                <span class="font-headline-md text-headline-md text-primary font-semibold">1.4k+</span>
                <span class="font-label-code text-label-code text-on-surface-variant mt-space-2xs uppercase tracking-wider">GitHub Stars</span>
              </div>
              <div class="flex flex-col items-center p-space-md rounded-lg bg-surface-container-lowest/60 backdrop-blur-sm">
                <span class="font-headline-md text-headline-md text-on-surface font-semibold">PostgreSQL</span>
                <span class="font-label-code text-label-code text-on-surface-variant mt-space-2xs uppercase tracking-wider">v14+ Native ACID</span>
              </div>
              <div class="flex flex-col items-center p-space-md rounded-lg bg-surface-container-lowest/60 backdrop-blur-sm">
                <span class="font-headline-md text-headline-md text-primary font-semibold">0%</span>
                <span class="font-label-code text-label-code text-on-surface-variant mt-space-2xs uppercase tracking-wider">GMV Platform Tax</span>
              </div>
              <div class="flex flex-col items-center p-space-md rounded-lg bg-surface-container-lowest/60 backdrop-blur-sm">
                <span class="font-headline-md text-headline-md text-on-surface font-semibold">&lt; 3.8ms</span>
                <span class="font-label-code text-label-code text-on-surface-variant mt-space-2xs uppercase tracking-wider">P99 Checkout Lock</span>
              </div>
            </div>
          </section>
        </div>

        <!-- 2. INTERACTIVE TERMINAL & DETERMINISTIC ENGINE PREVIEW -->
        <section class="py-space-2xl w-full">
          <div class="rounded-xl bg-surface-container-low shadow-xl p-space-lg md:p-space-xl">
            <!-- Section Header -->
            <div class="flex flex-col md:flex-row md:items-end justify-between mb-space-xl gap-space-md">
              <div>
                <span class="font-label-code text-label-code text-primary uppercase tracking-wider">Type-Safe Client &amp; Sovereign Core</span>
                <h2 class="font-headline-lg text-headline-lg text-on-surface mt-space-xs">Simple for agents. Indestructible for humans.</h2>
              </div>
              <!-- Persona Toggle: Developers vs AI Agents -->
              <div class="inline-flex p-space-2xs rounded-lg bg-surface-container-lowest">
                <button class="px-space-md py-space-xs rounded font-label-ui text-label-ui font-medium transition-all" :class="activePersona === 'dev' ? 'bg-surface-container text-on-surface' : 'text-on-surface-variant hover:text-on-surface'" @click="setPersona('dev')">For Developers</button>
                <button class="px-space-md py-space-xs rounded font-label-ui text-label-ui font-medium transition-all" :class="activePersona === 'agent' ? 'bg-surface-container text-on-surface' : 'text-on-surface-variant hover:text-on-surface'" @click="setPersona('agent')">For AI Agents (MCP)</button>
              </div>
            </div>
            <!-- Split Layout: Code Workbench + Live ACID Telemetry Card -->
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
                    <div v-if="activePersona === 'dev'" class="flex items-center gap-space-xs">
                      <button class="font-label-code text-label-code px-space-sm py-space-2xs rounded transition-colors" :class="activeTab === 'ts' ? 'bg-surface-container-lowest text-primary font-semibold' : 'text-on-surface-variant hover:text-on-surface'" @click="activeTab = 'ts'">checkout.ts</button>
                      <button class="font-label-code text-label-code px-space-sm py-space-2xs rounded transition-colors" :class="activeTab === 'go' ? 'bg-surface-container-lowest text-primary font-semibold' : 'text-on-surface-variant hover:text-on-surface'" @click="activeTab = 'go'">handler.go</button>
                      <button class="font-label-code text-label-code px-space-sm py-space-2xs rounded transition-colors" :class="activeTab === 'sql' ? 'bg-surface-container-lowest text-primary font-semibold' : 'text-on-surface-variant hover:text-on-surface'" @click="activeTab = 'sql'">lock.sql</button>
                    </div>
                    <div v-else class="flex items-center gap-space-xs">
                      <button class="font-label-code text-label-code px-space-sm py-space-2xs rounded bg-surface-container-lowest text-primary font-semibold">mcp-server.ts</button>
                    </div>
                  </div>
                  <span class="font-label-code text-label-code text-on-surface-variant">TypeScript 5.6</span>
                </div>
                <!-- Code View Area -->
                <div class="p-space-lg overflow-x-auto font-code-block text-code-block leading-relaxed select-all">
                  <div v-if="activePersona === 'agent'" class="space-y-1 text-on-surface">
                    <div><span class="text-tertiary">import</span> { RhoMcpServer } <span class="text-tertiary">from</span> <span class="text-primary-fixed">"@rho-commerce/mcp"</span>;</div>
                    <div><span class="text-on-surface-variant">// Expose structured commerce tools to Claude Desktop / Cursor AI</span></div>
                    <div><span class="text-tertiary">const</span> mcp = <span class="text-tertiary">new</span> <span class="text-primary">RhoMcpServer</span>({</div>
                    <div class="pl-4">tools: [<span class="text-primary-fixed">"reserve_inventory"</span>, <span class="text-primary-fixed">"create_checkout"</span>, <span class="text-primary-fixed">"refund_order"</span>],</div>
                    <div class="pl-4">policy: { maxTransactionUsd: <span class="text-secondary-fixed">5000</span> }</div>
                    <div>});</div>
                    <div class="h-2"></div>
                    <div><span class="text-tertiary">await</span> mcp.<span class="text-primary">startStdioTransport</span>();</div>
                  </div>
                  <div v-else>
                    <div v-if="activeTab === 'ts'" class="space-y-1 text-on-surface">
                      <div><span class="text-tertiary">import</span> { RhoClient } <span class="text-tertiary">from</span> <span class="text-primary-fixed">"@rho-commerce/sdk"</span>;</div>
                      <div><span class="text-tertiary">const</span> rho = <span class="text-tertiary">new</span> <span class="text-primary">RhoClient</span>({ sovereignUrl: process.env.RHO_URL });</div>
                      <div class="h-2"></div>
                      <div class="text-on-surface-variant">// 1. Atomic checkout transaction guaranteed by PG row locks</div>
                      <div><span class="text-tertiary">export async function</span> <span class="text-primary-fixed">completeOrder</span>(cartId: <span class="text-secondary">string</span>) {</div>
                      <div class="pl-4"><span class="text-tertiary">const</span> tx = <span class="text-tertiary">await</span> rho.transactions.<span class="text-primary">lockAndExecute</span>({</div>
                      <div class="pl-8">cartId,</div>
                      <div class="pl-8">reservationTtlSec: <span class="text-secondary-fixed">120</span>,</div>
                      <div class="pl-8">idempotencyKey: crypto.<span class="text-primary">randomUUID</span>(),</div>
                      <div class="pl-4">});</div>
                      <div class="h-2"></div>
                      <div class="pl-4"><span class="text-tertiary">return</span> tx.<span class="text-primary">dispatchPayment</span>({ provider: <span class="text-primary-fixed">"stripe_direct"</span> });</div>
                      <div>}</div>
                    </div>
                    <div v-else-if="activeTab === 'go'" class="space-y-1 text-on-surface">
                      <div><span class="text-tertiary">package</span> checkout</div>
                      <div class="h-2"></div>
                      <div><span class="text-tertiary">func</span> (s *<span class="text-primary">Service</span>) <span class="text-primary-fixed">ExecuteAtomicCheckout</span>(ctx context.Context, req <span class="text-secondary">OrderPayload</span>) (*<span class="text-secondary">Order</span>, <span class="text-secondary">error</span>) {</div>
                      <div class="pl-4">tx, err := s.db.<span class="text-primary">BeginTx</span>(ctx, &sql.TxOptions{Isolation: sql.LevelRepeatableRead})</div>
                      <div class="pl-4"><span class="text-tertiary">if</span> err != nil { <span class="text-tertiary">return</span> nil, err }</div>
                      <div class="pl-4"><span class="text-tertiary">defer</span> tx.<span class="text-primary">Rollback</span>()</div>
                      <div class="h-2"></div>
                      <div class="pl-4"><span class="text-on-surface-variant">// Lock all catalog lines atomically</span></div>
                      <div class="pl-4"><span class="text-tertiary">if</span> err := s.inventory.<span class="text-primary">LockLines</span>(ctx, tx, req.Items); err != nil {</div>
                      <div class="pl-8"><span class="text-tertiary">return</span> nil, ErrInsufficientStock</div>
                      <div class="pl-4">}</div>
                      <div class="pl-4"><span class="text-tertiary">return</span> s.<span class="text-primary">commitAndDispatch</span>(ctx, tx, req)</div>
                      <div>}</div>
                    </div>
                    <div v-else-if="activeTab === 'sql'" class="space-y-1 text-on-surface">
                      <div><span class="text-tertiary">-- Native Postgres Row-Lock Exclusivity</span></div>
                      <div><span class="text-tertiary">SELECT</span> item_id, available_stock</div>
                      <div><span class="text-tertiary">FROM</span> rho_inventory_units</div>
                      <div><span class="text-tertiary">WHERE</span> sku = <span class="text-primary-fixed">'RHO-CORE-BLACK'</span></div>
                      <div><span class="text-tertiary">FOR UPDATE NOWAIT</span>;</div>
                      <div class="h-2"></div>
                      <div><span class="text-tertiary">UPDATE</span> rho_inventory_units</div>
                      <div><span class="text-tertiary">SET</span> available_stock = available_stock - <span class="text-secondary-fixed">1</span>,</div>
                      <div class="pl-4">reserved_stock = reserved_stock + <span class="text-secondary-fixed">1</span>,</div>
                      <div class="pl-4">updated_at = NOW()</div>
                      <div><span class="text-tertiary">WHERE</span> sku = <span class="text-primary-fixed">'RHO-CORE-BLACK'</span></div>
                      <div><span class="text-tertiary">AND</span> available_stock &gt;= <span class="text-secondary-fixed">1</span>;</div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- ACID Telemetry Live Monitor Card (5 cols) -->
              <div class="lg:col-span-5 flex flex-col justify-between p-space-lg rounded-lg bg-surface-container shadow-md">
                <div>
                  <div class="flex items-center justify-between pb-space-sm">
                    <div class="flex items-center gap-space-xs">
                      <span class="w-2 h-2 rounded-full bg-primary animate-ping"></span>
                      <span class="font-label-code text-label-code text-on-surface font-semibold">Postgres ACID Telemetry</span>
                    </div>
                    <span class="font-label-code text-label-code text-primary bg-primary/10 px-space-xs py-space-2xs rounded">HEALTHY</span>
                  </div>
                  <div class="mt-space-md space-y-space-sm">
                    <div class="flex items-center justify-between p-space-sm rounded bg-surface-container-lowest">
                      <span class="font-body-sm text-body-sm text-on-surface-variant">Lock Execution Time</span>
                      <span class="font-label-code text-label-code text-primary font-bold">1.24 ms</span>
                    </div>
                    <div class="flex items-center justify-between p-space-sm rounded bg-surface-container-lowest">
                      <span class="font-body-sm text-body-sm text-on-surface-variant">Isolation Level</span>
                      <span class="font-label-code text-label-code text-on-surface">REPEATABLE READ</span>
                    </div>
                    <div class="flex items-center justify-between p-space-sm rounded bg-surface-container-lowest">
                      <span class="font-body-sm text-body-sm text-on-surface-variant">Concurrent Oversell Risk</span>
                      <span class="font-label-code text-label-code text-primary font-bold">0.000%</span>
                    </div>
                  </div>
                  <!-- Visual ACID Step Pipe -->
                  <div class="mt-space-lg">
                    <span class="font-label-code text-label-code text-on-surface-variant uppercase tracking-wider block mb-space-xs">Atomic Pipeline Trace</span>
                    <div class="space-y-space-xs">
                      <div class="flex items-center justify-between text-body-sm p-space-xs rounded bg-surface-container-low">
                        <span class="flex items-center gap-space-xs font-label-code text-label-code text-on-surface">
                          <span class="material-symbols-outlined text-[14px] text-primary">check_circle</span>
                          01. ROW_EXCLUSIVE_LOCK
                        </span>
                        <span class="font-label-code text-label-code text-on-surface-variant">0.4ms</span>
                      </div>
                      <div class="flex items-center justify-between text-body-sm p-space-xs rounded bg-surface-container-low">
                        <span class="flex items-center gap-space-xs font-label-code text-label-code text-on-surface">
                          <span class="material-symbols-outlined text-[14px] text-primary">check_circle</span>
                          02. DEDUCT_INVENTORY_DELTA
                        </span>
                        <span class="font-label-code text-label-code text-on-surface-variant">0.6ms</span>
                      </div>
                      <div class="flex items-center justify-between text-body-sm p-space-xs rounded bg-surface-container-low">
                        <span class="flex items-center gap-space-xs font-label-code text-label-code text-on-surface">
                          <span class="material-symbols-outlined text-[14px] text-primary">check_circle</span>
                          03. EMIT_OUTBOX_EVENT
                        </span>
                        <span class="font-label-code text-label-code text-on-surface-variant">0.2ms</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="mt-space-lg pt-space-sm flex items-center justify-between">
                  <span class="font-label-code text-label-code text-on-surface-variant">Benchmark: 45k orders/sec</span>
                  <RouterLink class="font-label-code text-label-code text-primary hover:underline flex items-center gap-space-2xs" to="/docs/architecture">
                    <span>View pgbench logs</span>
                    <span class="material-symbols-outlined text-[12px]">open_in_new</span>
                  </RouterLink>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 3. CORE VALUE PILLARS (Architectural Precision Bento) -->
        <section class="py-space-2xl w-full">
          <div class="text-center max-w-2xl mx-auto mb-space-2xl">
            <span class="font-label-code text-label-code text-primary uppercase tracking-wider">Uncompromising Architecture</span>
            <h2 class="font-headline-lg text-headline-lg text-on-surface mt-space-xs">Built for engineers tired of e-commerce tax.</h2>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
            <!-- Pillar 1 -->
            <div class="p-space-xl rounded-xl bg-surface-container-low shadow-md hover:bg-surface-container transition-all flex flex-col justify-between group">
              <div>
                <div class="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center mb-space-lg group-hover:scale-110 transition-transform">
                  <span class="material-symbols-outlined text-primary text-[24px]">percent</span>
                </div>
                <h3 class="font-headline-sm text-headline-sm text-on-surface mb-space-sm">0% GMV Platform Tax</h3>
                <p class="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  Keep every cent. Hosted platforms take up to 2.9% + 30¢ of total store revenue plus monthly seat fees. Rho is fully Apache-2.0 sovereign code. Run it on a $10 VPS or multi-region bare metal.
                </p>
              </div>
              <div class="mt-space-xl pt-space-sm font-label-code text-label-code text-primary flex items-center gap-space-xs">
                <span>Zero cloud revenue share</span>
                <span class="material-symbols-outlined text-[14px]">format_image_left</span>
              </div>
            </div>
            <!-- Pillar 2 -->
            <div class="p-space-xl rounded-xl bg-surface-container-low shadow-md hover:bg-surface-container transition-all flex flex-col justify-between group">
              <div>
                <div class="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center mb-space-lg group-hover:scale-110 transition-transform">
                  <span class="material-symbols-outlined text-primary text-[24px]">layers</span>
                </div>
                <h3 class="font-headline-sm text-headline-sm text-on-surface mb-space-sm">Single Sovereign Binary</h3>
                <p class="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  Eliminate microservice sprawl and cross-service latency. Rho compiles to an ultra-fast Go binary under 42MB. It starts in 18ms, embeds migrations, and scales horizontally with standard load balancers.
                </p>
              </div>
              <div class="mt-space-xl pt-space-sm font-label-code text-label-code text-primary flex items-center gap-space-xs">
                <span>Static binary • 18ms boot</span>
                <span class="material-symbols-outlined text-[14px]">speed</span>
              </div>
            </div>
            <!-- Pillar 3 -->
            <div class="p-space-xl rounded-xl bg-surface-container-low shadow-md hover:bg-surface-container transition-all flex flex-col justify-between group">
              <div>
                <div class="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center mb-space-lg group-hover:scale-110 transition-transform">
                  <span class="material-symbols-outlined text-primary text-[24px]">lock</span>
                </div>
                <h3 class="font-headline-sm text-headline-sm text-on-surface mb-space-sm">Row-Lock Inventory Safety</h3>
                <p class="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  Flash sales and viral drops break Redis-based counters. Rho leverages Postgres <code class="font-code-inline text-code-inline text-primary-fixed bg-surface-container px-1 py-0.5 rounded">FOR UPDATE</code> lock concurrency to guarantee two customers never buy the last inventory item.
                </p>
              </div>
              <div class="mt-space-xl pt-space-sm font-label-code text-label-code text-primary flex items-center gap-space-xs">
                <span>Guaranteed ACID consistency</span>
                <span class="material-symbols-outlined text-[14px]">verified</span>
              </div>
            </div>
          </div>
        </section>

        <!-- 4. MODULAR ENGINE ANATOMY (Interactive Module Grid) -->
        <section class="py-space-2xl w-full">
          <div class="flex flex-col md:flex-row items-start md:items-end justify-between mb-space-xl">
            <div>
              <span class="font-label-code text-label-code text-primary uppercase tracking-wider">Modular Core Anatomy</span>
              <h2 class="font-headline-lg text-headline-lg text-on-surface mt-space-xs">Composable domain packages.</h2>
            </div>
            <span class="font-body-sm text-body-sm text-on-surface-variant mt-space-sm md:mt-0">Import what you need, replace what you don't.</span>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-md">
            <!-- Module 1: Catalog -->
            <div class="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-lg transition-all flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between mb-space-md">
                  <span class="font-label-code text-label-code px-space-xs py-space-2xs rounded bg-surface-container text-tertiary">GET /v1/products</span>
                  <span class="font-label-code text-label-code text-on-surface-variant">rho/catalog</span>
                </div>
                <h4 class="font-headline-sm text-headline-sm text-on-surface mb-space-xs">Hierarchical Product Graph</h4>
                <p class="font-body-sm text-body-sm text-on-surface-variant">Multi-variant options, recursive category trees, and localized metadata with full-text search indexing.</p>
              </div>
              <div class="mt-space-md pt-space-sm flex items-center justify-between text-on-surface-variant font-label-code text-label-code">
                <span>PostgreSQL GIN Indexes</span>
                <span class="text-primary font-medium">98.9% Hit Ratio</span>
              </div>
            </div>
            <!-- Module 2: Cart & Pricing -->
            <div class="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-lg transition-all flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between mb-space-md">
                  <span class="font-label-code text-label-code px-space-xs py-space-2xs rounded bg-surface-container text-primary">POST /v1/carts/:id/items</span>
                  <span class="font-label-code text-label-code text-on-surface-variant">rho/cart</span>
                </div>
                <h4 class="font-headline-sm text-headline-sm text-on-surface mb-space-xs">Contextual Pricing Engine</h4>
                <p class="font-body-sm text-body-sm text-on-surface-variant">Automatic tiered discounts, localized VAT &amp; tax calculation hooks, promo codes, and multi-currency conversions.</p>
              </div>
              <div class="mt-space-md pt-space-sm flex items-center justify-between text-on-surface-variant font-label-code text-label-code">
                <span>Deterministic Tax Graph</span>
                <span class="text-primary font-medium">1.1ms calc</span>
              </div>
            </div>
            <!-- Module 3: Checkout Transactions -->
            <div class="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-lg transition-all flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between mb-space-md">
                  <span class="font-label-code text-label-code px-space-xs py-space-2xs rounded bg-surface-container text-secondary">POST /v1/checkout</span>
                  <span class="font-label-code text-label-code text-on-surface-variant">rho/checkout</span>
                </div>
                <h4 class="font-headline-sm text-headline-sm text-on-surface mb-space-xs">Atomic Order Pipeline</h4>
                <p class="font-body-sm text-body-sm text-on-surface-variant">Single-call idempotent order finalization, stock decrement, customer record synchronization, and invoice PDF dispatch.</p>
              </div>
              <div class="mt-space-md pt-space-sm flex items-center justify-between text-on-surface-variant font-label-code text-label-code">
                <span>Idempotency-Key Header</span>
                <span class="text-primary font-medium">Zero Double-Charges</span>
              </div>
            </div>
            <!-- Module 4: Payment Connectors -->
            <div class="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-lg transition-all flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between mb-space-md">
                  <span class="font-label-code text-label-code px-space-xs py-space-2xs rounded bg-surface-container text-tertiary">POST /v1/payments/intent</span>
                  <span class="font-label-code text-label-code text-on-surface-variant">rho/payments</span>
                </div>
                <h4 class="font-headline-sm text-headline-sm text-on-surface mb-space-xs">Agnostic Gateway Adapters</h4>
                <p class="font-body-sm text-body-sm text-on-surface-variant">Pluggable connectors for Stripe, Adyen, Mollie, and crypto settlement, with automated fallback routing.</p>
              </div>
              <div class="mt-space-md pt-space-sm flex items-center justify-between text-on-surface-variant font-label-code text-label-code">
                <span>Smart Retry Mechanism</span>
                <span class="text-primary font-medium">+14% Auth Rate</span>
              </div>
            </div>
            <!-- Module 5: Inventory Multi-Warehouse -->
            <div class="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-lg transition-all flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between mb-space-md">
                  <span class="font-label-code text-label-code px-space-xs py-space-2xs rounded bg-surface-container text-primary">GET /v1/inventory/levels</span>
                  <span class="font-label-code text-label-code text-on-surface-variant">rho/inventory</span>
                </div>
                <h4 class="font-headline-sm text-headline-sm text-on-surface mb-space-xs">Multi-Location Stock Matrix</h4>
                <p class="font-body-sm text-body-sm text-on-surface-variant">Zone-based order routing, reserved allocations with auto-expiring leases, and cross-warehouse backorders.</p>
              </div>
              <div class="mt-space-md pt-space-sm flex items-center justify-between text-on-surface-variant font-label-code text-label-code">
                <span>Transactional Leases</span>
                <span class="text-primary font-medium">TTL Safe</span>
              </div>
            </div>
            <!-- Module 6: Webhooks & Outbox -->
            <div class="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-lg transition-all flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between mb-space-md">
                  <span class="font-label-code text-label-code px-space-xs py-space-2xs rounded bg-surface-container text-secondary">POST /v1/webhooks</span>
                  <span class="font-label-code text-label-code text-on-surface-variant">rho/outbox</span>
                </div>
                <h4 class="font-headline-sm text-headline-sm text-on-surface mb-space-xs">Transactional Outbox Pattern</h4>
                <p class="font-body-sm text-body-sm text-on-surface-variant">Never lose an event. Changes commit directly to Postgres outbox tables before streaming to Kafka or HTTP consumers.</p>
              </div>
              <div class="mt-space-md pt-space-sm flex items-center justify-between text-on-surface-variant font-label-code text-label-code">
                <span>Guaranteed Delivery</span>
                <span class="text-primary font-medium">Exactly-Once</span>
              </div>
            </div>
          </div>
        </section>

        <!-- 5. BENCHMARK & PERFORMANCE VISUALIZER -->
        <section class="py-space-2xl w-full">
          <div class="rounded-xl bg-surface-container p-space-lg md:p-space-2xl shadow-xl">
            <div class="max-w-3xl mb-space-xl">
              <span class="font-label-code text-label-code text-primary uppercase tracking-wider">Production Stress Testing</span>
              <h2 class="font-headline-lg text-headline-lg text-on-surface mt-space-xs">Engineered for 50,000 flash-sale checkouts per minute.</h2>
              <p class="mt-space-sm text-body-md font-body-md text-on-surface-variant">
                Comparison benchmarks measured on identical 4 vCPU / 8GB RAM host running sustained concurrent checkout calls.
              </p>
            </div>
            <!-- High-Throughput Comparison Graphic -->
            <div class="space-y-space-lg">
              <!-- Metric 1: Rho Core -->
              <div class="p-space-md rounded-lg bg-surface-container-lowest">
                <div class="flex items-center justify-between font-label-code text-label-code mb-space-xs">
                  <span class="text-on-surface font-semibold flex items-center gap-space-xs">
                    <span class="w-2 h-2 rounded-full bg-primary"></span>
                    Rho (Native Go + Postgres Row-Lock)
                  </span>
                  <span class="text-primary font-bold">14,280 req/sec • 3.8ms P99</span>
                </div>
                <div class="w-full h-3 rounded-full bg-surface-container overflow-hidden">
                  <div class="h-full bg-primary rounded-full transition-all duration-1000 w-[94%]"></div>
                </div>
              </div>
              <!-- Metric 2: Node.js / Medusa -->
              <div class="p-space-md rounded-lg bg-surface-container-lowest">
                <div class="flex items-center justify-between font-label-code text-label-code mb-space-xs">
                  <span class="text-on-surface-variant flex items-center gap-space-xs">
                    <span class="w-2 h-2 rounded-full bg-outline"></span>
                    Traditional Node.js Monolith
                  </span>
                  <span class="text-on-surface-variant font-medium">1,120 req/sec • 74ms P99</span>
                </div>
                <div class="w-full h-3 rounded-full bg-surface-container overflow-hidden">
                  <div class="h-full bg-outline rounded-full w-[24%]"></div>
                </div>
              </div>
              <!-- Metric 3: Generic Headless API -->
              <div class="p-space-md rounded-lg bg-surface-container-lowest">
                <div class="flex items-center justify-between font-label-code text-label-code mb-space-xs">
                  <span class="text-on-surface-variant flex items-center gap-space-xs">
                    <span class="w-2 h-2 rounded-full bg-outline-variant"></span>
                    Hosted SaaS Headless API (Rate-Limited)
                  </span>
                  <span class="text-on-surface-variant font-medium">350 req/sec • 240ms P99</span>
                </div>
                <div class="w-full h-3 rounded-full bg-surface-container overflow-hidden">
                  <div class="h-full bg-outline-variant rounded-full w-[8%]"></div>
                </div>
              </div>
            </div>
            <!-- Microsecond Sub-System Breakdown Grid -->
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-space-md mt-space-xl pt-space-lg">
              <div class="p-space-sm rounded bg-surface-container-lowest text-center">
                <span class="font-headline-sm text-headline-sm text-primary font-semibold">410 µs</span>
                <span class="block font-label-code text-label-code text-on-surface-variant mt-space-2xs">JSON Unmarshal</span>
              </div>
              <div class="p-space-sm rounded bg-surface-container-lowest text-center">
                <span class="font-headline-sm text-headline-sm text-primary font-semibold">1,240 µs</span>
                <span class="block font-label-code text-label-code text-on-surface-variant mt-space-2xs">Postgres Txn</span>
              </div>
              <div class="p-space-sm rounded bg-surface-container-lowest text-center">
                <span class="font-headline-sm text-headline-sm text-primary font-semibold">180 µs</span>
                <span class="block font-label-code text-label-code text-on-surface-variant mt-space-2xs">Tax Resolution</span>
              </div>
              <div class="p-space-sm rounded bg-surface-container-lowest text-center">
                <span class="font-headline-sm text-headline-sm text-primary font-semibold">0.0 ms</span>
                <span class="block font-label-code text-label-code text-on-surface-variant mt-space-2xs">Cloud Lockout</span>
              </div>
            </div>
          </div>
        </section>

        <!-- 6. FRONTEND STARTER KITS (Next.js 15, Remix, Astro) -->
        <section class="py-space-2xl w-full">
          <div class="flex flex-col md:flex-row md:items-end justify-between mb-space-xl">
            <div>
              <span class="font-label-code text-label-code text-primary uppercase tracking-wider">Frontend Starter Templates</span>
              <h2 class="font-headline-lg text-headline-lg text-on-surface mt-space-xs">Deploy your storefront in minutes.</h2>
            </div>
            <RouterLink class="font-label-ui text-label-ui text-primary hover:underline flex items-center gap-space-2xs mt-space-sm md:mt-0" to="/docs/getting-started">
              <span>View all 8 starter kits</span>
              <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
            </RouterLink>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
            <!-- Starter 1: Next.js 15 -->
            <RouterLink class="p-space-lg rounded-xl bg-surface-container-low hover:bg-surface-container transition-all group flex flex-col justify-between shadow-sm" to="/docs/getting-started">
              <div>
                <div class="flex items-center justify-between mb-space-md">
                  <span class="font-headline-sm text-headline-sm text-on-surface font-semibold">Next.js 15</span>
                  <span class="font-label-code text-label-code px-space-xs py-space-2xs rounded bg-surface-container-highest text-primary">React 19</span>
                </div>
                <p class="font-body-sm text-body-sm text-on-surface-variant">App Router, Server Actions, Dynamic Streaming Checkout, and Tailwind CSS v4 styling.</p>
              </div>
              <div class="mt-space-lg flex items-center justify-between text-on-surface font-label-code text-label-code group-hover:text-primary transition-colors">
                <span>npx create-rho-store</span>
                <span class="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </div>
            </RouterLink>
            <!-- Starter 2: Astro -->
            <RouterLink class="p-space-lg rounded-xl bg-surface-container-low hover:bg-surface-container transition-all group flex flex-col justify-between shadow-sm" to="/docs/getting-started">
              <div>
                <div class="flex items-center justify-between mb-space-md">
                  <span class="font-headline-sm text-headline-sm text-on-surface font-semibold">Astro 5.0</span>
                  <span class="font-label-code text-label-code px-space-xs py-space-2xs rounded bg-surface-container-highest text-tertiary">Zero-JS</span>
                </div>
                <p class="font-body-sm text-body-sm text-on-surface-variant">Ultra-lean catalog pages with island architecture for shopping cart and payment inputs.</p>
              </div>
              <div class="mt-space-lg flex items-center justify-between text-on-surface font-label-code text-label-code group-hover:text-primary transition-colors">
                <span>npm create rho-astro</span>
                <span class="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </div>
            </RouterLink>
            <!-- Starter 3: Remix -->
            <RouterLink class="p-space-lg rounded-xl bg-surface-container-low hover:bg-surface-container transition-all group flex flex-col justify-between shadow-sm" to="/docs/getting-started">
              <div>
                <div class="flex items-center justify-between mb-space-md">
                  <span class="font-headline-sm text-headline-sm text-on-surface font-semibold">Remix / React Router</span>
                  <span class="font-label-code text-label-code px-space-xs py-space-2xs rounded bg-surface-container-highest text-secondary">Edge</span>
                </div>
                <p class="font-body-sm text-body-sm text-on-surface-variant">First-class nested loaders and optimistic UI mutations for instant checkout response.</p>
              </div>
              <div class="mt-space-lg flex items-center justify-between text-on-surface font-label-code text-label-code group-hover:text-primary transition-colors">
                <span>npx create-rho-remix</span>
                <span class="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </div>
            </RouterLink>
            <!-- Starter 4: SvelteKit -->
            <RouterLink class="p-space-lg rounded-xl bg-surface-container-low hover:bg-surface-container transition-all group flex flex-col justify-between shadow-sm" to="/docs/getting-started">
              <div>
                <div class="flex items-center justify-between mb-space-md">
                  <span class="font-headline-sm text-headline-sm text-on-surface font-semibold">SvelteKit 2</span>
                  <span class="font-label-code text-label-code px-space-xs py-space-2xs rounded bg-surface-container-highest text-primary-fixed">Runes</span>
                </div>
                <p class="font-body-sm text-body-sm text-on-surface-variant">Svelte 5 runes with fine-grained reactivity, streaming SSR, and instant form actions.</p>
              </div>
              <div class="mt-space-lg flex items-center justify-between text-on-surface font-label-code text-label-code group-hover:text-primary transition-colors">
                <span>pnpm create rho-svelte</span>
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
            <span class="font-label-code text-label-code text-primary uppercase tracking-wider">Deploy in 60 Seconds</span>
            <h2 class="font-headline-lg text-headline-lg text-on-surface mt-space-xs">Ready to reclaim your commerce stack?</h2>
            <p class="mt-space-sm text-body-md font-body-md text-on-surface-variant leading-relaxed">
              Rho runs on any Docker host or Linux VM with PostgreSQL. Stop paying rent on your own checkout logic.
            </p>
            <!-- Terminal Command Copy -->
            <div class="mt-space-xl p-space-md rounded-lg bg-surface-container-lowest flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-space-md shadow-inner">
              <div class="font-label-code text-label-code text-on-surface select-all overflow-x-auto py-space-2xs">
                <span class="text-primary mr-2">$</span>
                <span>docker run -p 8080:8080 -e DATABASE_URL=postgres://... rhosystems/rho:latest</span>
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

    <!-- Footer segment -->
    <footer class="w-full bg-surface-container-lowest mt-space-3xl py-space-2xl border-t border-surface-container-high">
      <div class="max-w-7xl mx-auto px-space-base lg:px-space-xl">
        <div class="grid grid-cols-2 md:grid-cols-5 gap-space-xl mb-space-2xl">
          <div class="col-span-2 space-y-space-sm">
            <div class="flex items-center gap-space-xs">
              <span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span class="font-label-code text-label-code text-primary">All systems operational</span>
            </div>
            <p class="font-body-sm text-body-sm text-on-surface-variant max-w-sm">High-performance self-hosted headless e-commerce backend built with Go, Postgres, and type-safe APIs.</p>
            <p class="font-label-code text-label-code text-on-surface-variant">© 2025 Rho Systems Inc. Released under Apache-2.0.</p>
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
