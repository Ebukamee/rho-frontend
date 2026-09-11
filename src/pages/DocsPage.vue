<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { docsMap } from '../data/docs'

const props = defineProps<{ pageKey?: string }>()

const route = useRoute()
const pageKey = computed(() => props.pageKey || route.path)
const page = computed(() => docsMap[pageKey.value] || docsMap['/docs/getting-started'])

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return

        const id = entry.target.getAttribute('id')
        document.querySelectorAll<HTMLElement>('.toc-link').forEach((link) => {
          const matches = link.getAttribute('href') === `#${id}`
          const indicator = link.querySelector('span')

          if (matches) {
            link.classList.remove('text-on-surface-variant')
            link.classList.add('text-primary', 'font-medium')
            if (indicator) {
              indicator.classList.remove('bg-transparent')
              indicator.classList.add('bg-primary')
            }
          } else {
            link.classList.add('text-on-surface-variant')
            link.classList.remove('text-primary', 'font-medium')
            if (indicator) {
              indicator.classList.add('bg-transparent')
              indicator.classList.remove('bg-primary')
            }
          }
        })
      })
    },
    { rootMargin: '-80px 0px -60% 0px', threshold: 0.1 }
  )

  document.querySelectorAll('section[id]').forEach((section) => observer.observe(section))
})
</script>

<template>
  <div class="bg-surface-container-lowest text-on-surface font-body-md text-body-md min-h-screen selection:bg-primary-container selection:text-on-primary-container">
    <div class="md:pl-sidebar-left-width">
      <main class="w-full pt-header-height bg-surface-container-lowest min-h-screen">
        <div class="flex flex-col w-full">
          <div class="relative w-full max-w-7xl mx-auto px-space-base md:px-space-xl py-space-xl flex flex-col xl:flex-row gap-space-2xl items-start">
            <article class="flex-1 w-full min-w-0 max-w-content-max">
              <nav class="flex items-center gap-space-xs font-label-code text-label-code text-on-surface-variant mb-space-md">
                <span class="hover:text-primary transition-colors cursor-pointer">Rho Docs</span>
                <span class="text-surface-variant">/</span>
                <span class="text-on-surface">{{ page.title }}</span>
              </nav>

              <header class="mb-space-2xl">
                <div class="inline-flex items-center gap-space-xs px-space-sm py-space-2xs rounded bg-surface-container-high text-primary font-label-code text-label-code mb-space-sm">
                  <span class="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                  {{ page.eyebrow }}
                </div>
                <h1 class="font-headline-lg text-headline-lg text-on-surface mb-space-sm tracking-tight">
                  {{ page.title }}
                </h1>
                <p class="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                  {{ page.summary }}
                </p>
              </header>

              <template v-for="section in page.sections" :key="section.id">
                <section :id="section.id" class="mb-space-3xl scroll-mt-24">
                  <div class="flex items-baseline justify-between mb-space-md flex-wrap gap-space-sm">
                    <h2 class="font-headline-sm text-headline-sm text-on-surface">{{ section.title }}</h2>
                    <span v-if="section.eyebrow" class="font-label-code text-label-code text-on-surface-variant">{{ section.eyebrow }}</span>
                  </div>

                  <template v-if="section.body">
                    <p
                      v-for="(paragraph, index) in section.body"
                      :key="`${section.id}-${index}`"
                      class="font-body-md text-body-md text-on-surface-variant mb-space-md leading-relaxed"
                    >
                      {{ paragraph }}
                    </p>
                  </template>

                  <ul v-if="section.list" class="mb-space-md pl-space-lg list-disc space-y-space-xs text-on-surface-variant">
                    <li v-for="(item, index) in section.list" :key="`${section.id}-list-${index}`" class="font-body-md text-body-md leading-relaxed">
                      {{ item }}
                    </li>
                  </ul>

                  <pre v-if="section.code" class="mb-space-md overflow-x-auto rounded-xl border border-surface-container-high bg-surface-container p-space-md font-label-code text-label-code text-on-surface whitespace-pre-wrap">
{{ section.code }}
                  </pre>

                  <div v-if="section.cards" class="grid grid-cols-1 md:grid-cols-2 gap-space-sm mb-space-lg">
                    <div v-for="card in section.cards" :key="card.title" class="p-space-md rounded-lg bg-surface-container-low shadow-sm">
                      <div class="font-label-ui text-label-ui text-on-surface font-semibold mb-space-xs">{{ card.title }}</div>
                      <p class="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">{{ card.text }}</p>
                    </div>
                  </div>

                  <table v-if="section.table" class="w-full border-collapse mb-space-md overflow-hidden rounded-xl border border-surface-container-high text-left">
                    <thead class="bg-surface-container-high">
                      <tr>
                        <th v-for="header in section.table.headers" :key="header" class="px-space-sm py-space-xs font-label-ui text-label-ui text-on-surface">
                          {{ header }}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(row, index) in section.table.rows" :key="`${section.id}-row-${index}`" class="border-t border-surface-container-high">
                        <td v-for="(cell, cellIndex) in row" :key="`${section.id}-cell-${cellIndex}`" class="px-space-sm py-space-xs font-body-sm text-body-sm text-on-surface-variant">
                          {{ cell }}
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <div v-if="section.callout" class="rounded-xl border border-primary/30 bg-primary/5 px-space-md py-space-sm font-body-sm text-body-sm text-on-surface-variant">
                    {{ section.callout }}
                  </div>
                </section>
              </template>
            </article>

            <aside class="hidden xl:block xl:w-sidebar-right-width xl:sticky xl:top-header-height xl:self-start shrink-0">
              <div class="rounded-xl border border-surface-container-high bg-surface-container-low p-space-md xl:p-space-lg">
                <div class="font-label-code text-label-code uppercase tracking-wider text-on-surface-variant mb-space-sm">On this page</div>
                <nav class="flex flex-col gap-space-xs">
                  <a
                    v-for="section in page.sections"
                    :key="section.id"
                    class="toc-link flex items-center gap-space-sm text-on-surface-variant hover:text-primary transition-colors"
                    :href="`#${section.id}`"
                  >
                    <span class="w-1.5 h-1.5 rounded-full bg-transparent transition-colors"></span>
                    <span class="font-body-sm text-body-sm">{{ section.title }}</span>
                  </a>
                </nav>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
