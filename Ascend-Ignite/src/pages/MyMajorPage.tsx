import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, GraduationCap, Copy, Check, Lightbulb } from 'lucide-react';
import { Card, CardContent } from '../components/Card';
import { getProfile } from '../services/profileService';
import { getToolkitForMajor } from '../data/majorToolkits';

const faviconUrl = (domain: string) =>
    `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;

const CopyButton = ({ text }: { text: string }) => {
    const [copied, setCopied] = useState(false);
    const copy = () => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    return (
        <button onClick={copy} className="flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition-colors hover:bg-slate-200">
            {copied ? <><Check className="h-3 w-3 text-emerald-500" /> Copied</> : <><Copy className="h-3 w-3" /> Copy</>}
        </button>
    );
};

export const MyMajorPage = () => {
    const profile = getProfile();
    const toolkit = getToolkitForMajor(profile?.major);

    return (
        <div className="container mx-auto max-w-4xl px-4 py-6 md:py-8">
            {/* Header */}
            <header className="mb-8">
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="lux-panel neon-border rounded-[22px] px-4 py-5 md:rounded-[30px] md:px-8 md:py-7"
                >
                    <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] text-primary mb-2">
                        <GraduationCap className="h-3.5 w-3.5" />
                        Curated for {toolkit.major} students
                    </p>
                    <h1 className="text-2xl font-bold text-slate-900 md:text-4xl">{toolkit.headline}</h1>
                    <p className="mt-2 max-w-2xl text-base leading-7 text-slate-500">{toolkit.description}</p>
                </motion.div>
            </header>

            {/* Tools */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
            >
                <Card className="neon-border mb-6">
                    <CardContent className="p-5 md:p-7">
                        <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-primary">
                            Recommended tools
                        </p>
                        <div className="grid gap-3 sm:grid-cols-2">
                            {toolkit.tools.map((tool) => (
                                <a
                                    key={tool.name}
                                    href={tool.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group/t flex gap-3.5 rounded-[18px] border border-slate-100 bg-white/90 p-4 transition-all hover:border-primary/20 hover:shadow-[0_8px_24px_rgba(37,99,235,0.07)]"
                                >
                                    <img
                                        src={faviconUrl(tool.domain)}
                                        alt={tool.name}
                                        className="h-10 w-10 shrink-0 rounded-xl border border-slate-200/60 bg-white p-0.5"
                                    />
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center gap-2 mb-0.5">
                                            <p className="text-sm font-bold text-slate-900">{tool.name}</p>
                                            {tool.free && <span className="rounded-full bg-emerald-50 px-1.5 py-0.5 text-[9px] font-bold uppercase text-emerald-600">Free</span>}
                                            <ExternalLink className="ml-auto h-3 w-3 text-slate-300 transition-colors group-hover/t:text-primary" />
                                        </div>
                                        <p className="text-xs text-slate-500 leading-5">{tool.oneLiner}</p>
                                        <p className="mt-1.5 text-xs leading-5 text-slate-400">{tool.howToUse}</p>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Use Cases */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
            >
                <Card className="neon-border mb-6">
                    <CardContent className="p-5 md:p-7">
                        <p className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] text-primary">
                            <Lightbulb className="h-3.5 w-3.5" />
                            Real scenarios — how to actually use these
                        </p>
                        <div className="space-y-4">
                            {toolkit.useCases.map((uc, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 12 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.06 }}
                                    className="rounded-[18px] border border-slate-100 bg-white/80 p-4 md:p-5"
                                >
                                    <div className="flex items-start justify-between gap-3 mb-3">
                                        <p className="text-sm font-bold text-slate-900">{uc.scenario}</p>
                                        <span className="shrink-0 rounded-full bg-primary/8 px-2.5 py-0.5 text-[10px] font-bold text-primary whitespace-nowrap">{uc.toolUsed}</span>
                                    </div>
                                    <div className="space-y-2">
                                        {uc.steps.map((step, j) => (
                                            <div key={j} className="flex gap-2.5">
                                                <div className="mt-1.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
                                                    {j + 1}
                                                </div>
                                                <p className="text-sm leading-6 text-slate-600">{step}</p>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Prompts */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <Card className="neon-border">
                    <CardContent className="p-5 md:p-7">
                        <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-primary">
                            Copy & paste prompts
                        </p>
                        <div className="space-y-3">
                            {toolkit.prompts.map((p) => (
                                <div key={p.task} className="rounded-[16px] border border-slate-100 bg-white/80 p-4">
                                    <div className="flex items-center justify-between gap-2 mb-2">
                                        <span className="rounded-full bg-primary/8 px-3 py-0.5 text-[10px] font-bold uppercase tracking-[0.18em] text-primary">{p.task}</span>
                                        <CopyButton text={p.prompt} />
                                    </div>
                                    <p className="text-sm leading-6 text-slate-600 font-mono">{p.prompt}</p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
};
