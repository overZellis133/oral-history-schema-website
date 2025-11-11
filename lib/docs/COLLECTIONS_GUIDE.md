# Collections Guide: Hierarchical Organization for Oral Histories

## Overview

This guide explains how to organize oral history interviews into collections and collections of collections, enabling powerful cross-interview research and discovery.

## Collection Hierarchy Levels

### Level 1: Individual Interview (OralHistory)
**Example:** `larry_augustin_example.json`

The atomic unit containing:
- Full transcript with timing
- Speaker information
- Media files
- Themes, entities, indexes
- Individual interview metadata

**Use when:** You're working with a single interview.

### Level 2: Thematic Collection
**Example:** `collection_example_open_source_pioneers.json`

A curated group of related interviews:
- 5-50 interviews on a shared theme
- Aggregated entities (people/places mentioned across interviews)
- Aggregated themes (topics that span multiple interviews)
- Collection-level search endpoints

**Use when:** You have a series of interviews on a related topic (e.g., "Open Source Pioneers", "Women in STEM", "Civil Rights Movement").

### Level 3: Top-Level Collection
**Example:** `collection_example_top_level.json`

An umbrella organization containing multiple thematic collections:
- Multiple sub-collections
- Organization-wide metadata
- Cross-collection discovery
- Institutional identity

**Use when:** Managing multiple thematic series (e.g., all of FOSSDA's work, a university's entire oral history program).

## Key Differences from Individual Interviews

### 1. **Aggregated Data**

Collections provide cross-interview analysis:

```json
"aggregated_entities": [
  {
    "entity_id": "person-linus-torvalds",
    "text": "Linus Torvalds",
    "type": "PERSON",
    "frequency": 4,
    "interviews": [
      "https://fossda.org/interviews/linus-torvalds-2023",
      "https://fossda.org/interviews/jon-maddog-hall-2024-03-20",
      "https://fossda.org/interviews/larry-augustin-2024-04-16",
      "https://fossda.org/interviews/eric-raymond-2023"
    ]
  }
]
```

**Research Value:** Quickly identify that Linus Torvalds is mentioned in 4 different interviews. Click through to see each context.

### 2. **Cross-Interview Themes**

```json
"aggregated_themes": [
  {
    "theme_id": "theme-commercialization",
    "name": "Commercializing Open Source",
    "frequency": 3,
    "interviews": [
      "https://fossda.org/interviews/larry-augustin-2024-04-16",
      "https://fossda.org/interviews/jon-maddog-hall-2024-03-20",
      "https://fossda.org/interviews/eric-raymond-2023"
    ]
  }
]
```

**Research Value:** Compare how different people discuss the same theme. Build thematic playlists.

### 3. **Collection-Level Search**

```json
"search_index": {
  "full_text_search_url": "https://api.fossda.org/search/collections/open-source-pioneers/fulltext",
  "entity_search_url": "https://api.fossda.org/search/collections/open-source-pioneers/entities",
  "theme_search_url": "https://api.fossda.org/search/collections/open-source-pioneers/themes"
}
```

**Research Value:** Search across all interviews in a collection at once.

## Research Use Cases

### Case 1: Finding All References to a Person

**Scenario:** A researcher wants to find every mention of "Larry Augustin" across all interviews.

```javascript
// 1. Check collection's aggregated_entities
const collection = await fetch('https://fossda.org/collections/open-source-pioneers');
const larryEntity = collection.aggregated_entities.find(e => 
  e.text === "Larry Augustin"
);

// 2. Get all interviews where Larry is mentioned
const interviews = larryEntity.interviews;
// ["interview-1", "interview-2", "interview-3"]

// 3. For each interview, get specific occurrences
for (const interviewId of interviews) {
  const interview = await fetch(interviewId);
  const occurrences = interview.named_entities
    .find(e => e.text === "Larry Augustin")
    .occurrences;
  
  // Jump to exact timestamps in each interview
}
```

### Case 2: Thematic Analysis Across Interviews

**Scenario:** A student is writing a paper on "Community Building in Open Source" and needs examples from multiple interviews.

```javascript
// 1. Find the theme at collection level
const theme = collection.aggregated_themes.find(t => 
  t.name === "Community Building and Advocacy"
);

// 2. Get all interviews discussing this theme
const relevantInterviews = theme.interviews;

// 3. For each interview, get specific segments
const segments = [];
for (const interviewId of relevantInterviews) {
  const interview = await fetch(interviewId);
  const themeData = interview.themes.find(t => t.name === theme.name);
  
  // Get all segments where theme appears
  for (const occurrence of themeData.occurrences) {
    const segment = interview.transcript.segments.find(s => 
      s.id === occurrence.segment_id
    );
    segments.push({
      interview: interview.title,
      speaker: segment.speaker_name,
      text: segment.text,
      time: occurrence.start_time
    });
  }
}

// Now have all quotes about community building from all interviews
```

### Case 3: Network Analysis

**Scenario:** Visualize the network of people mentioned across interviews.

```javascript
// Use aggregated_entities to build a network graph
const nodes = collection.aggregated_entities
  .filter(e => e.type === "PERSON")
  .map(e => ({
    id: e.entity_id,
    label: e.text,
    size: e.frequency // More mentions = bigger node
  }));

// Find connections (people mentioned in same interviews)
const edges = [];
for (let i = 0; i < nodes.length; i++) {
  for (let j = i + 1; j < nodes.length; j++) {
    const person1 = collection.aggregated_entities[i];
    const person2 = collection.aggregated_entities[j];
    
    // Find interviews where both are mentioned
    const shared = person1.interviews.filter(id => 
      person2.interviews.includes(id)
    );
    
    if (shared.length > 0) {
      edges.push({
        source: person1.entity_id,
        target: person2.entity_id,
        weight: shared.length
      });
    }
  }
}

// Render with D3.js, Cytoscape, etc.
```

### Case 4: Cross-Collection Research

**Scenario:** Compare how "commercialization" is discussed in Open Source vs. Personal Computer collections.

```javascript
const topLevel = await fetch('https://fossda.org/collections/technology-history');

// Get two sub-collections
const openSource = topLevel.items.find(c => 
  c.id.includes('open-source-pioneers')
);
const personalComputing = topLevel.items.find(c => 
  c.id.includes('personal-computer-revolution')
);

// Fetch full collections
const osCollection = await fetch(openSource.id);
const pcCollection = await fetch(personalComputing.id);

// Compare themes
const osCommercial = osCollection.aggregated_themes.find(t => 
  t.name.includes('Commercializ')
);
const pcCommercial = pcCollection.aggregated_themes.find(t => 
  t.name.includes('Commercializ')
);

// Compare interview counts, specific examples, etc.
```

## Building Collections: Best Practices

### 1. Consistent Entity Linking

Ensure the same person is identified consistently across interviews:

```json
// In Larry Augustin interview
{
  "id": "entity-003",
  "text": "Larry Augustin",
  "identifiers": {
    "wikidata": "Q6490196"  // ← Use this to link!
  }
}

// In Maddog Hall interview  
{
  "id": "entity-003",
  "text": "Larry Augustin",
  "identifiers": {
    "wikidata": "Q6490196"  // ← Same Wikidata ID
  }
}
```

When building collections, match entities by `identifiers.wikidata` (or other stable IDs) rather than just text matching.

### 2. Hierarchical Themes

Themes can have parent-child relationships within interviews:

```json
{
  "id": "theme-linux-technical",
  "name": "Linux Technical Development",
  "parent_theme": "theme-linux-general"
}
```

At collection level, aggregate both specific and general themes.

### 3. Cross-References in Individual Interviews

Individual interviews should reference their collection:

```json
"relations": [
  {
    "type": "part_of_series",
    "target_id": "https://fossda.org/collections/open-source-pioneers"
  },
  {
    "type": "related_to",
    "target_id": "https://fossda.org/interviews/jon-maddog-hall-2024-03-20",
    "description": "Both discuss VA Linux"
  }
]
```

### 4. Update Collections When Adding Interviews

When adding a new interview to a collection:

1. Add interview reference to `items[]`
2. Update `aggregated_entities` with any new entities
3. Update `aggregated_themes` with theme occurrences
4. Increment `interview_count`
5. Add to `total_duration`
6. Update `modified` timestamp

## Multiple Collection Memberships

An interview can belong to multiple collections:

```json
// Larry Augustin interview relations
"relations": [
  {
    "type": "part_of_series",
    "target_id": "https://fossda.org/collections/open-source-pioneers"
  },
  {
    "type": "part_of_series",
    "target_id": "https://fossda.org/collections/technology-entrepreneurs"
  },
  {
    "type": "part_of_series",
    "target_id": "https://fossda.org/collections/bay-area-tech-history"
  }
]
```

This enables:
- **Thematic organization** (Open Source Pioneers)
- **Professional role organization** (Technology Entrepreneurs)
- **Geographic organization** (Bay Area Tech History)

## IIIF Collection Manifests

Collections follow IIIF Presentation API 3.0, making them compatible with IIIF viewers:

```javascript
// Convert to pure IIIF manifest for viewer
const iiifManifest = {
  "@context": "http://iiif.io/api/presentation/3/context.json",
  "id": collection.id,
  "type": "Collection",
  "label": collection.label,
  "items": collection.items.map(item => ({
    "id": item.id,
    "type": item.type,
    "label": item.label,
    "thumbnail": item.thumbnail
  }))
};
```

View in:
- **Universal Viewer**: Browse collection and navigate between interviews
- **Mirador 3**: Compare interviews side-by-side
- **Custom viewers**: Build specialized interfaces

## API Design Considerations

### Pagination

For large collections (100+ interviews):

```json
{
  "items": [...], // First 20 items
  "next": "https://fossda.org/collections/open-source-pioneers?page=2",
  "total_items": 156
}
```

### Lazy Loading

Don't include full interview objects in collections:

```json
// ✅ Good - Reference only
{
  "id": "https://fossda.org/interviews/larry-augustin-2024-04-16",
  "type": "OralHistory",
  "label": {"en": ["Larry Augustin Interview"]},
  "thumbnail": [...]
}

// ❌ Bad - Full interview embedded
{
  "id": "...",
  "type": "OralHistory",
  "transcript": { ... }, // Too much data!
  "themes": [ ... ],
  // etc.
}
```

### Aggregated Data Caching

Pre-compute aggregated entities/themes rather than computing on-the-fly:

```javascript
// Background job runs nightly
async function updateCollectionAggregates(collectionId) {
  const collection = await getCollection(collectionId);
  const interviews = await Promise.all(
    collection.items.map(item => fetch(item.id))
  );
  
  // Aggregate entities
  const entityMap = new Map();
  for (const interview of interviews) {
    for (const entity of interview.named_entities) {
      const key = entity.identifiers.wikidata || entity.text;
      if (!entityMap.has(key)) {
        entityMap.set(key, {
          ...entity,
          frequency: 0,
          interviews: []
        });
      }
      const agg = entityMap.get(key);
      agg.frequency++;
      agg.interviews.push(interview.id);
    }
  }
  
  collection.aggregated_entities = Array.from(entityMap.values());
  await saveCollection(collection);
}
```

## Example Queries

### Find all interviews where two people are mentioned together

```sql
-- SQL query on collections database
SELECT DISTINCT i1.interview_id
FROM interview_entities i1
JOIN interview_entities i2 
  ON i1.interview_id = i2.interview_id
WHERE i1.entity_text = 'Linus Torvalds'
  AND i2.entity_text = 'Larry Augustin'
  AND i1.collection_id = 'open-source-pioneers';
```

### Get timeline of interviews in a collection

```javascript
const timeline = collection.items
  .map(item => ({
    id: item.id,
    title: item.label.en[0],
    date: item.metadata.find(m => 
      m.label.en[0] === "Interview Date"
    ).value.en[0]
  }))
  .sort((a, b) => new Date(a.date) - new Date(b.date));
```

### Build a word cloud from all interviews

```javascript
const allTranscripts = await Promise.all(
  collection.items.map(async item => {
    const interview = await fetch(item.id);
    return interview.transcript.segments
      .map(s => s.text)
      .join(' ');
  })
);

const wordFrequency = analyzeWords(allTranscripts.join(' '));
// Render word cloud
```

## Benefits of This Structure

### For Researchers
- Search across multiple interviews at once
- Find patterns and recurring themes
- Build network analyses of people/organizations
- Compare perspectives on same events

### For Educators
- Create curated playlists by theme
- Show multiple perspectives on historical events
- Build lesson plans around collection themes
- Easy citation of entire collections

### For Institutions
- Organize large archives logically
- Maintain multiple organizational schemes
- Enable cross-collection discovery
- Preserve institutional structure

### For Developers
- IIIF-compatible for viewer integration
- RESTful API design
- Efficient pagination and lazy loading
- Pre-computed aggregations for performance

## Migration Path

If you have existing interviews without collections:

1. **Create thematic collections** grouping related interviews
2. **Add relation links** from interviews to collections
3. **Generate aggregated data** by analyzing all interviews
4. **Build search indexes** for collection-level search
5. **Create top-level collection** if managing multiple series

Start simple with one thematic collection, then expand as needed.
