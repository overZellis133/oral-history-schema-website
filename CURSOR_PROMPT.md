# Cursor AI Prompts - Build the Oral History Schema Website

## 🎯 Primary Objective

Build a beautiful, interactive website that makes the oral history metadata schema accessible, searchable, and visually compelling. The site should help developers understand and implement the schema while showcasing its power for community archives.

## 📋 Suggested Cursor Workflow

### Phase 1: Setup (Start here!)

**Prompt for Cursor:**
```
I have a comprehensive oral history metadata schema project with JSON schemas, 
real examples, and extensive documentation. Please:

1. Create a Next.js 14 app with TypeScript, Tailwind CSS, and App Router
2. Set up the project structure following TECH_STACK_SUGGESTIONS.md
3. Install shadcn/ui and the recommended packages
4. Copy the schemas, examples, and docs to the appropriate directories
5. Create a basic layout with navigation
6. Set up routing for: home, schemas, examples, docs, and playground

Follow the structure in README.md and use the tech stack from TECH_STACK_SUGGESTIONS.md
```

### Phase 2: Schema Visualization

**Prompt for Cursor:**
```
Build an interactive schema viewer component that:

1. Reads the oral_history_schema.json file
2. Displays it as an expandable/collapsible tree
3. Shows for each property:
   - Name (in monospace font)
   - Type
   - Description
   - Required/Optional status
   - Default values if any
4. Allows clicking on properties to see more details
5. Includes a search box to filter properties
6. Has tabs to switch between "Interview Schema" and "Collection Schema"

Make it visually beautiful with Tailwind CSS. Use colors from TECH_STACK_SUGGESTIONS.md
```

### Phase 3: Example Browser

**Prompt for Cursor:**
```
Create an example browser that:

1. Lists all example files (Larry Augustin, Maddog Hall, Collections)
2. Shows each example in a syntax-highlighted JSON viewer
3. Allows collapsing/expanding nested objects
4. Has "Copy" buttons for the entire JSON or specific sections
5. Annotates key fields with explanations (tooltips or side panel)
6. Includes a split view showing schema definition next to example value
7. Links from example properties back to schema documentation

Use react-json-view-lite or similar for the JSON display.
```

### Phase 4: Documentation Pages

**Prompt for Cursor:**
```
Convert all the Markdown documentation to beautiful web pages:

1. Parse the .md files in /docs directory
2. Render with next-mdx-remote
3. Create a documentation sidebar with all doc titles
4. Style with @tailwindcss/typography
5. Add syntax highlighting for code blocks using Shiki
6. Include a table of contents for each doc page
7. Add "Edit on GitHub" links
8. Make the ASCII diagrams in ARCHITECTURE_DIAGRAM.md into actual SVG visuals

Use the prose classes from Tailwind Typography for beautiful readable text.
```

### Phase 5: Search Functionality

**Prompt for Cursor:**
```
Implement global search across the entire site:

1. Index all schemas, examples, and documentation
2. Use Fuse.js for fuzzy search
3. Create a search component in the header (keyboard shortcut Cmd+K)
4. Show results grouped by type (Schema, Example, Documentation)
5. Highlight matching text in results
6. Make results clickable to navigate to the content
7. Support filtering by type

Make it feel like modern dev tools search (like Algolia DocSearch).
```

### Phase 6: Interactive Playground

**Prompt for Cursor:**
```
Build an interactive JSON editor playground:

1. Monaco Editor or similar for JSON editing
2. Load example interviews as starting templates
3. Validate against the schema in real-time
4. Show validation errors with helpful messages
5. Allow downloading the custom JSON
6. Add "Load Example" dropdown with all examples
7. Include "Reset" and "Clear" buttons

Make it feel like a mini IDE for oral history metadata.
```

### Phase 7: Visual Diagrams

**Prompt for Cursor:**
```
Convert the ASCII diagrams in ARCHITECTURE_DIAGRAM.md into interactive SVG visualizations:

1. The hierarchical structure (Organization → Collection → Interview)
2. The data flow diagram
3. The cross-cutting concerns diagram
4. The entity aggregation diagram

Use React and SVG. Make nodes clickable to navigate to relevant pages.
Consider using D3.js or React Flow for the network diagrams.
```

### Phase 8: Homepage & Polish

**Prompt for Cursor:**
```
Create a stunning homepage that:

1. Has a hero section with the project title and description
2. Shows key features in cards with icons
3. Includes "Get Started" call-to-action buttons
4. Displays a quick example (maybe animated typing?)
5. Shows testimonials or use case cards
6. Has a "Download" section for the full package
7. Links to GitHub repository

Add dark mode support and smooth animations with Framer Motion.
Make it feel modern and professional like Vercel, Stripe, or Linear.
```

### Phase 9: Responsive & Accessible

**Prompt for Cursor:**
```
Ensure the site is fully responsive and accessible:

1. Test on mobile, tablet, and desktop
2. Make navigation work well on small screens (hamburger menu)
3. Ensure all interactive elements are keyboard accessible
4. Add proper ARIA labels
5. Test with a screen reader
6. Ensure color contrast meets WCAG AA
7. Add skip-to-content links
8. Make code blocks horizontally scrollable on mobile

Fix any responsive issues you find.
```

### Phase 10: Performance & SEO

**Prompt for Cursor:**
```
Optimize for performance and SEO:

1. Add proper meta tags for all pages
2. Generate a sitemap.xml
3. Add Open Graph tags for social sharing
4. Optimize images
5. Implement proper caching headers
6. Add loading states for data fetching
7. Lazy load heavy components
8. Run Lighthouse and fix any issues

Aim for 90+ scores in all Lighthouse categories.
```

## 🎨 Design Guidelines for Cursor

### Visual Style
- **Modern & Clean**: Lots of whitespace, clear hierarchy
- **Professional**: Like a technical documentation site (think Stripe, Vercel, Tailwind)
- **Color-coded**: Blue for schemas, green for examples, purple for docs
- **Typography**: Inter for text, JetBrains Mono for code
- **Icons**: Use lucide-react consistently

### Component Patterns
- **Cards**: Use shadcn/ui Card component with hover effects
- **Tabs**: For switching between schema/example/raw JSON
- **Accordions**: For collapsible sections in docs
- **Code blocks**: Dark background with syntax highlighting
- **Tooltips**: For inline explanations
- **Badges**: For "required", "optional", "new", etc.

### Interaction Patterns
- **Copy buttons**: On all code blocks
- **Expand/collapse**: For JSON and schema trees
- **Search**: Cmd+K keyboard shortcut
- **Dark mode toggle**: In header
- **Breadcrumbs**: For navigation context
- **Table of contents**: Auto-generated for long docs

## 💡 Quick Win Features

Start with these for immediate impact:

1. **Homepage with hero** - Make a great first impression
2. **Schema tree viewer** - The most important feature
3. **Example browser** - Show real data
4. **Doc pages** - Make knowledge accessible
5. **Search** - Help people find things

## 🚨 Important Notes for Cursor

### Data Loading
- Schemas and examples are static JSON files in /lib
- Read them at build time or in Server Components
- Use React Server Components where possible for better performance

### File Structure
```
schemas/ -> lib/schemas/
examples/ -> lib/examples/
docs/ -> lib/docs/
```

### Markdown Processing
- Use gray-matter to parse frontmatter
- Render MDX with next-mdx-remote
- Custom components for callouts, diagrams, etc.

### Schema Complexity
- The schemas are nested and complex
- Focus on making them browsable/searchable
- Don't try to render everything at once
- Lazy load sections of the schema

## 🎯 Success Criteria

The website is successful if:
- ✅ Developers can understand the schema in < 5 minutes
- ✅ Examples are easy to browse and copy
- ✅ Documentation is searchable and well-organized
- ✅ The site looks professional and modern
- ✅ It works beautifully on mobile
- ✅ Schema validation works in the playground
- ✅ Load time is < 2 seconds
- ✅ Lighthouse score > 90

## 🔧 Troubleshooting

**If Cursor struggles with:**

**JSON parsing:** Use the built-in JSON.parse() and handle errors gracefully

**Large schemas:** Implement virtual scrolling or pagination for the schema viewer

**Markdown rendering:** Start simple with just basic Markdown, add features incrementally

**Search performance:** Index documents at build time, not runtime

**Responsive design:** Start mobile-first, then scale up

## 📚 Reference These Files

When building specific features, reference:

- **README.md** - Overall project requirements
- **TECH_STACK_SUGGESTIONS.md** - Component implementations
- **PACKAGE_SUMMARY.md** - Understanding the schema purpose
- **COLLECTIONS_GUIDE.md** - How collections work
- **ARCHITECTURE_DIAGRAM.md** - Visual structure to implement
- **GLOBAL_COMMUNITY_ARCHIVES_GUIDE.md** - Global features section

## 🚀 Final Prompt for Cursor

**When ready to build everything:**

```
Please build a complete, production-ready website for the Oral History Metadata Schema 
following all specifications in README.md. 

Use Next.js 14 + TypeScript + Tailwind + shadcn/ui as recommended in 
TECH_STACK_SUGGESTIONS.md.

The site should include:
1. Interactive schema viewer with tree navigation
2. Example browser with syntax highlighting  
3. Full documentation pages from the /docs Markdown files
4. Global search functionality
5. Interactive JSON playground with validation
6. Visual diagrams from ARCHITECTURE_DIAGRAM.md
7. Beautiful, responsive design
8. Dark mode support

Follow the design guidelines and component patterns in CURSOR_PROMPT.md.
Focus on making it easy for developers to understand and implement the schema.

Start with the project setup and basic structure, then we'll build features incrementally.
```

---

**Good luck! Build something amazing! 🎨✨**
