# NLP

NLI(Natural Language Inference) task

**自然语言推断任务**, 即给出**一对**(a pair of)句子, 判断两个句子是*entailment*(相近), *contradiction*(矛盾)还是*neutral*(中立)的. 由于也是分类问题, 也被称为**sentence pair classification tasks**.

在智能问答, 智能客服, 多轮对话中有应用.

常用的数据集有:

- **MNLI**(Multi-Genre Natural Language Inference): 是[**GLUE Datasets**](https://gluebenchmark.com/leaderboard)(General Language Understanding Evaluation)中的一个数据集. 是一个大规模的来源众多的数据集, 目的就是推断两个句子是意思相近, 矛盾, 还是无关的.
- **WNLI**(Winograd NLI)

Sentence Pair Classification tasks

两个句子相关性的分类问题, `NLI task`是其中的特殊情况. 经典的此类问题和对应的数据集有:

- **QQP**(Quora Question Pairs): 这是一个**二分类**数据集. 目的是判断两个来自于`Quora`的问题句子在语义上是否是等价的.
- **QNLI**(Question Natural Language Inference): 也是一个**二分类**问题, 两个句子是一个`(question, answer)`对. 正样本为`answer`是对应`question`的答案, 负样本则相反.
- **STS-B**(Semantic Textual Similarity Benchmark): 这是一个类似**回归**的问题. 给出一对句子, 使用`1~5`的评分评价两者在语义上的相似程度.
- **MRPC**(Microsoft Research Paraphrase Corpus): 句子对来源于对同一条新闻的评论. 判断这一对句子在语义上是否相同.
- **RTE**(Recognizing Textual Entailment): 是一个**二分类**问题, 类似于**MNLI**, 但是数据量少很多.

Single Sentence Classification tasks

- **SST-2**(Stanford Sentiment Treebank): 单句的**二分类**问题, 句子的来源于人们对一部电影的评价, 判断这个句子的情感.
- **CoLA**(Corpus of Linguistic Acceptability): 单句的**二分类**问题, 判断一个英文句子在语法上是不是可接受的.

SWAG(Situations With Adversarial Generations)