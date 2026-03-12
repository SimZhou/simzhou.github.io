import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { katex } from '@mdit/plugin-katex'
import { defineUserConfig } from 'vuepress'

const andrewNgNotes = [
  { text: '1. 机器学习简介', link: '/algo/machine-learning/Machine-Learning-Andrew-Ng/Notes-01.html' },
  { text: '2. 一元线性回归', link: '/algo/machine-learning/Machine-Learning-Andrew-Ng/Notes-02.html' },
  { text: '3. 线性代数复习', link: '/algo/machine-learning/Machine-Learning-Andrew-Ng/Notes-03.html' },
  { text: '4. 多元线性回归', link: '/algo/machine-learning/Machine-Learning-Andrew-Ng/Notes-04.html' },
  { text: '5. Octave 教程', link: '/algo/machine-learning/Machine-Learning-Andrew-Ng/Notes-05.html' },
  { text: '6. 逻辑回归', link: '/algo/machine-learning/Machine-Learning-Andrew-Ng/Notes-06.html' },
  { text: '7. 正则化', link: '/algo/machine-learning/Machine-Learning-Andrew-Ng/Notes-07.html' },
  { text: '8. 神经网络: 表征', link: '/algo/machine-learning/Machine-Learning-Andrew-Ng/Notes-08.html' },
  { text: '9. 神经网络: 学习', link: '/algo/machine-learning/Machine-Learning-Andrew-Ng/Notes-09.html' },
]

const nlpAssignments = [
  { text: '第1节 基于语法树和概率的 AI 模型', link: '/NLP/Assignment01/' },
  { text: '第2节 BFS / DFS 与机器学习初步', link: '/NLP/Assignment02/' },
  { text: '第3节 机器学习及模型评价初步', link: '/NLP/Assignment03/' },
  { text: '第4节 神经网络及训练算法介绍', link: '/NLP/Assignment04/' },
  { text: '第10节 机器学习算法', link: '/NLP/Assignment10/' },
  { text: '第11节 动态规划与编辑距离', link: '/NLP/Assignment11/' },
  { text: '第12节 关键词提取 / NER / 依存分析', link: '/NLP/Assignment12/' },
  { text: '第13节 检索系统与对话系统', link: '/NLP/Assignment13/' },
  { text: '第14节 面向服务的对话机器人', link: '/NLP/Assignment14/' },
  { text: '第16节 强化学习入门', link: '/NLP/Assignment16/' },
]

export default defineUserConfig({
  lang: 'zh-CN',
  title: 'Simon’s Notebook',
  description: 'A Technical Notebook - Simon的技术笔记',
  base: '/notebook/',
  dest: 'docs/notebook',
  head: [
    ['link', { rel: 'icon', href: '/doraemon_winter_circle.png' }],
  ],
  bundler: viteBundler(),
  extendsMarkdown: (md) => {
    md.use(katex)
  },
  theme: defaultTheme({
    logo: '/doraemon_winter_circle.png',
    navbar: [
      { text: '导航', link: '/guide/' },
      { text: '算法', link: '/algo/' },
      { text: 'NLP', link: '/NLP/' },
      { text: '计算机基础', link: '/cs-basics/network/' },
      { text: '资源', link: '/resource/' },
      { text: '阅读', link: '/reading/' },
    ],
    sidebar: {
      '/guide/': [
        {
          text: '开始',
          children: ['/guide/'],
        },
      ],
      '/resource/': [
        {
          text: '资源',
          children: ['/resource/', '/resource/前端工具.md'],
        },
      ],
      '/reading/': [
        {
          text: '阅读',
          children: ['/reading/', '/reading/wishlist.md'],
        },
      ],
      '/cs-basics/': [
        {
          text: '计算机基础',
          children: ['/cs-basics/network/'],
        },
      ],
      '/algo/': [
        {
          text: '算法导航',
          children: ['/algo/'],
        },
        {
          text: '算法与数据结构',
          collapsible: false,
          children: [
            '/algo/ds-algo/pending.md',
            '/algo/ds-algo/sorting-algorithms.md',
            '/algo/ds-algo/dijkstras.md',
            '/algo/ds-algo/A-star.md',
            '/algo/ds-algo/leetcode/',
          ],
        },
        {
          text: '机器学习基础',
          collapsible: false,
          children: [
            { text: '机器学习概览', link: '/algo/machine-learning/ml_big_map.html' },
            { text: '数据集整理', link: '/algo/machine-learning/datasets.html' },
            { text: '优化器', link: '/algo/machine-learning/optimizer.html' },
            { text: 'XGBoost', link: '/algo/machine-learning/xgboost.html' },
          ],
        },
        {
          text: '吴恩达《机器学习》笔记',
          collapsible: false,
          children: andrewNgNotes,
        },
      ],
      '/NLP/': [
        {
          text: 'NLP 导航',
          children: [
            { text: 'NLP 主页', link: '/NLP/' },
            { text: 'NLP Big Map', link: '/NLP/nlp_big_map.html' },
          ],
        },
        {
          text: '课程作业',
          collapsible: false,
          children: nlpAssignments,
        },
        {
          text: '项目',
          collapsible: false,
          children: [
            { text: '项目1 非监督文本摘要', link: '/NLP/proj01/' },
            { text: '项目2 情感细粒度分类', link: '/NLP/proj02/' },
          ],
        },
      ],
    },
  }),
})
