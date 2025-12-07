import { useRef } from 'react';

interface Props {
  value: string;
  onChange(v: string): void;
}

export function NotesEditor({ value, onChange }: Props) {
  const ref = useRef<HTMLTextAreaElement | null>(null);

  const exportTxt = () => {
    const blob = new Blob([value], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'study-notes.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportPdf = () => {
    window.print();
  };

  return (
    <div className="flex flex-col h-full">
      <textarea
        ref={ref}
        className="border rounded p-2 flex-1 mb-2"
        value={value}
        onChange={e => onChange(e.target.value)}
      />
      <div className="flex gap-2">
        <button onClick={exportTxt} className="px-3 py-1 bg-gray-700 text-white rounded">TXT</button>
        <button onClick={exportPdf} className="px-3 py-1 bg-gray-700 text-white rounded">PDF</button>
      </div>
    </div>
  );
}