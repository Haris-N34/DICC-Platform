import { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Download, Lock } from 'lucide-react';
import { getProfile } from '../services/profileService';
import { moduleTemplates } from '../data/mockData';
import { Card, CardContent } from '../components/Card';
import { Button } from '../components/Button';
import { getCompletedModuleIds, getModuleProgress } from '../services/progressService';
import { appVisuals } from '../data/visuals';

const Certificate = ({ name, courseName, date, onDownload }: {
    name: string;
    courseName: string;
    date: string;
    onDownload: () => void;
}) => {
    return (
        <div className="relative">
            <div
                id={`cert-${courseName}`}
                className="relative mx-auto aspect-[1/1.2] w-full max-w-[700px] overflow-hidden rounded-2xl border-2 border-amber-200 bg-white p-5 shadow-[0_20px_60px_rgba(0,0,0,0.08)] sm:aspect-[1.414/1] md:p-12"
            >
                {/* Decorative border */}
                <div className="absolute inset-3 rounded-xl border-2 border-amber-100/60" />
                <div className="absolute inset-5 rounded-lg border border-amber-100/40" />

                {/* Corner ornaments */}
                <div className="absolute top-6 left-6 h-12 w-12 border-l-2 border-t-2 border-amber-300/60 rounded-tl-lg" />
                <div className="absolute top-6 right-6 h-12 w-12 border-r-2 border-t-2 border-amber-300/60 rounded-tr-lg" />
                <div className="absolute bottom-6 left-6 h-12 w-12 border-l-2 border-b-2 border-amber-300/60 rounded-bl-lg" />
                <div className="absolute bottom-6 right-6 h-12 w-12 border-r-2 border-b-2 border-amber-300/60 rounded-br-lg" />

                {/* Watermark */}
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.03]">
                    <Award className="h-64 w-64" />
                </div>

                <div className="relative flex h-full flex-col items-center justify-between text-center">
                    {/* Top Section */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-center gap-2">
                            <div className="h-px w-12 bg-gradient-to-r from-transparent to-amber-300" />
                            <Award className="h-8 w-8 text-amber-500" />
                            <div className="h-px w-12 bg-gradient-to-l from-transparent to-amber-300" />
                        </div>
                        <h3 className="text-xs font-bold uppercase tracking-[0.4em] text-amber-600">
                            Ascend Ignite
                        </h3>
                    </div>

                    {/* Certificate Title */}
                    <div className="space-y-4">
                        <h2 className="font-heading text-3xl font-bold text-slate-800 md:text-4xl">
                            Certificate of Completion
                        </h2>
                        <div className="h-px w-48 mx-auto bg-gradient-to-r from-transparent via-amber-300 to-transparent" />
                        <p className="text-sm text-slate-500">This is to certify that</p>
                        <p className="font-heading text-2xl font-bold text-slate-900 md:text-3xl">
                            {name}
                        </p>
                        <p className="text-sm text-slate-500">
                            has successfully completed the course
                        </p>
                        <p className="font-heading text-xl font-bold bg-gradient-to-r text-primary md:text-2xl">
                            {courseName}
                        </p>
                    </div>

                    {/* Bottom Section */}
                    <div className="w-full space-y-4">
                        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-12">
                            <div className="text-center">
                                <div className="h-px w-28 bg-slate-300 mb-2 sm:w-32" />
                                <p className="text-xs text-slate-500">Date Completed</p>
                                <p className="text-sm font-semibold text-slate-700">{date}</p>
                            </div>
                            <div className="text-center">
                                <div className="h-px w-28 bg-slate-300 mb-2 sm:w-32" />
                                <p className="text-xs text-slate-500">Program Director</p>
                                <p className="text-sm font-semibold text-slate-700">Ascend Ignite</p>
                            </div>
                        </div>
                        <p className="text-[10px] tracking-[0.2em] uppercase text-slate-400">
                            Certificate ID: AI-{Date.now().toString(36).toUpperCase()}
                        </p>
                    </div>
                </div>
            </div>
            <div className="mt-4 flex justify-center">
                <Button
                    onClick={onDownload}
                    variant="outline"
                    size="sm"
                    className="gap-2"
                >
                    <Download className="h-4 w-4" /> Download Certificate
                </Button>
            </div>
        </div>
    );
};

export const Certificates = () => {
    const profile = getProfile();
    const [selectedCert, setSelectedCert] = useState<string | null>(null);

    if (!profile) return null;

    const completedModules = getCompletedModuleIds();

    const handleDownload = () => {
        // Simple print-based download
        window.print();
    };

    return (
        <div className="container mx-auto max-w-6xl px-4 py-8">
            <header className="mb-10 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <p className="text-xs uppercase tracking-[0.34em] text-primary font-semibold">Achievements</p>
                    <h1 className="mt-3 text-4xl font-bold text-slate-900 md:text-5xl">
                        Your <span className="bg-gradient-to-r from-primary to-primary-hover bg-clip-text text-transparent">Certificates</span>
                    </h1>
                    <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
                        Complete courses and quizzes to earn professional certificates that showcase your AI-readiness skills.
                    </p>
                </motion.div>
                <div className="app-photo-frame rounded-[22px] md:rounded-[30px]">
                    <img src={appVisuals.certificates.src} alt={appVisuals.certificates.alt} className="h-[200px] w-full object-cover md:h-[300px]" />
                    <div className="absolute inset-x-0 bottom-0 z-10 p-6 text-white">
                        <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-blue-100">{appVisuals.certificates.eyebrow}</p>
                        <p className="mt-3 max-w-md text-sm leading-6 text-white/90">{appVisuals.certificates.description}</p>
                    </div>
                </div>
            </header>

            {selectedCert ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <button
                        onClick={() => setSelectedCert(null)}
                        className="mb-6 text-sm font-medium text-primary hover:text-primary-hover"
                    >
                        &larr; Back to all certificates
                    </button>
                    <Certificate
                        name={profile.name}
                        courseName={moduleTemplates.find(m => m.id === selectedCert)?.title || 'Course'}
                        date={(() => {
                            const mp = getModuleProgress(selectedCert);
                            const d = mp?.completedAt ? new Date(mp.completedAt) : new Date();
                            return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
                        })()}
                        onDownload={handleDownload}
                    />
                </motion.div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {moduleTemplates.map((module, index) => {
                        const isCompleted = completedModules.includes(module.id);
                        return (
                            <motion.div
                                key={module.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card className={`relative overflow-hidden transition-all ${isCompleted ? 'neon-border cursor-pointer hover:shadow-[0_20px_60px_rgba(37,99,235,0.12)]' : 'opacity-75'}`}>
                                    <div className="h-2 bg-primary" />
                                    <CardContent className="p-6 text-center">
                                        <div className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full ${isCompleted ? 'bg-gradient-to-br from-blue-100 to-blue-200 text-primary' : 'bg-slate-100 text-slate-400'}`}>
                                            {isCompleted ? (
                                                <Award className="h-8 w-8" />
                                            ) : (
                                                <Lock className="h-6 w-6" />
                                            )}
                                        </div>
                                        <h3 className="font-heading text-lg font-bold text-slate-900">{module.title}</h3>
                                        <p className="mt-2 text-sm text-slate-500">{module.topic}</p>
                                        <div className="mt-4">
                                            {isCompleted ? (
                                                <Button
                                                    size="sm"
                                                    onClick={() => setSelectedCert(module.id)}
                                                    className="w-full bg-gradient-to-r from-primary to-primary-hover shadow-[0_8px_25px_rgba(37,99,235,0.28)]"
                                                >
                                                    View Certificate
                                                </Button>
                                            ) : (
                                                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                                                    Complete course to unlock
                                                </p>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};
