# CaspiaPay — Payment Platform Demo for Azerbaijan

This is a **demo/prototype** of a Stripe-like payment platform designed for Azerbaijan. The goal is to showcase the product to banks (Kapital Bank, PASHA Bank) to secure an acquiring partnership.

**Important:** This is NOT a production system. It uses mock data and does not process real payments. It's a sales tool to demonstrate technical capability and product vision.

---

## 📂 Project Structure

```
PayCas/
├── dashboard/          # Merchant Dashboard (React + Vite)
├── docs/              # Developer Documentation Site (React + Vite)
├── pitch/             # Pitch materials for banks
└── README.md          # This file
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 20+ (via nvm recommended)
- npm 10+

### Installation

**1. Dashboard**
```bash
cd dashboard
npm install
npm run dev
```
Visit: [http://localhost:5173](http://localhost:5173)

**2. Documentation Site**
```bash
cd docs
npm install
npm run dev
```
Visit: [http://localhost:5173](http://localhost:5173)

### Build for Production

```bash
# Dashboard
cd dashboard
npm run build

# Docs
cd docs
npm run build
```

---

## 📊 Dashboard Features

The merchant dashboard showcases what businesses will see when using CaspiaPay:

- **Login Page** — Clean authentication UI (no real auth)
- **Dashboard/Home** — Revenue stats, charts, recent transactions
- **Transactions** — Full transaction history with filters and search
- **Merchants** — Sub-merchant management (for marketplace platforms)
- **Payouts** — Track payments to merchants
- **Analytics** — Revenue trends, success rates, payment methods
- **Settings** — API keys, webhooks, team management

**Mock Data:**
- 15 realistic Azerbaijani merchants (cafes, e-commerce, delivery apps)
- 500+ generated transactions over 30 days
- Realistic amounts in AZN (₼)
- Visa/Mastercard split, success/failure rates

**Tech Stack:**
- React + Vite
- Tailwind CSS
- Recharts for data visualization
- Lucide React for icons
- React Router for navigation

---

## 📖 Documentation Site Features

The docs site shows developers how easy it is to integrate with CaspiaPay:

**Pages:**
- **Home** — Landing page with hero and quick example
- **Quickstart** — 15-minute integration guide
- **Authentication** — API key usage
- **API Reference:**
  - Charges (create, retrieve, refund, list)
  - Customers (save cards, recurring payments)
  - Payouts (send funds to merchants)
  - Merchants (Connect API for marketplaces)
- **Webhooks** — Real-time event notifications
- **Connect/Marketplace** — Multi-vendor platform guide
- **Testing** — Test cards, sandbox environment
- **SDKs** — Node.js, Python, PHP, Ruby, Go examples
- **Security** — PCI-DSS, encryption, fraud detection

**Tech Stack:**
- React + Vite
- Tailwind CSS
- React Syntax Highlighter (code blocks with tabs)
- Lucide React for icons

---

## 🎯 What This Demonstrates

**To Banks:**
- Modern, developer-friendly payment API
- Clean UX for merchants (dashboard)
- Professional documentation
- Support for advanced use cases (marketplaces, split payments)
- Technical capability to build and scale

**What This Is NOT:**
- No real payment processing
- No backend/database
- No user authentication
- No production security measures
- All data is mock/generated

---

## 🏦 Pitch Materials

See `pitch/one-pager.md` for the one-page pitch document to present to banks.

**Key Points:**
- CaspiaPay operates as a payment facilitator under the bank's license
- We bring the bank 200+ merchants they wouldn't reach otherwise
- Revenue model: 2.5-2.9% per transaction, split with bank
- Zero risk for the bank — we drive volume, they provide infrastructure

---

## 🎨 Brand Identity

- **Name:** CaspiaPay
- **Tagline:** "The simplest way to accept payments in Azerbaijan"
- **Colors:**
  - Navy `#0A1628` — Primary dark
  - Teal `#00D4AA` — Accent
  - Gold `#C4A962` — Secondary (nods to Azerbaijan)
- **Fonts:**
  - Plus Jakarta Sans — UI
  - JetBrains Mono — Code

---

## 📝 Next Steps

**After securing a bank partnership:**

1. Build real backend (Node.js/Go + PostgreSQL)
2. Integrate with bank's acquiring system
3. Implement real authentication (OAuth 2.0)
4. Add PCI-DSS compliant card tokenization
5. Build fraud detection ML models
6. Add 3D Secure support
7. Create mobile apps (React Native)
8. Launch beta with 5-10 pilot merchants

---

## 👨‍💻 Development

**Dashboard Development:**
```bash
cd dashboard
npm run dev    # Start dev server
npm run build  # Build for production
```

**Docs Development:**
```bash
cd docs
npm run dev    # Start dev server
npm run build  # Build for production
```

**Key Files:**
- `dashboard/src/data/` — Mock data generators
- `dashboard/src/pages/` — All dashboard pages
- `docs/src/pages/` — All documentation pages
- `docs/src/components/ui/CodeBlock.jsx` — Syntax-highlighted code examples

---

## 📄 License

This is a demo project for business development purposes.

---

## 📧 Contact

For partnership inquiries: **farid.gahramanov78@gmail.com**

---

**Built with ❤️ for Azerbaijan's digital economy**
