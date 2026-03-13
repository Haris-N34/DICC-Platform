import React from 'react';
import { cn } from '../utils/helpers';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    'inline-flex items-center justify-center whitespace-nowrap rounded-full font-semibold tracking-[0.01em] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 disabled:pointer-events-none disabled:opacity-50',
                    {
                        'bg-primary text-white shadow-[0_16px_36px_rgba(37,99,235,0.28)] hover:bg-primary-hover hover:-translate-y-0.5': variant === 'primary',
                        'bg-secondary text-primary border border-blue-100/80 shadow-[0_10px_30px_rgba(37,99,235,0.08)] hover:bg-blue-50 hover:-translate-y-0.5': variant === 'secondary',
                        'border border-slate-300/70 bg-white/80 text-slate-900 hover:bg-white hover:border-slate-400/70 hover:-translate-y-0.5': variant === 'outline',
                        'text-slate-600 hover:bg-white/70 hover:text-slate-900': variant === 'ghost',
                        'h-10 px-4 text-sm': size === 'sm',
                        'h-12 px-6 text-[15px]': size === 'md',
                        'h-14 px-8 text-lg': size === 'lg',
                    },
                    className
                )}
                {...props}
            />
        );
    }
);
Button.displayName = 'Button';
