const API_KEY = import.meta.env.VITE_GROQ_API_KEY;

const BASE_URL = "https://api.groq.com/openai/v1";

const MODEL =
  import.meta.env.VITE_AI_MODEL ||
  "llama-3.3-70b-versatile";

async function sendMessage(prompt: string) {
  console.log(
    "AI Key loaded:",
    API_KEY
      ? `${API_KEY.substring(0, 8)}...`
      : "MISSING"
  );

  const response = await fetch(
    `${BASE_URL}/chat/completions`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 4096,
      }),
    }
  );

  if (!response.ok) {
    const errorBody = await response.text();

    console.error(errorBody);

    throw new Error(
      `AI API Error (${response.status}): ${errorBody}`
    );
  }

  const data = await response.json();

  return {
    response: {
      text: () =>
        data.choices?.[0]?.message?.content || "",
    },
  };
}

export const chatSession = { sendMessage };