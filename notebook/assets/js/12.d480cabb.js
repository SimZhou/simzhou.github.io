(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{363:function(e,r,t){"use strict";t.r(r);var a=t(42),n=Object(a.a)({},(function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h1",{attrs:{id:"算法总览"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#算法总览"}},[e._v("#")]),e._v(" 算法总览")]),e._v(" "),t("h2",{attrs:{id:"什么是算法？"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#什么是算法？"}},[e._v("#")]),e._v(" 什么是算法？")]),e._v(" "),t("p",[e._v("斯坦福有一门算法公开课中讲到了一个很经典的例子：大家一定都学过小学乘法，把第二个数的每一位和第一个数相乘，最后再把得到的数相加，就完成了一个简单的两数相乘。大部分人可能都没有怀疑过这个过程，包括之前的我在内，仿佛这么做就是天经地义。但看过这门课之后我发现，原来计算两数相乘还有着别的方法，那就是Karatsuba算法（"),t("a",{attrs:{href:"https://youtu.be/JCbZayFr9RE",target:"_blank",rel:"noopener noreferrer"}},[e._v("Youtube - Karatsuba Multiplication"),t("OutboundLink")],1),e._v("）。对于计算机来说，这个算法可以比小学乘法法更快地得到计算结果（但对于人来说并不是如此）。")]),e._v(" "),t("p",[e._v("不过，也有对于人来说更快的加减乘除算法，那就是速算，最强大脑上的速算比赛就是例子。这些速算法一般都借助了数与数之间的特殊关系来加快心算速度。速算的特点是某一种速算法一般只能适用于某一部分特殊情况，也因此，它并不太适合让计算机来做（需要写很多的规则来适应各种情况）。")]),e._v(" "),t("p",[e._v("上述这些方法都可以被称为算法，这就是我对算法的一个非常感性的认识。")]),e._v(" "),t("p",[e._v("让我们再重新回到问题，什么是算法？先来看一下各种地方对算法的理性的定义：")]),e._v(" "),t("blockquote",[t("p",[e._v("非形式地说，"),t("strong",[e._v("算法")]),e._v("（Algorithm）就是任何"),t("strong",[e._v("良定义")]),e._v("的"),t("strong",[e._v("计算过程")]),e._v("，该过程取某个值或值的集合作为输入并产生某个值或值的集合作为输出。这样，算法就是"),t("strong",[e._v("把输入转换成输出的计算步骤")]),e._v("的一个序列。")])]),e._v(" "),t("p",{attrs:{align:"right"}},[e._v("—— 《算法导论》第3版，第1章")]),e._v(" "),t("blockquote",[t("p",[t("strong",[e._v("算法")]),e._v("（Algorithm）是指"),t("strong",[e._v("解题方案")]),e._v("的"),t("strong",[e._v("准确而完整")]),e._v("的"),t("strong",[e._v("描述")]),e._v("，是一系列解决问题的清晰"),t("a",{attrs:{href:"https://baike.baidu.com/item/%E6%8C%87%E4%BB%A4/3225201",target:"_blank",rel:"noopener noreferrer"}},[e._v("指令"),t("OutboundLink")],1),e._v("，算法代表着用"),t("strong",[e._v("系统的方法")]),e._v("描述"),t("strong",[e._v("解决问题的策略机制")]),e._v("。也就是说，能够对一定规范的"),t("a",{attrs:{href:"https://baike.baidu.com/item/%E8%BE%93%E5%85%A5/32696",target:"_blank",rel:"noopener noreferrer"}},[e._v("输入"),t("OutboundLink")],1),e._v("，在有限时间内获得所要求的输出。如果一个算法有缺陷，或不适合于某个问题，执行这个算法将不会解决这个问题。不同的算法可能用不同的时间、空间或效率来完成同样的任务。一个算法的优劣可以用"),t("a",{attrs:{href:"https://baike.baidu.com/item/%E7%A9%BA%E9%97%B4%E5%A4%8D%E6%9D%82%E5%BA%A6/9664257",target:"_blank",rel:"noopener noreferrer"}},[e._v("空间复杂度"),t("OutboundLink")],1),e._v("与"),t("a",{attrs:{href:"https://baike.baidu.com/item/%E6%97%B6%E9%97%B4%E5%A4%8D%E6%9D%82%E5%BA%A6/1894057",target:"_blank",rel:"noopener noreferrer"}},[e._v("时间复杂度"),t("OutboundLink")],1),e._v("来衡量。")])]),e._v(" "),t("p",{attrs:{align:"right"}},[e._v("—— 百度百科，2020.08.19")]),e._v(" "),t("blockquote",[t("p",[e._v("An "),t("strong",[e._v("algorithm")]),e._v(" is "),t("strong",[e._v("a step by step procedure")]),e._v(" to "),t("strong",[e._v("solve logical and mathematical problems")]),e._v(".")]),e._v(" "),t("p",[e._v("A "),t("a",{attrs:{href:"https://simple.wikipedia.org/wiki/Recipe",target:"_blank",rel:"noopener noreferrer"}},[e._v("recipe"),t("OutboundLink")],1),e._v(" is a good example of an algorithm because it says what must be done, step by step. It takes inputs (ingredients) and produces an output (the completed dish).")]),e._v(" "),t("p",[e._v("The words 'algorithm' and 'algorism' come from the name of a Persian mathematician called "),t("a",{attrs:{href:"https://simple.wikipedia.org/wiki/Al-Khw%C4%81rizm%C4%AB",target:"_blank",rel:"noopener noreferrer"}},[e._v("Al-Khwārizmī"),t("OutboundLink")],1),e._v(" ("),t("a",{attrs:{href:"https://simple.wikipedia.org/wiki/Persian_language",target:"_blank",rel:"noopener noreferrer"}},[e._v("Persian"),t("OutboundLink")],1),e._v(": خوارزمی, c. 780–850).")]),e._v(" "),t("p",[e._v("Informally, an algorithm can be called a "),t("strong",[e._v('"list of steps"')]),e._v(". Algorithms can be written in ordinary "),t("a",{attrs:{href:"https://simple.wikipedia.org/wiki/Language",target:"_blank",rel:"noopener noreferrer"}},[e._v("language"),t("OutboundLink")],1),e._v(", and that may be all a person needs.")]),e._v(" "),t("p",[e._v("In computing, an algorithm is a precise list of operations that could be done by a "),t("a",{attrs:{href:"https://simple.wikipedia.org/wiki/Turing_machine",target:"_blank",rel:"noopener noreferrer"}},[e._v("Turing machine"),t("OutboundLink")],1),e._v(". For the purpose of computing, algorithms are written in "),t("a",{attrs:{href:"https://simple.wikipedia.org/wiki/Pseudocode",target:"_blank",rel:"noopener noreferrer"}},[e._v("pseudocode"),t("OutboundLink")],1),e._v(", "),t("a",{attrs:{href:"https://simple.wikipedia.org/wiki/Flow_chart",target:"_blank",rel:"noopener noreferrer"}},[e._v("flow charts"),t("OutboundLink")],1),e._v(", or "),t("a",{attrs:{href:"https://simple.wikipedia.org/wiki/Programming_language",target:"_blank",rel:"noopener noreferrer"}},[e._v("programming languages"),t("OutboundLink")],1),e._v(".")])]),e._v(" "),t("p",{attrs:{align:"right"}},[e._v("—— Wikipedia, 2020.08.19")]),e._v(" "),t("p",[e._v("所以我们可以看到，算法是一个非常广泛的概念。任何接受一个输入，并通过一系列固定步骤把它转化为一个输出的过程，都可以被称为算法。所以，在学习任何算法（包括机器学习算法）的时候，考虑清楚它的输入是什么，输出是什么，计算步骤是什么，是非常重要的。")]),e._v(" "),t("h2",{attrs:{id:"机器学习算法和传统算法有什么不同？"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#机器学习算法和传统算法有什么不同？"}},[e._v("#")]),e._v(" 机器学习算法和传统算法有什么不同？")]),e._v(" "),t("p",[e._v("传统算法通过定义一系列规则来把输入转换为输出，")]),e._v(" "),t("p",[e._v("机器学习算法通过已有数据学习一个过程，然后再通过这个过程把新的输入转化为输出。")]),e._v(" "),t("p",[e._v("这两者最关键的区别在于是否需要用已有数据来得到这个算法模型。")])])}),[],!1,null,null,null);r.default=n.exports}}]);