# 🛒 EasyCom — Capstone E-Commerce Project

[![Next.js](https://img.shields.io/badge/Next.js-16.0.1-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.1-blue)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.3-blue)](https://www.typescriptlang.org/)

**Note:** This repository contains a capstone e-commerce project built for learning and demonstration. It is not production-ready.

![EasyCom Preview](./public/preview.png)

## ✨ Features

### 🎯 Current Features

- 🛍️ **Product Management** - Complete product catalog with categories, brands, and search
- 🛒 **Shopping Cart** - Persistent cart with real-time updates
- 💝 **Wishlist** - Save favorite products for later
- 👤 **User Authentication** - Secure authentication via Clerk
- 📦 **Order Management** - Track orders and order history
- 💳 **Multiple Payment Methods** - Stripe and Cash on Delivery
- 📱 **Responsive Design** - Mobile-first responsive UI
- 🎨 **Modern UI/UX** - Built with Tailwind CSS and Framer Motion
- 🔍 **Advanced Search & Filters** - Filter by category, brand, price, and more
- ⭐ **Product Reviews** - Customer reviews and ratings
- 📧 **Email Notifications** - Order confirmations and updates via Nodemailer

### 📝 Upcoming Features (To-Do List)

- 📊 **Advanced Analytics Dashboard** - Comprehensive business insights
- 👥 **Employee Management System** - Multi-role employee portal
- 📝 **Review Management Tools** - Moderate and manage customer reviews
- 📬 **Subscription Management** - Newsletter and email campaigns
- 📈 **Customer Insights & Reports** - Detailed customer analytics
- 📥 **Export Data to Excel/CSV** - Export all data for analysis
- 🎨 **Custom Admin Branding** - Customize admin panel
- 🚀 **Priority Support & Updates** - Fast support and early access to features

---

## 🚀 Quick Start Guide

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.0 or higher ([Download](https://nodejs.org/))
- **npm**, **yarn**, or **pnpm** package manager
- **Git** ([Download](https://git-scm.com/))

---

## 📋 Step-by-Step Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/easycom
cd easycom
```

### 2️⃣ Install Dependencies

Choose your preferred package manager:

```bash
# Using npm
npm install

# Using yarn
yarn install

# Using pnpm (recommended)
pnpm install
```

### 3️⃣ Set Up Environment Variables

Create a `.env` file in the root directory and add the following variables:

```bash
# Base URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Sanity CMS Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-11-09
SANITY_API_TOKEN=your_sanity_api_token
SANITY_API_READ_TOKEN=your_sanity_read_token

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Stripe Payment Gateway
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# Firebase (for notifications)
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id

# Email Configuration (Nodemailer)
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password

# Admin Configuration
NEXT_PUBLIC_ADMIN_EMAIL=your-admin-email@example.com

# Company Information (Optional)
NEXT_PUBLIC_COMPANY_NAME=EasyCom
NEXT_PUBLIC_COMPANY_EMAIL=your-email@example.com
NEXT_PUBLIC_COMPANY_PHONE=+1 (555) 123-4567
NEXT_PUBLIC_COMPANY_ADDRESS=123 Business Street
NEXT_PUBLIC_COMPANY_CITY=New York, NY 10001, USA
```

---

## 🏃‍♂️ Running the Application

### Development Mode

Start the development server with Turbopack (faster):

```bash
# Using npm
npm run dev

# Using yarn
yarn dev

# Using pnpm
pnpm dev
```

The application will be available at:

- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Sanity Studio**: [http://localhost:3000/studio](http://localhost:3000/studio)

### Production Build

```bash
# Build the application
npm run build

# Start the production server
npm start
```

---

## 📁 Project Structure

```
easycom/
├── app/                           # Next.js 16 App Router
│   ├── (admin)/                  # Admin Panel Routes
│   ├── (auth)/                   # Authentication Routes
│   ├── (client)/                 # Client-Facing Routes
│   ├── (public)/                 # Public Pages
│   └── (user)/                   # Protected User Routes
├── components/                   # React Components
├── actions/                     # Server Actions
├── lib/                         # Utility Functions
├── sanity/                      # Sanity CMS Configuration
├── types/                       # TypeScript Definitions
├── hooks/                       # Custom React Hooks
├── config/                      # Configuration Files
├── constants/                   # Constants
├── public/                      # Static Assets
├── .env                         # Environment Variables (git-ignored)
├── next.config.ts              # Next.js Configuration
├── tailwind.config.ts          # Tailwind CSS Configuration
├── tsconfig.json               # TypeScript Configuration
└── package.json                # Dependencies & Scripts
```

---

## 🎨 Accessing Different Sections

### 🏠 Customer Frontend

- URL: [http://localhost:3000](http://localhost:3000)
- Features: Browse products, add to cart, checkout, order tracking

### 👨‍💼 Admin Panel

- URL: [http://localhost:3000/admin](http://localhost:3000/admin)
- **Default Access**: Set your email in `NEXT_PUBLIC_ADMIN_EMAIL`
- Features: Manage products, orders, users, notifications

### 🎨 Sanity Studio (CMS)

- URL: [http://localhost:3000/studio](http://localhost:3000/studio)
- Features: Content management, product creation, image uploads

---

## 🛠️ Available Scripts

```bash
# Development with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint

# Generate Sanity TypeScript types
npm run typegen
```

---

## 📄 License

This is a **commercial product**. The current version includes core e-commerce features with additional features planned for future updates.

---

## 🤝 Support

Need help? Here's how to get support:

- 📧 **Email**: support@example.com
- 📝 **Issues**: Open an issue in the repository

---

## 🙏 Acknowledgments

Built with amazing open-source technologies:

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Sanity](https://www.sanity.io/)
- [Clerk](https://clerk.com/)
- [Stripe](https://stripe.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev/)

---

## 📈 Version

**Current Version**: 0.1.0

**Upcoming Features**:

- 📊 Advanced Analytics
- 👥 Employee Management
- 📝 Review Management
- 📬 Subscription Tools
- 📈 Customer Insights
- 📥 Data Export
- 🎨 Custom Branding
- 🚀 Priority Support

---

<div align="center">
⭐ Star this repo if you find it helpful!
</div>
