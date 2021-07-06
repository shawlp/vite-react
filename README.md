# 项目

## 项目名称

基于 vite2 和 TypeScript 建立的 react h5 脚手架

## 项目技术栈说明

vite2 + TypeScript + React

## 代码规范最佳实践

### eslint

通过配置.eslintrc.\*制定团队代码规范，对于不规范代码提供提醒及自动化修复功能，能够帮助开发者及时更正不符合规范的代码

### prettier

根据规范自动格式化代码，通常与 eslint 搭配使用

### editorconfig

编辑器配置。用于覆盖编辑器默认配置，以确保不同编辑器之间，代码格式的统一

### 规范检查增强（husky + lint-staged）

在 git commit 之前，先强制进行 prettier 格式化，再检查代码规范，若检查不通过，阻止提交

### commitlint 约束

使用 commitlint 约束项目 Git 代码提交描述信息格式规范

## 文件目录结构

```
.
├── README.md
├── commitlint.config.js
├── index.html
├── package-lock.json
├── package.json
├── src
│   ├── @types
│   │   ├── declaration.d.ts
│   │   └── route.d.ts
│   ├── App.tsx
│   ├── assets
│   │   └── images
│   ├── components
│   │   └── error-boundary
│   │       └── index.tsx
│   ├── hooks
│   ├── main.tsx
│   ├── routes
│   │   ├── config.ts
│   │   └── index.tsx
│   ├── service
│   │   └── request.ts
│   ├── styles
│   │   ├── global.less
│   │   └── reset.less
│   ├── utils
│   │   └── tool.ts
│   ├── views
│   │   └── home
│   │       ├── index.less
│   │       ├── index.module.less
│   │       └── index.tsx
│   └── vite-env.d.ts
├── static
│   ├── favicon.svg
│   └── js
│       └── fastclick.min.js
├── tsconfig.json
├── vite.config.ts
```

## 注意事项
* 若文件不会被源码引用（例如 robots.txt），必须保持原有文件名（没有经过 hash）或者你压根不想引入该资源，只是想得到其 URL。放入到public目录中，在代码中使用相对路径（如/img.png）引入就好
