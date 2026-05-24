# Crumb & Co. Bakery

A modern, full-stack ecommerce bakery website built with Next.js, featuring seamless Stripe payments and secure authentication.

## Features

### 🛍️ Ecommerce
- **Product Catalog**: Beautiful product cards with category filtering, images, descriptions, and pricing
- **Shopping Cart**: Client-side cart management with quantity adjustments and localStorage persistence
- **Responsive Design**: Fully optimized for mobile and desktop experiences
- **Product Pages**: Detailed product views with stock indicators and discount badges

### 💳 Stripe Integration
The Stripe payment system provides a smooth, secure checkout experience:
- **Checkout Sessions**: Creates Stripe Checkout sessions via the `/api/checkout` endpoint
- **Indian Rupee Support**: Prices displayed and processed in INR (₹)
- **Secure Redirect**: Customers are seamlessly redirected to Stripe's hosted checkout page
- **Success/Cancel Handling**: Automatic redirects to order confirmation or cart page

### 🔐 Authentication
Powered by Supabase for robust, secure user management:
- **Server-Side Authentication**: Uses `@supabase/ssr` for server components with proper cookie handling
- **Middleware Protection**: Automatic route protection for admin pages via Next.js middleware
- **Login Flow**: Clean authentication with email/password using Supabase's `signInWithPassword`
- **Session Management**: Automatic session verification and cookie refresh
- **Protected Admin Dashboard**: Only authenticated users can access the enquiries dashboard

### 🎨 Design & UX
- **Modern UI**: Built with Tailwind CSS and shadcn/ui components
- **Framer Motion**: Smooth animations and transitions throughout the site
- **Mobile-First**: Responsive navigation with hamburger menu for mobile devices
- **Visual Storytelling**: About page with animated image gallery and brand values

## Tech Stack

- **Framework**: Next.js 16 with React 19
- **Database**: Supabase (PostgreSQL)
- **Payments**: Stripe
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui with Radix UI primitives
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Project Structure

```
src/
├── app/
│   ├── (auth)/login/     # Authentication pages
│   ├── admin/            # Protected admin dashboard
│   ├── api/checkout/     # Stripe checkout API
│   ├── cart/             # Shopping cart
│   ├── checkout/         # Checkout redirect
│   ├── products/[slug]/  # Individual product pages
│   └── category/[slug]/  # Category pages
├── components/           # Reusable UI components
├── lib/                  # Utilities (Stripe, Supabase)
└── middleware.ts         # Route protection
```

## Getting Started

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` to see the bakery shop.

## Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
NEXT_PUBLIC_APP_URL=
```