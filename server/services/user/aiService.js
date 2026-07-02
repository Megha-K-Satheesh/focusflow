import axios from "axios";

export const generateRoadmapFromAI = async (data) => {
const prompt = `
You are an expert teacher.

Create a ${data.duration}-day study plan.

Goal: ${data.goal}
Level: ${data.level}
Daily Study Hours: ${data.dailyHours || "Not specified"}
Target Outcome: ${data.targetOutcome || "Not specified"}
Current Knowledge: ${data.currentKnowledge || "Not specified"}
Weak Areas: ${data.weakAreas || "Not specified"}
Additional Notes: ${data.notes || "Not specified"}

The plan should:
- Match the user's level.
- Use the user's current knowledge as the starting point.
- Focus heavily on weak areas.
- Help achieve the target outcome.
- Fit within the daily study hours.
- Be practical and progressive.
- Include daily problem-solving exercises.
- Include logic-building exercises when relevant.
- Allocate extra practice time to weak areas.
- Avoid topics that are too advanced for the user's level.
- End with revision and interview preparation if the target outcome is interview preparation.

IMPORTANT:
- This plan must be personalized using ALL user inputs.
- If weak areas are provided, spend at least 30% of the plan on those areas.
- If dailyHours is provided, ensure the tasks approximately match that study time.
- If notes contain special requests, incorporate them throughout the plan.
- Do not generate a generic roadmap.

Return ONLY raw JSON.
No markdown.
No backticks.
No explanation.

Format:
{
  "title": "",
  "days": [
    {
      "dayNumber": 1,
      "topic": "",
      "tasks": [
        {
          "title": "",
          "description": ""
        }
      ]
    }
  ]
}
`;

  const response = await axios.post(
    `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash-lite:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }]
        }
      ]
    },
    {
      headers: { "Content-Type": "application/json" }
    }
  );

  const content = response.data.candidates[0].content.parts[0].text;

  const cleanContent = content
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(cleanContent);
};


export const generateInterviewFromAI = async (data) => {
  const prompt = `
You are an expert technical interviewer.

Generate a mock interview.

Interview Type: ${data.interviewType}

Role: ${data.role || "Current Study Plan"}

Level: ${data.level}

Mode: ${data.mode}

Question Count: ${data.questionCount}

Topics:
${data.topics?.join("\n") || "Generate based on role"}

Rules:
- Questions should match the difficulty level.
- Include practical interview questions.
- Include coding questions if mode is coding or mixed.
- Include behavioral questions when appropriate.
- Questions must be realistic interview questions.
- Avoid duplicate questions.
- Return ONLY raw JSON.
- No markdown.
- No backticks.
- No explanation.
-IMPORTANT:

The "type" field MUST be exactly one of:

- theory
- coding


Do NOT use any other value.
Do NOT use:
- problem_solving
- technical
- aptitude
- mcq
- practical
- scenario

Only use theory, coding.
- Generate a short interview title.
- The title must be 2–3 words only.
- Do not use "Mock Interview" as the title.
- The title should match the role or interview topics.
- The "role" field should contain only the role or primary topic.
Format:

{
"title": "Array Basics",
  "role": "Array",
  "questions": [
    {
      "questionId": "q1",
      "topic": "JavaScript",
      "type": "theory",
      "difficulty": "Intermediate",
      "question": "What is a closure in JavaScript?"
    }
  ]
}
`;

  const response = await axios.post(
    `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash-lite:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      contents: [
        {
          role: "user",
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const content =
    response.data.candidates[0].content.parts[0].text;

  const cleanContent = content
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(cleanContent);
};

export const generateTranscriptFromAI = async (
  file
) => {
  const base64Audio =
    file.buffer.toString("base64");

  const response = await axios.post(
    `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      contents: [
        {
          role: "user",
          parts: [
            {
              inlineData: {
                mimeType: file.mimetype,
                data: base64Audio,
              },
            },
            {
              text: `
Convert this audio recording into text.

Rules:
- Return only the spoken text.
- No explanations.
- No markdown.
- No formatting.
- Preserve the original wording.
              `,
            },
          ],
        },
      ],
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data.candidates[0]
    .content.parts[0].text;
};

export const evaluateSingleAnswerWithAI = async (data) => {
  const prompt = `
You are a strict technical interviewer.
Your job is to deeply evaluate a candidate's answer like in a real interview.
Evaluate this answer.

Question:
${data.question}

Type: ${data.type}

Answer:
${data.answer || ""}

Code:
${data.code || ""}

Language:
${data.language || ""}

Return ONLY raw JSON.

Format:
{
  "score": 0,
  "feedback": "",
  "strengths": [],
  "improvements": [],
  "explanation": ""
}

EVALUATION RULES:

1. Be extremely strict but fair.
2. If answer is empty or irrelevant → score must be 0-2.
3. If partially correct → 3-6.
4. If correct but not explained well → 6-8.
5. Only perfect answers → 9-10.

---

FOR THEORY QUESTIONS:
Evaluate:
- conceptual understanding
- correctness
- clarity
- completeness
- missing key points

FOR CODING QUESTIONS:
Evaluate:
- correctness of logic
- edge cases handling
- time & space complexity awareness
- code structure
- real-world usability

---

IMPORTANT:
- If answer is weak, DO NOT fabricate strengths.
- strengths must reflect REAL GOOD POINTS only.
- improvements must be specific and actionable.

---

OUTPUT FORMAT (STRICT JSON ONLY):

{
  "score": number,
  "feedback": "2-5 lines human readable interview feedback",
  "strengths": ["specific strength 1", "specific strength 2"],
  "improvements": ["specific improvement 1", "specific improvement 2"],
  "explanation": "detailed technical breakdown of why this score was given"
}

---

STYLE:
- Be professional interviewer
- No marketing tone
- No fluff
- Be direct like real interview feedback
`;
  
  const response = await axios.post(`https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, {
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }]
      }
    ]
  });

  const content = response.data.candidates[0].content.parts[0].text;

  const clean = content.replace(/```json/g, "").replace(/```/g, "").trim();

  return JSON.parse(clean);
};


