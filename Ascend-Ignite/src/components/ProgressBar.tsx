import React from 'react';
import { cn } from '../utils/helpers';
import { motion } from 'framer-motion';

interface ProgressBarProps {
    progress: number; // 0 to 100
    className?: string;
    showLabel?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress, className, showLabel = false }) => {
    const normalizedProgress = Math.min(Math.max(progress, 0), 100);

    return (
        <div className={cn("w-full", className)}>
            <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200/60">
                <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.45)]"
                    initial={{ width: 0 }}
                    animate={{ width: `${normalizedProgress}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                />
            </div>
            {showLabel && (
                <p className="mt-2 text-right text-xs text-emerald-600 font-medium">
                    {Math.round(normalizedProgress)}% Completed
                </p>
            )}
        </div>
    );
};
