# 个人博客搭建过程

+ [博客网站](https://www.jay4q.com)

## 注意事项

1. 仅支持二级菜单（作为博客没必要三级菜单）。因此 `/content` 目录下仅有一层深度，即 `/content/:menu/:slug.md`
2. `/content` 路径下存放 markdown 文件，修改后需要手动刷新页面
3. 由于目前 `_app` 暂不支持 `getStaticProps`
   1. 待框架支持该特性后，`/content/:menu/index.md` 文件将作为菜单的描述
   2. 目前，将菜单数据打包在 `/content/menu.json` 下，并通过 `/src/apis/menu/static.ts` 引入，但这样就有点硬编码的味道
4. 项目管理
   1. 使用了 [小程序更新日志的语法](https://developers.weixin.qq.com/miniprogram/dev/framework/release/) 管理日志
   2. 使用 `logs.md` 记录博客更新日志
   3. 使用 `github issue` 管理需求池和BUG
   4. 使用 `github release` 管理版本
5. 建议不要用 webp 的图片，因为这样就进行图片优化了

## 更新日志

见 [logs.md](./docs/logs.md)

## 参考

+ [nextjs](https://nextjs.org/docs/getting-started)
+ [tailwind](https://tailwindcss.com/docs)
+ [emoji](https://emojipedia.org/)
+ [图标](https://react-icons.github.io/react-icons/icons?name=ri)
+ [favicon 生成](https://favicon.io)
+ [markdown](https://github.com/hashicorp/next-mdx-remote)
+ [解析 markdown](https://github.com/vercel/next.js/tree/canary/examples/with-mdx-remote)
+ [项目配置](https://github.com/jpedroschmitz/typescript-nextjs-starter)
+ [字体安装](https://kirazhang.com/posts/nextjs-custom-fonts)
+ [图片压缩](https://tinypng.com/)
+ [部署](https://vercel.com/)
