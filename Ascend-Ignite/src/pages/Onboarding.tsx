import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, Check } from 'lucide-react';
import { Button } from '../components/Button';
import { ProgressBar } from '../components/ProgressBar';
import { Card, CardContent } from '../components/Card';
import { updateProfile } from '../services/profileService';
import { generateProfileSummary } from '../services/aiService';
import { UserProfile } from '../types';
import { moduleTemplates } from '../data/mockData';
import { appVisuals } from '../data/visuals';

type QuestionType = 'select' | 'radio';

interface Question {
    id: string;
    title: string;
    tooltip: string;
    type: QuestionType;
    options: string[] | { label: string; value: string }[];
    field: keyof UserProfile;
}

const questions: Question[] = [
    {
        id: 'q1',
        title: 'What is your current academic focus?',
        tooltip: 'This helps us tailor industry-specific scenarios for you.',
        type: 'select',
        field: 'major',
        options: ['Computer Science', 'Business', 'Liberal Arts', 'Engineering', 'Other']
    },
    {
        id: 'q2',
        title: 'How often do you use AI tools (like ChatGPT) for coursework?',
        tooltip: 'We use this to establish your baseline and adjust module difficulty.',
        type: 'radio',
        field: 'aiUsageLevel',
        options: ['Rarely', 'Occasionally', 'Frequently', 'Heavily dependent']
    },
    {
        id: 'q3',
        title: 'What is your biggest fear regarding your future career?',
        tooltip: 'Identifying your concerns helps us provide targeted resilience building exercises.',
        type: 'radio',
        field: 'biggestFear',
        options: [
            'AI making my degree irrelevant',
            'Jobs disappearing',
            'Not having enough technical skills',
            'Too many choices / Lack of direction',
            'Other'
        ]
    },
    {
        id: 'q4',
        title: 'How do you prefer to learn new concepts?',
        tooltip: 'This determines how we present information in your modules.',
        type: 'radio',
        field: 'learningStyle',
        options: ['Hands-on practice', 'Visual diagrams', 'Step-by-step guides', 'Quick summaries']
    },
    {
        id: 'q5',
        title: 'Scenario: You are assigned a complex project at work. What is your first instinct?',
        tooltip: 'This diagnostic helps determine if you are geared towards "Purpose" or "Task".',
        type: 'radio',
        field: 'mindsetType',
        options: [
            { label: 'Look for the quickest way to complete it (Task)', value: 'Task-Oriented' },
            { label: 'Understand why we are doing it before starting (Purpose)', value: 'Purpose-Oriented' },
            { label: 'Ask a tool/AI to break it down for me (Task/Tool)', value: 'Tool-Oriented' },
            { label: 'Brainstorm creative, unconventional solutions (Purpose)', value: 'Creative/Purpose' }
        ]
    }
];

export const Onboarding = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<Partial<UserProfile>>({});
    const [isGenerating, setIsGenerating] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);

    const currentQuestion = questions[currentStep];
    const progress = ((currentStep) / questions.length) * 100;

    const handleSelect = (value: string) => {
        setAnswers(prev => ({ ...prev, [currentQuestion.field]: value }));
    };

    const handleNext = async () => {
        if (currentStep < questions.length - 1) {
            setCurrentStep(prev => prev + 1);
            setShowTooltip(false);
        } else {
            // Finalize and generate profile summary
            setIsGenerating(true);
            try {
                const fullProfile = updateProfile({
                    ...answers,
                    recommendedModule: moduleTemplates[0]?.id ?? '',
                });
                const summary = await generateProfileSummary(fullProfile);
                updateProfile({ profileSummary: summary });
                void navigate('/dashboard');
            } catch (error) {
                console.error("Failed to generate profile", error);
                void navigate('/dashboard'); // Still navigate on error
            }
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
            setShowTooltip(false);
        }
    };

    if (isGenerating) {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                    className="mb-8"
                >
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full" />
                </motion.div>
                <h2 className="text-2xl font-bold font-heading mb-2">Building your personalized path...</h2>
                <p className="text-slate-500">Analyzing your responses with Ascend Ignite AI.</p>
            </div>
        );
    }

    return (
        <div className="mx-auto grid min-h-[80vh] max-w-6xl gap-8 px-4 py-12 md:grid-cols-[0.88fr_1.12fr] md:py-20">
            <div className="space-y-5">
                <div className="app-photo-frame rounded-[30px]">
                    <img
                        src={appVisuals.onboarding.src}
                        alt={appVisuals.onboarding.alt}
                        className="h-[320px] w-full object-cover md:h-[420px]"
                    />
                    <div className="absolute inset-x-0 bottom-0 z-10 p-6 text-white">
                        <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-blue-100">{appVisuals.onboarding.eyebrow}</p>
                        <h2 className="mt-3 max-w-md text-2xl font-bold text-white">{appVisuals.onboarding.title}</h2>
                        <p className="mt-3 max-w-md text-sm leading-6 text-white/85">{appVisuals.onboarding.description}</p>
                    </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-3 md:grid-cols-1">
                    {['5 questions', 'Adaptive profile', 'Personalized path'].map((item) => (
                        <div key={item} className="app-photo-chip rounded-[22px] p-4">
                            <p className="text-sm font-semibold text-slate-900">{item}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex flex-col">
            <div className="mb-8">
                <div className="flex justify-between items-center mb-4 text-sm font-medium text-slate-500">
                    <span>Step {currentStep + 1} of {questions.length}</span>
                    <button onClick={handleBack} disabled={currentStep === 0} className="hover:text-slate-900 disabled:opacity-0 disabled:pointer-events-none transition-opacity">
                        Back
                    </button>
                </div>
                <ProgressBar progress={progress} />
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="flex-1 flex flex-col"
                >
                    <Card className="flex-1 shadow-md border-0 ring-1 ring-slate-200">
                        <CardContent className="pt-8 md:pt-12 flex flex-col h-full">
                            <div className="flex items-start gap-3 mb-8">
                                <h2 className="text-2xl md:text-3xl font-heading font-bold text-slate-900">
                                    {currentQuestion.title}
                                </h2>
                                <div className="relative mt-1">
                                    <button
                                        onMouseEnter={() => setShowTooltip(true)}
                                        onMouseLeave={() => setShowTooltip(false)}
                                        onClick={() => setShowTooltip(!showTooltip)}
                                        className="text-slate-400 hover:text-primary transition-colors"
                                    >
                                        <Info className="w-5 h-5" />
                                    </button>
                                    <AnimatePresence>
                                        {showTooltip && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-64 p-3 bg-slate-900 text-white text-sm rounded-lg shadow-xl z-20 pointer-events-none"
                                            >
                                                {currentQuestion.tooltip}
                                                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900" />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>

                            <div className="flex-1 flex flex-col gap-3 justify-center">
                                {currentQuestion.type === 'select' ? (
                                    <select
                                        className="w-full p-4 text-lg rounded-xl border-2 border-slate-200 bg-slate-50 focus:border-primary focus:ring-0 transition-colors cursor-pointer appearance-none"
                                        value={(answers[currentQuestion.field] as string) || ''}
                                        onChange={(e) => handleSelect(e.target.value)}
                                    >
                                        <option value="" disabled>Select an option...</option>
                                        {currentQuestion.options.map((opt: any) => (
                                            <option key={opt.value || opt} value={opt.value || opt}>
                                                {opt.label || opt}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    currentQuestion.options.map((opt: any) => {
                                        const value = opt.value || opt;
                                        const label = opt.label || opt;
                                        const isSelected = answers[currentQuestion.field] === value;

                                        return (
                                            <button
                                                key={value}
                                                onClick={() => handleSelect(value)}
                                                className={`
                            flex items-center justify-between w-full p-4 rounded-xl border-2 text-left transition-all duration-200
                            ${isSelected
                                                        ? 'border-primary bg-primary/5 text-primary shadow-sm'
                                                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700'
                                                    }
                          `}
                                            >
                                                <span className="text-lg font-medium">{label}</span>
                                                <div className={`
                             w-6 h-6 rounded-full flex items-center justify-center transition-colors
                             ${isSelected ? 'bg-primary text-white' : 'border-2 border-slate-300'}
                          `}>
                                                    {isSelected && <Check className="w-4 h-4" />}
                                                </div>
                                            </button>
                                        );
                                    })
                                )}
                            </div>

                            <div className="mt-8 flex justify-end">
                                <Button
                                    size="lg"
                                    onClick={() => void handleNext()}
                                    disabled={!answers[currentQuestion.field]}
                                    className="w-full sm:w-auto px-8"
                                >
                                    {currentStep === questions.length - 1 ? 'Complete Profile' : 'Continue'}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </AnimatePresence>
            </div>
        </div>
    );
};
