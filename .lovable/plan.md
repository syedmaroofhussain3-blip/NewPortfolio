

## Step 1: Global Styles & Hero Foundation

### What we're building
The foundational design system and the hero section with the animated geometric shapes background you provided.

### Global Styles
- **Color Palette:** Near-black base (`#030303`), white/gray text hierarchy (white → white/80 → white/40), with **purple/violet** as the accent color throughout gradients and interactive elements
- **Typography:** Import **JetBrains Mono** from Google Fonts for headings, badges, and code-like accents. Use **Inter** (system-like sans-serif) for body/paragraph text
- **CSS Variables:** Update the design tokens to reflect the dark monochrome + violet accent theme

### Hero Section (Landing View)
- Integrate the **HeroGeometric** component with animated floating elliptical shapes
- Install **framer-motion** as a dependency
- Customize the shapes to use **violet/purple** tones instead of indigo/rose to match your accent color
- Hero content:
  - Badge: A subtle pill label (e.g., "Portfolio" or a custom label — we'll confirm)
  - Title Line 1: **"Syed Maroof Hussain"**
  - Title Line 2: **"1st-Year B.Tech CCAI Student"**
  - Subtitle: A brief tagline about Java & Cloud Infrastructure
- Smooth fade-up animations on all text elements
- Gradient overlays top and bottom for seamless section transitions

### Technical Notes
- Single-page layout (all sections will stack vertically)
- Fully responsive (mobile-first)
- After this step, the site will show just the hero — we'll add the navbar, about, projects, etc. one at a time in subsequent steps

