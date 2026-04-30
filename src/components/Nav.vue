<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { profile, snCommunity } from '../data/site';

const sections = [
  'about',
  'servicenow',
  'experience',
  'skills',
  'projects',
  'contact',
] as const;

const labels: Record<typeof sections[number], string> = {
  about: 'About',
  servicenow: 'ServiceNow',
  experience: 'Experience',
  skills: 'Skills',
  projects: 'Projects',
  contact: 'Contact',
};

const activeSection = ref<string>('');
const menuOpen = ref(false);
const heroVisible = ref(true);
const windowWidth = ref(globalThis.window === undefined ? 1024 : globalThis.innerWidth);
const isMobile = computed(() => windowWidth.value < 768);
const showContact = computed(() => !heroVisible.value && !isMobile.value);

const observers: IntersectionObserver[] = [];

onMounted(() => {
  const heroEl = document.getElementById('hero');
  if (heroEl) {
    const heroObs = new IntersectionObserver(
      ([entry]) => { heroVisible.value = entry.isIntersecting; },
      { threshold: 0.1 },
    );
    heroObs.observe(heroEl);
    observers.push(heroObs);
  }

  for (const id of sections) {
    const el = document.getElementById(id);
    if (!el) continue;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) activeSection.value = id; },
      { threshold: 0.25 },
    );
    obs.observe(el);
    observers.push(obs);
  }

  const onResize = () => { windowWidth.value = globalThis.innerWidth; };
  globalThis.addEventListener('resize', onResize);
  onUnmounted(() => globalThis.removeEventListener('resize', onResize));
});

onUnmounted(() => {
  for (const obs of observers) obs.disconnect();
});

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  menuOpen.value = false;
}
</script>

<template>
  <nav class="fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-sm border-b border-white/5">
    <div class="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">

      <!-- Left: always-visible contact chip (desktop only), single horizontal row -->
      <Transition name="chip">
      <div v-if="showContact" class="contact-chip">
        <img src="/images/pfp.jpg" alt="David Cole" class="chip-pfp" />
        <span class="chip-name">{{ profile.name }}</span>
        <span class="chip-divider" aria-hidden="true" />
        <a
          v-for="s in profile.socials"
          :key="s.icon"
          :href="s.href"
          :target="s.icon !== 'email' ? '_blank' : undefined"
          :rel="s.icon !== 'email' ? 'noopener noreferrer' : undefined"
          :aria-label="s.label"
          class="chip-social"
        >
          <svg v-if="s.icon === 'github'" viewBox="0 0 24 24" fill="currentColor" class="chip-icon">
            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
          </svg>
          <svg v-else-if="s.icon === 'linkedin'" viewBox="0 0 24 24" fill="currentColor" class="chip-icon">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
          <svg v-else-if="s.icon === 'servicenow'" viewBox="0 0 24 24" fill="currentColor" class="chip-icon">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3.5c1.93 0 3.5 1.57 3.5 3.5S13.93 12.5 12 12.5 8.5 10.93 8.5 9 10.07 5.5 12 5.5zm0 13c-2.67 0-5.03-1.31-6.48-3.32C7.2 13.6 9.48 12.5 12 12.5s4.8 1.1 6.48 2.68C16.03 17.19 13.67 18.5 12 18.5z" />
          </svg>
          <svg v-else-if="s.icon === 'email'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="chip-icon">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
          </svg>
        </a>
        <span class="chip-divider" aria-hidden="true" />
        <a :href="snCommunity.href" target="_blank" rel="noopener noreferrer" aria-label="ServiceNow Community profile" class="chip-social">
          <img src="/images/servicenow.png" alt="" class="chip-icon-img" />
        </a>
        <a :href="snCommunity.credlyHref" target="_blank" rel="noopener noreferrer" aria-label="Credly credentials" class="chip-social">
          <img src="https://cdn.simpleicons.org/credly/FF6A13" alt="" class="chip-icon-img" />
        </a>
      </div>
      </Transition>

      <!-- Right: desktop section links -->
      <ul class="hidden md:flex gap-6 list-none m-0 p-0 ml-auto">
        <li v-for="id in sections" :key="id">
          <button
            class="text-sm capitalize transition-colors duration-200 bg-transparent border-none cursor-pointer p-0"
            :class="activeSection === id ? 'text-gold' : 'text-[#a0a0a0] hover:text-[#e0e0e0]'"
            @click="scrollTo(id)"
          >
            {{ labels[id] }}
          </button>
        </li>
      </ul>

      <!-- Mobile hamburger -->
      <button
        class="md:hidden text-[#e0e0e0] bg-transparent border-none cursor-pointer p-1 ml-auto"
        aria-label="Toggle navigation menu"
        @click="menuOpen = !menuOpen"
      >
        <svg v-if="!menuOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Mobile dropdown -->
    <div v-if="menuOpen" class="md:hidden border-t border-white/5 bg-surface/95">
      <ul class="list-none m-0 px-6 py-4 flex flex-col gap-4">
        <li v-for="id in sections" :key="id">
          <button
            class="text-sm w-full text-left bg-transparent border-none cursor-pointer p-0 transition-colors duration-200"
            :class="activeSection === id ? 'text-gold' : 'text-[#a0a0a0]'"
            @click="scrollTo(id)"
          >
            {{ labels[id] }}
          </button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
.chip-enter-active {
  transition: transform 0.32s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.25s ease;
}

.chip-leave-active {
  transition: transform 0.22s ease, opacity 0.18s ease;
}

.chip-enter-from,
.chip-leave-to {
  transform: translateX(-24px);
  opacity: 0;
}

.chip-enter-to,
.chip-leave-from {
  transform: translateX(0);
  opacity: 1;
}

/* ---- Contact chip — single horizontal row ---- */
.contact-chip {
  display: flex;
  align-items: center;
  gap: 7px;
}

.chip-pfp {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  object-fit: cover;
  border: 1.5px solid rgba(0, 180, 216, 0.3);
  flex-shrink: 0;
}

.chip-name {
  font-size: 13px;
  font-weight: 600;
  color: #c0c0c0;
  letter-spacing: 0.02em;
  white-space: nowrap;
}

.chip-divider {
  display: inline-block;
  width: 1px;
  height: 20px;
  background: rgba(255, 255, 255, 0.1);
  flex-shrink: 0;
}

.chip-social {
  color: #525252;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease;
  text-decoration: none;
}

.chip-social:hover {
  color: var(--color-accent);
}

.chip-icon {
  width: 20px;
  height: 20px;
}

.chip-icon-img {
  width: 20px;
  height: 20px;
  object-fit: contain;
  opacity: 0.55;
  transition: opacity 0.2s ease;
}

.chip-social:hover .chip-icon-img {
  opacity: 1;
}
</style>
