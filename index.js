import OpenAI from "openai";

import TelegramBot from 'node-telegram-bot-api'

import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI.OpenAI({
  project: "proj_JWVPjsDeGT3qO7WPSXtipv7U",
  apiKey: process.env.OPENAI_API_KEY,
});

//telegram token
const token = process.env.RinceOpenAIBot;
const bot = new TelegramBot(token, {polling: true});

bot.on('message', async(msg) => {
  const chatId = msg.chat.id;
  let openCall = await openAICall(msg.text)
  bot.sendMessage(chatId, openCall);
});


async function openAICall(text) {
  if(text === "/start") {
    return "Welcome to Chatbot powered by OPENAI, Ask anything you want..."
  }
  try {
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: text }],
    });
    return chatCompletion.choices[0].message.content
  } catch (error) {
    console.log(error);
    return error.message
  }
}

