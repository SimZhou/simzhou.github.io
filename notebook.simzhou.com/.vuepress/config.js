// vuepress的所有配置项文档：https://vuepress.vuejs.org/zh/config/#patterns

module.exports = {
	// 文档根目录
	base: '/notebook/',
	// 输出目录
	dest: 'public/notebook',
	// 网站标题，显示在主页左上角，以及浏览器标签上
	title: 'Simon’s Notebook',
	// 网站描述
	description: 'A Technical Notebook - Simon的技术笔记',
	// head设置，注入到当前页面的 HTML <head> 中的标签
	head: [
		['link', 
			{ rel: 'icon', href: '/doraemon_winter_circle.png' }
			// 浏览器的标签栏的网页图标，第一个'/'会遍历public文件夹的文件
		],
	],
	// 主题设置
	themeConfig: {
		// Header左上角Logo
		logo: '/doraemon_winter_circle.png',
		// 导航栏
		nav: [
			{ text: '导航', link: '/guide/' },
			{ text: '资源', link: '/resource/'}, 
			{ text: '前端', 
			  link: '/frontend/',
		  	  items: [
		  	  	  { text: 'Vue踩坑记录', link: '/frontend/bugfix-record/'}
		  	  ]
			}, 
			{ text: '算法', link: '/algo/',
			  items: [
				  { text: '算法与数据结构', link: '/algo/data-structure-and-algo/' },
				  { text: '机器学习', link: '/algo/machine-learning/' }
			  ]
			},
			{ text: '计算机基础', 
			  ariaLabel: '/cs-basics/', // 用于识别的label
			  items: [
				  { text: '计算机网络',  link: '/cs-basics/network/' },
				//   { text: '2', link: '/cs-basics/2/' }
			  ]
			},
			{ text: '阅读', link: '/reading/' }, 
			// { text: '主页', link: 'https://simzhou.com/' }, 
		],
        // sidebar: {
        //     '/guide/':[
		// 		{
		// 			title: '测试1菜单1',   // 一级菜单名称
		// 			collapsable: false, // false为默认展开菜单, 默认值true是折叠,
		// 			sidebarDepth: 2,    //  设置侧边导航自动提取markdown文件标题的层级，默认1为h2层级
		// 			children: [
		// 				['test1.md', '子菜单1'],  //菜单名称为'子菜单1'，跳转至/pages/folder1/test1.md
		// 				['test3.md', '子菜单2']
		// 			]
		// 		},
		// 		{
		// 			title: '测试菜单2',
		// 			collapsable: false, 
		// 			children: [
		// 				['test2.md', '子菜单1']
		// 			]
		// 		}
		// 	],
        //     '/resource/':[
		// 		{
		// 			title: '资源2',
		// 			link: '/resource/', 
		// 			collapsable: false, 
		// 			// children: [
		// 			// 	['', '12']
		// 			// ]
		// 		},
		// 		{
		// 			title: '资源',   // 一级菜单名称
		// 			collapsable: false, // false为默认展开菜单, 默认值true是折叠,
		// 			sidebarDepth: 2,    //  设置侧边导航自动提取markdown文件标题的层级，默认1为h2层级
		// 			children: [
		// 				['前端工具.md', '前端工具'],  //菜单名称为'子菜单1'，跳转至/pages/folder1/test1.md
		// 			]
		// 		},
		// 	], 
		// 	'/cs/': [
				
		// 	],
		// },
		// sidebar: [
		// 	// '/',
		// 	'/guide/',
		// 	['/notebook/', 'Good']
		// ],

		// 显示所有（非活动页面）标题组成的链接
		displayAllHeaders: true, // 默认值：false
		// 滚动操作是否改变标题链接的显示
		activeHeaderLinks: false, // 默认值：true
	},
	// 显示上次git commit的时间
	lastUpdated: '上次更新：',
	// 默认值是 true 。设置为 false 来禁用所有页面的 下一篇 链接
    nextLinks: true,
    // 默认值是 true 。设置为 false 来禁用所有页面的 上一篇 链接
    prevLinks: true,
	// 页面滚动 Not sure what it is
	smoothScroll: true
}