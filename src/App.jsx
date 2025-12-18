import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue } from 'framer-motion';
import { Calendar, MapPin, Clock, Users, ChevronRight, Mail, Menu, X, ArrowRight, Star, Linkedin } from 'lucide-react';
import clsx from 'clsx';

// --- Data ---
const eventData = {
    details: {
        title: "Life After LIVE 2026",
        subtitle: "Research Instructive Workshop",
        date: "Tuesday, 13th January 2026",
        location: "Salles des Thèses, Main Building, Rockefeller Campus, 8 avenue Rockefeller, 69008, LYON",
        description: "The core purpose of Life After LIVE 2026 is to furnish Master’s students with the necessary knowledge, inspiration, and connections to skillfully manage the leap from academic instruction to influential careers. By curating meaningful dialogues with industry pioneers, researchers, and global health specialists, we aspire to offer a distinctive setting where attendees can gain insights into real-world challenges, sector trends, and the capabilities required for success across various professional trajectories.",
        contactEmail: "mylive@univ-lyon1.fr"
    },
    highlights: [
        "Fueling career progression",
        "Supplying practical, actionable career intelligence",
        "Cultivating professional relationships",
        "Highlighting topics pertinent to both industry and academic realms"
    ],
    schedule: [
        { time: "09:00", title: "Opening Ceremony", speaker: "Pr. Christine Delprat", type: "intro" },
        { time: "09:10", title: "Keynote: Vaccine Design", speaker: "Iyiola Oladunjoye", type: "talk" },
        { time: "09:40", title: "Industry Perspectives", speaker: "Josselyn Andrea Yaguana Navarrete", type: "talk" },
        { time: "10:10", title: "Coffee Break & Networking", type: "break" },
        { time: "10:30", title: "Translational Science", speaker: "Sodiq Ayobami Hameed", type: "talk" },
        { time: "11:00", title: "Pathology in Drug Dev", speaker: "Christel Pao", type: "talk" },
        { time: "11:30", title: "Neural Stem Cells", speaker: "Cinthia Violeta Hernández Puente", type: "talk" },
        { time: "12:00", title: "Open Expert Panel", type: "panel" },
        { time: "12:45", title: "Lunch Break", type: "break" },
        { time: "14:00", title: "mRNA Technology", speaker: "Sergio Linares Fernandez", type: "talk" },
        { time: "14:30", title: "Virus-Host Interactions", speaker: "Florian Gegenfurtner", type: "talk" },
        { time: "15:00", title: "Afternoon Break", type: "break" },
        { time: "15:20", title: "MVA-based Vaccines", speaker: "Leonie Mayer", type: "talk" },
        { time: "15:50", title: "Mucosal Vaccines", speaker: "Beatriz Miguelena Chamorro", type: "talk" },
        { time: "16:20", title: "Event Wrap Up", speaker: "Dr. Christophe Gilbert", type: "intro" }
    ],
    speakers: [
        {
            name: "Iyiola Oladunjoye",
            role: "Vaccine Scientist",
            org: "Ludwig Institute for Cancer Research",
            email: "iyiola.oladunjoye@ludwig.ox.ac.uk",
            summary: "DPhil student at Oxford with a background in viral-vector vaccine design. Worked on ChAdOx1 nCoV-19 and Marburg virus trials.",
            fullBio: "Iyiola Oladunjoye is a DPhil student at the University of Oxford with a strong background in microbiology, vaccinology, and translational vaccine research. He completed his BSc in Microbiology at the University of Ilorin, Nigeria, gaining experience in environmental microbiology and public health, before earning the prestigious Erasmus Mundus Joint Master's Degree in Vaccinology (LIVE), training across five European institutions and receiving advanced instruction in immunology, infectiology, clinical research, and vaccine regulation. His MSc thesis at the Oxford Vaccine Group, supervised by Dr. Daniel Wright and Professor Teresa Lambe, focused on viral-vector vaccine design for outbreak pathogens and contributed to research on the ChAdOx1 nCoV-19 fourth-dose booster and anti-vector immunity. Prior to beginning his DPhil, he worked as a Research Assistant with the same group, supporting the Marburg virus Phase I clinical trial and Sudan Ebola vaccine preclinical studies, experiences that deepened his commitment to vaccine immunology and translational research."
        },
        {
            name: "Josselyn Yaguana Navarrete",
            role: "Technical Account Manager",
            org: "GenScript",
            email: "josselyn.yaguananavarette@genscript.com",
            summary: "Biosciences professional specializing in molecular biology and protein science. Graduate of the LIVE Erasmus Mundus Joint Master 2024.",
            fullBio: "Josselyn Yaguana is a biosciences professional with a strong background in molecular biology, protein science, and vaccinology, and is a graduate of the LIVE Erasmus Mundus Joint Master 2024 promotion. She conducted her master’s research at Instituto Butantan in Brazil in the Laboratory of Vaccine Development, focusing on antigen design and immunological characterization. Previously, Josselyn worked at the Institute of Biotechnology and Biomedicine (IBB-UAB). She currently works as a Technical Account Manager at GenScript, providing scientific and technical support to research teams across Spain and South Africa on academia, biotech and pharma sector."
        },
        {
            name: "Sodiq Ayobami Hameed",
            role: "Marie Curie Doctoral Fellow",
            org: "University College Dublin",
            email: "sodiq.hameed@ucdconnect.ie",
            summary: "Translational research scientist focusing on cancer genomics and precision medicine. Visiting Researcher at UC Santa Barbara.",
            fullBio: "Sodiq Ayobami Hameed is a translational research scientist with a strong background in vaccinology, immunology, and cancer genomics, and is currently pursuing his PhD at University College Dublin and the University of Galway, where he focuses on precision medicine at the intersection of immunology, genomics, and bioinformatics to better understand and combat cancer. A graduate of the Erasmus Mundus LIVE Master’s programme, he trained across leading European institutions, Barcelona, Antwerp, Lyon, and Saint-Étienne, gaining expertise in advanced immunology, molecular biology, vaccine R&D, and project management. His research experience spans both academia and industry, including a research internship at Boehringer Ingelheim and his current role as a Visiting Researcher at the University of California, Santa Barbara. Sodiq has contributed to peer-reviewed publications in immunology and vaccinology, and his earlier training as a Doctor of Veterinary Medicine at Usmanu Danfodiyo University earned him multiple awards for outstanding academic performance. His work reflects a deep commitment to improving global health through innovative research in infectious diseases and cancer."
        },
        {
            name: "Dr. Christel Pao",
            role: "Senior Pathologist",
            org: "Sanofi Translational Medicine",
            email: "christel_pao@yahoo.com",
            summary: "M.D., MSc providing pathological interpretation for drug development. Former Chief Resident of Pathology at De La Salle University.",
            fullBio: "Dr. Christel Pao, M.D., MSc, is a Senior Principal Scientist I and Senior Medical Pathologist at Sanofi’s Translational Medicine Unit, where she provides expert pathological interpretation to support drug development, leads biomarker analyses, and collaborates across scientific teams on tissue evaluation and immunohistochemistry validation. Her career spans clinical practice, academia, and industry, including serving as Chief Resident of Pathology & Laboratory Medicine at De La Salle University Medical Center in the Philippines, teaching and mentoring medical students, and contributing to global vaccine R&D through an internship with External Scientific Affairs at Sanofi Pasteur. She holds an MSc in Leading International Vaccinology Education (EMJM LIVE), specialized training in pathology and laboratory medicine, a medical degree from De La Salle Health Sciences Institute, and a BSc in Human Biology, earning multiple academic honors throughout her education."
        },
        {
            name: "Cinthia Violeta Hernández Puente",
            role: "PhD Candidate",
            org: "Institut des Neurosciences Paris-Saclay",
            email: "violeta.hp@outlook.com",
            summary: "Neuroscientist investigating redox signaling in neural stem cells. Seeking new research or industry opportunities starting Jan 2026.",
            fullBio: "Cinthia Violeta Hernández Puente is a neuroscientist with expertise in redox biology, developmental neurobiology, and regenerative medicine. She is currently completing her PhD at the Institut des Neurosciences Paris-Saclay (2022–2026), where she investigates NOX-regulated redox signaling in neural stem cell maintenance during retinal regeneration in Xenopus. She previously worked across diverse research areas including cancer biology, gene editing, immunology, and epigenetics, and has contributed to clinical research projects in oncology, cardiology, and COVID-19. Cinthia also brings experience in data engineering and university teaching, and has presented her work at multiple international conferences. She will be seeking new research or industry opportunities starting January 2026."
        },
        {
            name: "Sergio Linares Fernandez",
            role: "Unit Head RNA Science Automation",
            org: "Sanofi mRNA Center of Excellence",
            email: "sergio.linares-fernandez@sanofi.com",
            summary: "Leads automation for mRNA technology development. PhD in mRNA Vaccines against HIV from CNRS.",
            fullBio: "Sergio Linares Fernandez currently serves as Unit Head for RNA Science Automation at Sanofi, where he leads cutting-edge initiatives in mRNA technology development. A Spanish national working in France, Sergio brings a rich international background to his leadership role. Sergio earned a bachelor’s degree in biotechnology from the University of Cadiz, Spain, which included international exchange experiences in Santiago de Chile and Prague. He continued his education through the LIVE Master’s program (1st Jenner promotion, 2018) and completed a PhD in mRNA Vaccines against HIV at CNRS, France (2021). His training also includes coursework in vaccinology at Institut Pasteur. Sergio joined Sanofi around the time of the mRNA Center of Excellence establishment (2021), where he was tasked with building the RNA Drug substance Automation Unit. In this role, he has been responsible for team recruitment, equipment selection, and execution, as well as participating in external technology evaluations and collaborations. Currently, Sergio manages the Automation Unit for RNA Science and leads an operational team that evaluates new technologies in collaboration with CMC. His responsibilities include overseeing automation initiatives across the mRNA Center of Excellence’s sites, including locations in Waltham, Marcy L’Étoile, and Orlando. Throughout his time at Sanofi, he has participated in leadership roles across different operational teams in the research division."
        },
        {
            name: "Florian Gegenfurtner",
            role: "PhD Candidate Vaccinology",
            org: "Karolinska Institutet Stockholm",
            email: "florian.gegenfurtner@ki.se",
            summary: "Biochemist focusing on immunology and virus-host interactions (RSV, hMPV). Extensive research experience at TUM and University of Antwerp.",
            fullBio: "Florian Gegenfurtner is a biochemist and vaccinology researcher currently pursuing his PhD at Karolinska Institutet, focusing on immunology and virus-host interactions. He completed his bachelor’s and master’s degrees in Biochemistry at the Technical University of Munich, specializing in clinical chemistry and virology, and later joined the Erasmus Mundus LIVE Master’s programme, where he trained across leading European institutions in immunology, infectiology, and vaccine science. During his master’s research at Karolinska Institutet, he investigated cross-neutralizing antibodies against RSV and hMPV, combining cell culture, ELISA, and computational analyses. Florian has accumulated extensive research experience through multiple internships and assistant positions, including work at TUM’s Institute of Virology, the Bavarian NMR Center, Klinikum rechts der Isar, and the University of Antwerp, contributing to projects involving SARS-CoV-2 variant detection, HBV protein interactions, and cytokine responses in respiratory infections."
        },
        {
            name: "Leonie Mayer",
            role: "Postdoctoral Researcher",
            org: "UMC Hamburg-Eppendorf (IIRVD)",
            email: "l.mayer@uke.de",
            summary: "Working on MVA-based vaccines against MERS. Investigated antibody responses to Malaria and COVID-19.",
            fullBio: "Leonie Mayer is a postdoctoral researcher at the Institute for Infection Research and Vaccine Development (IIRVD) of the University Medical Center Hamburg-Eppendorf in Germany. She studied Microbiology at the Maastricht University in the Netherlands and conducted research on biofilm evolution at the Institute Pasteur in Paris, France. She then joined the Montagu Promotion of the LIVE Master and completed her thesis at the Institute for Global Health in Barcelona, Spain, where she investigated antibody responses to Malaria vaccination. Returning to Germany in 2020, she pursued her PhD under the supervision of Prof. Addo at the IIRVD, analyzing the human immune responses to COVID-19 vaccination. After completing her PhD, she continued as a postdoctoral researcher at the institute, where she is now working on the early-stage clinical development of an MVA-based vaccine candidate against the Middle East respiratory syndrome."
        },
        {
            name: "Beatriz Miguelena Chamorro",
            role: "Associate Scientific Director",
            org: "ICTYODEV",
            email: "b.miguelenachamorro@gmail.com",
            summary: "Veterinarian and vaccinologist with expertise in mucosal immunology. PhD in collaboration with Boehringer Ingelheim on mucosal vaccines for dogs.",
            fullBio: "Beatriz Miguelena Chamorro is a veterinarian and vaccinologist with expertise in mucosal immunology, vaccine development, and scientific communication. Currently an Associate Scientific Director at ICTYODEV, she completed her PhD through a CIFRE collaboration between the CIRI (Team GIMAP) and Boehringer Ingelheim, where she developed physiologically relevant models to evaluate oral Bordetella bronchiseptica vaccine candidates for dogs. A graduate of the Erasmus Mundus LIVE Master’s programme, she trained across leading European institutions in immunology, infectiology, and vaccinology, building on her DVM from the University of Zaragoza. Beatriz has extensive teaching experience at Université Jean Monnet Saint-Étienne, where she delivered immunology and vaccine-focused courses across undergraduate and master’s levels, and she has contributed to scientific outreach through podcasts and community engagement. Alongside her research career, she is deeply committed to education, languages, and social service, volunteering across multiple organizations supporting vulnerable communities. Her work reflects a strong dedication to advancing vaccine science while fostering human connection through teaching and public engagement."
        }
    ],
    team: [
        { name: "Aoibh Daly", role: "Project Manager", sub: "Scientist - Ireland" },
        { name: "Leonardo Gonzalez", role: "Logistic Manager", sub: "Scientist - Mexico" },
        { name: "Rao Zubair Khaliq", role: "Event Manager", sub: "Scientist - Pakistan" },
        { name: "Meije Forest", role: "Communication Manager", sub: "Pharmacist - France" },
        { name: "Krishna Kompalli", role: "Finance Manager", sub: "Data Scientist - India" }
    ]
};

// --- Components ---

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Schedule', href: '#schedule' },
        { name: 'Speakers', href: '#speakers' },
        { name: 'Team', href: '#team' },
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: "circOut" }}
            className={clsx(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b",
                scrolled
                    ? "bg-white/80 backdrop-blur-md border-brand-100/50 shadow-sm py-3"
                    : "bg-transparent border-transparent py-6"
            )}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    <div className="flex-shrink-0 flex items-center gap-2 group cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
                        <img src="/riw-logo.png" alt="RIW 2026 Logo" className="h-12 w-auto object-contain bg-white/90 rounded-md p-1" />
                    </div>

                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className={clsx(
                                        "px-3 py-2 rounded-md text-sm font-medium transition-all hover:-translate-y-0.5",
                                        scrolled
                                            ? "text-brand-950 hover:text-accent-600"
                                            : "text-white/90 hover:text-white hover:bg-white/10"
                                    )}
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={clsx("focus:outline-none transition-colors", scrolled ? "text-brand-900" : "text-white")}
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-brand-950 border-b border-brand-800 absolute w-full overflow-hidden"
                    >
                        <div className="px-2 pt-2 pb-8 space-y-1 sm:px-3">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="text-brand-100 hover:text-white hover:bg-brand-900 block px-3 py-4 rounded-md text-lg font-serif font-medium text-center"
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

const Hero = () => {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const opacity = useTransform(scrollY, [0, 400], [1, 0]);

    return (
        <div id="home" className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-brand-900">
            <div className="absolute inset-0 opacity-40">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand-800 rounded-full mix-blend-screen blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent-600 rounded-full mix-blend-screen blur-[120px] opacity-40 animate-pulse delay-1000"></div>
                <div className="absolute top-[40%] left-[40%] w-[30%] h-[30%] bg-gold-400 rounded-full mix-blend-screen blur-[100px] animate-pulse delay-700"></div>
            </div>
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-overlay"></div>

            <motion.div style={{ y: y1, opacity }} className="relative z-10 max-w-5xl mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-gold-100 mb-8 font-medium tracking-wide text-sm uppercase"
                >
                    <Star size={14} className="text-gold-400" fill="currentColor" />
                    {eventData.details.subtitle}
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="font-serif text-6xl md:text-8xl lg:text-9xl font-bold text-white tracking-tighter leading-[0.9] mb-8"
                >
                    Life After <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-600 via-gold-400 to-gold-500">LIVE</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-lg md:text-2xl text-brand-100 max-w-2xl mx-auto font-light leading-relaxed mb-12"
                >
                    {eventData.details.description}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-6"
                >
                    <div className="flex items-center gap-3 text-white/80 border-r border-white/20 pr-6 mr-2 hidden sm:flex">
                        <Calendar className="w-5 h-5 text-gold-400" />
                        <span>{eventData.details.date}</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/80">
                        <MapPin className="w-5 h-5 text-gold-400" />
                        <span>Lyon, France</span>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="mt-16"
                >
                    <a href="#schedule" className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-brand-950 transition-all duration-200 bg-gold-400 font-serif rounded-full hover:bg-gold-500 hover:scale-105 focus:outline-none ring-offset-2 focus:ring-2 ring-gold-400 shadow-lg shadow-gold-400/50">
                        Explore Schedule
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                </motion.div>
            </motion.div>

            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30"
            >
                <div className="w-6 h-10 border-2 border-current rounded-full flex justify-center p-1">
                    <div className="w-1 h-3 bg-current rounded-full"></div>
                </div>
            </motion.div>
        </div>
    );
};

const SectionHeader = ({ title, subtitle, centered = false }) => (
    <div className={clsx("mb-16", centered && "text-center")}>
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={clsx("flex items-center gap-3 mb-4", centered && "justify-center")}
        >
            <div className="h-px w-12 bg-brand-900/20"></div>
            <span className="text-brand-800 font-bold uppercase tracking-widest text-sm">{subtitle}</span>
            <div className={clsx("h-px w-12 bg-brand-900/20", !centered && "hidden")}></div>
        </motion.div>
        <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif font-bold text-brand-950"
        >
            {title}
        </motion.h2>
    </div>
);

const About = () => {
    return (
        <section id="about" className="py-24 bg-brand-50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/50 to-transparent pointer-events-none"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <SectionHeader title="Bridging Academia & Industry" subtitle="Why Attend" />
                        <p className="text-lg text-slate-700 leading-relaxed mb-8">
                            This gathering presents an invaluable opportunity for students to expand their outlook, obtain practical guidance, and connect with a dedicated, supportive community of professionals committed to making an impact in global health. Whether your aspirations lie in research, industry, policy, or humanitarian endeavors, RIW 2026 is positioned to guide you.
                        </p>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {eventData.highlights.map((highlight, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="p-6 bg-white rounded-xl shadow-sm border border-brand-100/50 hover:shadow-lg hover:border-gold-400 transition-all group"
                                >
                                    <div className="mb-4 inline-flex p-3 rounded-lg bg-gold-50 text-gold-700 group-hover:bg-gold-400 group-hover:text-brand-950 transition-colors">
                                        <Star size={20} />
                                    </div>
                                    <p className="font-medium text-slate-800 leading-snug">{highlight}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="relative">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="aspect-square rounded-full border border-brand-200 p-8 relative"
                        >
                            <div className="absolute inset-0 rounded-full border border-dashed border-brand-200 animate-spin-slow"></div>
                            <div className="w-full h-full rounded-full bg-gradient-to-br from-brand-800 to-brand-900 flex items-center justify-center text-center p-8 shadow-2xl relative overflow-hidden">
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                                <div className="relative z-10">
                                    <div className="text-gold-400 font-serif text-9xl font-bold opacity-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none">26</div>
                                    <h3 className="text-white font-serif text-3xl md:text-4xl font-bold mb-2">Network</h3>
                                    <p className="text-gold-100">with the best minds</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const DNAScheduleItem = ({ item, index, isEven }) => {
    const isBreak = item.type === 'break';
    const isSpecial = item.type === 'intro' || item.type === 'panel';
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-100, 100], [5, -5]);
    const rotateY = useTransform(x, [-100, 100], [-5, 5]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={clsx(
                "relative flex items-center justify-between mb-16 w-full gap-8",
                isEven ? "flex-row" : "flex-row-reverse"
            )}
        >
            <div className="w-full md:w-[45%] group perspective-1000">
                <motion.div
                    style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                    onMouseMove={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        x.set(e.clientX - (rect.left + rect.width / 2));
                        y.set(e.clientY - (rect.top + rect.height / 2));
                    }}
                    onMouseLeave={() => { x.set(0); y.set(0); }}
                    className={clsx(
                        "relative p-6 rounded-2xl border backdrop-blur-sm transition-all duration-300 transform-gpu",
                        isBreak ? "bg-slate-50/80 border-dashed border-slate-300" : "bg-white/90 border-brand-100 shadow-xl hover:shadow-2xl hover:border-brand-300"
                    )}
                >
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20"></div>
                    {isSpecial && <div className="absolute -top-3 -right-3 px-3 py-1 bg-brand-900 text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-lg z-30">Special</div>}
                    <div className="flex items-center justify-between mb-2">
                        <span className={clsx("font-serif font-bold text-lg", isBreak ? "text-slate-500 italic" : "text-brand-900")}>{item.time}</span>
                        {!isBreak && <div className="h-px flex-grow mx-4 bg-gradient-to-r from-brand-200 to-transparent"></div>}
                    </div>
                    <h3 className={clsx("text-xl font-bold mb-3", isBreak ? "text-slate-500" : "text-slate-900")}>{item.title}</h3>
                    {item.speaker && (
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-100 to-brand-50 flex items-center justify-center text-brand-900 font-bold text-sm shadow-inner">{item.speaker.charAt(0)}</div>
                            <div>
                                <p className="text-brand-800 font-medium text-sm leading-tight">{item.speaker}</p>
                                <p className="text-slate-500 text-xs">Speaker</p>
                            </div>
                        </div>
                    )}
                </motion.div>
            </div>

            <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center justify-center z-10">
                <motion.div
                    initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }}
                    className={clsx("w-6 h-6 rounded-full border-4 shadow-lg z-10 bg-white", isBreak ? "border-slate-300" : "border-brand-900")}
                >
                    {!isBreak && <div className="absolute inset-0 rounded-full bg-gold-400 animate-ping opacity-75"></div>}
                </motion.div>
            </div>

            <div className="w-full md:w-[45%] hidden md:block relative">
                <div className={clsx(
                    "absolute top-1/2 -translate-y-1/2 h-px w-12 bg-gradient-to-r from-brand-300 to-transparent",
                    isEven ? "left-0 -translate-x-full" : "right-0 translate-x-full"
                )}></div>
                <div className={clsx(
                    "h-px w-full bg-gradient-to-r opacity-30",
                    isEven ? "from-brand-300 to-transparent" : "from-transparent to-brand-300"
                )}></div>
            </div>
        </motion.div>
    );
};

const Schedule = () => {
    const containerRef = React.useRef(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
    const pathLength = useTransform(scrollYProgress, [0.1, 0.9], [0, 1]);

    return (
        <section id="schedule" className="py-24 bg-slate-50 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative" ref={containerRef}>
                <SectionHeader title="Scientific Program" subtitle="The Sequence" centered />
                <div className="relative mt-20">
                    <div className="absolute left-1/2 -translate-x-[0.5px] top-0 bottom-0 w-20 -ml-10 pointer-events-none hidden md:block">
                        <svg className="w-full h-full overflow-visible" preserveAspectRatio="none">
                            <motion.path d={`M 40 0 V 3000`} fill="none" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="4 4" />
                            <motion.path d={`M 40 0 V 3000`} fill="none" stroke="#4a0404" strokeWidth="2" style={{ pathLength }} />
                        </svg>
                    </div>
                    <div className="md:hidden absolute left-4 top-0 bottom-0 w-px bg-slate-200">
                        <motion.div style={{ height: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }} className="w-full bg-brand-900 origin-top" />
                    </div>
                    <div className="space-y-4 md:space-y-0 relative z-10">
                        {eventData.schedule.map((item, index) => (
                            <DNAScheduleItem key={index} item={item} index={index} isEven={index % 2 === 0} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

const SpeakerModal = ({ speaker, isOpen, onClose }) => {
    if (!speaker) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-brand-950/60 backdrop-blur-sm z-50 overflow-y-auto"
                    >
                        {/* Modal Container */}
                        <div className="min-h-screen px-4 text-center">
                            {/* This element is to trick the browser into centering the modal contents. */}
                            <span className="inline-block h-screen align-middle" aria-hidden="true">&#8203;</span>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                onClick={(e) => e.stopPropagation()}
                                className="inline-block w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-2xl rounded-2xl border border-brand-100 relative"
                            >
                                <button
                                    onClick={onClose}
                                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-brand-900 transition-colors"
                                >
                                    <X size={24} />
                                </button>

                                <div className="flex flex-col md:flex-row gap-6 mb-8 mt-4">
                                    {/* Initials Placeholder or Image if we had it */}
                                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-brand-800 to-brand-900 flex items-center justify-center text-white shrink-0 shadow-lg ring-4 ring-gold-100">
                                        <span className="font-serif text-3xl font-bold">{speaker.name.charAt(0)}</span>
                                    </div>

                                    <div>
                                        <h3 className="text-3xl font-serif font-bold text-brand-950 mb-2">{speaker.name}</h3>
                                        <div className="text-accent-600 font-bold uppercase text-sm tracking-wider mb-1">{speaker.role}</div>
                                        <div className="text-slate-500 font-medium">{speaker.org}</div>

                                        {speaker.email && (
                                            <a href={`mailto:${speaker.email}`} className="inline-flex items-center gap-2 mt-4 text-brand-800 hover:text-gold-600 font-semibold text-sm transition-colors">
                                                <Mail size={16} />
                                                {speaker.email}
                                            </a>
                                        )}
                                    </div>
                                </div>

                                <div className="prose prose-slate max-w-none border-t border-brand-50 pt-6">
                                    <p className="whitespace-pre-line leading-relaxed text-slate-700 text-lg">
                                        {speaker.fullBio}
                                    </p>
                                </div>

                                <div className="mt-8 pt-6 border-t border-brand-50 flex justify-end">
                                    <button
                                        onClick={onClose}
                                        className="px-6 py-2 bg-brand-50 text-brand-900 font-bold rounded-lg hover:bg-brand-100 transition-colors"
                                    >
                                        Close
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

const SpeakerCard = ({ speaker, index, onOpen }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group relative bg-white rounded-t-2xl border-b-4 border-b-brand-800 shadow-lg hover:shadow-2xl hover:border-b-gold-400 transition-all duration-500 overflow-hidden flex flex-col h-full"
        >
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
                <Users size={100} />
            </div>

            <div className="p-8 relative z-10 flex-grow">
                <div className="w-16 h-1 bg-gold-400 mb-6 group-hover:w-24 transition-all duration-300"></div>
                <h3 className="text-2xl font-serif font-bold text-brand-950 mb-2 group-hover:text-brand-800 transition-colors">
                    {speaker.name}
                </h3>
                <div className="flex flex-col gap-1 mb-6">
                    <span className="text-accent-600 font-bold uppercase text-xs tracking-wider">{speaker.role}</span>
                    <span className="text-slate-500 text-sm font-medium">{speaker.org}</span>
                </div>
                <p className="text-slate-600 leading-relaxed text-sm opacity-90 line-clamp-3">
                    {speaker.summary}
                </p>
            </div>

            <div className="px-8 pb-8 pt-0 relative z-10 mt-auto">
                <button
                    onClick={() => onOpen(speaker)}
                    className="group/btn inline-flex items-center gap-2 text-brand-800 font-bold text-sm uppercase tracking-wider hover:text-gold-600 transition-colors"
                >
                    View Profile
                    <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
            </div>

            {/* Decorative hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-brand-50 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500"></div>
        </motion.div>
    );
};

const Speakers = () => {
    const [selectedSpeaker, setSelectedSpeaker] = useState(null);

    return (
        <section id="speakers" className="py-24 bg-brand-50 border-t border-brand-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionHeader title="Distinguished Speakers" subtitle="The Experts" centered />
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                    {eventData.speakers.map((speaker, index) => (
                        <SpeakerCard
                            key={index}
                            speaker={speaker}
                            index={index}
                            onOpen={setSelectedSpeaker}
                        />
                    ))}
                </div>
            </div>

            <SpeakerModal
                speaker={selectedSpeaker}
                isOpen={!!selectedSpeaker}
                onClose={() => setSelectedSpeaker(null)}
            />
        </section>
    );
};

const Team = () => {
    return (
        <section id="team" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl font-serif font-bold text-brand-950 mb-12">Organizing Team</h2>
                <div className="flex flex-wrap justify-center gap-10">
                    {eventData.team.map((member, index) => (
                        <div key={index} className="flex flex-col items-center gap-3 group">
                            <div className="w-20 h-20 rounded-full bg-brand-50 border-2 border-brand-100 flex items-center justify-center text-brand-800 font-serif font-bold text-xl group-hover:border-gold-400 group-hover:scale-110 transition-all duration-300 shadow-sm relative overflow-hidden">
                                <div className="absolute inset-0 bg-gold-400 opacity-0 group-hover:opacity-20 transition-opacity"></div>
                                {member.name.charAt(0)}
                            </div>
                            <div className="text-center">
                                <h4 className="font-bold text-slate-900">{member.name}</h4>
                                <p className="text-slate-500 text-xs uppercase tracking-wide">{member.role}</p>
                                {member.sub && (
                                    <p className="text-brand-800 text-xs font-medium mt-1">{member.sub}</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const Footer = () => {
    return (
        <footer className="bg-brand-900 text-white py-16 relative overflow-hidden">
            {/* Pattern Overlay */}
            <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid md:grid-cols-3 gap-12 border-b border-brand-700 pb-12 mb-12">
                    <div>
                        <img src="/riw-logo.png" alt="RIW 2026 Logo" className="h-16 w-auto object-contain bg-white/90 rounded-md p-1 mb-6" />
                        <p className="mt-6 text-brand-200 max-w-sm leading-relaxed">
                            Empowering the next generation of vaccinologists through knowledge, connection, and innovation.
                        </p>
                    </div>
                    <div>
                        <h5 className="font-serif text-xl font-bold mb-6 text-brand-100">Contact</h5>
                        <a href={`mailto:${eventData.details.contactEmail}`} className="group flex items-center gap-3 text-brand-200 hover:text-gold-400 transition-colors">
                            <div className="p-2 rounded-full bg-brand-800 group-hover:bg-gold-400 group-hover:text-brand-900 transition-colors">
                                <Mail size={16} />
                            </div>
                            {eventData.details.contactEmail}
                        </a>
                    </div>
                    <div>
                        <h5 className="font-serif text-xl font-bold mb-6 text-brand-100">Venue</h5>
                        <p className="text-brand-200 flex items-start gap-3">
                            <div className="p-2 rounded-full bg-brand-800 shrink-0">
                                <MapPin size={16} />
                            </div>
                            {eventData.details.location}
                        </p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center text-sm text-brand-300">
                    <p>© 2026 Life After LIVE. All rights reserved.</p>
                    <div className="flex items-center gap-3 mt-4 md:mt-0">
                        <span className="text-xs font-semibold tracking-wider uppercase opacity-70">Co-funded by the European Union</span>
                        <div className="flex gap-1">
                            <div className="w-3 h-3 bg-brand-800 rounded-full"></div>
                            <div className="w-3 h-3 bg-gold-400 rounded-full"></div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default function App() {
    return (
        <div className="bg-white min-h-screen font-sans selection:bg-brand-200 selection:text-brand-900">
            <Navbar />
            <Hero />
            <About />
            <Schedule />
            <Speakers />
            <Team />
            <Footer />
        </div>
    );
}
