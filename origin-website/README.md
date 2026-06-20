# Origin EVA — 起源国际贸易

Next.js 14 App Router + Supabase CMS + Tailwind CSS

## 快速开始

### 1. 安装依赖
```bash
npm install
```

### 2. 配置环境变量
```bash
cp .env.local.example .env.local
# 填入你的 Supabase 项目 URL、anon key、service role key
```

### 3. 初始化数据库
在 Supabase SQL Editor 中运行 `supabase/schema.sql`

### 4. 创建 Storage Bucket
在 Supabase Dashboard → Storage 中创建两个 bucket：
- `images` (public)
- `avatars` (public)

### 5. 启动开发服务器
```bash
npm run dev
```

访问 http://localhost:3000

## 项目结构

```
├── app/
│   ├── (site)/          # 前台页面
│   ├── admin/           # CMS 后台
│   └── api/admin/       # API 路由
├── components/
│   ├── layout/          # Nav / Ticker / Footer
│   ├── sections/        # 页面 Section 组件
│   ├── admin/           # 后台管理组件
│   └── ui/              # 通用 UI 组件
├── lib/                 # Supabase 客户端 + 数据查询
├── types/               # TypeScript 类型定义
├── hooks/               # React Hooks
└── supabase/            # SQL Schema
```

## CMS 后台

访问 `/admin/login`，使用 Supabase Auth 账号登录。

在 Supabase Dashboard → Authentication → Users 中创建管理员账号。

## 部署到 Vercel

```bash
vercel deploy
```

在 Vercel 项目设置中添加环境变量：
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `REVALIDATE_SECRET`

## 技术栈

- **Next.js 14** App Router + Server Components + ISR
- **Supabase** PostgreSQL + Storage + Auth + Realtime
- **Tailwind CSS** v3 + BlueYard 设计系统
- **TypeScript** 全类型覆盖
- **React Hook Form** + **Zod** 表单验证
- **dnd-kit** 拖拽排序
- **sharp** WebP 图片压缩
