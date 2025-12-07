import { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [notes, setNotes] = useState('');

  const handleGenerate = async () => {
    const res = await fetch('/api/generateNotes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: input })
    });
    const data = await res.json();
    setNotes(data.notes || '');
  };

  return (
    <main className="min-h-screen flex flex-col md:flex-row p-4 gap-4">
      <section className="flex-1 flex flex-col">
        <h1 className="text-2xl font-bold mb-2">AI Study Notes Generator</h1>
        <textarea
          className="border rounded p-2 flex-1"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Paste lecture, article, or textbook text here"
        />
        <button
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
          onClick={handleGenerate}
        >
          Generate Notes
        </button>
      </section>
      <section className="flex-1 border rounded p-2">
        <h2 className="text-xl font-semibold mb-2">Generated Notes</h2>
        <pre className="whitespace-pre-wrap text-sm">{notes}</pre>
      </section>
    </main>
  );
}