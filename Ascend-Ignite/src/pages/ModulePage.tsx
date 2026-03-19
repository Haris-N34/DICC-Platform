import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Target, Brain, Info, ArrowRight } from 'lucide-react';
import { getProfile } from '../services/profileService';
import { moduleTemplates } from '../data/mockData';

import { Card, CardHeader, CardTitle, CardContent } from '../components/Card';
import { Button } from '../components/Button';
import { ChatBot } from '../components/ChatBot';
import VideoPlayer from '../components/VideoPlayer';

export const ModulePage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const profile = getProfile();
    const moduleData = moduleTemplates.find(m => m.id === id) || null;
    const [activeScenario, setActiveScenario] = useState<number | null>(null);
    const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);
    const videoPlaylist = moduleData?.videoPlaylist ?? [];
    const selectedVideo = videoPlaylist[selectedVideoIndex] ?? null;

    useEffect(() => {
        if (!moduleData) {
            void navigate('/dashboard');
        }
    }, [moduleData, navigate]);

    useEffect(() => {
        setSelectedVideoIndex(0);
    }, [id]);

    if (!profile || !moduleData) return null;

    return (
        <div className="container mx-auto max-w-6xl space-y-8 px-4 py-6 md:space-y-10 md:py-8">
            <header className="text-center">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-3xl">
                    <p className="text-xs uppercase tracking-[0.3em] text-primary font-semibold">Course Experience</p>
                    <h1 className="mt-3 text-2xl font-bold text-slate-900 md:mt-4 md:text-6xl">{moduleData.title}</h1>
                    <p className="mt-2 text-base leading-7 text-primary/80 font-medium md:mt-4 md:text-lg md:leading-8">{moduleData.topic}</p>
                </motion.div>
            </header>

            <motion.section
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
            >
                <div className="space-y-4">
                    {selectedVideo ? (
                        <>
                            <VideoPlayer src={selectedVideo.src} poster={moduleData.thumbnail} />
                            {videoPlaylist.length > 1 && (
                                <Card className="neon-border">
                                    <CardHeader>
                                        <CardTitle className="text-lg">Lesson Videos</CardTitle>
                                    </CardHeader>
                                    <CardContent className="grid gap-3 sm:grid-cols-2">
                                        {videoPlaylist.map((video, index) => (
                                            <button
                                                key={video.src}
                                                type="button"
                                                onClick={() => setSelectedVideoIndex(index)}
                                                className={`rounded-[20px] border px-4 py-4 text-left transition-all ${
                                                    index === selectedVideoIndex
                                                        ? 'border-primary bg-primary text-white shadow-[0_18px_42px_rgba(37,99,235,0.22)]'
                                                        : 'border-slate-200/70 bg-white text-slate-700 hover:border-primary/40 hover:bg-slate-50'
                                                }`}
                                            >
                                                <p className="text-xs font-semibold uppercase tracking-[0.22em] opacity-75">
                                                    Video {index + 1}
                                                </p>
                                                <p className="mt-2 text-sm font-semibold">{video.title}</p>
                                            </button>
                                        ))}
                                    </CardContent>
                                </Card>
                            )}
                        </>
                    ) : moduleData.videoUrl ? (
                        <VideoPlayer src={moduleData.videoUrl} poster={moduleData.thumbnail} />
                    ) : (
                        <Card className="overflow-hidden neon-border">
                            <div className="relative">
                                <img
                                    src={moduleData.thumbnail}
                                    alt={moduleData.title}
                                    className="aspect-video w-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/20 to-transparent" />
                                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-blue-200">
                                        Video coming soon
                                    </p>
                                    <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-100/90">
                                        This module does not have a local lesson video yet. The placeholder cartoon clip has been removed.
                                    </p>
                                </div>
                            </div>
                        </Card>
                    )}
                </div>
            </motion.section>

            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-5"
            >
                <h2 className="flex items-center gap-2 text-2xl font-bold">
                    <Info className="h-6 w-6 text-primary" /> Key Concepts
                </h2>
                <div className="grid gap-6 md:grid-cols-2">
                    {moduleData.infographics.map((info, i) => (
                        <Card key={i} className="neon-border bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(37,99,235,0.03))] hover:shadow-[0_12px_40px_rgba(37,99,235,0.1)] transition-shadow">
                            <CardHeader>
                                <CardTitle className="text-lg">{info.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="leading-7 text-slate-600">{info.content}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </motion.section>

            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                <Card className="neon-border bg-[linear-gradient(135deg,rgba(37,99,235,0.04),rgba(96,165,250,0.04),rgba(255,255,255,0.92))]">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-xl text-primary">
                            <Target className="h-6 w-6 text-primary" /> Scenario Exercise
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="rounded-[24px] border border-blue-100/50 bg-white/90 p-6 text-lg leading-8 text-slate-800 shadow-[0_18px_42px_rgba(15,23,42,0.05)]">
                            {moduleData.scenario.context}
                        </div>

                        <div className="space-y-3">
                            {moduleData.scenario.options.map((opt, i) => (
                                <div key={i}>
                                    <button
                                        onClick={() => setActiveScenario(i)}
                                        className={`w-full rounded-[24px] border p-5 text-left transition-all ${activeScenario === i
                                            ? 'border-primary bg-primary text-white shadow-[0_18px_42px_rgba(37,99,235,0.22)]'
                                            : 'border-white/70 bg-white/80 text-slate-700 hover:border-primary/40 hover:bg-white'
                                            }`}
                                    >
                                        {opt.text}
                                    </button>

                                    {activeScenario === i && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            className="mt-2 rounded-[22px] border border-blue-100 bg-blue-50/50 p-4 text-slate-700"
                                        >
                                            <span className="mr-2 font-bold text-primary">Feedback:</span>
                                            {opt.feedback}
                                        </motion.div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </motion.section>

            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="rounded-[24px] bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 p-6 text-white md:rounded-[34px] md:p-12 relative overflow-hidden"
            >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(37,99,235,0.1),transparent_40%),radial-gradient(circle_at_80%_50%,rgba(96,165,250,0.08),transparent_40%)]" />
                <div className="relative flex flex-col items-center space-y-8 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/20 text-blue-400 shadow-[0_0_30px_rgba(37,99,235,0.2)]">
                        <Brain className="h-8 w-8" />
                    </div>
                    <div>
                        <h2 className="mb-6 text-3xl font-bold">Key Takeaways</h2>
                        <ul className="mx-auto max-w-2xl space-y-4 text-left">
                            {moduleData.keyTakeaways.map((takeaway, i) => (
                                <li key={i} className="flex gap-3">
                                    <div className="mt-2 h-2 w-2 shrink-0 rounded-full bg-blue-400 shadow-[0_0_6px_rgba(37,99,235,0.6)]" />
                                    <span className="text-lg leading-8 text-slate-200">{takeaway}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="h-px w-full bg-primary/20" />

                    <div className="pt-2">
                        <h3 className="mb-4 text-xl font-bold">Ready to test your knowledge?</h3>
                        <Link to={`/module/${moduleData.id}/quiz`}>
                            <Button size="lg" className="w-full px-12 text-lg sm:w-auto bg-primary hover:bg-primary-hover shadow-[0_0_30px_rgba(37,99,235,0.3)]">
                                Start Course Quiz <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </motion.section>

            <ChatBot
                mode="course"
                courseTitle={moduleData.title}
                courseContext={moduleData.description}
            />
        </div>
    );
};
