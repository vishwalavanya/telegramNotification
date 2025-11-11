// 📁 filename: server.js
// ✅ Independent Telegram Notification Server

import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// 🟢 Telegram Bot Config
const TELEGRAM_BOT_TOKEN = "8250275700:AAEEb_jHPtRtykuvrlwxgYJjjGFogKSW8hk";
const TELEGRAM_CHAT_ID = "1449074180"; // Vishwa's chat ID

// 🟢 POST Endpoint to send notification
app.post("/send", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || message.trim() === "") {
      return res.status(400).json({ error: "Message text is required" });
    }

    // ✅ Send Telegram message
    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message, // Only message text
        }),
      }
    );

    if (!response.ok) {
      const err = await response.text();
      console.error("❌ Telegram API Error:", err);
      return res.status(500).json({ error: "Failed to send notification" });
    }

    console.log("✅ Telegram notification sent:", message);
    res.json({ success: true, message: "Notification sent successfully" });
  } catch (error) {
    console.error("🚨 Server Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 🟢 Basic health check route
app.get("/", (req, res) => {
  res.send("✅ Telegram Notification Server is running...");
});

// 🟢 Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Telegram Notification Server running on port ${PORT}`);
});
