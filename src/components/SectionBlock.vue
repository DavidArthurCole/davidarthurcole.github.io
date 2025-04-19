<template>
    <div class="section-block">
        <h2>{{ section.title }}</h2>
        <div v-html="section.content"></div>
    </div>
</template>

<script>
export default {
    props: {
        section: {
            type: Object,
            required: true
        }
    }
};
</script>

<style scoped>
.section-block {
    margin-bottom: 2rem;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 0.5rem;
    color: #fff;
}

.section-block h2 {
    margin-top: 0;
}
</style>