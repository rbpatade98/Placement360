const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

export async function generateInterviewQuestions(prompt: string) {
  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
          "HTTP-Referer": "http://localhost:5173",
          "X-Title": "Placement360",
        },
        body: JSON.stringify({
          model: "openai/gpt-4o-mini",
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      throw new Error(await response.text());
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("AI ERROR:", error);
    throw error;
  }
}