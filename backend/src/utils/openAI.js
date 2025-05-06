import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const OpenAIAPI = {
  async generatePlan(dataForPlan) {
    try {
      const { city, dates, duration, hotel, attractions, weather } =
        dataForPlan;
      // Формуємо рядок опису пам'яток
      const attractionsText = attractions
        .map((place) => `- ${place.name} (${place.address})`)
        .join("\n");

      // Формуємо рядок з прогнозом погоди
      const weatherText = weather
        .map(
          (w, i) =>
            `- Day ${i + 1} (${w.date}): ${w.description}, Temperature: ${
              w.temperature
            }°C`,
        )
        .join("\n");

      // Текст запиту
      const promptText = `
You are a travel planning assistant. Based on the provided data, generate a detailed travel itinerary. The trip takes place in the city of ${city}, from ${dates[0]} to ${dates[1]}, for a total of ${duration} days.

The user has selected the following hotel:
- Name: ${hotel.name}
- Address: ${hotel.address}

The user wants to visit the following attractions:
${attractionsText}

Here is the weather forecast for each day:
${weatherText}

Create a JSON array under the key "days" where each object contains:
- "day_number" (1, 2, ...)
- "activities": an array of objects with:
  - "place_name"
  - "address"
  - "time_slot" (morning / afternoon / evening)
  - "notes" (contextual suggestions, e.g. "Due to rain, indoor activities are recommended")

Distribute the attractions across the days so that:
- Each attraction is visited once.
- Activities match the weather (e.g., indoor museums on rainy days).
- No day is empty. If there are more days than attractions, fill in the gaps with generic suggestions like “Free day for rest”, “Explore local cafes”, etc.

Respond ONLY with valid JSON like:
{
  "days": [
    {
      "day_number": 1,
      "activities": [
        {
          "place_name": "Example Place",
          "address": "Example St, Kyiv",
          "time_slot": "morning",
          "notes": "Sunny day, good for outdoor visit"
        }
      ]
    }
  ]
}`;

      // Отправка запроса в OpenAI API
      const response = await client.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "user",
            content: promptText,
          },
        ],
      });

      const rawContent = response.choices[0].message.content;

      const cleaned = rawContent.replace(/^```json\s*/, "").replace(/```$/, "");

      const data = JSON.parse(cleaned);
      // console.log(data);
      return data;
    } catch (err) {
      console.error("Помилки при розборі JSON:", err.message);
      console.log("Сирі дані GPT:", rawContent);
    }
  },
};

export default OpenAIAPI;
