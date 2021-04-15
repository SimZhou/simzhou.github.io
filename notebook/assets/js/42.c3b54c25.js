(window.webpackJsonp=window.webpackJsonp||[]).push([[42],{410:function(t,r,e){"use strict";e.r(r);var a=e(42),_=Object(a.a)({},(function(){var t=this,r=t.$createElement,e=t._self._c||r;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h2",{attrs:{id:"项目2-情感细粒度分类"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#项目2-情感细粒度分类"}},[t._v("#")]),t._v(" 项目2 情感细粒度分类")]),t._v(" "),e("h3",{attrs:{id:"_1-introduction"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_1-introduction"}},[t._v("#")]),t._v(" 1. Introduction")]),t._v(" "),e("p",[t._v("在自然语言处理中，有一个常见的问题就是"),e("strong",[t._v("对客户的评价进行分析")]),t._v("。 这些用户评论中，包含了大量的有用信息，例如"),e("strong",[t._v("情感分析")]),t._v("，或者"),e("strong",[t._v("相关事实描述")]),t._v("。 例如:")]),t._v(" "),e("p",[t._v("“味道不错的面馆，性价比也相当之高，分量很足～女生吃小份，胃口 小的，可能吃不完呢。环境在面馆来说算是好的，至少看上去堂子很 亮，也比较干净，一般苍蝇馆子还是比不上这个卫生状况的。中午饭 点的时候，人很多，人行道上也是要坐满的，隔壁的冒菜馆子，据说 是一家，有时候也会开放出来坐吃面的人。“")]),t._v(" "),e("p",[t._v("首先情感是正向的，除此之外我们还能够进行知道这个的几个事实描述：1. 性价比比较高； 2. 装修比较好； 3. 分量足。")]),t._v(" "),e("h3",{attrs:{id:"_2-method"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_2-method"}},[t._v("#")]),t._v(" 2. Method")]),t._v(" "),e("h4",{attrs:{id:"_2-1-data-source"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_2-1-data-source"}},[t._v("#")]),t._v(" 2.1 Data source")]),t._v(" "),e("p",[t._v("AI Challenger 2019 中情感细粒度分类任务数据集")]),t._v(" "),e("p",[t._v("竞赛数据，描述，参考资料（包括第一名的思路和代码）："),e("a",{attrs:{href:"https://blog.csdn.net/lrt366/article/details/89244735",target:"_blank",rel:"noopener noreferrer"}},[t._v("AI Challenger 2018情感分析赛道资料汇总"),e("OutboundLink")],1)]),t._v(" "),e("h4",{attrs:{id:"_2-2-model"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_2-2-model"}},[t._v("#")]),t._v(" 2.2 Model")]),t._v(" "),e("p",[t._v("本次的任务，"),e("strong",[t._v("输出端")]),t._v("本质上是一个"),e("strong",[t._v("多分类的多分类问题")]),t._v("（有20个输出信息，每个信息有4个类别，分别是1（正面），0（中性），-1（负面），-2（未提及））")]),t._v(" "),e("p",[t._v("而"),e("strong",[t._v("输入端")]),t._v("是一篇短评，因此少不了自然语言的预处理，分词分句清洗等，然后做词嵌入进行输入。")]),t._v(" "),e("p",[t._v("输入和输出都是确定的，因此"),e("strong",[t._v("本次项目2的重点")]),t._v("就在于"),e("strong",[t._v("模型部分的构建和优化")]),t._v("。另外，前端和后端的构建也是比较重要的。")]),t._v(" "),e("h4",{attrs:{id:"_2-3-模型的评价指标"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_2-3-模型的评价指标"}},[t._v("#")]),t._v(" 2.3 模型的评价指标")]),t._v(" "),e("p",[t._v("Precision, Recall, AUC. 竞赛官方好像使用的是F1值作为评价指标")]),t._v(" "),e("h3",{attrs:{id:"_3-任务分配"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_3-任务分配"}},[t._v("#")]),t._v(" 3. 任务分配")]),t._v(" "),e("h4",{attrs:{id:"_3-1-前端"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_3-1-前端"}},[t._v("#")]),t._v(" 3.1 前端")]),t._v(" "),e("p",[t._v("前端的设计，需要包含如下内容：")]),t._v(" "),e("ol",[e("li",[e("p",[t._v("一个输入框，用来输入短评")])]),t._v(" "),e("li",[e("p",[t._v("“分析”按钮，用来把文本发送到后端并激活分析函数")])]),t._v(" "),e("li",[e("p",[t._v("一个把分析结果可视化出来的组件：")]),t._v(" "),e("ul",[e("li",[e("p",[t._v("根据项目指导ppt，建议用"),e("a",{attrs:{href:"https://github.com/d3/d3/wiki/Gallery",target:"_blank",rel:"noopener noreferrer"}},[t._v("D3.js"),e("OutboundLink")],1),t._v("中的这三个组件中的一个："),e("a",{attrs:{href:"https://bl.ocks.org/mbostock/4061961",target:"_blank",rel:"noopener noreferrer"}},[t._v("Bullet Charts"),e("OutboundLink")],1),t._v("，"),e("a",{attrs:{href:"https://observablehq.com/@d3/cluster-dendrogram",target:"_blank",rel:"noopener noreferrer"}},[t._v("Cluster Dendrogram"),e("OutboundLink")],1),t._v("，"),e("a",{attrs:{href:"https://bl.ocks.org/davidwclin/ad5d13db260caeffe9b3",target:"_blank",rel:"noopener noreferrer"}},[t._v("Radial Boxplot"),e("OutboundLink")],1)])]),t._v(" "),e("li",[e("p",[e("a",{attrs:{href:"https://www.echartsjs.com/examples/zh/index.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("Echarts"),e("OutboundLink")],1),t._v("是备选，其中："),e("a",{attrs:{href:"https://www.echartsjs.com/examples/zh/editor.html?c=scatter-single-axis",target:"_blank",rel:"noopener noreferrer"}},[t._v("单轴散点图"),e("OutboundLink")],1),t._v("，"),e("a",{attrs:{href:"https://www.echartsjs.com/examples/zh/editor.html?c=tree-basic",target:"_blank",rel:"noopener noreferrer"}},[t._v("树图"),e("OutboundLink")],1),t._v("，"),e("a",{attrs:{href:"https://www.echartsjs.com/examples/zh/editor.html?c=radar",target:"_blank",rel:"noopener noreferrer"}},[t._v("雷达图"),e("OutboundLink")],1),t._v(" 可以作为上面D3中三个组件的替代品。")])])])])]),t._v(" "),e("p",[t._v("可选内容：“随便试试”功能，点一下，就会在数据库中的已有数据中随机选择一条，展示出来。")]),t._v(" "),e("h4",{attrs:{id:"_3-2-后端"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_3-2-后端"}},[t._v("#")]),t._v(" 3.2 后端")]),t._v(" "),e("p",[t._v("后端的end_to_end：输入一篇评论，输出各个标签的分类值。")]),t._v(" "),e("h4",{attrs:{id:"_3-3-模型"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_3-3-模型"}},[t._v("#")]),t._v(" 3.3 模型")]),t._v(" "),e("p",[t._v("模型的优化可以是一个持续的过程，但在这次项目中我们至少要有一个高于Baseline的模型，作为作业上交。")]),t._v(" "),e("p",[t._v("资料："),e("a",{attrs:{href:"https://blog.csdn.net/lrt366/article/details/89244735",target:"_blank",rel:"noopener noreferrer"}},[t._v("AI Challenger 2018情感分析赛道资料汇总"),e("OutboundLink")],1)]),t._v(" "),e("h4",{attrs:{id:"_3-4-总结及重要性优先级"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_3-4-总结及重要性优先级"}},[t._v("#")]),t._v(" 3.4 总结及重要性优先级")]),t._v(" "),e("p",[t._v("根据项目指导，我们的项目计划和优先级应该是：")]),t._v(" "),e("ol",[e("li",[t._v("复现前人的Baseline（优先级："),e("strong",[t._v("高")]),t._v("）")]),t._v(" "),e("li",[t._v("完成end-to-end（优先级："),e("strong",[t._v("高")]),t._v("）")]),t._v(" "),e("li",[t._v("模型调优（至少需要调出一个比Baseline好的模型，再网上的调优根据精力来做，保证其它步骤先完成）\n"),e("ul",[e("li",[t._v("模型调优时可以多个人分别尝试不同开源模型或优化手段，然后选取效果最好的")])])]),t._v(" "),e("li",[t._v("完成前后端交互及展示（优先级："),e("strong",[t._v("高")]),t._v("）")])])])}),[],!1,null,null,null);r.default=_.exports}}]);