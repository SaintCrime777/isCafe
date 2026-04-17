# 【isCafe ☕】
## 咖啡廳點餐與訂單管理系統｜A café ordering & order management web app

### Navbar+Hero
<img width="2532" height="748" alt="image" src="https://github.com/user-attachments/assets/52f7090e-49c0-4caf-914b-d904cbca8f60" />

### 商品選單
<img width="2529" height="1152" alt="image" src="https://github.com/user-attachments/assets/6118c25a-5fb2-49a7-9c30-67d370c1bc9b" />

### 豆子選單
<img width="2535" height="1155" alt="image" src="https://github.com/user-attachments/assets/53966168-ad49-40ed-9338-9b2c605afda3" />

### 購物車清單
<img width="534" height="1267" alt="image" src="https://github.com/user-attachments/assets/cf8b24ed-92b7-4b60-88ad-0c0b4f3b013d" />
<img width="537" height="1270" alt="image" src="https://github.com/user-attachments/assets/9fb575c4-ca16-4b0b-bcf3-1dca81be53cb" />

### 歷史訂單
<img width="496" height="1160" alt="image" src="https://github.com/user-attachments/assets/0c624b00-e36a-46c5-a60c-19fbc1dc93a3" />






🔗 Live Demo: https://is-cafe.vercel.app
--------------------------------------------
✨ Features
```
功能說明
🍽️ 菜單瀏覽分類瀏覽商品，支援手勢滑動（react-swipeable）
🛒 購物車即時更新數量與小計，使用 Zustand 管理全域狀態
📋 訂單管理建立訂單後可追蹤狀態，資料即時同步至 Supabase
🔐 會員系統｜Google OAuth 登入，使用 Supabase Auth 串接
```
```
🛠️ Tech Stack
[Frontend]
React 19 + Vite 7 — 最新版本，Fast Refresh 開發體驗
Zustand — 輕量全域狀態管理（購物車、使用者狀態）
Framer Motion — 頁面與元件動畫
Tailwind CSS + Radix UI — 樣式與無障礙 UI 元件
Sonner — Toast 通知系統
```
```
[Backend / Infrastructure]
Supabase Database — 儲存菜單、訂單資料（PostgreSQL）
Supabase Auth — Google OAuth 登入／Session 管理
Supabase Storage — 商品圖片托管
Vercel — 前端部署與 CI/CD
```
```
🏗️ Architecture
Browser
  │
  ├── React 19 (UI Layer)
  │     ├── Pages: Menu / Cart / Orders / Auth
  │     └── Zustand Store (cart state, user state)
  │
  └── Supabase (BaaS)
        ├── Database  → 菜單資料、訂單記錄
        ├── Auth      → 使用者 Session
        └── Storage   → 商品圖片
```
```
📁 Project Structure
src/
├── components/
│   ├── Auth/         # 登入 Modal
│   ├── Cart/         # 購物車、訂單、會員功能
│   ├── Search/       # 搜尋抽屜
│   └── ui/           # 可複用 UI 元件（Button, Dialog...）
├── hooks/            # 自定義 Hook（useAuth）
├── stores/           # Zustand 狀態管理（Auth, Cart）
├── lib/              # Supabase client 初始化
└── utils/            # 工具函式
```
```
🔑 Technical Highlights
Supabase 全端整合：單一 BaaS 同時處理 Auth、Database、Storage，減少後端基礎建設成本
Zustand 狀態管理：選擇 Zustand 而非 Context API，避免不必要的 re-render，購物車操作響應更流暢
手勢支援：整合 react-swipeable 提升行動端瀏覽體驗
```
效能優化:
<img width="1053" height="612" alt="image" src="https://github.com/user-attachments/assets/b05374bc-09e3-4f03-92b6-a86a094e3d91" />


