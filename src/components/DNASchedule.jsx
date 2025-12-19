import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Clock, MapPin, User, ArrowRight, Dna } from 'lucide-react';
import clsx from 'clsx';

// Helper to get speaker details from the map or raw data
const getSpeaker = (name, speakerMap) => {
    if (!name || !speakerMap) return null;
    return speakerMap.get(name);
};

const DNAItem = ({ item, index, speakerMap, onOpenSession }) => {
    const ref = useRef(null);
    const speaker = getSpeaker(item.speaker, speakerMap);

    // Track scroll progress of this specific item through the viewport
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    // 3D Helix Math
    const yInput = useSpring(scrollYProgress, { stiffness: 400, damping: 90 });

    // Left/Right oscillation - Same for all screen sizes
    const x = useTransform(yInput, [0, 1], [-50, 50]);
    const scale = useTransform(yInput, [0, 0.5, 1], [0.85, 1, 0.85]);
    const opacity = useTransform(yInput, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    const isEven = index % 2 === 0;

    return (
        <motion.div
            ref={ref}
            style={{
                scale,
                opacity,
                x: isEven ? x : useTransform(x, v => -v),
            }}
            className={clsx(
                "relative flex items-center justify-center py-6 md:py-12 lg:py-16 perspective-1000",
                isEven ? "flex-row" : "flex-row-reverse"
            )}
        >
            {/* Central DNA Axis */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 md:w-1 bg-gradient-to-b from-brand-900 via-gold-500/50 to-brand-900 -translate-x-1/2 z-0"></div>

            {/* Connector Line */}
            <div className={clsx(
                "absolute top-1/2 h-0.5 bg-gradient-to-r from-gold-500/50 to-transparent w-1/2 z-0",
                isEven ? "left-1/2 origin-left" : "right-1/2 origin-right"
            )}></div>

            {/* Left Node (Time & Type) */}
            <div
                className={clsx(
                    "w-[45%] md:w-5/12 flex flex-col justify-center px-1 md:px-8 z-10",
                    isEven ? "items-end text-right" : "items-start text-left"
                )}
            >
                <div className="inline-flex items-center gap-1 md:gap-2 px-1.5 md:px-3 py-0.5 md:py-1 rounded-full bg-brand-900/80 border border-gold-500/30 text-gold-400 font-mono text-sm md:text-xl lg:text-2xl font-bold mb-1 md:mb-2 shadow-[0_0_15px_rgba(251,191,36,0.2)]">
                    <Clock size={10} className="md:w-4 md:h-4" />
                    <span className="text-[10px] md:text-base lg:text-xl">{item.time}</span>
                </div>
                <span className="text-brand-300 uppercase tracking-widest text-[8px] md:text-xs font-semibold">{item.type}</span>
            </div>

            {/* Center Node */}
            <div className="relative z-20 shrink-0">
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="w-8 h-8 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full bg-slate-900 border-2 border-gold-400 shadow-[0_0_20px_rgba(251,191,36,0.5)] md:shadow-[0_0_30px_rgba(251,191,36,0.6)] flex items-center justify-center group cursor-pointer"
                    onClick={() => onOpenSession(item)}
                >
                    {speaker ? (
                        <img src={speaker.image} alt={speaker.name} className="w-full h-full object-cover rounded-full opacity-80 group-hover:opacity-100 transition-opacity" />
                    ) : (
                        <div className="w-2 h-2 md:w-4 md:h-4 rounded-full bg-gold-400 group-hover:bg-white transition-colors" />
                    )}
                </motion.button>
            </div>

            {/* Right Node (Content Card) */}
            <div
                className={clsx(
                    "w-[45%] md:w-5/12 px-1 md:px-8 z-10",
                    isEven ? "text-left" : "text-right items-end"
                )}
            >
                <div
                    className="group relative bg-brand-900/40 backdrop-blur-md border border-white/10 p-2 md:p-6 lg:p-8 rounded-lg md:rounded-2xl hover:bg-brand-800/60 hover:border-gold-500/30 active:bg-brand-800/60 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-2xl"
                    onClick={() => onOpenSession(item)}
                >
                    <h3 className="text-[11px] md:text-xl lg:text-3xl font-serif font-bold text-white mb-0.5 md:mb-2 group-hover:text-gold-200 transition-colors leading-tight break-words">
                        {item.title}
                    </h3>

                    {speaker && (
                        <div className={clsx("flex items-center gap-0.5 md:gap-3 text-brand-200", isEven ? "justify-start" : "justify-end")}>
                            <User size={8} className="md:w-3.5 md:h-3.5 shrink-0" />
                            <span className="text-[8px] md:text-sm font-medium break-words">{speaker.name}</span>
                        </div>
                    )}

                    {/* Hover Reveal Arrow - Desktop only */}
                    <div className={clsx(
                        "hidden md:block absolute top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-gold-400",
                        isEven ? "-right-4 -translate-x-4" : "-left-4 translate-x-4"
                    )}>
                        <ArrowRight size={24} />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const DNASchedule = ({ schedule, speakerMap, onOpenSession }) => {
    return (
        <section id="schedule" className="py-32 bg-brand-950 relative overflow-hidden">
            {/* Background Atmosphere */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-slate-900 via-brand-950 to-black pointer-events-none"></div>

            {/* Animated Orbs */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-500/10 blur-[120px] rounded-full mix-blend-screen pointer-events-none animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-500/10 blur-[120px] rounded-full mix-blend-screen pointer-events-none"></div>

            {/* Grid Texture */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none"></div>

            {/* Seamless Section Blend - Top Fade */}
            <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-brand-950 via-brand-950/80 to-transparent pointer-events-none z-20"></div>

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="text-center mb-24">
                    <h2 className="text-5xl md:text-7xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-gold-200 to-gold-400 drop-shadow-2xl leading-tight pb-2">
                        The Timeline
                    </h2>
                </div>

                <div className="relative py-12">
                    {/* Items */}
                    <div className="space-y-0">
                        {schedule.map((item, index) => (
                            <DNAItem
                                key={index}
                                item={item}
                                index={index}
                                speakerMap={speakerMap}
                                onOpenSession={onOpenSession}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DNASchedule;
