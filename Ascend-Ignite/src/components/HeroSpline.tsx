import Spline from '@splinetool/react-spline';
import type { Application } from '@splinetool/runtime';
import { useEffect, useRef, useState } from 'react';

export const HeroSpline = () => {
    const splineRef = useRef<Application | null>(null);
    const [isPhone, setIsPhone] = useState(() => window.innerWidth <= 480);

    useEffect(() => {
        const handleResize = () => {
            setIsPhone(window.innerWidth <= 480);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleLoad = (spline: Application) => {
        splineRef.current = spline;
        if (isPhone) {
            spline.setZoom(0.42);
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
