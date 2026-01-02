<div align="center">

# 🌐 Aamago Web — Next.js E-Commerce Platform

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Sanity](https://img.shields.io/badge/Sanity-CMS-F03E2F?style=for-the-badge&logo=sanity)](https://www.sanity.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

**The web companion to the Aamago super app — a modern e-commerce platform.**

*🔄 Actively under development — Contributions welcome!*

[Report Bug](https://github.com/ALHarih/aamago-nextjs-web/issues) · [Request Feature](https://github.com/ALHarih/aamago-nextjs-web/issues)

</div>

---

## 🔬 About The Project

**Aamago Web** is the Next.js web application for the Aamago ecosystem. It provides a responsive e-commerce experience that complements the React Native mobile app, sharing the same backend API and design language.

### 🎯 Research Focus

This project explores:
1. **Unified Platform Experience**: Consistent UX between web and mobile apps
2. **Modern Web Stack**: Next.js 16 with React 19 and server components
3. **Headless CMS**: Sanity.io for product and content management
4. **Full-Stack E-commerce**: Payments, orders, authentication

---

## ⚙️ Technical Architecture

```
aamago-nextjs-web/
├── app/                    # Next.js App Router
│   ├── (admin)/           # Admin dashboard routes
│   ├── (auth)/            # Authentication pages
│   ├── (client)/          # Customer-facing routes
│   └── (public)/          # Public pages
├── components/            # React components
├── actions/              # Server actions
├── lib/                  # Utilities & helpers
├── sanity/               # Sanity CMS config
├── types/                # TypeScript definitions
├── hooks/                # Custom React hooks
└── public/               # Static assets
```

---

## ✨ Features

### 🟢 Implemented Capabilities

| Category | Features |
|----------|----------|
| **🛍️ Shopping** | Product catalog, categories, search & filters |
| **🛒 Cart** | Persistent shopping cart, checkout flow |
| **👤 Auth** | Clerk authentication, protected routes |
| **💳 Payments** | Stripe integration |
| **📱 Responsive** | Mobile-first design, works on all devices |
| **🎨 Modern UI** | Tailwind CSS, Framer Motion animations |

### 🔵 Research & Development Plan (Todo)

- [ ] Align UI with Aamago mobile app design system
- [ ] Integrate with Aamago Backend API
- [ ] Remove unused EasyCom-specific components
- [ ] Add digital services module
- [ ] Implement wishlist functionality
- [ ] Order tracking and history
- [ ] Multi-language support

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18.0+ ([Download](https://nodejs.org/))
- **npm**, **yarn**, or **pnpm**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ALHarih/aamago-nextjs-web.git
   cd aamago-nextjs-web
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env with your credentials
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open browser**
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Sanity Studio: [http://localhost:3000/studio](http://localhost:3000/studio)

---

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Frontend** | Next.js 16, React 19, TypeScript |
| **Styling** | Tailwind CSS, Framer Motion |
| **CMS** | Sanity.io |
| **Authentication** | Clerk |
| **Payments** | Stripe |
| **State** | Zustand |
| **Deployment** | Vercel |

---

## 📜 Scripts

```bash
npm run dev       # Start development server (Turbopack)
npm run build     # Build for production
npm start         # Start production server
npm run lint      # Run ESLint
npm run typegen   # Generate Sanity types
```

---

## 🤝 Related Projects

| Project | Description |
|---------|-------------|
| **[Aamago React Native](https://github.com/ALHarih/aamago-react-native)** | Mobile app companion |
| **[Aamago Backend](https://github.com/ALHarih/aamago-backend)** | Shared API server |
| **[EasyCom](https://github.com/sajidmahamud835/easycom)** | Original codebase (forked from) |
| **[InspectHealth](https://github.com/sajidmahamud835/inspecthealth)** | Similar auth patterns |

---

## 👥 Maintainers

| Role | Contributor |
|------|-------------|
| **Original Author** | [@ALHarih](https://github.com/ALHarih) |
| **Project Coordinator & Maintainer** | [@sajidmahamud835](https://github.com/sajidmahamud835) |

---

## 📄 License

Based on [EasyCom](https://github.com/sajidmahamud835/easycom). See repository for license details.

---

<div align="center">

**⭐ Star this repo if you find it helpful!**

*Made with ❤️ using Next.js & React*

</div>
