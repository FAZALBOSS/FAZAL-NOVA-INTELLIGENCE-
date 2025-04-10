'use client'
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Mic, Send } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AIVirtualAssistant() {
  const [messages, setMessages] = useState([{ from: 'assistant', text: 'Hi! I am your AI assistant. How can I help you today?' }]);
  const [input, setInput] = useState('');
  const [engine, setEngine] = useState('gpt-4');
  const [listening, setListening] = useState(false);

  const speak = (text) => {
    const synth = window.speechSynthesis;
    const utter = new SpeechSynthesisUtterance(text);
    synth.speak(utter);
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = { from: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    try {
      const res = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input, engine })
      });
      const data = await res.json();
      const reply = data.reply;
      setMessages(prev => [...prev, { from: 'assistant', text: reply }]);
      speak(reply);
    } catch (err) {
      setMessages(prev => [...prev, { from: 'assistant', text: 'Something went wrong.' }]);
    }
  };

  const startListening = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.start();
    setListening(true);
    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      setInput(transcript);
      setListening(false);
    };
    recognition.onerror = () => setListening(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-4">
      <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-center mb-6">
        AI Power Virtual Assistant
      </motion.h1>

      <div className="flex justify-center mb-4">
        <select value={engine} onChange={(e) => setEngine(e.target.value)} className="bg-gray-700 p-2 rounded">
          <option value="gpt-4">OpenAI GPT-4</option>
          <option value="gemini">Gemini Pro</option>
        </select>
      </div>

      <div className="max-w-2xl mx-auto space-y-4">
        {messages.map((msg, idx) => (
          <Card key={idx} className={`bg-${msg.from === 'user' ? 'blue-700' : 'gray-700'} text-white`}>
            <CardContent className="p-4">
              <p><strong>{msg.from === 'user' ? 'You' : 'Assistant'}:</strong> {msg.text}</p>
            </CardContent>
          </Card>
        ))}

        <div className="flex items-center space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
            className="flex-grow bg-gray-700 text-white"
          />
          <Button onClick={handleSend} className="bg-blue-600 hover:bg-blue-500">
            <Send size={18} />
          </Button>
          <Button onClick={startListening} className={`bg-green-600 hover:bg-green-500 ${listening && 'animate-pulse'}`}>
            <Mic size={18} />
          </Button>
        </div>
      </div>
    </main>
  );
}
