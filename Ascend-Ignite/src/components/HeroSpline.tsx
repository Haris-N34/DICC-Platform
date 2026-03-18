import Spline from '@splinetool/react-spline';
import type { Application } from '@splinetool/runtime';
import { useEffect, useRef, useState } from 'react';

const isPhoneViewport = () => window.innerWidth <= 480;

const getPhoneZoom = () => {
    const aspectRatio = window.innerWidth / Math.max(window.innerHeight, 1);
    return Math.min(2.35, Math.max(2.05, 1 / Math.max(aspectRatio, 0.42)));
};

export const HeroSpline = () => {
    const splineRef = useRef<Application | null>(null);
    const [isPhone, setIsPhone] = useState(() => isPhoneViewport());

    useEffect(() => {
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
    }, []);

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
