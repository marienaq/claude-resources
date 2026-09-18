# Claude Skills for AI Workshop Development

Based on analysis of Mellonhead AI Workshops workflow, here are custom Claude skills to optimize the instructional design process:

## Proposed Skills

### 1. **Discovery Session Analyzer**
```yaml
name: Discovery Session Analyzer
description: Transform meeting transcripts into AI opportunity readouts with structured findings and recommendations
```
- **Input**: Meeting transcripts, notes, team info
- **Output**: Formatted discovery readout with Level 1/Level 2 opportunities, team summary, technology ecosystem analysis
- **Value**: Eliminates 2-3 hours of manual analysis and formatting

### 2. **Survey Synthesizer & Workshop Customizer** 
```yaml
name: Survey Synthesizer & Workshop Customizer
description: Analyze survey data to generate workshop recommendations and customization insights
```
- **Input**: Survey responses, team demographics
- **Output**: Survey readout with key findings, barriers analysis, specific workshop modifications
- **Value**: Automates pattern detection and provides data-driven workshop customization

### 3. **Workshop Series Proposal Generator**
```yaml
name: Workshop Series Proposal Generator  
description: Create customized workshop proposals with learning objectives, agendas, and success metrics
```
- **Input**: Discovery findings, survey insights, team constraints
- **Output**: Complete proposal with workshop descriptions, learning objectives, timing, success metrics
- **Value**: Reduces proposal creation from 4-6 hours to 30 minutes

### 4. **AI Opportunity Mapper**
```yaml
name: AI Opportunity Mapper
description: Identify and categorize AI opportunities by task type, complexity, and business impact
```
- **Input**: Team workflows, current tools, pain points
- **Output**: Categorized opportunities (Level 1 Quick Wins vs Level 2 Deep Dives) with implementation guidance
- **Value**: Systematizes opportunity identification across different team types

### 5. **Workshop Content Generator**
```yaml
name: Workshop Content Generator
description: Generate workshop materials including agendas, exercises, handouts, and team guides
```
- **Input**: Workshop objectives, team context, tool ecosystem
- **Output**: Complete workshop materials with activities, prompts, assessment criteria
- **Value**: Accelerates content creation while maintaining quality and customization

### 6. **Follow-up Assessment Designer**
```yaml
name: Follow-up Assessment Designer
description: Create post-workshop surveys and measurement frameworks to track adoption and impact
```
- **Input**: Workshop objectives, baseline metrics, success criteria
- **Output**: Follow-up surveys, measurement rubrics, ROI tracking frameworks
- **Value**: Ensures consistent measurement and demonstrates workshop effectiveness

### 7. **Gap Identifier**
```yaml
name: Gap Identifier
description: Review draft readouts against workshop proposal requirements and identify missing information needed
```
- **Input**: Draft discovery readout, workshop proposal template/requirements
- **Output**: Summary of gaps + categorized question list (priority vs optional) grouped by topic area
- **Value**: Ensures complete information gathering before proposal creation, reduces back-and-forth with clients

### 8. **Gap Filler** 
```yaml
name: Gap Filler
description: Generate plausible answers to missing information based on similar team profiles to reduce SME cognitive load
```
- **Input**: Gap analysis, team context, similar team patterns
- **Output**: Draft suggestions for missing information formatted as "Is this accurate?" confirmations rather than open-ended questions
- **Value**: Transforms SME review from creative work to validation work, significantly faster and less mentally taxing

## Next Steps
- Start with **Discovery Session Analyzer** (highest time savings potential)
- Develop **Gap Identifier** and **Gap Filler** as complementary workflow optimizers
- Review sample outputs and document structure requirements
- Define input formats and data sources
- Create skill prototypes for testing

## Reference Materials
- Workshop Overview: `/tmp/workshop-overview.txt`
- Sample Discovery Readout: `/tmp/discovery-readout.txt`
- Sample Survey Readout: `/tmp/survey-readout.txt`
- Sample Workshop Proposal: `/tmp/workshop-proposal.txt`