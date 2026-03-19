import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { cn } from '../utils/helpers';

interface Feature {
    step: string;
    title?: string;
    content: string;
    image: string;
}

interface FeatureStepsProps {
    features: Feature[];
    className?: string;
    title?: string;
    autoPlayInterval?: number;
}

export function FeatureSteps({
    features,
    className,
    title = 'How to get Started',
}: FeatureStepsProps) {
    const [currentFeature, setCurrentFeature] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    // Shorter scroll track on mobile
    const isMobile = useMemo(() =>
        typeof window !== 'undefined' ? window.innerWidth < 768 : false,
    []);
    const vhPerFeature = isMobile ? 60 : 78;

    useEffect(() => {
        const unsubscribe = scrollYProgress.on('change', (v) => {
            // Map scroll progress to feature index
            const index = Math.min(
                Math.floor(v * features.length),
                features.length - 1,
            );
            setCurrentFeature(index);
        });
        return () => unsubscribe();
    }, [scrollYProgress, features.length]);

    return (
        <div
            ref={containerRef}
            className={cn(className)}
            style={{ height: `${features.length * vhPerFeature}vh` }}
        >
            <div className="sticky top-0 flex h-[60vh] items-start pt-10 md:h-[82vh] md:pt-18">
                <div className="mx-auto w-full max-w-7xl px-4 md:px-10">
                    <motion.h2
                        initial={{ y: -110, opacity: 0, scale: 0.94 }}
                        whileInView={{ y: [ -110, 18, 0 ], opacity: 1, scale: [0.94, 1.02, 1] }}
                        viewport={{ once: false, amount: 0.75 }}
                        transition={{ duration: 0.85, times: [0, 0.72, 1], ease: ['easeIn', 'easeOut', 'easeOut'] }}
                        className="mb-7 text-center text-3xl font-bold md:mb-8 md:text-4xl lg:text-5xl"
                    >
                        {title}
                    </motion.h2>

                    <div className="flex flex-col gap-5 md:grid md:grid-cols-2 md:gap-8">
                        <div className="order-2 space-y-6 md:order-1 md:space-y-7">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    className="flex cursor-pointer items-center gap-4 md:gap-6"
                                    initial={{ opacity: 0.3 }}
                                    animate={{ opacity: index === currentFeature ? 1 : 0.3 }}
                                    transition={{ duration: 0.4 }}
                                    onClick={() => setCurrentFeature(index)}
                                >
                                    <motion.div
                                        className={cn(
                                            'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 transition-colors md:h-9 md:w-9',
                                            index === currentFeature
                                                ? 'bg-primary border-primary text-white scale-110'
                                                : index < currentFeature
                                                    ? 'bg-primary/20 border-primary/40 text-primary'
                                                    : 'bg-slate-100 border-slate-300 text-slate-500',
                                        )}
                                    >
                                        {index < currentFeature ? (
                                            <span className="text-sm font-bold">&#10003;</span>
                                        ) : (
                                            <span className="text-sm font-semibold">{index + 1}</span>
                                        )}
                                    </motion.div>

                                    <div className="flex-1">
                                        <h3 className="text-lg md:text-xl font-semibold text-slate-900">
                                            {feature.title || feature.step}
                                        </h3>
                                        <p className="text-sm leading-6 text-slate-500 md:text-base">
                                            {feature.content}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}

                            <div className="flex items-center gap-2 pt-2">
                                {features.map((_, i) => (
                                    <div
                                        key={i}
                                        className={cn(
                                            'h-1.5 rounded-full transition-all duration-300',
                                            i === currentFeature
                                                ? 'w-8 bg-primary'
                                                : 'w-1.5 bg-slate-200',
                                        )}
                                    />
                                ))}
                                <span className="ml-2 text-xs text-slate-400">
                                    Scroll to explore
                                </span>
                            </div>
                        </div>

                        <div className="relative order-1 h-[180px] overflow-hidden rounded-2xl md:order-2 md:h-[300px] lg:h-[360px]">
                            <AnimatePresence mode="wait">
                                {features.map(
                                    (feature, index) =>
                                        index === currentFeature && (
                                            <motion.div
                                                key={index}
                                                className="absolute inset-0 rounded-2xl overflow-hidden"
                                                initial={{ y: 80, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                exit={{ y: -80, opacity: 0 }}
                                                transition={{ duration: 0.4, ease: 'easeInOut' }}
                                            >
                                                <img
                                                    src={feature.image}
                                                    alt={feature.step}
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-white via-white/50 to-transparent" />
                                            </motion.div>
                                        ),
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
