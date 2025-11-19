import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = process.env.DEEPSEEK_API_KEY;

app.get("/", (req, res) => {
  res.send("DeepSeek AI Server ✔️ Running");
});

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const response = await axios.post(
      "https://api.deepseek.com/chat/completions",
      {
        model: "deepseek-chat",
        messages: [{ role: "user", content: message }]
      },
      {
        headers: {
          "Authorization": `Bearer ${API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    res.json({ reply: response.data.choices[0].message.content });
  } catch (error) {
    console.error("ERR:", error.response?.data || error.message);
    res.status(500).json({
      error: "API request failed",
      details: error.response?.data || error.message
    });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server Running on Render/Local");
});