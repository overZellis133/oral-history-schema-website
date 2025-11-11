import fs from 'fs'
import path from 'path'

export function loadExample(filename: string) {
  const filepath = path.join(process.cwd(), 'lib/examples', filename)
  const content = fs.readFileSync(filepath, 'utf-8')
  return JSON.parse(content)
}

export function getAllExamples() {
  const examplesDir = path.join(process.cwd(), 'lib/examples')
  const files = fs.readdirSync(examplesDir)
  return files
    .filter(file => file.endsWith('.json'))
    .map(file => ({
      filename: file,
      id: file.replace('.json', '').replace(/_/g, '-'),
      name: file.replace('.json', '').replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      data: loadExample(file)
    }))
}

export function getExampleById(id: string) {
  const filename = id.replace(/-/g, '_') + '.json'
  try {
    return {
      id,
      filename,
      name: id.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      data: loadExample(filename)
    }
  } catch {
    return null
  }
}

