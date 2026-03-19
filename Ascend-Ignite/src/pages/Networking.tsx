import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Calendar, Clock, MapPin, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '../components/Card';
import { Button } from '../components/Button';
import { mockEvents } from '../data/mockData';
import { appVisuals } from '../data/visuals';

export const Networking = () => {
    const events = mockEvents.filter(e => e.type === 'networking');
    const [registeredEvents, setRegisteredEvents] = useState<Record<string, boolean>>({});

    const handleRegister = (id: string) => {
        setRegisteredEvents(prev => ({ ...prev, [id]: true }));
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-5xl">
            <div className="mb-8 grid gap-6 md:grid-cols-[0.9fr_1.1fr] md:items-center">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                        <Users className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold font-heading text-slate-900">Networking Events</h1>
                        <p className="text-slate-600">Connect with industry leaders and innovative peers.</p>
                    </div>
                </div>
                <div className="app-photo-frame rounded-[22px] md:rounded-[28px]">
                    <img src={appVisuals.networking.hero.src} alt={appVisuals.networking.hero.alt} className="h-[180px] w-full object-cover md:h-[260px]" />
                    <div className="absolute inset-x-0 bottom-0 z-10 p-6 text-white">
                        <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-blue-100">{appVisuals.networking.hero.eyebrow}</p>
                        <p className="mt-3 max-w-md text-sm leading-6 text-white/90">{appVisuals.networking.hero.description}</p>
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
                            <CardContent className="p-0 md:flex">
                                <div className="app-photo-frame rounded-none md:w-[32%]">
                                    <img
                                        src={appVisuals.networking.eventImages[index % appVisuals.networking.eventImages.length]}
                                        alt={event.name}
                                        className="h-48 w-full object-cover md:h-full md:min-h-[220px]"
                                    />
                                </div>
                                <div className="bg-slate-50 p-4 border-b border-slate-100 md:w-1/3 md:p-6 md:border-r md:border-b-0">
                                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 md:flex-col md:items-start md:gap-2">
                                        <div className="flex items-center gap-2 text-slate-600">
                                            <Calendar className="w-4 h-4 text-primary" />
                                            <span className="font-medium text-slate-900 text-sm md:text-base">{new Date(event.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-slate-500 text-sm">
                                            <Clock className="w-4 h-4" />
                                            <span>{new Date(event.date).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-slate-500 text-sm">
                                            <MapPin className="w-4 h-4" />
                                            <span>Virtual (Zoom)</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4 flex-1 flex flex-col justify-between md:p-6">
                                    <div>
                                        <h3 className="text-lg font-bold font-heading mb-2 text-slate-900 md:text-xl">{event.name}</h3>
                                        <p className="text-sm font-medium text-primary mb-3 md:mb-4">Speaker: {event.speaker}</p>
                                        <p className="text-sm text-slate-600 leading-relaxed md:text-base">{event.description}</p>
                                    </div>
                                    <div className="mt-4 flex justify-end md:mt-6">
                                        {registeredEvents[event.id] ? (
                                            <div className="flex items-center gap-2 rounded-md bg-blue-50 px-4 py-2 font-medium text-blue-700">
                                                <CheckCircle2 className="w-5 h-5" /> Registered
                                            </div>
                                        ) : (
                                            <Button onClick={() => handleRegister(event.id)} className="w-full md:w-auto">
                                                Register Now
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
