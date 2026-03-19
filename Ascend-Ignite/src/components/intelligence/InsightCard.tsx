import { motion } from 'framer-motion';
import { ExternalLink, ArrowRight, GraduationCap } from 'lucide-react';
import { Card } from '../Card';
import { Button } from '../Button';
import type { ToolArticle } from '../../types';

interface ToolArticleCardProps {
    data: ToolArticle;
    index: number;
}

const faviconUrl = (domain: string) =>
    `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;

export const ToolArticleCard = ({ data, index }: ToolArticleCardProps) => {
    return (
        <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: 0.06 * index, type: 'spring', stiffness: 220, damping: 24 }}
        >
            <Card className="overflow-hidden neon-border hover:shadow-[0_20px_60px_rgba(37,99,235,0.1)] transition-shadow">
                <div className="p-5 md:p-7">

                    {/* ── Header: Logo + Name + Tagline + Badge ── */}
                    <div className="flex items-start gap-4 mb-5">
                        <img
                            src={faviconUrl(data.domain)}
                            alt={`${data.name} logo`}
                            className="h-12 w-12 shrink-0 rounded-xl border border-slate-200/60 bg-white p-1 shadow-sm"
                        />
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2.5 flex-wrap">
                                <h2 className="text-xl font-bold text-slate-900 font-heading md:text-2xl">{data.name}</h2>
                                {data.free && (
                                    <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.15em] text-emerald-600">Free</span>
                                )}
                                {data.pricing && (
                                    <span className="text-[11px] text-slate-400">{data.pricing}</span>
                                )}
                            </div>
                            <p className="mt-0.5 text-sm text-slate-500">{data.tagline}</p>
                        </div>
                    </div>

                    {/* ── What it does ── */}
                    <p className="text-[15px] leading-7 text-slate-600 mb-5">{data.whatItDoes}</p>

                    {/* ── Why it matters — compact callout ── */}
                    <div className="mb-5 rounded-[14px] border border-blue-100 bg-blue-50/50 px-4 py-3">
                        <p className="text-sm leading-7 text-slate-700">
                            <span className="font-bold text-primary">Why it matters: </span>
                            {data.whyItMatters}
                        </p>
                    </div>

                    {/* ── Get started + Student tip — two columns ── */}
                    <div className="mb-5 grid gap-3 md:grid-cols-2">
                        <div className="rounded-[14px] bg-slate-50 px-4 py-3">
                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-1">Get started</p>
                            <p className="text-sm leading-6 text-slate-600">{data.getStarted}</p>
                        </div>
                        <div className="rounded-[14px] bg-primary/[0.04] border border-primary/8 px-4 py-3">
                            <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-1">
                                <GraduationCap className="h-3 w-3" /> Student tip
                            </p>
                            <p className="text-sm leading-6 text-slate-700">{data.studentTip}</p>
                        </div>
                    </div>

                    {/* ── Best for tags ── */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                        {data.bestFor.map((use) => (
                            <span key={use} className="rounded-full border border-slate-200/70 bg-white px-2.5 py-1 text-[11px] text-slate-500">
                                {use}
                            </span>
                        ))}
                    </div>

                    {/* ── CTA ── */}
                    <a href={data.url} target="_blank" rel="noopener noreferrer">
                        <Button size="sm" className="gap-2">
                            Try {data.name} <ArrowRight className="h-3.5 w-3.5" />
                        </Button>
                    </a>
                </div>
            </Card>
        </motion.article>
    );
};
