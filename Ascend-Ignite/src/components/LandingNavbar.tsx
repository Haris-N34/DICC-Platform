import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Flame, ChevronDown, BookOpen, Users, Award, Mail } from 'lucide-react';
import { Button } from './Button';

interface NavItem {
    label: string;
    href: string;
    children?: { label: string; desc: string; icon: React.ReactNode; href: string }[];
}

const navItems: NavItem[] = [
    { label: 'Home', href: '/' },
    {
        label: 'Platform',
        href: '#',
        children: [
            { label: 'Courses', desc: 'AI-readiness modules with quizzes', icon: <BookOpen className="h-4 w-4" />, href: '/signup' },
            { label: 'Community', desc: 'Networking and advising events', icon: <Users className="h-4 w-4" />, href: '/signup' },
            { label: 'Certificates', desc: 'Earn proof of your skills', icon: <Award className="h-4 w-4" />, href: '/signup' },
        ],
    },
    {
        label: 'Resources',
        href: '#',
        children: [
            { label: 'Get Started', desc: 'Create your free account', icon: <Flame className="h-4 w-4" />, href: '/signup' },
            { label: 'Contact', desc: 'Reach out to our team', icon: <Mail className="h-4 w-4" />, href: '/signup' },
        ],
    },
];

export const LandingNavbar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50">
            <div className="mx-auto max-w-6xl px-4 py-3 md:px-6">
                <div className="flex items-center justify-between rounded-2xl border border-white/30 bg-white/40 px-4 py-2.5 shadow-[0_4px_24px_rgba(0,0,0,0.06)] backdrop-blur-2xl backdrop-saturate-150">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
                            <Flame className="h-4 w-4" />
                        </div>
                        <span className="text-[0.98rem] font-semibold tracking-[-0.01em] text-slate-950">
                            Ascend Ignite
                        </span>
                    </Link>

                    {/* Desktop nav */}
                    <div className="hidden items-center gap-1 lg:flex">
                        {navItems.map((item) =>
                            item.children ? (
                                <DropdownItem
                                    key={item.label}
                                    item={item}
                                    isOpen={openDropdown === item.label}
                                    onToggle={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                                    onClose={() => setOpenDropdown(null)}
                                />
                            ) : (
                                <Link
                                    key={item.label}
                                    to={item.href}
                                    className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-white/60 hover:text-slate-900"
                                >
                                    {item.label}
                                </Link>
                            ),
                        )}
                    </div>

                    {/* Desktop auth */}
                    <div className="hidden items-center gap-2 lg:flex">
                        <Link to="/onboarding">
                            <Button variant="outline" size="sm" className="border-slate-200/60 bg-white/50 text-slate-700 backdrop-blur">
                                Log in
                            </Button>
                        </Link>
                        <Link to="/signup">
                            <Button size="sm">Sign up</Button>
                        </Link>
                    </div>

                    {/* Mobile toggle */}
                    <button
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 hover:bg-white/60 lg:hidden"
                        onClick={() => setMobileOpen(!mobileOpen)}
                    >
                        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                        className="mx-4 mt-1 rounded-2xl border border-white/30 bg-white/80 p-4 shadow-[0_8px_32px_rgba(0,0,0,0.08)] backdrop-blur-2xl lg:hidden"
                    >
                        <div className="space-y-1">
                            {navItems.map((item) =>
                                item.children ? (
                                    <MobileDropdown key={item.label} item={item} />
                                ) : (
                                    <Link
                                        key={item.label}
                                        to={item.href}
                                        onClick={() => setMobileOpen(false)}
                                        className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-100"
                                    >
                                        {item.label}
                                    </Link>
                                ),
                            )}
                        </div>

                        <div className="mt-4 flex flex-col gap-2 border-t border-slate-200/60 pt-4">
                            <Link to="/onboarding" onClick={() => setMobileOpen(false)}>
                                <Button variant="outline" className="w-full">Log in</Button>
                            </Link>
                            <Link to="/signup" onClick={() => setMobileOpen(false)}>
                                <Button className="w-full">Sign up</Button>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

const DropdownItem = ({
    item,
    isOpen,
    onToggle,
    onClose,
}: {
    item: NavItem;
    isOpen: boolean;
    onToggle: () => void;
    onClose: () => void;
}) => {
    return (
        <div className="relative" onMouseEnter={onToggle} onMouseLeave={onClose}>
            <button
                className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-white/60 hover:text-slate-900"
                onClick={onToggle}
            >
                {item.label}
                <ChevronDown className={`h-3.5 w-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-0 top-full pt-2"
                    >
                        <div className="w-72 rounded-xl border border-white/40 bg-white/90 p-2 shadow-[0_12px_40px_rgba(0,0,0,0.1)] backdrop-blur-2xl">
                            {item.children!.map((child) => (
                                <Link
                                    key={child.label}
                                    to={child.href}
                                    onClick={onClose}
                                    className="flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-slate-50"
                                >
                                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/8 text-primary">
                                        {child.icon}
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-slate-900">{child.label}</p>
                                        <p className="text-xs text-slate-500">{child.desc}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const MobileDropdown = ({ item }: { item: NavItem }) => {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <button
                onClick={() => setOpen(!open)}
                className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-100"
            >
                {item.label}
                <ChevronDown className={`h-3.5 w-3.5 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                    >
                        <div className="space-y-1 pl-3 pb-2">
                            {item.children!.map((child) => (
                                <Link
                                    key={child.label}
                                    to={child.href}
                                    className="flex items-start gap-3 rounded-lg p-2.5 transition-colors hover:bg-slate-100"
                                >
                                    <div className="mt-0.5 text-primary">{child.icon}</div>
                                    <div>
                                        <p className="text-sm font-medium text-slate-800">{child.label}</p>
                                        <p className="text-xs text-slate-500">{child.desc}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
