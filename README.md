# Anugrah Ilhami Rizki - Portfolio Website

A modern, responsive, high-performance portfolio website built with Next.js (App Router & Turbopack), React 19, TypeScript, and Tailwind CSS.

## 🚀 Live Demo

- **Website:** [https://anugrahilhamirizki.vercel.app](https://anugrahilhamirizki.vercel.app)

---

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org) (v16 App Router with Turbopack)
- **UI & Runtime:** [React 19](https://react.dev) & [TypeScript](https://www.typescriptlang.org)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com) with CSS variables & `@theme`
- **Typography:** [Geist Font](https://vercel.com/font) (`GeistSans`, `GeistMono`)
- **Database & ORM:** [PostgreSQL](https://www.postgresql.org) via [Prisma ORM](https://www.prisma.io) with `@prisma/adapter-pg`
- **Media Storage:** [Vercel Blob](https://vercel.com/docs/storage/vercel-blob)
- **Analytics:** [Vercel Analytics](https://vercel.com/analytics)
- **Email Delivery:** [Nodemailer](https://nodemailer.com)
- **Validation:** [Zod](https://zod.dev)
- **Carousels & Sliders:** [Swiper](https://swiperjs.com)
- **Icons:** [Lucide React](https://lucide.dev)

---

## ✨ Features

- **Responsive Mobile-First UI:** Fluid, accessible layouts crafted with Tailwind CSS v4, optimized for mobile, tablet, and desktop viewports.
- **Dynamic Project Showcase:** Interactive project showcase with Swiper carousel, image sliders, key feature accordions, and tech stack badges.
- **Contact Form with Spam & Abuse Protection:**
  - Automated bot mitigation using an invisible honeypot field.
  - In-memory IP rate limiting (3 submissions per 10 minutes) with automatic capacity eviction.
  - CRLF / SMTP header injection protection and strict Zod validation.
  - Direct email dispatch to inbox via Nodemailer.
- **Admin CMS Dashboard (`/admin`):**
  - Secured via timing-safe constant-time authentication and IP rate limiting (5 attempts per 15 minutes).
  - Manage site metadata (title, description).
  - Upload custom favicons directly to Vercel Blob storage with SVG sanitization and file extension validation.
  - Tag-based on-demand cache revalidation (`revalidateTag`, `revalidatePath`).
- **Comprehensive SEO & Performance:**
  - Dynamic `sitemap.xml` and `robots.txt` route handlers.
  - Canonical URLs, OpenGraph, and Twitter Cards across all pages.
  - Next.js Turbopack image optimization with AVIF and WebP formats.
  - Strict Content Security Policy (CSP) and HTTP security headers (`X-Frame-Options`, `nosniff`, `Permissions-Policy`, `HSTS`).
  - Branded SVG site icons.
- **Accessibility (a11y):**
  - Skip-to-content keyboard bypass link.
  - Form field associations, autocomplete attributes, and ARIA live regions for status announcements.
  - Accessible accordion controls with `aria-expanded` and `aria-controls`.
  - Escape key dismiss on mobile navigation drawer.
- **Custom Error Handling:** Branded 404 Not Found and client-side Error Boundary pages.

---

## 📁 Project Structure

```text
├── lib/
│   ├── auth.ts          # Admin session verification & timing-safe constant-time auth
│   ├── prisma.ts        # Prisma client instance with pg connection pool
│   └── rateLimit.ts     # In-memory sliding-window IP rate limiter
├── prisma/
│   ├── schema.prisma    # Database models (Site, Author, Social, Project, etc.)
│   └── seed.ts          # Database seed script
├── public/              # Static assets & screenshots
├── src/
│   ├── app/
│   │   ├── about/       # About page
│   │   ├── admin/       # Admin CMS dashboard & Server Actions
│   │   ├── contact/     # Contact form page & email dispatch action
│   │   ├── project/     # Project list & dynamic slug pages
│   │   ├── error.tsx    # Runtime error boundary page
│   │   ├── not-found.tsx# Custom 404 page
│   │   ├── layout.tsx   # Root layout, fonts, and global metadata
│   │   ├── page.tsx     # Homepage / Hero section
│   │   ├── robots.ts    # Search engine robots.txt route
│   │   └── sitemap.ts   # Dynamic XML sitemap route
│   ├── components/      # Reusable React components (Navbar, Footer, ContactForm, etc.)
│   └── data/
│       └── siteData.json# Static site & author configuration data
├── next.config.ts       # Security headers, remote patterns, image settings
└── package.json
```

---

## ⚙️ Environment Variables

Create a `.env` (or `.env.local`) file in the project root with the following variables:

| Variable | Description |
| :--- | :--- |
| `POSTGRES_URL` | PostgreSQL connection string for Prisma. |
| `ADMIN_SECRET` | Secret passcode required to unlock the `/admin` dashboard. |
| `EMAIL_SENDER` | Sender email address (e.g., Gmail) used by Nodemailer. |
| `EMAIL_PASS` | App password for the sender email address. |
| `EMAIL_RECEIVER` | Destination email address to receive contact form submissions. |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob read/write token for media uploads. |
| `NEXT_PUBLIC_SITE_URL` | Base canonical domain (e.g., `https://anugrahilhamirizki.vercel.app`). |

---

## 🏃 Getting Started

### Prerequisites

- Node.js 18.18+ or 20+
- npm / pnpm / yarn / bun

### 1. Install dependencies

```bash
npm install
```

### 2. Generate Prisma Client

```bash
npx prisma generate
```

### 3. Start development server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the application.

---

## 🚀 Deployment

The repository is configured for dual-deployment support: it can be deployed seamlessly to **Vercel** or self-hosted via **Coolify** / **Docker** without breaking either setup.

### Option A: Vercel

1. Push your repository to GitHub / GitLab / Bitbucket.
2. Import the repository into your [Vercel Dashboard](https://vercel.com/dashboard).
3. Set the Environment Variables (`POSTGRES_URL`, `ADMIN_SECRET`, `BLOB_READ_WRITE_TOKEN`, `EMAIL_*`, `NEXT_PUBLIC_SITE_URL`).
4. Click **Deploy**. Next.js will build natively with edge/serverless optimizations.

### Option B: Coolify (Self-Hosted Docker)

1. In your Coolify dashboard, create a new **Application** from your Git repository.
2. Select **Dockerfile** as the Build Pack (Coolify will detect the multi-stage `Dockerfile`).
3. Set **Port Exposes** to `3000`.
4. Add your Environment Variables in Coolify's **Environment Variables** tab.
5. Click **Deploy**. The optimized standalone container will be built and served.

---

## 📜 Available Scripts

| Script | Command | Description |
| :--- | :--- | :--- |
| `npm run dev` | `next dev --turbopack` | Starts local development server with Turbopack |
| `npm run build` | `next build --turbopack` | Creates optimized production build |
| `npm run start` | `next start` | Starts production server |
| `npm run lint` | `eslint .` | Runs ESLint over the project |
| `npm run typecheck` | `tsc --noEmit` | Validates TypeScript types across the codebase |
| `npm run format` | `prettier --write .` | Formats all files with Prettier |
| `npm run format:check`| `prettier --check .` | Verifies code formatting |

---

## 📝 Commit Conventions

This project adheres to the [Conventional Commits](https://www.conventionalcommits.org/) specification (`feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, etc.) for transparent change history.
