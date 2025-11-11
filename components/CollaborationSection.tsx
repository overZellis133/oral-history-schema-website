'use client'

import { Button } from '@/components/ui/button'
import { Github, MessageSquare, GitBranch, FileText, ExternalLink } from 'lucide-react'

interface CollaborationSectionProps {
  schemaName: string
  schemaFile: string
  githubRepo?: string
}

export function CollaborationSection({ 
  schemaName, 
  schemaFile,
  githubRepo = 'https://github.com/overZellis133/oral-history-schema-website'
}: CollaborationSectionProps) {
  const repoPath = githubRepo.replace('https://github.com/', '').replace('.git', '')
  
  // GitHub URLs
  const newIssueUrl = `${githubRepo}/issues/new?template=schema-feedback.md&title=Feedback+on+${encodeURIComponent(schemaName)}&labels=schema,feedback`
  const discussionsUrl = `${githubRepo}/discussions`
  const schemaFileUrl = `${githubRepo}/blob/main/lib/schemas/${schemaFile}`
  const editSchemaUrl = `${githubRepo}/edit/main/lib/schemas/${schemaFile}`
  const newPRUrl = `${githubRepo}/compare/main...main?quick_pull=1&title=Proposed+changes+to+${encodeURIComponent(schemaName)}`

  return (
    <div className="mb-6 border-b pb-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex-1">
          <h3 className="text-sm font-semibold mb-1">Collaborate on This Schema</h3>
          <p className="text-xs text-muted-foreground">
            Help improve the {schemaName} by sharing feedback or proposing changes
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button asChild variant="outline" size="sm">
            <a href={newIssueUrl} target="_blank" rel="noopener noreferrer">
              <MessageSquare className="h-3.5 w-3.5 mr-1.5" />
              Feedback
              <ExternalLink className="h-3 w-3 ml-1.5" />
            </a>
          </Button>
          <Button asChild variant="outline" size="sm">
            <a href={editSchemaUrl} target="_blank" rel="noopener noreferrer">
              <GitBranch className="h-3.5 w-3.5 mr-1.5" />
              Propose Changes
              <ExternalLink className="h-3 w-3 ml-1.5" />
            </a>
          </Button>
          <Button asChild variant="ghost" size="sm">
            <a href={discussionsUrl} target="_blank" rel="noopener noreferrer">
              <Github className="h-3.5 w-3.5 mr-1.5" />
              Discussions
              <ExternalLink className="h-3 w-3 ml-1.5" />
            </a>
          </Button>
          <Button asChild variant="ghost" size="sm">
            <a href={schemaFileUrl} target="_blank" rel="noopener noreferrer">
              <FileText className="h-3.5 w-3.5 mr-1.5" />
              Source
              <ExternalLink className="h-3 w-3 ml-1.5" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}

