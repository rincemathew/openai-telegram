import OpenAI from "openai";

import dotenv from 'dotenv';
dotenv.config()


const openai = new OpenAI.OpenAI({project: 'proj_JWVPjsDeGT3qO7WPSXtipv7U',
apiKey:process.env.OPENAI_API_KEY})


async function main() {
    const chatCompletion = await openai.chat.completions.create({
        model:'gpt-3.5-turbo',
        messages: [
            { role:'user', content:'wHAT IS THE CAPITAL OF INDIA?'},
        ],
    });
    console.log(chatCompletion.data.choices[0].message.content)
}

main();