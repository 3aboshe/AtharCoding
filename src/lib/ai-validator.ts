/**
 * Google Gemini API Integration for Code Validation
 */

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
const MODEL = 'gemini-2.5-flash'; // Latest fast model

export interface ValidationResult {
  isCorrect: boolean;
  feedback: string;
  feedbackAr: string;
  suggestions?: string[];
  suggestionsAr?: string[];
  confidence: number;
}

/**
 * Validate code solution using Gemini API
 */
export async function validateSolutionWithAI(params: {
  code: string;
  taskDescription: string;
  taskDescriptionAr: string;
  expectedOutput?: string;
  starterCode?: string;
}): Promise<ValidationResult> {
  const { code, taskDescription, taskDescriptionAr, expectedOutput, starterCode } = params;

  const systemPrompt = `You are a fair and encouraging Python code evaluator. Your job is to determine if a student's solution correctly solves the given problem.

EVALUATION GUIDELINES:
1. Be FLEXIBLE with output format - focus on whether the solution works conceptually
2. Accept any correct solution that:
   - Runs without syntax or runtime errors
   - Implements the correct logic/approach
   - Uses appropriate Python syntax
   - Actually solves the problem (even if output formatting differs slightly)

3. A solution is CORRECT if it:
   - Code runs without errors
   - The logic is correct for the problem
   - The approach is sound
   - Minor formatting differences are OK (spaces, slight variations in output)

4. Only mark as INCORRECT if:
   - Code has syntax/runtime errors
   - The logic is fundamentally wrong
   - The solution doesn't address the problem at all
   - Critical functionality is missing

5. Be ENCOURAGING - acknowledge correct approaches even if output differs slightly

Respond ONLY in JSON format with this exact structure:
{
  "isCorrect": boolean (true if the solution is functionally correct),
  "feedback": "English feedback - be encouraging and constructive",
  "feedbackAr": "Arabic translation of the feedback",
  "suggestions": ["improvement suggestions in English (if needed)"],
  "suggestionsAr": ["improvement suggestions in Arabic (if needed)"],
  "confidence": number between 0 and 1
}

IMPORTANT: Focus on correctness of logic and approach, not exact string matching. If the code works and solves the problem, mark it as correct!`;

  const userPrompt = `Problem Statement: ${taskDescription}

${expectedOutput ? `Reference Output Example: ${expectedOutput} (Note: student's output may vary slightly in format)` : ''}

${starterCode ? `Starter Code Provided:\n\`\`\`python\n${starterCode}\n\`\`\`` : ''}

Student's Solution:
\`\`\`python
${code}
\`\`\`

Evaluate this solution. Does it correctly solve the problem? Focus on logic and approach, not exact string matching.

Remember: Respond ONLY with a valid JSON object. No additional text.`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: systemPrompt + '\n\n' + userPrompt }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.2,
            maxOutputTokens: 1500,
            responseMimeType: 'application/json',
          },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Gemini API Error:', errorData);
      throw new Error(`API request failed: ${response.status} ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    console.log('Gemini API Response:', data);

    const content = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!content) {
      throw new Error('No content in API response');
    }

    // Parse JSON response
    const result = JSON.parse(content);
    console.log('Parsed Result:', result);

    // Be lenient - if AI says it's correct with reasonable confidence, accept it
    const isActuallyCorrect = result.isCorrect === true && result.confidence > 0.5;

    return {
      isCorrect: isActuallyCorrect,
      feedback: result.feedback || 'Unable to evaluate',
      feedbackAr: result.feedbackAr || 'غير قادر على التقييم',
      suggestions: result.suggestions || [],
      suggestionsAr: result.suggestionsAr || [],
      confidence: result.confidence || 0.5,
    };
  } catch (error: any) {
    console.error('AI Validation Error:', error);

    // Fallback to basic validation
    return fallbackValidation(code, expectedOutput);
  }
}

/**
 * Fallback validation when AI fails
 */
function fallbackValidation(code: string, expectedOutput?: string): ValidationResult {
  // Basic syntax check
  if (!code.trim()) {
    return {
      isCorrect: false,
      feedback: 'Please write some code before submitting.',
      feedbackAr: 'الرجاء كتابة بعض الكود قبل التقديم',
      confidence: 1,
    };
  }

  // Check for common Python syntax errors
  const commonErrors = [
    { pattern: /print\s+[^(]/, msg: 'print() requires parentheses', msgAr: 'print() يتطلب أقواس' },
    { pattern: /def\s+\w+\s*\([^)]*:\s*$/, msg: 'Function body is empty', msgAr: 'جسم الدالة فارغ' },
    { pattern: /if\s+.*:\s*$/, msg: 'If statement body is empty', msgAr: 'جملة if فارغة' },
    { pattern: /for\s+.*:\s*$/, msg: 'For loop body is empty', msgAr: 'حلقة for فارغة' },
  ];

  for (const error of commonErrors) {
    if (error.pattern.test(code)) {
      return {
        isCorrect: false,
        feedback: `Syntax issue: ${error.msg}`,
        feedbackAr: `مشكلة في بناء الجملة: ${error.msgAr}`,
        confidence: 0.9,
      };
    }
  }

  // If code passes basic checks but AI is unavailable, mark as incorrect to encourage testing
  return {
    isCorrect: false,
    feedback: 'AI validation unavailable. Please run your code to verify it works correctly.',
    feedbackAr: 'التحقق بالذكاء الاصطناعي غير متوفر. يرجى تشغيل الكود للتحقق من عمله بشكل صحيح.',
    confidence: 0.5,
  };
}

/**
 * Get hint for a task using AI
 */
export async function getHintFromAI(params: {
  taskDescription: string;
  taskDescriptionAr: string;
  currentCode?: string;
}): Promise<{ hint: string; hintAr: string }> {
  const { taskDescription, taskDescriptionAr, currentCode } = params;

  const prompt = currentCode
    ? `Task: ${taskDescription}\n\nCurrent Code:\n\`\`\`python\n${currentCode}\n\`\`\`\n\nProvide a helpful hint to guide the student without giving away the full solution.`
    : `Task: ${taskDescription}\n\nProvide a helpful starting hint for this problem.`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: `You are a helpful programming tutor. Provide brief, helpful hints in both English and Arabic. Respond in JSON: {"hint": "English hint", "hintAr": "Arabic hint"}\n\n${prompt}` }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 300,
            responseMimeType: 'application/json',
          },
        }),
      }
    );

    const data = await response.json();
    const content = data.candidates?.[0]?.content?.parts?.[0]?.text;
    const result = JSON.parse(content || '{}');

    return {
      hint: result.hint || 'Think about the problem step by step.',
      hintAr: result.hintAr || 'فكر في المشكلة خطوة بخطوة.',
    };
  } catch {
    return {
      hint: 'Break down the problem into smaller steps.',
      hintAr: 'قسّم المشكلة إلى خطوات أصغر.',
    };
  }
}
