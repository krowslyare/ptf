# Portfolio - Hideki Toyama

Software engineer portfolio built with Next.js, React, Tailwind CSS, and Framer Motion.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org) (App Router)
- **Styling:** [Tailwind CSS](https://tailwindcss.com)
- **Animations:** [Framer Motion](https://www.framer.com/motion)
- **Smooth scrolling:** [Lenis](https://lenis.darkroom.engineering)
- **Deployment:** [Vercel](https://vercel.com)

## Features

- **Responsive Design:** Optimized for all devices
- **Theming:** Light and dark, defaulting to light, with the accent colour
  swapped per theme so it clears WCAG AA in both
- **Motion:** Scroll-triggered reveals, layout-stable text effects, and a full
  `prefers-reduced-motion` opt-out
- **Performance:** App Router, server components, and optimized assets

## Getting Started

This project uses **pnpm**. A `preinstall` guard fails other package managers on
purpose: the repo previously carried two lockfiles, and installing with npm
updated the one Vercel doesn't read, which broke production deploys with
`ERR_PNPM_OUTDATED_LOCKFILE`.

`packageManager` pins pnpm 9.15.9. pnpm 10+ refuses to run under Node 22.13, and
the v9.0 lockfile it writes is read fine by newer pnpm, so this works on either.

1. Clone the repository:

   ```bash
   git clone https://github.com/krowslyare/ptf.git
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Run the development server:

   ```bash
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser.

## License

MIT
