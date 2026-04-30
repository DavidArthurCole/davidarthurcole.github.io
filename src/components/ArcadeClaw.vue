<script setup lang="ts">
import { ref, nextTick, onMounted } from 'vue';

const visible = ref(false);
const cablePhase = ref<'idle' | 'dropping'>('idle');
const cableHeight = ref(0);
const jawOpen = ref(true);
const cableEl = ref<HTMLElement | null>(null);

function wait(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

onMounted(async () => {
  if (window.scrollY > 80) return;
  await wait(2000);

  const aboutEl = document.getElementById('about');
  if (!aboutEl) return;

  // Target the hero PFP: cable end sits at the PFP top, arms reach into it
  const pfpEl = document.querySelector('#hero img') as HTMLImageElement | null;
  let dropDepth: number;

  if (pfpEl) {
    const rect = pfpEl.getBoundingClientRect();
    // Place cable bottom at PFP top so the housing + arms overlap the image
    dropDepth = Math.max(0, Math.round(rect.top));
  } else {
    dropDepth = Math.round(window.innerHeight * 0.45);
  }

  visible.value = true;
  await nextTick();
  await wait(60);

  // Drop cable to PFP (CSS transition)
  cablePhase.value = 'dropping';
  await nextTick();
  cableHeight.value = dropDepth;
  await wait(1180);

  // Grab
  jawOpen.value = false;
  await wait(720);

  // Synchronized retract + scroll — JS rAF keeps them frame-locked.
  // cableHeight = dropDepth - scrollY: the cable bottom tracks its original page position.
  // Claw disappears the instant the cable reaches 0, scroll continues independently.
  cablePhase.value = 'idle'; // remove CSS transition
  await nextTick();

  const scrollFrom = window.scrollY;
  const scrollDist = aboutEl.offsetTop - scrollFrom;
  const duration = 1100;
  const startTime = performance.now();
  const cable = cableEl.value;
  let clawDone = false;

  await new Promise<void>((resolve) => {
    function step(now: number) {
      const t = Math.min((now - startTime) / duration, 1);
      const eased = 1 - (1 - t) ** 3;
      const newScrollY = scrollFrom + scrollDist * eased;
      window.scrollTo(0, newScrollY);

      if (!clawDone) {
        const newH = Math.max(0, dropDepth - newScrollY);
        cableHeight.value = newH;
        if (cable) cable.style.height = newH + 'px';
        if (newH === 0) {
          clawDone = true;
          visible.value = false;
        }
      }

      if (t < 1) requestAnimationFrame(step);
      else resolve();
    }
    requestAnimationFrame(step);
  });
});
</script>

<template>
  <Teleport to="body">
    <div v-if="visible" class="claw-root" aria-hidden="true">
      <div class="cable" :class="cablePhase" ref="cableEl" :style="{ height: cableHeight + 'px' }" />

      <!--
        Mechanical grabber: two thick curved finger arms pivot from a central drum.
        Left arm: rotate(28deg) = open, rotate(-12deg) = closed.
        Right arm: rotate(-28deg) = open, rotate(12deg) = closed.
        Both rotate around pivot at (40, 26).
      -->
      <svg viewBox="0 0 80 130" width="80" height="130" overflow="visible" class="claw-svg">
        <defs>
          <linearGradient id="arm-metal" x1="0" y1="0" x2="80" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stop-color="#4a4a6a"/>
            <stop offset="35%"  stop-color="#b8b8d4"/>
            <stop offset="50%"  stop-color="#d0d0e8"/>
            <stop offset="65%"  stop-color="#b8b8d4"/>
            <stop offset="100%" stop-color="#4a4a6a"/>
          </linearGradient>
          <linearGradient id="housing-metal" x1="14" y1="0" x2="66" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stop-color="#1e1e38"/>
            <stop offset="40%"  stop-color="#3a3a60"/>
            <stop offset="60%"  stop-color="#3a3a60"/>
            <stop offset="100%" stop-color="#1e1e38"/>
          </linearGradient>
        </defs>

        <!-- Drum housing -->
        <rect x="14" y="0" width="52" height="28" rx="7" fill="url(#housing-metal)" stroke="#404068" stroke-width="1.5"/>
        <rect x="34" y="0" width="12" height="8" rx="3" fill="#0a0a18"/>

        <!-- Left finger arm -->
        <path
          class="grabber-arm arm-l"
          :class="{ 'arm-closed': !jawOpen }"
          d="M 40,24 C 36,42 24,64 16,88 Q 12,102 16,114 Q 22,122 30,116 Q 36,110 34,100"
          fill="none"
          stroke="url(#arm-metal)"
          stroke-width="11"
          stroke-linecap="round"
          stroke-linejoin="round"
        />

        <!-- Right finger arm (mirror) -->
        <path
          class="grabber-arm arm-r"
          :class="{ 'arm-closed': !jawOpen }"
          d="M 40,24 C 44,42 56,64 64,88 Q 68,102 64,114 Q 58,122 50,116 Q 44,110 46,100"
          fill="none"
          stroke="url(#arm-metal)"
          stroke-width="11"
          stroke-linecap="round"
          stroke-linejoin="round"
        />

        <!-- Pivot drum rendered on top so arms emerge from behind it -->
        <circle cx="40" cy="26" r="8" fill="#12122a" stroke="#5050a0" stroke-width="1.5"/>
        <circle cx="40" cy="26" r="4" fill="#1e1e44"/>
        <circle cx="40" cy="26" r="1.5" fill="#6060b0"/>
      </svg>
    </div>
  </Teleport>
</template>

<style scoped>
.claw-root {
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  pointer-events: none;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.cable {
  width: 4px;
  background: linear-gradient(to bottom, #333 0%, #999 40%, #777 100%);
  border-radius: 2px;
  flex-shrink: 0;
}
/* Only CSS transition used for drop; retract is JS-driven */
.cable.dropping { transition: height 1100ms cubic-bezier(0.22, 1, 0.36, 1); }

.claw-svg {
  filter: drop-shadow(0 4px 20px rgba(40, 40, 180, 0.5));
}

.grabber-arm {
  transform-origin: 40px 26px;
  transition: transform 0.6s cubic-bezier(0.34, 1.1, 0.64, 1);
}

/* Open: arms splayed wide */
.arm-l { transform: rotate(28deg); }
.arm-r { transform: rotate(-28deg); }

/* Closed: arms pulled in — limited to ~12deg so arm bodies never cross center */
.arm-l.arm-closed { transform: rotate(-12deg); }
.arm-r.arm-closed { transform: rotate(12deg); }
</style>
