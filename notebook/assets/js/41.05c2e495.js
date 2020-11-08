(window.webpackJsonp=window.webpackJsonp||[]).push([[41],{408:function(t,e,r){"use strict";r.r(e);var a=r(42),s=Object(a.a)({},(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[r("h2",{attrs:{id:"项目1-非监督文本自动摘要模型的构建"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#项目1-非监督文本自动摘要模型的构建"}},[t._v("#")]),t._v(" 项目1 非监督文本自动摘要模型的构建")]),t._v(" "),r("h3",{attrs:{id:"_1-introduction"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_1-introduction"}},[t._v("#")]),t._v(" 1. Introduction")]),t._v(" "),r("p",[t._v("自动摘要问题是NLP领域的一个经典问题，简单的说，就是"),r("strong",[t._v("输入一段长文字")]),t._v("，"),r("strong",[t._v("输出")]),t._v("对这段长文字的一个"),r("strong",[t._v("总结概要")]),t._v("。在新闻，语音播报、文档信息提取、公司报表、上市公司分析等等领域具有很多的应用场景。")]),t._v(" "),r("h3",{attrs:{id:"_2-method"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_2-method"}},[t._v("#")]),t._v(" 2. Method")]),t._v(" "),r("h4",{attrs:{id:"_2-1-data-source"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_2-1-data-source"}},[t._v("#")]),t._v(" 2.1 Data source")]),t._v(" "),r("p",[t._v("中文的数据来源有两个：")]),t._v(" "),r("ol",[r("li",[t._v("维基百科中文语料库："),r("a",{attrs:{href:"https://dumps.wikimedia.org/zhwiki/20190720/zhwiki-20190720-pages-articles.xml.bz2",target:"_blank",rel:"noopener noreferrer"}},[t._v("下载链接"),r("OutboundLink")],1),t._v("，使用提取工具 "),r("a",{attrs:{href:"https://github.com/attardi/wikiextractor",target:"_blank",rel:"noopener noreferrer"}},[t._v("wikiextractor"),r("OutboundLink")],1),t._v(" 进行提取")]),t._v(" "),r("li",[t._v("汉语新闻语料库："),r("a",{attrs:{href:"https://github.com/Computing-Intelligence/datasource/blob/master/export_sql_1558435.zip",target:"_blank",rel:"noopener noreferrer"}},[t._v("下载链接"),r("OutboundLink")],1),t._v("，下载后进行数据清洗和 Tokenization 的操作")])]),t._v(" "),r("p",[t._v("其中，1+2 作为词向量训练的来源，2 作为主要处理的数据源")]),t._v(" "),r("p",[t._v("最后将Content专门放在一个单独文件夹中")]),t._v(" "),r("p",[r("strong",[t._v("（技术点：数据清洗）")])]),t._v(" "),r("h4",{attrs:{id:"_2-2-training-word2vec-调参点-skip-gram-cbow、等"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_2-2-training-word2vec-调参点-skip-gram-cbow、等"}},[t._v("#")]),t._v(" 2.2 Training word2vec    "),r("em",[t._v("调参点：Skip-gram/CBoW、等")])]),t._v(" "),r("p",[t._v("使用2.1构建好的语料库，使用 Skip-gram / CBOW 模型训练词向量，直接使用Python的gensim库")]),t._v(" "),r("p",[r("strong",[t._v("（技术点：语义相似性，负采样等细节的理解）")])]),t._v(" "),r("h4",{attrs:{id:"_2-3-testing-visualization-word2vec"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_2-3-testing-visualization-word2vec"}},[t._v("#")]),t._v(" 2.3 Testing & visualization word2vec")]),t._v(" "),r("ul",[r("li",[t._v("使用余弦相似度计算语义相似性")]),t._v(" "),r("li",[t._v("计算语义线性关系")]),t._v(" "),r("li",[t._v("词向量的可视化：使用 "),r("a",{attrs:{href:"https://www.kaggle.com/jeffd23/visualizing-word-vectors-with-t-sne",target:"_blank",rel:"noopener noreferrer"}},[t._v("t-sne"),r("OutboundLink")],1),t._v(" 进行高维向量的可视化（可能需要减少单词量）")])]),t._v(" "),r("p",[r("strong",[t._v("（技术点：数学余弦相似度，语义线性关系，降维算法 t-sne）")])]),t._v(" "),r("h4",{attrs:{id:"_2-4-sentence-to-vec-调参点-暂时未知"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_2-4-sentence-to-vec-调参点-暂时未知"}},[t._v("#")]),t._v(" 2.4 Sentence-to-Vec      "),r("em",[t._v("调参点：暂时未知")])]),t._v(" "),r("p",[t._v("计算完词向量后，我们进一步使用普林斯顿大学提出的SIF方法对每个句子进行句子向量化，计算出 "),r("img",{attrs:{src:"http://latex.codecogs.com/gif.latex?V_%7BSentence(i)%7D",alt:""}})]),t._v(" "),r("p",[r("a",{attrs:{href:"https://openreview.net/pdf?id=SyK00v5xx",target:"_blank",rel:"noopener noreferrer"}},[t._v("A SIMPLE BUT TOUGH-TO-BEAT BASELINE FOR SENTENCE EMBEDDINGS"),r("OutboundLink")],1)]),t._v(" "),r("p",[t._v("通过把整篇文章当成一个长句，计算 "),r("img",{attrs:{src:"http://latex.codecogs.com/gif.latex?V_%7BDoc%7D",alt:""}}),t._v("。(创新点：是否可以用句向量合成文向量，效果可能会更好？）")]),t._v(" "),r("p",[t._v("再计算出文章标题的句向量 "),r("img",{attrs:{src:"http://latex.codecogs.com/gif.latex?V_%7BTitle%7D",alt:""}})]),t._v(" "),r("p",[r("strong",[t._v("（技术点：SIF论文阅读，SIF实现，降维算法 PCA，）")])]),t._v(" "),r("h4",{attrs:{id:"_2-5-achieve-the-most-similar-n-sentences"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_2-5-achieve-the-most-similar-n-sentences"}},[t._v("#")]),t._v(" 2.5 Achieve the most similar N sentences")]),t._v(" "),r("p",[t._v("因为已经得到了句向量，标题句向量，文向量，我们构建一个函数"),r("img",{attrs:{src:"http://latex.codecogs.com/gif.latex?f",alt:""}}),t._v("，使得![](http://latex.codecogs.com/gif.latex?f(V_{Sentence(i)}, V_{Title}, V_{Doc})) = "),r("img",{attrs:{src:"http://latex.codecogs.com/gif.latex?C_i",alt:""}})]),t._v(" "),r("p",[t._v("，"),r("img",{attrs:{src:"http://latex.codecogs.com/gif.latex?C_i",alt:""}}),t._v("为该句与全部内容的相似度，排序取出Top_N，就能获得语义上最相关的句子了（即摘要）")]),t._v(" "),r("h4",{attrs:{id:"_2-6-knn平滑-移动平均-调参点-权重-n-neighborhoods的选取"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_2-6-knn平滑-移动平均-调参点-权重-n-neighborhoods的选取"}},[t._v("#")]),t._v(" 2.6 KNN平滑（移动平均）     "),r("em",[t._v("调参点：权重，N-Neighborhoods的选取")])]),t._v(" "),r("p",[t._v("通过平滑使得相关句不会被单独提出来，导致它显得很突兀")]),t._v(" "),r("p",[t._v("n选取太小可能会导致平滑不够，依旧突兀，n选取太大可能会导致太平滑，摘要效果不够好（创新点：考虑将n做成一个前端可交互的控件滑块，通过调整它可以让模型生成的摘要不一样）")]),t._v(" "),r("h4",{attrs:{id:"_2-7-获得end-to-end模型"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_2-7-获得end-to-end模型"}},[t._v("#")]),t._v(" 2.7 获得End-to-end模型")]),t._v(" "),r("p",[t._v("summrize(content, title) = summary")]),t._v(" "),r("h4",{attrs:{id:"_2-8-可视化"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_2-8-可视化"}},[t._v("#")]),t._v(" 2.8 可视化")]),t._v(" "),r("p",[r("strong",[t._v("（技术点：前端XXX，后端Flask）")])]),t._v(" "),r("h3",{attrs:{id:"_3-optimization"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_3-optimization"}},[t._v("#")]),t._v(" 3. Optimization")]),t._v(" "),r("h4",{attrs:{id:"_3-1-作业范围内优化"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_3-1-作业范围内优化"}},[t._v("#")]),t._v(" 3.1 作业范围内优化")]),t._v(" "),r("ul",[r("li",[r("p",[t._v("扩充语料库，以获得更精准的词向量")])]),t._v(" "),r("li",[r("p",[t._v("词向量优化："),r("a",{attrs:{href:"http://web.stanford.edu/class/cs224n/slides/cs224n-2019-lecture02-wordvecs2.pdf",target:"_blank",rel:"noopener noreferrer"}},[t._v("Stanford cs224n Lecture2: Word vectors 2 and Word Senses"),r("OutboundLink")],1),t._v("，"),r("a",{attrs:{href:"http://www.mwhitelab.com/archives/813",target:"_blank",rel:"noopener noreferrer"}},[t._v("cs224n中文笔记：词向量的计算与评价"),r("OutboundLink")],1),t._v("，"),r("a",{attrs:{href:"http://kuaibao.qq.com/s/20180124G0DVUJ00?refer=cp_1026",target:"_blank",rel:"noopener noreferrer"}},[t._v("词向量的内部评价、外部评价、再训练"),r("OutboundLink")],1),t._v("，可以考虑尝试多种词向量例如GloVe等。")]),t._v(" "),r("p",[r("a",{attrs:{href:"https://www.zhihu.com/question/68112508?sort=created",target:"_blank",rel:"noopener noreferrer"}},[t._v("Skip-gram与CBoW的优缺点"),r("OutboundLink")],1)])]),t._v(" "),r("li",[r("p",[t._v("KNN平滑")])]),t._v(" "),r("li",[r("p",[t._v("作业要求内提到的：标点符号与特殊字符的处理")])]),t._v(" "),r("li",[r("p",[t._v("...")])])]),t._v(" "),r("h4",{attrs:{id:"_3-2-作业范围外优化-可选"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_3-2-作业范围外优化-可选"}},[t._v("#")]),t._v(" 3.2 作业范围外优化（可选）")]),t._v(" "),r("ul",[r("li",[t._v("BERT word Embedding")]),t._v(" "),r("li",[t._v("...")])])])}),[],!1,null,null,null);e.default=s.exports}}]);