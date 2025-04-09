# The Wild Oasis 后台管理系统

一个使用现代 React 技术栈构建的酒店后台管理应用，基于 Supabase 后端，用于管理客舱(cabins)、预订(bookings)和监控酒店运营情况。

## ✨ 功能特性

*   **用户认证 (Authentication)**: 提供安全的管理员登录系统。
*   **可视化仪表盘 (Dashboard)**:
    *   展示关键运营指标 (例如：入住率、收入)。
    *   **监控客人留店时间**: 可视化展示当前和近期客人的入住时长。
    *   近期活动概览。
*   **客舱管理 (Cabins)**:
    *   查看客舱列表（表格视图）。
    *   创建、编辑、复制、删除客舱。
    *   管理客舱图片上传。
*   **预订管理 (Bookings)**:
    *   查看预订列表（表格视图）。
    *   查看预订详情。
    *   按状态过滤预订 (e.g., 未确认, 已入住, 已退房)。
    *   按日期或价格等对预订进行排序。
    *   实现智能分页和相邻页面数据预取 (Prefetching)，提升浏览体验。
    *   执行入住 (Check-in) / 退房 (Check-out) 操作。
    *   删除预订记录。
*   **应用设置 (Settings)**: (可能存在) 配置酒店基本信息、默认价格、早餐价格等。
*   **响应式设计**: 界面能良好适应不同屏幕尺寸。
*   **用户反馈**: 使用 Toast 通知为用户操作提供即时反馈。
*   **深色模式 (Dark Mode)**: (可能存在) 提供界面主题切换选项。

## 🚀 技术栈

*   **前端框架**: React
*   **路由**: React Router DOM (`react-router-dom`)
*   **数据请求与服务端状态管理**: React Query (`@tanstack/react-query`) - 用于数据获取、缓存、后台同步、乐观更新和预取。
*   **样式方案**: Styled Components (`styled-components`) - CSS-in-JS 方案，用于组件级样式。
*   **后端服务 (BaaS)**: Supabase - 提供数据库、认证、存储等后端功能。
*   **通知**: React Hot Toast (`react-hot-toast`)
*   **日期处理**: `date-fns` - 用于日期格式化和计算。
*   **图表**: Recharts - 用于在仪表盘上绘制图表。
*   **图标**: React Icons (`react-icons`) - 提供丰富的图标集。
*   **表单处理**: React Hook Form (`react-hook-form`) - (如果使用了) 用于高效、灵活地处理表单。

## 📦 安装与启动

**环境要求:**

*   Node.js (建议使用 LTS 版本)
*   npm 或 yarn

**步骤:**

1.  **克隆仓库**
    ```bash
    git clone <your-repository-url>
    cd the-wild-oasis
    ```

2.  **安装依赖**
    ```bash
    npm install
    # 或者
    # yarn install
    ```

3.  **配置 Supabase (重要)**
    *   你需要你的 Supabase 项目的 `URL` 和 `anon key`。
    *   检查 `src/services/supabase.js` 文件。Supabase 客户端可能在此文件中初始化，你需要将你的 `URL` 和 `anon key` 填入该文件中的相应位置。
    *   **强烈推荐**: 为了安全和配置灵活性，最好将 Supabase `URL` 和 `anon key` 存储在项目根目录下的 `.env` 文件中，并修改 `supabase.js` 从环境变量中读取这些值。
        *   创建 `.env` 文件：
            ```env
            VITE_SUPABASE_URL=YOUR_SUPABASE_URL
            VITE_SUPABASE_KEY=YOUR_SUPABASE_ANON_KEY
            ```
        *   在 `supabase.js` 中使用 `import.meta.env.VITE_SUPABASE_URL` 和 `import.meta.env.VITE_SUPABASE_KEY` 来读取。
        *   **注意**: `VITE_` 前缀是 Vite 项目读取环境变量所必需的。

4.  **启动开发服务器**
    ```bash
    npm run dev
    # 或者
    # yarn dev
    ```

5.  在浏览器中打开 Vite 提供的本地开发地址 (通常是 `http://localhost:5173`)。

### 📁 Project Structure

The project follows this general directory structure:

```plaintext
.
├── src/
│   ├── features/           # Business modules (e.g., authentication, bookings, cabins)
│   │   ├── authentication/
│   │   ├── bookings/
│   │   ├── cabins/
│   │   ├── check-in-out/
│   │   ├── dashboard/
│   │   └── settings/
│   ├── services/           # API request functions (wrapping Supabase client, etc.)
│   ├── ui/                 # General reusable UI components (Button, Modal, Input, etc.)
│   ├── hooks/              # General reusable custom Hooks (e.g., useOutsideClick)
│   ├── utils/              # Utility functions, constants (helpers.js, constants.js)
│   ├── context/            # Context API implementations (if used, e.g., DarkModeContext)
│   ├── styles/             # Global styles (GlobalStyles.js) or theme config
│   ├── pages/              # Page-level components, composing features/ui components
│   ├── App.jsx             # Main application component (routing, global layout)
│   └── main.jsx            # Application entry point (initialization)
├── .env.example            # Example environment variables (Recommended)
└── .env                    # Local environment variables (Do not commit to Git)
