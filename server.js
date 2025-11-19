import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
app.use(cors());
app.use(express.json());

// 🔥 دریافت کلید از متغیر محیطی
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// 🔥 روت اصلی تست سرور
app.get("/", (req, res) => {
  res.send("AI Server is Running ✔️");
});

// 🔥 روت گفتگو
app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: message,
    });

    res.json({ reply: response.output_text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// پورت سرور
app.listen(process.env.PORT || 3000, () => {
  console.log("Server running...");
});