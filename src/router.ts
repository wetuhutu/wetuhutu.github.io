import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Home from './views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('./views/About.vue'),
    props: true,
    meta: { title: '关于我' }
  },
  {
    path: '/articles',
    name: 'Articles',
    component: () => import('./views/Articles.vue'),
    meta: { title: '文章' }
  },
  {
    path: '/categories',
    name: 'Categories',
    component: () => import('./views/Categories.vue'),
    meta: { title: '目录' }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('./views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title || 'Welcome'} | 我的博客`
  next()
})

export default router