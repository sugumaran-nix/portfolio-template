# ✿ Girly Portfolio Template v2

A cute, feminine portfolio website template — pure HTML, CSS, and vanilla JS. No build step needed.

## ✨ What's new in v2

- 🌙 **Dark mode** toggle (persisted via localStorage)
- ✨ **Cursor glow** — soft pink aura follows the mouse
- 🖼 **Polaroid photo frame** with tilt-on-hover + decorative offset card
- 📐 **SVG illustration placeholders** in every project card (no broken image boxes)
- 🗺 **Process section** (Discover → Design → Deliver → Refine)
- 🎨 **Edge-faded marquee** (mask-image gradient)
- 🎯 **Mix-blend-mode blobs** (multiply in light, screen in dark)
- ♿ **Fixed WCAG contrast** — muted text darkened to #7A5A7A (passes AA)
- 🔴 **Form validation** with shake animation on invalid fields
- 📋 **Copy email to clipboard** button with tooltip feedback
- 🌀 **Mixed Anime.js easings** — outBack, outElastic, outExpo per element
- 📱 **Overlay backdrop** for mobile drawer
- 🌸 **Favicon** — SVG pink flower
- 🚫 **404 page** — branded, animated

## 📁 Structure

```
portfolio/
├── index.html          ← All sections
├── 404.html            ← Branded 404 page
├── favicon.svg         ← Pink flower favicon
├── css/
│   └── style.css       ← Full styles, dark mode tokens, custom scrollbar
├── js/
│   ├── petals.js       ← Canvas petal particle system
│   └── main.js         ← All interactions + Anime.js animations
├── assets/
│   ├── images/         ← Drop project screenshots & profile photo here
│   └── resume.pdf      ← Replace with your real PDF
└── README.md
```

## 🎨 Colour palette

| Token       | Light       | Dark (approx)       |
|-------------|-------------|---------------------|
| `--blush`   | `#FFB7C5`   | same                |
| `--lavender`| `#C9B8F0`   | same                |
| `--peach`   | `#FFD6B0`   | same                |
| `--rose`    | `#D4688A`   | same                |
| `--cream`   | `#FFF5F7`   | `#1A0D1E`           |
| `--dark`    | `#2A1A2E`   | `#F2E8F5`           |
| `--muted`   | `#7A5A7A`   | `#B090B0`           |

All tokens live in `:root` and `[data-theme="dark"]` in `style.css`.

## 🔤 Fonts (all CDN)

| Font                | Source       | Use                   |
|---------------------|-------------|-----------------------|
| Ballet              | CDNFonts     | Hero name, logo       |
| Cormorant Garamond  | Google Fonts | Section headings, quotes |
| DM Sans             | Google Fonts | Body text, UI labels  |

## ✏️ How to customise

### Personal details
Search `index.html` for and replace:
- `Your Name` — your name
- `UI / UX Designer & Creative Developer` — your role
- `hello@yourname.com` — your email (also in `main.js` line ~copy-email)
- `https://yourname.com/` — your URL (og:url meta tag)
- `#` href values on social links — your real profile URLs

### Profile photo
Replace the `<svg>` block inside `.polaroid__img` with:
```html
<img src="assets/images/your-photo.jpg" alt="Your Name" style="width:100%;height:auto;display:block;" />
```

### Project images
Replace the `<svg>` inside each `.bento__img-placeholder` with:
```html
<img src="assets/images/project-1.jpg" alt="Project name" style="width:100%;height:100%;object-fit:cover;" />
```

### Resume
Drop your PDF as `assets/resume.pdf`.

### Form backend
Find the `<form>` in `#contact` and set:
```html
<form action="https://formspree.io/f/YOUR_ID" method="POST">
```
Or use Netlify Forms, EmailJS, etc. The JS validation still applies.

### Colors
Edit the `:root` block in `style.css` — all components pick them up automatically.

### Particle count
In `petals.js`: `Array.from({ length: 26 }, ...)` — change `26` to taste.

## 🚀 Running locally

```bash
# Python 3
python -m http.server 3000

# Node
npx serve .
```
Then open `http://localhost:3000`.

## 📦 Dependencies (CDN only, no install)

| Lib            | Purpose                      |
|----------------|------------------------------|
| Anime.js v4    | All animations               |
| Tabler Icons   | Icon font                    |
| Ballet         | Display script font          |
| Cormorant Garamond | Elegant serif font       |
| DM Sans        | Body font                    |

## 🗺 Sections

1. Nav — glassmorphism, dark toggle, mobile drawer + overlay
2. Hero — Ballet script name, entrance timeline, floating blobs
3. Marquee — auto-scroll with edge fade, pause on hover
4. About — polaroid frame + tilt, SVG placeholder, sticker stats
5. Process — 4-step grid: Discover → Design → Deliver → Refine
6. Skills — 6 cards with outBack stagger
7. Projects — bento grid with SVG illustration placeholders
8. Testimonials — 3-card serif blockquotes
9. Contact — validated form + copy email button
10. Footer — logo, copyright, social icons
11. 404 — branded page

---

Made with 🌸, Anime.js, and too much iced coffee.
