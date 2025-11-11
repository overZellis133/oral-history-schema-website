# Oral History Metadata Schema

## Overview

This JSON schema provides a comprehensive structure for representing oral histories with rich metadata, transcripts, thematic analysis, and IIIF compatibility. It's designed specifically for platforms like TheirStory that collect, preserve, and provide research access to oral history interviews.

**Version:** 1.0.0  
**Format:** JSON / JSON-LD  
**IIIF Compatibility:** Presentation API 3.0

## Key Features

### 1. **Rich Metadata**
- Multilingual labels and descriptions (IIIF-compatible)
- Detailed participant information with external identifiers (ORCID, VIAF, Wikidata)
- Geographic location data with coordinates
- Comprehensive rights and licensing information
- Institutional provider details

### 2. **Transcript with Speaker Attribution**
- Segment-level organization by speaker turns
- Word-level timing data with confidence scores
- Support for multiple languages
- Timestamps in seconds for precise navigation

### 3. **Research Features**
- **Indexes**: Topic-based table of contents with hierarchical support
- **Clips**: Curated highlights and excerpts
- **Themes**: Thematic analysis with occurrence tracking
- **Named Entities**: Automatic recognition of people, places, organizations, etc.
- **Annotations**: User comments, corrections, and scholarly notes

### 4. **IIIF Compatibility**
The schema uses IIIF Presentation API 3.0 conventions where appropriate:
- `@context` for JSON-LD compatibility
- Multilingual `label` and `summary` fields
- `requiredStatement` for attribution
- `provider` information
- `rights` URIs
- `metadata` pairs
- Web Annotation model for annotations

### 5. **Processing Transparency**
- Records transcription methods (automatic, manual, hybrid)
- Tracks AI/ML processing engines and versions
- Documents human review status

### 6. **Digital Preservation**
- Checksums for integrity verification
- Archive locations and backup tracking
- Long-term preservation metadata

## Schema Structure

```
OralHistory
├── @context (JSON-LD context)
├── id (URI)
├── type ("OralHistory")
├── label (multilingual)
├── title
├── summary (multilingual)
├── description
├── metadata[] (IIIF-style key-value pairs)
├── created (ISO 8601 datetime)
├── modified (ISO 8601 datetime)
├── duration (seconds)
├── language[] (ISO 639 codes)
├── participants[]
│   ├── id
│   ├── name
│   ├── role
│   ├── bio
│   ├── affiliations[]
│   └── identifiers (ORCID, VIAF, Wikidata)
├── location
│   ├── recording_location
│   └── participant_locations[]
├── rights (URI)
├── requiredStatement (attribution)
├── provider[] (IIIF Agent)
├── media
│   ├── video[]
│   └── audio[]
├── transcript
│   ├── language
│   └── segments[]
│       ├── id
│       ├── speaker_id
│       ├── speaker_name
│       ├── start_time
│       ├── end_time
│       ├── text
│       └── words[] (word-level timing)
├── indexes[]
│   ├── id
│   ├── title
│   ├── description
│   ├── start_time
│   ├── end_time
│   ├── keywords[]
│   └── parent_id (for hierarchy)
├── clips[]
│   ├── id
│   ├── title
│   ├── description
│   ├── start_time
│   ├── end_time
│   ├── thumbnail_url
│   ├── tags[]
│   └── public
├── themes[]
│   ├── id
│   ├── name
│   ├── description
│   ├── occurrences[]
│   │   ├── start_time
│   │   ├── end_time
│   │   ├── segment_id
│   │   └── strength
│   └── related_themes[]
├── named_entities[]
│   ├── id
│   ├── text
│   ├── type (PERSON, ORGANIZATION, LOCATION, etc.)
│   ├── normalized_text
│   ├── identifiers (Wikidata, Wikipedia, DBpedia)
│   └── occurrences[]
├── annotations[] (Web Annotation model)
│   ├── @context
│   ├── id
│   ├── type ("Annotation")
│   ├── motivation
│   ├── created
│   ├── creator
│   ├── body
│   └── target
├── relations[]
│   ├── type (part_of_series, related_to, etc.)
│   ├── target_id
│   └── description
├── processing
│   ├── transcription
│   ├── entity_recognition
│   └── theme_extraction
└── preservation
    ├── checksum
    ├── archived
    ├── archive_location
    └── backup_locations[]
```

## Usage Examples

### Basic Search Query
To find all segments where a specific person is mentioned:

```javascript
// Find all occurrences of "Linus Torvalds"
const entity = oralHistory.named_entities.find(e => 
  e.text === "Linus Torvalds"
);
const occurrences = entity.occurrences;
```

### Thematic Analysis
To find all segments discussing "Open Source Philosophy":

```javascript
const theme = oralHistory.themes.find(t => 
  t.name === "Open Source Philosophy"
);
const segments = theme.occurrences.map(occ => 
  oralHistory.transcript.segments.find(s => s.id === occ.segment_id)
);
```

### Time-Based Navigation
To jump to a specific topic in the index:

```javascript
const topic = oralHistory.indexes.find(idx => 
  idx.title === "VA Linux and SourceForge"
);
// Navigate to topic.start_time
```

### Creating a Clip
To create a new clip from the interview:

```json
{
  "id": "clip-004",
  "title": "My Custom Clip",
  "description": "Interesting moment about open source",
  "start_time": 1234.5,
  "end_time": 1456.7,
  "tags": ["open-source", "history"],
  "created_by": "user-123",
  "created_at": "2024-11-10T10:00:00Z",
  "public": true
}
```

## IIIF Integration

### Converting to IIIF Manifest

This schema can be converted to a IIIF Presentation 3.0 Manifest:

```javascript
const manifest = {
  "@context": "http://iiif.io/api/presentation/3/context.json",
  "id": oralHistory.id,
  "type": "Manifest",
  "label": oralHistory.label,
  "summary": oralHistory.summary,
  "metadata": oralHistory.metadata,
  "rights": oralHistory.rights,
  "requiredStatement": oralHistory.requiredStatement,
  "provider": oralHistory.provider,
  "items": [
    {
      "id": `${oralHistory.id}/canvas/1`,
      "type": "Canvas",
      "duration": oralHistory.duration,
      "items": [
        {
          "id": `${oralHistory.id}/page/1`,
          "type": "AnnotationPage",
          "items": [
            {
              "id": `${oralHistory.id}/annotation/1`,
              "type": "Annotation",
              "motivation": "painting",
              "body": {
                "id": oralHistory.media.video[0].url,
                "type": "Video",
                "format": oralHistory.media.video[0].format,
                "duration": oralHistory.media.video[0].duration
              },
              "target": `${oralHistory.id}/canvas/1`
            }
          ]
        }
      ]
    }
  ]
};
```

### Using with IIIF Viewers

Compatible with IIIF viewers that support audio/video:
- **Universal Viewer**: Full support for A/V content
- **Mirador 3**: Supports audio/video with transcript plugins
- **Clover IIIF**: Modern player with excellent A/V support
- **Aviary**: Specialized for oral histories and A/V content

## Research Use Cases

### 1. Academic Research
- Search across transcripts for specific topics or entities
- Analyze themes across multiple interviews
- Track how concepts evolve over time
- Create custom clips for teaching

### 2. Educational Institutions
- Build curriculum around oral history collections
- Create themed playlists from indexes
- Annotate interviews with contextual information
- Share clips with proper attribution

### 3. Community Organizations
- Preserve community narratives with full metadata
- Link related stories and build networks
- Control access and licensing
- Archive with institutional repositories

### 4. Digital Humanities
- Named entity networks and visualization
- Thematic analysis at scale
- Geographic mapping of stories
- Temporal analysis of historical narratives

## Implementation Guidelines

### Minimal Required Fields
At minimum, an oral history record must include:
- `id`: Unique identifier
- `type`: Must be "OralHistory"
- `title`: Interview title
- `created`: Recording date
- `participants`: At least one participant with role
- `transcript.segments`: At least one segment

### Best Practices

1. **Use URIs consistently**: All `id` fields should be resolvable URIs
2. **Link to authorities**: Use Wikidata, VIAF, ORCID when possible
3. **Multilingual support**: Provide labels/summaries in all relevant languages
4. **Preserve hierarchy**: Use `parent_id` in indexes for topic trees
5. **Document processing**: Always record how transcripts were created
6. **Version control**: Update `modified` timestamp when editing
7. **Rights clarity**: Use Creative Commons URIs or Rights Statements

### Performance Considerations

For large collections:
- Consider splitting word-level timing into separate files
- Use pagination for transcript segments
- Index named entities separately for fast search
- Cache theme analysis results

## Data Quality

### Transcription Confidence
Word-level timing includes confidence scores (0-1). Guidelines:
- `0.9-1.0`: High confidence, likely accurate
- `0.7-0.9`: Medium confidence, review recommended
- `<0.7`: Low confidence, human review needed

### Entity Linking
Link entities to knowledge bases when confidence is high:
- **Wikidata**: Primary linking target
- **VIAF**: For people and organizations
- **ORCID**: For researchers and academics
- **GeoNames**: For locations

## Extensions

The schema is extensible. You can add custom fields for:
- Domain-specific metadata
- Institution-specific requirements
- Experimental features
- Integration with other systems

Example custom field:
```json
{
  "custom": {
    "institution_id": "INT-2024-001",
    "collection_name": "Silicon Valley Pioneers",
    "grant_funding": "NSF Award #1234567"
  }
}
```

## Validation

Validate your JSON against the schema:

```bash
# Using ajv-cli
ajv validate -s oral_history_schema.json -d your_interview.json
```

## License

This schema is released under CC0 1.0 Universal (Public Domain Dedication).

## Credits

Developed for oral history platforms to support:
- Preservation of community narratives
- Academic research access
- IIIF-compatible presentation
- Semantic web integration

## Version History

- **1.0.0** (2024): Initial release with full IIIF compatibility

## Contact & Contributions

For questions, improvements, or issues with the schema, please contribute to the project repository.
