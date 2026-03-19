import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Presentation, Calendar, ArrowRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../components/Card';
import { Button } from '../components/Button';
import { mockEvents } from '../data/mockData';
import { appVisuals } from '../data/visuals';

export const Community = () => {
    const upcomingNetworking = mockEvents.filter(e => e.type === 'networking').slice(0, 2);
    const upcomingAdvising = mockEvents.filter(e => e.type === 'advising').slice(0, 2);

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <header className="mb-12 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
                <div>
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-3 text-3xl font-bold font-heading text-slate-900 md:mb-4 md:text-5xl"
                    >
                        Community Hub
                    </motion.h1>
                    <p className="text-base text-slate-600 md:text-xl">
                        Connect with peers, mentors, and industry professionals. Building a strong network is your best defense against industry shifts.
                    </p>
                </div>
                <div className="app-photo-frame rounded-[22px] md:rounded-[30px]">
                    <img src={appVisuals.community.hero.src} alt={appVisuals.community.hero.alt} className="h-[200px] w-full object-cover md:h-[280px]" />
                    <div className="absolute inset-x-0 bottom-0 z-10 p-6 text-white">
                        <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-blue-100">{appVisuals.community.hero.eyebrow}</p>
                        <p className="mt-3 max-w-md text-sm leading-6 text-white/90">{appVisuals.community.hero.description}</p>
                    </div>
                </div>
            </header>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
                {/* Networking Section */}
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                    <Card className="h-full flex flex-col hover:border-primary/30 transition-colors">
                        <div className="app-photo-frame rounded-b-none rounded-t-[22px] md:rounded-t-[28px]">
                            <img src={appVisuals.community.networking} alt="Networking event" className="h-36 w-full object-cover md:h-48" />
                        </div>
                        <CardHeader className="bg-primary/5 pb-8 border-b border-primary/10">
                            <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm mb-4">
                                <Users className="w-8 h-8" />
                            </div>
                            <CardTitle className="text-2xl">Networking Events</CardTitle>
                            <CardDescription className="text-base mt-2">Mixers, panels, and guest speaker sessions.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1 pt-6 flex flex-col justify-between space-y-6">
                            <div className="space-y-4">
                                <h4 className="font-semibold text-slate-900 text-sm tracking-wider uppercase">Upcoming</h4>
                                {upcomingNetworking.map(event => (
                                    <div key={event.id} className="flex gap-3 items-start border border-slate-100 p-3 rounded-lg bg-slate-50/50">
                                        <Calendar className="w-5 h-5 text-slate-400 mt-0.5" />
                                        <div>
                                            <h5 className="font-medium text-slate-900 line-clamp-1">{event.name}</h5>
                                            <p className="text-sm text-slate-500">{new Date(event.date).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Link to="/community/networking" className="w-full">
                                <Button variant="outline" className="w-full justify-between group">
                                    Explore Networking <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Group Advising Section */}
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                    <Card className="h-full flex flex-col hover:border-primary/30 transition-colors">
                        <div className="app-photo-frame rounded-b-none rounded-t-[22px] md:rounded-t-[28px]">
                            <img src={appVisuals.community.advising} alt="Advising workshop" className="h-36 w-full object-cover md:h-48" />
                        </div>
                        <CardHeader className="bg-slate-50 pb-8 border-b border-slate-100">
                            <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center text-slate-700 shadow-sm mb-4">
                                <Presentation className="w-8 h-8" />
                            </div>
                            <CardTitle className="text-2xl">Group Advising</CardTitle>
                            <CardDescription className="text-base mt-2">Small group sessions focused on career strategy.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1 pt-6 flex flex-col justify-between space-y-6">
                            <div className="space-y-4">
                                <h4 className="font-semibold text-slate-900 text-sm tracking-wider uppercase">Upcoming</h4>
                                {upcomingAdvising.map(event => (
                                    <div key={event.id} className="flex gap-3 items-start border border-slate-100 p-3 rounded-lg bg-slate-50/50">
                                        <Calendar className="w-5 h-5 text-slate-400 mt-0.5" />
                                        <div>
                                            <h5 className="font-medium text-slate-900 line-clamp-1">{event.name}</h5>
                                            <p className="text-sm text-slate-500">{new Date(event.date).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Link to="/community/advising" className="w-full">
                                <Button variant="outline" className="w-full justify-between group">
                                    Explore Group Advising <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
};
