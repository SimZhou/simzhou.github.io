本内容按照吴恩达公开课《Machine Learning》的 Lecture Slides 进行分类，每一个H1标题对应一个Lecture Slide，每一个H2标题对应Lecture Slide中的一个小章节。

本内容是课程的简化总结，适合已经了解机器学习基本概念的人进行回顾以及查漏补缺。

# 3 线性代数复习（Optional）

## 3.1 矩阵和向量

$i$行，$j$列的矩阵可以写作：$\R^{i\times{j}}$

## 3.2 加法和数乘

**加法**：维度完全一样的两个矩阵，按元素相加，输出相同维度的一个矩阵

**数乘**：对矩阵中每个元素全部乘以或除以某个实数

## 3.3 矩阵与向量相乘

$\R^{i\times{j}}\times\R^{j\times{1}}=\R^{i\times{1}}$

## 3.4 矩阵与矩阵相乘

$\R^{i\times{j}}\times\R^{j\times{k}}=\R^{i\times{k}}$

## 3.5 矩阵乘法的**属性**

**交换律**：不满足。$A\times{B}\neq{B}\times{A}$，例如：

$\begin{bmatrix}1&1\\0&0\end{bmatrix}\begin{bmatrix}0&0\\2&0\end{bmatrix}=\begin{bmatrix}2&0\\0&0\end{bmatrix}$

$\begin{bmatrix}0&0\\2&0\end{bmatrix}\begin{bmatrix}1&1\\0&0\end{bmatrix}=\begin{bmatrix}0&0\\2&2\end{bmatrix}$

**结合律**：满足。

**分配律**：满足。

> 注：单位矩阵满足交换律：$A^{m\times{n}}\cdot{I^{n\times{n}}}=I^{m\times{m}}\cdot{A^{m\times{n}}}=A^{m\times{n}}$。这里，前后两个单位矩阵的维度不同。

## 3.6 逆矩阵与转置

**逆矩阵**：如果矩阵$A^{m\times{m}}$有逆矩阵$
A^{-1}$，则它们满足$AA^{-1}=A^{-1}A=I$。

不是所有矩阵都有逆矩阵，没有逆矩阵的矩阵被称为**奇异矩阵(singular)**或**退化矩阵(degenerate)**。

**矩阵转置**：如果B是A的转置，则$B_{ij}==A_{ji}$，记作$B=A^T$。
