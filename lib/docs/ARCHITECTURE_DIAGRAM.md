# Schema Architecture Diagram

## Hierarchical Structure

```
┌─────────────────────────────────────────────────────────────────┐
│                    TheirStory Platform                          │
│                   (All Organizations)                           │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
        ▼                     ▼                     ▼
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│ Organization │    │ Organization │    │ Organization │
│   FOSSDA     │    │     CIS      │    │  Holocaust   │
│              │    │              │    │   Education  │
└──────────────┘    └──────────────┘    └──────────────┘
        │
        │
        ├─── Top-Level Collection: "Technology History"
        │    (Collection of Collections)
        │
        ├──────┬──────────────────────────────────────┐
        │      │                                      │
        ▼      ▼                                      ▼
   ┌────────────┐  ┌────────────────┐         ┌────────────┐
   │ Collection │  │   Collection   │   ...   │ Collection │
   │  Open      │  │   Internet     │         │  Women in  │
   │  Source    │  │   Pioneers     │         │  Computing │
   │  Pioneers  │  │                │         │            │
   └────────────┘  └────────────────┘         └────────────┘
        │
        │  Contains 5 interviews
        │
        ├──────────────┬──────────────┬──────────────┐
        │              │              │              │
        ▼              ▼              ▼              ▼
   ┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────┐
   │Interview│   │Interview│   │Interview│   │Interview│
   │  Linus  │   │ Maddog  │   │  Larry  │   │  Eric   │
   │Torvalds │   │  Hall   │   │Augustin │   │ Raymond │
   └─────────┘   └─────────┘   └─────────┘   └─────────┘
        │
        │  Contains multiple components
        │
        ├───────────┬───────────┬───────────┬───────────┐
        │           │           │           │           │
        ▼           ▼           ▼           ▼           ▼
   ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐
   │Transcript│ │ Indexes │ │ Themes  │ │ Named   │ │  Clips  │
   │ + Timing │ │ (TOC)   │ │         │ │Entities │ │         │
   └─────────┘ └─────────┘ └─────────┘ └─────────┘ └─────────┘
```

## Data Flow: Individual → Collection → Platform

```
INDIVIDUAL INTERVIEW
┌────────────────────────────────────────────┐
│ Larry Augustin Interview                   │
│                                            │
│ • Full transcript with word-level timing   │
│ • Speaker: Larry, Elisabetta              │
│ • 15 named entities (people, orgs, tech)  │
│ • 9 themes identified                      │
│ • 10 indexed topics                        │
│ • 3 curated clips                          │
└────────────────────────────────────────────┘
                    │
                    │ Added to collection
                    ▼
COLLECTION (Open Source Pioneers)
┌────────────────────────────────────────────┐
│ Contains: 5 interviews                     │
│                                            │
│ AGGREGATED DATA:                           │
│ • 45 unique named entities                 │
│   - Linus Torvalds (mentioned in 4)       │
│   - Larry Augustin (mentioned in 3)       │
│   - Linux (mentioned in 5)                 │
│                                            │
│ • 12 cross-interview themes                │
│   - Open Source Philosophy (5 interviews)  │
│   - Commercialization (3 interviews)       │
│   - Community Building (4 interviews)      │
│                                            │
│ • Collection-level search enabled          │
│ • Total duration: 10 hours                 │
└────────────────────────────────────────────┘
                    │
                    │ Part of top-level
                    ▼
TOP-LEVEL COLLECTION
┌────────────────────────────────────────────┐
│ Technology History Oral Histories          │
│                                            │
│ Contains: 6 sub-collections                │
│ • Open Source Pioneers (5 interviews)      │
│ • Early Computing (20 interviews)          │
│ • Personal Computer Revolution (30)        │
│ • Internet Pioneers (25 interviews)        │
│ • Women in Computing (40 interviews)       │
│ • AI & Machine Learning (36 interviews)    │
│                                            │
│ Total: 156 interviews, 120 hours          │
│ Platform-wide search & discovery           │
└────────────────────────────────────────────┘
```

## Cross-Cutting Concerns

```
                    INTERVIEW
                       │
       ┌───────────────┼───────────────┐
       │               │               │
       ▼               ▼               ▼
  ┌─────────┐    ┌─────────┐    ┌─────────┐
  │ Thematic│    │Geographic│   │Temporal │
  │Collection│   │Collection│   │Collection│
  └─────────┘    └─────────┘    └─────────┘
       │               │               │
       │               │               │
   "Open          "Bay Area"     "1990s Tech"
   Source"
   
   Same interview can be in multiple collections!
```

## Search Architecture

```
                    USER QUERY: "linux commercialization"
                              │
                              ▼
                    ┌──────────────────┐
                    │  Search Router   │
                    └──────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
        ▼                     ▼                     ▼
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│  Interview   │    │  Collection  │    │  Platform    │
│   Search     │    │    Search    │    │   Search     │
│              │    │              │    │              │
│ Search one   │    │ Search all   │    │ Search all   │
│ interview    │    │ interviews   │    │ collections  │
│              │    │ in collection│    │              │
└──────────────┘    └──────────────┘    └──────────────┘
        │                     │                     │
        └─────────────────────┴─────────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │  Unified Results │
                    │                  │
                    │ • Segment text   │
                    │ • Timestamps     │
                    │ • Speaker info   │
                    │ • Related themes │
                    │ • Entity context │
                    └──────────────────┘
```

## Entity & Theme Aggregation

```
INTERVIEW 1 (Larry Augustin)              INTERVIEW 2 (Maddog Hall)
┌────────────────────────┐                ┌────────────────────────┐
│ Entities:              │                │ Entities:              │
│ • Linus Torvalds       │───┐        ┌───│ • Linus Torvalds       │
│ • VA Linux             │   │        │   │ • VA Linux             │
│ • Larry Augustin       │───┤        ├───│ • Larry Augustin       │
│ • SourceForge          │   │        │   │ • Linux International  │
│                        │   │        │   │                        │
│ Themes:                │   │        │   │ Themes:                │
│ • Commercialization    │───┤   ┌────┤───│ • Commercialization    │
│ • Hands-on Learning    │   │   │    │   │ • Community Building   │
└────────────────────────┘   │   │    │   └────────────────────────┘
                             │   │    │
                             ▼   ▼    ▼
                    ┌──────────────────────┐
                    │  COLLECTION          │
                    │  Aggregated Data     │
                    │                      │
                    │ Entities:            │
                    │ • Linus (2x)         │
                    │ • VA Linux (2x)      │
                    │ • Larry (2x)         │
                    │ • SourceForge (1x)   │
                    │ • Linux Intl (1x)    │
                    │                      │
                    │ Themes:              │
                    │ • Commercialize (2x) │
                    │ • Hands-on (1x)      │
                    │ • Community (1x)     │
                    └──────────────────────┘
```

## IIIF Integration

```
THEIRSTORY INTERVIEW                IIIF ECOSYSTEM
┌────────────────────┐             ┌────────────────────┐
│ JSON-LD Format     │────────────▶│ IIIF Manifest      │
│ @context included  │             │ Presentation API 3 │
└────────────────────┘             └────────────────────┘
                                            │
                                            │ Compatible with
                                            ▼
                          ┌──────────────────────────────┐
                          │    IIIF Viewers              │
                          │  • Universal Viewer          │
                          │  • Mirador                   │
                          │  • Clover                    │
                          │  • Custom implementations    │
                          └──────────────────────────────┘
                                            │
                                            │ Can display
                                            ▼
                          ┌──────────────────────────────┐
                          │  • Video with transcript     │
                          │  • Synchronized timing       │
                          │  • Annotations               │
                          │  • Citations                 │
                          │  • Sharing                   │
                          └──────────────────────────────┘
```

## Timeline: Building Up Complexity

```
PHASE 1: Individual Interviews
─────────────────────────────
• Store basic interview data
• Transcript with timing
• Simple metadata
• Media files
                                    ▼
PHASE 2: Enhanced Features
─────────────────────────────
• Add named entities
• Extract themes
• Create clips
• User annotations
                                    ▼
PHASE 3: Collections
─────────────────────────────
• Group related interviews
• Aggregate entities/themes
• Collection-level search
• Simple hierarchy
                                    ▼
PHASE 4: Advanced Collections
─────────────────────────────
• Nested collections
• Cross-collection search
• Network visualization
• Federated collections
```

## Key Relationships

```
ONE Interview
    │
    ├─ HAS MANY transcript segments
    ├─ HAS MANY themes
    ├─ HAS MANY named entities
    ├─ HAS MANY clips
    ├─ HAS MANY annotations
    │
    └─ BELONGS TO MANY collections

ONE Collection
    │
    ├─ CONTAINS MANY interviews (or sub-collections)
    ├─ HAS aggregated_entities (computed)
    ├─ HAS aggregated_themes (computed)
    │
    └─ OPTIONALLY BELONGS TO parent collection
```
