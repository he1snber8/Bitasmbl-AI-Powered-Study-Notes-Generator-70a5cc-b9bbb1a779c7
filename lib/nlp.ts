export function summarizeText(text: string): string {
  const sentences = text.split(/(?<=[.!?])\s+/).filter(Boolean);
  const limit = Math.min(5, sentences.length);
  return sentences.slice(0, limit).join(' ');
}

export function extractKeywords(text: string): string[] {
  const words = text.toLowerCase().match(/[a-z]{4,}/g) || [];
  const freq: Record<string, number> = {};
  words.forEach(w => { freq[w] = (freq[w] || 0) + 1; });
  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([w]) => w);
}