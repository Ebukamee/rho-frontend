<script setup lang="ts">
import { docsMap } from '../data/docs'

const page = docsMap['/']
</script>

<template>
  <div class="bg-surface-container-lowest text-on-surface font-body-md text-body-md min-h-screen selection:bg-primary-container selection:text-on-primary-container">
    <div class="md:pl-sidebar-left-width">
      <main class="w-full pt-header-height bg-surface-container-lowest min-h-screen">
        <div class="w-full max-w-7xl mx-auto px-space-base md:px-space-xl py-space-xl">
          <section class="rounded-3xl border border-surface-container-high bg-surface-container px-space-xl py-space-2xl shadow-2xl shadow-black/20">
            <div class="max-w-4xl">
              <div class="inline-flex items-center gap-space-xs px-space-sm py-space-2xs rounded bg-surface-container-high text-primary font-label-code text-label-code mb-space-md">
                <span class="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                {{ page.eyebrow }}
              </div>
              <h1 class="font-headline-xl text-headline-xl text-on-surface tracking-tight mb-space-md">Build commerce without handing over your product experience.</h1>
              <p class="font-body-lg text-body-lg text-on-surface-variant leading-relaxed max-w-2xl">
                Platforms ask you to move into their building. Rho lets you keep your own storefront, app, and customer experience while giving you the commerce stack you actually need.
              </p>
            </div>
          </section>

          <section class="mt-space-2xl">
            <div class="flex items-baseline justify-between mb-space-md">
              <h2 class="font-headline-sm text-headline-sm text-on-surface">Features</h2>
              <span class="font-label-code text-label-code text-on-surface-variant">Core commerce</span>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-space-md">
              <div v-for="card in page.sections[0].cards" :key="card.title" class="rounded-xl border border-surface-container-high bg-surface-container-low p-space-md">
                <div class="font-label-ui text-label-ui text-on-surface font-semibold mb-space-xs">{{ card.title }}</div>
                <p class="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">{{ card.text }}</p>
              </div>
            </div>
          </section>

          <section class="mt-space-2xl rounded-2xl border border-surface-container-high bg-surface-container p-space-lg">
            <div class="flex items-baseline justify-between mb-space-md">
              <h2 class="font-headline-sm text-headline-sm text-on-surface">Architecture snapshot</h2>
              <span class="font-label-code text-label-code text-on-surface-variant">System flow</span>
            </div>
            
            <div class="flex flex-col lg:flex-row items-stretch justify-between gap-space-md py-space-md relative">
              <!-- Card 1: Your Application -->
              <div class="flex-1 rounded-xl bg-surface-container-low border border-surface-container-high p-space-md shadow-sm hover:border-primary/50 transition-colors flex flex-col justify-between">
                <div>
                  <div class="flex items-center justify-between mb-space-xs">
                    <span class="font-label-code text-label-code text-primary font-semibold">CLIENT LAYER</span>
                    <span class="material-symbols-outlined text-[20px] text-primary">devices</span>
                  </div>
                  <h3 class="font-label-ui text-label-ui text-on-surface font-semibold mb-space-xs">Your Application</h3>
                  <p class="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">React, Vue, Nuxt, Next.js, or mobile clients connected over HTTPS.</p>
                </div>
                <div class="mt-space-md pt-space-xs border-t border-surface-variant/40 text-on-surface-variant font-label-code text-label-code flex items-center gap-space-xs">
                  <span class="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  @rho-commerce/sdk
                </div>
              </div>

              <!-- Connector 1 -->
              <div class="flex lg:flex-col items-center justify-center text-primary-container py-space-xs lg:py-0 shrink-0">
                <span class="material-symbols-outlined text-[24px] lg:rotate-0 rotate-90 text-primary opacity-70 animate-pulse">arrow_forward_ios</span>
              </div>

              <!-- Card 2: Rho REST API -->
              <div class="flex-1 rounded-xl bg-surface-container-low border border-surface-container-high p-space-md shadow-sm hover:border-primary/50 transition-colors flex flex-col justify-between">
                <div>
                  <div class="flex items-center justify-between mb-space-xs">
                    <span class="font-label-code text-label-code text-primary font-semibold">GATEWAY</span>
                    <span class="material-symbols-outlined text-[20px] text-primary">api</span>
                  </div>
                  <h3 class="font-label-ui text-label-ui text-on-surface font-semibold mb-space-xs">Rho REST API</h3>
                  <p class="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">Unified router serving public storefront listings and secure customer endpoints.</p>
                </div>
                <div class="mt-space-md pt-space-xs border-t border-surface-variant/40 text-on-surface-variant font-label-code text-label-code flex items-center gap-space-xs">
                  <span class="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                  Active on Port 8080
                </div>
              </div>

              <!-- Connector 2 -->
              <div class="flex lg:flex-col items-center justify-center text-primary-container py-space-xs lg:py-0 shrink-0">
                <span class="material-symbols-outlined text-[24px] lg:rotate-0 rotate-90 text-primary opacity-70 animate-pulse">arrow_forward_ios</span>
              </div>

              <!-- Card 3: Auth / Commerce / Payments -->
              <div class="flex-1 rounded-xl bg-surface-container-low border border-surface-container-high p-space-md shadow-sm hover:border-primary/50 transition-colors flex flex-col justify-between">
                <div>
                  <div class="flex items-center justify-between mb-space-xs">
                    <span class="font-label-code text-label-code text-primary font-semibold">CORE SERVICES</span>
                    <span class="material-symbols-outlined text-[20px] text-primary">security</span>
                  </div>
                  <h3 class="font-label-ui text-label-ui text-on-surface font-semibold mb-space-xs">Domain Core</h3>
                  <p class="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">Modular packages managing authentications, stock, payments, and transactional checkouts.</p>
                </div>
                <div class="mt-space-md pt-space-xs border-t border-surface-variant/40 text-on-surface-variant font-label-code text-label-code flex items-center gap-space-xs">
                  <span class="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  Paystack Integration
                </div>
              </div>

              <!-- Connector 3 -->
              <div class="flex lg:flex-col items-center justify-center text-primary-container py-space-xs lg:py-0 shrink-0">
                <span class="material-symbols-outlined text-[24px] lg:rotate-0 rotate-90 text-primary opacity-70 animate-pulse">arrow_forward_ios</span>
              </div>

              <!-- Card 4: PostgreSQL -->
              <div class="flex-1 rounded-xl bg-surface-container-low border border-surface-container-high p-space-md shadow-sm hover:border-primary/50 transition-colors flex flex-col justify-between">
                <div>
                  <div class="flex items-center justify-between mb-space-xs">
                    <span class="font-label-code text-label-code text-primary font-semibold">PERSISTENCE</span>
                    <span class="material-symbols-outlined text-[20px] text-primary">database</span>
                  </div>
                  <h3 class="font-label-ui text-label-ui text-on-surface font-semibold mb-space-xs">PostgreSQL</h3>
                  <p class="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">Transactional database enforcing referential integrity, unique constraints, and ACID safety.</p>
                </div>
                <div class="mt-space-md pt-space-xs border-t border-surface-variant/40 text-on-surface-variant font-label-code text-label-code flex items-center gap-space-xs">
                  <span class="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  pgx Driver Direct SQL
                </div>
              </div>
            </div>
          </section>

          <section class="mt-space-2xl flex flex-col md:flex-row md:items-center md:justify-between gap-space-md rounded-2xl border border-primary/30 bg-primary/5 p-space-lg">
            <div>
              <div class="font-label-code text-label-code uppercase tracking-wider text-primary mb-space-xs">Quickstart</div>
              <h3 class="font-headline-sm text-headline-sm text-on-surface">Get a local instance running</h3>
            </div>
            <pre class="overflow-x-auto rounded-xl border border-surface-container-high bg-surface-container p-space-md font-label-code text-label-code text-on-surface whitespace-pre-wrap">{{ page.sections[2].code }}</pre>
          </section>
        </div>
      </main>
    </div>
  </div>
</template>
