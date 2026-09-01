# Al-Tahoun Perfumes — مؤسسة طاحون - المسك للعطور

A production-grade **Arabic e-commerce platform** for luxury oud and Arabian perfumes. The storefront is fully **RTL, Arabic-first**, bilingual-ready, and multi-market with per-country checkout, while a dedicated **admin dashboard** powers catalog, orders, coupons, offers, customers, and payments.

Built on the Next.js App Router and backed by a remote Spring Boot API (proxied securely on the server).

---

## ✨ Features

### Storefront
- 🏪 Multi-market support (currently Egypt `EG` & Saudi Arabia `SA`) with per-market currency, locale and flag.
- 🔐 Full authentication: login, register, forgot & reset password.
- 🛍️ Product catalog & category browsing, product detail pages.
- 🛒 Shopping cart with checkout flow and order placement.
- 💳 Online payments via **Paymob** (payment card integration).
- 📄 Static pages: about, contact, shipping, returns, privacy, terms.
- 🌍 Market-aware routing: URL prefixes (`/eg`, `/sa`) with automatic market detection and redirection.

### Admin Dashboard
- 📊 Overview stats, monthly charts, recent orders & payments.
- 🗂️ Manage **products**, **categories**, **sizes**, **offers**, **coupons**, and **customers**.
- 📦 Order & payment management.
- 👤 Account & settings management with role-based access (`ADMIN` / `CUSTOMER`).

### Developer experience
- ⚡ TanStack Query for caching & server-state management.
- 🧩 TanStack Table powered data grids.
- 🎨 React Hook Form + Zod validation.
- 🧭 Zustand for client state.
- 🖌️ Shadcn UI component system on Tailwind CSS v4 + @base-ui/react.
- 🌙 Light / dark theme via `next-themes`, RTL-aware.

---

## 🧰 Tech Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 16 (App Router) |
| UI | React 19, TypeScript, Tailwind CSS v4 |
| Components | shadcn/ui, @base-ui/react, lucide-react, sonner |
| Data fetching | @tanstack/react-query |
| Tables | @tanstack/react-table |
| Forms | react-hook-form + zod |
| State | zustand |
| Payments | Paymob |
| HTTP client | axios |
| Package manager | bun |

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org) ≥ 20
- [bun](https://bun.sh) (or npm / yarn / pnpm)

### Installation

```bash
# clone the repository
git clone <your-repo-url>
cd eltahoon-perfuims

# install dependencies
bun install
```

### Environment variables

Create a `.env.local` file in the project root:

```env
# Base URL of the Next.js frontend
NEXT_PUBLIC_API_URL=http://localhost:3001

# Remote Spring Boot backend API
SPRING_API_URL=https://your-spring-api.example.com

# Paymob token for payments
PAYMOB_TOKEN=your_paymob_token
```

### Run the dev server

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000). You'll be redirected to a market route (e.g. `/eg`) automatically.

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `bun run dev` | Start the development server |
| `bun run build` | Build the application for production |
| `bun run start` | Start the production server |
| `bun run lint` | Run ESLint |

---

## 🗂️ Project Structure

```
eltahoon-perfuims/
├── app/                    # Next.js App Router
│   ├── (auth)/             # Authentication routes (login, register, reset)
│   ├── (shop)/[market]/    # Storefront (products, cart, checkout, static pages)
│   ├── api/[...url]/       # Server-side proxy to the Spring API
│   └── dashboard/          # Admin dashboard
├── components/             # Shared UI components
│   └── ui/                 # shadcn/ui primitives
├── config/                 # Market configuration
├── features/               # Feature modules (auth, cart, checkout, products,
│                           #   orders, payments, coupons, offers, …)
├── hooks/                  # Reusable React hooks
├── lib/                    # API clients & utilities
│   ├── nextAPI.ts          # Browser → Next.js API client
│   └── springAPI.ts        # Next.js → Spring Boot API client
├── stores/                 # Zustand stores
├── types/                  # Shared TypeScript types
└── enums/                  # App enums (roles, sizes)
```

---

## 🔌 Architecture

The frontend never talks to the backend directly. All requests flow through a **catch-all server proxy** (`app/api/[...url]/route.ts`) which forwards to the Spring Boot API with the user's auth cookie attached, keeping credentials server-side.

```
Browser ──▶ Next.js /api/* ──▶ Spring Boot backend
            (proxy)              (source of truth)
```

- Market selection is handled by `proxy.ts`, which sets a `country_code` cookie and redirects to the correct locale route.
- Images are served from Cloudinary (configured in `next.config.ts`).

---

## 🗺️ Roadmap

- Additional market support (KSA expansion, more currencies)
- Advanced product search & filtering
- Order tracking & status notifications
- Localization (EN/i18n) for broader audiences

---

## 🧑‍💻 Contributing

Contributions are welcome! Please open an issue or pull request for any improvements.

---

## 📄 License

Private / proprietary. All rights reserved.