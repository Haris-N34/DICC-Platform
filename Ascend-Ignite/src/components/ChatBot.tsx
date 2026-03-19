import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Bot, HelpCircle, Mail, MessageCircle, Send, Sparkles, User, X } from 'lucide-react';

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

interface QuickAction {
    icon: typeof Mail;
    label: string;
    message: string;
}

const COURSE_RESPONSES: Record<string, string[]> = {
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
        'Effective AI prompting is all about clarity and specificity. The more context you provide, the better the output.',
        'Always remember to fact-check AI-generated content. AI can hallucinate - meaning it can confidently present incorrect information as fact.',
        'Using AI responsibly means understanding its limitations, being transparent about its use, and ensuring your work reflects your own understanding.',
    ],
};

const GLOBAL_RESPONSES: Record<string, string> = {
    email: "I'd be happy to help with email! You can reach the Ascend Ignite team at support@ascendignite.com for any technical issues, or advising@ascendignite.com for academic guidance.",
    support: "For support, you can:\n- Email us at support@ascendignite.com\n- Visit our Community page for peer support\n- Check the FAQ section for common questions\n\nWhat specific issue are you experiencing?",
    certificate: 'Certificates are awarded upon completing a course and passing the quiz with 70% or higher. You can view and download your certificates from the Certificates page in the sidebar!',
    progress: 'Your progress is tracked automatically as you complete modules and quizzes. Check your Dashboard for an overview of your journey, including completed modules and quiz scores.',
    default: "I'm here to help! I can assist you with:\n- Course content questions\n- Email and support inquiries\n- Certificate information\n- Navigation help\n- General AI readiness questions\n\nWhat would you like to know?",
};

/**
 * Returns a random response from the provided response pool.
 */
function getRandomResponse(responsePool: string[]): string {
    return responsePool[Math.floor(Math.random() * responsePool.length)];
}

/**
 * Returns the response pool most relevant to the active course title.
 */
function getCourseResponsePool(courseTitle?: string): string[] {
    const normalizedTitle = courseTitle?.toLowerCase();

    if (normalizedTitle?.includes('confidence')) {
        return [...COURSE_RESPONSES.confidence, ...COURSE_RESPONSES.default];
    }

    if (normalizedTitle?.includes('uncertainty') || normalizedTitle?.includes('navigate')) {
        return [...COURSE_RESPONSES.uncertainty, ...COURSE_RESPONSES.default];
    }

    if (normalizedTitle?.includes('practical')) {
        return [...COURSE_RESPONSES.practical, ...COURSE_RESPONSES.default];
    }

    return COURSE_RESPONSES.default;
}

/**
 * Generates a course-specific assistant response while preserving the current keyword behavior.
 */
function getCourseResponse(message: string, courseTitle?: string): string {
    const normalizedMessage = message.toLowerCase();
    const responsePool = getCourseResponsePool(courseTitle);

    if (normalizedMessage.includes('help') || normalizedMessage.includes('explain') || normalizedMessage.includes('what')) {
        return getRandomResponse(responsePool);
    }

    if (normalizedMessage.includes('quiz') || normalizedMessage.includes('test')) {
        return 'The quiz at the end of this module will test your understanding of the key concepts. Make sure to review the scenario exercise and key takeaways before attempting it. You need 70% to pass!';
    }

    if (normalizedMessage.includes('thank')) {
        return "You're welcome! Keep up the great work on your learning journey. Feel free to ask if you have more questions!";
    }

    return getRandomResponse(responsePool);
}

/**
 * Generates a platform-wide support response based on simple keyword matching.
 */
function getGlobalResponse(message: string): string {
    const normalizedMessage = message.toLowerCase();

    if (normalizedMessage.includes('email') || normalizedMessage.includes('contact')) {
        return GLOBAL_RESPONSES.email;
    }

    if (
        normalizedMessage.includes('support') ||
        normalizedMessage.includes('help') ||
        normalizedMessage.includes('issue') ||
        normalizedMessage.includes('problem')
    ) {
        return GLOBAL_RESPONSES.support;
    }

    if (normalizedMessage.includes('certificate') || normalizedMessage.includes('cert') || normalizedMessage.includes('degree')) {
        return GLOBAL_RESPONSES.certificate;
    }

    if (normalizedMessage.includes('progress') || normalizedMessage.includes('track') || normalizedMessage.includes('dashboard')) {
        return GLOBAL_RESPONSES.progress;
    }

    if (normalizedMessage.includes('hello') || normalizedMessage.includes('hi') || normalizedMessage.includes('hey')) {
        return "Hello! Welcome to Ascend Ignite. I'm your AI assistant. How can I help you today?";
    }

    return GLOBAL_RESPONSES.default;
}

/**
 * Builds the initial assistant message when the chat window opens for the first time.
 */
function getWelcomeMessage(mode: ChatBotProps['mode'], courseTitle?: string, courseContext?: string): string {
    if (mode === 'course') {
        return `Hi! I'm your learning assistant for "${courseTitle}". ${courseContext ? `We are covering ${courseContext.toLowerCase()} ` : ''}Ask me anything about this course - concepts, scenarios, or quiz prep!`;
    }

    return "Hi! I'm your Ascend Ignite assistant. I can help with email, support, certificates, navigation, and more. How can I help?";
}

/**
 * Returns the shortcut actions shown before a conversation starts.
 */
function getQuickActions(mode: ChatBotProps['mode']): QuickAction[] {
    if (mode === 'global') {
        return [
            { icon: Mail, label: 'Email Support', message: 'How do I contact support via email?' },
            { icon: HelpCircle, label: 'Get Help', message: 'I need help with the platform' },
        ];
    }

    return [
        { icon: Sparkles, label: 'Explain', message: 'Can you explain the key concepts?' },
        { icon: HelpCircle, label: 'Quiz Prep', message: 'How should I prepare for the quiz?' },
    ];
}

/**
 * Builds a message object with a stable timestamp-based identifier.
 */
function createMessage(role: Message['role'], content: string, id: string): Message {
    return { id, role, content };
}

/**
 * Preserves the existing randomized assistant typing delay.
 */
function getAssistantResponseDelay(): number {
    return 800 + Math.random() * 700;
}

/**
 * Renders multi-line message content as stacked paragraphs.
 */
function MessageText({ content }: { content: string }) {
    return (
        <>
            {content.split('\n').map((line, index) => (
                <p key={index} className={index > 0 ? 'mt-1' : ''}>
                    {line}
                </p>
            ))}
        </>
    );
}

/**
 * Renders the three-dot typing indicator shown while the assistant is responding.
 */
function TypingIndicator() {
    return (
        <div className="rounded-2xl bg-slate-100 px-4 py-3">
            <div className="flex gap-1">
                <span className="h-2 w-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="h-2 w-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="h-2 w-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
        </div>
    );
}

/**
 * Displays the support chat widget for either a course or the general platform.
 */
export const ChatBot = ({ mode, courseTitle, courseContext }: ChatBotProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const quickActions = getQuickActions(mode);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    /**
     * Opens the chat and seeds the initial assistant message the first time it is shown.
     */
    const handleOpen = () => {
        if (messages.length === 0) {
            setMessages([
                createMessage('assistant', getWelcomeMessage(mode, courseTitle, courseContext), 'welcome'),
            ]);
        }

        setIsOpen(true);
    };

    /**
     * Appends a user message and schedules the assistant reply with the existing delay behavior.
     */
    const sendMessage = (messageText: string) => {
        const trimmedMessage = messageText.trim();

        if (!trimmedMessage) {
            return;
        }

        setMessages((previousMessages) => [
            ...previousMessages,
            createMessage('user', trimmedMessage, Date.now().toString()),
        ]);
        setInputValue('');
        setIsTyping(true);

        setTimeout(() => {
            const assistantResponse = mode === 'course'
                ? getCourseResponse(trimmedMessage, courseTitle)
                : getGlobalResponse(trimmedMessage);

            setMessages((previousMessages) => [
                ...previousMessages,
                createMessage('assistant', assistantResponse, (Date.now() + 1).toString()),
            ]);
            setIsTyping(false);
        }, getAssistantResponseDelay());
    };

    /**
     * Sends the current text box value if it contains a message.
     */
    const handleSubmit = () => {
        sendMessage(inputValue);
    };

    /**
     * Applies a quick action message and dispatches it using the current send flow.
     */
    const handleQuickAction = (message: string) => {
        setInputValue(message);
        setTimeout(() => {
            setInputValue(message);
            sendMessage(message);
        }, 50);
    };

    return (
        <>
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        onClick={handleOpen}
                        className={`fixed bottom-22 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-transform hover:scale-105 md:bottom-6 md:right-6 md:z-50 ${
                            mode === 'course'
                                ? 'bg-gradient-to-br from-primary to-blue-500 shadow-[0_8px_30px_rgba(37,99,235,0.35)]'
                                : 'bg-gradient-to-br from-primary to-primary-hover shadow-[0_8px_30px_rgba(37,99,235,0.25)]'
                        }`}
                    >
                        <MessageCircle className="h-6 w-6 text-white" />
                    </motion.button>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="fixed inset-x-0 bottom-0 z-50 flex h-[100dvh] w-full flex-col overflow-hidden bg-white shadow-[0_25px_60px_rgba(0,0,0,0.15)] md:inset-x-auto md:bottom-6 md:right-6 md:h-[500px] md:w-[380px] md:rounded-2xl md:border md:border-slate-200/80"
                    >
                        <div
                            className={`flex items-center justify-between px-5 py-4 text-white ${
                                mode === 'course'
                                    ? 'bg-gradient-to-r from-primary to-blue-500'
                                    : 'bg-gradient-to-r from-primary to-primary-hover'
                            }`}
                        >
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

                        <div className="flex-1 overflow-y-auto space-y-3 p-4">
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`flex gap-2 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
                                >
                                    <div
                                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                                            message.role === 'assistant'
                                                ? 'bg-blue-100 text-primary'
                                                : 'bg-slate-100 text-slate-600'
                                        }`}
                                    >
                                        {message.role === 'assistant' ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                                    </div>
                                    <div
                                        className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                                            message.role === 'user'
                                                ? 'bg-slate-900 text-white'
                                                : 'bg-slate-100 text-slate-700'
                                        }`}
                                    >
                                        <MessageText content={message.content} />
                                    </div>
                                </div>
                            ))}

                            {isTyping && (
                                <div className="flex gap-2">
                                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-primary">
                                        <Bot className="h-4 w-4" />
                                    </div>
                                    <TypingIndicator />
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {messages.length <= 1 && (
                            <div className="flex gap-2 px-4 pb-2">
                                {quickActions.map((action) => (
                                    <button
                                        key={action.label}
                                        onClick={() => handleQuickAction(action.message)}
                                        className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:border-slate-300 hover:bg-slate-50"
                                    >
                                        <action.icon className="h-3.5 w-3.5" />
                                        {action.label}
                                    </button>
                                ))}
                            </div>
                        )}

                        <div className="border-t border-slate-100 p-3">
                            <form
                                onSubmit={(event) => {
                                    event.preventDefault();
                                    handleSubmit();
                                }}
                                className="flex items-center gap-2"
                            >
                                <input
                                    ref={inputRef}
                                    value={inputValue}
                                    onChange={(event) => setInputValue(event.target.value)}
                                    placeholder={mode === 'course' ? 'Ask about this course...' : 'Ask me anything...'}
                                    className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none transition-colors focus:border-slate-300 focus:bg-white"
                                />
                                <button
                                    type="submit"
                                    disabled={!inputValue.trim()}
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
