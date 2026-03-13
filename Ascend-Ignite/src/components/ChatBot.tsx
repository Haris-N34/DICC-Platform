import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Sparkles, Mail, HelpCircle } from 'lucide-react';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
}

interface ChatBotProps {
    mode: 'course' | 'global';
    courseTitle?: string;
    courseContext?: string;
}

const courseResponses: Record<string, string[]> = {
    default: [
        "That's a great question! Based on the course material, I'd recommend reviewing the key concepts section for a deeper understanding.",
        "I can help clarify that! This topic connects to the broader theme of building AI-readiness skills. Would you like me to elaborate?",
        "Good thinking! The scenario exercises in this module are designed to help you practice exactly this kind of critical thinking.",
        "Let me break that down for you. The core idea here is about combining human creativity with AI efficiency to produce better outcomes.",
    ],
    confidence: [
        "Great question about building confidence! Remember, the key is focusing on uniquely human skills that AI can't replicate - like empathy, creative problem solving, and emotional intelligence.",
        "Your irreplaceability comes from skills like complex reasoning, cross-disciplinary thinking, and emotional awareness. These are your superpowers!",
        "Think of AI as a tool that amplifies your existing skills, not a replacement. The most successful professionals will be those who can effectively collaborate with AI.",
    ],
    uncertainty: [
        "It's natural to feel uncertain about the future of work. The key is to focus on developing adaptable skills that transfer across industries.",
        "By 2030, many routine tasks will be automated, but new roles focused on AI oversight, ethics, and strategic implementation will emerge.",
        "The best strategy is to stay informed, build transferable skills, and maintain a growth mindset. You're already on the right track by taking this course!",
    ],
    practical: [
        "Effective AI prompting is all about clarity and specificity. The more context you provide, the better the output.",
        "Always remember to fact-check AI-generated content. AI can hallucinate - meaning it can confidently present incorrect information as fact.",
        "Using AI responsibly means understanding its limitations, being transparent about its use, and ensuring your work reflects your own understanding.",
    ],
};

const globalResponses: Record<string, string> = {
    email: "I'd be happy to help with email! You can reach the Ascend Ignite team at support@ascendignite.com for any technical issues, or advising@ascendignite.com for academic guidance.",
    support: "For support, you can:\n- Email us at support@ascendignite.com\n- Visit our Community page for peer support\n- Check the FAQ section for common questions\n\nWhat specific issue are you experiencing?",
    certificate: "Certificates are awarded upon completing a course and passing the quiz with 70% or higher. You can view and download your certificates from the Certificates page in the sidebar!",
    progress: "Your progress is tracked automatically as you complete modules and quizzes. Check your Dashboard for an overview of your journey, including completed modules and quiz scores.",
    default: "I'm here to help! I can assist you with:\n- Course content questions\n- Email and support inquiries\n- Certificate information\n- Navigation help\n- General AI readiness questions\n\nWhat would you like to know?",
};

function getCourseResponse(message: string, courseTitle?: string): string {
    const lower = message.toLowerCase();
    let pool = courseResponses.default;

    if (courseTitle?.toLowerCase().includes('confidence')) {
        pool = [...courseResponses.confidence, ...courseResponses.default];
    } else if (courseTitle?.toLowerCase().includes('uncertainty') || courseTitle?.toLowerCase().includes('navigate')) {
        pool = [...courseResponses.uncertainty, ...courseResponses.default];
    } else if (courseTitle?.toLowerCase().includes('practical')) {
        pool = [...courseResponses.practical, ...courseResponses.default];
    }

    if (lower.includes('help') || lower.includes('explain') || lower.includes('what')) {
        return pool[Math.floor(Math.random() * pool.length)];
    }
    if (lower.includes('quiz') || lower.includes('test')) {
        return "The quiz at the end of this module will test your understanding of the key concepts. Make sure to review the scenario exercise and key takeaways before attempting it. You need 70% to pass!";
    }
    if (lower.includes('thank')) {
        return "You're welcome! Keep up the great work on your learning journey. Feel free to ask if you have more questions!";
    }

    return pool[Math.floor(Math.random() * pool.length)];
}

function getGlobalResponse(message: string): string {
    const lower = message.toLowerCase();

    if (lower.includes('email') || lower.includes('contact')) {
        return globalResponses.email;
    }
    if (lower.includes('support') || lower.includes('help') || lower.includes('issue') || lower.includes('problem')) {
        return globalResponses.support;
    }
    if (lower.includes('certificate') || lower.includes('cert') || lower.includes('degree')) {
        return globalResponses.certificate;
    }
    if (lower.includes('progress') || lower.includes('track') || lower.includes('dashboard')) {
        return globalResponses.progress;
    }
    if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
        return "Hello! Welcome to Ascend Ignite. I'm your AI assistant. How can I help you today?";
    }

    return globalResponses.default;
}

export const ChatBot = ({ mode, courseTitle, courseContext }: ChatBotProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    useEffect(() => {
        if (isOpen && messages.length === 0) {
            const welcomeMessage = mode === 'course'
                ? `Hi! I'm your learning assistant for "${courseTitle}". ${courseContext ? `We are covering ${courseContext.toLowerCase()} ` : ''}Ask me anything about this course - concepts, scenarios, or quiz prep!`
                : "Hi! I'm your Ascend Ignite assistant. I can help with email, support, certificates, navigation, and more. How can I help?";

            setMessages([{
                id: 'welcome',
                role: 'assistant',
                content: welcomeMessage,
            }]);
        }
    }, [courseContext, courseTitle, isOpen, messages.length, mode]);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input.trim(),
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        setTimeout(() => {
            const response = mode === 'course'
                ? getCourseResponse(input, courseTitle)
                : getGlobalResponse(input);

            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: response,
            }]);
            setIsTyping(false);
        }, 800 + Math.random() * 700);
    };

    const quickActions = mode === 'global'
        ? [
            { icon: Mail, label: 'Email Support', message: 'How do I contact support via email?' },
            { icon: HelpCircle, label: 'Get Help', message: 'I need help with the platform' },
        ]
        : [
            { icon: Sparkles, label: 'Explain', message: 'Can you explain the key concepts?' },
            { icon: HelpCircle, label: 'Quiz Prep', message: 'How should I prepare for the quiz?' },
        ];

    return (
        <>
            {/* Chat Toggle Button */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        onClick={() => setIsOpen(true)}
                        className={`fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-transform hover:scale-105 ${
                            mode === 'course'
                                ? 'bg-gradient-to-br from-primary to-blue-500 shadow-[0_8px_30px_rgba(37,99,235,0.35)]'
                                : 'bg-gradient-to-br from-primary to-primary-hover shadow-[0_8px_30px_rgba(37,99,235,0.25)]'
                        }`}
                    >
                        <MessageCircle className="h-6 w-6 text-white" />
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="fixed bottom-6 right-6 z-50 flex h-[500px] w-[380px] flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_25px_60px_rgba(0,0,0,0.15)]"
                    >
                        {/* Header */}
                        <div className={`flex items-center justify-between px-5 py-4 text-white ${
                            mode === 'course'
                                ? 'bg-gradient-to-r from-primary to-blue-500'
                                : 'bg-gradient-to-r from-primary to-primary-hover'
                        }`}>
                            <div className="flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 backdrop-blur">
                                    <Bot className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold">
                                        {mode === 'course' ? 'Course Assistant' : 'Ignite Assistant'}
                                    </p>
                                    <p className="text-xs text-white/70">
                                        {mode === 'course' ? courseTitle : 'Help & Support'}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="rounded-full p-1 transition-colors hover:bg-white/20"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-3">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                                >
                                    <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                                        msg.role === 'assistant'
                                            ? mode === 'course'
                                                ? 'bg-blue-100 text-primary'
                                                : 'bg-blue-100 text-primary'
                                            : 'bg-slate-100 text-slate-600'
                                    }`}>
                                        {msg.role === 'assistant' ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                                    </div>
                                    <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                                        msg.role === 'user'
                                            ? 'bg-slate-900 text-white'
                                            : 'bg-slate-100 text-slate-700'
                                    }`}>
                                        {msg.content.split('\n').map((line, i) => (
                                            <p key={i} className={i > 0 ? 'mt-1' : ''}>{line}</p>
                                        ))}
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex gap-2">
                                    <div className={`flex h-7 w-7 items-center justify-center rounded-full ${
                                        mode === 'course' ? 'bg-blue-100 text-primary' : 'bg-blue-100 text-primary'
                                    }`}>
                                        <Bot className="h-4 w-4" />
                                    </div>
                                    <div className="rounded-2xl bg-slate-100 px-4 py-3">
                                        <div className="flex gap-1">
                                            <span className="h-2 w-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                                            <span className="h-2 w-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                                            <span className="h-2 w-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Quick Actions */}
                        {messages.length <= 1 && (
                            <div className="flex gap-2 px-4 pb-2">
                                {quickActions.map((action, i) => (
                                    <button
                                        key={i}
                                        onClick={() => {
                                            setInput(action.message);
                                            setTimeout(() => {
                                                setInput(action.message);
                                                handleSend();
                                            }, 50);
                                        }}
                                        className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:border-slate-300"
                                    >
                                        <action.icon className="h-3.5 w-3.5" />
                                        {action.label}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Input */}
                        <div className="border-t border-slate-100 p-3">
                            <form
                                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                                className="flex items-center gap-2"
                            >
                                <input
                                    ref={inputRef}
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder={mode === 'course' ? 'Ask about this course...' : 'Ask me anything...'}
                                    className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none transition-colors focus:border-slate-300 focus:bg-white"
                                />
                                <button
                                    type="submit"
                                    disabled={!input.trim()}
                                    className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all disabled:opacity-40 ${
                                        mode === 'course'
                                            ? 'bg-gradient-to-r from-primary to-blue-500 text-white shadow-sm hover:shadow-md'
                                            : 'bg-gradient-to-r from-primary to-primary-hover text-white shadow-sm hover:shadow-md'
                                    }`}
                                >
                                    <Send className="h-4 w-4" />
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
