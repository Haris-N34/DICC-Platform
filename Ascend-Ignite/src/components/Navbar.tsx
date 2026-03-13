import { Link, useLocation } from 'react-router-dom';
import { Flame } from 'lucide-react';
import { getProfile } from '../services/profileService';
import { Button } from './Button';

export const Navbar = () => {
    const location = useLocation();
    const profile = getProfile();

    // Don't show navbar on specific pages or when sidebar is visible (logged in)
    if (['/', '/signup', '/onboarding'].includes(location.pathname)) {
        return null;
    }

    // When logged in, the sidebar handles navigation - hide the navbar
    if (profile) {
        return null;
    }

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-blue-100/70 bg-[rgba(248,251,255,0.82)] backdrop-blur-xl">
            <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
                <div className="flex items-center gap-6">
                    <Link to="/" className="flex items-center gap-3 text-slate-900">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-white shadow-[0_12px_30px_rgba(37,99,235,0.25)]">
                            <Flame className="h-5 w-5" />
                        </div>
                        <div className="leading-tight">
                            <span className="block font-heading text-xl font-bold tracking-tight">Ascend Ignite</span>
                            <span className="block text-[11px] uppercase tracking-[0.28em] text-slate-500">Career Intelligence Studio</span>
                        </div>
                    </Link>
                </div>

                <div className="flex items-center gap-4">
                    <Link to="/signup">
                        <Button size="sm">Sign Up</Button>
                    </Link>
                </div>
            </div>
        </nav>
    );
};
