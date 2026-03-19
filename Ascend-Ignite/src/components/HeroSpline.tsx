import Spline from '@splinetool/react-spline';
import type { Application } from '@splinetool/runtime';
import { useEffect, useRef, useState, useMemo } from 'react';

const isPhoneViewport = () => window.innerWidth <= 480;
const isMobileViewport = () => window.innerWidth <= 768;

const getPhoneZoom = () => {
    const aspectRatio = window.innerWidth / Math.max(window.innerHeight, 1);
    return Math.min(2.35, Math.max(2.05, 1 / Math.max(aspectRatio, 0.42)));
};

/**
 * Static gradient fallback for mobile devices that skips the heavy 2MB Spline scene.
 */
const MobileHeroFallback = () => (
    <main className="hero-spline-main">
        <div className="hero-spline-stage">
            <div
                className="h-full w-full min-h-[100svh]"
                style={{
                    background: `
                        radial-gradient(ellipse 80% 60% at 50% 40%, rgba(135, 206, 250, 0.5), transparent),
                        radial-gradient(ellipse 60% 50% at 30% 60%, rgba(96, 165, 250, 0.3), transparent),
                        radial-gradient(ellipse 50% 40% at 70% 30%, rgba(186, 230, 253, 0.4), transparent),
                        linear-gradient(180deg, #b8e3fb 0%, #87cefa 50%, #87cefa 100%)
                    `,
                }}
            />
        </div>
    </main>
);

export const HeroSpline = () => {
    const splineRef = useRef<Application | null>(null);
    const [isPhone, setIsPhone] = useState(() => isPhoneViewport());

    // Determined once on mount — don't load the 2MB Spline scene on mobile at all
    const shouldSkipSpline = useMemo(() => isMobileViewport(), []);

    useEffect(() => {
        if (shouldSkipSpline) return;

        const handleResize = () => {
            const nextIsPhone = isPhoneViewport();
            setIsPhone(nextIsPhone);

            if (nextIsPhone && splineRef.current) {
                splineRef.current.setZoom(getPhoneZoom());
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [shouldSkipSpline]);

    if (shouldSkipSpline) {
        return <MobileHeroFallback />;
    }

    const handleLoad = (spline: Application) => {
        splineRef.current = spline;
        if (isPhone) {
            spline.setZoom(getPhoneZoom());
        }
    };

    return (
        <main className="hero-spline-main">
            <div className="hero-spline-stage">
                <div className="hero-spline-scene">
                    <Spline key={isPhone ? 'phone' : 'desktop'} scene="/scene.splinecode" onLoad={handleLoad} />
                </div>
            </div>
            <div className="hero-side-line hero-side-line-left" aria-hidden="true" />
            <div className="hero-side-line hero-side-line-right" aria-hidden="true" />
        </main>
    );
};
