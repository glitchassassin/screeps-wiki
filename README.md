# Screeps Wiki

A pre-rendered SPA built using React Router.

## Contributing

The site's content is in the [`app/routes/_base+/_wiki+`](https://github.com/glitchassassin/screeps-wiki/tree/main/app/routes/_base%2B/_wiki%2B) folder.

Pages are in MDX (Markdown + JSX) format. You can add or edit them with a pull request (or directly, if you have contributor permissions). If you want to avoid cloning the repo locally, try the [github.dev web editor](https://github.dev/glitchassassin/screeps-wiki).

### What is MDX?

MDX is an extension of Markdown that allows you to import JSX (React) components and embed them in the markup. This is how we (currently) specify images, image galleries, and spoiler blocks.

### What components can I use?

Check out the available components in `/app/components`. Search the codebase for examples where they are used!

## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## Deployment

### Cloudflare Deployment

When changes are pushed to the main branch, Cloudflare Pages runs `npm run build` and publishes the contents of `build/client`.

## Styling

This template is built with [Tailwind CSS](https://tailwindcss.com/).

---

Built with ❤️ using React Router.
