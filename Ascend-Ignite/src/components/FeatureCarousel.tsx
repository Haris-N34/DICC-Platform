import {
    forwardRef,
    useCallback,
    useEffect,
    useState,
    type MouseEvent,
} from 'react';
import {
    AnimatePresence,
    motion,
    useMotionTemplate,
    useMotionValue,
    type MotionStyle,
    type MotionValue,
    type Variants,
} from 'framer-motion';
import { cn } from '../utils/helpers';

type WrapperStyle = MotionStyle & {
    '--x': MotionValue<string>;
    '--y': MotionValue<string>;
};

interface Step {
    id: string;
    name: string;
    title: string;
    description: string;
}

interface ImageSet {
    step1img1: string;
    step1img2: string;
    step2img1: string;
    step2img2: string;
    step3img: string;
    step4img: string;
    alt: string;
}

interface FeatureCarouselProps {
    bgClass?: string;
    step1img1Class?: string;
    step1img2Class?: string;
    step2img1Class?: string;
    step2img2Class?: string;
    step3imgClass?: string;
    step4imgClass?: string;
    image: ImageSet;
    steps?: Step[];
}

interface StepImageProps {
    src: string;
    alt: string;
    className?: string;
    style?: React.CSSProperties;
    width?: number;
    height?: number;
}

type AnimationPreset = 'fadeInScale' | 'slideInRight' | 'slideInLeft';

interface AnimatedStepImageProps extends StepImageProps {
    preset?: AnimationPreset;
    delay?: number;
}

const ANIMATION_PRESETS = {
    fadeInScale: {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.95 },
        transition: { type: 'spring', stiffness: 300, damping: 25, mass: 0.5 },
    },
    slideInRight: {
        initial: { opacity: 0, x: 20 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -20 },
        transition: { type: 'spring', stiffness: 300, damping: 25, mass: 0.5 },
    },
    slideInLeft: {
        initial: { opacity: 0, x: -20 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: 20 },
        transition: { type: 'spring', stiffness: 300, damping: 25, mass: 0.5 },
    },
} as const;

const defaultSteps: Step[] = [
    { id: '1', name: 'Step 1', title: 'Seamless Integration', description: 'Connect your tools and workflows effortlessly.' },
    { id: '2', name: 'Step 2', title: 'Powerful Analytics', description: 'Gain deep insights with advanced analytics.' },
    { id: '3', name: 'Step 3', title: 'Collaborative Workspace', description: 'Work together in real-time from anywhere.' },
    { id: '4', name: 'Step 4', title: 'Automated Workflows', description: 'Put your tasks on autopilot.' },
];

const defaultClasses = {
    img: 'rounded-xl border border-slate-200 shadow-2xl shadow-black/10',
    step1img1: 'w-[50%] left-0 top-[15%]',
    step1img2: 'w-[60%] left-[40%] top-[35%]',
    step2img1: 'w-[50%] left-[5%] top-[20%]',
    step2img2: 'w-[40%] left-[55%] top-[45%]',
    step3img: 'w-[90%] left-[5%] top-[25%]',
    step4img: 'w-[90%] left-[5%] top-[25%]',
} as const;

function useNumberCycler(totalSteps: number = 4, interval: number = 5000) {
    const [currentNumber, setCurrentNumber] = useState(0);

    useEffect(() => {
        const timerId = setTimeout(() => {
            setCurrentNumber((prev) => (prev + 1) % totalSteps);
        }, interval);
        return () => clearTimeout(timerId);
    }, [currentNumber, totalSteps, interval]);

    const setStep = useCallback(
        (stepIndex: number) => {
            setCurrentNumber(stepIndex % totalSteps);
        },
        [totalSteps],
    );

    return { currentNumber, setStep };
}

function useIsMobile() {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const check = () => setIsMobile(window.matchMedia('(max-width: 768px)').matches);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);
    return isMobile;
}

function IconCheck({ className, ...props }: React.ComponentProps<'svg'>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" className={cn('h-4 w-4', className)} {...props}>
            <path d="m229.66 77.66-128 128a8 8 0 0 1-11.32 0l-56-56a8 8 0 0 1 11.32-11.32L96 188.69 218.34 66.34a8 8 0 0 1 11.32 11.32Z" />
        </svg>
    );
}

const stepVariants: Variants = {
    inactive: { scale: 0.9, opacity: 0.7 },
    active: { scale: 1, opacity: 1 },
};

const StepImage = forwardRef<HTMLImageElement, StepImageProps>(
    ({ src, alt, className, style, ...props }, ref) => (
        <img
            ref={ref}
            alt={alt}
            className={className}
            src={src}
            style={{ position: 'absolute', userSelect: 'none', maxWidth: 'unset', objectFit: 'cover', ...style }}
            {...props}
        />
    ),
);
StepImage.displayName = 'StepImage';

const MotionStepImage = motion(StepImage);

const AnimatedStepImage = ({ preset = 'fadeInScale', delay = 0, ...props }: AnimatedStepImageProps) => {
    const presetConfig = ANIMATION_PRESETS[preset];
    return <MotionStepImage {...props} {...presetConfig} transition={{ ...presetConfig.transition, delay }} />;
};

function FeatureCard({ children, step, stepsData }: { children: React.ReactNode; step: number; stepsData: Step[] }) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const isMobile = useIsMobile();

    function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        if (isMobile) return;
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <motion.div
            className="group relative w-full rounded-2xl"
            onMouseMove={handleMouseMove}
            style={{ '--x': useMotionTemplate`${mouseX}px`, '--y': useMotionTemplate`${mouseY}px` } as WrapperStyle}
        >
            <div className="relative w-full overflow-hidden rounded-3xl border border-slate-200 bg-white transition-colors duration-300">
                <div className="relative m-6 md:m-8 min-h-[360px] w-full overflow-hidden md:min-h-[410px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={step}
                            className="flex w-full flex-col gap-3 md:w-3/5"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <motion.div
                                className="text-sm font-semibold uppercase tracking-wider text-primary"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.05, duration: 0.3 }}
                            >
                                {stepsData[step].name}
                            </motion.div>
                            <motion.h2
                                className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1, duration: 0.3 }}
                            >
                                {stepsData[step].title}
                            </motion.h2>
                            <motion.p
                                className="text-base leading-relaxed text-slate-500"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.15, duration: 0.3 }}
                            >
                                {stepsData[step].description}
                            </motion.p>
                        </motion.div>
                    </AnimatePresence>
                    {children}
                </div>
            </div>
        </motion.div>
    );
}

function StepsNav({ steps: stepItems, current, onChange }: { steps: Step[]; current: number; onChange: (index: number) => void }) {
    return (
        <nav aria-label="Progress" className="flex justify-center px-4">
            <ol className="flex w-full flex-wrap items-center justify-center gap-2" role="list">
                {stepItems.map((step, stepIdx) => {
                    const isCompleted = current > stepIdx;
                    const isCurrent = current === stepIdx;
                    return (
                        <motion.li
                            key={step.name}
                            initial="inactive"
                            animate={isCurrent ? 'active' : 'inactive'}
                            variants={stepVariants}
                            transition={{ duration: 0.3 }}
                            className="relative"
                        >
                            <button
                                type="button"
                                className={cn(
                                    'group flex items-center gap-2.5 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors duration-300',
                                    isCurrent
                                        ? 'bg-primary text-white'
                                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200',
                                )}
                                onClick={() => onChange(stepIdx)}
                            >
                                <span
                                    className={cn(
                                        'flex h-5 w-5 shrink-0 items-center justify-center rounded-full transition-all duration-300',
                                        isCompleted
                                            ? 'bg-primary text-white'
                                            : isCurrent
                                                ? 'bg-blue-400 text-white'
                                                : 'bg-slate-200 text-slate-600',
                                    )}
                                >
                                    {isCompleted ? <IconCheck className="h-3.5 w-3.5" /> : <span>{stepIdx + 1}</span>}
                                </span>
                                <span className="hidden sm:inline-block">{step.name}</span>
                            </button>
                        </motion.li>
                    );
                })}
            </ol>
        </nav>
    );
}

export function FeatureCarousel({
    image,
    steps: customSteps,
    step1img1Class = defaultClasses.step1img1,
    step1img2Class = defaultClasses.step1img2,
    step2img1Class = defaultClasses.step2img1,
    step2img2Class = defaultClasses.step2img2,
    step3imgClass = defaultClasses.step3img,
    step4imgClass = defaultClasses.step4img,
}: FeatureCarouselProps) {
    const stepsData = customSteps || defaultSteps;
    const { currentNumber: step, setStep } = useNumberCycler(stepsData.length);

    const renderStepContent = () => {
        switch (step) {
            case 0:
                return (
                    <div className="relative w-full h-full">
                        <AnimatedStepImage alt={image.alt} className={cn(defaultClasses.img, step1img1Class)} src={image.step1img1} preset="slideInLeft" />
                        <AnimatedStepImage alt={image.alt} className={cn(defaultClasses.img, step1img2Class)} src={image.step1img2} preset="slideInRight" delay={0.1} />
                    </div>
                );
            case 1:
                return (
                    <div className="relative w-full h-full">
                        <AnimatedStepImage alt={image.alt} className={cn(defaultClasses.img, step2img1Class)} src={image.step2img1} preset="fadeInScale" />
                        <AnimatedStepImage alt={image.alt} className={cn(defaultClasses.img, step2img2Class)} src={image.step2img2} preset="fadeInScale" delay={0.1} />
                    </div>
                );
            case 2:
                return <AnimatedStepImage alt={image.alt} className={cn(defaultClasses.img, step3imgClass)} src={image.step3img} preset="fadeInScale" />;
            case 3:
                return <AnimatedStepImage alt={image.alt} className={cn(defaultClasses.img, step4imgClass)} src={image.step4img} preset="fadeInScale" />;
            default:
                return null;
        }
    };

    return (
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-8 p-3 md:gap-10 md:p-4">
            <FeatureCard step={step} stepsData={stepsData}>
                <AnimatePresence mode="wait">
                    <motion.div key={step} {...ANIMATION_PRESETS.fadeInScale} className="w-full h-full absolute">
                        {renderStepContent()}
                    </motion.div>
                </AnimatePresence>
            </FeatureCard>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <StepsNav current={step} onChange={setStep} steps={stepsData} />
            </motion.div>
        </div>
    );
}
