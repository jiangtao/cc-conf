# ccconfig Landing Page / ccconfig 着陆页

This is the official website for ccconfig.
这是 ccconfig 的官方网站。

---

## Quick Start / 快速开始

### Run locally / 本地运行

```bash
# Install dependencies / 安装依赖
npm install

# Start development server / 启动开发服务器
npm run dev

# Open in browser / 在浏览器中打开
# http://localhost:3000
```

### Build for production / 生产构建

```bash
# Build the site / 构建网站
npm run build

# Preview production build / 预览生产构建
npm start
```

---

## Deploy to Vercel / 部署到 Vercel

### Option 1: Vercel Dashboard (推荐 / Recommended)

1. Go to [vercel.com/new](https://vercel.com/new)
   访问 [vercel.com/new](https://vercel.com/new)

2. Import your `cc-config` repository
   导入你的 `cc-config` 仓库

3. Set **Root Directory** to `web`
   将 **Root Directory** 设置为 `web`

4. Click **Deploy**
   点击 **Deploy**

### Option 2: Vercel CLI

```bash
# Install Vercel CLI / 安装 Vercel CLI
npm install -g vercel

# Login / 登录
vercel login

# Deploy from web directory / 从 web 目录部署
cd web
vercel --prod
```

---

## Project Structure / 项目结构

```
web/
├── src/
│   ├── app/           # Next.js App Router pages
│   │                  # Next.js App Router 页面
│   └── components/    # React components
│                      # React 组件
├── public/            # Static files (including install.sh)
│                      # 静态文件（包括 install.sh）
├── package.json       # Dependencies
│                      # 依赖项
└── tailwind.config.ts # Tailwind CSS configuration
                       # Tailwind CSS 配置
```

---

## Tech Stack / 技术栈

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Deployment**: Vercel

---

## Need Help? / 需要帮助?

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
