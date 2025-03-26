<template>
  <div class="about">
    <BackHome />
    <div class="card">
      <div class="avatar">
        <!-- 替换占位符为实际图片 -->
        <img src="@/assets/avatar.png" alt="头像" class="avatar-img">
      </div>
      <h1 class="title">个人信息</h1>
      <div class="info-container">
        <div class="info-item">
          <span class="label">姓名：</span>
          <span class="value">王爽</span>
        </div>
        <div class="info-item">
          <span class="label">学校：</span>
          <span class="value">湖北工业大学</span>
        </div>
        <div class="info-item">
          <span class="label">院系：</span>
          <span class="value">软件工程</span>
        </div>
        <div class="info-item">
          <span class="label">班级：</span>
          <span class="value">软件4班</span>
        </div>
        <div class="info-item">
          <span class="label">QQ：</span>
          <span class="value">2460252306</span>
        </div>
        <div class="info-item">
          <span class="label">GitHub：</span>
          <a href="https://github.com/yourusername" target="_blank" class="value link">
            github.com/yourusername
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import BackHome from '@/Components/BackHome.vue'
</script>

<style scoped>
.about {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
  padding: 20px;
}

.card {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 30px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.avatar {
  margin: 0 auto 20px;
  width: 120px;
  height: 120px;
  border-radius: 60px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* 由于是黑白图片，可以添加一个微小的背景色 */
  background-color: #fff;
}

.title {
  color: #333;
  margin-bottom: 30px;
  font-size: 1.8rem;
}

.info-container {
  text-align: left;
}

.info-item {
  margin: 15px 0;
  padding: 10px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.5);
  transition: all 0.3s ease;
}

.info-item:hover {
  background: rgba(255, 255, 255, 0.8);
  transform: translateX(5px);
}

.label {
  color: #666;
  font-weight: bold;
  margin-right: 10px;
  min-width: 70px;
  display: inline-block;
}

.value {
  color: #333;
}

.link {
  color: #007bff;
  text-decoration: none;
  transition: color 0.3s ease;
}

.link:hover {
  color: #0056b3;
  text-decoration: underline;
}

@media (max-width: 600px) {
  .card {
    margin: 10px;
    padding: 20px;
  }
  
  .info-item {
    margin: 10px 0;
  }
}
</style> 