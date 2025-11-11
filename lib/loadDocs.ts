import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface DocMetadata {
  title?: string
  slug: string
  content: string
  data: Record<string, any>
}

export function loadDoc(slug: string): DocMetadata | null {
  try {
    const filepath = path.join(process.cwd(), 'lib/docs', `${slug}.md`)
    const content = fs.readFileSync(filepath, 'utf-8')
    const { data, content: docContent } = matter(content)
    return {
      slug,
      content: docContent,
      data,
      title: data.title || slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
    }
  } catch {
    return null
  }
}

export function getAllDocs(): DocMetadata[] {
  const docsDir = path.join(process.cwd(), 'lib/docs')
  const files = fs.readdirSync(docsDir)
  return files
    .filter(file => file.endsWith('.md'))
    .map(file => {
      const slug = file.replace('.md', '')
      const doc = loadDoc(slug)
      return doc!
    })
    .filter(Boolean)
}

