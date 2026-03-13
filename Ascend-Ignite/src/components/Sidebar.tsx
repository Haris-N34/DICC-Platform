import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LogOut,
    ChevronLeft,
    ChevronRight,
    LayoutDashboard,
    Users,
    Award,
    Flame,
} from 'lucide-react';
import { getProfile, clearProfile } from '../services/profileService';

interface SidebarProps {
    onCollapseChange?: (collapsed: boolean) => void;
}

export const Sidebar = ({ onCollapseChange }: SidebarProps) => {
    const location = useLocation();
    const profile = getProfile();
    const [collapsed, setCollapsed] = useState(false);

    useEffect(() => {
        onCollapseChange?.(collapsed);
    }, [collapsed, onCollapseChange]);

    if (!profile) return null;
    if (['/', '/signup', '/onboarding'].includes(location.pathname)) return null;

    const displayName = profile?.name?.trim() || 'Member';
    const displayMajor = profile?.major?.trim() || 'AI Readiness';
    const initials = displayName
        .split(' ')
        .map((n: string) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

    const handleLogout = () => {
        clearProfile();
        window.location.href = '/';
    };

    const navItems = [
        { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { to: '/community', icon: Users, label: 'Community' },
        { to: '/certificates', icon: Award, label: 'Certificates' },
    ];

    return (
        <motion.aside
            initial={false}
            animate={{ width: collapsed ? 78 : 264 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed left-0 top-0 z-50 flex h-screen flex-col border-r border-white/20 bg-white/60 backdrop-blur-2xl backdrop-saturate-150 shadow-[1px_0_30px_rgba(0,0,0,0.04)]"
        >
            {/* Header */}
            <div className="flex items-center gap-3 px-5 py-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary text-white shadow-[0_4px_20px_rgba(37,99,235,0.35)]">
                    <Flame className="h-5 w-5" />
                </div>
                <AnimatePresence>
                    {!collapsed && (
                        <motion.div
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: 'auto' }}
                            exit={{ opacity: 0, width: 0 }}
                            className="overflow-hidden whitespace-nowrap"
                        >
                            <span className="block font-heading text-lg font-bold text-slate-900">Ascend Ignite</span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Profile Card */}
            <div className={`mx-3 mb-2 rounded-2xl bg-white/70 border border-white/50 shadow-[0_2px_12px_rgba(0,0,0,0.04)] backdrop-blur-sm ${collapsed ? 'p-2' : 'p-4'}`}>
                <div className={`flex ${collapsed ? 'flex-col items-center gap-1' : 'items-center gap-3'}`}>
                    <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white ring-2 ring-white shadow-[0_4px_16px_rgba(37,99,235,0.25)]">
                        {initials}
                        <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-400" />
                    </div>
                    <AnimatePresence>
                        {!collapsed && (
                            <motion.div
                                initial={{ opacity: 0, width: 0 }}
                                animate={{ opacity: 1, width: 'auto' }}
                                exit={{ opacity: 0, width: 0 }}
                                className="overflow-hidden whitespace-nowrap min-w-0"
                            >
                                <p className="text-sm font-semibold text-slate-900 truncate">{displayName}</p>
                                <p className="text-xs text-slate-400 truncate">{displayMajor}</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Divider */}
            <div className="mx-5 my-2">
                <div className="h-px bg-slate-200/60" />
            </div>

            {/* Navigation Label */}
            <AnimatePresence>
                {!collapsed && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="px-6 pt-2 pb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400"
                    >
                        Menu
                    </motion.p>
                )}
            </AnimatePresence>

            {/* Navigation */}
            <nav className="flex-1 space-y-1 px-3 py-1">
                {navItems.map((item) => {
                    const isActive = item.to === '/community'
                        ? location.pathname.startsWith('/community')
                        : location.pathname === item.to;
                    return (
                        <Link
                            key={item.to}
                            to={item.to}
                            className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                                isActive
                                    ? 'bg-primary/10 text-primary'
                                    : 'text-slate-500 hover:bg-white/80 hover:text-slate-900 hover:shadow-[0_2px_8px_rgba(0,0,0,0.04)]'
                            } ${collapsed ? 'justify-center' : ''}`}
                            title={collapsed ? item.label : undefined}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="sidebar-active"
                                    className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r-full bg-primary"
                                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                                />
                            )}
                            <item.icon className={`h-[18px] w-[18px] shrink-0 transition-colors ${isActive ? 'text-primary' : 'text-slate-400 group-hover:text-slate-600'}`} />
                            <AnimatePresence>
                                {!collapsed && (
                                    <motion.span
                                        initial={{ opacity: 0, width: 0 }}
                                        animate={{ opacity: 1, width: 'auto' }}
                                        exit={{ opacity: 0, width: 0 }}
                                        className="overflow-hidden whitespace-nowrap"
                                    >
                                        {item.label}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom */}
            <div className="mx-3 mb-4 space-y-2">
                <div className="h-px bg-slate-200/60 mx-2" />
                <button
                    onClick={handleLogout}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-400 transition-all hover:bg-red-50/80 hover:text-red-500 ${collapsed ? 'justify-center' : ''}`}
                    title="Logout"
                >
                    <LogOut className="h-[18px] w-[18px] shrink-0" />
                    <AnimatePresence>
                        {!collapsed && (
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="overflow-hidden whitespace-nowrap"
                            >
                                Log Out
                            </motion.span>
                        )}
                    </AnimatePresence>
                </button>
            </div>

            {/* Collapse Toggle */}
            <button
                onClick={() => setCollapsed(!collapsed)}
                className="absolute -right-3 top-[72px] flex h-6 w-6 items-center justify-center rounded-full border border-slate-200/80 bg-white/90 backdrop-blur text-slate-400 shadow-sm hover:text-slate-600 hover:shadow-md transition-all"
            >
                {collapsed ? <ChevronRight className="h-3.5 w-3.5" /> : <ChevronLeft className="h-3.5 w-3.5" />}
            </button>
        </motion.aside>
    );
};
