import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, ArrowRight, Trophy } from 'lucide-react';
import { mockQuizzes, moduleTemplates } from '../data/mockData';
import { QuizQuestion } from '../types';
import { Card, CardContent } from '../components/Card';
import { Button } from '../components/Button';
import { ProgressBar } from '../components/ProgressBar';
import { completeModule } from '../services/progressService';

export const QuizPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    // Compute quiz data directly during render for mock data
    const quiz = mockQuizzes.find(q => q.moduleId === id) || null;
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);

    useEffect(() => {
        if (!quiz) {
            // Navigate back if no quiz found for this module
            void navigate(`/module/${id}`);
        }
    }, [quiz, id, navigate]);

    if (!quiz) return null;

    const currentQuestion: QuizQuestion = quiz.questions[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;
    const progress = ((currentQuestionIndex + (isAnswered ? 1 : 0)) / quiz.questions.length) * 100;

    const handleSelectAnswer = (index: number) => {
        if (isAnswered) return;
        setSelectedAnswer(index);
        setIsAnswered(true);

        if (index === currentQuestion.correctAnswerIndex) {
            setScore(prev => prev + 1);
        }
    };

    const handleNext = () => {
        if (isLastQuestion) {
            const finalScore = score;
            const percentage = Math.round((finalScore / quiz.questions.length) * 100);
            completeModule(id!, percentage);
            setShowResults(true);
        } else {
            setCurrentQuestionIndex(prev => prev + 1);
            setSelectedAnswer(null);
            setIsAnswered(false);
        }
    };

    const moduleTitle = moduleTemplates.find(m => m.id === id)?.title || "Module";

    if (showResults) {
        const percentage = Math.round((score / quiz.questions.length) * 100);
        const passed = percentage >= 70;

        return (
            <div className="min-h-[80vh] flex items-center justify-center px-4 py-6">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-full max-w-md"
                >
                    <Card className="text-center overflow-hidden">
                        <div className={`p-6 md:p-8 ${passed ? 'bg-gradient-to-br bg-blue-50' : 'bg-slate-50'}`}>
                            <div className={`w-20 h-20 mx-auto mb-4 flex items-center justify-center rounded-full md:w-24 md:h-24 md:mb-6 ${passed ? 'bg-blue-100 text-primary shadow-[0_0_30px_rgba(37,99,235,0.2)]' : 'bg-slate-200 text-slate-500'}`}>
                                <Trophy className="w-10 h-10 md:w-12 md:h-12" />
                            </div>
                            <h2 className="text-2xl font-bold font-heading mb-2 md:text-3xl">Quiz Complete!</h2>
                            <p className="text-slate-600">You scored <span className={passed ? 'text-primary font-bold' : ''}>{percentage}%</span></p>
                        </div>
                        <CardContent className="p-6 md:p-8">
                            <p className="text-lg text-slate-800 mb-8">
                                {passed
                                    ? "Great job! You've demonstrated a solid understanding of this module's core concepts."
                                    : "Good effort. Reviewing the module materials might help reinforce these concepts."}
                            </p>
                            <div className="space-y-4">
                                <Link to="/dashboard" className="w-full block">
                                    <Button size="lg" className="w-full h-14 text-lg">
                                        Return to Dashboard
                                    </Button>
                                </Link>
                                {!passed && (
                                    <Link to={`/module/${id}`} className="w-full block">
                                        <Button variant="outline" size="lg" className="w-full">
                                            Review Module
                                        </Button>
                                    </Link>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto px-4 py-6 md:py-16 min-h-[80vh] flex flex-col">
            <div className="mb-8">
                <div className="flex justify-between items-end mb-4 text-sm font-medium text-slate-500">
                    <span>{moduleTitle}</span>
                    <span>Question {currentQuestionIndex + 1} of {quiz.questions.length}</span>
                </div>
                <ProgressBar progress={progress} />
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentQuestionIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="flex-1"
                >
                    <Card className="shadow-md border-0 ring-1 ring-slate-200">
                        <CardContent className="p-6 md:p-10">
                            <h2 className="text-xl font-bold font-heading text-slate-900 mb-6 leading-snug md:text-2xl md:mb-8">
                                {currentQuestion.question}
                            </h2>

                            <div className="space-y-3">
                                {currentQuestion.options.map((option, index) => {
                                    const isSelected = selectedAnswer === index;
                                    const isCorrect = index === currentQuestion.correctAnswerIndex;

                                    let stateClass = "border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700";
                                    let Icon = null;

                                    if (isAnswered) {
                                        if (isCorrect) {
                                            stateClass = "border-blue-500 bg-blue-50 text-blue-800 shadow-sm ring-1 ring-blue-500";
                                            Icon = <CheckCircle2 className="w-5 h-5 text-blue-500" />;
                                        } else if (isSelected && !isCorrect) {
                                            stateClass = "border-slate-400 bg-slate-100 text-slate-800 shadow-sm";
                                            Icon = <XCircle className="w-5 h-5 text-slate-500" />;
                                        } else {
                                            stateClass = "border-slate-200 opacity-50"; // Dim non-selected wrong answers
                                        }
                                    } else if (isSelected) {
                                        stateClass = "border-primary bg-primary/5 text-primary shadow-sm";
                                    }

                                    return (
                                        <button
                                            key={index}
                                            onClick={() => handleSelectAnswer(index)}
                                            disabled={isAnswered}
                                            className={`w-full flex items-center justify-between p-3 rounded-xl border-2 text-left text-base transition-all md:p-4 md:text-lg ${stateClass}`}
                                        >
                                            <span className="flex-1 pr-4">{option}</span>
                                            {Icon && <span>{Icon}</span>}
                                        </button>
                                    );
                                })}
                            </div>

                            <AnimatePresence>
                                {isAnswered && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                        animate={{ opacity: 1, height: 'auto', marginTop: 32 }}
                                        className="overflow-hidden"
                                    >
                                        <div className={`rounded-xl border p-4 ${selectedAnswer === currentQuestion.correctAnswerIndex ? 'border-blue-200 bg-blue-50 text-blue-800' : 'border-slate-200 bg-slate-100 text-slate-800'}`}>
                                            <h4 className="font-bold mb-1">Explanation</h4>
                                            <p>{currentQuestion.explanation}</p>
                                        </div>

                                        <div className="mt-8 flex justify-end">
                                            <Button size="lg" onClick={handleNext} className="w-full sm:w-auto min-w-[200px]">
                                                {isLastQuestion ? 'See Results' : 'Next Question'} <ArrowRight className="ml-2 w-5 h-5" />
                                            </Button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </CardContent>
                    </Card>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};
