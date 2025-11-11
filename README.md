# Oral History Metadata Schema - Interactive Website Project

## 🎯 Project Goal

Create an interactive, visually appealing website that makes the oral history schema and all supporting documentation easily accessible, searchable, and understandable.

## 📁 Project Structure

```
oral-history-schema-project/
├── schemas/                        # JSON Schema definitions
│   ├── oral_history_schema.json
│   └── collection_schema.json
├── examples/                       # Real-world examples
│   ├── larry_augustin_example.json
│   ├── maddog_hall_example.json
│   ├── collection_example_open_source_pioneers.json
│   └── collection_example_top_level.json
├── docs/                          # Documentation (Markdown)
│   ├── README.md
│   ├── COLLECTIONS_GUIDE.md
│   ├── IMPLEMENTATION_GUIDE.md
│   ├── PACKAGE_SUMMARY.md
│   ├── ARCHITECTURE_DIAGRAM.md
│   └── GLOBAL_COMMUNITY_ARCHIVES_GUIDE.md
├── README.md                      # This file
└── TECH_STACK_SUGGESTIONS.md     # Recommended technologies
```

## 🎨 Website Requirements

### Core Features

1. **Schema Visualization**
   - Interactive tree view of JSON schema structure
   - Click to expand/collapse nested properties
   - Show property types, descriptions, and requirements
   - Side-by-side view: schema vs. example data

2. **Example Browser**
   - Tabbed interface to switch between examples
   - Syntax-highlighted JSON with collapsible sections
   - Annotations explaining key fields
   - Link schema properties to example values

3. **Documentation Hub**
   - Convert all Markdown docs to beautiful web pages
   - Left sidebar navigation
   - Search functionality across all docs
   - Code syntax highlighting
   - Responsive design

4. **Schema Comparison Tool**
   - Compare Interview schema vs. Collection schema
   - Highlight differences and relationships
   - Show how interviews fit into collections

5. **Use Case Scenarios**
   - Interactive walkthrough of research scenarios
   - Show how data flows from interview → collection → search
   - Visual diagrams from ARCHITECTURE_DIAGRAM.md

6. **Global Search**
   - Search across schemas, examples, and documentation
   - Filter by schema properties, example fields, or doc content
   - Instant results with context highlighting

7. **Interactive Playground**
   - JSON editor with schema validation
   - Try modifying examples and see validation feedback
   - Export custom examples

### Design Principles

- **Clean & Modern**: Minimal design, lots of white space
- **Typography**: Great font choices, readable code blocks
- **Color Coding**: Different colors for schema, examples, docs
- **Mobile Responsive**: Works beautifully on all devices
- **Dark Mode**: Support dark/light themes
- **Fast**: Static site generation for speed
- **Accessible**: WCAG 2.1 AA compliant

### Navigation Structure

```
Home
├── Getting Started
│   └── Quick overview & key concepts
├── Schemas
│   ├── Interview Schema (interactive view)
│   ├── Collection Schema (interactive view)
│   └── Schema Comparison
├── Examples
│   ├── Larry Augustin Interview
│   ├── Maddog Hall Interview
│   ├── Open Source Pioneers Collection
│   └── Top-Level Collection
├── Documentation
│   ├── Overview
│   ├── Collections Guide
│   ├── Implementation Guide
│   ├── Architecture
│   └── Global Communities Guide
├── Playground
│   └── Interactive JSON editor
└── Resources
    ├── Downloads (ZIP of all files)
    ├── GitHub Repository
    └── API Reference
```

## 🎨 Visual Design Ideas

### Color Palette
- **Primary**: #2563eb (blue) - for schemas
- **Secondary**: #059669 (green) - for examples
- **Accent**: #dc2626 (red) - for important notes
- **Dark**: #1e293b (slate) - for text
- **Light**: #f8fafc (slate) - for backgrounds

### Components to Include
- Schema property cards with hover effects
- JSON viewer with collapsible sections
- Copy-to-clipboard buttons
- Breadcrumb navigation
- Table of contents for long docs
- Interactive diagrams (convert ASCII to visual)
- Code tabs (schema / example / output)
- Search results with highlighting
- Download buttons with format options

## 🛠️ Suggested Tech Stack

See `TECH_STACK_SUGGESTIONS.md` for detailed recommendations, but consider:

**Option 1 - Modern & Fast:**
- Next.js 14 (App Router)
- Tailwind CSS
- TypeScript
- React JSON Schema Viewer
- MDX for documentation
- Algolia or Fuse.js for search

**Option 2 - Simple & Static:**
- Astro
- Tailwind CSS
- TypeScript
- JSON viewer component
- Markdown processing
- Built-in search

**Option 3 - Documentation-Focused:**
- Docusaurus
- Custom React components
- MDX
- JSON schema viewer plugin

## 📝 Content to Emphasize

### Homepage Hero
- "A comprehensive metadata schema for oral history archives"
- "Built on IIIF standards | Community-driven | Globally accessible"
- Quick links: View Schema | Browse Examples | Read Docs

### Key Selling Points
1. **IIIF Compatible** - Works with existing viewers and tools
2. **Research-Ready** - Built-in themes, entities, clips, annotations
3. **Collection Support** - Organize and analyze across interviews
4. **Global Framework** - Designed for diverse communities worldwide
5. **Production Tested** - Real examples from working platforms

### Call-to-Actions
- "Download Schema Package"
- "View Live Examples"
- "Read Implementation Guide"
- "Contribute on GitHub"

## 🎯 Special Features to Implement

### 1. Schema Explorer
Interactive tree view where clicking a property shows:
- Type and format
- Description
- Required or optional
- Default values
- Examples from real data
- Related properties

### 2. Example Annotator
Show the Larry Augustin example with tooltips explaining:
- Why certain fields are structured that way
- How it maps to the schema
- Best practices demonstrated
- Links to relevant documentation

### 3. Collection Visualizer
Interactive diagram showing:
- Individual interviews as nodes
- Collections as containers
- Relationships between interviews
- Aggregated entities/themes

### 4. Use Case Walkthrough
Step-by-step interactive guide:
- "Researcher wants to find all mentions of 'Linux'"
- Show the JSON query
- Show the result
- Explain how it works

### 5. Global Adaptations Showcase
Beautiful cards for each region showing:
- Regional adaptation example
- Cultural considerations
- Special fields needed
- Community testimonials (if available)

## 📦 Deliverables

When complete, the website should include:

1. **Static HTML/CSS/JS** that can be:
   - Hosted on GitHub Pages
   - Deployed to Netlify/Vercel
   - Run locally with simple http server

2. **Source Code** organized as:
   - Clean component structure
   - Well-commented code
   - Easy to modify and extend
   - README with setup instructions

3. **Build Scripts** for:
   - Development server
   - Production build
   - Asset optimization
   - Sitemap generation

## 🚀 Getting Started (for Cursor)

1. Review all files in `/schemas`, `/examples`, and `/docs`
2. Choose a tech stack from TECH_STACK_SUGGESTIONS.md
3. Set up project structure
4. Create components for schema visualization
5. Build navigation and routing
6. Implement search functionality
7. Style with modern, clean design
8. Add interactive features
9. Optimize for performance
10. Deploy documentation

## 💡 Development Tips

- Use the ASCII diagrams in ARCHITECTURE_DIAGRAM.md as inspiration for visual components
- The GLOBAL_COMMUNITY_ARCHIVES_GUIDE.md has rich content for a dedicated section
- The example interviews have real, substantial data - use it to showcase features
- The schema has complex nested structures - good tree viewers are essential
- Consider a "Start Here" wizard for first-time visitors

## 🎓 Learning Resources in This Package

- **PACKAGE_SUMMARY.md** - Best overview to understand the whole project
- **COLLECTIONS_GUIDE.md** - Shows the hierarchical structure visually
- **IMPLEMENTATION_GUIDE.md** - Contains practical code examples
- **ARCHITECTURE_DIAGRAM.md** - ASCII diagrams to convert to visuals

## ✨ Bonus Features

If time permits, add:
- JSON Schema validator in browser
- Live collaboration (share custom examples)
- Export to different formats (CSV, XML, RDF)
- Embed code generator (for websites using the schema)
- Community examples gallery
- Integration examples (with IIIF viewers, etc.)

## 🌍 Accessibility & Internationalization

- Ensure all interactive elements are keyboard accessible
- Provide text alternatives for visual diagrams
- Consider i18n structure (even if starting English-only)
- Test with screen readers
- High contrast mode support

## 📞 Contact & Support

The schema is designed for TheirStory platform but intended as a global standard for oral history archives.

---

**Ready to build something amazing! 🚀**
