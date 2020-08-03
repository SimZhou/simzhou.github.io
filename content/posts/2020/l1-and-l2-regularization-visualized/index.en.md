---
title: "L1 and L2 Regularization Visualized"
subtitle: "The Beauty of Mathematics"
date: 2020-08-03T11:46:42+08:00
lastmod: 2020-08-03T11:46:42+08:00
draft: true
author: "Simon"
authorLink: ""
description: "This post tries to explain L1 & L2 regularization methods and their differences in machine learning techniques, and especially why L1 regularization yields sparse model. With a visualized 3D graph, I think the concept could appear very clear intuitively."

tags: ["Machine Learning", "Deep Learning"]
categories: ["Machine Learning"]

hiddenFromHomePage: false
hiddenFromSearch: false

featuredImage: ""
featuredImagePreview: ""

toc:
  enable: true
math:
  enable: true
lightgallery: true
license: ""
---

<!--more-->

## Visualizations

Consider a simple 

### L1 Regularization Visualized

{{< echarts >}}
[title]
text = "折线统计图"
top = "2%"
left = "center"

[tooltip]
trigger = "axis"

[legend]
data = [
  "邮件营销",
  "联盟广告",
  "视频广告",
  "直接访问",
  "搜索引擎"
]
top = "10%"

[grid]
left = "5%"
right = "5%"
bottom = "5%"
top = "20%"
containLabel = true

[toolbox]
[toolbox.feature]
[toolbox.feature.saveAsImage]
title = "保存为图片"

[xAxis]
type = "category"
boundaryGap = false
data = [
  "周一",
  "周二",
  "周三",
  "周四",
  "周五",
  "周六",
  "周日"
]

[yAxis]
type = "value"

[[series]]
name = "邮件营销"
type = "surface"
stack = "总量"
data = [
  120.0,
  132.0,
  101.0,
  134.0,
  90.0,
  230.0,
  210.0
]
{{< /echarts >}}



### L2 Regularization Visualized