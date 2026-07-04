import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { GoogleGenAI } from '@google/genai';

const app = express();
app.use(cors());
app.use(express.json());

// Ephemeral reviews storage for serverless environments (will reset when function goes cold/redeploys)
const REVIEWS_FILE = path.join('/tmp', 'reviews.json');
const INITIAL_REVIEWS_FILE = path.join(process.cwd(), 'data', 'reviews.json');

function getReviews() {
  try {
    if (fs.existsSync(REVIEWS_FILE)) {
      const data = fs.readFileSync(REVIEWS_FILE, 'utf-8');
      return JSON.parse(data);
    }
    if (fs.existsSync(INITIAL_REVIEWS_FILE)) {
      const data = fs.readFileSync(INITIAL_REVIEWS_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error reading reviews:', error);
  }
  return [];
}

// API Routes
app.get('/api/reviews', (req, res) => {
  try {
    const reviews = getReviews();
    res.json({ ok: true, reviews: reviews.reverse() });
  } catch (error) {
    res.status(500).json({ ok: false, error: 'Database error' });
  }
});

app.post('/api/reviews', (req, res) => {
  try {
    const { name, rating, comment, lang } = req.body;
    const reviews = getReviews();
    
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
    
    try {
      // In serverless, writing to /tmp is writable but ephemeral
      fs.writeFileSync(REVIEWS_FILE, JSON.stringify(reviews, null, 2));
    } catch (writeErr) {
      console.warn("Could not write to ephemeral storage:", writeErr);
    }
    
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

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
    
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: message,
    });
    
    res.json({ reply: response.text });
  } catch (error) {
    console.error('Gemini Error:', error);
    res.status(500).json({ error: 'AI Error', details: String(error) });
  }
});

export default app;
