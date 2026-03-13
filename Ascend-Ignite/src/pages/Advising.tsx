import { useState } from 'react';
import { motion } from 'framer-motion';
import { Presentation, Calendar, Clock, Video, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '../components/Card';
import { Button } from '../components/Button';
import { mockEvents } from '../data/mockData';
import { appVisuals } from '../data/visuals';

export const Advising = () => {
    const events = mockEvents.filter(e => e.type === 'advising');
    const [registeredEvents, setRegisteredEvents] = useState<Record<string, boolean>>({});

    const handleRegister = (id: string) => {
        setRegisteredEvents(prev => ({ ...prev, [id]: true }));
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-5xl">
            <div className="mb-8 grid gap-6 md:grid-cols-[0.9fr_1.1fr] md:items-center">
                <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Presentation className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold font-heading text-slate-900">Group Advising Sessions</h1>
                        <p className="text-slate-600">Strategic career planning in an AI-driven market.</p>
                    </div>
                </div>
                <div className="app-photo-frame rounded-[28px]">
                    <img src={appVisuals.advising.hero.src} alt={appVisuals.advising.hero.alt} className="h-[260px] w-full object-cover" />
                    <div className="absolute inset-x-0 bottom-0 z-10 p-6 text-white">
                        <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-blue-100">{appVisuals.advising.hero.eyebrow}</p>
                        <p className="mt-3 max-w-md text-sm leading-6 text-white/90">{appVisuals.advising.hero.description}</p>
                    </div>
                </div>
            </div>

            <div className="grid gap-6">
                {events.map((event, index) => (
                    <motion.div
                        key={event.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Card>
                            <CardContent className="p-0 sm:flex flex-row-reverse">
                                <div className="app-photo-frame rounded-none sm:w-[32%]">
                                    <img
                                        src={appVisuals.advising.eventImages[index % appVisuals.advising.eventImages.length]}
                                        alt={event.name}
                                        className="h-full min-h-[220px] w-full object-cover"
                                    />
                                </div>
                                <div className="sm:w-1/3 bg-slate-50 p-6 sm:border-l border-b sm:border-b-0 border-slate-100 flex flex-col justify-center">
                                    <div className="flex items-center gap-2 text-slate-600 mb-2">
                                        <Calendar className="w-4 h-4 text-slate-700" />
                                        <span className="font-medium text-slate-900">{new Date(event.date).toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-500 text-sm mb-2">
                                        <Clock className="w-4 h-4" />
                                        <span>{new Date(event.date).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-500 text-sm">
                                        <Video className="w-4 h-4" />
                                        <span>Virtual Workshop</span>
                                    </div>
                                </div>
                                <div className="p-6 flex-1 flex flex-col justify-between">
                                    <div>
                                        <h3 className="text-xl font-bold font-heading mb-2 text-slate-900">{event.name}</h3>
                                        <p className="mb-4 border-b border-blue-100 pb-4 text-sm font-medium text-primary">Led by: {event.speaker}</p>
                                        <p className="text-slate-600 leading-relaxed max-w-2xl">{event.description}</p>
                                    </div>
                                    <div className="mt-6">
                                        {registeredEvents[event.id] ? (
                                            <div className="inline-flex items-center gap-2 rounded-md bg-blue-50 px-4 py-2 font-medium text-blue-700">
                                                <CheckCircle2 className="w-5 h-5" /> Seat Reserved
                                            </div>
                                        ) : (
                                            <Button onClick={() => handleRegister(event.id)} variant="outline">
                                                Reserve a Seat
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};
