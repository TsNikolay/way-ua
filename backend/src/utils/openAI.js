import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const OpenAIAPI = {
  async generatePlan(dataForPlan) {
    try {
      const { city, dates, duration, hotel, attractions, weather } =
        dataForPlan;
      // Формуємо рядок опису пам'яток
      const attractionsText = JSON.stringify(
        attractions.map((place) => ({
          place_name: place.name,
          address: place.address,
          photo_reference: place.photo_reference || "",
          google_place_id: place.place_id || "",
          rating: place.rating || "",
        })),
        null,
        2,
      );

      // Формуємо рядок з прогнозом погоди

      const weatherText = weather
        .map(
          (w, i) =>
            `- Day ${i + 1}: ${w.weather[0].main} (${
              w.weather[0].description
            }), Temperature: ${w.temp.day}°C`,
        )
        .join("\n");

      // Текст запиту
      const promptText = `
You are a travel planning assistant. Based on the provided data, generate a detailed travel itinerary. The trip takes place in the city of ${city}, from ${dates[0]} to ${dates[1]}, for a total of ${duration} days.

The user has selected the following hotel:
- Name: ${hotel.name}
- Address: ${hotel.address}

The user wants to visit the following attractions (provided as a structured JSON list): ${attractionsText}  

Here is the weather forecast for each day:
${weatherText}

Your task:

Create a JSON array under the key "days" where each object contains:
- "day_number" (1, 2, ...)
- "activities": an array of objects with:
- "place_name"
- "address"
- "photo_reference" (use the reference provided in the attractions data, or leave as "" if missing)
- "time_slot" (morning / afternoon / evening)
- "notes" (contextual suggestions, e.g., "Due to rain, indoor activities are recommended")
- "google_place_id" (use the reference provided or leave as "" if missing)
- "rating" (from the provided attractions data)

STRICT RULES:
- Build plan for every day. Do not skip any.
- Use every provided attraction. Do not skip any.
- Assign each attraction to exactly one day. No duplicates allowed.
- If there are more days than attractions, only then fill in extra days with generic suggestions like "Free day for rest" or "Explore local cafes".
- When providing generic suggestions, always use approximate addresses and locations that are relevant to the destination city: ${city}. Do not use addresses or locations from other cities.
- Ensure every day has at least 2 activities. Combine attractions and generic suggestions if needed.
- Match activities to the weather (indoor on rainy days, outdoor on sunny days).
- Every 2-3 days, include an evening activity.
- Double-check before responding: make sure there are no missing or duplicated attractions.
- Provide notes with recommendation for every attractions or use "" if there is no recommendations.
- Always provide time slot, use one of these options : morning/afternoon/evening
- Always provide google_place_id, or use "" if there is no one.

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
          "photo_reference": "AXQCQNQ4nvqmcG2dflZbw...",
          "notes": "Sunny day, good for outdoor visit",
          "google_place_id": "ChIJzeiLW1DO1EAR3WGrIbDpvW8"
          "rating": 4.5
        }
      ]
    }
  ]
}`;

      // Отправка запроса в OpenAI API
      const response = await client.chat.completions.create({
        model: "gpt-4.1-nano", //Краща модель - "gpt-4.1"
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
