# Lotus Haven - Yoga Studio Website

![Lotus Haven Logo](/public/images/logo.svg)

Lotus Haven is an accessible Vue.js-based website for a yoga studio, designed to connect users with yoga classes, teachers, and wellness resources.

📱 **Live Site**: [lotus-haven.vercel.app](https://lotus-haven.vercel.app/)

## 📋 Project Overview

This project is built using Nuxt 3 and Vue.js, focusing on creating a beautiful and accessible yoga studio website. The main features include:

- Class schedule and activity browsing
- Teacher profiles and information
- Searchable content
- Responsive design for all devices
- Strong focus on accessibility (WCAG compliance)

## 🚀 Tech Stack

- **Frontend Framework**: [Vue.js 3](https://vuejs.org/) with [Nuxt 3](https://nuxt.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Content Management**: [Nuxt Content](https://content.nuxtjs.org/)
- **Backend**: [Supabase](https://supabase.com/)
- **Image Handling**: [Nuxt Image](https://image.nuxtjs.org/)
- **UI Components**: [Nuxt UI](https://ui.nuxt.com/)
- **Development Tools**: ESLint, TypeScript

## ✨ Features

- **Responsive Design**: Optimized for all device sizes
- **Accessibility**: WCAG compliant with proper semantic HTML, ARIA attributes, and keyboard navigation
- **Teacher Profiles**: Detailed information about yoga instructors
- **Activity Listings**: Browse yoga classes and activities
- **Search Functionality**: Easily find classes and teachers
- **Interactive Schedule**: Browse and filter upcoming classes

## 🛠️ Setup and Installation

### Prerequisites

- Node.js (>= 16.x)
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/LotusHaven.git
cd LotusHaven
```

2. Install dependencies:

```bash
# Using npm
npm install

# Using yarn
yarn install

# Using pnpm
pnpm install

# Using bun
bun install
```

3. Set up environment variables:
   - Create a `.env` file in the root directory
   - Add necessary environment variables for Supabase connection

## 🚀 Development

Start the development server:

```bash
# Using npm
npm run dev

# Using yarn
yarn dev

# Using pnpm
pnpm dev

# Using bun
bun run dev
```

The application will be available at `http://localhost:3000`.

## 🏗️ Building for Production

```bash
# Using npm
npm run build

# Using yarn
yarn build

# Using pnpm
pnpm build

# Using bun
bun run build
```

## ♿ Accessibility Features

Lotus Haven follows WCAG 2.1 guidelines. Recent accessibility improvements include:

- **Image Alternatives**: Proper alt text for informative images and empty alt attributes for decorative elements
- **Semantic Structure**: Logical heading hierarchy (h1 → h2 → h3 → h4)
- **Keyboard Navigation**: Full keyboard support for all interactive elements
- **ARIA Attributes**: Appropriate ARIA labels and roles where needed
- **Form Accessibility**: Properly labeled form controls
- **Color Contrast**: WCAG AA compliant color contrast
- **SVG Accessibility**: Proper ARIA attributes on SVG elements

## 🧪 Testing

To run tests:

```bash
npm run test
```

## 📁 Project Structure

```
LotusHaven/
├── assets/             # Static assets (CSS, images)
├── components/         # Vue components
│   └── ui/             # UI components (cards, buttons, etc.)
├── composables/        # Composable functions
├── layouts/            # Page layouts
├── pages/              # Application pages
├── public/             # Public static files
│   └── images/         # Public images
│   └── icons/          # SVG icons
├── server/             # Server-side code
├── types/              # TypeScript type definitions
├── app.vue             # Root Vue component
├── nuxt.config.ts      # Nuxt configuration
└── package.json        # Project dependencies
```

## 📝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Team

- [Sebastian Perea](https://github.com/sebaxe07) - Project Lead
- [Daniel Ruiz](https://github.com/Daru-Mau) - Developer
- [Giacomo Scampini](https://github.com/scamgi) - Developer
- [Zeynep Erbaysal](https://github.com/zeyneperbaysal) - Developer

---

© 2025 Lotus Haven Yoga Studio | "Reconnect, Recharge, Rise"
