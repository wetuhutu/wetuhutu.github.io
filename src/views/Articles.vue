<template>
  <div class="articles-page">
    <BackHome />
    
    <!-- 左侧导航栏 -->
    <div class="sidebar">
      <div class="search-box">
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="搜索文章..."
          @input="handleSearch"
        >
      </div>

      <div class="category-filter">
        <select v-model="currentCategory">
          <option v-for="category in categories" 
                  :key="category" 
                  :value="category">
            {{ category }}
          </option>
        </select>
      </div>

      <h2 class="sidebar-title">文章目录</h2>
      <nav class="nav-list">
        <div 
          v-for="article in filteredArticles" 
          :key="article.id"
          class="nav-item"
          :class="{ active: currentArticle?.id === article.id }"
          @click="selectArticle(article)"
        >
          <div class="article-nav-title">{{ article.title }}</div>
          <div class="article-nav-meta">
            <span class="date">{{ article.date }}</span>
            <span class="category">{{ article.category }}</span>
            <div class="tags">
              <span v-for="tag in article.tags" 
                    :key="tag" 
                    class="tag">{{ tag }}</span>
            </div>
          </div>
        </div>
      </nav>
    </div>

    <!-- 右侧文章内容 -->
    <div class="content">
      <div class="article" v-if="currentArticle">
        <h1 class="article-title">{{ currentArticle.title }}</h1>
        <div class="article-meta">
          <span class="date">发布时间：{{ currentArticle.date }}</span>
          <span class="category">分类：{{ currentArticle.category }}</span>
          <div class="tags">
            <span v-for="tag in currentArticle.tags" 
                  :key="tag" 
                  class="tag">{{ tag }}</span>
          </div>
        </div>
        <div class="article-content markdown-body" v-html="compiledContent"></div>

        <!-- 评论区 -->
        <div class="comments-section">
          <h3>评论</h3>
          <div class="comment-form">
            <input v-model="newComment.author" placeholder="您的名字">
            <textarea v-model="newComment.content" placeholder="写下您的评论..."></textarea>
            <button @click="submitComment">提交评论</button>
          </div>
          
          <div class="comments-list">
            <div v-for="comment in currentArticle.comments" 
                 :key="comment.id" 
                 class="comment">
              <div class="comment-header">
                <strong>{{ comment.author }}</strong>
                <span>{{ comment.date }}</span>
              </div>
              <div class="comment-content">{{ comment.content }}</div>
              
              <!-- 回复按钮 -->
              <div class="comment-actions">
                <button class="reply-btn" @click="showReplyForm(comment.id)">
                  回复
                </button>
              </div>
              
              <!-- 回复表单 -->
              <div v-if="replyingTo === comment.id" class="reply-form">
                <input v-model="newReply.author" placeholder="您的名字">
                <textarea v-model="newReply.content" placeholder="写下您的回复..."></textarea>
                <div class="reply-actions">
                  <button @click="submitReply(comment)">提交回复</button>
                  <button class="cancel-btn" @click="cancelReply">取消</button>
                </div>
              </div>
              
              <!-- 显示回复列表 -->
              <div class="comment-replies" v-if="comment.replies?.length">
                <div v-for="reply in comment.replies" 
                     :key="reply.id" 
                     class="reply">
                  <div class="reply-header">
                    <strong>{{ reply.author }}</strong>
                    <span>{{ reply.date }}</span>
                  </div>
                  <div class="reply-content">{{ reply.content }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import BackHome from '@/Components/BackHome.vue'
import { articles, categories, type Article, type Comment } from '@/data/articles'
import { marked } from 'marked'

const articleList = ref(articles)
const currentArticle = ref<Article | null>(null)
const articleContent = ref('')
const searchQuery = ref('')
const currentCategory = ref('全部')

// 添加回复相关的状态
const replyingTo = ref<number | null>(null)
const newReply = ref({
  author: '',
  content: ''
})

// 搜索和筛选
const filteredArticles = computed(() => {
  return articleList.value.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         (article.content && article.content.toLowerCase().includes(searchQuery.value.toLowerCase()))
    const matchesCategory = currentCategory.value === '全部' || 
                           article.category === currentCategory.value
    return matchesSearch && matchesCategory
  })
})

// 评论功能
const newComment = ref({
  author: '',
  content: ''
})

// 修改解析方法
const loadArticleContent = async (id: number) => {
  try {
    const content = await import(`../articles/${id}.md?raw`)
    const text = content.default
    
    // 手动解析 frontmatter
    const parts = text.split('---')
    if (parts.length >= 3) {
      // 去掉 frontmatter，只保留内容部分
      articleContent.value = parts.slice(2).join('---').trim()
    } else {
      articleContent.value = text
    }
  } catch (error) {
    console.error('加载文章失败:', error)
    articleContent.value = '加载文章内容失败'
  }
}

// 选择文章
const selectArticle = async (article: Article) => {
  currentArticle.value = article
  await loadArticleContent(article.id)
}

// 转换 Markdown 为 HTML
const compiledContent = computed(() => {
  return marked(articleContent.value)
})

const submitComment = () => {
  if (!currentArticle.value || !newComment.value.author || !newComment.value.content) return

  const comment: Comment = {
    id: Date.now(),
    author: newComment.value.author,
    content: newComment.value.content,
    date: new Date().toLocaleString()
  }

  if (!currentArticle.value.comments) {
    currentArticle.value.comments = []
  }
  
  currentArticle.value.comments.push(comment)
  newComment.value = { author: '', content: '' }
}

// 显示回复表单
const showReplyForm = (commentId: number) => {
  replyingTo.value = commentId
  newReply.value = { author: '', content: '' }
}

// 取消回复
const cancelReply = () => {
  replyingTo.value = null
  newReply.value = { author: '', content: '' }
}

// 提交回复
const submitReply = (parentComment: Comment) => {
  if (!currentArticle.value || !newReply.value.author || !newReply.value.content) return
  
  const reply: Comment = {
    id: Date.now(),
    author: newReply.value.author,
    content: newReply.value.content,
    date: new Date().toLocaleString()
  }
  
  if (!parentComment.replies) {
    parentComment.replies = []
  }
  
  parentComment.replies.push(reply)
  
  // 重置表单并隐藏
  cancelReply()
}

// 初始加载第一篇文章
onMounted(async () => {
  if (articles.length > 0) {
    await selectArticle(articles[0])
  }
})

const handleSearch = () => {
  // 实现搜索逻辑
}
</script>

<style scoped>
/* 修改主容器样式 */
.articles-page {
  display: flex;
  height: 100vh; /* 使用视口高度 */
  overflow: hidden; /* 防止主容器出现滚动条 */
  padding-top: 60px; /* 为返回按钮留出空间 */
}

/* 修改侧边栏样式 */
.sidebar {
  width: 250px;
  height: calc(100vh - 60px); /* 减去顶部padding的高度 */
  position: fixed;
  left: 0;
  top: 60px; /* 与顶部padding对应 */
  background: #f8f9fa;
  border-right: 1px solid #eee;
  overflow-y: auto; /* 只在侧边栏显示滚动条 */
  padding: 20px 0;
}

/* 修改内容区样式 */
.content {
  flex: 1;
  margin-left: 250px;
  height: calc(100vh - 60px);
  overflow-y: auto;
  padding: 20px 40px; /* 恢复原来的内边距设置 */
}

/* 自定义滚动条样式 */
.sidebar::-webkit-scrollbar,
.content::-webkit-scrollbar {
  width: 12px;
}

.sidebar::-webkit-scrollbar-track,
.content::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 6px;
}

.sidebar::-webkit-scrollbar-thumb,
.content::-webkit-scrollbar-thumb {
  background: #2196F3;
  border-radius: 6px;
  border: 2px solid #f1f1f1;
}

.sidebar::-webkit-scrollbar-thumb:hover,
.content::-webkit-scrollbar-thumb:hover {
  background: #1976D2;
}

/* 禁用body的滚动条 */
:global(body) {
  overflow: hidden;
}

.sidebar-title {
  padding: 0 20px;
  margin-bottom: 20px;
  color: #333;
}

.nav-list {
  display: flex;
  flex-direction: column;
}

.nav-item {
  padding: 12px 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  border-left: 3px solid transparent;
}

.nav-item:hover {
  background: #eee;
}

.nav-item.active {
  background: #e9ecef;
  border-left-color: #007bff;
  color: #007bff;
}

.article {
  max-width: 800px;
  margin: 0 auto;
  /* 移除之前添加的内边距 */
}

.article-title {
  font-size: 2rem;
  color: #333;
  margin-bottom: 1rem;
}

.article-meta {
  color: #666;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
}

.article-nav-meta {
  font-size: 0.8rem;
  color: #666;
  margin-top: 4px;
}

.tags {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
  margin-top: 4px;
}

.tag {
  padding: 2px 6px;
  background: #e9ecef;
  border-radius: 4px;
  font-size: 0.75rem;
  color: #666;
}

.article-content {
  margin-top: 2rem;
  line-height: 1.6;
}

/* Markdown 样式 */
.markdown-body {
  color: #24292e;
}

.markdown-body h1 {
  font-size: 2em;
  margin-bottom: 1em;
}

.markdown-body h2 {
  font-size: 1.5em;
  margin: 1em 0;
}

.markdown-body p {
  margin: 1em 0;
}

.markdown-body code {
  background-color: #f6f8fa;
  padding: 0.2em 0.4em;
  border-radius: 3px;
}

.markdown-body pre {
  background-color: #f6f8fa;
  padding: 16px;
  border-radius: 6px;
  overflow: auto;
}

.search-box {
  padding: 0 20px;
  margin-bottom: 15px;
}

.search-box input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.category-filter {
  padding: 0 20px;
  margin-bottom: 15px;
}

.category-filter select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.comments-section {
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.comment-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

.comment-form input,
.comment-form textarea {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.comment-form textarea {
  min-height: 100px;
}

.comment-form button {
  padding: 8px 16px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.comment {
  margin-bottom: 20px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 4px;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  color: #666;
}

.comment-actions {
  margin-top: 10px;
}

.reply-btn {
  background: transparent;
  color: #007bff;
  border: 1px solid #007bff;
  padding: 4px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s ease;
}

.reply-btn:hover {
  background: #f0f7ff;
}

.reply-form {
  margin-top: 15px;
  margin-bottom: 15px;
  padding: 15px;
  background: #f0f7ff;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.reply-form input,
.reply-form textarea {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.reply-form textarea {
  min-height: 80px;
}

.reply-actions {
  display: flex;
  gap: 10px;
}

.reply-actions button {
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
}

.reply-actions button:first-child {
  background: #007bff;
  color: white;
  border: none;
}

.cancel-btn {
  background: transparent;
  color: #666;
  border: 1px solid #ddd;
}

.reply {
  margin-top: 15px;
  padding: 12px;
  background: #fff;
  border-left: 3px solid #007bff;
  border-radius: 0 4px 4px 0;
}

.reply-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 0.9rem;
  color: #666;
}

.reply-content {
  color: #333;
}

.comment-replies {
  margin-top: 15px;
  margin-left: 15px;
  padding-left: 15px;
  border-left: 1px dashed #ddd;
}
</style> 