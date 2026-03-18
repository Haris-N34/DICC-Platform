import Spline from '@splinetool/react-spline';

export const HeroSpline = () => {
    return (
        <main className="hero-spline-main">
            <div className="hero-spline-stage">
                <div className="hero-spline-scene">
                    <Spline scene="/scene.splinecode" />
                </div>
            </div>
            <div className="hero-side-line hero-side-line-left" aria-hidden="true" />
            <div className="hero-side-line hero-side-line-right" aria-hidden="true" />
        </main>
    );
};
