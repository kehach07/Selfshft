# SelfShft

**Earn Your Fees. Own Your Time.** — *Skills That Pay Your Bills*

SelfShft is a youth-focused local gig marketplace, skill-monetization platform, and education-fee savings portal built with React, TypeScript, Tailwind CSS, and Supabase. It connects students and young professionals (**Candidates**) with local businesses and households (**Customers**) for flexible hourly, daily, weekly, monthly, or task-based work.

---

## Table of Contents

- [Core Features](#core-features)
  - [Public Discovery & Marketplace](#public-discovery--marketplace)
  - [Feature Showcases](#feature-showcases)
  - [Candidate Portal](#candidate-portal)
  - [Customer (Hirer) Portal](#customer-hirer-portal)
  - [Cross-Platform Capabilities](#cross-platform-capabilities)
- [Tech Stack](#tech-stack)
- [Database & Backend Architecture](#database--backend-architecture)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Route Reference](#route-reference)

---

## Core Features

### Public Discovery & Marketplace

- **Landing Page (`/`)**: Hero overview, platform highlights, quick-access links to core platform modules, and dual onboarding calls to action for hiring or earning.
- **Categories Directory (`/categories`)**: Browse 10 local work categories (*Bike Rides, Parcel Drop, Shop Staff, Restaurant Staff, Gym Trainers, Chefs & Cooks, Hotel Management, Home Services, Tutoring, Creative Work*) with average pay ranges, live search, location filtering, and immediate-join counts wired to open opportunities.
- **Role Opportunities (`/roles/:role`)**: Category-filtered opportunity listings with keyword/location search, pay and timing details, and inline candidate application notes (`Apply Now`).
- **Service Marketplace (`/services`)**: Browse 8 service verticals (*Tuition & Tutoring, Personal Training, Creative Services, Tiffin Services, Event Helpers, Hobby Monetization, Music Lessons, Photography*) with ratings, provider counts, pricing, and `All` / `Popular` filtering.
- **How It Works (`/how-it-works`)**: Step-by-step onboarding and workflow breakdowns for both Candidates and Customers.
- **Community Hub (`/community`)**: Student success stories, referral program highlights, financial discipline challenges, and Youth Gig Kit resource previews.

### Feature Showcases

- **Platform Features (`/features`) & Trust/Verification (`/features/verification`)**: Overview of core earning, saving, matching, and verification capabilities.
- **Fee Wallet (`/features/fee-wallet`)**: Showcases education-fee savings goals, goal progress tracking, Fee Safe Mode protection, and fee-aligned gig suggestions.
- **AI Skill-to-Gig Matcher (`/features/skill-matcher`)**: Showcases skill-based recommendation workflows and match scoring across 6 skill categories.
- **Flexible Scheduling (`/features/scheduling`)**: Highlights hourly, daily, and weekend gig availability slots and calendar planning.
- **Local Hiring Map (`/features/map`)**: Location and radius-based discovery preview for nearby gigs and candidates.
- **Learn & Earn (`/features/learn-earn`)**: Micro-certification courses and progress tracking tied to hiring pipelines.

### Candidate Portal

- **Authentication & 4-Step Onboarding (`/login/candidate`)**:
  - Sign in via **Email & Password**, **Google OAuth**, or **Phone SMS OTP**.
  - 4-step registration wizard covering Basic Info, Qualifications & Education, Skills (up to 5 presets, experience level, portfolio items), and Location & Work Radius.
- **Candidate Dashboard (`/candidate/dashboard`)**: Personalized greeting, upcoming shift overview, active applications/earnings/rating summary cards, and quick navigation to availability and clock-in tools.
- **Candidate Profile (`/candidate/profile`)**:
  - Avatar upload (stored as data URL), verification badge status, profile completion progress bar, and inline edit/save mode.
  - **Immediate Join Feed**: Filterable by location to surface urgent open gigs with direct `View` and `Apply` actions.
  - **5 Profile Tabs**: `Personal` (contact, bio, hourly rate, address, languages, social links), `Education` (qualification, institution, course, years, achievements), `Skills & Work` (up to 10 skills, experience level, availability toggles), `Portfolio` (manage portfolio entries & video intro status), and `Resume`.
- **Public Profile Preview (`/candidate/profile-view`)**: Read-only candidate card with calculated trust score ring, education timeline, skill bars, and portfolio showcase.
- **Availability (`/candidate/availability`) & Calendar (`/candidate/calendar`)**:
  - Interactive monthly availability grid (`off` / `available` / `booked` day states) and schedule presets (*After College Hours, Weekend Gigs, Vacation Only, Night Shifts*).
  - Live shift clock-in / end-shift stopwatch timer (`HH:MM:SS`).
- **Local Gig Map (`/candidate/map`)**: Location search, radius selector (`5`, `10`, `20`, `50` km), map pins, and nearby gig cards populated from active opportunities.
- **Fee Wallet (`/candidate/wallet`), Applications (`/candidate/applications`), Shift History (`/candidate/history`), & Notifications (`/candidate/notifications`)**: Dedicated views for tracking fee balances, application statuses, past shifts, and unread alerts.

### Customer (Hirer) Portal

- **Authentication & 3-Step Onboarding (`/login/customer`)**:
  - Sign in via **Email & Password**, **Google OAuth**, or **Phone SMS OTP**.
  - 3-step registration wizard covering Business Details, Hiring Needs (multi-select across 21 categories, schedule, budget), and Location & Confirmation.
- **Customer Dashboard (`/customer/dashboard`)**: Profile completion meter, live/booked gig counters, quick `Post a New Gig` banner, active gig cards with applicant counts, and top-rated nearby candidate highlights.
- **Customer Profile (`/customer/profile`)**: Logo upload, live/applicant/booked metrics, and 3 structured tabs (`Business`, `Contact & Location`, `Hiring Preferences` with editable hiring-need tags).
- **Post a Gig (`/customer/post-gig`)**: 3-step creation wizard supporting **Business** or **Individual** employer types, 19 role categories, city & hunt location, openings count, duration, timing, pay amount/unit (`/hour`, `/day`, `/week`, `/month`, `/task`), and an `Immediate Join` flag.
- **Candidate Search (`/customer/search`) & Saved Candidates (`/customer/saved`)**: Searchable candidate directory with filter chips (`Verified Only`, `Top Rated`, `Near Me`, `Available Now`, `Full Time`) and shortlisted candidate management.
- **My Gigs (`/customer/gigs`) & Hiring History (`/customer/history`)**: Filter posted gigs by `All`, `Live`, `Booked`, or `Closed`, inspect applicant counts, and review past booked roles.
- **Shift Completion & Payment Release Workflow**:
  1. **Authorize Shift (`/customer/manage`, `/customer/authorize`)**: Generates and copies a 4-digit shift verification code to start/authorize work.
  2. **Finalize Shift (`/customer/finalize`)**: 4-digit OTP-style release code entry to confirm completion.
  3. **Shift Completed (`/customer/completed`)**: Displays payout release progress, an interactive 4-question workplace survey, and a 5-star candidate rating prompt.

### Cross-Platform Capabilities

- **Theme Support**: Light and dark mode switching via `ThemeContext`, persisted in `localStorage` (`selfshft-theme`).
- **Role-Aware Portals**: Separate responsive layouts (`CandidateLayout` and `CustomerLayout`) with desktop sidebars and mobile navigation menus.
- **Data Persistence & Realtime**: `AuthContext` manages Supabase Auth sessions, profile/opportunity queries and mutations, and live `postgres_changes` subscriptions on `opportunities` and `opportunity_bookings`.

---

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite (`@vitejs/plugin-react-swc`), React Router DOM v6
- **UI & Styling**: Tailwind CSS, `tailwindcss-animate`, `@tailwindcss/typography`, shadcn/ui (Radix UI primitives), Lucide React, Sonner
- **Forms & Validation**: React Hook Form, `@hookform/resolvers`, Zod
- **State & Data Fetching**: TanStack React Query (`@tanstack/react-query`), React Context (`AuthContext`, `ThemeContext`)
- **Backend & Database**: Supabase (`@supabase/supabase-js` for Auth, PostgreSQL, RLS, and Realtime), Drizzle ORM / Drizzle Kit (`drizzle-orm`, `drizzle-kit`, `postgres`)
- **OAuth Helper**: Supabase Auth OAuth wrapped in `src/integrations/selfshft/index.ts`

---

## Database & Backend Architecture

The Supabase PostgreSQL schema (`supabase/migrations/*` and `src/integrations/supabase/types.ts`) defines **21 Row-Level Security (RLS) enabled tables**, the `app_role` enum (`candidate` | `customer`), automatic `updated_at` triggers, a verification approval trigger (`mark_candidate_verified`), and Realtime publication for `opportunities` and `opportunity_bookings`:

- **Identity & Profiles**: `user_roles`, `candidate_profiles`, `customer_profiles`, `verification_requests`
- **Gigs, Bookings & Shifts**: `opportunities`, `opportunity_bookings`, `shifts`, `candidate_availability`, `reviews`
- **Fee Wallet & Goals**: `wallets`, `wallet_transactions`, `financial_goals`
- **Skill Matching & Learning**: `skill_matches`, `courses`, `course_modules`, `user_course_progress`
- **Community, Messaging & Alerts**: `community_posts`, `post_reactions`, `conversations`, `messages`, `notifications`

> **Note**: Several secondary portal/showcase screens (such as `CandidateWallet`, `CandidateApplications`, `CandidateHistory`, `CandidateNotifications`, `CandidateAvailability`, `CustomerSearch`, `CustomerSaved`, and the `/features/*` showcase pages) currently render local or sample UI data and are ready to be wired directly to the corresponding Supabase tables above.

---

## Project Structure

```text
.
├── .selfshft/
│   └── north-star/north-star.md     # Project north star & primary metric
├── drizzle/
│   ├── schema.ts                    # Drizzle schema entry
│   └── migrations/                  # Drizzle SQL migrations
├── public/                          # Static public assets & favicon
├── src/
│   ├── assets/                      # Brand logos, icons, and category imagery
│   ├── components/
│   │   ├── ui/                      # shadcn/ui components
│   │   ├── CandidateLayout.tsx      # Candidate portal shell
│   │   ├── CustomerLayout.tsx       # Customer portal shell
│   │   ├── Navbar.tsx & Footer.tsx  # Public navigation & footer
│   │   └── ...                      # Landing & layout sections
│   ├── contexts/
│   │   ├── AuthContext.tsx          # Auth, profiles, opportunities & Realtime sync
│   │   └── ThemeContext.tsx         # Light/dark theme state
│   ├── hooks/                       # Custom hooks (toast, mobile detection)
│   ├── integrations/
│   │   ├── selfshft/index.ts        # OAuth wrapper
│   │   └── supabase/                # Supabase client, types & preview auth storage
│   ├── lib/utils.ts                 # Classname & utility helpers
│   ├── pages/                       # Public, Candidate, and Customer route pages
│   ├── App.tsx                      # Router & top-level providers
│   └── main.tsx                     # App entry point
├── supabase/
│   ├── config.toml                  # Supabase project config
│   └── migrations/                  # PostgreSQL schema, RLS & triggers
├── drizzle.config.ts                # Drizzle Kit configuration
├── index.html                       # Document metadata & SEO tags
├── package.json                     # Dependencies & npm scripts
├── tailwind.config.ts               # Tailwind theme configuration
└── vite.config.ts                   # Vite config (dev server on port 8080)
```

---

## Getting Started

### Prerequisites

- **Node.js** (v18+ recommended) and **npm**

### Environment Variables

Copy `.env.example` to `.env` in the project root and fill in your Supabase credentials:

```sh
cp .env.example .env
```

```env
VITE_SUPABASE_PROJECT_ID="your_supabase_project_id"
VITE_SUPABASE_PUBLISHABLE_KEY="your_supabase_anon_or_publishable_key"
VITE_SUPABASE_URL="https://your-project.supabase.co"
```

If running Drizzle migrations directly, also set:

```env
SELFSHFT_DB_MIGRATION_URL="postgresql://user:password@host:port/database"
```

### Installation & Local Development

```sh
# 1. Install dependencies
npm install

# 2. Start the Vite development server (http://localhost:8080)
npm run dev
```

---

## Available Scripts

Defined in `package.json`:

- `npm run dev` — Start the Vite dev server on port `8080`
- `npm run build` — Build the production bundle
- `npm run build:dev` — Build in development mode
- `npm run preview` — Preview the production build locally
- `npm run lint` — Run ESLint across the repository

---

## Route Reference

| Area | Routes |
| :--- | :--- |
| **Public** | `/`, `/categories`, `/services`, `/how-it-works`, `/community`, `/roles/:role` |
| **Features** | `/features`, `/features/fee-wallet`, `/features/skill-matcher`, `/features/scheduling`, `/features/map`, `/features/learn-earn`, `/features/verification` |
| **Auth** | `/login/candidate`, `/login/customer` |
| **Candidate Portal** | `/candidate/dashboard`, `/candidate/profile`, `/candidate/profile-view`, `/candidate/availability`, `/candidate/calendar`, `/candidate/map`, `/candidate/wallet`, `/candidate/applications`, `/candidate/history`, `/candidate/notifications` |
| **Customer Portal** | `/customer/dashboard`, `/customer/profile`, `/customer/post-gig`, `/customer/search`, `/customer/saved`, `/customer/gigs`, `/customer/history`, `/customer/manage`, `/customer/authorize`, `/customer/finalize`, `/customer/completed` |
