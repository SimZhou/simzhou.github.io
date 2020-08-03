---
title: "Cross Entropy Loss Visualized"
subtitle: "The Beauty of Mathematics"
date: 2020-08-03T15:02:46+08:00
lastmod: 2020-08-03T15:02:46+08:00
draft: true
author: "Simon"
authorLink: ""
description: ""

tags: []
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

```javascript
option = {
    title: {
        text: "Cross Entropy Loss Visualized - with L2 Regularization",
        top: "5%",
        left: "center"
    },
    tooltip: {trigger: "axis"},
    backgroundColor: '#fff',
    visualMap: {
        show: false,
        dimension: 2,
        min: -1,
        max: 0,
        inRange: {
            color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
        }
    },
    xAxis3D: {
        max: 5,
        min: -5,
        type: 'value'
    },
    yAxis3D: {
        max: 5,
        min: -5,
        type: 'value'
    },
    zAxis3D: {
        type: 'value'
    },
    grid3D: {
        viewControl: {
            // projection: 'orthographic'
        }
    },
    series: [{
        type: 'surface',
        wireframe: {
            // show: false
        },
        equation: {
            x: {
                min: -5,
                max: 5, 
                step: 0.1
            },
            y: {
                min: -5,
                max: 5,
                step: 0.1
            },
            z: function (x1, x2) {
                // consider cross-entropy loss
                ptrue = 0.9;
                x = 1;
                l1a = 0;
                l2a = 0;
                return -(ptrue*Math.exp(x2*x)+(1-ptrue)*Math.exp(x1*x))/(Math.exp(x1*x)+Math.exp(x2*x))+l1a*(Math.abs(x1)+Math.abs(x2))+l2a*(x1**2+x2**2);
            }
        }
    }]
}
```
