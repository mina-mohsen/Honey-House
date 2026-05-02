import express from 'express';
import cors from 'cors';
import { createServer as createViteServer } from 'vite';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenerativeAI } from '@google/generative-ai';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REVIEWS_FILE = path.join(__dirname, 'data', 'reviews.json');

async function startServer() {
  const app = express();
  app.use(cors());
  app.use(express.json());

  // API Routes
  app.get('/api/reviews', (req, res) => {
    try {
      const data = fs.readFileSync(REVIEWS_FILE, 'utf-8');
      const reviews = JSON.parse(data);
      res.json({ ok: true, reviews: reviews.reverse() });
    } catch (error) {
      res.status(500).json({ ok: false, error: 'Database error' });
    }
  });

  app.post('/api/reviews', (req, res) => {
    try {
      const { name, rating, comment, lang } = req.body;
      const data = fs.readFileSync(REVIEWS_FILE, 'utf-8');
      const reviews = JSON.parse(data);
      
      const newReview = {
        id: `rev_${Date.now()}`,
        name,
        rating: Number(rating),
        comment,
        lang: lang || 'ar',
        createdAt: new Date().toISOString(),
        approved: true
      };

      reviews.push(newReview);
      fs.writeFileSync(REVIEWS_FILE, JSON.stringify(reviews, null, 2));
      res.json({ ok: true, review: newReview });
    } catch (error) {
      res.status(500).json({ ok: false, error: 'Failed to save review' });
    }
  });

  app.post('/api/gemini', async (req, res) => {
    try {
      const { message } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: 'GEMINI_API_KEY is not configured' });
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      
      const result = await model.generateContent(message);
      const response = await result.response;
      const text = response.text();
      
      res.json({ reply: text });
    } catch (error) {
      console.error('Gemini Error:', error);
      res.status(500).json({ error: 'AI Error', details: String(error) });
    }
  });

  // Vite Middleware
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);

  const port = 3000;
  app.listen(port, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

startServer();
