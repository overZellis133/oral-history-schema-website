# Tech Stack Suggestions for Oral History Schema Website

## Recommended Approach: Next.js + Tailwind

### Why This Stack?

✅ **Fast & Modern**: Next.js 14 with App Router for optimal performance
✅ **Great DX**: Hot reload, TypeScript support, excellent tooling
✅ **SEO-Friendly**: Server-side rendering and static generation
✅ **Flexible**: Can add interactive features easily
✅ **Component Libraries**: Rich ecosystem for JSON viewers, search, etc.

### Technology Choices

#### Framework: Next.js 14

```bash
npx create-next-app@latest oral-history-schema-site --typescript --tailwind --app
```

**Key Features:**
- App Router for modern routing
- Server and Client Components
- Built-in optimization
- Great documentation

#### Styling: Tailwind CSS + shadcn/ui

```bash
npx shadcn-ui@latest init
```

**Install useful components:**
```bash
npx shadcn-ui@latest add accordion tabs card button input
npx shadcn-ui@latest add navigation-menu separator scroll-area
npx shadcn-ui@latest add tooltip dialog sheet
```

**Why shadcn/ui:**
- Beautiful pre-built components
- Fully customizable
- Accessible by default
- Copy/paste into your project (not a dependency!)

#### Documentation: MDX + next-mdx-remote

```bash
npm install next-mdx-remote gray-matter
npm install @tailwindcss/typography
```

**Parse and render Markdown:**
```tsx
import { MDXRemote } from 'next-mdx-remote/rsc'
import matter from 'gray-matter'

export default async function DocPage({ slug }) {
  const doc = await getDoc(slug)
  const { content, data } = matter(doc)
  
  return (
    <article className="prose lg:prose-xl">
      <MDXRemote source={content} />
    </article>
  )
}
```

#### JSON Schema Visualization: react-json-view

```bash
npm install react-json-view-lite
```

**Or for more interactive:**
```bash
npm install @rjsf/core @rjsf/utils @rjsf/validator-ajv8
```

#### Search: Fuse.js (client-side)

```bash
npm install fuse.js
```

**Simple implementation:**
```tsx
import Fuse from 'fuse.js'

const fuse = new Fuse(documents, {
  keys: ['title', 'content', 'tags'],
  threshold: 0.3
})

const results = fuse.search(query)
```

**Alternative for server-side:** FlexSearch

#### Code Highlighting: Shiki

```bash
npm install shiki
```

Better than Prism.js - used by VS Code itself!

#### Icons: Lucide React

```bash
npm install lucide-react
```

Beautiful, consistent icons.

## Project Structure

```
oral-history-schema-site/
├── app/
│   ├── layout.tsx                 # Root layout with navigation
│   ├── page.tsx                   # Homepage
│   ├── schemas/
│   │   ├── page.tsx              # Schema index
│   │   ├── interview/page.tsx    # Interview schema viewer
│   │   ├── collection/page.tsx   # Collection schema viewer
│   │   └── compare/page.tsx      # Schema comparison
│   ├── examples/
│   │   ├── page.tsx              # Examples index
│   │   └── [id]/page.tsx         # Individual example viewer
│   ├── docs/
│   │   ├── page.tsx              # Docs home
│   │   └── [slug]/page.tsx       # Individual doc pages
│   ├── playground/
│   │   └── page.tsx              # Interactive JSON editor
│   └── api/
│       ├── search/route.ts       # Search API endpoint
│       └── validate/route.ts     # Schema validation endpoint
├── components/
│   ├── ui/                       # shadcn/ui components
│   ├── SchemaViewer.tsx          # Interactive schema browser
│   ├── JsonViewer.tsx            # JSON display component
│   ├── CodeBlock.tsx             # Syntax-highlighted code
│   ├── DocNav.tsx                # Documentation sidebar
│   ├── Search.tsx                # Search component
│   └── ExampleAnnotator.tsx     # Annotated example viewer
├── lib/
│   ├── schemas/                  # Schema JSON files
│   ├── examples/                 # Example JSON files
│   ├── docs/                     # Markdown files
│   ├── loadSchemas.ts           # Schema loader utilities
│   ├── loadDocs.ts              # Doc loader utilities
│   └── search.ts                # Search utilities
├── public/
│   ├── diagrams/                # Generated SVG diagrams
│   └── downloads/               # ZIP downloads
└── styles/
    └── globals.css              # Global styles
```

## Key Components to Build

### 1. SchemaViewer Component

```tsx
'use client'

import { useState } from 'react'
import { ChevronRight, ChevronDown } from 'lucide-react'

interface SchemaNode {
  name: string
  type: string
  description?: string
  required?: boolean
  properties?: Record<string, SchemaNode>
}

export function SchemaViewer({ schema }: { schema: SchemaNode }) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set())
  
  return (
    <div className="space-y-2">
      <SchemaNode node={schema} path="" expanded={expanded} setExpanded={setExpanded} />
    </div>
  )
}

function SchemaNode({ node, path, expanded, setExpanded }) {
  const hasChildren = node.properties && Object.keys(node.properties).length > 0
  const isExpanded = expanded.has(path)
  
  return (
    <div className="border-l-2 pl-4">
      <div 
        className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded"
        onClick={() => {
          const newExpanded = new Set(expanded)
          if (isExpanded) {
            newExpanded.delete(path)
          } else {
            newExpanded.add(path)
          }
          setExpanded(newExpanded)
        }}
      >
        {hasChildren && (
          isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />
        )}
        <span className="font-mono font-semibold">{node.name}</span>
        <span className="text-sm text-gray-500">{node.type}</span>
        {node.required && <span className="text-xs text-red-500">required</span>}
      </div>
      
      {node.description && (
        <p className="text-sm text-gray-600 ml-6 mt-1">{node.description}</p>
      )}
      
      {isExpanded && hasChildren && (
        <div className="ml-4 mt-2">
          {Object.entries(node.properties).map(([key, child]) => (
            <SchemaNode 
              key={key}
              node={{ ...child, name: key }}
              path={`${path}.${key}`}
              expanded={expanded}
              setExpanded={setExpanded}
            />
          ))}
        </div>
      )}
    </div>
  )
}
```

### 2. Search Component

```tsx
'use client'

import { useState, useEffect } from 'react'
import { Search as SearchIcon } from 'lucide-react'
import Fuse from 'fuse.js'

export function Search({ documents }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [fuse, setFuse] = useState(null)
  
  useEffect(() => {
    setFuse(new Fuse(documents, {
      keys: ['title', 'content', 'type'],
      threshold: 0.3,
      includeMatches: true
    }))
  }, [documents])
  
  useEffect(() => {
    if (!fuse || !query) {
      setResults([])
      return
    }
    
    const searchResults = fuse.search(query)
    setResults(searchResults)
  }, [query, fuse])
  
  return (
    <div className="relative">
      <div className="relative">
        <SearchIcon className="absolute left-3 top-3 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search schemas, examples, docs..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-lg"
        />
      </div>
      
      {results.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-white border rounded-lg shadow-lg max-h-96 overflow-y-auto">
          {results.map((result, i) => (
            <SearchResult key={i} result={result} />
          ))}
        </div>
      )}
    </div>
  )
}
```

### 3. DocNav Component

```tsx
export function DocNav({ docs }) {
  return (
    <nav className="w-64 border-r h-screen sticky top-0 overflow-y-auto">
      <div className="p-4">
        <h2 className="font-bold text-lg mb-4">Documentation</h2>
        <ul className="space-y-2">
          {docs.map((doc) => (
            <li key={doc.slug}>
              <Link 
                href={`/docs/${doc.slug}`}
                className="block p-2 rounded hover:bg-gray-100"
              >
                {doc.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
```

## Page Implementations

### Homepage (app/page.tsx)

```tsx
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { FileJson, FolderTree, BookOpen, Globe } from 'lucide-react'

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4">
          Oral History Metadata Schema
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          A comprehensive, IIIF-compatible framework for preserving community voices
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/schemas">View Schemas</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/examples">Browse Examples</Link>
          </Button>
        </div>
      </div>
      
      {/* Feature Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <FeatureCard 
          icon={<FileJson />}
          title="IIIF Compatible"
          description="Built on international standards"
          href="/docs/overview"
        />
        <FeatureCard 
          icon={<FolderTree />}
          title="Collection Support"
          description="Organize and analyze across interviews"
          href="/schemas/collection"
        />
        <FeatureCard 
          icon={<BookOpen />}
          title="Research Ready"
          description="Themes, entities, clips, annotations"
          href="/docs/collections-guide"
        />
        <FeatureCard 
          icon={<Globe />}
          title="Global Framework"
          description="Designed for diverse communities"
          href="/docs/global-communities"
        />
      </div>
    </div>
  )
}
```

### Schema Viewer Page (app/schemas/interview/page.tsx)

```tsx
import { SchemaViewer } from '@/components/SchemaViewer'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { loadSchema } from '@/lib/loadSchemas'

export default async function InterviewSchemaPage() {
  const schema = await loadSchema('oral_history_schema.json')
  const example = await loadExample('larry_augustin_example.json')
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Interview Schema</h1>
      
      <Tabs defaultValue="interactive">
        <TabsList>
          <TabsTrigger value="interactive">Interactive View</TabsTrigger>
          <TabsTrigger value="raw">Raw JSON</TabsTrigger>
          <TabsTrigger value="example">With Example</TabsTrigger>
        </TabsList>
        
        <TabsContent value="interactive">
          <SchemaViewer schema={schema} />
        </TabsContent>
        
        <TabsContent value="raw">
          <JsonViewer data={schema} />
        </TabsContent>
        
        <TabsContent value="example">
          <div className="grid grid-cols-2 gap-4">
            <SchemaViewer schema={schema} />
            <JsonViewer data={example} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
```

## Styling Guide

### Color System

```css
/* tailwind.config.js */
module.exports = {
  theme: {
    extend: {
      colors: {
        schema: {
          primary: '#2563eb',
          light: '#dbeafe',
          dark: '#1e40af'
        },
        example: {
          primary: '#059669',
          light: '#d1fae5',
          dark: '#047857'
        },
        doc: {
          primary: '#7c3aed',
          light: '#ede9fe',
          dark: '#5b21b6'
        }
      }
    }
  }
}
```

### Typography

```css
/* globals.css */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

body {
  font-family: 'Inter', sans-serif;
}

code, pre {
  font-family: 'JetBrains Mono', monospace;
}
```

## Build & Deployment

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
npm run start
```

### Deploy to Vercel

```bash
vercel
```

Or connect GitHub repo to Vercel for automatic deployments.

### Deploy to GitHub Pages

```bash
npm run build
npm run export
# Push to gh-pages branch
```

## Performance Optimization

1. **Static Generation**: Pre-render all schema and doc pages
2. **Image Optimization**: Use Next.js Image component
3. **Code Splitting**: Lazy load heavy components
4. **Bundle Analysis**: Use `@next/bundle-analyzer`
5. **Caching**: Aggressive caching for static assets

## Alternative Stacks

### Option 2: Astro (If you want maximum simplicity)

```bash
npm create astro@latest
```

- Faster build times
- Less JavaScript sent to browser
- Great for content-heavy sites
- Can mix React/Vue/Svelte components

### Option 3: Docusaurus (If documentation-focused)

```bash
npx create-docusaurus@latest
```

- Built specifically for docs
- Great default UI
- Versioning support
- Built-in search

## Recommended Packages

```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "tailwindcss": "^3.3.0",
    "@tailwindcss/typography": "^0.5.10",
    "next-mdx-remote": "^4.4.1",
    "gray-matter": "^4.0.3",
    "fuse.js": "^7.0.0",
    "shiki": "^0.14.5",
    "react-json-view-lite": "^1.0.0",
    "lucide-react": "^0.294.0",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.0.0",
    "tailwind-merge": "^2.0.0"
  },
  "devDependencies": {
    "@types/node": "^20.9.0",
    "@types/react": "^18.2.37",
    "typescript": "^5.2.2",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.31"
  }
}
```

## Quick Start Script

```bash
#!/bin/bash
# setup.sh

# Create Next.js app
npx create-next-app@latest site --typescript --tailwind --app --no-src-dir

cd site

# Install dependencies
npm install next-mdx-remote gray-matter fuse.js react-json-view-lite lucide-react

# Install shadcn/ui
npx shadcn-ui@latest init -y

# Add components
npx shadcn-ui@latest add accordion tabs card button input navigation-menu

# Copy schema files
cp -r ../schemas ./lib/
cp -r ../examples ./lib/
cp -r ../docs ./lib/

echo "Setup complete! Run 'npm run dev' to start"
```

---

**Start with Next.js + Tailwind. It's the sweet spot of power and simplicity!** 🚀
