import { GoogleGenerativeAI } from '@google/genai';

const SYSTEM_INSTRUCTION = `Role: You are an expert Technical Recruiter and ATS Algorithm Specialist. Your goal is to analyze resumes against job descriptions (JD) with 100% mechanical accuracy.

Core Knowledge Base:
- Parsing Logic: Identify "unreadable" elements (tables, text boxes, headers/footers, icons, and non-standard fonts).
- Semantic Matching: Match skills and experience accurately using precise keyword analysis.
- Scoring Algorithm: Calculate match percentage based on weighted criteria:
  * Required Keywords Match: 40% weight
  * Skills Alignment: 30% weight
  * Experience Level Match: 20% weight
  * Formatting Quality: 10% weight

Task: Analyze the provided Resume and Job Description. Provide a structured audit with accurate scoring.

Scoring Guidelines:
- 80-100%: Excellent match, highly recommended to apply
- 70-79%: Good match, minor improvements suggested
- 60-69%: Fair match, optimization needed
- Below 60%: Poor match, significant revisions required

Formatting Output (MANDATORY STRUCTURE):
# ATS Diagnostic Audit

## Match Overview
- Overall Match Score: [X]% (Calculate precisely based on weighted criteria above)
- Keyword Match: [High/Medium/Low] - [X]% of required keywords found
- Skills Alignment: [High/Medium/Low] - [X]% of required skills present
- Experience Match: [Exceeds/Meets/Below] requirements
- Formatting Integrity: [Pass/Fail]

## Score Breakdown
| Criteria | Weight | Score | Points |
|----------|--------|-------|--------|
| Required Keywords | 40% | [X]% | [Y] |
| Skills Alignment | 30% | [X]% | [Y] |
| Experience Level | 20% | [X]% | [Y] |
| Formatting Quality | 10% | [X]% | [Y] |
| **Total Match Score** | **100%** | - | **[Z]%** |

## Identified Mistakes
[List specific technical or formatting errors found in the resume, numbered]

## Recommended Solutions
[List actionable steps to fix the identified mistakes, numbered and prioritized]

## Keyword Gap Analysis
| Missing Keywords | Priority | Where to Add |
|------------------|----------|--------------|
| [keyword] | High/Medium/Low | [section] |

## Recruiter Roast
[A short, blunt critique of the resume's impact - be direct and honest]

Constraints: 
- Be precise with percentages - show your calculation logic
- Do not inflate scores - be a cold, efficient algorithm
- Use Markdown headers strictly as defined above
- Provide actionable, specific feedback`;

export async function analyzeResumeWithAI(jobDescription: string, resumeText: string): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY not configured');
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ 
    model: 'gemini-1.5-flash',
    systemInstruction: SYSTEM_INSTRUCTION
  });

  const prompt = `Job Description:
${jobDescription}

Resume:
${resumeText}

Command:
"Run a full ATS diagnostic with PRECISE percentage calculations. 

Step 1: Extract ALL required keywords, skills, and qualifications from the Job Description
Step 2: Count how many are present in the Resume
Step 3: Calculate exact match percentages for each weighted category:
   - Required Keywords Match (40% weight)
   - Skills Alignment (30% weight)
   - Experience Level Match (20% weight)
   - Formatting Quality (10% weight)
Step 4: Show your calculation in the Score Breakdown table
Step 5: Provide the Overall Match Score as a weighted average
Step 6: List EXACTLY which phrases and keywords to add to improve the score

Be mathematically precise. Show your work."`;

  const result = await model.generateContent(prompt);
  const response = result.response;
  return response.text();
}
