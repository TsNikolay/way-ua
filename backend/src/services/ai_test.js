import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const response = await client.chat.completions.create({
  model: "gpt-4o",
  messages: [
    {
      role: "user",
      content:
        "Generate Travel Plan for Location : Las Vegas, for 3 Days for Couple with a Cheap budget , Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location for 3 days with each day plan with best time to visit in JSON format. Respond only with valid JSON (no markdown code blocks, no comments, no text)",
    },
  ],
});

const rawContent = response.choices[0].message.content;

const cleaned = rawContent.replace(/^```json\s*/, "").replace(/```$/, "");

try {
  const data = JSON.parse(cleaned);
  console.log(data);
} catch (err) {
  console.error("Помилки при розборі JSON:", err.message);
  console.log("Сирі дані GPT:", rawContent);
}
