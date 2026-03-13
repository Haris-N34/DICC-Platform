import { useRef, useState } from 'react';
import { Play, Pause, Volume2, Volume1, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/helpers';

const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const CustomSlider = ({
    value,
    onChange,
    className,
}: {
    value: number;
    onChange: (value: number) => void;
    className?: string;
}) => {
    return (
        <motion.div
            className={cn(
                'relative w-full h-1 bg-white/20 rounded-full cursor-pointer',
                className,
            )}
            onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const percentage = (x / rect.width) * 100;
                onChange(Math.min(Math.max(percentage, 0), 100));
            }}
        >
            <motion.div
                className="absolute top-0 left-0 h-full bg-white rounded-full"
                style={{ width: `${value}%` }}
                initial={{ width: 0 }}
                animate={{ width: `${value}%` }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
        </motion.div>
    );
};

interface VideoPlayerProps {
    src: string;
    poster?: string;
}

const VideoPlayer = ({ src, poster }: VideoPlayerProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(1);
    const [progress, setProgress] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    const [playbackSpeed, setPlaybackSpeed] = useState(1);
    const [showControls, setShowControls] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [hasStarted, setHasStarted] = useState(false);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
                setHasStarted(true);
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleVolumeChange = (value: number) => {
        if (videoRef.current) {
            const newVolume = value / 100;
            videoRef.current.volume = newVolume;
            setVolume(newVolume);
            setIsMuted(newVolume === 0);
        }
    };

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            const prog =
                (videoRef.current.currentTime / videoRef.current.duration) * 100;
            setProgress(isFinite(prog) ? prog : 0);
            setCurrentTime(videoRef.current.currentTime);
            setDuration(videoRef.current.duration);
        }
    };

    const handleSeek = (value: number) => {
        if (videoRef.current && videoRef.current.duration) {
            const time = (value / 100) * videoRef.current.duration;
            if (isFinite(time)) {
                videoRef.current.currentTime = time;
                setProgress(value);
            }
        }
    };

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
            if (!isMuted) {
                setVolume(0);
            } else {
                setVolume(1);
                videoRef.current.volume = 1;
            }
        }
    };

    const setSpeed = (speed: number) => {
        if (videoRef.current) {
            videoRef.current.playbackRate = speed;
            setPlaybackSpeed(speed);
        }
    };

    return (
        <motion.div
            className="relative w-full rounded-xl overflow-hidden bg-slate-900 shadow-[0_0_20px_rgba(0,0,0,0.2)]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
        >
            <video
                ref={videoRef}
                className="w-full aspect-video object-cover"
                onTimeUpdate={handleTimeUpdate}
                onEnded={() => setIsPlaying(false)}
                src={src}
                poster={poster}
                onClick={togglePlay}
            />

            {/* Big play button overlay when not started */}
            <AnimatePresence>
                {!hasStarted && (
                    <motion.div
                        className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer"
                        onClick={togglePlay}
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {poster && (
                            <img
                                src={poster}
                                alt="Video thumbnail"
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                        <motion.div
                            className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-primary/80 text-white shadow-[0_0_30px_rgba(37,99,235,0.4)] backdrop-blur"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Play className="ml-1 h-8 w-8" />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Controls overlay */}
            <AnimatePresence>
                {showControls && hasStarted && (
                    <motion.div
                        className="absolute bottom-0 mx-auto max-w-xl left-0 right-0 p-4 m-2 bg-black/60 backdrop-blur-md rounded-2xl"
                        initial={{ y: 20, opacity: 0, filter: 'blur(10px)' }}
                        animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                        exit={{ y: 20, opacity: 0, filter: 'blur(10px)' }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-white text-xs font-mono">
                                {formatTime(currentTime)}
                            </span>
                            <CustomSlider
                                value={progress}
                                onChange={handleSeek}
                                className="flex-1"
                            />
                            <span className="text-white text-xs font-mono">
                                {formatTime(duration)}
                            </span>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={togglePlay}
                                    className="flex h-8 w-8 items-center justify-center rounded-lg text-white hover:bg-white/10 transition-colors"
                                >
                                    {isPlaying ? (
                                        <Pause className="h-4 w-4" />
                                    ) : (
                                        <Play className="h-4 w-4" />
                                    )}
                                </motion.button>

                                <div className="flex items-center gap-1">
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={toggleMute}
                                        className="flex h-8 w-8 items-center justify-center rounded-lg text-white hover:bg-white/10 transition-colors"
                                    >
                                        {isMuted ? (
                                            <VolumeX className="h-4 w-4" />
                                        ) : volume > 0.5 ? (
                                            <Volume2 className="h-4 w-4" />
                                        ) : (
                                            <Volume1 className="h-4 w-4" />
                                        )}
                                    </motion.button>
                                    <div className="w-20">
                                        <CustomSlider
                                            value={volume * 100}
                                            onChange={handleVolumeChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-1">
                                {[0.5, 1, 1.5, 2].map((speed) => (
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        key={speed}
                                        onClick={() => setSpeed(speed)}
                                        className={cn(
                                            'flex h-7 items-center justify-center rounded-md px-2 text-xs font-medium text-white/70 hover:bg-white/10 transition-colors',
                                            playbackSpeed === speed && 'bg-white/15 text-white',
                                        )}
                                    >
                                        {speed}x
                                    </motion.button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default VideoPlayer;
