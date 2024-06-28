import OpenAI from "openai";

import TelegramBot from 'node-telegram-bot-api'

import dotenv from "dotenv";
dotenv.config();

//in-memory store for user session
const userSessions = {};

//open api token
const openai = new OpenAI.OpenAI({
  project: "proj_JWVPjsDeGT3qO7WPSXtipv7U",
  apiKey: process.env.OPENAI_API_KEY,
});

//telegram token
const token = process.env.RinceOpenAIBot;
const bot = new TelegramBot(token, {polling: true});


//telegram bot polling
bot.on('message', async(msg) => {
  const chatId = msg.chat.id;
  // Initialize conversation history if it doesn't exist
  if (!userSessions[msg.chat.id]) {
    userSessions[msg.chat.id] = [];
  }
  // Add the user's message to the conversation history
  userSessions[msg.chat.id].push({ role: 'user', content: msg.text });
  let openCall = await openAICall(msg.chat.id, msg.text)
  bot.sendMessage(chatId, openCall);
});


async function openAICall(iddd, text) {
  if(text === "/start") {
    return "Welcome to Chatbot powered by OPENAI, Ask anything you want..."
  }
  try {
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: userSessions[iddd],
    });
    // Add the bot's message to the conversation histor
    userSessions[iddd].push({ role: 'assistant', content: chatCompletion.choices[0].message.content });
    return chatCompletion.choices[0].message.content
  } catch (error) {
    console.log(error);
    return error.message
  }
}

