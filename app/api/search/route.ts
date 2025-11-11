import { NextRequest, NextResponse } from 'next/server'
import Fuse from 'fuse.js'
import { getAllSchemas } from '@/lib/loadSchemas'
import { getAllExamples } from '@/lib/loadExamples'
import { getAllDocs } from '@/lib/loadDocs'

interface SearchItem {
  type: 'schema' | 'example' | 'doc'
  title: string
  description?: string
  content?: string
  keywords?: string
  href: string
}

// Recursively extract all property names from a schema
function extractPropertyNames(obj: any, prefix = ''): string[] {
  const names: string[] = []
  
  if (obj && typeof obj === 'object') {
    if (obj.properties) {
      Object.keys(obj.properties).forEach((key) => {
        const fullKey = prefix ? `${prefix}.${key}` : key
        names.push(fullKey)
        names.push(key) // Also add just the key name
        
        // Recursively extract from nested properties
        if (obj.properties[key]) {
          names.push(...extractPropertyNames(obj.properties[key], fullKey))
        }
      })
    }
    
    if (obj.items?.properties) {
      Object.keys(obj.items.properties).forEach((key) => {
        const fullKey = prefix ? `${prefix}[].${key}` : `[].${key}`
        names.push(fullKey)
        names.push(key)
        names.push(...extractPropertyNames(obj.items.properties[key], fullKey))
      })
    }
    
    // Also check patternProperties
    if (obj.patternProperties) {
      Object.keys(obj.patternProperties).forEach((key) => {
        names.push(key)
        names.push(...extractPropertyNames(obj.patternProperties[key], key))
      })
    }
  }
  
  return names
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('q') || ''

  if (!query.trim()) {
    return NextResponse.json({ results: [] })
  }

  // Build search index
  const items: SearchItem[] = []

  // Add schemas
  const schemas = getAllSchemas()
  schemas.forEach((schema) => {
    const propertyNames = extractPropertyNames(schema.schema)
    const keywords = [
      schema.name,
      schema.schema.description || '',
      ...propertyNames,
      ...(schema.schema.required || []),
    ].filter(Boolean).join(' ')

    items.push({
      type: 'schema',
      title: schema.name,
      description: schema.schema.description || `Schema definition for ${schema.name}`,
      content: JSON.stringify(schema.schema),
      keywords,
      href: schema.filename.includes('oral_history')
        ? '/schemas/interview'
        : '/schemas/collection',
    })
  })

  // Add examples
  const examples = getAllExamples()
  examples.forEach((example) => {
    items.push({
      type: 'example',
      title: example.name,
      description: example.data.title || example.data.label?.en?.[0] || 'Example data',
      content: JSON.stringify(example.data),
      href: `/examples/${example.id}`,
    })
  })

  // Add docs
  const docs = getAllDocs()
  docs.forEach((doc) => {
    items.push({
      type: 'doc',
      title: doc.title || doc.slug,
      description: doc.data.description || 'Documentation',
      content: doc.content,
      href: `/docs/${doc.slug}`,
    })
  })

  // Configure Fuse.js
  const fuse = new Fuse(items, {
    keys: [
      { name: 'title', weight: 0.3 },
      { name: 'description', weight: 0.2 },
      { name: 'keywords', weight: 0.4 }, // Give keywords higher weight
      { name: 'content', weight: 0.1 },
    ],
    threshold: 0.4, // Slightly more lenient
    includeMatches: true,
    minMatchCharLength: 2,
    ignoreLocation: true, // Search anywhere in the text
  })

  // Perform search
  const results = fuse.search(query).slice(0, 10).map((result) => ({
    type: result.item.type,
    title: result.item.title,
    description: result.item.description,
    href: result.item.href,
  }))

  return NextResponse.json({ results })
}

