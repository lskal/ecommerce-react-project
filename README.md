# Welcome to React Router!

A modern, production-ready template for building full-stack React applications using React Router.

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/remix-run/react-router-templates/tree/main/default)

## Features

- 🚀 Server-side rendering
- ⚡️ Hot Module Replacement (HMR)
- 📦 Asset bundling and optimization
- 🔄 Data loading and mutations
- 🔒 TypeScript by default
- 🎉 TailwindCSS for styling
- 📖 [React Router docs](https://reactrouter.com/)

---

# Getting Started

## Installation

Install the dependencies:

```bash
npm install
```

---

## Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at:

```
http://localhost:5173
```

---

# Building for Production

Create a production build:

```bash
npm run build
```

---

## Run the Production Server

After building the project, start the production server:

```bash
npm run start
```

The application will run at:

```
http://localhost:3000
```

---

# Development Utilities

This project includes several helper scripts to simplify common development tasks such as cleaning the workspace, reinstalling dependencies, formatting code, and running project checks.

## Cleaning the Project

Remove all generated files, caches, and dependencies:

```bash
npm run clean
```

This removes:

- `node_modules`
- `build`
- `dist`
- `.vite`
- `.cache`

---

## Reinstall Dependencies

Clean the project and reinstall dependencies:

```bash
npm run reinstall
```

---

## Fresh Start

Completely reset the project, reinstall dependencies, and start the development server:

```bash
npm run fresh
```

Useful when dependencies or build caches become corrupted.

---

## Code Formatting

Format the entire project using Prettier:

```bash
npm run format
```

Check if the project is properly formatted (without modifying files):

```bash
npm run format:check
```

---

## Linting and Type Checking

Run formatting checks and TypeScript type checking:

```bash
npm run lint
```

This command ensures:

- Code formatting is consistent
- TypeScript types are valid

---

# Deployment

## Docker Deployment

To build and run using Docker:

```bash
docker build -t my-app .

docker run -p 3000:3000 my-app
```

The containerized application can be deployed to platforms such as:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

---

## DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Deploy the output of:

```bash
npm run build
```

Expected structure:

```
├── package.json
├── package-lock.json
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

---

# Styling

This template includes [Tailwind CSS](https://tailwindcss.com/) preconfigured for a simple default starting experience.

You may use any CSS methodology you prefer (Tailwind utilities, SCSS modules, CSS files, etc.).

---

Built with ❤️ using React Router.
