<template>
  <div class="home">
    <div class="content">
      <div class="welcome-text">Welcome</div>
      <nav class="nav-buttons">
        <router-link to="/about" class="nav-btn">关于我</router-link>
        <router-link to="/articles" class="nav-btn">文章</router-link>
        <router-link to="/categories" class="nav-btn">目录</router-link>
      </nav>
    </div>
  </div>
</template>

<script lang="ts" setup>
</script>

<style scoped>
.home {
  width: 100%;
  height: 100vh;
  background-image: url('@/assets/background.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  position: relative;
}

.home::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 1;
}

.content {
  position: relative;
  z-index: 2;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.welcome-text {
  font-size: 5rem;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  margin-bottom: 2rem;
  animation: fadeIn 2s ease-in;
}

.nav-buttons {
  display: flex;
  gap: 20px;
}

.nav-btn {
  padding: 12px 24px;
  border: 2px solid rgba(255, 255, 255, 0.8);
  border-radius: 25px;
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  text-decoration: none;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
}

.nav-btn:hover {
  background-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-3px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style> 