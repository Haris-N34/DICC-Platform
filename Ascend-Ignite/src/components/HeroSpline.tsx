import Spline from '@splinetool/react-spline';
import type { Application } from '@splinetool/runtime';
import { useEffect, useRef } from 'react';

export const HeroSpline = () => {
    const splineRef = useRef<Application | null>(null);

    useEffect(() => {
        const applyMobileZoom = () => {
            if (!splineRef.current) {
                return;
            }

            if (window.innerWidth <= 480) {
                splineRef.current.setZoom(0.62);
                return;
            }

            if (window.innerWidth <= 768) {
                splineRef.current.setZoom(0.78);
            }
        };

        applyMobileZoom();
        window.addEventListener('resize', applyMobileZoom);

        return () => {
            window.removeEventListener('resize', applyMobileZoom);
        };
    }, []);

    return (
        <main className="hero-spline-main">
            <div className="hero-spline-stage">
                <Spline
                    scene="/scene.splinecode"
                    onLoad={(app) => {
                        splineRef.current = app;

                        if (window.innerWidth <= 480) {
                            app.setZoom(0.62);
                        } else if (window.innerWidth <= 768) {
                            app.setZoom(0.78);
                        }
                    }}
                />
            </div>
            <div className="hero-side-line hero-side-line-left" aria-hidden="true" />
            <div className="hero-side-line hero-side-line-right" aria-hidden="true" />
        </main>
    );
};
