import { Suspense, lazy, useMemo, useRef, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
    ArrowRight,
    Target,
    Users,
    ChevronDown,
    Brain,
    Flame,
} from 'lucide-react';
import { Button } from '../components/Button';
import { FeatureSteps } from '../components/FeatureSteps';
import { LandingNavbar } from '../components/LandingNavbar';
import { VerticalCutReveal } from '../components/VerticalCutReveal';
import { appVisuals } from '../data/visuals';
import { getProfile } from '../services/profileService';

const HeroSpline = lazy(() =>
    import('../components/HeroSpline').then((module) => ({ default: module.HeroSpline }))
);

const isMobileDevice = () =>
    typeof window !== 'undefined' && window.innerWidth <= 768;

const faqs = [
    { q: 'Who is Ascend Ignite for?', a: 'College students and early-career professionals who want to feel confident about their future in an AI-driven job market.' },
    { q: 'How long does it take?', a: 'Each course is about 15-20 minutes. You can finish the whole program in under an hour.' },
    { q: 'Do the certificates mean anything?', a: 'They prove you completed our AI-readiness curriculum. Add them to LinkedIn or share with employers.' },
    { q: 'What does it cost?', a: 'Nothing. It\'s free.' },
];

export const Landing = () => {
    const profile = getProfile();
    const isMobile = useMemo(() => isMobileDevice(), []);
    const revealRef = useRef<HTMLElement | null>(null);
    const { scrollYProgress } = useScroll({
        target: revealRef,
        offset: ['start start', 'end end'],
    });
    const introOverlayOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [0, 0.06, 0.12]);
    const contentY = useTransform(scrollYProgress, [0, 1], ['14vh', '0vh']);
    const contentOpacity = useTransform(scrollYProgress, [0, 0.25, 1], [0.84, 0.94, 1]);

    if (profile) {
        return <Navigate to="/dashboard" replace />;
    }

    return (
        <div className="flex min-h-screen flex-col">
            <LandingNavbar />

            {isMobile ? (
                <>
                    {/* ── Mobile Hero ── */}
                    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#bfe9ff_0%,#87cefa_34%,#a8d8f8_60%,#dfeffd_82%,#ffffff_100%)] pt-24 pb-10">
                        {/* Decorative radials */}
                        <div className="pointer-events-none absolute inset-0">
                            <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-white/20 blur-3xl" />
                            <div className="absolute top-1/3 -right-16 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
                        </div>

                        <div className="relative z-10 px-5">
                            {/* Brand mark */}
                            <motion.div
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="mb-6 flex items-center gap-3"
                            >
                                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-white shadow-[0_8px_24px_rgba(37,99,235,0.35)]">
                                    <Flame className="h-5 w-5" />
                                </div>
                                <span className="font-heading text-xl font-bold text-slate-900">Ascend Ignite</span>
                            </motion.div>

                            {/* Headline */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.55, delay: 0.1 }}
                            >
                                <h1 className="max-w-sm text-[1.75rem] font-bold leading-[1.2] text-slate-950 font-heading">
                                    Career readiness through AI literacy, advising, and real&#8209;world momentum.
                                </h1>
                                <p className="mt-3 max-w-sm text-[15px] leading-7 text-slate-600">
                                    Build confidence through three guided modules focused on AI literacy, career readiness, and practical student outcomes.
                                </p>
                            </motion.div>

                            {/* CTA */}
                            <motion.div
                                initial={{ opacity: 0, y: 14 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.45, delay: 0.25 }}
                                className="mt-6 flex items-center gap-4"
                            >
                                <Link to="/signup">
                                    <Button size="lg" className="gap-2 text-base">
                                        Start for free <ArrowRight className="h-4 w-4" />
                                    </Button>
                                </Link>
                                <span className="text-xs text-slate-500">No credit card.</span>
                            </motion.div>

                            {/* Stat chips */}
                            <motion.div
                                initial={{ opacity: 0, y: 14 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.45, delay: 0.35 }}
                                className="mt-8 grid grid-cols-2 gap-3"
                            >
                                {[
                                    { label: 'Fast path', value: '3 guided modules' },
                                    { label: 'Practical support', value: 'Events + advising' },
                                ].map((item) => (
                                    <div key={item.label} className="rounded-2xl border border-white/50 bg-white/60 p-4 backdrop-blur-lg shadow-[0_8px_24px_rgba(15,23,42,0.06)]">
                                        <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-primary">{item.label}</p>
                                        <p className="mt-2 text-base font-bold text-slate-900">{item.value}</p>
                                    </div>
                                ))}
                            </motion.div>

                            {/* Hero image */}
                            <motion.div
                                initial={{ opacity: 0, y: 18 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.45 }}
                                className="mt-8"
                            >
                                <div className="app-photo-frame rounded-2xl">
                                    <img
                                        src={appVisuals.community.hero.src}
                                        alt={appVisuals.community.hero.alt}
                                        className="h-48 w-full object-cover"
                                    />
                                    <div className="absolute inset-x-0 bottom-0 z-10 p-4 text-white">
                                        <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-blue-100">Career-ready community</p>
                                        <p className="mt-1.5 text-sm leading-6 text-white/90">
                                            Learn with context, then apply it through community, advising, and visible progress.
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </section>

                    <div className="relative h-10 overflow-hidden">
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(244,248,255,0.75)_55%,#f8fbff_100%)]" />
                        <div className="absolute inset-x-0 top-1/2 mx-auto h-px w-[88%] -translate-y-1/2 bg-[linear-gradient(90deg,transparent,rgba(37,99,235,0.16),transparent)]" />
                    </div>
                </>
            ) : (
                <>
                    {/* ── Desktop Hero ── */}
                    <section ref={revealRef} className="relative min-h-[152vh] overflow-hidden">
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,#bfe9ff_0%,#87cefa_34%,#9fd7fb_54%,#dfeffd_72%,#ffffff_100%)]" />

                        <div className="relative z-10 flex min-h-[152vh] flex-col">
                            <motion.div
                                initial={{ opacity: 0, y: 18 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.55 }}
                                className="sticky top-0 flex min-h-screen flex-col overflow-hidden"
                            >
                                <div className="absolute inset-x-0 bottom-0 z-10 h-24 bg-[linear-gradient(180deg,rgba(135,206,250,0),rgba(135,206,250,0.78)_72%,rgba(135,206,250,0.97)_100%)]" />
                                <motion.div
                                    style={{ opacity: introOverlayOpacity }}
                                    className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_50%_50%,transparent_22%,rgba(15,23,42,0.24)_100%)]"
                                />

                                <div className="relative flex min-h-screen flex-col justify-end">
                                    <div className="pointer-events-none absolute inset-0">
                                        <Suspense
                                            fallback={
                                                <div className="flex h-full items-center justify-center px-8 text-center text-sm font-medium uppercase tracking-[0.24em] text-slate-500">
                                                    Loading ascend ignite experience
                                                </div>
                                            }
                                        >
                                            <HeroSpline />
                                        </Suspense>
                                    </div>
                                    <div className="relative z-10 flex justify-center pb-5">
                                        <div className="h-11 w-[1px] bg-gradient-to-b from-transparent via-blue-300/80 to-transparent" />
                                    </div>
                                </div>
                            </motion.div>

                            {/* Hero card */}
                            <motion.div
                                style={{ y: contentY, opacity: contentOpacity }}
                                className="relative z-20 -mt-10 px-6 pb-5"
                            >
                                <div className="mx-auto max-w-4xl rounded-[32px] border border-white/40 bg-white/50 p-7 shadow-[0_24px_64px_rgba(15,23,42,0.08)] backdrop-blur-2xl backdrop-saturate-150">
                                    <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-primary">Ascend Ignite</p>
                                    <h1 className="max-w-2xl text-5xl text-slate-950 leading-[1.15]">
                                        <VerticalCutReveal
                                            splitBy="words"
                                            staggerDuration={0.08}
                                            transition={{ type: 'spring', stiffness: 200, damping: 21 }}
                                        >
                                            Career readiness for students through AI literacy, advising, and real-world momentum.
                                        </VerticalCutReveal>
                                    </h1>
                                    <p className="mt-3 max-w-lg text-base leading-7 text-slate-500">
                                        Build confidence through three guided modules focused on AI literacy, career readiness, and practical student outcomes.
                                    </p>
                                    <div className="mt-4 flex items-center gap-4">
                                        <Link to="/signup">
                                            <Button size="lg" className="gap-2">
                                                Start for free <ArrowRight className="h-4 w-4" />
                                            </Button>
                                        </Link>
                                        <span className="text-xs text-slate-400">No credit card. No catch.</span>
                                    </div>
                                    <div className="mt-6 grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
                                        <div className="app-photo-frame rounded-[26px]">
                                            <img
                                                src={appVisuals.community.hero.src}
                                                alt={appVisuals.community.hero.alt}
                                                className="h-64 w-full object-cover"
                                            />
                                            <div className="absolute inset-x-0 bottom-0 z-10 p-5 text-white">
                                                <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-blue-100">Career-ready community</p>
                                                <p className="mt-2 max-w-md text-sm leading-6 text-white/90">
                                                    Learn with context, then apply it through community, advising, and visible progress.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="grid gap-4 md:grid-cols-1">
                                            {[
                                                { label: 'Fast path', value: '3 guided modules' },
                                                { label: 'Practical support', value: 'Events + advising' },
                                            ].map((item) => (
                                                <div key={item.label} className="app-photo-chip rounded-[24px] p-5">
                                                    <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-primary">{item.label}</p>
                                                    <p className="mt-3 text-lg font-bold text-slate-900">{item.value}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </section>

                    <div className="relative h-28 overflow-hidden">
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(244,248,255,0.75)_55%,#f8fbff_100%)]" />
                        <div className="absolute inset-x-0 top-1/2 mx-auto h-px w-[min(88%,920px)] -translate-y-1/2 bg-[linear-gradient(90deg,transparent,rgba(37,99,235,0.16),transparent)]" />
                    </div>
                </>
            )}

            {/* ── What you get ── */}
            <section className="relative overflow-hidden pt-18 pb-14 md:pt-24 md:pb-18">
                <div className="absolute inset-0 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_50%,#eef5ff_100%)]" />
                <div className="relative z-10 container mx-auto max-w-5xl px-4 md:px-6">
                    <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <div>
                                <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-primary">What you get</p>
                                <h2 className="mt-3 max-w-md text-3xl font-bold text-slate-950 md:text-4xl">
                                    Not another course library.
                                </h2>
                                <p className="mt-4 max-w-lg text-base leading-7 text-slate-500">
                                    Ascend Ignite combines short learning modules, AI-career context, and live support so students can move from uncertainty to clear next steps.
                                </p>
                            </div>

                            <div className="app-photo-frame rounded-[28px]">
                                <div
                                    aria-label={appVisuals.signup.alt}
                                    className="relative h-64 w-full overflow-hidden bg-[linear-gradient(145deg,#020617_0%,#081225_45%,#0f172a_100%)]"
                                >
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(96,165,250,0.22),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(37,99,235,0.16),transparent_30%)]" />
                                    <div className="absolute inset-4 flex items-center justify-center rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(2,6,23,0.82),rgba(15,23,42,0.64))] px-10 py-8 text-center shadow-[0_20px_50px_rgba(2,6,23,0.45)] backdrop-blur-xl">
                                        <h3 className="max-w-[290px] text-[2rem] leading-[1.08] text-white [font-family:var(--font-accent)] italic">
                                            Career clarity, structured guidance, visible progress.
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <div className="space-y-5">
                            <div className="grid gap-4 sm:grid-cols-3 md:grid-cols-3">
                        {[
                            { icon: <Target className="h-5 w-5" />, title: 'Career pathways', desc: 'Structured modules that move you from "I don\'t know what I\'m doing" to interview-ready.' },
                            { icon: <Brain className="h-5 w-5" />, title: <>AI<br />fluency</>, desc: 'Learn what AI can and can\'t do, how to use it well, and why your human skills still matter.' },
                            { icon: <Users className="h-5 w-5" />, title: 'Real community', desc: 'Networking events, advisor sessions, and peers who are figuring it out alongside you.' },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08 }}
                                className="flex h-full flex-col rounded-[24px] border border-white/50 bg-white/50 p-6 backdrop-blur-xl shadow-[0_4px_24px_rgba(15,23,42,0.04)]"
                            >
                                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/8 text-primary">
                                    {item.icon}
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 md:min-h-[4rem]">{item.title}</h3>
                                <p className="mt-2 text-sm leading-6 text-slate-500 md:min-h-[7.5rem]">{item.desc}</p>
                            </motion.div>
                        ))}
                            </div>

                            <div className="grid gap-4 sm:grid-cols-3">
                                {[
                                    { value: '3', label: 'guided courses' },
                                    { value: '< 1 hr', label: 'to complete the core path' },
                                    { value: 'Live', label: 'community and advising support' },
                                ].map((item) => (
                                    <div key={item.label} className="app-photo-chip rounded-[24px] p-5">
                                        <p className="text-2xl font-bold text-slate-900">{item.value}</p>
                                        <p className="mt-2 text-sm leading-6 text-slate-500">{item.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="relative h-8 overflow-hidden md:h-10">
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(238,245,255,0.18)_0%,rgba(238,245,255,0.72)_100%)]" />
                <div className="absolute inset-x-0 bottom-0 mx-auto h-px w-[min(88%,860px)] bg-[linear-gradient(90deg,transparent,rgba(37,99,235,0.12),transparent)]" />
            </div>

            {/* ── How it works — FeatureSteps ── */}
            <section className="relative -mt-2 pt-2 md:-mt-3 md:pt-4">
                <div className="absolute inset-0 bg-[linear-gradient(180deg,#eef5ff_0%,#f8fbff_50%,#ffffff_100%)] pointer-events-none" />
                <div className="relative z-10">
                    <FeatureSteps
                        title="How it works"
                        autoPlayInterval={4000}
                        features={[
                            {
                                step: 'Step 1',
                                title: 'Find your starting point',
                                content: 'Quick onboarding quiz figures out where you are and recommends what to focus on first.',
                                image: appVisuals.landing.featureSteps[0],
                            },
                            {
                                step: 'Step 2',
                                title: 'Learn through real scenarios',
                                content: 'Short courses with videos, interactive exercises, and scenario-based learning — not just reading.',
                                image: appVisuals.landing.featureSteps[1],
                            },
                            {
                                step: 'Step 3',
                                title: 'Prove what you know',
                                content: 'Pass the quizzes, earn certificates, and share them with employers or on LinkedIn.',
                                image: appVisuals.landing.featureSteps[2],
                            },
                        ]}
                    />
                </div>
            </section>

            {/* ── What's included strip ── */}
            <section className="relative overflow-hidden py-8">
                <div className="absolute inset-0 bg-slate-900" />
                <div className="relative z-10 container mx-auto px-4 md:px-6">
                    <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
                        {['3 courses', 'Certificates', 'Quizzes', 'AI chatbot', 'Community', 'Advising'].map((item) => (
                            <span key={item} className="text-sm text-slate-400">
                                {item}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FAQ ── */}
            <section className="relative overflow-hidden py-12 md:py-16">
                <div className="absolute inset-0 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)]" />
                <div className="relative z-10 container mx-auto max-w-2xl px-4 md:px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-8"
                    >
                        <h2 className="text-2xl font-bold text-slate-950 md:text-3xl">Frequently asked questions</h2>
                    </motion.div>

                    <div className="space-y-2">
                        {faqs.map((faq, i) => (
                            <FaqItem key={i} question={faq.q} answer={faq.a} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Final CTA ── */}
            <section className="relative overflow-hidden py-12 md:py-16">
                <div className="absolute inset-0 bg-[linear-gradient(180deg,#f8fbff_0%,#eef5ff_100%)]" />
                <div className="relative z-10 container mx-auto max-w-xl px-4 md:px-6 text-center">
                    <h2 className="text-3xl font-bold text-slate-950 md:text-4xl">Start building your future.</h2>
                    <p className="mt-3 text-base text-slate-500">Free. No fluff. Takes less than an hour.</p>
                    <Link to="/signup" className="mt-6 inline-block">
                        <Button size="lg" className="gap-2 px-8">
                            Create your account <ArrowRight className="h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            </section>

            {/* ── Footer ── */}
            <footer className="border-t border-slate-200/60 bg-white">
                <div className="container mx-auto max-w-6xl px-4 py-12 md:px-6">
                    <div className="grid grid-cols-2 gap-8 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:gap-10">
                        {/* Brand */}
                        <div className="col-span-2 md:col-span-1">
                            <div className="flex items-center gap-2.5 mb-4">
                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white">
                                    <Flame className="h-4.5 w-4.5" />
                                </div>
                                <span className="font-heading text-lg font-bold text-slate-900">Ascend Ignite</span>
                            </div>
                            <p className="text-sm leading-6 text-slate-500 max-w-xs">
                                Helping students build the skills and confidence to thrive in an AI-driven career landscape.
                            </p>
                        </div>

                        {/* Platform */}
                        <div>
                            <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400 mb-4">Platform</h4>
                            <ul className="space-y-2.5">
                                <li><Link to="/signup" className="text-sm text-slate-600 hover:text-primary transition-colors">Courses</Link></li>
                                <li><Link to="/signup" className="text-sm text-slate-600 hover:text-primary transition-colors">Certificates</Link></li>
                                <li><Link to="/signup" className="text-sm text-slate-600 hover:text-primary transition-colors">Community</Link></li>
                            </ul>
                        </div>

                        {/* Resources */}
                        <div>
                            <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400 mb-4">Resources</h4>
                            <ul className="space-y-2.5">
                                <li><Link to="/signup" className="text-sm text-slate-600 hover:text-primary transition-colors">Get started</Link></li>
                                <li><span className="text-sm text-slate-600">FAQ</span></li>
                                <li><span className="text-sm text-slate-600">Contact</span></li>
                            </ul>
                        </div>

                        {/* Connect */}
                        <div>
                            <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400 mb-4">Connect</h4>
                            <ul className="space-y-2.5">
                                <li><span className="text-sm text-slate-600">support@ascendignite.com</span></li>
                                <li><span className="text-sm text-slate-600">advising@ascendignite.com</span></li>
                            </ul>
                        </div>
                    </div>

                    {/* Bottom bar */}
                    <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-slate-100 pt-6 md:flex-row">
                        <p className="text-xs text-slate-400">&copy; {new Date().getFullYear()} Ascend Ignite. All rights reserved.</p>
                        <div className="flex gap-6">
                            <span className="text-xs text-slate-400 hover:text-slate-600 cursor-pointer transition-colors">Privacy</span>
                            <span className="text-xs text-slate-400 hover:text-slate-600 cursor-pointer transition-colors">Terms</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

const FaqItem = ({ question, answer }: { question: string; answer: string }) => {
    const [open, setOpen] = useState(false);

    return (
        <button
            onClick={() => setOpen(!open)}
            className="w-full text-left rounded-2xl border border-slate-200/60 bg-white px-5 py-4 transition-shadow hover:shadow-[0_4px_16px_rgba(15,23,42,0.04)]"
        >
            <div className="flex items-center justify-between gap-4">
                <span className="text-sm font-semibold text-slate-800">{question}</span>
                <motion.div
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0 text-slate-400"
                >
                    <ChevronDown className="h-4 w-4" />
                </motion.div>
            </div>
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                    >
                        <p className="pt-2 text-sm leading-6 text-slate-500">{answer}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </button>
    );
};
