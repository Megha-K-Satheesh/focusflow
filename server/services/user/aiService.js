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
