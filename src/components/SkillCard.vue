<template>
  <div
    class="skill-card"
    :style="{ '--overflow-color': skill.hoverColor }"
    @mouseenter="onEnter"
    @mouseleave="onLeave"
  >
    <img :src="skill.image" alt="" class="skill-image" />
    <div class="skill-text">
        <a :href="skill.link" target="_blank" rel="noopener noreferrer">
            {{ skill.displayName }}
        </a>
    </div>
    <!-- Hidden by default, animates open on hover -->
    <div
      v-if="skill.description"
      class="skill-desc"
    >
      {{ skill.description }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    skill: {
      type: Object,
      required: true
    }
  },
  methods: {
    onEnter() {
      document.documentElement.style.setProperty(
        '--hover-overlay',
        this.skill.hoverColor
      );
    },
    onLeave() {
      document.documentElement.style.setProperty(
        '--hover-overlay',
        'transparent'
      );
    }
  }
};
</script>

<style scoped>
.skill-card {
  position: relative;
  width: calc((100% - 2rem) / 3);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 1rem;
  text-align: center;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 0.5rem;
  transition: background 0.3s ease;
  overflow: hidden;
  z-index: 2;
}

/* Darken background on hover */
.skill-card:hover {
  background: rgba(0, 0, 0, 0.7);
}

.skill-image {
  display: block;
  margin: 0 auto;
  width: auto;
  min-height: 80px;
  max-height: 80px;
  object-fit: contain;
  background-color: var(--overflow-color);
  padding: 0.5rem;
}

.skill-text {
  margin-top: 0.5rem;
  color: #fff;
  font-weight: bold;
}

/* DESCRIPTION: collapsed by default */
.skill-desc {
  margin-top: 0.5rem;
  color: #ddd;
  font-size: 0.9rem;
  line-height: 1.3;
  max-height: 0;
  opacity: 0;
  overflow: hidden;
  transition:
    max-height 0.3s ease,
    opacity 0.3s ease;
}

/* When you hover the card, this expands */
.skill-card:hover .skill-desc {
  max-height: 5rem; /* Todo: Might need adjusting? */
  opacity: 1;
}
</style>
