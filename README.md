# Ama-Log (4rnay.net)

Ama-Log は、Next.js (Frontend) と ElysiaJS (Backend) を組み合わせた、フルスタックな個人ポートフォリオ・ブログサイトです。
最新の技術スタック（Bun, Tailwind CSS v4, Prisma 等）を活用し、高パフォーマンスかつ保守性の高いアーキテクチャを採用しています。

## 🚀 技術スタック

### Frontend
- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **State Management**: React Hooks & Server Components
- **Fonts**: Geist, Geist Mono
- **Content**: React Markdown / Rehype / Remark

### Backend
- **Framework**: [ElysiaJS](https://elysiajs.com/)
- **Runtime**: [Bun](https://bun.sh/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **API Documentation**: [Swagger](https://swagger.io/) (Elysia Swagger plugin)
- **Utilities**: 
  - [Satori](https://github.com/vercel/satori) (動的OGP/画像生成)
  - [Prismabox](https://github.com/Tanimodori/prismabox) (TypeBox 連携)

### Infrastructure & Operations
- **Container**: Docker / Docker Compose
- **Proxy**: Nginx (SSL via Let's Encrypt)
- **CI/CD**: GitHub Actions (Lint, Test, Build, SSH Deployment)
- **Development**: VS Code Dev Containers

## ✨ 主な機能

- **ブログシステム**: マークダウン形式の投稿、カテゴリ・タグ管理、閲覧数/いいね数の計測。
- **更新履歴**: ブログ記事ごとの詳細な変更履歴（blogUpdate）管理。
- **リポジトリショーケース**: 開発したプロダクトやGitHubリポジトリの紹介。
- **コンタクトフォーム**: IPアドレスやUser-Agentの記録を含む問い合わせ管理機能。
- **管理画面**: ブログ記事、リポジトリ、問い合わせ等の統合管理UI。
- **動的画像生成**: Satoriを使用した、記事タイトル等を含む動的なOGP画像生成。
- **セキュリティ**:
  - NginxレベルおよびアプリケーションレベルでのAI/クローラーボット（GPTBot等）のフィルタリング。
  - レートリミットによるDoS対策。

## 📁 ディレクトリ構成

```text
.
├── backend/            # Bun + ElysiaJS バックエンド
│   ├── prisma/         # Prisma スキーマとマイグレーション
│   ├── src/            # アプリケーションロジック (Controller/Service 分割)
│   └── uploads/        # アップロードファイル保存先
├── frontend/           # Next.js フロントエンド
│   ├── src/app/        # App Router ページ構成
│   ├── src/components/ # React コンポーネント (admin/common/blog等)
│   └── src/api/        # バックエンドAPI呼び出しの型定義・クライアント
├── nginx/              # Nginx 設定 (リバースプロキシ, SSL, ボットフィルタ)
├── .devcontainer/      # 開発コンテナ設定
├── .github/workflows/  # CI/CD パイプライン
├── docker-compose.yml # 本番環境用構成
└── init-ssl.sh         # 初回SSL証明書取得スクリプト
```

## 🛠️ 開発環境の構築

### 1. Dev Containers (推奨)
VS Code の `Remote - Containers` 拡張機能を使用し、このディレクトリを開くことで、Bun、Node.js、PostgreSQL、Prisma 等がプリセットされた環境が即座に立ち上がります。

### 2. ローカルでの手動構築
Bun がインストールされている必要があります。

#### Backend
```bash
cd backend
bun install
# .env の設定 (DATABASE_URL 等)
bunx prisma migrate dev
bun run dev
```

#### Frontend
```bash
cd frontend
bun install
# .env の設定 (NEXT_PUBLIC_BACKEND_ENDPOINT 等)
bun run dev
```

## 🗄️ データベース管理 (Prisma)

データベース操作は Prisma を通じて行います。

- スキーマ変更の反映: `bunx prisma migrate dev`
- DBビューアの起動: `bunx prisma studio`
- シードデータの投入: `bun run seed`

## 🚢 デプロイ

### 自動デプロイ (CI/CD)
GitHub の `main` ブランチに push され、CI (Frontend Build/Lint, Backend Test) がパスすると、GitHub Actions 経由で VPS へ SSH 接続し、自動的に `docker compose` による再ビルドとデプロイが行われます。

### 手動デプロイ
本番サーバー上で以下のコマンドを実行します。

```bash
docker compose -f docker-compose.yml up -d --build
```

初回のみ SSL 証明書取得のために `./init-ssl.sh <your-email>` を実行する必要があります。

## 🔒 セキュリティ

### ボットフィルタリング
`backend/src/index.ts` および `nginx/nginx.conf` にて、主要な AI クローラーや SEO ボット（GPTBot, Claude-Web, AhrefsBot 等）からのアクセスを制限しています。

---
Created by Ama (@4rna_y)
