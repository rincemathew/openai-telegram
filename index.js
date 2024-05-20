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

bot.onText(/\/echo (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1];
  bot.sendMessage(chatId, resp);
});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, 'Received your message');
});


async function main() {
  try {
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: "wHAT IS THE CAPITAL OF INDIA?" }],
    });
    console.log(chatCompletion.choices[0].message.content);
  } catch (error) {
    console.log(error);
  }
}

main();
