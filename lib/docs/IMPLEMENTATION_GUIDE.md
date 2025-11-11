# Implementation Guide for TheirStory Platform

## Overview

This guide shows how to implement the oral history schema in a production platform like TheirStory, with practical considerations for MongoDB, search, and API design.

## Database Structure

### MongoDB Collections

```javascript
// Collection: interviews
{
  _id: ObjectId("..."),
  id: "https://theirstory.com/interviews/larry-augustin-2024",
  type: "OralHistory",
  title: "Larry Augustin Interview",
  // ... full interview data as per schema
  
  // Additional platform fields
  organization_id: ObjectId("..."),  // Which org owns this
  project_id: ObjectId("..."),       // Which project it belongs to
  visibility: "public",               // public, unlisted, private
  created_by: ObjectId("..."),        // User who created it
  collection_ids: [                   // Collections it belongs to
    ObjectId("..."),
    ObjectId("...")
  ]
}

// Collection: collections
{
  _id: ObjectId("..."),
  id: "https://theirstory.com/collections/open-source-pioneers",
  type: "Collection",
  label: { "en": ["Open Source Pioneers"] },
  // ... full collection data as per schema
  
  // Platform fields
  organization_id: ObjectId("..."),
  parent_collection_id: ObjectId("...") | null,
  visibility: "public",
  created_by: ObjectId("..."),
  
  // Cached aggregations (updated by background jobs)
  aggregated_entities: [...],
  aggregated_themes: [...],
  last_aggregation_update: ISODate("...")
}

// Collection: organizations
{
  _id: ObjectId("..."),
  name: "FOSSDA",
  slug: "fossda",
  domain: "fossda.org",  // For generating URIs
  settings: {
    default_license: "CC-BY-NC-SA-4.0",
    enable_public_access: true
  }
}
```

### Indexes for Performance

```javascript
// interviews collection
db.interviews.createIndex({ "id": 1 }, { unique: true });
db.interviews.createIndex({ "organization_id": 1, "visibility": 1 });
db.interviews.createIndex({ "collection_ids": 1 });
db.interviews.createIndex({ "named_entities.identifiers.wikidata": 1 });
db.interviews.createIndex({ "themes.name": 1 });
db.interviews.createIndex({ "created": -1 });

// Full-text search on transcripts
db.interviews.createIndex({
  "title": "text",
  "description": "text",
  "transcript.segments.text": "text"
});

// collections collection
db.collections.createIndex({ "id": 1 }, { unique: true });
db.collections.createIndex({ "organization_id": 1 });
db.collections.createIndex({ "parent_collection_id": 1 });
```

## API Endpoints

### RESTful API Structure

```
GET    /api/v1/interviews
GET    /api/v1/interviews/:id
POST   /api/v1/interviews
PUT    /api/v1/interviews/:id
DELETE /api/v1/interviews/:id

GET    /api/v1/collections
GET    /api/v1/collections/:id
POST   /api/v1/collections
PUT    /api/v1/collections/:id
DELETE /api/v1/collections/:id

GET    /api/v1/collections/:id/interviews
POST   /api/v1/collections/:id/interviews/:interview_id

GET    /api/v1/search/interviews
GET    /api/v1/search/collections/:id/fulltext
GET    /api/v1/search/collections/:id/entities
GET    /api/v1/search/collections/:id/themes
```

### Example Implementation (Node.js/Express)

```javascript
// routes/interviews.js
const express = require('express');
const router = express.Router();

// GET /api/v1/interviews/:id
router.get('/:id', async (req, res) => {
  try {
    const interview = await db.collection('interviews').findOne({
      id: `https://${req.org.domain}/interviews/${req.params.id}`
    });
    
    if (!interview) {
      return res.status(404).json({ error: 'Interview not found' });
    }
    
    // Check permissions
    if (interview.visibility === 'private' && 
        !req.user?.canAccess(interview)) {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    // Return full interview
    res.json(interview);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/v1/collections/:id/interviews
router.get('/collections/:id/interviews', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;
  
  const collection = await db.collection('collections').findOne({
    id: `https://${req.org.domain}/collections/${req.params.id}`
  });
  
  if (!collection) {
    return res.status(404).json({ error: 'Collection not found' });
  }
  
  // Get interview IDs from collection
  const interviewIds = collection.items
    .filter(item => item.type === 'OralHistory')
    .map(item => item.id);
  
  // Fetch interviews with pagination
  const interviews = await db.collection('interviews')
    .find({ id: { $in: interviewIds } })
    .skip(skip)
    .limit(limit)
    .toArray();
  
  res.json({
    items: interviews,
    page,
    limit,
    total: interviewIds.length,
    hasMore: skip + interviews.length < interviewIds.length
  });
});
```

## Search Implementation

### Elasticsearch Schema

For advanced search, use Elasticsearch alongside MongoDB:

```javascript
// Elasticsearch index mapping
{
  "mappings": {
    "properties": {
      "id": { "type": "keyword" },
      "title": { 
        "type": "text",
        "analyzer": "english",
        "fields": {
          "keyword": { "type": "keyword" }
        }
      },
      "transcript_text": {
        "type": "text",
        "analyzer": "english"
      },
      "transcript_segments": {
        "type": "nested",
        "properties": {
          "id": { "type": "keyword" },
          "speaker_name": { "type": "keyword" },
          "text": { "type": "text", "analyzer": "english" },
          "start_time": { "type": "float" },
          "end_time": { "type": "float" }
        }
      },
      "named_entities": {
        "type": "nested",
        "properties": {
          "text": { "type": "keyword" },
          "type": { "type": "keyword" },
          "wikidata_id": { "type": "keyword" }
        }
      },
      "themes": {
        "type": "nested",
        "properties": {
          "name": { "type": "keyword" },
          "occurrences": {
            "type": "nested",
            "properties": {
              "start_time": { "type": "float" },
              "end_time": { "type": "float" }
            }
          }
        }
      },
      "collection_ids": { "type": "keyword" },
      "created": { "type": "date" }
    }
  }
}
```

### Search Query Examples

```javascript
// Full-text search across collection
async function searchCollection(collectionId, query) {
  const result = await esClient.search({
    index: 'interviews',
    body: {
      query: {
        bool: {
          must: [
            { match: { transcript_text: query } },
            { term: { collection_ids: collectionId } }
          ]
        }
      },
      highlight: {
        fields: {
          'transcript_segments.text': {
            type: 'plain',
            fragment_size: 150,
            number_of_fragments: 3
          }
        }
      },
      size: 20
    }
  });
  
  return result.hits.hits.map(hit => ({
    interview_id: hit._source.id,
    title: hit._source.title,
    highlights: hit.highlight?.['transcript_segments.text'] || []
  }));
}

// Entity search
async function searchByEntity(collectionId, entityName) {
  const result = await esClient.search({
    index: 'interviews',
    body: {
      query: {
        bool: {
          must: [
            {
              nested: {
                path: 'named_entities',
                query: {
                  match: { 'named_entities.text': entityName }
                }
              }
            },
            { term: { collection_ids: collectionId } }
          ]
        }
      }
    }
  });
  
  return result.hits.hits;
}
```

## Background Jobs

### Aggregating Collection Data

```javascript
// jobs/aggregate-collection.js
const Queue = require('bull');
const aggregateQueue = new Queue('collection-aggregation');

aggregateQueue.process(async (job) => {
  const { collectionId } = job.data;
  
  const collection = await db.collection('collections')
    .findOne({ _id: collectionId });
  
  const interviews = await db.collection('interviews')
    .find({ collection_ids: collectionId })
    .toArray();
  
  // Aggregate entities
  const entityMap = new Map();
  for (const interview of interviews) {
    for (const entity of interview.named_entities || []) {
      const key = entity.identifiers?.wikidata || entity.text;
      
      if (!entityMap.has(key)) {
        entityMap.set(key, {
          entity_id: key,
          text: entity.text,
          type: entity.type,
          frequency: 0,
          interviews: []
        });
      }
      
      const agg = entityMap.get(key);
      agg.frequency++;
      if (!agg.interviews.includes(interview.id)) {
        agg.interviews.push(interview.id);
      }
    }
  }
  
  // Aggregate themes
  const themeMap = new Map();
  for (const interview of interviews) {
    for (const theme of interview.themes || []) {
      if (!themeMap.has(theme.id)) {
        themeMap.set(theme.id, {
          theme_id: theme.id,
          name: theme.name,
          description: theme.description,
          frequency: 0,
          interviews: []
        });
      }
      
      const agg = themeMap.get(theme.id);
      agg.frequency++;
      if (!agg.interviews.includes(interview.id)) {
        agg.interviews.push(interview.id);
      }
    }
  }
  
  // Update collection
  await db.collection('collections').updateOne(
    { _id: collectionId },
    {
      $set: {
        aggregated_entities: Array.from(entityMap.values()),
        aggregated_themes: Array.from(themeMap.values()),
        'collection_metadata.interview_count': interviews.length,
        'collection_metadata.total_duration': interviews.reduce(
          (sum, i) => sum + (i.duration || 0), 0
        ),
        'collection_metadata.modified': new Date(),
        last_aggregation_update: new Date()
      }
    }
  );
});

// Trigger aggregation when interview added to collection
async function addInterviewToCollection(interviewId, collectionId) {
  await db.collection('interviews').updateOne(
    { _id: interviewId },
    { $addToSet: { collection_ids: collectionId } }
  );
  
  // Trigger background aggregation
  await aggregateQueue.add({ collectionId });
}
```

## URL Structure

### Human-Friendly URLs

```
# Individual interviews
https://fossda.org/interviews/larry-augustin-2024-04-16
https://fossda.org/interviews/jon-maddog-hall-2024-03-20

# Collections
https://fossda.org/collections/open-source-pioneers
https://fossda.org/collections/technology-history

# Specific segments (with time anchors)
https://fossda.org/interviews/larry-augustin-2024-04-16#t=144
https://fossda.org/interviews/larry-augustin-2024-04-16#seg-005

# Clips
https://fossda.org/clips/larry-augustin-tractor-philosophy

# Search
https://fossda.org/search?q=linux&collection=open-source-pioneers
```

### Generating URIs

```javascript
// utils/uri-generator.js
function generateInterviewURI(org, interview) {
  const slug = slugify(interview.title);
  const date = interview.created.split('T')[0]; // YYYY-MM-DD
  return `https://${org.domain}/interviews/${slug}-${date}`;
}

function generateCollectionURI(org, collection) {
  const slug = slugify(collection.label.en[0]);
  return `https://${org.domain}/collections/${slug}`;
}

// Use consistent slugs
const slugify = (text) => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};
```

## Access Control

### Permission Levels

```javascript
const AccessLevels = {
  PUBLIC: 'public',           // Anyone can view
  UNLISTED: 'unlisted',       // Only with direct link
  ORGANIZATION: 'organization', // Org members only
  PROJECT: 'project',          // Project members only
  PRIVATE: 'private'           // Owner only
};

// Middleware to check access
async function checkInterviewAccess(req, res, next) {
  const interview = await db.collection('interviews')
    .findOne({ id: req.params.id });
  
  if (!interview) {
    return res.status(404).json({ error: 'Not found' });
  }
  
  switch (interview.visibility) {
    case 'public':
      return next();
      
    case 'unlisted':
      // Anyone with link can view
      return next();
      
    case 'organization':
      if (req.user?.organization_id?.equals(interview.organization_id)) {
        return next();
      }
      break;
      
    case 'project':
      const project = await db.collection('projects')
        .findOne({ _id: interview.project_id });
      if (project?.member_ids.includes(req.user?._id)) {
        return next();
      }
      break;
      
    case 'private':
      if (req.user?._id.equals(interview.created_by)) {
        return next();
      }
      break;
  }
  
  return res.status(403).json({ error: 'Access denied' });
}
```

## Caching Strategy

```javascript
// Use Redis for caching frequently accessed data
const redis = require('redis');
const client = redis.createClient();

async function getInterview(id) {
  // Check cache first
  const cached = await client.get(`interview:${id}`);
  if (cached) {
    return JSON.parse(cached);
  }
  
  // Fetch from database
  const interview = await db.collection('interviews')
    .findOne({ id });
  
  // Cache for 1 hour
  await client.setex(
    `interview:${id}`,
    3600,
    JSON.stringify(interview)
  );
  
  return interview;
}

// Invalidate cache when interview updated
async function updateInterview(id, updates) {
  await db.collection('interviews')
    .updateOne({ id }, { $set: updates });
  
  await client.del(`interview:${id}`);
}
```

## IIIF Manifest Generation

```javascript
// Generate IIIF manifest on-the-fly
function generateIIIFManifest(interview, baseUrl) {
  return {
    "@context": "http://iiif.io/api/presentation/3/context.json",
    "id": `${interview.id}/manifest`,
    "type": "Manifest",
    "label": interview.label,
    "summary": interview.summary,
    "metadata": interview.metadata,
    "rights": interview.rights,
    "requiredStatement": interview.requiredStatement,
    "provider": interview.provider,
    
    "items": [
      {
        "id": `${interview.id}/canvas/1`,
        "type": "Canvas",
        "duration": interview.duration,
        "items": [
          {
            "id": `${interview.id}/page/1`,
            "type": "AnnotationPage",
            "items": [
              {
                "id": `${interview.id}/annotation/video`,
                "type": "Annotation",
                "motivation": "painting",
                "body": {
                  "id": interview.media.video[0].url,
                  "type": "Video",
                  "format": interview.media.video[0].format,
                  "duration": interview.media.video[0].duration
                },
                "target": `${interview.id}/canvas/1`
              }
            ]
          }
        ],
        
        // Add transcript as annotations
        "annotations": [
          {
            "id": `${interview.id}/transcript-page`,
            "type": "AnnotationPage",
            "items": interview.transcript.segments.map(seg => ({
              "id": `${interview.id}/annotation/${seg.id}`,
              "type": "Annotation",
              "motivation": "supplementing",
              "body": {
                "type": "TextualBody",
                "value": seg.text,
                "format": "text/plain",
                "language": interview.transcript.language
              },
              "target": {
                "source": `${interview.id}/canvas/1`,
                "selector": {
                  "type": "TemporalSelector",
                  "start": seg.start_time,
                  "end": seg.end_time
                }
              }
            }))
          }
        ]
      }
    ]
  };
}

// Endpoint
router.get('/interviews/:id/manifest', async (req, res) => {
  const interview = await getInterview(req.params.id);
  const manifest = generateIIIFManifest(interview, req.baseUrl);
  res.json(manifest);
});
```

## Migration from Existing Data

```javascript
// Script to migrate existing interviews to new schema
async function migrateInterview(oldInterview) {
  const newInterview = {
    "@context": [
      "http://www.w3.org/ns/anno.jsonld",
      "http://iiif.io/api/presentation/3/context.json"
    ],
    "id": generateInterviewURI(org, oldInterview),
    "type": "OralHistory",
    "label": { "en": [oldInterview.title] },
    "title": oldInterview.title,
    "created": oldInterview.recorded_at,
    "modified": oldInterview.updated_at,
    "duration": oldInterview.duration,
    
    "participants": oldInterview.participants.map(p => ({
      "id": `participant-${p.id}`,
      "name": p.name,
      "role": p.role,
      "bio": p.biography
    })),
    
    "transcript": {
      "language": "en",
      "segments": oldInterview.transcript_segments.map(seg => ({
        "id": `seg-${seg.id}`,
        "speaker_id": `participant-${seg.speaker_id}`,
        "speaker_name": seg.speaker_name,
        "start_time": seg.start_time,
        "end_time": seg.end_time,
        "text": seg.text
      }))
    },
    
    // Generate other fields...
  };
  
  await db.collection('interviews').insertOne(newInterview);
}
```

## Performance Monitoring

```javascript
// Add timing middleware
app.use((req, res, next) => {
  req.startTime = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - req.startTime;
    console.log(`${req.method} ${req.path} - ${duration}ms`);
    
    // Send to monitoring service
    if (duration > 1000) {
      logger.warn('Slow request', {
        method: req.method,
        path: req.path,
        duration
      });
    }
  });
  
  next();
});
```

## Key Takeaways

1. **Use MongoDB for flexibility** - JSON schema maps naturally
2. **Add Elasticsearch for search** - Full-text and faceted search
3. **Cache aggressively** - Interviews rarely change once published
4. **Background jobs for aggregation** - Don't compute collection stats on-the-fly
5. **IIIF compatibility** - Makes your data accessible to many tools
6. **Plan for scale** - Pagination, lazy loading, efficient queries
