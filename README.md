# 🍃 笑忘咖啡 isCafe

<div align="center">

![isCafe Logo](./public/logo.png)

**當世界太吵 啜飲一刻寧靜**

一個現代化的咖啡館線上訂購系統，提供流暢的購物體驗與完整的訂單管理功能。

[🌐 線上展示](#) | [📖 功能介紹](#功能特色) | [🛠️ 技術棧](#技術棧)

</div>

---

## 📸 專案預覽

### 主要功能展示
- ✨ 動態開場動畫
- 🛒 即時購物車系統
- 🔐 Google OAuth 登入
- 📱 完整響應式設計
- 💳 訂單管理流程

---

## 🎯 專案簡介

**isCafe** 是一個功能完整的電商平台，專為咖啡館打造的線上點餐系統。使用者可以瀏覽商品、加入購物車、並透過 Google 帳號登入完成訂購。專案採用現代化技術棧，整合 Supabase 作為後端服務，實現即時資料同步與使用者認證。

### 🎨 設計理念
- **極簡美學**：清爽的介面設計，讓使用者專注於商品本身
- **流暢體驗**：使用 Framer Motion 打造自然的動畫效果
- **行動優先**：支援手勢操作，提供原生 App 般的使用體驗

---

## 🚀 功能特色

### 核心功能

#### 🔐 使用者認證
- Google OAuth 2.0 社群登入
- 會員狀態持久化（localStorage）
- 自動恢復登入狀態
- 登入後自動恢復購物流程

#### 🛍️ 商品展示
- **三大分類**：咖啡飲品、手工甜點、精品咖啡豆
- 輪播式商品展示（支援左右滑動）
- 響應式卡片排版（手機 1 張、平板 2-3 張、桌面 4 張）
- 商品圖片、名稱、描述、價格完整顯示
- 即時庫存資料從 Supabase 載入

#### 🛒 購物車系統
- 側邊滑出式購物車抽屜
- 即時新增/移除商品
- 數量調整功能
- 自動計算小計與總金額
- 購物車內容持久化（防止重新整理遺失）
- 購物車數量角標提示

#### 📝 訂單管理
- **完整訂單流程**：
  1. 填寫訂購資訊（姓名、電話、備註）
  2. 選擇訂單類型（內用/外帶）
  3. 內用：選擇桌號
  4. 外帶：填寫外送地址
  5. 選擇付款方式（現金/信用卡/行動支付）
- 訂單即時寫入 Supabase 資料庫
- 訂單編號自動生成（時間戳記格式）
- 訂單成功頁面顯示訂單資訊

#### 🎨 使用者體驗
- **開場動畫**：首次進入網站的動態 Splash Screen（可跳過）
- **Toast 通知**：商品加入購物車即時回饋
- **載入狀態**：資料載入時顯示友善提示
- **錯誤處理**：API 錯誤自動提示使用者
- **平滑捲動**：區段導航使用平滑捲動效果

#### 📱 響應式設計
- 手機、平板、桌面完整支援
- 觸控手勢支援（左右滑動翻頁）
- 漢堡選單（手機版導航）
- 彈性網格佈局（Grid & Flexbox）

---

## 🛠️ 技術棧

### 前端框架
- **React 19.1.1** - 最新版 React，使用函式元件與 Hooks
- **Vite 7.1.7** - 極速建構工具，提供 HMR 熱更新

### UI 框架 & 樣式
- **TailwindCSS 3.4.1** - Utility-first CSS 框架
- **shadcn/ui** - 高品質 UI 元件庫（New York 風格）
- **Radix UI** - 無障礙的 Headless UI 元件
- **Lucide React** - 精美的圖示庫
- **Framer Motion 12.23.24** - 流暢的動畫效果

### 狀態管理
- **Zustand 5.0.8** - 輕量級狀態管理（購物車 & 認證狀態）
- **Zustand Persist** - 狀態持久化到 localStorage

### 後端服務
- **Supabase 2.76.1** - Backend-as-a-Service
  - 資料庫：PostgreSQL (商品、訂單資料)
  - 認證：Google OAuth 2.0
  - 即時訂閱：Real-time subscriptions

### 其他工具
- **React Swipeable 7.0.2** - 手勢操作支援
- **Sonner 2.0.7** - 優雅的 Toast 通知元件
- **ESLint** - 程式碼品質檢查

---

## 📂 專案結構

```
isCafe/
├── public/                 # 靜態資源
│   ├── logo.png           # 品牌 Logo
│   ├── layout.png         # Hero 背景圖
│   ├── in.webp            # Splash Screen 圖片
│   └── *.webp             # 商品圖片（咖啡、甜點、咖啡豆）
├── src/
│   ├── components/        # React 元件
│   │   ├── ui/           # shadcn/ui 基礎元件
│   │   ├── Cart/         # 購物車相關元件
│   │   │   ├── CartDrawer.jsx      # 購物車抽屜
│   │   │   ├── CartList.jsx        # 購物車清單
│   │   │   ├── OrderForm.jsx       # 訂單表單
│   │   │   ├── OrderSuccess.jsx    # 訂單成功頁
│   │   │   ├── LoginPrompt.jsx     # 登入提示
│   │   │   └── MemberDrawer.jsx    # 會員資訊
│   │   ├── Navbar.jsx             # 導航列
│   │   ├── Hero.jsx               # Hero 區段容器
│   │   ├── Secone.jsx             # 品牌理念區
│   │   ├── Sectwo.jsx             # 第二區段
│   │   ├── Secthree.jsx           # 第三區段
│   │   ├── Coffee.jsx             # 咖啡商品區
│   │   ├── Dessert.jsx            # 甜點商品區
│   │   ├── Bean.jsx               # 咖啡豆商品區
│   │   ├── DrinkCard.jsx          # 咖啡卡片元件
│   │   ├── DessertCard.jsx        # 甜點卡片元件
│   │   ├── BeanCard.jsx           # 咖啡豆卡片元件
│   │   ├── SplashScreen.jsx       # 開場動畫
│   │   └── Footer.jsx             # 頁尾
│   ├── stores/            # Zustand 狀態管理
│   │   ├── useAuthStore.js        # 認證狀態
│   │   └── useCartStore.js        # 購物車狀態
│   ├── hooks/             # 自訂 React Hooks
│   │   └── useAuth.js             # 認證邏輯 Hook
│   ├── lib/               # 工具函式庫
│   │   ├── supabase.js            # Supabase 客戶端
│   │   └── utils.js               # shadcn/ui 工具
│   ├── utils/             # 通用工具
│   │   └── dateUtils.js           # 日期格式化（台灣時區）
│   ├── App.jsx            # 主要應用元件
│   ├── main.jsx           # 應用入口
│   └── index.css          # 全域樣式 + Tailwind
├── vite.config.js         # Vite 設定（路徑別名等）
├── tailwind.config.js     # Tailwind 設定
├── components.json        # shadcn/ui 設定
├── eslint.config.js       # ESLint 規則
└── package.json           # 專案依賴
```

---

## 🔧 技術細節

### 狀態管理架構

#### useCartStore (購物車狀態)
```javascript
{
  items: [],           // 購物車商品列表
  addItem(),          // 新增商品到購物車
  removeItem(),       // 移除商品
  updateQuantity(),   // 更新商品數量
  clearCart(),        // 清空購物車
  getTotal()          // 計算總金額
}
```

#### useAuthStore (認證狀態)
```javascript
{
  user: null,         // 當前使用者資訊
  isAuthenticated,    // 是否已登入
  login(),           // 登入
  logout()           // 登出
}
```

### Supabase 資料結構

#### products 資料表
- `id`: UUID (主鍵)
- `name`: 商品名稱
- `description`: 商品描述
- `price`: 價格
- `image_url`: 圖片連結
- `category`: 分類 ('coffee' | 'dessert' | 'bean')
- `created_at`: 建立時間

#### orders 資料表
- `id`: UUID (主鍵)
- `order_number`: 訂單編號
- `user_id`: 使用者 ID
- `customer_name`: 顧客姓名
- `customer_phone`: 聯絡電話
- `order_type`: 訂單類型 ('dine-in' | 'takeout')
- `table_number`: 桌號（內用）
- `delivery_address`: 外送地址（外帶）
- `payment_method`: 付款方式
- `notes`: 備註
- `total_amount`: 總金額
- `status`: 訂單狀態
- `created_at`: 建立時間

#### order_items 資料表
- `id`: UUID (主鍵)
- `order_id`: 訂單 ID (外鍵)
- `product_id`: 商品 ID (外鍵)
- `quantity`: 數量
- `price`: 單價

---

## 💻 本地開發

### 環境需求
- Node.js 18+
- npm 或 yarn 或 pnpm

### 安裝步驟

1. **Clone 專案**
```bash
git clone https://github.com/SaintCrime777/isCafe.git
cd isCafe
```

2. **安裝依賴**
```bash
npm install
```

3. **設定環境變數**

建立 `.env` 檔案於專案根目錄：
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

> ⚠️ 如需測試完整功能，請確保 Supabase 專案已設定：
> - Google OAuth 認證
> - `products` 資料表（包含商品資料）
> - `orders` 與 `order_items` 資料表
> - 適當的 RLS (Row Level Security) 規則

4. **啟動開發伺服器**
```bash
npm run dev
```

5. **開啟瀏覽器**
```
http://localhost:5173
```

### 建構生產版本

```bash
npm run build
npm run preview  # 預覽生產版本
```

---

## 🧪 測試

本專案採用**手動測試**與**白箱測試**策略：

### 已測試功能
✅ 商品瀏覽與輪播切換
✅ 購物車新增/移除商品
✅ 購物車數量調整與金額計算
✅ Google OAuth 登入/登出流程
✅ 訂單表單驗證與送出
✅ 內用/外帶模式切換
✅ 響應式設計（手機、平板、桌面）
✅ 觸控手勢操作（左右滑動）
✅ Splash Screen 動畫與跳過功能
✅ 狀態持久化（重新整理後恢復購物車）

### 測試方式
- **功能測試**：每個功能模組皆經過完整的使用者流程測試
- **跨瀏覽器測試**：Chrome、Firefox、Safari、Edge
- **裝置測試**：iPhone、Android 手機、iPad、桌面
- **白箱測試**：邀請使用者進行實際操作與回饋

---

## 🚀 部署

本專案已部署至 **[平台名稱]**（如 Vercel / Netlify）

### 部署步驟（以 Vercel 為例）

1. 將專案推送至 GitHub
2. 前往 [Vercel Dashboard](https://vercel.com)
3. Import Repository
4. 設定環境變數（`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`）
5. 點擊 Deploy

### 環境變數設定
確保在部署平台設定以下環境變數：
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

---

## 📝 開發歷程

### 已完成功能
- ✅ 基礎專案架構建立
- ✅ Supabase 整合與資料庫設定
- ✅ Google OAuth 認證流程
- ✅ 購物車系統（CRUD）
- ✅ 訂單管理系統
- ✅ 響應式設計（RWD）
- ✅ 開場動畫效果
- ✅ 觸控手勢支援

### 未來規劃
- 🔜 商品搜尋功能
- 🔜 訂單歷史紀錄
- 🔜 管理後台（商品管理、訂單管理）
- 🔜 商品收藏功能
- 🔜 訂單狀態即時更新（使用 Supabase Realtime）
- 🔜 整合真實金流（綠界、藍新等）
- 🔜 深色模式支援

---

## 🎓 學習重點

這個專案展示了以下技術能力：

1. **React 現代化開發**
   - Hooks（useState, useEffect, 自訂 Hooks）
   - 元件化設計與 Props 傳遞
   - 條件渲染與列表渲染

2. **狀態管理**
   - Zustand 狀態管理
   - LocalStorage 持久化
   - 全域狀態 vs 區域狀態

3. **API 整合**
   - RESTful API 呼叫
   - 非同步資料處理（async/await）
   - 錯誤處理與 Loading 狀態

4. **認證機制**
   - OAuth 2.0 流程
   - Session 管理
   - 受保護的路由邏輯

5. **UI/UX 設計**
   - TailwindCSS 實用工具類別
   - 響應式設計原則
   - 動畫與過渡效果（Framer Motion）

6. **資料庫設計**
   - 關聯式資料庫架構
   - 外鍵關聯（orders ↔ order_items）
   - 資料正規化

---

## 👨‍💻 作者

**SaintCrime777**

- GitHub: [@SaintCrime777](https://github.com/SaintCrime777)

---

## 📄 授權

本專案採用 MIT 授權條款

---

## 🙏 致謝

- [React](https://react.dev/) - 前端框架
- [Vite](https://vitejs.dev/) - 建構工具
- [TailwindCSS](https://tailwindcss.com/) - CSS 框架
- [Supabase](https://supabase.com/) - 後端服務
- [shadcn/ui](https://ui.shadcn.com/) - UI 元件庫
- [Framer Motion](https://www.framer.com/motion/) - 動畫函式庫

---

<div align="center">

**Made with ☕ by SaintCrime777**

如果這個專案對你有幫助，歡迎給個 ⭐ Star！

</div>
