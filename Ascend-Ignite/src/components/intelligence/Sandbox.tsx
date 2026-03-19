import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FlaskConical, ArrowRight } from 'lucide-react';
import type { SandboxConfig } from '../../types';
import { Button } from '../Button';
import { cn } from '../../utils/helpers';

interface SandboxProps {
    config: SandboxConfig;
    className?: string;
}

// --- Text Analysis Sandbox ---

interface Chunk {
    text: string;
    vector: number[];
    similarity: number;
}

function simulateChunking(text: string): Chunk[] {
    const sentences = text.split(/(?<=[.!?])\s+/).filter(Boolean);
    return sentences.map((s) => ({
        text: s.trim(),
        vector: [
            Math.round((Math.random() * 2 - 1) * 100) / 100,
            Math.round((Math.random() * 2 - 1) * 100) / 100,
            Math.round((Math.random() * 2 - 1) * 100) / 100,
        ],
        similarity: Math.round(Math.random() * 60 + 40) / 100,
    }));
}

const TextAnalysisSandbox = ({ config }: { config: SandboxConfig }) => {
    const [input, setInput] = useState(config.examples[0] ?? '');
    const [stage, setStage] = useState<'idle' | 'chunking' | 'embedding' | 'retrieval'>('idle');
    const [chunks, setChunks] = useState<Chunk[]>([]);

    const process = () => {
        if (!input.trim()) return;
        setStage('chunking');
        const result = simulateChunking(input);

        setTimeout(() => {
            setChunks(result);
            setStage('embedding');
        }, 700);

        setTimeout(() => {
            // Sort by similarity descending and mark most relevant
            const sorted = [...result].sort((a, b) => b.similarity - a.similarity);
            if (sorted.length > 0) sorted[0].similarity = 0.97;
            setChunks(sorted);
            setStage('retrieval');
        }, 1600);
    };

    const reset = () => {
        setStage('idle');
        setChunks([]);
    };

    return (
        <div className="space-y-4">
            <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={config.placeholder}
                rows={4}
                className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-mono text-sm leading-6 text-slate-700 outline-none transition-colors focus:border-primary/40 focus:bg-white"
            />
            <div className="flex gap-2">
                <Button
                    onClick={stage === 'idle' ? process : reset}
                    className="gap-2 bg-[#F7567C] hover:bg-[#e5456b] text-white"
                    size="sm"
                >
                    {stage === 'idle' ? (
                        <>Process Text <ArrowRight className="h-3.5 w-3.5" /></>
                    ) : (
                        'Reset'
                    )}
                </Button>
            </div>

            <AnimatePresence mode="wait">
                {stage !== 'idle' && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-3 overflow-hidden"
                    >
                        {/* Stage labels */}
                        <div className="flex gap-2">
                            {(['chunking', 'embedding', 'retrieval'] as const).map((s) => (
                                <span
                                    key={s}
                                    className={cn(
                                        'rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] transition-colors',
                                        stage === s
                                            ? 'bg-[#F7567C] text-white'
                                            : chunks.length > 0 && (['chunking', 'embedding', 'retrieval'].indexOf(s) <= ['chunking', 'embedding', 'retrieval'].indexOf(stage))
                                                ? 'bg-slate-200 text-slate-600'
                                                : 'bg-slate-100 text-slate-400',
                                    )}
                                >
                                    {s}
                                </span>
                            ))}
                        </div>

                        {/* Chunks */}
                        <div className="space-y-2">
                            {chunks.map((chunk, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -12 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.08 }}
                                    className={cn(
                                        'rounded-[14px] border bg-white/80 p-3 transition-all',
                                        stage === 'retrieval' && i === 0
                                            ? 'border-[#F7567C]/40 shadow-[0_4px_20px_rgba(247,86,124,0.1)]'
                                            : 'border-slate-100',
                                    )}
                                >
                                    <p className="text-sm text-slate-700">{chunk.text}</p>
                                    {stage !== 'chunking' && (
                                        <div className="mt-2 flex items-center gap-3">
                                            <code className="text-[11px] text-slate-400 font-mono">
                                                [{chunk.vector.join(', ')}]
                                            </code>
                                            {stage === 'retrieval' && (
                                                <span className={cn(
                                                    'ml-auto rounded-full px-2 py-0.5 text-[10px] font-bold',
                                                    i === 0 ? 'bg-[#F7567C]/10 text-[#F7567C]' : 'bg-slate-100 text-slate-400',
                                                )}>
                                                    {Math.round(chunk.similarity * 100)}% match
                                                </span>
                                            )}
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </div>

                        {stage === 'retrieval' && chunks.length > 0 && (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="text-xs leading-5 text-slate-500"
                            >
                                The highlighted chunk scored highest in similarity to the query.
                                In a real RAG system, this chunk would be passed as context to the language model.
                            </motion.p>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// --- Prompt Playground Sandbox ---

const vagueResponses: Record<string, string> = {
    resume: "Here's some general advice about resumes: make sure it's well-formatted, include your experience, and proofread it. Consider adding relevant skills. Good luck!",
    essay: "Climate change is a big problem affecting the world. Temperatures are rising and ice caps are melting. We should all do our part to help the environment and reduce our carbon footprint.",
    default: "That's an interesting topic. There are many perspectives to consider. I'd recommend doing some research and thinking about different angles. Let me know if you need more help!",
};

const specificResponses: Record<string, string> = {
    resume: "Here's your revised resume with tracked changes:\n\n1. QUANTIFIED: 'Led marketing campaign' changed to 'Led marketing campaign reaching 12,000 students, increasing event attendance by 34%'\n2. TAILORED: Added 'CI/CD pipelines, agile methodology, REST API design' to match the JD\n3. FORMAT: Standardized bullet points to action-verb-first structure\n\nKey improvement: Your 'Projects' section now mirrors the exact tech stack listed in the posting.",
    essay: "THE HIDDEN COST ON YOUR PLATE\n\nBy 2030, Midwest corn yields could drop 25% due to increased drought frequency (USDA, 2024). This isn't abstract climate science \u2014 it's the price of your dining hall meal.\n\nThe Midwest produces 75% of America's corn and soybeans. Rising temperatures are shifting growing seasons, and extreme weather events have doubled since 2000 (NOAA). For students budgeting $200/month on food, these supply chain disruptions hit hard.\n\nBut there's hope. Campus food co-ops at universities like Michigan and Wisconsin have cut food costs 30% while sourcing locally.\n\nThis week: sign up for your campus sustainability newsletter. One email. Five minutes. It's the smallest step toward the biggest problem of our generation.",
    default: "Based on your specific requirements, here's a structured analysis:\n\n1. CONTEXT: Addressed the exact scope you defined\n2. SPECIFICS: Included measurable data points and concrete examples\n3. FORMAT: Followed your requested output structure\n4. CONSTRAINTS: Stayed within the boundaries you set\n\nNotice how the specific constraints produced a focused, actionable result versus the generic response on the left.",
};

function getResponse(text: string, pool: Record<string, string>): string {
    const lower = text.toLowerCase();
    if (lower.includes('resume') || lower.includes('cv')) return pool.resume;
    if (lower.includes('essay') || lower.includes('climate') || lower.includes('write')) return pool.essay;
    return pool.default;
}

const PromptPlayground = ({ config }: { config: SandboxConfig }) => {
    const [vaguePrompt, setVaguePrompt] = useState(config.examples[0] ?? '');
    const [specificPrompt, setSpecificPrompt] = useState(config.examples[1] ?? '');
    const [showResults, setShowResults] = useState(false);

    const compare = () => setShowResults(true);
    const reset = () => setShowResults(false);

    return (
        <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Vague Prompt</label>
                    <textarea
                        value={vaguePrompt}
                        onChange={(e) => { setVaguePrompt(e.target.value); setShowResults(false); }}
                        rows={4}
                        className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-700 outline-none transition-colors focus:border-slate-300 focus:bg-white"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-[0.2em] text-[#F7567C]">Engineered Prompt</label>
                    <textarea
                        value={specificPrompt}
                        onChange={(e) => { setSpecificPrompt(e.target.value); setShowResults(false); }}
                        rows={4}
                        className="w-full resize-none rounded-xl border border-[#F7567C]/20 bg-[#F7567C]/[0.03] px-4 py-3 text-sm leading-6 text-slate-700 outline-none transition-colors focus:border-[#F7567C]/40 focus:bg-white"
                    />
                </div>
            </div>

            <Button
                onClick={showResults ? reset : compare}
                className="gap-2 bg-[#F7567C] hover:bg-[#e5456b] text-white"
                size="sm"
            >
                {showResults ? 'Reset' : 'Compare Results'}
                {!showResults && <ArrowRight className="h-3.5 w-3.5" />}
            </Button>

            <AnimatePresence>
                {showResults && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="grid gap-4 overflow-hidden md:grid-cols-2"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="rounded-[14px] border border-slate-100 bg-white/80 p-4"
                        >
                            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">AI Response (Vague)</p>
                            <p className="whitespace-pre-wrap text-sm leading-6 text-slate-500">{getResponse(vaguePrompt, vagueResponses)}</p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="rounded-[14px] border border-[#F7567C]/20 bg-[#F7567C]/[0.02] p-4"
                        >
                            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#F7567C]">AI Response (Engineered)</p>
                            <p className="whitespace-pre-wrap text-sm leading-6 text-slate-700">{getResponse(specificPrompt, specificResponses)}</p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// --- Main Sandbox ---

export const Sandbox = ({ config, className }: SandboxProps) => {
    return (
        <div className={cn('rounded-[24px] border border-[#F7567C]/15 bg-white/50 p-5 backdrop-blur-sm md:p-6', className)}>
            <div className="mb-4 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F7567C]/10 text-[#F7567C]">
                    <FlaskConical className="h-4 w-4" />
                </div>
                <div>
                    <p className="text-sm font-bold text-slate-900">{config.title}</p>
                    <p className="text-xs text-slate-500">{config.description}</p>
                </div>
            </div>

            {config.type === 'text-analysis' ? (
                <TextAnalysisSandbox config={config} />
            ) : (
                <PromptPlayground config={config} />
            )}
        </div>
    );
};
