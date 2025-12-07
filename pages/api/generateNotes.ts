import type { NextApiRequest, NextApiResponse } from 'next';
import { summarizeText, extractKeywords } from '../../lib/nlp';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  const { text } = req.body as { text?: string };
  if (!text) return res.status(400).json({ error: 'Missing text' });

  const summary = summarizeText(text);
  const keywords = extractKeywords(text);

  const highlighted = keywords.reduce(
    (acc, k) => acc.replace(new RegExp(`\\b${k}\\b`, 'gi'), m => `**${m}**`),
    summary
  );

  res.status(200).json({ notes: highlighted, keywords });
}