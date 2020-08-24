# 算法总览

## 什么是算法？

斯坦福有一门算法公开课中讲到了一个很经典的例子：大家一定都学过小学乘法，把第二个数的每一位和第一个数相乘，最后再把得到的数相加，就完成了一个简单的两数相乘。大部分人可能都没有怀疑过这个过程，包括之前的我在内，仿佛这么做就是天经地义。但看过这门课之后我发现，原来计算两数相乘还有着别的方法，那就是Karatsuba算法（[Youtube - Karatsuba Multiplication](https://youtu.be/JCbZayFr9RE)）。对于计算机来说，这个算法可以比小学乘法法更快地得到计算结果（但对于人来说并不是如此）。

不过，也有对于人来说更快的加减乘除算法，那就是速算，最强大脑上的速算比赛就是例子。这些速算法一般都借助了数与数之间的特殊关系来加快心算速度。速算的特点是某一种速算法一般只能适用于某一部分特殊情况，也因此，它并不太适合让计算机来做（需要写很多的规则来适应各种情况）。

上述这些方法都可以被称为算法，这就是我对算法的一个非常感性的认识。

让我们再重新回到问题，什么是算法？先来看一下各种地方对算法的理性的定义：

> 非形式地说，**算法**（Algorithm）就是任何**良定义**的**计算过程**，该过程取某个值或值的集合作为输入并产生某个值或值的集合作为输出。这样，算法就是**把输入转换成输出的计算步骤**的一个序列。

<p align="right">—— 《算法导论》第3版，第1章</p>

> **算法**（Algorithm）是指**解题方案**的**准确而完整**的**描述**，是一系列解决问题的清晰[指令](https://baike.baidu.com/item/指令/3225201)，算法代表着用**系统的方法**描述**解决问题的策略机制**。也就是说，能够对一定规范的[输入](https://baike.baidu.com/item/输入/32696)，在有限时间内获得所要求的输出。如果一个算法有缺陷，或不适合于某个问题，执行这个算法将不会解决这个问题。不同的算法可能用不同的时间、空间或效率来完成同样的任务。一个算法的优劣可以用[空间复杂度](https://baike.baidu.com/item/空间复杂度/9664257)与[时间复杂度](https://baike.baidu.com/item/时间复杂度/1894057)来衡量。

<p align="right">—— 百度百科，2020.08.19</p>

> An **algorithm** is **a step by step procedure** to **solve logical and mathematical problems**.
>
> A [recipe](https://simple.wikipedia.org/wiki/Recipe) is a good example of an algorithm because it says what must be done, step by step. It takes inputs (ingredients) and produces an output (the completed dish).
>
> The words 'algorithm' and 'algorism' come from the name of a Persian mathematician called [Al-Khwārizmī](https://simple.wikipedia.org/wiki/Al-Khwārizmī) ([Persian](https://simple.wikipedia.org/wiki/Persian_language): خوارزمی, c. 780–850).
>
> Informally, an algorithm can be called a **"list of steps"**. Algorithms can be written in ordinary [language](https://simple.wikipedia.org/wiki/Language), and that may be all a person needs.
>
> In computing, an algorithm is a precise list of operations that could be done by a [Turing machine](https://simple.wikipedia.org/wiki/Turing_machine). For the purpose of computing, algorithms are written in [pseudocode](https://simple.wikipedia.org/wiki/Pseudocode), [flow charts](https://simple.wikipedia.org/wiki/Flow_chart), or [programming languages](https://simple.wikipedia.org/wiki/Programming_language). 

<p align="right">—— Wikipedia, 2020.08.19</p>

所以我们可以看到，算法是一个非常广泛的概念。任何接受一个输入，并通过一系列固定步骤把它转化为一个输出的过程，都可以被称为算法。所以，在学习任何算法（包括机器学习算法）的时候，考虑清楚它的输入是什么，输出是什么，计算步骤是什么，是非常重要的。

## 机器学习算法和传统算法有什么不同？

传统算法通过定义一系列规则来把输入转换为输出，

机器学习算法通过已有数据学习一个过程，然后再通过这个过程把新的输入转化为输出。

这两者最关键的区别在于是否需要用已有数据来得到这个算法模型。

