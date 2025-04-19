<template>
  <div class="contact-card">
    <h3 class="contact-title">{{ contact.title }}</h3>
    <div class="contact-content" v-html="contact.content"></div>
  </div>
</template>

<script>
export default {
  name: 'ContactCard',
  props: {
    contact: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.contact-card {
  flex: 1;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  padding: 1.5rem;
  text-align: center;
  transition: background 0.3s ease, transform 0.3s ease;
  cursor: pointer;
}

.contact-card:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-5px);
}

.contact-title {
  margin: 0 0 0.5rem;
  font-size: 1.25rem;
  font-weight: 600;
  color: #fff;
}

.contact-content a {
  color: var(--link-color, #9acd32);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
}

.contact-content a:hover {
  color: var(--link-hover-color, #d2e85f);
}
</style>
