import {
  restaurants,
  categories,
  reviews,
  events,
  menuItems,
} from "@/lib/mockData";

const API_KEY = process.env.GAPGPT_API_KEY;
const API_URL = "https://api.gapgpt.app/v1/chat/completions";

export async function POST(req) {
  try {
    const { question } = await req.json();

    if (!question?.trim()) {
      return Response.json({ error: "Missing question" }, { status: 400 });
    }

    if (!API_KEY) {
      return Response.json(
        { error: "GAPGPT_API_KEY is not configured" },
        { status: 500 }
      );
    }

    const context = JSON.stringify({
      restaurants,
      categories,
      reviews,
      events,
      menuItems,
    });

    const systemPrompt = `You are a helpful assistant answering this data:

${context}

Answer in this data:

${context}

Answer in the same language as the question. Be concise. If the data doesn't contain the answer, say so.`;

    let response;
    let data;

    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-5.6-sol",
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: question },
            ],
            temperature: 0.2,
          }),
        });

        data = await response.json();
        break;
      } catch (error) {
        console.error(`Attempt ${attempt} failed:`, error);

        if (attempt === 3) {
          return Response.json(
            {
              error:
                "Could not reach the AI service after 3 attempts. Check the API URL, network access, and key.",
            },
            { status: 503 }
          );
        }

        await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
      }
    }

    if (!response.ok) {
      return Response.json(
        {
          error: data?.error?.message || "GapGPT API error",
          details: data,
        },
        { status: response.status || 500 }
      );
    }

    const answer =
      data?.choices?.[0]?.message?.content?.trim() ||
      "Sorry, I couldn't generate an answer.";

    return Response.json({ answer });
  } catch (error) {
    console.error("Route error:", error);
    return Response.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}