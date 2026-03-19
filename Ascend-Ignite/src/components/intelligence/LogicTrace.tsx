import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search, ShieldCheck, PenTool, Ear, ListTodo, Hammer, FileText,
    Binary, Library, Radar, Frame, SlidersHorizontal, RefreshCw,
    Play, RotateCcw, MessageSquare,
} from 'lucide-react';
import type { TraceFlow, TraceNode as TraceNodeType } from '../../types';
import { traceFlowDefaults } from '../../data/insightData';
import { cn } from '../../utils/helpers';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Search, ShieldCheck, PenTool, Ear, ListTodo, Hammer, FileText,
    Binary, Library, Radar, Frame, SlidersHorizontal, RefreshCw, MessageSquare,
};

interface LogicTraceProps {
    flow: TraceFlow;
    className?: string;
}

const TraceNodeCard = ({
    node,
    index,
    isActive,
    isRevealed,
}: {
    node: TraceNodeType;
    index: number;
    isActive: boolean;
    isRevealed: boolean;
}) => {
    const Icon = iconMap[node.icon] ?? Search;

    return (
        <motion.div
            initial={{ opacity: 0.25, scale: 0.95, y: 12 }}
            animate={{
                opacity: isRevealed ? 1 : 0.25,
                scale: isRevealed ? 1 : 0.95,
                y: isRevealed ? 0 : 12,
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className={cn(
                'relative flex-1 min-w-0 rounded-[20px] border border-white/60 bg-white/90 p-4 shadow-[0_8px_30px_rgba(0,0,0,0.06)] backdrop-blur-xl transition-shadow md:p-5',
                isActive && 'shadow-[0_12px_40px_rgba(37,99,235,0.12)]',
            )}
        >
            {/* Left accent */}
            <div className={cn('absolute left-0 top-3 bottom-3 w-1 rounded-r-full', node.color.replace('text-', 'bg-'))} />

            <div className="pl-3">
                <div className="mb-2 flex items-center gap-2.5">
                    <div className={cn('flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100', node.color)}>
                        <Icon className="h-4.5 w-4.5" />
                    </div>
                    {isActive && (
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                        </span>
                    )}
                </div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Step {index + 1}</p>
                <p className="mt-1 text-base font-bold text-slate-900 font-heading">{node.label}</p>
                <p className="mt-1 text-sm leading-6 text-slate-500">{node.description}</p>
            </div>
        </motion.div>
    );
};

const VerticalConnector = ({ isDrawn }: { isDrawn: boolean }) => (
    <div className="flex justify-center py-1 md:hidden">
        <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: isDrawn ? 1 : 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="h-8 w-0.5 origin-top rounded-full bg-primary/20"
        />
    </div>
);

const HorizontalConnector = ({ isDrawn }: { isDrawn: boolean }) => (
    <div className="hidden items-center md:flex">
        <svg width="48" height="24" viewBox="0 0 48 24" className="shrink-0">
            <motion.path
                d="M0 12 C16 12, 32 12, 48 12"
                fill="none"
                stroke="#2563eb"
                strokeWidth="2"
                strokeDasharray="4 4"
                strokeOpacity="0.3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: isDrawn ? 1 : 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
            />
            <motion.polygon
                points="42,8 48,12 42,16"
                fill="#2563eb"
                fillOpacity="0.3"
                initial={{ opacity: 0 }}
                animate={{ opacity: isDrawn ? 1 : 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
            />
        </svg>
    </div>
);

export const LogicTrace = ({ flow, className }: LogicTraceProps) => {
    const [currentStep, setCurrentStep] = useState(-1);
    const isPlaying = currentStep >= 0;
    const isComplete = currentStep >= flow.nodes.length;

    const play = useCallback(() => {
        setCurrentStep(0);
        let step = 0;
        const advance = () => {
            step += 1;
            if (step <= flow.nodes.length) {
                setCurrentStep(step);
                if (step < flow.nodes.length) {
                    setTimeout(advance, traceFlowDefaults.stepDurationMs);
                }
            }
        };
        setTimeout(advance, traceFlowDefaults.stepDurationMs);
    }, [flow.nodes.length]);

    const reset = () => setCurrentStep(-1);

    return (
        <div className={cn('space-y-4', className)}>
            <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-slate-700">{flow.title}</p>
                <AnimatePresence mode="wait">
                    {!isPlaying ? (
                        <motion.button
                            key="play"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            onClick={play}
                            className="flex items-center gap-1.5 rounded-full bg-primary/10 px-3.5 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-primary/20"
                        >
                            <Play className="h-3.5 w-3.5" /> Play Trace
                        </motion.button>
                    ) : isComplete ? (
                        <motion.button
                            key="replay"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            onClick={reset}
                            className="flex items-center gap-1.5 rounded-full bg-slate-100 px-3.5 py-1.5 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-200"
                        >
                            <RotateCcw className="h-3.5 w-3.5" /> Replay
                        </motion.button>
                    ) : (
                        <motion.span
                            key="progress"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-xs font-medium text-slate-400"
                        >
                            Step {Math.min(currentStep + 1, flow.nodes.length)} of {flow.nodes.length}
                        </motion.span>
                    )}
                </AnimatePresence>
            </div>

            {/* Flow nodes */}
            <div className="flex flex-col gap-0 md:flex-row md:items-stretch md:gap-0">
                {flow.nodes.map((node, i) => (
                    <div key={node.id} className="contents">
                        <TraceNodeCard
                            node={node}
                            index={i}
                            isActive={currentStep === i}
                            isRevealed={currentStep >= i}
                        />
                        {i < flow.nodes.length - 1 && (
                            <>
                                <VerticalConnector isDrawn={currentStep > i} />
                                <HorizontalConnector isDrawn={currentStep > i} />
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
