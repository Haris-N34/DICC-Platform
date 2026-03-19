import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';
import { ToolArticleCard } from '../components/intelligence/InsightCard';
import { toolArticles, weekLabel } from '../data/insightData';

export const IntelligencePage = () => {
    return (
        <div className="container mx-auto max-w-3xl px-4 py-6 md:py-10">
            {/* Masthead */}
            <header className="mb-10 md:mb-14">
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                >
                    <span className="inline-block rounded-full border border-blue-100 bg-blue-50 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-5">
                        {weekLabel}
                    </span>

                    <div className="flex items-center justify-center gap-3 mb-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-white shadow-[0_6px_20px_rgba(37,99,235,0.3)]">
                            <Flame className="h-5 w-5" />
                        </div>
                        <h1 className="text-3xl font-bold text-slate-900 font-heading md:text-4xl">
                            Evolving AI
                        </h1>
                    </div>

                    <p className="text-base text-slate-500 md:text-lg">
                        The 5 tools you need to know about this week.
                    </p>

                    <div className="mx-auto mt-5 h-px w-20 bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
                </motion.div>
            </header>

            {/* Articles */}
            <div className="space-y-6 md:space-y-8">
                {toolArticles.map((tool, i) => (
                    <ToolArticleCard key={tool.id} data={tool} index={i} />
                ))}
            </div>

            {/* Footer */}
            <footer className="mt-12 border-t border-slate-100 pt-6 text-center">
                <p className="text-sm text-slate-400">
                    New tools every week. <span className="font-medium text-slate-500">Evolving AI</span> by Ascend Ignite.
                </p>
            </footer>
        </div>
    );
};
