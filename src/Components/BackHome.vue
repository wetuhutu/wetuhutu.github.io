<template>
  <router-link to="/" class="back-home">
    <span class="back-icon">←</span>
    返回主页
  </router-link>
</template>

<script lang="ts" setup>
</script>

<style scoped>
.back-home {
  position: fixed;
  top: 10px;
  left: 20px;
  padding: 10px 20px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 25px;
  color: #333;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  z-index: 100;
}

.back-home:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.back-icon {
  font-size: 1.2em;
}
</style> 