# 一些问题的解决方法

## 处于换行的标签影响 absolute 子元素布局的问题

换行元素实际占用了整2行的高度，因此 `absolute` 子元素的绝对位置，是相对于这 **2行** 的内容区域

目前找到的一个解决方法是，使用 `background-image` 搭配 `background-position` 和 `background-size` 描述 `absolute` 子元素

不过这个问题一般很少见，毕竟文章排版设计并不会这么复杂～
