"use client"

import { useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';

export default function Home() {
    const [idea, setIdea] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const evtRef = useRef<EventSource | null>(null);

    function generateIdea() {
        // Close any existing connection
        if (evtRef.current) {
            evtRef.current.close();
        }

        setIdea('');
        setLoading(true);

        const evt = new EventSource('/api');
        evtRef.current = evt;
        let buffer = '';

        evt.onmessage = (e) => {
            buffer += e.data;
            setIdea(buffer);
        };

        evt.onerror = () => {
            evt.close();
            setLoading(false);
        };
    }

    return (
        <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
            <div className="container mx-auto px-4 py-12">
                <header className="text-center mb-12">
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                        Business Idea Generator
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">
                        AI-powered innovation at your fingertips
                    </p>
                </header>

                <div className="max-w-3xl mx-auto flex flex-col items-center gap-8">
                    <button
                        onClick={generateIdea}
                        disabled={loading}
                        className="rounded-full bg-indigo-600 px-10 py-3 text-base font-semibold text-white transition-colors hover:bg-indigo-700 disabled:opacity-50"
                    >
                        {loading ? 'Generating...' : 'Generate Idea'}
                    </button>

                    {idea !== null && (
                        <div className="w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
                            {idea === '' ? (
                                <div className="flex items-center justify-center py-12">
                                    <div className="animate-pulse text-gray-400">Thinking...</div>
                                </div>
                            ) : (
                                <div className="prose prose-gray dark:prose-invert max-w-none">
                                    <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
                                        {idea}
                                    </ReactMarkdown>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
