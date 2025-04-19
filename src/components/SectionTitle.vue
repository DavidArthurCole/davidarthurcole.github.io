<template>
  <div class="section-title">
    <div class="divider"></div>
    <h2>{{ title }}</h2>
  </div>
</template>

<script>
export default {
  name: 'SectionTitle',
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.section-title {
  width: 60%;
  margin: 2rem auto 1rem;
  text-align: center;
}

.divider {
  width: 100%;
  height: 2px;
  background-color: rgba(255, 255, 255, 0.3);
  margin-bottom: 0.5rem;
}

h2 {
  margin: 0;
  font-size: 1.75rem;
  font-weight: 600;
  color: #fff;
}
</style>