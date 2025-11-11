import fs from 'fs'
import path from 'path'

export function loadSchema(filename: string) {
  const filepath = path.join(process.cwd(), 'lib/schemas', filename)
  const content = fs.readFileSync(filepath, 'utf-8')
  return JSON.parse(content)
}

export function getAllSchemas() {
  const schemasDir = path.join(process.cwd(), 'lib/schemas')
  const files = fs.readdirSync(schemasDir)
  return files
    .filter(file => file.endsWith('.json'))
    .map(file => ({
      filename: file,
      name: file.replace('.json', '').replace('_', ' '),
      schema: loadSchema(file)
    }))
}

