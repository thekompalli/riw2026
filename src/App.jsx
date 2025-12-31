import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue } from 'framer-motion';
import { Calendar, MapPin, Clock, Users, ChevronRight, Mail, Menu, X, ArrowRight, Star, Linkedin, MessageCircle } from 'lucide-react';
import clsx from 'clsx';
import { useForm, ValidationError } from '@formspree/react';
import LocationMap from './components/LocationMap';
import ThreeBackground from './components/ThreeBackground';
import GlobalMap from './components/GlobalMap';
import CareerPathfinder from './components/CareerPathfinder';
import DigitalTicket from './components/DigitalTicket';
import DNASchedule from './components/DNASchedule';

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
        { time: "09:40", title: "Industry Perspectives", speaker: "Josselyn Yaguana Navarrete", type: "talk" },
        { time: "10:10", title: "Coffee Break & Networking", type: "break" },
        { time: "10:30", title: "Translational Science", speaker: "Sodiq Ayobami Hameed", type: "talk" },
        { time: "11:00", title: "Pathology in Drug Dev", speaker: "Dr. Christel Pao", type: "talk" },
        { time: "11:30", title: "Neural Stem Cells", speaker: "Cinthia Violeta Hernández Puente", type: "talk" },
        { time: "12:00", title: "Open Expert Panel", type: "panel" },
        { time: "12:45", title: "Lunch Break", type: "break" },
        { time: "14:00", title: "mRNA Technology", speaker: "Sergio Linares Fernandez", type: "talk" },
        { time: "14:30", title: "Virus-Host Interactions", speaker: "Florian Gegenfurtner", type: "talk" },
        { time: "15:00", title: "Afternoon Break", type: "break" },
        { time: "15:20", title: "MVA-based Vaccines", speaker: "Leonie Mayer", type: "talk" },
        { time: "15:50", title: "Mucosal Vaccines", speaker: "Beatriz Miguelena Chamorro", type: "talk" },
        { time: "16:20", title: "Event Wrap Up", speaker: "Dr. Christophe Gilbert", type: "closing" }
    ],
    speakers: [
        {
            name: "Iyiola Oladunjoye",
            role: "Vaccine Scientist",
            org: "Ludwig Institute for Cancer Research",
            email: "iyiola.oladunjoye@ludwig.ox.ac.uk",
            linkedin: "https://www.linkedin.com/in/iyioladunjoye/",
            image: "/Iyiola Oladunjoye.jpg",
            summary: "DPhil student at Oxford with a background in viral-vector vaccine design. Worked on ChAdOx1 nCoV-19 and Marburg virus trials.",
            fullBio: "Iyiola Oladunjoye is a DPhil student at the University of Oxford with a strong background in microbiology, vaccinology, and translational vaccine research. He completed his BSc in Microbiology at the University of Ilorin, Nigeria, gaining experience in environmental microbiology and public health, before earning the prestigious Erasmus Mundus Joint Master's Degree in Vaccinology (LIVE), training across five European institutions and receiving advanced instruction in immunology, infectiology, clinical research, and vaccine regulation. His MSc thesis at the Oxford Vaccine Group, supervised by Dr. Daniel Wright and Professor Teresa Lambe, focused on viral-vector vaccine design for outbreak pathogens and contributed to research on the ChAdOx1 nCoV-19 fourth-dose booster and anti-vector immunity. Prior to beginning his DPhil, he worked as a Research Assistant with the same group, supporting the Marburg virus Phase I clinical trial and Sudan Ebola vaccine preclinical studies, experiences that deepened his commitment to vaccine immunology and translational research."
        },
        {
            name: "Josselyn Yaguana Navarrete",
            role: "Technical Account Manager",
            org: "GenScript",
            email: "josselyn.yaguananavarette@genscript.com",
            linkedin: "https://www.linkedin.com/in/josselynayana/",
            image: "/Josselyn Yaguana Navarrete.jpg",
            summary: "Biosciences professional specializing in molecular biology and protein science. Graduate of the LIVE Erasmus Mundus Joint Master 2024.",
            fullBio: "Josselyn Yaguana is a biosciences professional with a strong background in molecular biology, protein science, and vaccinology, and is a graduate of the LIVE Erasmus Mundus Joint Master 2024 promotion. She conducted her master's research at Instituto Butantan in Brazil in the Laboratory of Vaccine Development, focusing on antigen design and immunological characterization. Previously, Josselyn worked at the Institute of Biotechnology and Biomedicine (IBB-UAB). She currently works as a Technical Account Manager at GenScript, providing scientific and technical support to research teams across Spain and South Africa on academia, biotech and pharma sector."
        },
        {
            name: "Sodiq Ayobami Hameed",
            role: "Marie Curie Doctoral Fellow",
            org: "University College Dublin",
            email: "sodiq.hameed@ucdconnect.ie",
            linkedin: "https://www.linkedin.com/in/sodiq-ayobami-hameed-7ba654192/",
            image: "/Sodiq Ayobami Hameed.jpg",
            summary: "Translational research scientist focusing on cancer genomics and precision medicine. Visiting Researcher at UC Santa Barbara.",
            fullBio: "Sodiq Ayobami Hameed is a translational research scientist with a strong background in vaccinology, immunology, and cancer genomics, and is currently pursuing his PhD at University College Dublin and the University of Galway, where he focuses on precision medicine at the intersection of immunology, genomics, and bioinformatics to better understand and combat cancer. A graduate of the Erasmus Mundus LIVE Master's programme, he trained across leading European institutions, Barcelona, Antwerp, Lyon, and Saint-Étienne, gaining expertise in advanced immunology, molecular biology, vaccine R&D, and project management. His research experience spans both academia and industry, including a research internship at Boehringer Ingelheim and his current role as a Visiting Researcher at the University of California, Santa Barbara. Sodiq has contributed to peer-reviewed publications in immunology and vaccinology, and his earlier training as a Doctor of Veterinary Medicine at Usmanu Danfodiyo University earned him multiple awards for outstanding academic performance. His work reflects a deep commitment to improving global health through innovative research in infectious diseases and cancer."
        },
        {
            name: "Dr. Christel Pao",
            role: "Senior Pathologist",
            org: "Sanofi Translational Medicine",
            email: "christel_pao@yahoo.com",
            linkedin: "https://www.linkedin.com/in/christel-pao/",
            image: "/Dr. Christel Pao.jpg",
            summary: "M.D., MSc providing pathological interpretation for drug development. Former Chief Resident of Pathology at De La Salle University.",
            fullBio: "Dr. Christel Pao, M.D., MSc, is a Senior Principal Scientist I and Senior Medical Pathologist at Sanofi's Translational Medicine Unit, where she provides expert pathological interpretation to support drug development, leads biomarker analyses, and collaborates across scientific teams on tissue evaluation and immunohistochemistry validation. Her career spans clinical practice, academia, and industry, including serving as Chief Resident of Pathology & Laboratory Medicine at De La Salle University Medical Center in the Philippines, teaching and mentoring medical students, and contributing to global vaccine R&D through an internship with External Scientific Affairs at Sanofi Pasteur. She holds an MSc in Leading International Vaccinology Education (EMJM LIVE), specialized training in pathology and laboratory medicine, a medical degree from De La Salle Health Sciences Institute, and a BSc in Human Biology, earning multiple academic honors throughout her education."
        },
        {
            name: "Cinthia Violeta Hernández Puente",
            role: "PhD Candidate",
            org: "Institut des Neurosciences Paris-Saclay",
            email: "violeta.hp@outlook.com",
            linkedin: "https://www.linkedin.com/in/lbg-violeta-hp/",
            image: "/Cinthia Violeta Hernández Puente.png",
            summary: "Neuroscientist investigating redox signaling in neural stem cells. Seeking new research or industry opportunities starting Jan 2026.",
            fullBio: "Cinthia Violeta Hernández Puente is a neuroscientist with expertise in redox biology, developmental neurobiology, and regenerative medicine. She is currently completing her PhD at the Institut des Neurosciences Paris-Saclay (2022–2026), where she investigates NOX-regulated redox signaling in neural stem cell maintenance during retinal regeneration in Xenopus. She previously worked across diverse research areas including cancer biology, gene editing, immunology, and epigenetics, and has contributed to clinical research projects in oncology, cardiology, and COVID-19. Cinthia also brings experience in data engineering and university teaching, and has presented her work at multiple international conferences. She will be seeking new research or industry opportunities starting January 2026."
        },
        {
            name: "Sergio Linares Fernandez",
            role: "Unit Head RNA Science Automation",
            org: "Sanofi mRNA Center of Excellence",
            email: "sergio.linares-fernandez@sanofi.com",
            linkedin: "https://www.linkedin.com/in/sergiolin/",
            image: "/Sergio Linares Fernandez.jpg",
            summary: "Leads automation for mRNA technology development. PhD in mRNA Vaccines against HIV from CNRS.",
            fullBio: "Sergio Linares Fernandez currently serves as Unit Head for RNA Science Automation at Sanofi, where he leads cutting-edge initiatives in mRNA technology development. A Spanish national working in France, Sergio brings a rich international background to his leadership role. Sergio earned a bachelor's degree in biotechnology from the University of Cadiz, Spain, which included international exchange experiences in Santiago de Chile and Prague. He continued his education through the LIVE Master's program (1st Jenner promotion, 2018) and completed a PhD in mRNA Vaccines against HIV at CNRS, France (2021). His training also includes coursework in vaccinology at Institut Pasteur. Sergio joined Sanofi around the time of the mRNA Center of Excellence establishment (2021), where he was tasked with building the RNA Drug substance Automation Unit. In this role, he has been responsible for team recruitment, equipment selection, and execution, as well as participating in external technology evaluations and collaborations. Currently, Sergio manages the Automation Unit for RNA Science and leads an operational team that evaluates new technologies in collaboration with CMC. His responsibilities include overseeing automation initiatives across the mRNA Center of Excellence's sites, including locations in Waltham, Marcy L'Étoile, and Orlando. Throughout his time at Sanofi, he has participated in leadership roles across different operational teams in the research division."
        },
        {
            name: "Florian Gegenfurtner",
            role: "PhD Candidate Vaccinology",
            org: "Karolinska Institutet Stockholm",
            email: "florian.gegenfurtner@ki.se",
            linkedin: "https://www.linkedin.com/in/florian-gegenfurtner/",
            image: "/Florian Gegenfurtner.jpg",
            summary: "Biochemist focusing on immunology and virus-host interactions (RSV, hMPV). Extensive research experience at TUM and University of Antwerp.",
            fullBio: "Florian Gegenfurtner is a biochemist and vaccinology researcher currently pursuing his PhD at Karolinska Institutet, focusing on immunology and virus-host interactions. He completed his bachelor's and master's degrees in Biochemistry at the Technical University of Munich, specializing in clinical chemistry and virology, and later joined the Erasmus Mundus LIVE Master's programme, where he trained across leading European institutions in immunology, infectiology, and vaccine science. During his master's research at Karolinska Institutet, he investigated cross-neutralizing antibodies against RSV and hMPV, combining cell culture, ELISA, and computational analyses. Florian has accumulated extensive research experience through multiple internships and assistant positions, including work at TUM's Institute of Virology, the Bavarian NMR Center, Klinikum rechts der Isar, and the University of Antwerp, contributing to projects involving SARS-CoV-2 variant detection, HBV protein interactions, and cytokine responses in respiratory infections."
        },
        {
            name: "Leonie Mayer",
            role: "Postdoctoral Researcher",
            org: "UMC Hamburg-Eppendorf (IIRVD)",
            email: "l.mayer@uke.de",
            linkedin: "https://www.linkedin.com/in/leonie-mayer/",
            image: "/Leonie Mayer.jpg",
            summary: "Working on MVA-based vaccines against MERS. Investigated antibody responses to Malaria and COVID-19.",
            fullBio: "Leonie Mayer is a postdoctoral researcher at the Institute for Infection Research and Vaccine Development (IIRVD) of the University Medical Center Hamburg-Eppendorf in Germany. She studied Microbiology at the Maastricht University in the Netherlands and conducted research on biofilm evolution at the Institute Pasteur in Paris, France. She then joined the Montagu Promotion of the LIVE Master and completed her thesis at the Institute for Global Health in Barcelona, Spain, where she investigated antibody responses to Malaria vaccination. Returning to Germany in 2020, she pursued her PhD under the supervision of Prof. Addo at the IIRVD, analyzing the human immune responses to COVID-19 vaccination. After completing her PhD, she continued as a postdoctoral researcher at the institute, where she is now working on the early-stage clinical development of an MVA-based vaccine candidate against the Middle East respiratory syndrome."
        },
        {
            name: "Beatriz Miguelena Chamorro",
            role: "Associate Scientific Director",
            org: "ICTYODEV",
            email: "b.miguelenachamorro@gmail.com",
            linkedin: "https://www.linkedin.com/in/beatriz-miguelena-chamorro-phd-dvm-037199163/",
            image: "/Beatriz Miguelena Chamorro.jpg",
            summary: "Veterinarian and vaccinologist with expertise in mucosal immunology. PhD in collaboration with Boehringer Ingelheim on mucosal vaccines for dogs.",
            fullBio: "Beatriz Miguelena Chamorro is a veterinarian and vaccinologist with expertise in mucosal immunology, vaccine development, and scientific communication. Currently an Associate Scientific Director at ICTYODEV, she completed her PhD through a CIFRE collaboration between the CIRI (Team GIMAP) and Boehringer Ingelheim, where she developed physiologically relevant models to evaluate oral Bordetella bronchiseptica vaccine candidates for dogs. A graduate of the Erasmus Mundus LIVE Master's programme, she trained across leading European institutions in immunology, infectiology, and vaccinology, building on her DVM from the University of Zaragoza. Beatriz has extensive teaching experience at Université Jean Monnet Saint-Étienne, where she delivered immunology and vaccine-focused courses across undergraduate and master's levels, and she has contributed to scientific outreach through podcasts and community engagement. Alongside her research career, she is deeply committed to education, languages, and social service, volunteering across multiple organizations supporting vulnerable communities. Her work reflects a strong dedication to advancing vaccine science while fostering human connection through teaching and public engagement."
        }
    ],

    team: [
        { name: "Aoibh Daly", role: "Project Manager", sub: "Scientist - Ireland", image: "/Aoibh Daly.jpg", linkedin: "https://www.linkedin.com/in/aoibh-daly-631768236/" },
        { name: "Leonardo Gonzalez", role: "Logistic Manager", sub: "Scientist - Mexico", image: "/Leo.png", linkedin: "https://www.linkedin.com/in/leonardourielgonzalezgarza/" },
        { name: "Rao Zubair Khaliq", role: "Event Manager", sub: "Scientist - Pakistan", image: "/Rao.jpg", linkedin: "https://www.linkedin.com/in/rao-zubair-khaliq/" },
        { name: "Meije Forest", role: "Communication Manager", sub: "Pharmacist - France", image: "/Meije.png", linkedin: "https://www.linkedin.com/in/meijeforest/" },
        { name: "Krishna Kompalli", role: "Finance Manager & Web Dev", sub: "Data Scientist - India", image: "/KrishnaKompalli.jpg", linkedin: "https://www.linkedin.com/in/krishna-kompalli/" }
    ]
};

// Optimizing lookups
const SPEAKER_MAP = new Map(eventData.speakers.map(s => [s.name, s]));

const SESSION_QUOTES = {
    "Opening Ceremony": { text: "Science knows no country, because knowledge belongs to humanity, and is the torch which illuminates the world.", author: "Louis Pasteur" },
    "Keynote: Vaccine Design": { text: "Vaccines are a miracle. They have saved more lives than any other medical invention.", author: "Bill Gates" },
    "Industry Perspectives": { text: "Applied science is the only science that matters.", author: "Thomas Edison" },
    "Translational Science": { text: "Translational research is the bridge that connects the island of discovery to the mainland of health.", author: "Elias Zerhouni" },
    "Pathology in Drug Dev": { text: "Observation is a passive science, experimentation an active science.", author: "Claude Bernard" },
    "Neural Stem Cells": { text: "The brain is a world consisting of a number of unexplored continents and great stretches of unknown territory.", author: "Santiago Ramón y Cajal" },
    "mRNA Technology": { text: "We are at the very beginning of understanding what RNA can do.", author: "Katalin Karikó" },
    "Virus-Host Interactions": { text: "The microbe is nothing. The terrain is everything.", author: "Louis Pasteur" },
    "MVA-based Vaccines": { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
    "Mucosal Vaccines": { text: "Nature places the remedy near the pain.", author: "Ancient Proverb" },
    "Open Expert Panel": { text: "Alone we can do so little; together we can do so much.", author: "Helen Keller" },
    "Coffee Break & Networking": { text: "Great things in business are never done by one person. They're done by a team of people.", author: "Steve Jobs" },
    "Lunch Break": { text: "One cannot think well, love well, sleep well, if one has not dined well.", author: "Virginia Woolf" },
    "Afternoon Break": { text: "Take rest; a field that has rested gives a bountiful crop.", author: "Ovid" },
    "Closing Remarks": { text: "The important thing is not to stop questioning.", author: "Albert Einstein" }
};

const SESSION_CONTENT = {
    "Opening Ceremony": "Join Pr. Christine Delprat as she inaugurates RIW 2026, setting the stage for a day of groundbreaking scientific discourse. Discover the vision behind this year's assembly and the pivotal role of next-generation vaccinologists in shaping global health.",
    "Keynote: Vaccine Design": "Dive into the cutting-edge world of viral-vector vaccine design with Iyiola Oladunjoye. This keynote explores the journey from antigen discovery to clinical application, highlighting lessons learned from the ChAdOx1 nCoV-19 and Marburg virus trials.",
    "Industry Perspectives": "Gain a competitive edge with Josselyn Yaguana Navarrete as she bridges the gap between academic research and biotechnological application. Learn how technical account management drives innovation at major industry players like GenScript.",
    "Translational Science": "Explore the intersection of immunology, genomics, and bioinformatics with Sodiq Ayobami Hameed. Uncover how precision medicine is revolutionizing our approach to combating cancer and complex infectious diseases.",
    "Pathology in Drug Dev": "Dr. Christel Pao reveals the critical role of pathological interpretation in drug development. Understand how biomarker analysis and tissue evaluation validate efficacy and guide decision-making in translational medicine.",
    "Neural Stem Cells": "Venture into the microscopic world of redox biology with Cinthia Violeta Hernández Puente. Discover how NOX-regulated signaling mechanisms are unlocking new potentials in retinal regeneration and neural stem cell maintenance.",
    "mRNA Technology": "Step into the future of medicine with Sergio Linares Fernandez from Sanofi's mRNA Center of Excellence. Analyze the automation strategies accelerating the development of mRNA therapeutics beyond vaccines.",
    "Virus-Host Interactions": "Florian Gegenfurtner dissects the complex battleground between viruses and host immunity. Examine the latest research on RSV and hMPV to understand cross-neutralizing antibody responses.",
    "MVA-based Vaccines": "Investigate the next frontier of MVA-based vaccines with Leonie Mayer. Learn about the early-stage clinical development of candidates against MERS and the broader implications for emerging infectious diseases.",
    "Mucosal Vaccines": "Beatriz Miguelena Chamorro presents the case for mucosal immunology. Discover how oral vaccine candidates for companion animals are providing relevant models for advancing human mucosal vaccination strategies.",
    "Open Expert Panel": "A dynamic, unscripted dialogue featuring our distinguished speakers. Engage directly with experts as they debate current trends, career pathways, and the future challenges facing the global health landscape.",
    "Coffee Break & Networking": "Take a well-deserved pause to connect with fellow researchers. Share insights, forge new collaborations, and recharge with premium refreshments in our dedicated networking lounge.",
    "Lunch Break": "Enjoy a curated culinary experience while discussing the morning's sessions. This extended break offers the perfect opportunity to deepen professional relationships in a relaxed atmosphere.",
    "Afternoon Break": "Refresh and recharge before the final session block. Enjoy a selection of snacks and beverages while discussing the afternoon's insights with colleagues.",
    "Closing Remarks": "Pr. Christine Delprat synthesizes the day's key takeaways, celebrating the shared knowledge and new connections formed. Look forward to the future impact of the research shared today."
};

const getSessionDescription = (item) => {
    return SESSION_CONTENT[item.title] || "An in-depth session exploring critical developments in immunology and vaccinology, offering novel insights and actionable knowledge for aspiring professionals.";
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

const Countdown = () => {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [isLive, setIsLive] = useState(false);

    useEffect(() => {
        const targetDate = new Date('2026-01-13T09:00:00');

        const interval = setInterval(() => {
            const now = new Date();
            const difference = targetDate - now;

            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((difference / 1000 / 60) % 60);
                const seconds = Math.floor((difference / 1000) % 60);
                setTimeLeft({ days, hours, minutes, seconds });
                setIsLive(false);
            } else {
                setIsLive(true);
                clearInterval(interval);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const TimeUnit = ({ value, label }) => (
        <div className="flex flex-col items-center mr-4 sm:mr-8 last:mr-0">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 flex items-center justify-center shadow-lg mb-2">
                <span className="font-serif text-2xl sm:text-3xl font-bold text-white tabular-nums">
                    {String(value).padStart(2, '0')}
                </span>
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-200">{label}</span>
        </div>
    );

    if (isLive) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="mt-10 mb-10 p-6 bg-gradient-to-r from-brand-900/80 to-brand-800/80 backdrop-blur-md rounded-2xl border border-gold-400/50 shadow-[0_0_30px_rgba(250,204,21,0.2)] inline-flex items-center gap-4 animate-pulse-slow"
            >
                <div className="relative">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-ping absolute inset-0"></div>
                    <div className="w-3 h-3 bg-red-500 rounded-full relative z-10"></div>
                </div>
                <div>
                    <h3 className="text-2xl font-serif font-bold text-white leading-none">Event is Live</h3>
                    <p className="text-gold-300 text-sm font-medium tracking-wide">Join us now on campus</p>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap gap-2 mt-10 mb-10"
        >
            <TimeUnit value={timeLeft.days} label="Days" />
            <TimeUnit value={timeLeft.hours} label="Hours" />
            <TimeUnit value={timeLeft.minutes} label="Mins" />
            <TimeUnit value={timeLeft.seconds} label="Secs" />
        </motion.div>
    );
};

const Hero = () => {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const opacity = useTransform(scrollY, [0, 400], [1, 0]);

    return (
        <div id="home" className="relative h-screen min-h-[850px] flex items-center overflow-hidden bg-brand-900">
            <ThreeBackground />
            {/* Robust Overlays for Readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-brand-950 via-brand-900/80 to-transparent z-10"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-brand-950/50 via-transparent to-brand-950 z-10"></div>

            {/* Ambient Glows */}
            <div className="absolute inset-0 opacity-30 z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand-800 rounded-full mix-blend-screen blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent-600 rounded-full mix-blend-screen blur-[120px] opacity-40 animate-pulse delay-1000"></div>
                <div className="absolute top-[40%] left-[40%] w-[30%] h-[30%] bg-gold-400 rounded-full mix-blend-screen blur-[100px] animate-pulse delay-700"></div>
            </div>
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-overlay z-0"></div>

            <motion.div style={{ y: y1, opacity }} className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left pt-32 pb-24 md:py-0">
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
                    className="font-serif text-6xl md:text-8xl lg:text-9xl font-bold text-white tracking-tighter leading-[0.9] mb-8 drop-shadow-2xl"
                >
                    Life After <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-600 via-gold-400 to-gold-500 drop-shadow-sm">LIVE</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-lg md:text-2xl text-brand-100 max-w-5xl font-light leading-relaxed mb-8 drop-shadow-lg"
                >
                    {eventData.details.description}
                </motion.p>

                <Countdown />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex flex-col sm:flex-row items-center sm:items-start justify-start gap-6"
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
                    className="mt-12"
                >
                    <div className="flex flex-col sm:flex-row gap-4">
                        <a href="#schedule" className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-brand-950 transition-all duration-200 bg-gold-400 font-serif rounded-full hover:bg-gold-500 hover:scale-105 focus:outline-none ring-offset-2 focus:ring-2 ring-gold-400 shadow-lg shadow-gold-400/50">
                            Explore Schedule
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </a>
                        <a
                            href="/Booklet RIW 2025-26 - 8th (1).pdf"
                            download="RIW_2026_Booklet.pdf"
                            className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-white/10 backdrop-blur-md border border-white/20 font-serif rounded-full hover:bg-white/20 hover:scale-105 focus:outline-none ring-offset-2 focus:ring-2 ring-white/30"
                        >
                            <Calendar className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform text-gold-400" />
                            Download Booklet
                        </a>
                    </div>
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
        <section id="about" className="py-32 bg-gradient-to-b from-white via-violet-50/30 to-indigo-50/20 relative overflow-hidden">
            {/* Lavender Mist Atmosphere */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-purple-100/30 via-violet-50/20 to-transparent pointer-events-none"></div>

            {/* Animated Lavender Orbs */}
            <div className="absolute top-20 left-10 w-[550px] h-[550px] bg-violet-200/20 blur-[130px] rounded-full mix-blend-multiply pointer-events-none animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-indigo-200/18 blur-[120px] rounded-full mix-blend-multiply pointer-events-none"></div>
            <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-purple-200/15 blur-[110px] rounded-full mix-blend-multiply pointer-events-none"></div>

            {/* Ethereal Particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-32 left-[15%] w-3 h-3 bg-violet-300/30 rounded-full blur-sm animate-float"></div>
                <div className="absolute top-48 right-[20%] w-4 h-4 bg-indigo-300/35 rounded-full blur-sm animate-float-delayed"></div>
                <div className="absolute bottom-32 left-[60%] w-3 h-3 bg-purple-300/25 rounded-full blur-sm animate-float"></div>
            </div>

            {/* Subtle Texture */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.015] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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

                    <div className="relative flex items-center justify-center">
                        <motion.img
                            src="/riw-logo.png"
                            alt="RIW Logo"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 object-contain drop-shadow-2xl"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

const DNAScheduleItem = React.memo(({ item, index, isEven, onClick }) => {
    const isBreak = item.type === 'break';
    const isSpecial = item.type === 'intro' || item.type === 'panel';
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-100, 100], [5, -5]);
    const rotateY = useTransform(x, [-100, 100], [-5, 5]);

    // O(1) Lookup
    let speakerImage = null;
    if (item.speaker) {
        const foundSpeaker = SPEAKER_MAP.get(item.speaker);
        if (foundSpeaker) speakerImage = foundSpeaker.image;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: (index % 8) * 0.05 }} // Much faster stagger
            className={clsx(
                "relative flex items-center w-full gap-8 mb-8 md:mb-16",
                "md:justify-between",
                isEven ? "md:flex-row" : "md:flex-row-reverse"
            )}
        >
            <div className="w-full md:w-[45%] pl-12 md:pl-0 group perspective-1000">
                <motion.div
                    style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                    onMouseMove={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        x.set(e.clientX - (rect.left + rect.width / 2));
                        y.set(e.clientY - (rect.top + rect.height / 2));
                    }}
                    onMouseLeave={() => { x.set(0); y.set(0); }}
                    onClick={() => onClick(item)}
                    className={clsx(
                        "relative p-4 md:p-6 rounded-2xl border backdrop-blur-sm transition-all duration-300 transform-gpu cursor-pointer",
                        isBreak ? "bg-slate-50/80 border-dashed border-slate-300 hover:bg-slate-100" : "bg-white/90 border-brand-100 shadow-xl hover:shadow-2xl hover:border-brand-300 hover:scale-[1.02]"
                    )}
                >
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20"></div>
                    {isSpecial && <div className="absolute -top-3 -right-3 px-3 py-1 bg-brand-900 text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-lg z-30">Special</div>}

                    {/* Hover "View" Indicator */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-30">
                        <div className="bg-brand-900/90 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform">
                            View Details
                        </div>
                    </div>

                    <div className="flex items-center justify-between mb-2">
                        <span className={clsx("font-serif font-bold text-base md:text-lg", isBreak ? "text-slate-500 italic" : "text-brand-900")}>{item.time}</span>
                        {!isBreak && <div className="h-px flex-grow mx-4 bg-gradient-to-r from-brand-200 to-transparent"></div>}
                    </div>
                    <h3 className={clsx("text-lg md:text-xl font-bold mb-3", isBreak ? "text-slate-500" : "text-slate-900")}>{item.title}</h3>
                    {item.speaker && (
                        <div className="flex items-center gap-3">
                            {speakerImage ? (
                                <img src={speakerImage} alt={item.speaker} loading="lazy" className="w-8 h-8 rounded-full object-cover shadow-sm border border-brand-100" />
                            ) : (
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-100 to-brand-50 flex items-center justify-center text-brand-900 font-bold text-sm shadow-inner">{item.speaker.charAt(0)}</div>
                            )}
                            <div>
                                <p className="text-brand-800 font-medium text-sm leading-tight">{item.speaker}</p>
                                <p className="text-slate-500 text-xs">Speaker</p>
                            </div>
                        </div>
                    )}
                </motion.div>
            </div>

            <div className={clsx(
                "absolute flex flex-col items-center justify-center z-10",
                "left-4 md:left-1/2 md:-translate-x-1/2"
            )}>
                <motion.div
                    initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }}
                    className={clsx("w-5 h-5 md:w-6 md:h-6 rounded-full border-4 shadow-lg z-10 bg-white", isBreak ? "border-slate-300" : "border-brand-900")}
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
});

const ScheduleModal = ({ item, isOpen, onClose, onOpenSpeaker }) => {
    if (!item) return null;

    // Get specific quote for the session
    const quote = SESSION_QUOTES[item.title] || { text: "Science is a way of thinking much more than it is a body of knowledge.", author: "Carl Sagan" };
    const description = getSessionDescription(item);

    // Find speaker image if speaker exists
    let speakerImage = null;
    let speakerDetails = null;
    if (item.speaker) {
        speakerDetails = SPEAKER_MAP.get(item.speaker);
        if (speakerDetails) speakerImage = speakerDetails.image;
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={onClose}
                    className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        onClick={(e) => e.stopPropagation()}
                        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden"
                    >
                        {/* Gradient Header */}
                        <div className="relative h-32 bg-gradient-to-br from-brand-900 to-brand-700 overflow-hidden flex items-center justify-center p-6 text-center">
                            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                            {/* Decorative Circles */}
                            <div className="absolute top-[-50%] left-[-20%] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                            <div className="absolute bottom-[-50%] right-[-20%] w-64 h-64 bg-gold-400/20 rounded-full blur-3xl"></div>

                            <h2 className="relative z-10 text-2xl md:text-3xl font-serif font-bold text-white leading-tight">{item.title}</h2>
                        </div>

                        {/* Content */}
                        <div className="p-8">
                            {/* Time and Tag */}
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-2 text-brand-600 font-medium bg-brand-50 px-3 py-1 rounded-full text-sm">
                                    <Clock size={16} />
                                    {item.time}
                                </div>
                                {item.type !== 'talk' && (
                                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
                                        {item.type}
                                    </span>
                                )}
                            </div>

                            {/* Quote Section */}
                            <div className="mb-8 relative">
                                <div className="absolute -left-4 -top-4 text-6xl font-serif text-gold-200 leading-none select-none">“</div>
                                <p className="text-lg font-serif italic text-slate-700 relative z-10 leading-relaxed">
                                    {quote.text}
                                </p>
                                <p className="text-right text-xs font-bold text-brand-400 mt-2 uppercase tracking-wide">— {quote.author}</p>
                            </div>

                            {/* Description */}
                            <div className="mb-8">
                                <p className="text-slate-600 leading-relaxed text-sm">
                                    {description}
                                </p>
                            </div>

                            {/* Speaker Section */}
                            {item.speaker && (
                                <div
                                    className={clsx("flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100 transition-colors", speakerDetails && "cursor-pointer hover:bg-slate-100 group")}
                                    onClick={() => {
                                        if (speakerDetails && onOpenSpeaker) {
                                            onClose();
                                            setTimeout(() => onOpenSpeaker(speakerDetails), 300);
                                        }
                                    }}
                                >
                                    {speakerImage ? (
                                        <img src={speakerImage} alt={item.speaker} className="w-12 h-12 rounded-full object-cover shadow-sm group-hover:scale-105 transition-transform" />
                                    ) : (
                                        <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center text-brand-900 font-bold text-lg group-hover:scale-105 transition-transform">
                                            {item.speaker.charAt(0)}
                                        </div>
                                    )}
                                    <div>
                                        <p className="font-bold text-brand-900 text-sm group-hover:text-brand-700 transition-colors">{item.speaker}</p>
                                        {speakerDetails && <p className="text-xs text-slate-500">{speakerDetails.role}</p>}
                                        {speakerDetails && <span className="text-[10px] text-brand-500 font-bold uppercase tracking-wider mt-1 inline-block opacity-0 group-hover:opacity-100 transition-opacity">View Profile &rarr;</span>}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors z-20"
                        >
                            <X size={20} />
                        </button>

                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

const Schedule = ({ onOpenSpeaker }) => {
    const containerRef = React.useRef(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
    const pathLength = useTransform(scrollYProgress, [0.1, 0.9], [0, 1]);
    const [selectedItem, setSelectedItem] = useState(null);

    return (
        <section id="schedule" className="py-24 bg-slate-50 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative" ref={containerRef}>
                <SectionHeader title="Scientific Program" subtitle="The Sequence" centered />
                <div className="relative mt-12 md:mt-20">
                    <div className="absolute left-1/2 -translate-x-[0.5px] top-0 bottom-0 w-20 -ml-10 pointer-events-none hidden md:block">
                        <svg className="w-full h-full overflow-visible" preserveAspectRatio="none">
                            <motion.path d={`M 40 0 V 3000`} fill="none" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="4 4" />
                            <motion.path d={`M 40 0 V 3000`} fill="none" stroke="#4a0404" strokeWidth="2" style={{ pathLength }} />
                        </svg>
                    </div>
                    <div className="md:hidden absolute left-4 top-0 bottom-0 w-0.5 bg-slate-200">
                        <motion.div style={{ height: useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]) }} className="w-full bg-brand-900 origin-top" />
                    </div>
                    <div className="relative z-10">
                        {eventData.schedule.map((item, index) => (
                            <DNAScheduleItem
                                key={index}
                                item={item}
                                index={index}
                                isEven={index % 2 === 0}
                                onClick={setSelectedItem}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <ScheduleModal
                item={selectedItem}
                isOpen={!!selectedItem}
                onClose={() => setSelectedItem(null)}
                onOpenSpeaker={onOpenSpeaker}
            />
        </section>
    );
};

const SpeakerModal = ({ speaker, isOpen, onClose }) => {
    const [showQuestionForm, setShowQuestionForm] = useState(false);
    const [currentSpeaker, setCurrentSpeaker] = useState(null);
    const [state, handleSubmit, reset] = useForm("xqezzoyb");

    // Reset form when modal closes
    useEffect(() => {
        if (!isOpen) {
            setShowQuestionForm(false);
            reset();
        }
    }, [isOpen]);

    // Reset when speaker changes
    useEffect(() => {
        if (speaker && speaker.name !== currentSpeaker) {
            setShowQuestionForm(false);
            reset();
            setCurrentSpeaker(speaker.name);
        }
    }, [speaker?.name]);

    const handleAskAnother = () => {
        reset();
        setShowQuestionForm(true);
    };

    // Function to highlight keywords in biography
    const highlightBio = (text) => {
        if (!text) return text;

        // Comprehensive list of important terms from all biographies
        const keywords = [
            // Academic Degrees
            'PhD', 'DPhil', 'MSc', 'BSc', 'M.D.', 'DVM',
            // Key Institutions
            'University of Oxford', 'Oxford Vaccine Group', 'University of Ilorin',
            'Ludwig Institute for Cancer Research',
            'Instituto Butantan', 'GenScript', 'IBB-UAB',
            'University College Dublin', 'University of Galway', 'Boehringer Ingelheim',
            'University of California, Santa Barbara', 'Usmanu Danfodiyo University',
            'Sanofi', 'Sanofi Pasteur', 'Translational Medicine Unit',
            'De La Salle University Medical Center', 'De La Salle Health Sciences Institute',
            'Institut des Neurosciences Paris-Saclay',
            'University of Cadiz', 'CNRS', 'Institut Pasteur',
            'Karolinska Institutet', 'Technical University of Munich',
            'Bavarian NMR Center', 'Klinikum rechts der Isar', 'University of Antwerp',
            'University Medical Center Hamburg-Eppendorf', 'IIRVD',
            'Institute for Infection Research and Vaccine Development',
            'Maastricht University', 'Institute for Global Health',
            'ICTYODEV', 'CIRI', 'University of Zaragoza',
            'Université Jean Monnet Saint-Étienne',
            // Programs & Initiatives
            'Erasmus Mundus', 'LIVE', 'EMJM LIVE',
            'Leading International Vaccinology Education',
            'Marie Curie Doctoral Fellow', 'Jenner promotion',
            'CIFRE collaboration',
            // Important Projects & Research
            'ChAdOx1 nCoV-19', 'Marburg virus', 'Sudan Ebola',
            'COVID-19', 'Malaria', 'SARS-CoV-2',
            'RSV', 'hMPV', 'HBV', 'HIV',
            'Middle East respiratory syndrome', 'MERS',
            'Bordetella bronchiseptica',
            'mRNA technology', 'mRNA Vaccines', 'mRNA Center of Excellence',
            'RNA Science Automation', 'RNA Drug substance Automation Unit',
            'MVA-based vaccine',
            // Key People
            'Dr. Daniel Wright', 'Professor Teresa Lambe', 'Prof. Addo',
            // Scientific Terms
            'vaccinology', 'immunology', 'vaccine development',
            'cancer genomics', 'precision medicine', 'translational research',
            'viral-vector vaccine', 'anti-vector immunity',
            'biomarker', 'immunohistochemistry',
            'redox biology', 'neural stem cell', 'NOX-regulated redox signaling',
            'retinal regeneration', 'Xenopus',
            'cancer biology', 'gene editing', 'epigenetics',
            'mucosal immunology',
            // Positions
            'DPhil student', 'Research Assistant', 'PhD Candidate',
            'Technical Account Manager', 'Doctoral Fellow', 'Visiting Researcher',
            'Senior Principal Scientist', 'Senior Medical Pathologist',
            'Chief Resident', 'Postdoctoral Researcher',
            'Unit Head', 'Associate Scientific Director',
            // Geographic locations (important cities/regions)
            'Barcelona', 'Antwerp', 'Lyon', 'Saint-Étienne',
            'Santiago de Chile', 'Prague',
            'Waltham', 'Marcy L\'Étoile', 'Orlando',
            'Hamburg', 'Paris', 'Brazil', 'Spain', 'South Africa',
            'Nigeria', 'Philippines', 'France', 'Germany', 'Stockholm'
        ];

        const parts = [];
        let lastIndex = 0;

        // Sort keywords by length (longest first) to avoid partial matches
        const sortedKeywords = keywords.sort((a, b) => b.length - a.length);

        // Create a regex pattern from keywords
        const pattern = new RegExp(`(${sortedKeywords.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi');

        let match;
        const matches = [];

        // Collect all matches first to avoid overlaps
        while ((match = pattern.exec(text)) !== null) {
            matches.push({
                index: match.index,
                length: match[0].length,
                text: match[0]
            });
        }

        // Remove overlapping matches (keep longer ones)
        const filteredMatches = [];
        for (let i = 0; i < matches.length; i++) {
            const current = matches[i];
            let shouldAdd = true;

            for (let j = 0; j < filteredMatches.length; j++) {
                const existing = filteredMatches[j];
                const currentEnd = current.index + current.length;
                const existingEnd = existing.index + existing.length;

                // Check for overlap
                if (
                    (current.index >= existing.index && current.index < existingEnd) ||
                    (currentEnd > existing.index && currentEnd <= existingEnd)
                ) {
                    shouldAdd = false;
                    break;
                }
            }

            if (shouldAdd) {
                filteredMatches.push(current);
            }
        }

        // Sort matches by index
        filteredMatches.sort((a, b) => a.index - b.index);

        // Build the highlighted text
        filteredMatches.forEach((match, idx) => {
            // Add text before match
            if (match.index > lastIndex) {
                parts.push(
                    <span key={`text-${lastIndex}`}>
                        {text.substring(lastIndex, match.index)}
                    </span>
                );
            }
            // Add highlighted match
            parts.push(
                <span
                    key={`highlight-${match.index}`}
                    className="font-semibold text-brand-900 bg-gold-100/30 px-0.5 rounded-sm"
                >
                    {match.text}
                </span>
            );
            lastIndex = match.index + match.length;
        });

        // Add remaining text
        if (lastIndex < text.length) {
            parts.push(
                <span key={`text-${lastIndex}`}>
                    {text.substring(lastIndex)}
                </span>
            );
        }

        return parts.length > 0 ? parts : text;
    };

    if (!speaker) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={onClose}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl overflow-y-auto"
                >
                    {/* Animated backdrop circles */}
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 0.1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute w-96 h-96 rounded-full bg-gradient-to-br from-brand-800 to-gold-500 blur-3xl"
                        style={{ top: '20%', left: '10%' }}
                    />
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 0.1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute w-96 h-96 rounded-full bg-gradient-to-br from-accent-600 to-brand-900 blur-3xl"
                        style={{ bottom: '10%', right: '20%' }}
                    />

                    <motion.div
                        initial={{ scale: 0.5, opacity: 0, rotateX: 45 }}
                        animate={{ scale: 1, opacity: 1, rotateX: 0 }}
                        exit={{ scale: 0.5, opacity: 0, rotateX: -45 }}
                        transition={{
                            duration: 0.5,
                            ease: [0.22, 1, 0.36, 1]
                        }}
                        onClick={(e) => e.stopPropagation()}
                        className="relative max-w-6xl w-full bg-white overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto"
                        style={{
                            clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 40px), calc(100% - 40px) 100%, 0 100%)',
                            transformStyle: 'preserve-3d',
                            perspective: '1000px'
                        }}
                    >
                        {/* Close Button */}
                        <motion.button
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
                            onClick={onClose}
                            className="absolute top-8 right-8 z-20 p-3 bg-black hover:bg-brand-900 transition-colors"
                        >
                            <X size={20} className="text-white" />
                        </motion.button>

                        <div className="grid md:grid-cols-2">
                            {/* Left - Avatar/Image */}
                            <motion.div
                                initial={{ x: -100, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                                className="relative overflow-hidden min-h-[600px] bg-gradient-to-br from-brand-900 to-brand-800"
                            >
                                {/* Speaker Image */}
                                {speaker.image ? (
                                    <motion.div
                                        initial={{ scale: 1.3 }}
                                        animate={{ scale: 1 }}
                                        transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                        className="absolute inset-0"
                                    >
                                        <img
                                            src={speaker.image}
                                            alt={speaker.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        initial={{ scale: 1.3 }}
                                        animate={{ scale: 1 }}
                                        transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                        className="absolute inset-0 flex items-center justify-center"
                                    >
                                        <div className="flex items-center gap-3">
                                            <img src="/riw-logo.png" alt="RIW 2026 Logo" className="h-12 w-auto" />
                                        </div>                    </motion.div>
                                )}

                                {/* Corner accents with animation */}
                                <motion.div
                                    initial={{ width: 0, height: 0 }}
                                    animate={{ width: 80, height: 80 }}
                                    transition={{ duration: 0.5, delay: 0.5, ease: 'easeOut' }}
                                    className="absolute top-0 left-0 border-t-4 border-l-4 border-white/50 z-10"
                                />
                                <motion.div
                                    initial={{ width: 0, height: 0 }}
                                    animate={{ width: 80, height: 80 }}
                                    transition={{ duration: 0.5, delay: 0.6, ease: 'easeOut' }}
                                    className="absolute bottom-0 right-0 border-b-4 border-r-4 border-white/50 z-10"
                                />

                                {/* Animated gradient line */}
                                <motion.div
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{ duration: 0.6, delay: 0.7, ease: 'easeOut' }}
                                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gold-400 to-accent-600 origin-left z-10"
                                />
                            </motion.div>

                            {/* Right - Content */}
                            <div className="p-12 flex flex-col justify-center bg-white">
                                <div className="space-y-6">
                                    <div>
                                        <motion.div
                                            initial={{ width: 0, opacity: 0 }}
                                            animate={{ width: 'auto', opacity: 1 }}
                                            transition={{ duration: 0.5, delay: 0.4 }}
                                            className="flex items-center gap-3 mb-4 overflow-hidden"
                                        >
                                            <div className="w-12 h-0.5 bg-gradient-to-r from-brand-900 to-transparent" />
                                            <span className="text-xs font-mono uppercase tracking-widest text-black/40">Speaker</span>
                                        </motion.div>

                                        <motion.h2
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ duration: 0.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                            className="text-4xl md:text-5xl font-light text-black mb-2 tracking-tight"
                                            style={{ fontFamily: 'Georgia, serif' }}
                                        >
                                            {speaker.name}
                                        </motion.h2>

                                        <motion.p
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ duration: 0.5, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                            className="text-sm font-mono uppercase tracking-widest text-accent-600 mb-1"
                                        >
                                            {speaker.role}
                                        </motion.p>

                                        <motion.p
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ duration: 0.5, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
                                            className="text-sm text-black/60"
                                        >
                                            {speaker.org}
                                        </motion.p>
                                    </div>

                                    <motion.div
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ duration: 0.5, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
                                        className="relative"
                                    >
                                        <h3 className="text-xs font-mono uppercase tracking-widest text-black/40 mb-4 flex items-center gap-2">
                                            <div className="w-8 h-px bg-black/20" />
                                            Biography
                                        </h3>
                                        <div
                                            className="relative max-h-[200px] overflow-y-auto pr-4"
                                            style={{
                                                scrollbarWidth: 'thin',
                                                scrollbarColor: 'rgba(0,0,0,0.2) rgba(0,0,0,0.05)'
                                            }}
                                        >
                                            <p className="text-sm leading-loose text-black/70 text-justify" style={{ textAlignLast: 'left' }}>
                                                {highlightBio(speaker.fullBio)}
                                            </p>
                                        </div>
                                    </motion.div>

                                    {/* Contact */}
                                    {(speaker.email || speaker.linkedin) && (
                                        <motion.div
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ duration: 0.5, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                                            className="flex gap-3 pt-6 border-t border-black/10"
                                        >
                                            {speaker.email && (
                                                <motion.a
                                                    initial={{ scale: 0, rotate: -180 }}
                                                    animate={{ scale: 1, rotate: 0 }}
                                                    transition={{ delay: 0.9, type: 'spring', stiffness: 200 }}
                                                    href={`mailto:${speaker.email}`}
                                                    className="p-3 bg-black hover:bg-brand-900 transition-colors group"
                                                >
                                                    <Mail size={18} className="text-white" />
                                                </motion.a>
                                            )}

                                            {speaker.linkedin && (
                                                <motion.a
                                                    initial={{ scale: 0, rotate: -180 }}
                                                    animate={{ scale: 1, rotate: 0 }}
                                                    transition={{ delay: 0.92, type: 'spring', stiffness: 200 }}
                                                    href={speaker.linkedin}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-3 bg-black hover:bg-brand-900 transition-colors group"
                                                >
                                                    <Linkedin size={18} className="text-white" />
                                                </motion.a>
                                            )}

                                            {/* Ask Question Button */}
                                            {!showQuestionForm && !state.succeeded && (
                                                <motion.button
                                                    initial={{ scale: 0, rotate: -180 }}
                                                    animate={{ scale: 1, rotate: 0 }}
                                                    transition={{ delay: 0.95, type: 'spring', stiffness: 200 }}
                                                    onClick={() => setShowQuestionForm(true)}
                                                    className="flex-1 p-3 bg-brand-900 hover:bg-brand-800 transition-colors group flex items-center justify-center gap-2 text-white text-sm font-medium uppercase tracking-wider"
                                                >
                                                    <MessageCircle size={18} />
                                                    Ask Question
                                                </motion.button>
                                            )}
                                        </motion.div>
                                    )}

                                    {/* Question Form */}
                                    {showQuestionForm && !state.succeeded && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="pt-6 border-t border-black/10"
                                        >
                                            <h4 className="text-xs font-mono uppercase tracking-widest text-black/40 mb-4">Ask a Question</h4>
                                            <form onSubmit={handleSubmit} className="space-y-4">
                                                <input type="hidden" name="speaker" value={speaker.name} />
                                                <input type="hidden" name="speaker_email" value={speaker.email} />

                                                <input
                                                    type="text"
                                                    name="name"
                                                    required
                                                    className="w-full px-4 py-2 bg-black/5 border border-black/10 focus:border-brand-900 focus:bg-white transition-all outline-none text-sm"
                                                    placeholder="Your Name"
                                                />
                                                <ValidationError prefix="Name" field="name" errors={state.errors} />

                                                <input
                                                    type="email"
                                                    name="email"
                                                    className="w-full px-4 py-2 bg-black/5 border border-black/10 focus:border-brand-900 focus:bg-white transition-all outline-none text-sm"
                                                    placeholder="Your Email (Optional)"
                                                />
                                                <ValidationError prefix="Email" field="email" errors={state.errors} />

                                                <textarea
                                                    name="message"
                                                    required
                                                    rows={4}
                                                    className="w-full px-4 py-2 bg-black/5 border border-black/10 focus:border-brand-900 focus:bg-white transition-all outline-none resize-none text-sm"
                                                    placeholder="Your Question"
                                                />
                                                <ValidationError prefix="Message" field="message" errors={state.errors} />

                                                <div className="flex gap-2">
                                                    <button
                                                        type="submit"
                                                        disabled={state.submitting}
                                                        className="flex-1 px-4 py-2 bg-black hover:bg-brand-900 text-white text-xs font-medium uppercase tracking-wider transition-colors disabled:opacity-50"
                                                    >
                                                        {state.submitting ? 'Sending...' : 'Send'}
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowQuestionForm(false)}
                                                        className="px-4 py-2 bg-black/10 hover:bg-black/20 text-black text-xs font-medium uppercase tracking-wider transition-colors"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </form>
                                        </motion.div>
                                    )}

                                    {/* Success Message */}
                                    {state.succeeded && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="pt-6 border-t border-black/10"
                                        >
                                            <div className="p-4 bg-green-50 border border-green-200">
                                                <h4 className="text-sm font-bold text-green-900 mb-2">Question Sent Successfully!</h4>
                                                <p className="text-sm text-green-700 mb-3">Thank you for your question.</p>
                                                <button
                                                    onClick={handleAskAnother}
                                                    className="px-4 py-2 bg-black hover:bg-brand-900 text-white text-xs font-medium uppercase tracking-wider transition-colors"
                                                >
                                                    Ask Another
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

const SpeakerCard = ({ speaker, index, onOpen }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        setIsClicked(true);
        setTimeout(() => {
            onOpen(speaker);
            setTimeout(() => setIsClicked(false), 300);
        }, 400);
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateZ: Math.random() * 4 - 2 }}
            whileInView={{ opacity: 1, scale: 1, rotateZ: 0 }}
            transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1]
            }}
            viewport={{ once: true }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            onClick={handleClick}
            className="relative group cursor-pointer aspect-[3/4]"
        >
            <motion.div
                className="relative w-full h-full overflow-hidden"
                animate={{
                    rotateZ: isHovered && !isClicked ? [-1, 1, -1] : 0,
                    scale: isClicked ? 1.05 : 1,
                }}
                transition={{
                    duration: isClicked ? 0.3 : 2,
                    repeat: isHovered && !isClicked ? Infinity : 0,
                    ease: isClicked ? [0.22, 1, 0.36, 1] : "easeInOut"
                }}
            >
                {/* Ripple effect on click */}
                <AnimatePresence>
                    {isClicked && (
                        <>
                            <motion.div
                                initial={{ scale: 0, opacity: 0.6 }}
                                animate={{ scale: 3, opacity: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                className="absolute inset-0 bg-gradient-to-br from-brand-800 to-gold-500 rounded-full"
                                style={{
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                }}
                            />
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{ duration: 0.4, times: [0, 0.5, 1] }}
                                className="absolute inset-0 bg-white/30 backdrop-blur-sm z-10"
                            />
                        </>
                    )}
                </AnimatePresence>

                {/* Main Card */}
                <motion.div
                    className="absolute inset-0 overflow-hidden"
                    animate={{
                        filter: isClicked ? 'brightness(1.3)' : 'brightness(1)',
                    }}
                    transition={{ duration: 0.3 }}
                    style={{
                        backgroundImage: 'url(/bg-speaker.png)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    {/* Dark overlay for better text contrast */}
                    <div className="absolute inset-0 bg-brand-900/60" />

                    {/* Speaker Image */}
                    <motion.div
                        className="absolute inset-0"
                        animate={{
                            scale: isHovered ? 1.05 : 1,
                        }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {speaker.image ? (
                            <img
                                src={speaker.image}
                                alt={speaker.name}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <div className="w-48 h-48 rounded-full bg-gradient-to-br from-gold-400 to-accent-600 flex items-center justify-center shadow-2xl">
                                    <span className="font-serif text-7xl font-bold text-white">{speaker.name.charAt(0)}</span>
                                </div>
                            </div>
                        )}
                    </motion.div>

                    {/* Grain Effect */}
                    <div
                        className="absolute inset-0 opacity-10"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='3.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                            backgroundSize: '200px 200px'
                        }}
                    />

                    {/* Plus Icon - Top Right */}
                    <AnimatePresence>
                        {isHovered && (
                            <motion.div
                                initial={{ opacity: 0, x: 20, y: -20 }}
                                animate={{ opacity: 1, x: 0, y: 0 }}
                                exit={{ opacity: 0, x: 20, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className="absolute top-4 right-4 z-10"
                            >
                                <div className="p-2 bg-white/10 backdrop-blur-md border border-white/30 rounded-full">
                                    <Users size={20} className="text-white" />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Name Overlay - Bottom */}
                    <motion.div
                        className="absolute bottom-0 left-0 right-0 p-6"
                        animate={{
                            y: isHovered ? -10 : 0,
                        }}
                        transition={{ duration: 0.4 }}
                    >
                        <div className="relative">
                            <div className="absolute inset-0 bg-black/60 backdrop-blur-md -m-6 border-t border-white/10" />

                            <div className="relative z-10">
                                <motion.h3
                                    className="text-2xl md:text-3xl font-light text-white mb-1 tracking-tight"
                                    style={{ fontFamily: 'Georgia, serif' }}
                                    animate={{
                                        y: isHovered ? -5 : 0,
                                    }}
                                    transition={{ duration: 0.4, delay: 0.1 }}
                                >
                                    {speaker.name}
                                </motion.h3>
                                <motion.p
                                    className="text-xs text-gold-300 font-mono uppercase tracking-widest mb-1"
                                    animate={{
                                        opacity: isHovered ? 1 : 0.7,
                                    }}
                                    transition={{ duration: 0.4 }}
                                >
                                    {speaker.role}
                                </motion.p>
                                <motion.p
                                    className="text-xs text-white/60"
                                    animate={{
                                        opacity: isHovered ? 1 : 0.5,
                                    }}
                                >
                                    {speaker.org}
                                </motion.p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Corner Accent */}
                    <motion.div
                        className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-gold-400/50"
                        animate={{
                            opacity: isHovered || isClicked ? 1 : 0,
                            scale: isHovered || isClicked ? 1 : 0.8,
                        }}
                        transition={{ duration: 0.3 }}
                    />
                </motion.div>

                {/* View indicator */}
                <AnimatePresence>
                    {isHovered && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0 }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20"
                        >
                            <div className="w-20 h-20 rounded-full border-2 border-white/50 backdrop-blur-sm flex items-center justify-center">
                                <span className="text-white text-xs font-mono uppercase tracking-widest">View</span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    );
};

const Speakers = ({ onOpen }) => {

    return (
        <section id="speakers" className="py-32 bg-gradient-to-b from-white via-orange-50/30 to-white relative overflow-hidden">
            {/* Morning Sky Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-sky-100/30 via-orange-50/40 to-amber-50/30 pointer-events-none"></div>

            {/* Animated Morning Orbs */}
            <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-orange-200/30 blur-[120px] rounded-full mix-blend-multiply pointer-events-none animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-amber-200/25 blur-[120px] rounded-full mix-blend-multiply pointer-events-none"></div>
            <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-rose-200/20 blur-[100px] rounded-full mix-blend-multiply pointer-events-none"></div>

            {/* Subtle Pattern */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.03] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <SectionHeader title="Distinguished Speakers from various countries" subtitle="The Experts" centered />
                <GlobalMap />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                    {eventData.speakers.map((speaker, index) => (
                        <SpeakerCard
                            key={index}
                            speaker={speaker}
                            index={index}
                            onOpen={onOpen}
                        />
                    ))}
                </div>
            </div>

            {/* Seamless Blend - Bottom Fade */}
            <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-white via-amber-50/80 to-transparent pointer-events-none z-20"></div>
        </section>
    );
};

const BelkaidSection = () => {
    return (
        <section className="py-32 bg-gradient-to-b from-pink-50 via-rose-50/50 to-white relative overflow-hidden">
            {/* Cherry Blossom Atmosphere */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-pink-100/40 via-rose-50/30 to-transparent pointer-events-none"></div>

            {/* Animated Blossom Orbs */}
            <div className="absolute top-10 right-10 w-[600px] h-[600px] bg-pink-200/25 blur-[140px] rounded-full mix-blend-multiply pointer-events-none animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-rose-200/20 blur-[120px] rounded-full mix-blend-multiply pointer-events-none"></div>
            <div className="absolute top-1/2 left-1/3 w-[400px] h-[400px] bg-fuchsia-200/15 blur-[100px] rounded-full mix-blend-multiply pointer-events-none"></div>

            {/* Floating Petal Effect */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-[10%] w-4 h-4 bg-pink-300/40 rounded-full blur-sm animate-float"></div>
                <div className="absolute top-40 right-[15%] w-3 h-3 bg-rose-300/40 rounded-full blur-sm animate-float-delayed"></div>
                <div className="absolute top-60 left-[70%] w-5 h-5 bg-fuchsia-300/30 rounded-full blur-sm animate-float"></div>
                <div className="absolute bottom-40 right-[25%] w-4 h-4 bg-pink-400/35 rounded-full blur-sm animate-float-delayed"></div>
                <div className="absolute bottom-20 left-[40%] w-3 h-3 bg-rose-400/30 rounded-full blur-sm animate-float"></div>
            </div>

            {/* Subtle Pattern Overlay */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.02] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Image Column */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                            <img
                                src="/Dr. Belkaid.jpg"
                                alt="Professor Yasmine Belkaid"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-brand-900/60 to-transparent"></div>
                            <div className="absolute bottom-6 left-6 text-white">
                                <h3 className="font-serif text-2xl font-bold">Pr. Yasmine Belkaid</h3>
                                <p className="text-brand-100 font-medium">General Director, Institut Pasteur</p>
                            </div>
                        </div>
                        {/* Cherry Blossom Decorative Elements */}
                        <div className="absolute -z-10 top-10 -left-10 w-full h-full bg-gradient-to-br from-pink-100 to-rose-100 rounded-2xl -rotate-3 shadow-xl"></div>
                        <div className="absolute -z-10 -bottom-10 -right-10 w-40 h-40 bg-pink-300 rounded-full blur-3xl opacity-60"></div>
                        <div className="absolute -z-10 top-1/2 -right-8 w-32 h-32 bg-rose-300 rounded-full blur-2xl opacity-40"></div>
                    </motion.div>

                    {/* Text Column */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <SectionHeader
                            title="The Belkaid Promotion"
                            subtitle="Honoring Excellence"
                            centered={false}
                        />
                        <div className="space-y-6 text-slate-600 leading-relaxed text-justify">
                            <p>
                                The 9th LIVE promotion (2024–2026) has been proudly named <span className="font-bold text-brand-700">"Belkaid"</span> in honor of Professor Yasmine Belkaid, a distinguished immunologist and a pioneer in microbiome research. This choice celebrates her revolutionary contributions to immunology, which have significantly impacted vaccinology by clarifying the vital role of a healthy microbiota in enhancing vaccine efficacy.
                            </p>
                            <p>
                                Professor Belkaid earned widespread acclaim for her groundbreaking work on how the microbiome regulates the immune system. She is currently the General Director of the <span className="font-semibold">Institut Pasteur</span>, where she champions innovation in vaccine development against pathogens lacking effective treatments, such as Lassa fever, shigellosis, and tuberculosis.
                            </p>
                            <p>
                                Throughout her career, Professor Belkaid has challenged the status quo and served as an inspiring model for future scientists. Her ascent as the second woman to hold the prestigious title of General Director since the Institut Pasteur's founding in 1887 is a powerful testament to the progress achievable through perseverance and dedication.
                            </p>
                            <p>
                                Her commitment to mentorship, inclusivity, and addressing global health challenges deeply resonates with our cohort. Her expertise has earned her numerous accolades, including the Robert Koch Prize (2021) and the Lurie Prize (2019).
                            </p>
                            <div className="p-6 bg-gradient-to-br from-pink-50 to-rose-50/50 rounded-xl border-l-4 border-pink-400 italic text-slate-700 shadow-lg relative backdrop-blur-sm">
                                <div className="absolute top-2 left-2 text-4xl text-pink-300 font-serif">"</div>
                                We, the LIVE 2024–2026 Master Class, aspire to embody her spirit of exploration, resilience, and unwavering commitment to advancing science for the betterment of humanity.
                            </div>
                        </div>

                        <div className="mt-8 flex gap-4">
                            <a
                                href="https://www.linkedin.com/in/yasmine-belkaid-pasteur/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-[#0077b5] text-white rounded-full font-medium hover:bg-[#006396] transition-colors shadow-lg shadow-blue-900/20"
                            >
                                <Linkedin size={20} />
                                Connect on LinkedIn
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

const VisionarySection = () => {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <SectionHeader title="The Visionary" subtitle="Our Inspiration" centered />

                <div className="grid lg:grid-cols-2 gap-12 items-center mt-16">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border-4 border-white max-w-md mx-auto lg:max-w-none">
                            <img
                                src="/ChrisDelprat_2.jpg"
                                alt="Prof. Christine Delprat"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-brand-900/80 via-transparent to-transparent"></div>
                            <div className="absolute bottom-8 left-8 text-white">
                                <h3 className="font-serif text-3xl font-bold mb-1">Prof. Christine Delprat</h3>
                                <div className="flex flex-wrap gap-2 text-brand-200 text-sm font-medium mb-2">
                                    <span>PhD</span>
                                    <span>•</span>
                                    <span>HDR</span>
                                    <span>•</span>
                                    <span>CL.EX.</span>
                                </div>
                                <p className="text-white/90">Professor of Immunology</p>
                            </div>
                        </div>
                        {/* Decorative Elements */}
                        <div className="absolute -z-10 top-10 -left-6 w-full h-full bg-brand-50 rounded-2xl -rotate-3"></div>
                        <div className="absolute -z-10 -bottom-8 -right-8 w-48 h-48 bg-gold-100 rounded-full blur-3xl opacity-60"></div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="space-y-6 text-slate-600 leading-relaxed text-lg text-justify"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-50 rounded-full text-brand-800 font-bold text-sm mb-4">
                            <Star size={16} className="text-gold-500" />
                            Coordinator of EMJM LIVE
                        </div>

                        <p>
                            Prof. Christine Delprat is the <span className="font-bold text-brand-900">founding coordinator</span> of the Erasmus Mundus Joint Master "Leading International Vaccinology Education" (LIVE), a program of excellence funded by the European Commission.
                        </p>

                        <p>
                            A graduate of the École Normale Supérieure (ENS Paris) with a double master's in immunology and virology, she has dedicated over 30 years to teaching fundamental and translational immunology. Her extensive career spans research at Schering-Plough (now Merck), UCBL, and the Cancer Research Center of Lyon (CRCL), with expertise ranging from B-cell biology to immuno-oncology.
                        </p>

                        <p>
                            As a visionary leader, she organizes the <span className="italic">VaxInLive Symposia</span>, fostering a global network of experts, alumni, and students. Prof. Delprat also serves on numerous scientific councils, including for the Institut Pasteur and Inserm, advocating for international cooperation in vaccine research.
                        </p>

                        <div className="pt-6">
                            <a
                                href="https://www.researchgate.net/profile/Christine-Delprat"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 px-8 py-4 bg-brand-900 text-white rounded-full font-bold hover:bg-brand-800 transition-all hover:scale-105 shadow-lg group"
                            >
                                <span>View Research Profile</span>
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

const Team = () => {
    return (
        <section id="team" className="py-24 bg-slate-50 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
            {/* Soft background gradients */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-100/40 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold-100/40 rounded-full blur-3xl pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <SectionHeader title="Organizing Team" subtitle="The Organizers" centered />

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-16">
                    {eventData.team.map((member, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group relative"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-brand-100 to-white rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>
                            <div className="relative h-full bg-white/60 backdrop-blur-md rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center">
                                {/* Avatar */}
                                <div className="relative mb-6">
                                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-brand-50 to-white border-2 border-white shadow-md flex items-center justify-center relative z-10 overflow-hidden group-hover:scale-105 transition-transform duration-300">
                                        {member.image ? (
                                            <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <span className="font-serif font-bold text-3xl text-brand-900 bg-clip-text bg-gradient-to-br from-brand-900 to-brand-600 group-hover:text-transparent transition-colors">
                                                {member.name.charAt(0)}
                                            </span>
                                        )}
                                    </div>
                                    <div className="absolute inset-0 rounded-full border-2 border-brand-200 border-dashed animate-spin-slow opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                </div>

                                {/* Info */}
                                <h3 className="font-serif font-bold text-lg text-brand-900 mb-2 leading-tight group-hover:text-brand-700 transition-colors">
                                    {member.name}
                                </h3>
                                <div className="w-8 h-0.5 bg-gold-300 mb-3 rounded-full"></div>
                                <p className="text-xs font-bold uppercase tracking-wider text-brand-500 mb-1">
                                    {member.role}
                                </p>
                                <p className="text-[10px] text-slate-500 font-medium flex items-center justify-center gap-1 opacity-80 mb-3">
                                    <MapPin size={10} />
                                    {member.sub}
                                </p>
                                {member.linkedin && (
                                    <a
                                        href={member.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-brand-600 hover:bg-brand-700 text-white transition-all duration-300 hover:scale-110 shadow-md"
                                    >
                                        <Linkedin size={14} />
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const Venue = () => {
    return (
        <section id="location" className="py-24 bg-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-brand-50 to-transparent pointer-events-none"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <SectionHeader title="Event Location" subtitle="The Venue" centered />

                <div className="grid lg:grid-cols-2 gap-12 items-center mt-16">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-brand-900 text-white p-10 rounded-2xl shadow-xl relative overflow-hidden"
                        >
                            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                            <h3 className="text-3xl font-serif font-bold mb-6 text-gold-400">Rockefeller Campus</h3>

                            <div className="space-y-6 relative z-10">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-white/10 rounded-lg shrink-0">
                                        <MapPin className="text-gold-400 w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-brand-200 text-sm uppercase tracking-wider font-bold mb-1">Address</p>
                                        <p className="text-lg leading-relaxed">
                                            Salles des Thèses, Main Building<br />
                                            8 avenue Rockefeller<br />
                                            69008, LYON
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-white/10 rounded-lg shrink-0">
                                        <Clock className="text-gold-400 w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-brand-200 text-sm uppercase tracking-wider font-bold mb-1">Time</p>
                                        <p className="text-lg">09:00 - 17:00</p>
                                    </div>
                                </div>

                                <div className="pt-6 mt-6 border-t border-white/10">
                                    <a
                                        href="https://www.google.com/maps/dir//8+Avenue+Rockefeller,+69008+Lyon,+France"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-gold-400 hover:text-white font-bold transition-colors group"
                                    >
                                        Get Directions
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <LocationMap address="8 avenue Rockefeller, 69008, LYON" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

const FAQ = () => {
    const faqs = [
        {
            question: "Is registration free?",
            answer: "Yes, the Research Instructive Workshop is fully funded and free for all attending Master's students."
        },
        {
            question: "How do I get to the venue?",
            answer: "The event is held at the Rockefeller Campus, 8 avenue Rockefeller, 69008 Lyon. It is easily accessible via Metro Line D (Grange Blanche) or Tram T2/T5."
        },
        {
            question: "Will the sessions be recorded?",
            answer: "While we encourage in-person attendance for the best networking experience, select keynotes may be recorded and made available to registered attendees."
        },
        {
            question: "Is there a dress code?",
            answer: "We recommend business casual attire to make the best impression during networking sessions with industry professionals."
        }
    ];

    const [openIndex, setOpenIndex] = useState(null);

    return (
        <section className="py-24 bg-slate-50 relative overflow-hidden">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <SectionHeader title="Frequently Asked Questions" subtitle="Good to Know" centered />

                <div className="mt-12 space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-xl shadow-sm border border-brand-100 overflow-hidden"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                            >
                                <span className="font-serif font-bold text-brand-900 text-lg">{faq.question}</span>
                                <span className={clsx("p-2 rounded-full bg-brand-50 text-brand-600 transition-transform duration-300", openIndex === index && "rotate-180")}>
                                    <ChevronRight size={20} />
                                </span>
                            </button>
                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="px-6 pb-6 text-slate-600 leading-relaxed border-t border-brand-50 pt-4">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
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
                        <div className="text-brand-200 flex items-start gap-3">
                            <div className="p-2 rounded-full bg-brand-800 shrink-0">
                                <MapPin size={16} />
                            </div>
                            <span>{eventData.details.location}</span>
                        </div>
                    </div>
                </div>

                <div className="text-center">
                    <h5 className="font-serif text-lg font-bold mb-6 text-brand-100">Partner Institutions</h5>
                    <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8 mb-10">
                        <img src="/acknowledgements/LIVE.png" alt="LIVE Programme" className="h-12 md:h-16 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity bg-white/10 rounded-lg p-2" />
                        <img src="/acknowledgements/UAB.png" alt="Universitat Autònoma de Barcelona" className="h-12 md:h-16 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity bg-white/10 rounded-lg p-2" />
                        <img src="/acknowledgements/UCBL.png" alt="Université Claude Bernard Lyon 1" className="h-12 md:h-16 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity bg-white/10 rounded-lg p-2" />
                        <img src="/acknowledgements/UJMSE.png" alt="Université Jean Monnet Saint-Étienne" className="h-12 md:h-16 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity bg-white/10 rounded-lg p-2" />
                        <img src="/acknowledgements/UOAntwerp.png" alt="University of Antwerp" className="h-12 md:h-16 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity bg-white/10 rounded-lg p-2" />
                        <img src="/acknowledgements/UOBarcelona.png" alt="University of Barcelona" className="h-12 md:h-16 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity bg-white/10 rounded-lg p-2" />
                    </div>

                    <div className="border-t border-brand-700 pt-8 pb-8">
                        <div className="flex flex-col items-center gap-4">
                            <img src="/acknowledgements/EU-Union.png" alt="European Union" className="h-16 md:h-20 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity bg-white/10 rounded-lg p-3" />
                            <p className="text-brand-200 text-sm font-semibold tracking-wide">Co-funded by the European Union</p>
                        </div>
                    </div>

                    <p className="text-sm text-brand-300 border-t border-brand-700 pt-6">© 2026 Life After LIVE. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default function App() {
    const [selectedSpeaker, setSelectedSpeaker] = useState(null);
    const [selectedSession, setSelectedSession] = useState(null);

    return (
        <div className="bg-white min-h-screen font-sans selection:bg-brand-200 selection:text-brand-900">
            <Navbar />
            <Hero />
            <About />
            <BelkaidSection />
            <CareerPathfinder />
            <DNASchedule
                schedule={eventData.schedule}
                speakerMap={SPEAKER_MAP}
                onOpenSession={setSelectedSession}
                onOpenSpeaker={setSelectedSpeaker}
            />
            <Speakers onOpen={setSelectedSpeaker} />
            <VisionarySection />
            <Team />
            <Venue />
            <DigitalTicket />
            <FAQ />
            <Footer />

            <ScheduleModal
                item={selectedSession}
                isOpen={!!selectedSession}
                onClose={() => setSelectedSession(null)}
                onOpenSpeaker={setSelectedSpeaker}
            />

            <SpeakerModal
                speaker={selectedSpeaker}
                isOpen={!!selectedSpeaker}
                onClose={() => setSelectedSpeaker(null)}
            />
        </div>
    );
}
