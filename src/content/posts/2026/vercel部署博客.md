---
title: vercel部署
published: 2026-01-18 
image: ""
description: ""
tags: ["Vercel"]
category: vercel

draft: false
---


## [如何部署到 Vercel](https:mistyr-rain.cn/posts/2026/vercel部署博客/#如何部署到-vercel)

你可以通过 Vercel 的网站 UI 或使用 Vercel 提供的官方 CLI（命令行界面）部署 Astro 站点到 Vercel。部署静态站点和按需渲染站点的过程相同。

### [通过网站UI部署](https:mistyr-rain.cn/posts/2026/vercel部署博客/#通过网站ui部署)

1. 将你的代码推送到你的在线 Git 存储库（GitHub、GitLab、BitBucket 等）.
2. [导入你的项目](https://vercel.com/new) 至 Vercel.![](https://yanyu-1308075390.cos.ap-shanghai.myqcloud.com/%E5%8D%9A%E5%AE%A2/image-20260118232425626.png)
3. Vercel 将自动检测 Astro 项目并自动为其配置正确的设置.
4. 你的应用程序已部署完成了！（例如：astro.vercel.app）

在你的项目完成导入和部署后，所有后续内容推送到（生产分支外的）分支都将自动生成 预览部署（Preview Deployments），以及对生产分支（通常是名为“main”的分支）所做的任何更改都将自动被部署为 生产部署（Production Deployment）。

[详细请参考 Vercel 文档的项目配置](https://vercel.com/docs/project-configuration)



## 