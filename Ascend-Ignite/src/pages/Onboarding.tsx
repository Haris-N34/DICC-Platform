import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Info } from 'lucide-react';
import { Button } from '../components/Button';
import { Card, CardContent } from '../components/Card';
import { ProgressBar } from '../components/ProgressBar';
import { moduleTemplates } from '../data/mockData';
import { appVisuals } from '../data/visuals';
import { generateProfileSummary } from '../services/aiService';
import { updateProfile } from '../services/profileService';
import { UserProfile } from '../types';

type QuestionType = 'select' | 'radio';
type QuestionOption = string | { label: string; value: string };

interface Question {
    id: string;
    title: string;
    tooltip: string;
    type: QuestionType;
    options: QuestionOption[];
    field: keyof UserProfile;
}

const QUESTIONS: Question[] = [
    {
        id: 'q1',
        title: 'What is your current academic focus?',
        tooltip: 'This helps us tailor industry-specific scenarios for you.',
        type: 'select',
        field: 'major',
        options: ['Computer Science', 'Business', 'Liberal Arts', 'Engineering', 'Other'],
    },
    {
        id: 'q2',
        title: 'How often do you use AI tools (like ChatGPT) for coursework?',
        tooltip: 'We use this to establish your baseline and adjust module difficulty.',
        type: 'radio',
        field: 'aiUsageLevel',
        options: ['Rarely', 'Occasionally', 'Frequently', 'Heavily dependent'],
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
            'Other',
        ],
    },
    {
        id: 'q4',
        title: 'How do you prefer to learn new concepts?',
        tooltip: 'This determines how we present information in your modules.',
        type: 'radio',
        field: 'learningStyle',
        options: ['Hands-on practice', 'Visual diagrams', 'Step-by-step guides', 'Quick summaries'],
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
            { label: 'Brainstorm creative, unconventional solutions (Purpose)', value: 'Creative/Purpose' },
        ],
    },
];

const ONBOARDING_HIGHLIGHTS = ['5 questions', 'Adaptive profile', 'Personalized path'];

/**
 * Normalizes a mixed string/object option into a consistent label and value pair.
 */
function getOptionDetails(option: QuestionOption) {
    if (typeof option === 'string') {
        return { label: option, value: option };
    }

    return option;
}

/**
 * Advances the stored onboarding profile and generates the same summary content as before.
 */
async function completeOnboardingProfile(answers: Partial<UserProfile>, navigate: ReturnType<typeof useNavigate>) {
    const fullProfile = updateProfile({
        ...answers,
        recommendedModule: moduleTemplates[0]?.id ?? '',
    });
    const summary = await generateProfileSummary(fullProfile);
    updateProfile({ profileSummary: summary });
    void navigate('/dashboard');
}

/**
 * Displays the onboarding questionnaire and generates the learner profile.
 */
export const Onboarding = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<Partial<UserProfile>>({});
    const [isGenerating, setIsGenerating] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);

    const currentQuestion = QUESTIONS[currentStep];
    const progress = (currentStep / QUESTIONS.length) * 100;

    /**
     * Stores the answer for the currently displayed question.
     */
    const handleAnswerSelect = (value: string) => {
        setAnswers((previousAnswers) => ({ ...previousAnswers, [currentQuestion.field]: value }));
    };

    /**
     * Moves to the previous question and hides any visible tooltip.
     */
    const handleBack = () => {
        if (currentStep === 0) {
            return;
        }

        setCurrentStep((previousStep) => previousStep - 1);
        setShowTooltip(false);
    };

    /**
     * Moves forward through the questionnaire and finalizes onboarding on the last step.
     */
    const handleNext = async () => {
        if (currentStep < QUESTIONS.length - 1) {
            setCurrentStep((previousStep) => previousStep + 1);
            setShowTooltip(false);
            return;
        }

        setIsGenerating(true);

        try {
            await completeOnboardingProfile(answers, navigate);
        } catch {
            void navigate('/dashboard');
        }
    };

    if (isGenerating) {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
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
        <div className="mx-auto grid min-h-[80vh] max-w-6xl gap-6 px-4 py-8 md:grid-cols-[0.88fr_1.12fr] md:gap-8 md:py-20">
            <div className="space-y-4 md:space-y-5">
                <div className="app-photo-frame rounded-[22px] md:rounded-[30px]">
                    <img
                        src={appVisuals.onboarding.src}
                        alt={appVisuals.onboarding.alt}
                        className="h-[200px] w-full object-cover md:h-[420px]"
                    />
                    <div className="absolute inset-x-0 bottom-0 z-10 p-6 text-white">
                        <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-blue-100">{appVisuals.onboarding.eyebrow}</p>
                        <h2 className="mt-3 max-w-md text-2xl font-bold text-white">{appVisuals.onboarding.title}</h2>
                        <p className="mt-3 max-w-md text-sm leading-6 text-white/85">{appVisuals.onboarding.description}</p>
                    </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-3 md:grid-cols-1">
                    {ONBOARDING_HIGHLIGHTS.map((highlight) => (
                        <div key={highlight} className="app-photo-chip rounded-[22px] p-4">
                            <p className="text-sm font-semibold text-slate-900">{highlight}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex flex-col">
                <div className="mb-8">
                    <div className="mb-4 flex items-center justify-between text-sm font-medium text-slate-500">
                        <span>Step {currentStep + 1} of {QUESTIONS.length}</span>
                        <button
                            onClick={handleBack}
                            disabled={currentStep === 0}
                            className="transition-opacity hover:text-slate-900 disabled:pointer-events-none disabled:opacity-0"
                        >
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
                        <Card className="flex-1 border-0 shadow-md ring-1 ring-slate-200">
                            <CardContent className="flex h-full flex-col pt-8 md:pt-12">
                                <div className="mb-8 flex items-start gap-3">
                                    <h2 className="text-2xl md:text-3xl font-heading font-bold text-slate-900">
                                        {currentQuestion.title}
                                    </h2>
                                    <div className="relative mt-1">
                                        <button
                                            onMouseEnter={() => setShowTooltip(true)}
                                            onMouseLeave={() => setShowTooltip(false)}
                                            onClick={() => setShowTooltip((isVisible) => !isVisible)}
                                            className="text-slate-400 transition-colors hover:text-primary"
                                        >
                                            <Info className="w-5 h-5" />
                                        </button>
                                        <AnimatePresence>
                                            {showTooltip && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 10 }}
                                                    className="absolute left-1/2 bottom-full z-20 mb-2 w-64 -translate-x-1/2 rounded-lg bg-slate-900 p-3 text-sm text-white shadow-xl pointer-events-none"
                                                >
                                                    {currentQuestion.tooltip}
                                                    <div className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-slate-900" />
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>

                                <div className="flex flex-1 flex-col justify-center gap-3">
                                    {currentQuestion.type === 'select' ? (
                                        <select
                                            className="w-full cursor-pointer appearance-none rounded-xl border-2 border-slate-200 bg-slate-50 p-4 text-lg transition-colors focus:border-primary focus:ring-0"
                                            value={(answers[currentQuestion.field] as string) || ''}
                                            onChange={(event) => handleAnswerSelect(event.target.value)}
                                        >
                                            <option value="" disabled>Select an option...</option>
                                            {currentQuestion.options.map((option) => {
                                                const { label, value } = getOptionDetails(option);

                                                return (
                                                    <option key={value} value={value}>
                                                        {label}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    ) : (
                                        currentQuestion.options.map((option) => {
                                            const { label, value } = getOptionDetails(option);
                                            const isSelected = answers[currentQuestion.field] === value;

                                            return (
                                                <button
                                                    key={value}
                                                    onClick={() => handleAnswerSelect(value)}
                                                    className={`
                            flex items-center justify-between w-full p-4 rounded-xl border-2 text-left transition-all duration-200
                            ${isSelected
                                    ? 'border-primary bg-primary/5 text-primary shadow-sm'
                                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700'
                                }
                          `}
                                                >
                                                    <span className="text-lg font-medium">{label}</span>
                                                    <div
                                                        className={`
                             w-6 h-6 rounded-full flex items-center justify-center transition-colors
                             ${isSelected ? 'bg-primary text-white' : 'border-2 border-slate-300'}
                          `}
                                                    >
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
                                        className="w-full px-8 sm:w-auto"
                                    >
                                        {currentStep === QUESTIONS.length - 1 ? 'Complete Profile' : 'Continue'}
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
