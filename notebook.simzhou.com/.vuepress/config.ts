import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'

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
  theme: defaultTheme({
    logo: '/doraemon_winter_circle.png',
    navbar: [
      { text: '导航', link: '/guide/' },
      { text: '资源', link: '/resource/' },
      {
        text: '算法',
        children: [
          { text: '算法导航页', link: '/algo/' },
          { text: '算法与数据结构', link: '/algo/ds-algo/pending.html' },
          { text: 'Leetcode刷题总结', link: '/algo/ds-algo/leetcode/' },
          { text: '机器学习算法', link: '/algo/machine-learning/ml_big_map.html' },
          {
            text: '吴恩达《机器学习公开课》笔记',
            link: '/algo/machine-learning/Machine-Learning-Andrew-Ng/Notes-01.html',
          },
        ],
      },
      { text: 'NLP', link: '/NLP/' },
      {
        text: '计算机基础',
        children: [
          { text: '计算机网络', link: '/cs-basics/network/' },
        ],
      },
      { text: '阅读', link: '/reading/' },
    ],
    sidebar: {
      '/guide/': [
        {
          text: '导航',
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
          text: '机器学习',
          collapsible: false,
          children: [
            '/algo/machine-learning/ml_big_map.md',
            '/algo/machine-learning/datasets.md',
            '/algo/machine-learning/optimizer.md',
            '/algo/machine-learning/xgboost.md',
            '/algo/machine-learning/Machine-Learning-Andrew-Ng/Notes-01.md',
            '/algo/machine-learning/Machine-Learning-Andrew-Ng/Notes-02.md',
            '/algo/machine-learning/Machine-Learning-Andrew-Ng/Notes-03.md',
            '/algo/machine-learning/Machine-Learning-Andrew-Ng/Notes-04.md',
            '/algo/machine-learning/Machine-Learning-Andrew-Ng/Notes-05.md',
            '/algo/machine-learning/Machine-Learning-Andrew-Ng/Notes-06.md',
            '/algo/machine-learning/Machine-Learning-Andrew-Ng/Notes-07.md',
            '/algo/machine-learning/Machine-Learning-Andrew-Ng/Notes-08.md',
            '/algo/machine-learning/Machine-Learning-Andrew-Ng/Notes-09.md',
          ],
        },
      ],
      '/NLP/': [
        {
          text: 'NLP',
          collapsible: false,
          children: [
            '/NLP/',
            '/NLP/nlp_big_map.md',
            '/NLP/Assignment01/',
            '/NLP/Assignment02/',
            '/NLP/Assignment03/',
            '/NLP/Assignment04/',
            '/NLP/Assignment10/',
            '/NLP/Assignment11/',
            '/NLP/Assignment12/',
            '/NLP/Assignment13/',
            '/NLP/Assignment14/',
            '/NLP/Assignment16/',
            '/NLP/proj01/',
            '/NLP/proj02/',
          ],
        },
      ],
    },
  }),
})
