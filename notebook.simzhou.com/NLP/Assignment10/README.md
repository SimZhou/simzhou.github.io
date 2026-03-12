## 第10节 机器学习算法（贝叶斯，k-means，SVM，随机森林，XGBoost 等）

这一节主要学习了：经典机器学习中的贝叶斯方法，K-means，SVM；集成学习中的随机森林，XGBoost

### 1. 贝叶斯方法

> Recap of probability theory:
>
> Independency Assumption: $P(A \cap B)=P(A)\cdot P(B)$
>
> Rule of Total Probability: $P(A)=\sum_i P(A \mid B_i)\cdot P(B_i)$
>
> Bayes' Rule: $P(A \mid B)=\frac{P(A \cap B)}{P(B)}=\frac{P(B \mid A)\cdot P(A)}{P(B)}$

先验概率：*指根据以往经验和分析得到的概率*

后验概率：*事情已经发生，要求这件事情发生的原因是由某个因素引起的可能性的大小*

$$
P(A \mid B)=\frac{P(A \cap B)}{P(B)}=\frac{P(B \mid A)\cdot P(A)}{P(B)}
$$

#### 1.1 Maximum a Posterior（极大后验概率）、Maximum Likelihood（极大似然估计）

$$
h_{MAP}=\arg\max_{h\in H}P(h \mid D)=\arg\max_{h\in H}P(D \mid h)P(h)
$$

$$
h_{ML}=\arg\max_{h\in H}P(D \mid h)
$$

where D is short for Data, H is the set of Hypothesises, h is a particular function in the hypothesises

简单解释：

- 在极大后验概率情况下，Data已经发生，我们需要求一个最佳h，它对数据的拟合情况最好（生成概率最大），则这个h就是最佳h
- 在极大似然的情况下，我们要求一个h，使得在这个h下，我们取得观测数据D的概率最大，则这个h是最佳h

#### 1.2 朴素贝叶斯 Naive Bayes

朴素贝叶斯分类器，是一个生成模型，对于每一种分类，它都可以生成一个后验概率

$$
\begin{aligned}
h_{y=y_0,MAP}
&=\arg\max_{h\in H}P(y=y_0 \mid a_1,a_2,a_3,\cdots) \\
&=\arg\max_{h\in H}\frac{P(a_1,a_2,a_3,\cdots \mid y=y_0)\cdot P(y=y_0)}{P(a_1,a_2,\cdots)} \\
&=\arg\max_{h\in H}P(a_1,a_2,a_3,\cdots \mid y=y_0)\cdot P(y=y_0) \\
&=\arg\max_{h\in H}P(a_1 \mid y_0)\cdot P(a_2 \mid y_0)\cdot P(a_3 \mid y_0)\cdots P(y=y_0)
\end{aligned}
$$

(Last step according to "Naive" hypothesis)

然后我们同样可以求出 $h_{y=y_1}$、$h_{y=y_2}$、...。最后 y 的估计值就是使 h 得到最大值所对应的 y 值。

例：文档分类

![](https://uricc.ga/images/2019/12/13/_20191213164304.png)

在用朴素贝叶斯进行文档分类的例子中，由于词库中某些词可能在句子中没有出现，产生条件概率为0的情况，因此对于所有词的初始词频默认为1（而不是0）（Add 1 smoothing）

##### 

### 2. K-means

> **Input:** dataset D, number of clusters K
>
> **Output:** partition of D into k clusters
>
> **Algorithm:** 
>
> ​		Choose k random seeds
>
> ​		Repeat until no changes:
>
> ​				Assign each instance to the cluster of its closest seed
>
> ​				Redefine seeds as cluster means
>
> ​		Return k clusters

如何提升聚类效果：k个点的选取尽可能互相远离

### 3. SVM

> 前置知识：拉格朗日乘子法，用于解决条件约束优化问题。
>
>
>
> **Equility constraints:**
>
> $\min_{x\in \mathbb{R}}f(x)\quad \text{s.t. } h(x)=0$
>
> 令 $L=f(x)+\lambda\cdot h(x)$，
>
> ​	然后L对 x 和 λ 分别求偏导并令它们都等于 0，即可得到最优解
>
> **实际意义为：对 x 求偏导为零，即等同于切线平行：$\frac{\partial f}{\partial x}=-\lambda\cdot\frac{\partial h}{\partial x}$**
>
> **对 $\lambda$ 求偏导，即等同于满足约束条件：$h(x)=0$**
>
> ​	详解见3B1B youtube视频：[Lagrange multipliers, using tangency to solve constrained optimization](https://www.youtube.com/embed/yuqB-d5MjZA)
>
>  
>
> **Inequility constrains:** 
>
> $\min_{x\in \mathbb{R}}f(x)\quad \text{s.t. } g(x)\leq 0$
>
> 令 $L=f(x)+\lambda\cdot g(x)$
>
> ​    若最小值点就在约束范围内，则约束条件相当于没有用，
>
> ​    若最小值点在约束范围边界上，则约束条件起作用：
>
> $f$ 与 $g$ 梯度方向相反：$-\nabla f(x)=u\cdot\nabla g(x)$（即求偏导）且 $u\geq 0$
>
> 约束条件：$g(x)\leq 0$
>
> $u\cdot g(x)=0$（$u=0$，则最小值点在约束范围内，约束不成立；$g(x)=0$ 则约束条件成立）
>
>   
>
> **KKT条件：**
>
> $\min_{x\in \mathbb{R}}f(x)\quad \text{s.t. } h(x)=0,\quad g(x)\leq 0$
>
> ​	把等式约束和不等式约束加到一起，则满足以下条件的点就是极值点：
>
> $\nabla_x L=0$
>
> $\mu\cdot g(x)=0$
>
> $h(x)=0$
>
> $g(x)\leq 0$
>
> $\mu\geq 0$
>
>  
>
> (这一部分还需消化理解，详见 *Convex Optimization* 第6章：对偶问题，以及博客：[link](https://blog.csdn.net/fkyyly/article/details/86488582))

SVM 的目的是最大化间隔，即

#### Kernel Trick

使用非线性函数将数据打到高维空间，使之在高维空间线性可分：

![Kernal Trick](https://uricc.ga/images/2019/12/20/_20191220115256.png)



#### SVM的优缺点

优点：

- 凸优化给予**全局最优**
- 用**核技巧**可以处理**非线性数据**

- 维度灾难还好 https://www.quora.com/Does-SVM-suffer-from-the-curse-of-dimensionality-If-so-how-does-SVM-overcome-it
- 可解释

缺点：

- 计算复杂度高（需要遍历所有样本点）
- 本质上是二分类模型，对多分类问题效果不会特别好（尽管有技巧让它可以用于多分类例如one-to-many）



### 4. 集成学习（Ensemble Learning）

> 集成学习的思想是训练多个模型，然后通过投票的方式获取多数模型赞同的预测，以获得更好的结果。
>
> 集成学习的分类有：
>
> **Bagging：每次通过Bootstrap方式训练一个分类器，各分类器相互独立**
>
> ![](https://uricc.ga/images/2019/12/20/bagging.png)
>
> **Boosting：每次训练出的模型的学习效果不好的部分，都会提升下一次模型的效果**
>
> ![](https://uricc.ga/images/2019/12/20/boosting.png)

#### 4.1 随机森林

随机森林算法的过程：

> 训练集 S := (x1, y1),...,(xn, yn)，特征空间 F，决策树数目 B. 
>
> **function RandomForest(S, F)**
>
> ​		H ← 0
>
> ​		**for** i ∈ 1, ..., B **do**
>
> ​				S(i) ← A bootstrap sample from S
>
> ​				h(i) ← RandomizedTreeLearn(S(i), F)
>
> ​				H ← H ∪ {h(i)}
>
> ​		**end for**
>
> ​		**return H**
>
> **end function**
>
> **function RandomizedTreeLearn(S, F)**
>
> ​		At each node:
>
> ​				f ← very small subset of F
>
> ​				Split on best feature in f
>
> ​		**return The learned tree**
>
> **end function**

随机的体现：

- 样本随机取得（bootstrap有放回抽样）
- 特征的随机取得（每棵树只选取一部分特征，比如t个特征）



#### 4.2 XGBoost

> 预备知识：回归树
>
> ​	test样本的y值，取的是最后叶子节点中train样本的y值的平均；
>
> ​	选择分类点时，用的不是信息增益，而是最小化类间方差

**目标函数：**

$$
Obj=\sum_{i=1}^{n}l(y_i,\hat{y}_i)+\sum_{k=1}^{K}\Omega(f_k)
$$

其中，$l$ 为 loss；$\Omega$ 为正则化项，表示树的复杂度函数。

其中 $\Omega(f)=\gamma T+\frac{1}{2}\lambda\sum_{j=1}^{T}w_j^{2}$，$T$ 代表叶子节点的个数，$w$ 代表叶子节点的分数，分别由 $\gamma$ 和 $\lambda$ 控制。

参考：[机器学习--boosting家族之XGBoost算法](https://www.cnblogs.com/zongfa/p/9324684.html)，[XGBoost 的前世今生](https://blog.csdn.net/zww275250/article/details/78652522)，[COS 访谈第 18 期：陈天奇](https://blog.csdn.net/hemeinvyiqiluoben/article/details/87870656)，[XGBoost官方文档](https://xgboost.readthedocs.io/en/latest/tutorials/model.html)，[NLP-LOVE的XGBoost介绍](https://github.com/NLP-LOVE/ML-NLP/blob/master/Machine%20Learning/3.3%20XGBoost/3.3%20XGBoost.md)
