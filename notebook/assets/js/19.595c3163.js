(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{372:function(t,_,a){"use strict";a.r(_);var e=a(42),v=Object(e.a)({},(function(){var t=this,_=t.$createElement,a=t._self._c||_;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("p",[t._v("本内容按照吴恩达公开课《Machine Learning》的 Lecture Slides 进行分类，每一个H1标题对应一个Lecture Slide，每一个H2标题对应Lecture Slide中的一个小章节。")]),t._v(" "),a("p",[t._v("本内容是课程的简化总结，适合已经了解机器学习基本概念的人进行回顾以及查漏补缺。")]),t._v(" "),a("h1",{attrs:{id:"_4-多元线性回归"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_4-多元线性回归"}},[t._v("#")]),t._v(" 4 多元线性回归")]),t._v(" "),a("h2",{attrs:{id:"_4-1-多个自变量"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_4-1-多个自变量"}},[t._v("#")]),t._v(" 4.1 多个自变量")]),t._v(" "),a("p",[t._v("在多元线性回归中有不止一个自变量：")]),t._v(" "),a("p",[t._v("$h_\\theta{(x)}=\\theta_0+\\theta_1{x_1}+\\theta_2{x_2}+\\theta_3{x_3}+\\theta_4{x_4}$")]),t._v(" "),a("p",[t._v("在这里，可以认为有自变量$x_0===1$")]),t._v(" "),a("h2",{attrs:{id:"_4-2-多元的梯度下降"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_4-2-多元的梯度下降"}},[t._v("#")]),t._v(" 4.2 多元的梯度下降")]),t._v(" "),a("p",[t._v("同一元情况下的$\\theta_0$和$\\theta_1$，但是在这里有4个$\\theta$，分别对4个$\\theta$求偏导，然后根据偏导同时更新4个$\\theta$的参数值，直到损失函数$J(\\theta_0, \\theta_1, \\theta_2, \\theta_3, \\theta_4)$收敛。")]),t._v(" "),a("h2",{attrs:{id:"_4-3-实操技巧1：特征归一化-feature-scaling"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_4-3-实操技巧1：特征归一化-feature-scaling"}},[t._v("#")]),t._v(" 4.3 实操技巧1：特征归一化(Feature Scaling)")]),t._v(" "),a("p",[t._v("使用公式$\\frac{x_i-\\mu_i}{\\sigma}$把每个连续特征归一化到 $[-1,1]$ 空间，可以提升模型效果。")]),t._v(" "),a("h2",{attrs:{id:"_4-4-实操技巧2：调整学习率-alpha"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_4-4-实操技巧2：调整学习率-alpha"}},[t._v("#")]),t._v(" 4.4 实操技巧2：调整学习率$\\alpha$")]),t._v(" "),a("p",[t._v("通过监控训练过程中损失函数$J(\\theta)$的值，来调整学习率。如果$\\alpha$太大，则$J(\\theta)$可能不会收敛或者出现跳跃，如果$\\alpha$太小，则$J(\\theta)$收敛过慢。")]),t._v(" "),a("h2",{attrs:{id:"_4-5-多项式回归"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_4-5-多项式回归"}},[t._v("#")]),t._v(" 4.5 多项式回归")]),t._v(" "),a("p",[t._v("某些自变量可能与因变量直接不是线性关系，可以考虑使用自变量的平方项或者立方项等当作x，例如：")]),t._v(" "),a("p",[t._v("$h_\\theta{(x)}\\=\\theta_0+\\theta_1{x_1}+\\theta_2{x_2}+\\theta_3{x_3}+\\theta_4{x_4}\\=\\theta_0+\\theta_1{(size)}+\\theta_2{(size)^2}+\\theta_3{(size)^3}+\\theta_4{\\sqrt{(size)}}$")]),t._v(" "),a("h2",{attrs:{id:"_4-6-标准方程"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_4-6-标准方程"}},[t._v("#")]),t._v(" 4.6 标准方程")]),t._v(" "),a("p",[t._v("在"),a("strong",[t._v("均方误差损失函数")]),t._v("下，通过"),a("strong",[t._v("二次方程求根公式")]),t._v("，$\\theta$参数的解可以用标准方程得到：\n$$\n\\theta=(X^TX)^{-1}X^Ty\n$$\n例如，当有m个样本，n个特征时：$X$的维度为$m\\times{n}$，$Y$的维度为$m\\times{1}$，最终输出维度为$n\\times{1}$。")]),t._v(" "),a("p",[t._v("以下是"),a("strong",[t._v("梯度下降法和标准方程的对比")]),t._v("：")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[t._v("梯度下降")]),t._v(" "),a("th",[t._v("标准方程")])])]),t._v(" "),a("tbody",[a("tr",[a("td",[t._v("需要选择学习率$\\alpha$")]),t._v(" "),a("td",[t._v("不需要选择学习率$\\alpha$")])]),t._v(" "),a("tr",[a("td",[t._v("需要迭代很多次")]),t._v(" "),a("td",[t._v("不需要迭代")])]),t._v(" "),a("tr",[a("td",[t._v("特征维度$n$很大时依然好用")]),t._v(" "),a("td",[t._v("需要计算$(X^TX)^{-1}$，复杂度为$O(n^3)$")])]),t._v(" "),a("tr",[a("td"),t._v(" "),a("td",[t._v("当特征维度$n$很大时，计算缓慢")])])])]),t._v(" "),a("h2",{attrs:{id:"_4-7-标准方程中的-x-tx-1-不可逆"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_4-7-标准方程中的-x-tx-1-不可逆"}},[t._v("#")]),t._v(" 4.7 标准方程中的$(X^TX)^{-1}$不可逆")]),t._v(" "),a("p",[t._v("标准方程中的$(X^TX)^{-1}$项是有可能不可逆的，出现不可逆的可能情况有：")]),t._v(" "),a("ul",[a("li",[a("strong",[t._v("特征冗余")]),t._v("，当两个特征线性相关时")]),t._v(" "),a("li",[a("strong",[t._v("特征数量过多(m≤n)")]),t._v("，此时可以"),a("strong",[t._v("删除一些特征")]),t._v("，或者使用"),a("strong",[t._v("正则化")]),t._v("。")])]),t._v(" "),a("p",[t._v("*"),a("em",[t._v("在Octave/Matlab中，使用pinv函数可以在矩阵不可逆时依然得到逆矩阵。")])])])}),[],!1,null,null,null);_.default=v.exports}}]);