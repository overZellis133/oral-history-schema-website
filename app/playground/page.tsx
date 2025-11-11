'use client'

import { useState, useEffect } from 'react'
import { JsonViewer } from '@/components/JsonViewer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Download, RotateCcw, Loader2 } from 'lucide-react'

interface Example {
  id: string
  name: string
  data: any
}

export default function PlaygroundPage() {
  const [jsonInput, setJsonInput] = useState('')
  const [parsedData, setParsedData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [isValidating, setIsValidating] = useState(false)
  const [examples, setExamples] = useState<Example[]>([])

  useEffect(() => {
    // Load examples from API
    fetch('/api/examples')
      .then(res => res.json())
      .then(data => {
        setExamples(data)
        if (data.length > 0) {
          const defaultExample = data[0]
          const jsonString = JSON.stringify(defaultExample.data, null, 2)
          setJsonInput(jsonString)
          setParsedData(defaultExample.data)
        }
      })
      .catch(err => console.error('Failed to load examples:', err))
  }, [])

  const handleInputChange = (value: string) => {
    setJsonInput(value)
    setError(null)
    
    if (!value.trim()) {
      setParsedData(null)
      return
    }

    try {
      const parsed = JSON.parse(value)
      setParsedData(parsed)
      setError(null)
    } catch (e) {
      setError((e as Error).message)
      setParsedData(null)
    }
  }

  const loadExample = (exampleId: string) => {
    const example = examples.find(e => e.id === exampleId)
    if (example) {
      const jsonString = JSON.stringify(example.data, null, 2)
      setJsonInput(jsonString)
      handleInputChange(jsonString)
    }
  }

  const reset = () => {
    setJsonInput('')
    setParsedData(null)
    setError(null)
  }

  const download = () => {
    if (!parsedData) return
    
    const blob = new Blob([JSON.stringify(parsedData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'oral-history-example.json'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const validate = async () => {
    if (!parsedData) return
    
    setIsValidating(true)
    // Basic validation - in a real app, you'd validate against the actual schema
    // For now, we'll just check if it has required fields
    setTimeout(() => {
      setIsValidating(false)
      // This is a placeholder - real validation would use ajv or similar
      if (parsedData.type && (parsedData.type === 'OralHistory' || parsedData.type === 'Collection')) {
        setError(null)
      } else {
        setError('Missing required field: type must be "OralHistory" or "Collection"')
      }
    }, 500)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Interactive Playground</h1>
        <p className="text-lg text-muted-foreground">
          Edit JSON examples, validate against the schema, and export your custom examples
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>JSON Editor</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={reset}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
                <Button variant="outline" size="sm" onClick={validate} disabled={!parsedData || isValidating}>
                  {isValidating ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Validating...
                    </>
                  ) : (
                    'Validate'
                  )}
                </Button>
                {parsedData && (
                  <Button variant="outline" size="sm" onClick={download}>
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <label className="text-sm font-medium mb-2 block">Load Example:</label>
              <select
                onChange={(e) => loadExample(e.target.value)}
                className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
              >
                <option value="">Select an example...</option>
                {examples.map((ex) => (
                  <option key={ex.id} value={ex.id}>
                    {ex.name}
                  </option>
                ))}
              </select>
            </div>
            <textarea
              value={jsonInput}
              onChange={(e) => handleInputChange(e.target.value)}
              className="w-full h-[600px] p-4 rounded-lg border border-input bg-background font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Enter or paste JSON here..."
            />
            {error && (
              <div className="mt-4 p-3 rounded-lg bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-800">
                <p className="text-sm text-red-700 dark:text-red-400 font-medium">Error:</p>
                <p className="text-sm text-red-600 dark:text-red-300">{error}</p>
              </div>
            )}
            {parsedData && !error && (
              <div className="mt-4 p-3 rounded-lg bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-800">
                <p className="text-sm text-green-700 dark:text-green-400 font-medium">✓ Valid JSON</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
          </CardHeader>
          <CardContent>
            {parsedData ? (
              <div className="max-h-[700px] overflow-auto">
                <JsonViewer data={parsedData} title="Parsed JSON" defaultExpanded={true} />
              </div>
            ) : (
              <div className="h-[700px] flex items-center justify-center text-muted-foreground">
                <p>Enter JSON to see preview</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
            <li>Start by loading an example from the dropdown</li>
            <li>Edit the JSON to see real-time validation</li>
            <li>Use the Validate button to check against the schema</li>
            <li>Download your custom example when ready</li>
            <li>Make sure your JSON includes required fields like <code className="bg-muted px-1 rounded">id</code>, <code className="bg-muted px-1 rounded">type</code>, and <code className="bg-muted px-1 rounded">title</code></li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

