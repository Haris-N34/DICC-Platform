import Spline from '@splinetool/react-spline';

export const HeroSpline = () => {
    return (
        <main className="hero-spline-main">
            <div className="hero-spline-stage">
                <Spline scene="/scene.splinecode" />
            </div>
            <div className="hero-side-line hero-side-line-left" aria-hidden="true" />
            <div className="hero-side-line hero-side-line-right" aria-hidden="true" />
        </main>
    );
};
