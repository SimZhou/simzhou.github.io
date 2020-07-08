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
	// head: [
		// ['link', 
			// { rel: 'icon', href: '/astroboy_avatar.png' }
			// // 浏览器的标签栏的网页图标，第一个'/'会遍历public文件夹的文件
		// ],
	// ],
	// 主题设置
	themeConfig: {
		// logo: 'astroboy_avatar.png',
		nav: [
			// { text: '首页', link: '/' },
			{ text: '非常', link: '/zh/guide/' },
			{ text: '主页', link: 'https://simzhou.com/' },
			{ text: 'Languages', 
				ariaLabel: 'Language Menu', // 用于识别的label
				items: [
					{ text: 'Chinese',  link: '/language/chinese' },
					{ text: 'Japanese', link: '/language/japanese/' }
				]
			}
		],
        sidebar: {
            '/zh/guide/':[
					{
						title: '测试1菜单1',   // 一级菜单名称
						collapsable: false, // false为默认展开菜单, 默认值true是折叠,
						sidebarDepth: 2,    //  设置侧边导航自动提取markdown文件标题的层级，默认1为h2层级
						children: [
							['test1.md', '子菜单1'],  //菜单名称为'子菜单1'，跳转至/pages/folder1/test1.md
							['test3.md', '子菜单2']
						]
					},
					{
						title: '测试菜单2',
						collapsable: false, 
						children: [
							['test2.md', '子菜单1']
						]
					}
            ],
		},
		// sidebar: [
			// '/',
			// '/zh/guide',
			// ['/page-b', 'Explict link text']
		// ],
		// 显示所有（非活动页面）标题组成的链接
		displayAllHeaders: true, // 默认值：false
		// 滚动操作是否改变标题链接的显示
		activeHeaderLinks: false, // 默认值：true
	},
	// 显示上次git commit的时间
	lastUpdated: '上次更新：',
	// 默认值是 true 。设置为 false 来禁用所有页面的 下一篇 链接
    nextLinks: false,
    // 默认值是 true 。设置为 false 来禁用所有页面的 上一篇 链接
    prevLinks: false,
	// 页面滚动 Not sure what it is
	smoothScroll: true
}