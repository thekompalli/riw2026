import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Microscope, Briefcase, Calculator, Eye, RotateCcw, Brain, Globe, Sparkles } from 'lucide-react';
import clsx from 'clsx';

const QUESTIONS = [
    {
        id: 0,
        text: "What aspect of life sciences excites you most?",
        options: [
            { text: "Fundamental Research & Discovery", next: 1, icon: Microscope },
            { text: "Clinical Applications & Patient Care", next: 2, icon: Briefcase },
            { text: "Technology & Innovation", next: 3, icon: Calculator }
        ]
    },
    {
        id: 1,
        text: "Which research area interests you?",
        options: [
            { text: "Vaccine Development & Immunology", result: "Vaccine Science", icon: Microscope },
            { text: "Genomics & Translational Science", result: "Translational Science", icon: Brain }
        ]
    },
    {
        id: 2,
        text: "What's your focus in patient care?",
        options: [
            { text: "Drug Development & Pathology", result: "Clinical Pathology", icon: Eye },
            { text: "Healthcare Systems & Global Health", result: "Global Health", icon: Globe }
        ]
    },
    {
        id: 3,
        text: "Which technology interests you?",
        options: [
            { text: "mRNA Technology & Automation", result: "Biotech Innovation", icon: Sparkles },
            { text: "Data Science & Bioinformatics", result: "Data Science", icon: Brain }
        ]
    }
];

const RECOMMENDATIONS = {
    "Vaccine Science": {
        title: "Vaccine Science & Immunology",
        desc: "You're passionate about discovery at the molecular level. Dive into cutting-edge vaccine design, MVA-based platforms, and immunological approaches shaping disease prevention. Essential sessions by Iyiola Oladunjoye (Oxford) on advanced vaccine design and Josselyn Yaguana (São Paulo) on immunological platforms.",
        color: "from-blue-600 to-cyan-400"
    },
    "Translational Science": {
        title: "Translational Science & Genomics",
        desc: "You excel at bridging research and real-world applications. Explore how genomics and translational approaches revolutionize personalized medicine. Don't miss Sodiq Hameed's (Dublin) talk on translational approaches and Cinthia Hernández's (Paris) session on research translation.",
        color: "from-purple-600 to-pink-500"
    },
    "Clinical Pathology": {
        title: "Clinical Pathology & Drug Development",
        desc: "Your focus is direct patient impact. Learn how pathology drives drug development and how diagnostics transform patient care. Perfect sessions with Dr. Christel Pao (Manila) on pathology in drug development and Beatriz Miguelena (Saint-Étienne) on clinical applications.",
        color: "from-emerald-600 to-teal-400"
    },
    "Global Health": {
        title: "Global Health & Healthcare Systems",
        desc: "You think big picture. Discover how healthcare systems can be optimized to serve populations worldwide, addressing global health challenges with innovative solutions. Sessions cover healthcare delivery systems and population-level impact strategies.",
        color: "from-green-600 to-lime-500"
    },
    "Biotech Innovation": {
        title: "Biotech & mRNA Technology",
        desc: "Stay at the forefront of biotechnology. Explore how mRNA technology and automation revolutionize drug development and manufacturing. Attend Sergio Linares' (Waltham) presentation on mRNA technology & automation and Florian Gegenfurtner's (Stockholm) session on biotech advances.",
        color: "from-orange-500 to-amber-500"
    },
    "Data Science": {
        title: "Data Science & Bioinformatics",
        desc: "For computational thinkers who see patterns in complexity. Master bioinformatics tools and data-driven approaches reshaping biological research. Leonie Mayer (Hamburg) covers computational biology, data analysis methods, and AI in life sciences.",
        color: "from-indigo-600 to-purple-500"
    }
};

const CareerPathfinder = () => {
    const [step, setStep] = useState(0);
    const [history, setHistory] = useState([]);
    const [result, setResult] = useState(null);

    const handleOption = (option) => {
        if (option.result) {
            setResult(RECOMMENDATIONS[option.result]);
        } else {
            setHistory([...history, step]);
            setStep(option.next);
        }
    };

    const reset = () => {
        setStep(0);
        setHistory([]);
        setResult(null);
    };

    return (
        <section className="py-32 bg-white relative overflow-hidden min-h-[800px] flex items-center justify-center">
            {/* Light Ambient Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-slate-50"></div>

            {/* Soft Orbs */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-200/20 blur-[120px] rounded-full mix-blend-multiply pointer-events-none animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-200/15 blur-[120px] rounded-full mix-blend-multiply pointer-events-none"></div>

            {/* Subtle Texture */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.02] pointer-events-none"></div>

            <div className="max-w-5xl mx-auto px-4 relative z-10 w-full">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-900 via-brand-700 to-gold-600 mb-4"
                    >
                        Find Your Path
                    </motion.h2>
                    <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                        Not sure which session to attend? Answer these two questions to discover your tailored RIW landscape.
                    </p>
                </div>

                {/* --- 2. Main Glass Card Interface --- */}
                <div className="relative">
                    {/* Subtle border effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-100 to-gold-100 rounded-3xl blur-lg transform scale-[1.01]"></div>

                    {/* Container */}
                    <div className="bg-white backdrop-blur-xl border border-slate-200 rounded-3xl overflow-hidden shadow-xl min-h-[600px] relative flex items-center justify-center">
                        <AnimatePresence mode="wait">
                            {!result ? (
                                <motion.div
                                    key="question"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20, position: 'absolute' }}
                                    transition={{ duration: 0.4 }}
                                    className="w-full flex flex-col items-center justify-center p-8 md:p-12"
                                >
                                    {/* Progress */}
                                    <div className="w-full max-w-lg mb-8 md:mb-12 flex items-center gap-4">
                                        <div className="text-xs font-bold text-gold-600 uppercase tracking-widest whitespace-nowrap">Step {history.length + 1} / 2</div>
                                        <div className="h-1 flex-1 bg-slate-200 rounded-full overflow-hidden">
                                            <motion.div
                                                className="h-full bg-gradient-to-r from-gold-500 to-amber-500"
                                                initial={{ width: `${(history.length / 2) * 100}%` }}
                                                animate={{ width: `${((history.length + 1) / 2) * 100}%` }}
                                            ></motion.div>
                                        </div>
                                    </div>

                                    <h3 className="text-2xl md:text-4xl font-serif font-bold text-brand-900 mb-10 md:mb-16 text-center leading-tight">
                                        {QUESTIONS[step].text}
                                    </h3>

                                    <div className={clsx("grid gap-4 md:gap-6 w-full max-w-4xl",
                                        QUESTIONS[step].options.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2"
                                    )}>
                                        {QUESTIONS[step].options.map((opt, idx) => (
                                            <motion.button
                                                key={idx}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: idx * 0.1 }}
                                                onClick={() => handleOption(opt)}
                                                className="group relative p-6 md:p-8 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-gold-400/50 transition-all duration-500 text-left hover:shadow-xl flex flex-col items-start gap-4 md:gap-6"
                                            >
                                                <div className={clsx("p-3 md:p-4 rounded-xl bg-gradient-to-br transition-transform duration-500 group-hover:scale-110 shadow-md",
                                                    idx % 2 === 0 ? "from-gold-100 to-amber-100 border border-gold-300 text-gold-600" : "from-brand-100 to-blue-100 border border-brand-300 text-brand-600")}>
                                                    {opt.icon ? <opt.icon size={28} className="md:w-8 md:h-8" /> : <div className="w-8 h-8 rounded-full border-2 border-current"></div>}
                                                </div>

                                                <div className="space-y-2 w-full">
                                                    <span className="text-lg md:text-xl font-bold text-brand-900 group-hover:text-gold-700 transition-colors block leading-tight">{opt.text}</span>
                                                    <div className="flex items-center gap-2 text-slate-500 text-sm font-medium group-hover:text-gold-600 transition-colors">
                                                        <span>Select</span>
                                                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                                    </div>
                                                </div>
                                            </motion.button>
                                        ))}
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="result"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="w-full flex flex-col items-center justify-center p-8 md:p-12 text-center relative overflow-hidden"
                                >
                                    {/* Dynamic Background Glow based on result */}
                                    <div className={clsx("absolute inset-0 opacity-10 bg-gradient-to-br", result.color)}></div>
                                    <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] mix-blend-multiply"></div>

                                    <div className="relative z-10 max-w-2xl py-8">
                                        <motion.div
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.2 }}
                                            className="inline-block p-2 px-6 rounded-full bg-gold-100 border border-gold-300 text-gold-700 font-bold uppercase tracking-[0.2em] text-xs md:text-sm mb-6 md:mb-8 shadow-md"
                                        >
                                            Your Ideal Track
                                        </motion.div>

                                        <motion.h3
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.3 }}
                                            className="text-4xl md:text-6xl font-serif font-bold mb-6 md:mb-8 text-brand-900 leading-tight"
                                        >
                                            {result.title}
                                        </motion.h3>

                                        <motion.p
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.4 }}
                                            className="text-lg md:text-xl text-slate-700 leading-relaxed mb-10 md:mb-12"
                                        >
                                            {result.desc}
                                        </motion.p>

                                        <motion.div
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.5 }}
                                            className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6"
                                        >
                                            <a
                                                href="#schedule"
                                                className="px-8 py-4 bg-gradient-to-r from-gold-500 to-amber-500 hover:from-gold-600 hover:to-amber-600 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                                            >
                                                Explore Schedule
                                                <ArrowRight size={18} />
                                            </a>
                                            <button
                                                onClick={reset}
                                                className="px-8 py-4 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-brand-900 rounded-xl transition-all flex items-center justify-center gap-2 hover:border-slate-400"
                                            >
                                                <RotateCcw size={18} />
                                                Start Over
                                            </button>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CareerPathfinder;
