# AI Power Virtual Assistant (Pro Edition)

A full-stack AI assistant powered by OpenAI GPT-4 or Gemini Pro with voice input/output.

## Features
- Text & voice input
- Text-to-speech output
- GPT-4 / Gemini switch
- Vercel-ready deployment

## Setup

1. Clone this repo
2. Create `.env.local` in root:
```
OPENAI_API_KEY=your-openai-api-key-here
GEMINI_API_KEY=your-gemini-api-key-here
```
3. Install & run:
```
npm install
npm run dev
```

## Deploy on Vercel
- Import to [https://vercel.com/import/git](https://vercel.com/import/git)
- Add the 2 env variables above in settings
- Click Deploy

## Domain Setup
To use your custom domain (e.g. `yourbot.ai`):
1. Buy your domain from Namecheap, GoDaddy etc.
2. Add domain in your Vercel project dashboard > Settings > Domains
3. Follow DNS instructions provided by Vercel
4. Done!
