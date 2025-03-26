export interface Article {
  id: number
  title: string
  date: string
  tags?: string[]
  category: string
  content?: string  // content 将通过动态加载获取
  comments?: Comment[]  // 添加评论数组属性
}

export interface Comment {
  id: number
  author: string
  content: string
  date: string
  replies?: Comment[]
}

// 文章分类
export const categories = [
  '全部',
  '技术',
  '随笔',
  '生活',
  '学习笔记'
]

export const articles: Article[] = [
  {
    id: 1,
    title: '我的第一篇博客',
    date: '2024-01-20',
    tags: ['生活', '随笔'],
    category: '随笔'
  },
  {
    id: 2,
    title: 'Vue3 学习笔记',
    date: '2024-01-21',
    tags: ['Vue', '前端', '学习笔记'],
    category: '学习笔记'
  }
] 