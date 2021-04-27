---
title: "关于 Headless CMS 的思考"
createTime: "2021-04-27"
updateTime: "2021-04-27"
coverImage: "./cover.jpg"
intro: "Headless CMS 能够为初创企业赋能，降低研发和运维成本，让企业更专注于自己的业务和运营工作"
---

## 前言

在2020年底，本人通过 [cloudbase-cms](https://docs.cloudbase.net/cms/intro.html) 的帮助，独自开发了 [苏州丝绸博物馆官网](https://www.szsilkmuseum.com/)、[彩选格](https://spa.museshow.cn/jsjy-cxg/)、博物馆地图、点亮大运河 。这几个项目都需要管理后端进行运营。但借助了 Headless CMS 的能力，我仅仅开发了前端程序，就完成整个项目。

因此，我这让对 Headless CMS（以下简称无头CMS）产生了极大的兴趣。

## Headless CMS 的优势

相比传统的 CMS ，如 [Wordpress](https://wordpress.com/)，无头CMS无需将数据内容绑定页面模板，专注于内容的 **编辑、存储和交付**。正是因为前后端解耦，客户端被赋予了更多的自由。

**提升开发效率**：传统的项目研发，如企业网站，前端、管理端以及API的开发，都是必需的。而新时代的无头CMS，可是生产力的再一次提升。你可以把它想象成一个基础的业务中台，并且能够 **横向兼容** 不同的业务场景，例如 企业建站、新闻资讯、电商 等，无需开发管理端和API，只需专注于前端的开发即可。

**降低开发成本**：毕竟最基本的前端、后端、运维人员配备，少说也得每月3W多的人员成本。而搭配无头CMS，只需要一个前端开发即可完成软件开发工作，节省了 **60%多** 的人员成本，对于初创或小企业而言，是非常友好的。同时配合 PaaS，如 CDN、Serverless Mysql/Container，无需租赁昂贵的主机，即可完成代码的部署和数据的存储。

**一次编辑，多端发布**：互（物）联网时代，用户获取信息的方式多种多样，小至智能手表，大至智能电视。无头CMS通过 Restful API/Graphql 的方式，能够为各种终端提供数据内容。

## 为什么还要再开发一个 Headless CMS

目前这个领域，在海外发展日趋成熟，例如 [Strapi](https://strapi.io/)、Contentful 等，其中 Strapi 更是在2020年拿到了 [1000万美金](https://strapi.io/blog/announcing-strapi-10m-series-a-funding) 的A轮融资。

但是这些“墙外”的无头CMS，对于中国大陆用户却不太友好，缺少了 **本地化** 的能力。体现在：

1. 缺少简体中文的支持
2. 无法选择国内云厂商提供的服务，如腾讯云的 CDN、Serverless Mysql

第一个问题还能够通过更新语言包的方式解决，但是第二个问题比较“致命”，直接导致了这些舶来的无头CMS服务无法正常地在中国大陆使用。毕竟不少国外的云厂商都被隔在了“墙外”～

反观国内，就我了解，目前只有腾讯云一家在开发和推广无头CMS，即 [cloudbase-cms](https://docs.cloudbase.net/cms/intro.html) 。虽然这个 Headless CMS 是开源的，但是却有 **供应商锁定之嫌** 。因为这个无头CMS，通过腾讯云定制的SDK接入了 [CloudBase](https://cloud.tencent.com/product/tcb) ，如云数据库、云存储、云函数等，这就导致了这套代码无法在其它云厂商，如阿里云上运行。

还有一个问题在于 CloudBase 本身。由于目前腾讯云无法做到内网配置，以及云数据库的性能限制（并发数低、不好做事务），导致了部分业务场景不方便实现或性能较差。

因此，如果能开发一个 Headless CMS ，接入国内主流云厂商，并做到本地化适配的，在国内市场可能会比较受欢迎。对于初创企业或者为政企提供软件服务的小公司，能够降低不少研发、部署成本的。

## Headless CMS 设计

至少包括 **三个** 服务：管理网站、管理端API、客户端API。

至少包括 **五个** 功能模块：权限模块、用户模块、文档结构模块、文档内容模块、多媒体内容模块。

涉及到的 PaaS 服务有：COS、CDN、Serverless Container、Serverless Function（可选）。

可选云厂商有：腾讯云、阿里云。
