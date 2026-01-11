# SRE Portfolio

A minimal, professional portfolio website for Site Reliability Engineers and DevOps professionals.

## Goals

- **Simple & Fast**: Clean HTML, no unnecessary JavaScript, optimized for performance
- **Professional**: Focus on clarity and content over visual effects
- **Maintainable**: Easy to update and deploy
- **Statically Generated**: Zero backend dependencies, deployed as static assets

## Tech Stack

- **Framework**: Next.js 14 with static export
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS for utility-first design
- **Deployment**: GitHub Pages via GitHub Actions

## Project Structure

```
sre-portfolio/
├── app/
│   ├── page.tsx           # Homepage
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Tailwind directives
├── public/                # Static assets
├── next.config.js         # Next.js configuration (GitHub Pages export)
├── tailwind.config.ts     # Tailwind configuration
├── tsconfig.json          # TypeScript configuration
└── package.json
```

## Getting Started

### Local Development

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` in your browser.

### Building for Production

```bash
npm run build
```

This generates a static site in the `out/` directory, ready for GitHub Pages.

## Customization

### Update Your Information

Edit [app/page.tsx](app/page.tsx):

1. Replace `Your Name` with your actual name
2. Update the headline and intro paragraph
3. Add your experience and skills
4. Update GitHub, LinkedIn, and email links

### Styling

The site uses Tailwind CSS utility classes. Modify colors and spacing in [tailwind.config.ts](tailwind.config.ts) or adjust classes directly in components.

## GitHub Pages Deployment

### Initial Setup

1. Create a GitHub repository named `sre-portfolio`
2. Push this code to the repository
3. Go to **Settings → Pages → Build and deployment**
4. Select **GitHub Actions** as the deployment method

### Automated Deployment

Create [.github/workflows/deploy.yml](.github/workflows/deploy.yml):

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
      
      - run: npm install
      - run: npm run build
      
      - uses: actions/upload-artifact@v4
        with:
          name: next-build
          path: out/

      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
```

Then every `git push` to `main` automatically rebuilds and deploys your site.

## Performance Notes

- Static export means zero runtime JavaScript overhead
- Tailwind CSS is purged in production (only used styles included)
- No images by default—add sparingly and optimize
- Consider using system fonts for best lighthouse scores

## Future Enhancements

Possible additions (keeping simplicity in mind):

- Blog section with markdown support
- Projects showcase with case studies
- Dark mode toggle
- PDF resume download
- Contact form (requires serverless function)

## License

MIT
