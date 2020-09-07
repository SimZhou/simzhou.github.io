---

---

# 排序算法

![sort](https://pic.leetcode-cn.com/cde64bf682850738153e6c76dd3f6fb32201ce3c73c23415451da1eead9eb7cb-20190624173156.jpg)

<脑图>



## $O(n^2)$排序算法

三个时间复杂度为$O(n^2)$的基础排序算法，其中只有插入排序在数据量不大时还偶有使用。

### 冒泡排序 (Bubble Sort)

小学计算机课就学过的排序算法。它的工作原理：重复地走访过要排序的数列，一次比较两个元素，如果它们的顺序错误就把它们交换过来。走访数列的工作是重复地进行直到没有再需要交换，也就是说该数列已经排序完成。这个算法的名字由来是因为越小/大的元素会经由交换慢慢“浮”到数列的顶端。

> 时间复杂度：$O(n^2)$
>
> 空间复杂度：$O(1)$
>
> 稳定性：稳定。冒泡过程中比较的条件是前者大于后者才交换元素，相同元素就不会被打乱顺序。

```python
def bubble_sort(nums):
    for i in range(len(nums)-1):
        for j in range(len(nums)-1-i):
            if nums[j] > nums[j+1]:
                nums[j], nums[j+1] = nums[j+1], nums[j]
    return nums
```

速度测试：

> **1-100整数，100个**
>
> 772 µs ± 1.35 µs per loop (mean ± std. dev. of 7 runs, 1000 loops each)
>
> **1-100整数，1000个**
>
> 87.2 ms ± 590 µs per loop (mean ± std. dev. of 7 runs, 10 loops each)
>
> **1-100整数，10000个**
>
> 9.46 s ± 84.7 ms per loop (mean ± std. dev. of 7 runs, 1 loop each)



### 选择排序 (Selection Sort)

选择排序(Selection-sort)是一种简单直观的排序算法。它的工作原理：首先在未排序序列中找到最小（大）元素，存放到排序序列的起始位置，然后，再从剩余未排序元素中继续寻找最小（大）元素，然后放到已排序序列的末尾。以此类推，直到所有元素均排序完毕。 

> 时间复杂度：$O(n^2)$
>
> 空间复杂度：$O(1)$
>
> 稳定性：**不稳定**，选择排序中的元素交换会打乱相同元素原有顺序，如：5 8 5 2 9。

```python
def seletion_sort(nums):
    for i in range(len(nums)-1):
        _index = i
        for j in range(i+1, len(nums)):
            if nums[j] < nums[_index]:
                _index = j
        nums[i], nums[_index] = nums[_index], nums[i]
    return nums
```

速度测试：

> **1-100整数，100个**
>
> 438 µs ± 4.17 µs per loop (mean ± std. dev. of 7 runs, 1000 loops each)
>
> **1-100整数，1000个**
>
> 42.4 ms ± 24.2 µs per loop (mean ± std. dev. of 7 runs, 10 loops each)
>
> **1-100整数，10000个**
>
> 4.36 s ± 53.2 ms per loop (mean ± std. dev. of 7 runs, 1 loop each)



### 插入排序 (Insertion Sort)

插入排序可以想象成扑克牌理牌的过程：从右边未整理的牌堆中取第一张，与左边的理好的牌堆中每一张牌比较，找到插入点后插入进去，重复这个步骤直到右边牌堆为空。

> 时间复杂度：$O(n^2)$
>
> 空间复杂度：$O(1)$
>
> 稳定性：稳定

```python
def insertion_sort(nums):
    for i in range(1, len(nums)):  
        cur = nums[i]
        while i:                    
            if nums[i-1] > cur: 
                nums[i] = nums[i-1]
                i -= 1
            else:
                break
        nums[i] = cur
    return nums
```

速度测试：

> **1-100整数，100个**
>
> 394 µs ± 3.78 µs per loop (mean ± std. dev. of 7 runs, 1000 loops each)
>
> **1-100整数，1000个**
>
> 46 ms ± 721 µs per loop (mean ± std. dev. of 7 runs, 10 loops each)
>
> **1-100整数，10000个**
>
> 4.86 s ± 46.4 ms per loop (mean ± std. dev. of 7 runs, 1 loop each)



## $O(n\cdot{logn})$排序算法

### 归并排序 (Merge Sort)

分治法的代表算法之一。

归并排序具体工作原理如下（假设序列共有n个元素）：
① 将序列每相邻两个数字进行归并操作（Merge），形成$floor(n/2+n\%2)$个序列，排序后每个序列包含两个元素
② 将上述序列再次归并，形成$floor(n/4)$个序列，每个序列包含四个元素
③ 重复步骤2，直到所有元素排序完毕

> 时间复杂度：$O(n\cdot{logn})$
>
> 空间复杂度：$O(n)$
>
> 稳定性：**稳定**，在归并过程中碰到相同元素可以将左边组的放在前面

```python
class Solution(object):
    def mergeSort(self, nums):
        if len(nums) == 1: return nums
        # 平均划分左右组
        mid = int( len(nums) / 2 )
        # 左右组分别进行归并排序
        leftGroup = self.mergeSort( nums[:mid] )
        rightGroup = self.mergeSort( nums[mid:] )
        # 对左右有序数组进行合并操作
        return self.merge(leftGroup, rightGroup)
    
    def merge(self, l, r):
        i, j, res = 0, 0, []
        while i < len(l) and j < len(r):
            if l[i] <= r[j]:
                res.append(l[i])
                i += 1
            else:
                res.append(r[j])
                j += 1
        res.extend(l[i:])
        res.extend(r[j:])
        return res
```

速度测试：

> **1-100整数，100个**
>
> 349 µs ± 1.48 µs per loop (mean ± std. dev. of 7 runs, 1000 loops each)
>
> **1-100整数，1000个**
>
> 4.4 ms ± 9.72 µs per loop (mean ± std. dev. of 7 runs, 100 loops each)
>
> **1-100整数，10000个**
>
> 56.4 ms ± 72.4 µs per loop (mean ± std. dev. of 7 runs, 10 loops each)
>
> **1-100整数，100000个**
>
> 690 ms ± 1.57 ms per loop (mean ± std. dev. of 7 runs, 1 loop each)
>
> **1-100整数，1000000个**
>
> 8.16 s ± 20.4 ms per loop (mean ± std. dev. of 7 runs, 1 loop each)



### 快速排序 (Quick Sort)

快速排序也是分治法的思想。

在数组中选择一个值x，通过一趟遍历把小于x的值放到x左边，大于x的值放到x右边，

然后分别对左右数组再次进行递归快速排序操作。

> 时间复杂度：$O(n\cdot{logn})$
>
> 空间复杂度：$O(1)$
>
> 稳定性：**不稳定**



### 堆排序 (Heap Sort)

https://youtu.be/H5kAcmGOn4Q



## $O(n)$排序算法

因为$O(n)$时间复杂度为线性，所以这些排序算法又被称为线性排序

### 桶排序 (Bucket sort)



### 计数排序 (Counting sort)



### 基数排序 (Radix sort)





## 特殊复杂度排序算法

### 希尔排序 (Shell's Sort) - $O(n^{\frac{3}{2}})$

希尔排序(Shell's Sort)又称“缩小增量排序”（Diminishing Increment Sort），是直接插入排序的一种更高效的改进版本。希尔排序是非稳定排序算法。该方法因 D.L.Shell 于 1959 年提出而得名。