# Oral History Metadata Schema - Complete Package

## What's Included

This package provides a comprehensive JSON metadata schema for oral history interviews with full IIIF compatibility and collection management capabilities.

### Core Schema Files

1. **[oral_history_schema.json](oral_history_schema.json)** - JSON Schema definition for individual interviews
2. **[collection_schema.json](collection_schema.json)** - JSON Schema for collections of interviews

### Example Data Files

3. **[larry_augustin_example.json](larry_augustin_example.json)** - Fully populated interview with Larry Augustin
4. **[maddog_hall_example.json](maddog_hall_example.json)** - Second interview example (Jon "maddog" Hall)
5. **[collection_example_open_source_pioneers.json](collection_example_open_source_pioneers.json)** - Thematic collection grouping multiple interviews
6. **[collection_example_top_level.json](collection_example_top_level.json)** - Top-level collection containing sub-collections

### Documentation

7. **[README.md](README.md)** - Complete schema overview and usage guide
8. **[COLLECTIONS_GUIDE.md](COLLECTIONS_GUIDE.md)** - Detailed guide on organizing interviews into collections
9. **[IMPLEMENTATION_GUIDE.md](IMPLEMENTATION_GUIDE.md)** - Production implementation guide for platforms

## Key Changes for Collections

### Individual Interviews Don't Change Much

Individual interview schemas remain the same whether they're standalone or part of a collection. The only addition is the `relations` array:

```json
"relations": [
  {
    "type": "part_of_series",
    "target_id": "https://fossda.org/collections/open-source-pioneers"
  }
]
```

### Collections Add These Features

**1. Aggregated Entities**
- Shows which people/places/orgs appear across multiple interviews
- Frequency counts (how many interviews mention each entity)
- Quick access to all interviews mentioning specific entities

**2. Aggregated Themes**
- Themes that span multiple interviews
- Enables comparative analysis
- Builds thematic playlists

**3. Collection-Level Search**
- Search across all interviews at once
- Find patterns and connections
- More powerful research capabilities

**4. Hierarchical Organization**
- Collections can contain sub-collections
- Multiple organizational schemes (by theme, geography, time period)
- Flexible categorization

## Why This Matters for TheirStory

### 1. **Community Organizations**

Each community gets their own collection:
- "Communities in Schools Wisdom Project"
- "Holocaust Education Voices" 
- "America's 250th Anniversary Stories"

Benefits:
- Branded landing pages
- Unified search across community's interviews
- Theme analysis specific to community
- Easy sharing of entire project

### 2. **Educational Institutions**

Universities can organize by:
- Department collections
- Research project collections
- Course-specific collections
- Geographic collections

Example hierarchy:
```
UC Berkeley Oral History Program (top-level)
├── Political History Collection
│   ├── Civil Rights Era
│   └── Cold War Diplomacy
├── Science & Technology
│   ├── Silicon Valley Innovation
│   └── Biotechnology Pioneers
└── Cultural Heritage
    ├── California Farmworkers
    └── Asian American Experiences
```

### 3. **Research Capabilities**

Researchers can:
- Compare how different people discuss same themes
- Build network graphs of mentioned people
- Track evolution of topics over time
- Create custom sub-collections for specific studies

### 4. **Cross-Collection Discovery**

Platform-wide search can:
- Find all interviews mentioning "Linux" across all collections
- Show connections between different community stories
- Enable serendipitous discovery
- Build broader historical understanding

## Practical Example: How Collections Work

### Scenario: Student researching "Women in Tech"

Without collections:
1. Search entire platform for "women technology"
2. Get random results from many projects
3. Hard to understand context
4. No way to see thematic connections

With collections:
1. Browse "Women in Computing" collection
2. See curated set of relevant interviews
3. View aggregated themes like "Breaking Barriers" appearing in 12 interviews
4. Click through to specific moments in each interview discussing that theme
5. See network of people mentioned across interviews
6. Download citations for entire collection

## Multiple Collection Memberships

An interview can belong to multiple collections simultaneously:

```
Larry Augustin interview appears in:
├── Open Source Pioneers (thematic)
├── Silicon Valley Entrepreneurs (professional)
├── Stanford Alumni (institutional)
└── 1990s Tech History (temporal)
```

This enables:
- Different discovery paths
- Multiple organizational schemes
- Richer context
- Broader accessibility

## IIIF Compatibility Benefits

### With IIIF, you can:

1. **Use existing viewers**
   - Universal Viewer
   - Mirador
   - Clover
   - Custom builds

2. **Share with other institutions**
   - Collections can reference interviews from other platforms
   - Build federated collections
   - Aggregate across repositories

3. **Standard annotations**
   - Comments, corrections, bookmarks
   - Compatible with Web Annotation standard
   - Interoperable with other IIIF content

4. **Future-proof**
   - Based on open standards
   - Wide adoption
   - Active development community

## Implementation Priorities

### Phase 1: Individual Interviews (Current)
- Full transcript with timing
- Basic metadata
- Media files
- Simple search

### Phase 2: Enhanced Individual Features
- Named entity recognition
- Theme extraction
- Clips creation
- User annotations

### Phase 3: Collections
- Create collections
- Aggregate entities/themes
- Collection-level search
- Hierarchical organization

### Phase 4: Advanced Features
- Cross-collection search
- Network visualization
- IIIF manifest generation
- Federated collections

## Data Storage Considerations

### Size Estimates

**Individual interview:**
- Minimal (no word-level timing): ~50-100 KB
- With word-level timing: ~500 KB - 2 MB
- With full entity/theme analysis: ~1-3 MB

**Collection:**
- Small (10 interviews): ~5-10 MB
- Medium (50 interviews): ~20-40 MB
- Large (500 interviews): ~200-400 MB

**Recommendations:**
- Store interviews and collections separately in database
- Use references (IDs/URIs) instead of embedding full interviews in collections
- Cache aggregated data (entities/themes) rather than computing on-the-fly
- Lazy-load transcript segments for large interviews

## Search Strategy

### Three-Tier Search

**Tier 1: MongoDB Full-Text**
- Basic search across titles, descriptions
- Good for simple queries
- Fast, built-in

**Tier 2: Elasticsearch**
- Advanced full-text search
- Faceted search (filter by theme, speaker, date)
- Highlighting in transcripts
- Best for production

**Tier 3: Vector Search (Future)**
- Semantic search ("find interviews about community resilience")
- Similar interview discovery
- Theme clustering
- AI-powered

## Migration Path

If you have existing interviews:

1. **Add minimal collection support**
   - Create one "All Interviews" collection
   - Reference all existing interviews
   - No changes to interview schema needed

2. **Add themed collections gradually**
   - Let users create collections
   - Tag interviews with themes
   - Build aggregations in background

3. **Expand hierarchically**
   - Create organization-level collections
   - Add sub-collections
   - Enable cross-collection features

## Common Patterns

### Pattern 1: Project-Based Collections

```
Organization: Communities in Schools
└── Collection: CIS Wisdom Project 2024
    ├── Interview: Student perspectives
    ├── Interview: Family stories
    └── Interview: Teacher reflections
```

### Pattern 2: Thematic Cross-Project Collections

```
Platform-Level Collection: Stories of Resilience
├── From: CIS Wisdom Project (3 interviews)
├── From: Holocaust Education (5 interviews)
└── From: Community Health (2 interviews)
```

### Pattern 3: Geographic Collections

```
Bay Area Technology History
├── Sub-collection: Silicon Valley Companies
│   ├── VA Linux interviews
│   └── Early startups
└── Sub-collection: Stanford Influence
    ├── Alumni entrepreneurs
    └── Research impact stories
```

## API Design Tips

### RESTful URLs

```
GET /interviews/:id
GET /interviews/:id/transcript
GET /interviews/:id/clips
GET /interviews/:id/themes

GET /collections/:id
GET /collections/:id/interviews
GET /collections/:id/aggregated-entities
GET /collections/:id/aggregated-themes

GET /search/interviews?q=linux
GET /search/collections/:id?q=community
```

### Pagination

Always paginate collections:
```json
{
  "items": [...],
  "page": 1,
  "per_page": 20,
  "total": 156,
  "next": "/collections/abc/interviews?page=2"
}
```

### Caching Headers

```
Cache-Control: public, max-age=3600  // Interviews rarely change
Cache-Control: private, max-age=300  // Collections update more often
```

## Next Steps

1. **Review the schemas** - Understand the structure
2. **Examine the examples** - See real data
3. **Read the guides** - Learn implementation patterns
4. **Start simple** - Individual interviews first
5. **Add collections** - When you have 10+ interviews
6. **Build aggregations** - Background jobs for cross-interview analysis
7. **Enable search** - Start with MongoDB, add Elasticsearch later

## Questions to Consider

1. **Access control**: Who can create collections? Who can add interviews to collections?
2. **Versioning**: How do you handle updates to interviews that are in collections?
3. **Citation**: How should users cite entire collections vs. individual interviews?
4. **Archival**: Should collections have their own preservation metadata?
5. **Federation**: Will you allow external interviews in your collections?

## Support & Resources

- **IIIF Community**: https://iiif.io/community/
- **Web Annotation**: https://www.w3.org/TR/annotation-model/
- **Schema.org**: Consider adding schema.org markup for SEO
- **Dublin Core**: Many archives also map to DC metadata

## Summary

This schema provides:
- ✅ Individual interview structure with rich metadata
- ✅ Collection organization at multiple levels
- ✅ IIIF compatibility for interoperability
- ✅ Research features (themes, entities, aggregations)
- ✅ Flexible architecture (start simple, grow complex)
- ✅ Real examples from actual interviews
- ✅ Production implementation guidance

The key insight: **Start with individual interviews, add collections when needed, scale hierarchically as your platform grows.**
