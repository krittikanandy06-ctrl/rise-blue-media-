# 🚀 Rise Blue Media — Digital Growth Agency

A premium, animated agency website built with **React**, **Three.js**, and **Framer Motion**. Features a stunning 3D hero section, smooth scroll animations, glassmorphism UI, and a fully responsive design.

![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?logo=vite&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![Three.js](https://img.shields.io/badge/Three.js-r183-000000?logo=threedotjs&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4.2-06B6D4?logo=tailwindcss&logoColor=white)

---

## ✨ Features

- **3D Interactive Hero** — Immersive WebGL scene powered by React Three Fiber & Drei
- **Smooth Scrolling** — Lenis-powered buttery smooth scroll experience
- **Scroll Animations** — GSAP & Framer Motion driven section reveals and parallax effects
- **Glassmorphism UI** — Modern frosted-glass design with gradient accents
- **Responsive Design** — Fully optimized for mobile, tablet, and desktop
- **Auth Modal** — Lead capture modal with EmailJS integration
- **AI Chatbot** — Interactive chatbot with social media links
- **Performance Optimized** — Code-split vendor chunks & lazy-loaded components

---

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Framework** | React 19, Vite 8 |
| **3D Graphics** | Three.js, React Three Fiber, Drei, Postprocessing |
| **Animation** | Framer Motion, GSAP, Lenis |
| **Styling** | Tailwind CSS 4, Custom CSS |
| **Icons** | Lucide React, Simple Icons |
| **Email** | EmailJS |
| **Backend** | Supabase (optional) |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9

### Installation

```bash
# Clone the repository
git clone https://github.com/<your-username>/rise-blue-media.git
cd rise-blue-media

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173/`

### Build for Production

```bash
npm run build
npm run preview   # preview the production build locally
```

---

## 📁 Project Structure

```
rise-blue-media/
├── public/                  # Static assets (favicon, icons)
├── src/
│   ├── assets/              # Images & media
│   ├── components/
│   │   ├── AboutSection.jsx       # About section
│   │   ├── AuthModal.jsx          # Authentication / lead capture modal
│   │   ├── Chatbot.jsx            # Interactive chatbot widget
│   │   ├── CTASection.jsx         # Call-to-action section
│   │   ├── Footer.jsx             # Site footer
│   │   ├── Hero3D.jsx             # Three.js 3D hero scene
│   │   ├── HeroOverlay.jsx        # Hero text overlay
│   │   ├── MagneticButton.jsx     # Magnetic hover button effect
│   │   ├── Navbar.jsx             # Navigation bar
│   │   ├── PersistentBackground.jsx # Persistent 3D background
│   │   ├── ProcessSection.jsx     # Process / workflow section
│   │   ├── ServicesSection.jsx    # Services showcase
│   │   ├── SmoothScroll.jsx       # Lenis smooth scroll wrapper
│   │   └── StatsSection.jsx       # Statistics counter section
│   ├── App.jsx              # Root application component
│   ├── App.css              # App-level styles
│   ├── index.css            # Global styles & Tailwind directives
│   └── main.jsx             # Entry point
├── index.html               # HTML template
├── vite.config.js           # Vite configuration
├── package.json
└── .gitignore
```

---

## ⚙️ Environment Variables (Optional)

If you want to enable EmailJS or Supabase, create a `.env` file in the root:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key

VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

> **Note:** Never commit `.env` files — they are excluded via `.gitignore`.

---

## 📦 Build Optimization

The production build is code-split into optimized chunks:

| Chunk | Contents | Gzipped |
|-------|----------|---------|
| `index.js` | App code & React | ~64 KB |
| `vendor-animation` | Framer Motion, GSAP, Lenis | ~93 KB |
| `vendor-r3f` | Three.js + React Three Fiber | ~324 KB |
| `vendor-ui` | Icon libraries | ~3 KB |
| Lazy chunks | AuthModal, Chatbot, 3D Background | ~7 KB |

---

## 🌐 Deployment

### Vercel (Recommended)

```bash
npm i -g vercel
vercel
```

### Netlify

```bash
npm run build
# Deploy the `dist/` folder
```

### GitHub Pages

```bash
# Set base in vite.config.js: base: '/rise-blue-media/'
npm run build
# Deploy the `dist/` folder
```

---

## 📄 License

This project is proprietary to **Rise Blue Media**. All rights reserved.

---

<p align="center">
  Built with ❤️ by <strong>Rise Blue Media</strong>
</p>
