import { useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { analogyDictionary } from '../../data/insightData';

interface AnalogyTooltipProps {
    term: string;
    children: ReactNode;
}

export const AnalogyTooltip = ({ term, children }: AnalogyTooltipProps) => {
    const [open, setOpen] = useState(false);
    const entry = analogyDictionary[term.toLowerCase()];

    if (!entry) return <>{children}</>;

    return (
        <span
            className="relative inline"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
            onClick={() => setOpen((v) => !v)}
        >
            <span className="border-b border-dashed border-[#F7567C] cursor-help">{children}</span>
            <AnimatePresence>
                {open && (
                    <motion.span
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        className="absolute bottom-full left-1/2 z-40 mb-2 -translate-x-1/2 block w-[280px] rounded-[16px] border border-white/60 bg-white/95 p-4 shadow-[0_22px_60px_rgba(247,86,124,0.12)] backdrop-blur-xl"
                    >
                        <span className="mb-1 block text-2xl leading-none">{entry.emoji}</span>
                        <span className="block text-sm font-bold text-slate-900">{entry.analogy}</span>
                        <span className="mt-1.5 block text-xs leading-5 text-slate-500">{entry.explanation}</span>
                    </motion.span>
                )}
            </AnimatePresence>
        </span>
    );
};

/**
 * Scans text for analogy dictionary terms and wraps matches in AnalogyTooltip.
 */
export function renderWithAnalogies(text: string): ReactNode {
    const terms = Object.keys(analogyDictionary).sort((a, b) => b.length - a.length);
    const pattern = new RegExp(`\\b(${terms.map(escapeRegex).join('|')})\\b`, 'gi');

    const parts: ReactNode[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = pattern.exec(text)) !== null) {
        if (match.index > lastIndex) {
            parts.push(text.slice(lastIndex, match.index));
        }
        const matched = match[0];
        const key = matched.toLowerCase();
        parts.push(
            <AnalogyTooltip key={`${key}-${match.index}`} term={key}>
                {matched}
            </AnalogyTooltip>,
        );
        lastIndex = match.index + matched.length;
    }

    if (lastIndex < text.length) {
        parts.push(text.slice(lastIndex));
    }

    return parts.length > 0 ? parts : text;
}

function escapeRegex(s: string) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
