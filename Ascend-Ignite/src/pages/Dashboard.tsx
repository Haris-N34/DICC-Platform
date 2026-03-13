import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trophy, ArrowRight, PlayCircle, Calendar, Sparkles, Zap } from 'lucide-react';
import { getProfile } from '../services/profileService';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '../components/Card';
import { Button } from '../components/Button';
import { ProgressBar } from '../components/ProgressBar';
import { moduleTemplates, mockEvents } from '../data/mockData';
import { getCompletedModuleIds, getQuizzesPassed } from '../services/progressService';

export const Dashboard = () => {
    const profile = getProfile();
    const completedIds = getCompletedModuleIds();
    const recommendedModule = moduleTemplates.find(m => !completedIds.includes(m.id)) || moduleTemplates[0];
    const upcomingEvents = mockEvents.slice(0, 2);
    const totalModules = moduleTemplates.length;
    const completedModules = completedIds.length;
    const quizzesPassed = getQuizzesPassed();
    const overallProgress = Math.round((completedModules / totalModules) * 100);
    const firstName = profile?.name?.trim().split(/\s+/)[0] || 'Explorer';

    if (!profile) return null;

    return (
        <div className="container mx-auto max-w-7xl px-4 py-8">
            <header className="mb-8">
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="lux-panel neon-border rounded-[30px] px-6 py-7 md:px-8"
                >
                    <div className="flex flex-col gap-6">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.34em] text-primary">Dashboard</p>
                            <h1 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">
                                Welcome back, <span className="text-primary">{firstName}</span>
                            </h1>
                            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
                                Pick up where you left off, keep your momentum visible, and move through the program one focused step at a time.
                            </p>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-3">
                            <StatPill label="Current track" value="AI Readiness" accent />
                            <StatPill label="Progress" value={`${overallProgress}%`} />
                            <StatPill label="Quizzes passed" value={String(quizzesPassed)} />
                        </div>
                    </div>
                </motion.div>
            </header>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.45fr)_340px]">
                <div className="space-y-6">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                        <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-slate-900">
                            <Sparkles className="h-5 w-5 text-primary" />
                            Continue Your Path
                        </h2>
                        <Card className="overflow-hidden neon-border group">
                            <div className="grid gap-0 md:grid-cols-[220px_minmax(0,1fr)]">
                                <div className="relative flex min-h-[200px] items-center justify-center overflow-hidden bg-[linear-gradient(180deg,rgba(37,99,235,0.88),rgba(30,64,175,0.96))] p-6 text-white">
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_50%)]" />
                                    <div className="relative z-10 text-center">
                                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                                            <PlayCircle className="h-8 w-8" />
                                        </div>
                                        <p className="text-xs uppercase tracking-[0.28em] text-white/80">Recommended next</p>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-between p-6 md:p-7">
                                    <div>
                                        <div className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-primary">Priority focus</div>
                                        <h3 className="text-2xl font-bold text-slate-900">{recommendedModule.title}</h3>
                                        <p className="mt-2 text-base leading-7 text-slate-600">{recommendedModule.description}</p>
                                    </div>
                                    <div className="mt-5 flex flex-wrap gap-3">
                                        <Link to={`/module/${recommendedModule.id}`}>
                                            <Button>Start Module</Button>
                                        </Link>
                                        <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                                            {recommendedModule.infographics.length} lessons
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                        <Card className="border-primary/10 bg-[linear-gradient(135deg,rgba(37,99,235,0.06),rgba(255,255,255,0.9))]">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-primary">
                                    <Zap className="h-5 w-5 text-primary" />
                                    Your AI-Readiness Profile
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="leading-8 text-slate-700">
                                    {profile.profileSummary || 'Complete more modules to build out your personalized profile summary.'}
                                </p>
                                <div className="mt-5 flex flex-wrap gap-3">
                                    <Tag>{profile.learningStyle || 'Adaptive'} Learner</Tag>
                                    <Tag>{profile.mindsetType || 'Growth-Oriented'}</Tag>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                        <div className="mb-5 flex items-end justify-between gap-4">
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900">Learning Path</h2>
                                <p className="mt-1 text-slate-600">Master each course to build your AI-readiness toolkit.</p>
                            </div>
                        </div>
                        <div className="grid gap-6 md:grid-cols-1">
                            {moduleTemplates.map((module, index) => {
                                const cardColor = 'bg-primary';
                                return (
                                    <motion.div
                                        key={module.id}
                                        whileHover={{ y: -4, scale: 1.01 }}
                                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                    >
                                        <Card className="group overflow-hidden neon-border hover:shadow-[0_20px_60px_rgba(37,99,235,0.12)]">
                                            <div className="grid gap-0 md:grid-cols-[200px_minmax(0,1fr)]">
                                                <div className="relative min-h-[180px] overflow-hidden">
                                                    {module.thumbnail ? (
                                                        <>
                                                            <img
                                                                src={module.thumbnail}
                                                                alt={module.title}
                                                                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                            />
                                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                                        </>
                                                    ) : (
                                                        <div className={`h-full w-full ${cardColor}`} />
                                                    )}
                                                    <div className="absolute top-3 left-3 z-10">
                                                        <span className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${cardColor} text-sm font-bold text-white shadow-lg`}>
                                                            {index + 1}
                                                        </span>
                                                    </div>
                                                    {module.thumbnail && (
                                                        <div className="absolute bottom-3 left-3 z-10">
                                                            <span className="flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-xs font-medium text-white backdrop-blur">
                                                                <PlayCircle className="h-3.5 w-3.5" /> Video
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex flex-col justify-between p-6 md:p-7">
                                                    <div>
                                                        <div className="mb-2 flex items-center gap-2">
                                                            <span className={`rounded-full ${cardColor} px-3 py-0.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white`}>
                                                                Course {index + 1}
                                                            </span>
                                                            <span className="text-xs text-slate-400">
                                                                {module.infographics.length} lessons
                                                            </span>
                                                        </div>
                                                        <h3 className="text-xl font-bold text-slate-900 transition-colors group-hover:text-primary">
                                                            {module.title}
                                                        </h3>
                                                        <p className="mt-1 text-sm font-semibold text-primary/80">
                                                            {module.topic}
                                                        </p>
                                                        <p className="mt-3 text-sm leading-6 text-slate-600 line-clamp-2">
                                                            {module.description}
                                                        </p>
                                                    </div>
                                                    <div className="mt-4">
                                                        <Link to={`/module/${module.id}`} className="w-full">
                                                            <Button
                                                                variant={index === 0 ? 'primary' : 'outline'}
                                                                className="w-full justify-between text-sm"
                                                            >
                                                                {index === 0 ? 'Continue Course' : 'Start Course'}
                                                                <ArrowRight className="h-4 w-4" />
                                                            </Button>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </Card>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>
                </div>

                <div className="space-y-6">
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                        <Card className="neon-border">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-slate-900">
                                    <Trophy className="h-5 w-5 text-primary" />
                                    Your Journey
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ProgressBar progress={overallProgress} showLabel />
                                <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                                    <InfoBlock value={`${completedModules}/${totalModules}`} label="Modules" />
                                    <InfoBlock value={String(quizzesPassed)} label="Quizzes Passed" />
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-slate-900">Community & Events</CardTitle>
                                <CardDescription>Upcoming opportunities to connect</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {upcomingEvents.map(event => (
                                    <div key={event.id} className="flex items-start gap-4 rounded-[22px] border border-white/70 bg-white/65 p-4 shadow-[0_16px_36px_rgba(15,23,42,0.04)]">
                                        <div className="mt-1 rounded-xl bg-primary/10 p-3 text-primary">
                                            <Calendar className="h-4 w-4" />
                                        </div>
                                        <div>
                                            <h4 className="line-clamp-1 text-sm font-semibold text-slate-900">{event.name}</h4>
                                            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-500">
                                                {new Date(event.date).toLocaleDateString()} &bull; {event.type === 'networking' ? 'Mixer' : 'Advising'}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                            <CardFooter>
                                <Link to="/community" className="w-full">
                                    <Button variant="ghost" className="group w-full justify-between text-sm">
                                        View all events
                                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </Button>
                                </Link>
                            </CardFooter>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

const Tag = ({ children }: { children: React.ReactNode }) => (
    <span className="rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
        {children}
    </span>
);

const StatPill = ({ label, value, accent }: { label: string, value: string, accent?: boolean }) => (
    <div className={`rounded-[22px] border px-5 py-4 shadow-[0_18px_36px_rgba(15,23,42,0.05)] ${accent ? 'border-blue-200/60 bg-blue-50' : 'border-white/70 bg-white/75'}`}>
        <p className="text-[11px] uppercase tracking-[0.24em] text-slate-500">{label}</p>
        <p className={`mt-2 text-xl font-bold ${accent ? 'text-primary' : 'text-slate-900'}`}>{value}</p>
    </div>
);

const InfoBlock = ({ value, label }: { value: string, label: string }) => (
    <div className="rounded-[22px] border border-white/70 bg-white/65 p-4">
        <p className="text-2xl font-bold text-slate-900">{value}</p>
        <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-500">{label}</p>
    </div>
);
