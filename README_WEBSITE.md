# Oral History Schema Website

A beautiful, interactive Next.js website for exploring the Oral History Metadata Schema.

## Features

- 🎨 **Interactive Schema Viewer** - Browse schemas with expandable tree navigation
- 📚 **Example Browser** - View real-world examples with syntax highlighting
- 📖 **Documentation Hub** - Full documentation rendered from Markdown
- 🔍 **Global Search** - Search across schemas, examples, and docs (Cmd+K)
- 🎮 **Interactive Playground** - Edit JSON with real-time validation
- 🌙 **Dark Mode** - Full dark mode support
- 📱 **Responsive Design** - Works beautifully on all devices

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or pnpm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
oral-history-schema-project-v2/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── docs/              # Documentation pages
│   ├── examples/          # Example pages
│   ├── schemas/           # Schema pages
│   └── playground/        # Interactive playground
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── SchemaViewer.tsx  # Interactive schema browser
│   ├── JsonViewer.tsx    # JSON display component
│   ├── Search.tsx        # Global search component
│   └── Navigation.tsx    # Main navigation
├── lib/                   # Utilities and data loaders
│   ├── schemas/          # Schema JSON files
│   ├── examples/         # Example JSON files
│   ├── docs/             # Markdown documentation
│   ├── loadSchemas.ts    # Schema loader
│   ├── loadExamples.ts   # Example loader
│   └── loadDocs.ts       # Documentation loader
└── public/               # Static assets
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Pages

- `/` - Homepage with features and quick links
- `/schemas` - Schema overview
- `/schemas/interview` - Interview schema viewer
- `/schemas/collection` - Collection schema viewer
- `/schemas/compare` - Side-by-side schema comparison
- `/examples` - Examples overview
- `/examples/[id]` - Individual example viewer
- `/docs` - Documentation overview
- `/docs/[slug]` - Individual documentation pages
- `/playground` - Interactive JSON editor

## Technologies

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **Fuse.js** - Client-side search
- **next-mdx-remote** - Markdown rendering
- **Lucide React** - Icons

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Deploy automatically

### Other Platforms

The site can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- Render

## Development Tips

- Use Cmd+K (or Ctrl+K) to open global search
- Schema viewer supports search to filter properties
- JSON viewer has copy-to-clipboard functionality
- Dark mode preference is saved in localStorage

## License

CC0-1.0

