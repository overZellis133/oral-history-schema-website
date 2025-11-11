# Quick Start Guide

## For Cursor AI Users

1. **Open this folder in Cursor**
   ```bash
   cursor oral-history-schema-project/
   ```

2. **Start with this prompt in Cursor:**
   ```
   Please review all files in this project and create a Next.js website 
   following the specifications in README.md and TECH_STACK_SUGGESTIONS.md.
   
   Use the step-by-step prompts in CURSOR_PROMPT.md to guide the build.
   
   Start by setting up the Next.js project structure.
   ```

3. **Or use the detailed phase-by-phase prompts in CURSOR_PROMPT.md**

## Manual Setup (Without Cursor)

### Prerequisites
- Node.js 18+ 
- npm or pnpm

### Steps

1. **Create Next.js app**
   ```bash
   npx create-next-app@latest site --typescript --tailwind --app
   cd site
   ```

2. **Install dependencies**
   ```bash
   npm install next-mdx-remote gray-matter fuse.js react-json-view-lite lucide-react framer-motion
   ```

3. **Install shadcn/ui**
   ```bash
   npx shadcn-ui@latest init
   npx shadcn-ui@latest add accordion tabs card button input navigation-menu
   ```

4. **Copy data files**
   ```bash
   cp -r ../schemas ./lib/
   cp -r ../examples ./lib/
   cp -r ../docs ./lib/
   ```

5. **Run development server**
   ```bash
   npm run dev
   ```

## Project Structure Overview

```
oral-history-schema-project/
├── README.md                          # Main project overview
├── CURSOR_PROMPT.md                   # Step-by-step prompts for Cursor
├── TECH_STACK_SUGGESTIONS.md          # Technology recommendations
├── QUICK_START.md                     # This file
├── package.json                       # Suggested dependencies
│
├── schemas/                           # JSON Schema definitions
│   ├── oral_history_schema.json      # Interview schema
│   └── collection_schema.json        # Collection schema
│
├── examples/                          # Real-world examples
│   ├── larry_augustin_example.json
│   ├── maddog_hall_example.json
│   ├── collection_example_open_source_pioneers.json
│   └── collection_example_top_level.json
│
└── docs/                              # Documentation (Markdown)
    ├── README.md                      # Schema overview
    ├── COLLECTIONS_GUIDE.md           # How collections work
    ├── IMPLEMENTATION_GUIDE.md        # Production implementation
    ├── PACKAGE_SUMMARY.md             # Complete overview
    ├── ARCHITECTURE_DIAGRAM.md        # Visual diagrams
    └── GLOBAL_COMMUNITY_ARCHIVES_GUIDE.md  # Global adaptations
```

## What to Build

### Core Features
1. **Schema Viewer** - Interactive tree view of JSON schemas
2. **Example Browser** - Browse and explore real examples
3. **Documentation** - Rendered Markdown docs with search
4. **Playground** - Interactive JSON editor with validation
5. **Search** - Global search across everything

### Pages to Create
- `/` - Homepage with hero and features
- `/schemas/interview` - Interview schema viewer
- `/schemas/collection` - Collection schema viewer
- `/schemas/compare` - Side-by-side comparison
- `/examples` - List of examples
- `/examples/[id]` - Individual example viewer
- `/docs` - Documentation home
- `/docs/[slug]` - Individual doc pages
- `/playground` - Interactive JSON editor

## Development Tips

### Loading JSON Data
```typescript
// lib/loadSchemas.ts
import fs from 'fs'
import path from 'path'

export function loadSchema(filename: string) {
  const filepath = path.join(process.cwd(), 'lib/schemas', filename)
  const content = fs.readFileSync(filepath, 'utf-8')
  return JSON.parse(content)
}
```

### Loading Markdown Docs
```typescript
// lib/loadDocs.ts
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export function loadDoc(slug: string) {
  const filepath = path.join(process.cwd(), 'lib/docs', `${slug}.md`)
  const content = fs.readFileSync(filepath, 'utf-8')
  return matter(content)
}
```

### Rendering MDX
```typescript
// app/docs/[slug]/page.tsx
import { MDXRemote } from 'next-mdx-remote/rsc'

export default async function DocPage({ params }) {
  const doc = loadDoc(params.slug)
  
  return (
    <article className="prose lg:prose-xl">
      <h1>{doc.data.title}</h1>
      <MDXRemote source={doc.content} />
    </article>
  )
}
```

## Design System

### Colors
- **Schema Blue**: `#2563eb`
- **Example Green**: `#059669`
- **Doc Purple**: `#7c3aed`
- **Dark**: `#1e293b`
- **Light**: `#f8fafc`

### Typography
- **Body**: Inter
- **Code**: JetBrains Mono

### Components
- Use shadcn/ui for base components
- Tailwind for styling
- Lucide React for icons

## Testing Your Build

### Checklist
- [ ] Homepage loads and looks good
- [ ] Can navigate to all main pages
- [ ] Schema viewer shows nested structure
- [ ] Examples render with syntax highlighting
- [ ] Documentation is readable and searchable
- [ ] Search works across all content
- [ ] Playground validates JSON against schema
- [ ] Works on mobile devices
- [ ] Dark mode works (if implemented)
- [ ] All links work
- [ ] No console errors

## Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import in Vercel
3. Deploy automatically

### GitHub Pages
```bash
npm run build
npm run export
# Push to gh-pages branch
```

## Getting Help

- Read README.md for full requirements
- Check TECH_STACK_SUGGESTIONS.md for code examples
- Use CURSOR_PROMPT.md for step-by-step guidance
- Review actual examples in /examples directory
- Reference documentation in /docs directory

## Next Steps

1. ✅ Set up Next.js project
2. ✅ Copy data files
3. 🏗️ Build schema viewer
4. 🏗️ Create example browser
5. 🏗️ Add documentation pages
6. 🏗️ Implement search
7. 🏗️ Build playground
8. ✨ Polish and deploy

---

**Happy building! 🚀**
