# Global Community Archives Framework

## Overview

This document addresses how the oral history schema can serve diverse global communities while respecting cultural differences, Indigenous data sovereignty, and decolonial practices.

## Core Strengths for Global Use

### 1. International Standards Foundation
- ✅ IIIF (used worldwide from Europe to Asia to Africa)
- ✅ W3C Web Annotation (global standard)
- ✅ ISO language codes (covers all languages)
- ✅ Decentralized URIs (communities control their own)

### 2. Multilingual by Default
Every field supports multiple languages simultaneously:
```json
{
  "label": {
    "en": ["Interview with Community Elder"],
    "sw": ["Mahojiano na Mzee wa Jamii"],
    "ar": ["مقابلة مع شيخ المجتمع"],
    "zh": ["社区长者访谈"]
  }
}
```

### 3. Community Ownership Model
```json
{
  "provider": [{
    "id": "https://community-archive.org",
    "type": "Agent",
    "label": {"sw": ["Kijiji cha Uzazi wa Asili"]}
  }],
  "rights": "https://localcontexts.org/tk/cl/",
  "custodian": "Community-designated keeper"
}
```

## Critical Additions for Global Justice

### 1. Indigenous Data Sovereignty

Integrate **CARE Principles** (Collective Benefit, Authority to Control, Responsibility, Ethics) and **Local Contexts** labels:

```json
{
  "indigenous_data_sovereignty": {
    "tk_labels": [
      "TK Culturally Sensitive",
      "TK Community Voice",
      "TK Men's Knowledge"
    ],
    "bc_labels": [
      "BC Open to Collaborate",
      "BC Consent Verified"
    ],
    "governing_authority": {
      "name": "Tribal Cultural Committee",
      "contact": "cultural.committee@tribe.gov",
      "decision_protocol": "Requires unanimous consent of elders"
    },
    "geographic_restrictions": [
      "Not accessible outside traditional territory"
    ],
    "temporal_restrictions": {
      "ceremony_periods": "No access during harvest ceremonies",
      "seasonal": "Winter knowledge only accessible in winter"
    },
    "gender_restrictions": {
      "men_only": false,
      "women_only": false,
      "elder_mediated": true
    },
    "repatriation_protocol": {
      "community_right_to_recall": true,
      "notification_period_days": 30,
      "data_destruction_upon_request": true
    }
  }
}
```

### 2. Consent Frameworks

Different cultures have different consent models:

```json
{
  "consent": {
    "type": "community_consent",  // vs "individual_consent"
    "consent_model": {
      "primary": "collective_decision",
      "authority": "Council of Elders",
      "individual_veto_right": true,
      "descendant_consent_required": true,
      "consent_duration": "intergenerational",
      "revocable": true
    },
    "consent_documentation": {
      "oral_consent_recorded": true,
      "written_consent": false,  // Some cultures don't use written
      "witness_verification": [
        "Elder Name 1",
        "Elder Name 2"
      ],
      "ceremonial_consent": true  // Consent given in ceremony
    },
    "consent_review": {
      "periodic_reaffirmation": true,
      "review_interval_years": 5,
      "next_review_date": "2029-01-01"
    }
  }
}
```

### 3. Cultural Protocols

```json
{
  "cultural_protocols": {
    "sacred_knowledge": {
      "contains_sacred_content": false,
      "restricted_segments": [],
      "seasonal_restrictions": null,
      "initiation_required": false
    },
    "naming_protocols": {
      "use_of_names": "full_names_permitted",
      "ancestral_names": "avoid",
      "deceased_persons": "refer_as_ancestor_not_name"
    },
    "visual_protocols": {
      "faces_shown": true,
      "sacred_objects_visible": false,
      "ceremonial_dress_visible": "context_dependent",
      "location_identifiable": false  // Protect sacred sites
    },
    "language_protocols": {
      "primary_language": "indigenous_language",
      "translation_approved_by": "Language Keepers",
      "orthography": "community_standard_2020",
      "secret_language_segments": []  // Time ranges to redact
    }
  }
}
```

### 4. Colonial Context Acknowledgment

```json
{
  "colonial_context": {
    "acknowledge": true,
    "statement": {
      "en": ["This interview discusses experiences under colonial rule and its ongoing impacts on our community."],
      "indigenous_language": ["..."]
    },
    "content_warnings": [
      "Discussion of forced removal",
      "Mentions of boarding school trauma",
      "References to cultural suppression"
    ],
    "healing_resources": [
      {
        "name": "Community Healing Circle",
        "contact": "healing@community.org"
      }
    ],
    "sovereignty_assertion": "This story is told from our community's perspective and understanding of our own history."
  }
}
```

## Regional Adaptations

### Africa: Ubuntu Philosophy & Collective Memory

```json
{
  "ubuntu_principles": {
    "collective_voice": true,
    "individual_in_community": "This story represents not just one person but the collective memory of our village",
    "intergenerational_knowledge": true,
    "ancestor_acknowledgment": "Guided by spirits of our ancestors"
  },
  "oral_tradition_elements": {
    "griots_involved": true,
    "griot_names": ["Griot Name"],
    "call_and_response": true,
    "proverbs_used": ["Ubuntu proverb 1", "..."],
    "music_integrated": true,
    "dance_descriptions": true
  }
}
```

### Latin America: Testimonio Tradition

```json
{
  "testimonio": {
    "is_testimonio": true,
    "political_context": "Testimony of resistance during dictatorship",
    "collective_experience": true,
    "speaks_for": "Community of survivors",
    "solidarity_purpose": true,
    "protection_required": {
      "anonymize_locations": true,
      "protect_identities": ["person1", "person2"],
      "embargo_period": "Until political situation changes"
    }
  }
}
```

### Asia: Confucian Values & Family Honor

```json
{
  "cultural_values": {
    "family_honor": {
      "family_approval_required": true,
      "approved_by": "Family patriarch",
      "generational_impact_considered": true
    },
    "confucian_principles": {
      "respect_for_elders": "Defer to elder family members on sensitive topics",
      "hierarchical_considerations": true,
      "saving_face": "Avoid content that brings shame to family"
    },
    "ancestor_veneration": {
      "ancestors_mentioned": ["Ancestor Name"],
      "offerings_made": true,
      "permission_sought_spiritually": true
    }
  }
}
```

### Pacific Islands: Oceanic Knowledge Systems

```json
{
  "oceanic_knowledge": {
    "navigation_knowledge": {
      "restricted": true,
      "master_navigator_approval": true,
      "teaches_traditional_wayfinding": false
    },
    "island_specific_protocols": {
      "island": "Yap",
      "caste_considerations": true,
      "clan_permissions": ["Clan A approved", "Clan B approved"],
      "stone_money_references": "contextual_permission_given"
    },
    "language_preservation": {
      "endangered_language": "Yapese",
      "language_revitalization": true,
      "educational_use_encouraged": true
    }
  }
}
```

### Middle East & North Africa: Oral History in Conflict

```json
{
  "conflict_context": {
    "active_conflict_zone": false,
    "post_conflict": true,
    "safety_protocols": {
      "location_obscured": true,
      "names_changed": true,
      "identifying_features_removed": true,
      "delay_publication_until_safe": "2025-01-01"
    },
    "refugee_status": {
      "is_refugee_testimony": true,
      "host_country": "Jordan",
      "origin_country": "Syria",
      "asylum_implications": "Content vetted for asylum case safety"
    },
    "reconciliation_purpose": {
      "truth_and_reconciliation": true,
      "inter_community_dialogue": true,
      "peace_building": true
    }
  }
}
```

## Low-Resource Context Considerations

### Technical Adaptations

```json
{
  "low_resource_adaptations": {
    "offline_access": {
      "available_offline": true,
      "sd_card_distribution": true,
      "usb_stick_version": true
    },
    "bandwidth_considerations": {
      "audio_only_version": true,
      "low_resolution_video": true,
      "text_only_transcript": true,
      "progressive_loading": true
    },
    "device_compatibility": {
      "works_on_feature_phones": true,
      "sms_access": false,
      "radio_broadcast_compatible": true
    },
    "power_requirements": {
      "solar_powered_access": true,
      "battery_efficient": true
    }
  }
}
```

### Oral Cultures Without Written Tradition

```json
{
  "oral_culture_primary": {
    "written_transcript": false,
    "audio_is_primary": true,
    "visual_memory_aids": true,
    "storytelling_format_preserved": true,
    "transcription_approach": "none",  // Respects oral nature
    "memorization_aids": {
      "repetition_patterns": true,
      "mnemonic_devices": true,
      "song_elements": true
    }
  }
}
```

## Data Governance Models

### Community-Controlled Archives

```json
{
  "governance": {
    "model": "community_controlled",
    "governing_body": {
      "name": "Community Archive Committee",
      "composition": ["3 elders", "2 youth", "1 cultural expert"],
      "decision_making": "consensus",
      "meeting_frequency": "monthly"
    },
    "access_decisions": {
      "decided_by": "committee_vote",
      "appeal_process": "community_assembly",
      "outside_researcher_protocol": "formal_application_required"
    },
    "data_sovereignty": {
      "storage_location": "community_server",
      "cloud_backup": "encrypted_only",
      "no_third_party_access": true,
      "export_restrictions": true
    }
  }
}
```

### Cooperative Federation Model

```json
{
  "federation": {
    "type": "cooperative",
    "member_communities": [
      "Community A",
      "Community B",
      "Community C"
    ],
    "shared_standards": true,
    "shared_infrastructure": true,
    "autonomous_governance": true,
    "mutual_support": {
      "technical_assistance": true,
      "capacity_building": true,
      "resource_sharing": true
    },
    "federated_search": {
      "enabled": true,
      "respects_local_restrictions": true
    }
  }
}
```

## Implementation Priorities by Region

### Global South

**Priority 1: Offline-First**
- Audio/video works without internet
- SD card distribution
- Community radio integration

**Priority 2: Mobile-First**
- Works on basic smartphones
- Low bandwidth
- SMS notifications

**Priority 3: Language Preservation**
- Mother tongue recording
- No English requirement
- Local language interfaces

### Indigenous Communities

**Priority 1: Data Sovereignty**
- Community-hosted servers
- Full control over access
- Repatriation rights

**Priority 2: Cultural Protocols**
- Sacred knowledge protection
- Seasonal restrictions
- Gender-appropriate access

**Priority 3: Intergenerational Design**
- Elder-friendly interfaces
- Youth cultural education
- Bridge traditional/digital

### Post-Conflict Regions

**Priority 1: Safety**
- Anonymization tools
- Delayed publication
- Identity protection

**Priority 2: Truth & Reconciliation**
- Multiple perspective collection
- Conflict-sensitive metadata
- Healing resources linked

**Priority 3: Sustainable Access**
- Works in unreliable infrastructure
- Disaster-resistant backups
- No single point of failure

## Legal Frameworks by Region

### GDPR (Europe)
```json
{
  "gdpr_compliance": {
    "lawful_basis": "consent",
    "data_protection_officer": "dpo@archive.org",
    "right_to_erasure": true,
    "data_portability": true,
    "retention_period": "50_years",
    "processor_agreements": true
  }
}
```

### Indigenous Data Governance (Multiple Regions)
```json
{
  "indigenous_data_governance": {
    "framework": "OCAP",  // Ownership, Control, Access, Possession
    "ownership": "First Nation community",
    "control": "Band Council",
    "access": "determined_by_community",
    "possession": "stored_on_reserve"
  }
}
```

### African Union Data Protection
```json
{
  "au_convention": {
    "compliant": true,
    "cross_border_transfer": "restricted",
    "data_localization": "preferred"
  }
}
```

## Capacity Building Requirements

### For Global Implementation

1. **Technical Training**
   - In local languages
   - Culturally appropriate pedagogy
   - Hands-on, oral-heavy (not text manuals)
   - Elder + youth co-learning

2. **Cultural Adaptation Workshops**
   - How to extend schema for your culture
   - Identifying cultural protocols
   - Balancing access and protection

3. **Governance Training**
   - Community archive committees
   - Decision-making protocols
   - Conflict resolution

4. **Sustainability Planning**
   - Local hosting options
   - Funding models
   - Succession planning

## Success Indicators

A global framework succeeds when:

- ✅ Communities control their own stories
- ✅ Indigenous knowledge protected appropriately
- ✅ Works in diverse technical contexts
- ✅ Respects cultural protocols automatically
- ✅ Multilingual without English requirement
- ✅ Accessible to oral cultures
- ✅ Sustainable without external funding
- ✅ Builds local capacity
- ✅ Strengthens community identity
- ✅ Facilitates intergenerational knowledge transfer

## Schema Extension Example: Māori Community

```json
{
  "@context": [
    "http://www.w3.org/ns/anno.jsonld",
    "http://iiif.io/api/presentation/3/context.json",
    "https://tekanawa.nz/maori-oral-history-context.json"
  ],
  "id": "https://iwi-archive.nz/korero/example",
  "type": "OralHistory",
  
  "te_reo_maori": {
    "whakapapa": {
      "iwi": "Ngāi Tahu",
      "hapu": "Ngāti Waewae",
      "whanau": "Tūhuru Whanau"
    },
    "tikanga": {
      "karakia_performed": true,
      "mihi_given": true,
      "tapu_considerations": ["tapu material requires elder present"],
      "noa_status": "interview concluded with karakia to lift tapu"
    },
    "te_ao_maori": {
      "wairua_acknowledged": true,
      "tupuna_invoked": ["Tupuna names"],
      "whenua_connection": "Aoraki region",
      "marae_association": "Tuahiwi Marae"
    }
  }
}
```

## Recommendations for TheirStory

To truly serve global communities:

1. **Partner with Indigenous data sovereignty experts**
   - Local Contexts (TK/BC labels)
   - OCAP principles
   - Regional Indigenous organizations

2. **Develop cultural protocol toolkit**
   - Templates for different cultures
   - Extensibility guide
   - Cultural consultants network

3. **Support multiple hosting models**
   - Community-hosted
   - Cooperative federations
   - Encrypted cloud with local control

4. **Build offline-first**
   - Progressive web app
   - Sync when connected
   - Works on basic devices

5. **Multilingual from day one**
   - Interface translation
   - Right-to-left languages
   - Voice interfaces for oral cultures

6. **Create governance templates**
   - Community archive committees
   - Access decision workflows
   - Consent management

7. **Capacity building programs**
   - Train local champions
   - Culturally appropriate materials
   - Ongoing support networks

## Conclusion

This schema provides a **strong technical foundation** for global community archives, but it must be implemented with:

- **Humility** about Western bias
- **Partnership** with communities
- **Flexibility** for cultural adaptation
- **Commitment** to data sovereignty
- **Investment** in capacity building

The technology enables, but communities must govern.
