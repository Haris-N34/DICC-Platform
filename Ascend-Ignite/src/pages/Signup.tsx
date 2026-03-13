import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';
import { Button } from '../components/Button';
import { Card, CardContent } from '../components/Card';
import { appVisuals } from '../data/visuals';
import { saveProfile } from '../services/profileService';
import { UserProfile } from '../types';

export const Signup = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim() && email.trim()) {
            // Create a partial profile for now, the rest will be filled in onboarding
            const partialProfile: Partial<UserProfile> = {
                name,
                email,
            };
            saveProfile(partialProfile as UserProfile);
            void navigate('/onboarding');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 relative overflow-hidden">
            {/* Background blobs */}
            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="flex flex-col items-center mb-8">
                    <div className="bg-primary/10 p-3 rounded-full mb-4 text-primary">
                        <Flame className="w-8 h-8" />
                    </div>
                    <h1 className="text-3xl font-bold font-heading text-slate-900">Join Ascend Ignite</h1>
                    <p className="text-slate-600 mt-2 text-center">Your journey to career clarity starts here.</p>
                </div>

                <div className="app-photo-frame mb-6 rounded-[28px]">
                    <img src={appVisuals.signup.src} alt={appVisuals.signup.alt} className="h-56 w-full object-cover" />
                    <div className="absolute inset-x-0 bottom-0 z-10 p-5 text-white">
                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-blue-100">{appVisuals.signup.eyebrow}</p>
                        <p className="mt-2 max-w-sm text-sm leading-6 text-white/90">{appVisuals.signup.description}</p>
                    </div>
                </div>

                <Card className="shadow-lg border-0 shadow-slate-200/50">
                    <CardContent className="pt-8">
                        <form onSubmit={handleSignup} className="space-y-5">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-medium text-slate-700">Full Name</label>
                                <input
                                    id="name"
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full p-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                                    placeholder="Jane Doe"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium text-slate-700">University Email</label>
                                <input
                                    id="email"
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full p-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                                    placeholder="jane.doe@university.edu"
                                />
                            </div>

                            <Button type="submit" className="w-full text-lg h-12 mt-4" size="lg">
                                Create Account
                            </Button>
                        </form>

                        <div className="mt-6 text-center text-sm text-slate-500">
                            Already have an account? <Link to="/onboarding" className="text-primary font-medium hover:underline">Log in</Link>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
};
