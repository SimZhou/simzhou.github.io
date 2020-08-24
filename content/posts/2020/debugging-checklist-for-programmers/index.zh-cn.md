---
title: "程序员Debug清单"
subtitle: ""
date: 2020-08-18T13:44:01+08:00
lastmod: 2020-08-18T13:44:01+08:00
draft: true
author: "Simon"
authorLink: ""
description: ""

tags: ["Debug"]
categories: []

hiddenFromHomePage: false
hiddenFromSearch: false

featuredImage: ""
featuredImagePreview: ""

toc:
  enable: true
math:
  enable: false
lightgallery: false
license: ""
---

<!--more-->

Checklist

1. 文件夹名是否包含大小写，空格等特殊字符
2. 中间变量命名是否和其它变量重合，导致其它变量被覆盖

方法

1. 注释掉大部分代码，一部分一部分取消注释并运行，以定位bug的真实位置

> 我碰到过一个bug，表面报错位置和实际错误位置不同，实际上是因为中间某个变量被覆盖了

2. 