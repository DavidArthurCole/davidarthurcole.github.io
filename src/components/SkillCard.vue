<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue';

interface SkillProject {
  name: string;
  href: string;
}

interface Skill {
  name: string;
  icon: string;
  href: string;
  hoverColor: string;
  tagline: string;
  detail: string;
  relatedProjects?: SkillProject[];
}

// Module-level singleton: only one popout open at a time across all cards
const activeCard = ref<string | null>(null);

const props = defineProps<{ skill: Skill }>();
const imgFailed = ref(false);
const popoutEl = ref<HTMLElement | null>(null);
const isOpen = computed(() => activeCard.value === props.skill.name);

function onEnter(event: MouseEvent) {
  const el = event.currentTarget as HTMLElement;
  const rect = el.getBoundingClientRect();
  const cx = Math.round(rect.left + rect.width / 2);
  const cy = Math.round(rect.top + rect.height / 2);
  const overlay = document.getElementById('hover-overlay');
  if (!overlay) return;
  overlay.style.background = `radial-gradient(ellipse 900px 700px at ${cx}px ${cy}px, ${props.skill.hoverColor} 0%, transparent 100%)`;
  overlay.style.opacity = '1';
}

function onLeave() {
  const overlay = document.getElementById('hover-overlay');
  if (overlay) overlay.style.opacity = '0';
}

function openPopout() {
  activeCard.value = props.skill.name;
  document.addEventListener('keydown', onEsc);
  setTimeout(() => document.addEventListener('click', onOutside), 0);
}

function closePopout() {
  activeCard.value = null;
  document.removeEventListener('keydown', onEsc);
  document.removeEventListener('click', onOutside);
}

function onEsc(e: KeyboardEvent) {
  if (e.key === 'Escape') closePopout();
}

function onOutside(e: MouseEvent) {
  if (popoutEl.value && !popoutEl.value.contains(e.target as Node)) {
    closePopout();
  }
}

onUnmounted(() => {
  document.removeEventListener('keydown', onEsc);
  document.removeEventListener('click', onOutside);
});
</script>

<template>
  <button
    class="skill-card relative z-10 rounded-xl border border-white/10 p-5 text-center cursor-pointer w-full transition-transform duration-200 hover:-translate-y-1"
    :class="{ 'card-active': isOpen }"
    style="background: rgba(0,0,0,0.45);"
    @click="openPopout"
    @mouseenter="onEnter"
    @mouseleave="onLeave"
  >
    <div class="h-16 flex items-center justify-center mb-3">
      <img
        v-if="skill.icon && !imgFailed"
        :src="skill.icon"
        :alt="skill.name"
        class="max-h-14 w-auto object-contain"
        @error="imgFailed = true"
      />
      <div
        v-else
        class="w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold text-[#e0e0e0]"
        style="background: rgba(255,255,255,0.08);"
      >
        {{ skill.name.charAt(0) }}
      </div>
    </div>
    <p class="text-sm font-semibold text-[#e0e0e0]">{{ skill.name }}</p>
    <p class="card-tagline">{{ skill.tagline }}</p>
  </button>

  <Teleport to="body">
    <Transition name="popout-slide">
      <div
        v-if="isOpen"
        ref="popoutEl"
        class="skill-popout"
        role="region"
        :aria-label="`${skill.name} details`"
      >
        <button class="popout-close" @click="closePopout" aria-label="Close">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <div class="popout-header">
          <img
            v-if="skill.icon && !imgFailed"
            :src="skill.icon"
            :alt="skill.name"
            class="popout-icon"
          />
          <div
            v-else
            class="popout-icon-fallback"
          >
            {{ skill.name.charAt(0) }}
          </div>
          <div>
            <h3 class="popout-title">{{ skill.name }}</h3>
            <p class="popout-tagline">{{ skill.tagline }}</p>
          </div>
        </div>

        <p class="popout-detail">{{ skill.detail }}</p>

        <div v-if="skill.relatedProjects?.length" class="popout-projects">
          <p class="popout-section-label">Related Projects</p>
          <div class="popout-project-list">
            <a
              v-for="p in skill.relatedProjects"
              :key="p.name"
              :href="p.href"
              target="_blank"
              rel="noopener noreferrer"
              class="popout-project-tag"
            >
              {{ p.name }}
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>

        <a
          :href="skill.href"
          target="_blank"
          rel="noopener noreferrer"
          class="popout-doc-link"
        >
          View documentation
          <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.skill-card {
  background: rgba(0, 0, 0, 0.45);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.card-active {
  border-color: rgba(255, 255, 255, 0.22);
  background: rgba(0, 0, 0, 0.6);
}

.card-tagline {
  font-size: 11px;
  color: #848484;
  margin-top: 4px;
  line-height: 1.3;
}

/* ---- Side popout panel ---- */
.skill-popout {
  position: fixed;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 320px;
  max-height: 80vh;
  overflow-y: auto;
  background: #0d0d20;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-right: none;
  border-radius: 16px 0 0 16px;
  padding: 28px;
  z-index: 9000;
  box-shadow: -8px 0 40px rgba(0, 0, 0, 0.5);
  color: #e0e0e0;
}

.popout-close {
  position: absolute;
  top: 14px;
  right: 14px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 6px;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #707070;
  cursor: pointer;
  transition: color 0.2s ease, background 0.2s ease;
}

.popout-close:hover {
  color: #e0e0e0;
  background: rgba(255, 255, 255, 0.1);
}

.popout-header {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 18px;
  padding-right: 32px;
}

.popout-icon {
  width: 40px;
  height: 40px;
  object-fit: contain;
  flex-shrink: 0;
}

.popout-icon-fallback {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 700;
  flex-shrink: 0;
}

.popout-title {
  font-size: 17px;
  font-weight: 700;
  margin: 0 0 3px;
}

.popout-tagline {
  font-size: 12px;
  color: #848484;
  margin: 0;
}

.popout-detail {
  font-size: 13px;
  color: #a0a0a0;
  line-height: 1.75;
  margin: 0 0 18px;
}

.popout-section-label {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #707070;
  margin: 0 0 8px;
}

.popout-project-list {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 18px;
}

.popout-project-tag {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 5px 12px;
  border-radius: 20px;
  background: rgba(0, 180, 216, 0.08);
  border: 1px solid rgba(0, 180, 216, 0.2);
  color: var(--color-accent);
  font-size: 12px;
  text-decoration: none;
  transition: background 0.2s ease, border-color 0.2s ease;
}

.popout-project-tag:hover {
  background: rgba(0, 180, 216, 0.15);
  border-color: rgba(0, 180, 216, 0.4);
}

.popout-doc-link {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  color: #707070;
  text-decoration: none;
  transition: color 0.2s ease;
}

.popout-doc-link:hover {
  color: #b0b0b0;
}

/* ---- Slide-in from right ---- */
.popout-slide-enter-active {
  transition: transform 0.28s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.22s ease;
}

.popout-slide-leave-active {
  transition: transform 0.2s ease, opacity 0.18s ease;
}

.popout-slide-enter-from,
.popout-slide-leave-to {
  transform: translateY(-50%) translateX(110%);
  opacity: 0;
}

.popout-slide-enter-to,
.popout-slide-leave-from {
  transform: translateY(-50%) translateX(0);
  opacity: 1;
}
</style>
