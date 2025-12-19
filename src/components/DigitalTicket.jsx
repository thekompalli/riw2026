import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, RefreshCw, User, Briefcase, Zap } from 'lucide-react';

const DigitalTicket = () => {
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [uniqueId, setUniqueId] = useState(null);
    const [error, setError] = useState('');
    const [downloadRequested, setDownloadRequested] = useState(false);

    const canvasRef = useRef(null);
    const logoRef = useRef(null);
    const bgRef = useRef(null);

    // Helper to generate a robust unique ID
    const generateId = () => {
        const timestamp = Date.now().toString(36).toUpperCase().slice(-4);
        const random = Math.random().toString(36).toUpperCase().slice(2, 6);
        return `RIW-2026-${timestamp}-${random}`;
    }

    // Load Images
    useEffect(() => {
        const loadImages = async () => {
            const logoPromise = new Promise((resolve) => {
                const img = new Image();
                img.src = '/riw-logo.png';
                img.onload = () => {
                    logoRef.current = img;
                    resolve();
                };
                img.onerror = () => resolve();
            });

            const bgPromise = new Promise((resolve) => {
                const img = new Image();
                img.src = '/pass-card-bg.png';
                img.onload = () => {
                    bgRef.current = img;
                    resolve();
                };
                img.onerror = () => resolve();
            });

            await Promise.all([logoPromise, bgPromise]);
            if (canvasRef.current) drawTicket();
        };

        loadImages();
    }, []);

    const drawTicket = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        // --- HD Resolution Setup ---
        // 1. Set Physical Dimensions (High Res)
        canvas.width = 1200;
        canvas.height = 800;

        // 2. Scale Context (2x) to reuse 600x400 logic
        ctx.scale(2, 2);

        // --- Drawing Logic (Standard 600x400 Coords) ---

        // 1. Background (Midnight Gold Theme)
        // MATCH PREVIEW: Linear Gradient
        const gradient = ctx.createLinearGradient(0, 0, 600, 400);
        gradient.addColorStop(0, '#1e293b'); // Slate 800
        gradient.addColorStop(1, '#000000'); // Black
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 600, 400);

        // 2. Texture Overlay
        if (bgRef.current) {
            ctx.save();
            ctx.globalAlpha = 0.1;
            ctx.drawImage(bgRef.current, 0, 0, 600, 400);
            ctx.restore();
        }

        // 3. Grid Pattern
        ctx.save();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
        ctx.lineWidth = 1;
        for (let i = 0; i < 600; i += 30) {
            ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, 400); ctx.stroke();
        }
        for (let j = 0; j < 400; j += 30) {
            ctx.beginPath(); ctx.moveTo(0, j); ctx.lineTo(600, j); ctx.stroke();
        }
        ctx.restore();

        // 4. Dynamic Accents
        // Gold Side Bar
        const barGradient = ctx.createLinearGradient(0, 0, 0, 400);
        barGradient.addColorStop(0, '#fbbf24');
        barGradient.addColorStop(0.5, '#f59e0b');
        barGradient.addColorStop(1, '#fbbf24');
        ctx.fillStyle = barGradient;
        ctx.fillRect(0, 0, 16, 400);

        // Glowing Orbs
        ctx.save();
        ctx.filter = 'blur(60px)';
        ctx.fillStyle = 'rgba(251, 191, 36, 0.15)';
        ctx.beginPath();
        ctx.arc(550, 50, 80, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // 5. Header
        ctx.fillStyle = '#fbbf24';
        ctx.font = 'bold 24px Georgia, serif';
        ctx.fillText('RIW 2026', 40, 50);

        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.font = 'bold 10px Arial, sans-serif';
        ctx.letterSpacing = '1px';
        ctx.fillText('RESEARCH INSTRUCTIVE WORKSHOP', 40, 75);

        // 6. Logo
        if (logoRef.current) {
            ctx.save();
            ctx.shadowColor = 'rgba(251, 191, 36, 0.3)';
            ctx.shadowBlur = 15;
            ctx.drawImage(logoRef.current, 510, 25, 60, 60);
            ctx.restore();
        }

        // 7. User Info
        const displayName = name || "Your Name";
        const displayRole = role || "Attendee";

        // Name
        ctx.save();
        ctx.shadowColor = 'rgba(0,0,0,0.5)';
        ctx.shadowBlur = 10;
        ctx.shadowOffsetY = 4;
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 52px Georgia, serif';
        const nameWidth = ctx.measureText(displayName).width;
        ctx.fillText(displayName, 300 - nameWidth / 2, 200);
        ctx.restore();

        // Role 
        ctx.fillStyle = '#fbbf24';
        ctx.font = 'bold 16px Arial, sans-serif';
        ctx.letterSpacing = '3px';
        const roleWidth = ctx.measureText(displayRole.toUpperCase()).width;
        ctx.fillText(displayRole.toUpperCase(), 300 - roleWidth / 2, 240);

        // 8. Footer
        // Divider
        const lineGrad = ctx.createLinearGradient(100, 0, 500, 0);
        lineGrad.addColorStop(0, 'rgba(255,255,255,0)');
        lineGrad.addColorStop(0.5, 'rgba(255,255,255,0.4)');
        lineGrad.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = lineGrad;
        ctx.fillRect(100, 290, 400, 1);

        // Details
        ctx.font = '14px monospace'; // Default monospace
        ctx.fillStyle = 'rgba(255,255,255,0.6)';
        ctx.fillText('LYON, FRANCE', 40, 350);

        ctx.textAlign = 'right';
        ctx.fillText('JAN 13, 2026', 560, 350);

        // Unique ID
        ctx.textAlign = 'center';

        // Chip BG
        ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.strokeStyle = 'rgba(251, 191, 36, 0.3)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.roundRect(220, 330, 160, 30, 15);
        ctx.fill();
        ctx.stroke();

        // ID Text
        ctx.fillStyle = uniqueId ? '#fbbf24' : 'rgba(251, 191, 36, 0.3)';
        ctx.font = 'bold 14px monospace';
        ctx.letterSpacing = '1px';
        ctx.fillText(uniqueId || "•••• - •••• - ••••", 300, 350);

        ctx.textAlign = 'left';
        ctx.letterSpacing = '0px';
    };

    // Draw when inputs change
    useEffect(() => {
        drawTicket();
    }, [name, role, uniqueId]);

    // Handle Download
    useEffect(() => {
        if (downloadRequested && uniqueId) {
            const canvas = canvasRef.current;
            if (!canvas) return;

            setTimeout(() => {
                const url = canvas.toDataURL('image/png');
                const link = document.createElement('a');
                link.download = `RIW-Access-Pass-${(name || 'guest').replace(/\s+/g, '-')}.png`;
                link.href = url;
                link.click();
                setDownloadRequested(false);
            }, 100);
        }
    }, [uniqueId, downloadRequested]);

    const handleDownloadClick = () => {
        if (!name.trim()) {
            setError('Please enter your name');
            return;
        }
        if (!role.trim()) {
            setError('Please enter your role');
            return;
        }
        setError('');

        const newId = generateId();
        setUniqueId(newId);
        setDownloadRequested(true);
    };

    return (
        <section className="py-24 bg-brand-950 relative overflow-hidden">
            {/* Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-accent-600/20 blur-[120px] rounded-full pointer-events-none"></div>

            {/* Container: Changed to xl:flex-row with 60/40 split for larger card */}
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col xl:flex-row items-center gap-12 xl:gap-20">

                {/* Visualizer Side (Larger Proportions) */}
                <div className="w-full xl:w-3/5 flex justify-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        className="relative p-0 md:p-6 w-full flex justify-center"
                    >
                        {/* Hidden Canvas (HD) */}
                        <canvas ref={canvasRef} className="hidden" />

                        {/* Live Preview (Fluid Size) */}
                        {/* W-full allows it to fill the 3/5 column. Max-w-3xl prevents absurdity on giants. */}
                        <div className="w-full max-w-3xl aspect-[1.5] rounded-xl relative overflow-hidden select-none shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] border border-white/10 group">

                            {/* Deep Background Base */}
                            <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-black z-0"></div>

                            {/* Texture Overlay */}
                            <div className="absolute inset-0 z-0 opacity-10 mix-blend-overlay">
                                <img src="/pass-card-bg.png" alt="Texture" className="w-full h-full object-cover grayscale contrast-125" />
                            </div>

                            {/* Tech Grid */}
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:30px_30px] z-0 pointer-events-none"></div>

                            {/* Glow Orb */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-gold-400/20 blur-[80px] rounded-full pointer-events-none z-0"></div>

                            {/* Gold Side Bar */}
                            <div className="absolute left-0 top-0 bottom-0 w-3 md:w-4 bg-gradient-to-b from-gold-400 via-amber-500 to-gold-400 z-10 shadow-[4px_0_20px_rgba(251,191,36,0.3)]"></div>

                            {/* Content Layer (Grid Logic for Responsive Scaling) */}
                            <div className="relative z-20 flex flex-col h-full justify-between p-6 md:p-10 pl-8 md:pl-12">
                                {/* Header */}
                                <div className="flex justify-between items-start">
                                    <div className="flex flex-col">
                                        <span className="text-gold-400 font-serif font-bold text-lg md:text-2xl lg:text-3xl tracking-tight">RIW 2026</span>
                                        <span className="text-white/60 text-[8px] md:text-[10px] lg:text-xs font-bold tracking-widest uppercase mt-1">Research Instructive Workshop</span>
                                    </div>
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-gold-400/30 blur-xl rounded-full"></div>
                                        <img src="/riw-logo.png" alt="Logo" className="w-10 h-10 md:w-14 md:h-14 object-contain relative z-10" />
                                    </div>
                                </div>

                                {/* Main Identity */}
                                <div className="text-center my-auto space-y-2">
                                    <h3 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-white drop-shadow-2xl tracking-wide break-words line-clamp-2 px-4">
                                        {name || "Your Name"}
                                    </h3>
                                    <p className="text-gold-400 text-xs md:text-sm lg:text-base font-bold tracking-[0.2em] uppercase">
                                        {role || "Attendee"}
                                    </p>
                                </div>

                                {/* Footer & Data */}
                                <div className="space-y-4">
                                    {/* Line */}
                                    <div className="h-[1px] w-3/4 mx-auto bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>

                                    {/* Chip & Meta */}
                                    <div className="flex justify-between items-end">
                                        <span className="font-mono text-white/50 text-[10px] md:text-xs">LYON, FRANCE</span>

                                        <div className="bg-white/5 border border-gold-400/30 rounded-full px-3 md:px-4 py-1 backdrop-blur-sm">
                                            {/* ID hidden placeholder */}
                                            <span className="font-mono text-[10px] md:text-xs font-bold tracking-widest text-gold-400/30">
                                                •••• - •••• - ••••
                                            </span>
                                        </div>

                                        <span className="font-mono text-white/50 text-[10px] md:text-xs">JAN 13, 2026</span>
                                    </div>
                                </div>
                            </div>

                            {/* Shine Effect */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out pointer-events-none z-30"></div>
                        </div>
                    </motion.div>
                </div>

                {/* Controls Side */}
                <div className="w-full xl:w-2/5">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <Zap className="text-gold-400" size={24} />
                            <span className="text-gold-400 font-bold tracking-widest uppercase text-sm">Exclusive Access</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">Claim Your Official Pass</h2>
                        <p className="text-brand-200 mb-8 max-w-lg leading-relaxed">
                            Generate your personalized, high-fidelity digital badge for the 2026 Summit. This pass serves as your unique identifier for all workshop sessions.
                        </p>

                        <div className="space-y-4 max-w-md">
                            {/* Inputs ... */}
                            <div className="relative group">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-400 group-focus-within:text-gold-400 transition-colors" size={20} />
                                <input
                                    type="text"
                                    maxLength={20}
                                    value={name}
                                    onChange={(e) => {
                                        setName(e.target.value);
                                        if (error) setError('');
                                    }}
                                    placeholder="Enter your full name"
                                    className="w-full bg-white/5 border border-brand-700 rounded-xl py-4 pl-12 pr-4 text-white placeholder-brand-500 focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400 focus:bg-white/10 transition-all font-serif"
                                />
                            </div>
                            <div className="relative group">
                                <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-400 group-focus-within:text-gold-400 transition-colors" size={20} />
                                <input
                                    type="text"
                                    maxLength={15}
                                    value={role}
                                    onChange={(e) => {
                                        setRole(e.target.value);
                                        if (error) setError('');
                                    }}
                                    placeholder="Enter your field/role"
                                    className="w-full bg-white/5 border border-brand-700 rounded-xl py-4 pl-12 pr-4 text-white placeholder-brand-500 focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400 focus:bg-white/10 transition-all font-medium uppercase tracking-wider text-sm"
                                />
                            </div>

                            {error && (
                                <motion.p
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-red-400 text-sm font-bold ml-2 flex items-center gap-2"
                                >
                                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 display-inline-block"></span>
                                    {error}
                                </motion.p>
                            )}

                            <button
                                onClick={handleDownloadClick}
                                className="w-full mt-4 bg-gradient-to-r from-gold-400 to-amber-500 hover:from-gold-300 hover:to-amber-400 text-brand-950 font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all transform active:scale-[0.98] shadow-lg shadow-gold-400/20 group relative overflow-hidden"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    <Download size={20} className="group-hover:-translate-y-0.5 transition-transform" />
                                    {downloadRequested ? 'Minting Pass...' : 'Download Official Pass'}
                                </span>
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default DigitalTicket;
