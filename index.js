import OpenAI from "openai";
import TelegramBot from 'node-telegram-bot-api';
import dotenv from "dotenv";
import express from "express";

dotenv.config();

// In-memory store for user sessions
const userSessions = {};

// OpenAI configuration
const openai = new OpenAI.OpenAI({
  project: "proj_JWVPjsDeGT3qO7WPSXtipv7U",
  apiKey: process.env.OPENAI_API_KEY,
});

// Telegram bot configuration
const token = process.env.RinceOpenAIBot;
const bot = new TelegramBot(token, { polling: true });

// Express setup
const app = express();
const PORT = process.env.PORT || 3000;

// Express root route
app.get("/", (req, res) => {
  res.send("Telegram Bot is running!");
});

// Telegram bot message handling
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;

  // Initialize conversation history if it doesn't exist
  if (!userSessions[chatId]) {
    userSessions[chatId] = [];
  }

  // Add the user's message to the conversation history
  userSessions[chatId].push({ role: 'user', content: msg.text });

  // Generate response using OpenAI
  const openCall = await openAICall(chatId, msg.text);

  // Send the response back to the user
  bot.sendMessage(chatId, openCall);
});

// OpenAI API call function
async function openAICall(chatId, text) {
  if (text === "/start") {
    return "Welcome to Chatbot powered by OPENAI, Ask anything you want...";
  }

  try {
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: userSessions[chatId],
    });

    // Add the bot's message to the conversation history
    userSessions[chatId].push({
      role: 'assistant',
      content: chatCompletion.choices[0].message.content,
    });

    return chatCompletion.choices[0].message.content;
  } catch (error) {
    console.error(error);
    return "There was an error processing your request. Please try again later.";
  }
}

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
