---
title: "关于 Headless CMS 的思考"
createTime: "2021-04-27"
updateTime: "2021-05-21"
coverImage: "./cover.jpg"
intro: "老板希望降低开发成本，员工希望尽可能地摸鱼，Headless CMS 正迎合了资本双方的需求，这是双赢 🎉🎉🎉"
---

## 前言

2020年底，因公司多位开发接连离职，后续项目都开始交由我来接管。即便能够全栈开发，但谁又不想摸鱼🏄、准时下班呢:P。

因此，奔着以 **偷懒** 为目标🤫，根据近期项目要求，我开始着手调研《如何不写一行代码，开发整个软件系统》，结果真被我找到了一个可行的方案！

当然，不写代码是不可能的🙃，但该方案确实省去了绝大部分后端的开发工作，可谓我司的 **“第一次工业革命”** 。这个方案就是 [cloudbase-cms](https://docs.cloudbase.net/cms/intro.html) ，即 **Headless CMS**。

借助这套成熟的内容管理系统，我只需开发定制的用户端即可。因此开发效率显著提高，平均每个项目开发周期为 **10天** 。公司并没有因为开发离职而降低生产力，我也偷懒了，双赢 🎉🎉🎉

本文也是对 Headless CMS 使用的一个总结，接下来将会具体阐述：它是什么？它到底解决了什么问题？

## 什么是 Headless CMS

Headless CMS 表示 **只有后端** 的内容管理系统，它提供可视化的管理界面进行数据编辑和存储数据，并通过 API 将数据交付至各种终端（电脑、手机、手表等）。

相比传统的CMS，如 [wordpress](https://wordpress.com/) ，多了 `headless` 的特性，即无需将数据内容绑定页面模板。因此在跨平台能力上，更加出色。

从开发角度，也可以把他理解为一个更加“人性化”的 [navicat](https://www.navicat.com.cn/) 。

## 为什么要使用这个系统

简单来讲，两个主要目的：

1. 提高开发和交付效率并降低成本（偷懒、省钱）
2. 支持内容多端发布（偷懒）

就像云原生弱化了服务器硬件、操作系统的技术细节，Headless CMS 弱化了 **后端业务细节** ，进一步做到了 **技术下沉**。开发只需关注公司的业务细节，做好前端的表现层，而不需要操心后端细节。员工偷懒，老板放心🤪。

更多可以参考这份 [白皮书](https://a.storyblok.com/f/88751/x/73e70edc2e/headless-cms-how-does-it-solve-the-content-problem.pdf)

## 使用者

Headless CMS 的使用者包括，开发和运营，其中：

1. 开发者负责
   1. 内容结构的定义
   2. 现存 API 的对接
   3. 定制 API 的编写和对接
2. 运营负责
   1. 测试数据的录入
   2. 正式版数据的录入

## 使用场景

基本上只要涉及内容发布的领域，Headless CMS 都有用武之地，例如 企业建站、小游戏、新闻博客等。

当然，一些特殊的服务领域，

## 如何设计

个人理解，一个基本可用的 Headless CMS ，至少包含：

+ 三个端：管理网站、管理端API、客户端API
+ 五个模块：权限、用户角色、文档结构、文档内容、多媒体内容

目前主流的 Headless CMS 软件/平台都会采用 `Nodejs` 进行开发。其单线程非阻塞的特性，非常适合这种I/O密集型的应用场景。采用 `javascript` 或者 `typescript` 最为前后端统一的开发语言，降低了开发心智成本。

> Atwood's Law: Any application that can be written in JavaScript, will eventually be written in JavaScript.

后端框架，可以选择 [Nestjs](https://github.com/nestjs/nest) 或者 [Eggjs](https://github.com/eggjs/egg) ，这两个都是比较成熟的企业级框架。其中 Eggjs 可以通过 [Midwayjs](https://github.com/midwayjs/midway) 进一步获得完善的 typescript 开发体验。

至于前端，React 和 Vue 生态下有不少成熟稳定的框架可供选择，这里就不再赘述了～

## 潜力

在海外，近几年 Headless CMS 发展非常迅速，已有不少团队陆续推出了开源或平台型的 Headless CMS 供用户选择，如 [Storyblok](https://www.storyblok.com/) 。搭配 [JAMStack](https://jamstack.org/) 平台，搭建应用的技术成本降到了历史最低水平。

但是这些服务对中国大陆用户却不太友好，主要问题在于 **缺少本地化支持** ，即：

1. 缺少简体中文的支持，国内用户，特别是运营不好上手。
2. 无法选择国内云厂商，例如腾讯云、阿里云。这就导致了部分服务如 CDN 可能被 **墙** 的风险。

反观国内，Headless CMS 这块发展还是较迟缓的，目前暂时只有腾讯云可用（当然也不排除一些厂商没有开放这类服务）。而 Cloudbase CMS 的主要问题在于，锁定了腾讯云基础服务，导致不方便迁移和二次开发。

因此，Headless CMS 这块市场在国内潜力还是很大的。像国外的 [Strapi](https://strapi.io/) ，就在2020年拿到了 [1000万美金](https://strapi.io/blog/announcing-strapi-10m-series-a-funding) 的A轮融资。因为这个系统，具备了解决初创、小型公司 **研发开销大** 的难题，进一步将 **技术下沉** ，可以复制云技术的成功。

其中的关键，就是要做好 本地化、多云适配和高扩展。

## 总结

Headless CMS 的优势是显而易见的，也是软件行业技术下沉趋势下的一个缩影。其根本目标也是为了 **解放生产力** ：

1. 初创公司可以考虑使用市面上开源/付费的内容管理系统，作为启动项目的后端。
2. 中小公司可以考虑推出一套符合公司业务需求的内容管理系统，作为公司的业务中台，也便于数据的统一管理。

而对于有能力的团队，也可以考虑建设一个基于 Headless CMS 的开放服务平台，供上游企业选用，市场潜力很大。

Headless CMS 的发展也印证了鲁迅先生说过的一句话：

> 偷懒是人类进步的阶梯。
