import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Lenis from '@studio-freight/lenis';
import Navbar from '../components/Navbar';
import { X, Linkedin, Twitter, Github, Mail, ArrowLeft, Plus } from 'lucide-react';
import BlackholeEffect from '../components/BlackholeEffect';
import Footer from '../components/Footer';

const TEAM_MEMBERS = [
  {
    id: 1,
    name: 'Uday Kanth',
    role: 'CEO, Flyers Soft & AI Labs',
    image: '/uday%20anna.png',
    bio: 'Visionary leader driving innovation at the intersection of AI and enterprise solutions. Built Flyers Soft from ground up, now leading the charge in production AI systems. Passionate about democratizing AI for businesses of all sizes.',
    expertise: ['Leadership', 'AI Strategy', 'Business Development'],
    social: { linkedin: '#', twitter: '#', github: '#' },
    gradient: 'from-purple-600 to-indigo-600'
  },
  {
    id: 2,
    name: 'Krishna Kompalli',
    role: 'AI Product Lead',
    image: '/krish.png',
    bio: 'Builds production-ready AI products that solve real business problems. Bridges research and engineering to ship intelligent systems at scale. Leads cross-functional teams from ideation to deployment.',
    expertise: ['AI Product Development', 'ML Engineering', 'Product Strategy'],
    social: { linkedin: '#', github: '#' },
    gradient: 'from-blue-600 to-cyan-500'
  },
  {
    id: 3,
    name: 'Kurukshetran',
    role: 'AI Architect',
    image: '/kuru.png',
    bio: 'Designs robust AI architectures that scale from prototype to production. Expert in system design, model optimization, and infrastructure planning. Ensures AI solutions are performant, reliable, and maintainable.',
    expertise: ['System Design', 'AI Architecture', 'Model Optimization'],
    social: { linkedin: '#', github: '#' },
    gradient: 'from-rose-500 to-orange-500'
  },
  {
    id: 4,
    name: 'Keerthi',
    role: 'Data Engineer',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Keerthi&backgroundColor=d1d4f9',
    bio: 'Building the data infrastructure that powers AI Labs. Specializes in ETL pipelines, data warehousing, and ensuring data quality. Fast learner with a passion for scalable data systems.',
    expertise: ['ETL Pipelines', 'Data Warehousing', 'SQL'],
    social: { linkedin: '#', github: '#' },
    gradient: 'from-indigo-500 to-purple-500'
  },
  {
    id: 5,
    name: 'Thatwik Reddy',
    role: 'Data Scientist (R&D)',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ThatwikReddy&backgroundColor=ffdfbf',
    bio: 'Drives research and development initiatives, exploring cutting-edge ML techniques. Experiments with novel algorithms and approaches. Brings fresh academic perspectives to real-world AI challenges.',
    expertise: ['Research', 'Experimentation', 'Deep Learning'],
    social: { linkedin: '#', github: '#' },
    gradient: 'from-amber-500 to-yellow-500'
  },
  {
    id: 6,
    name: 'Shalini',
    role: 'Data Analyst & DevRel (Intern)',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Shalini&backgroundColor=fecaca',
    bio: 'Analyzes data to uncover trends and insights while building community through developer relations. Creates content, documentation, and demos that make AI accessible. Bridges technical teams and the broader developer community.',
    expertise: ['Data Analysis', 'Developer Relations', 'Content Creation'],
    social: { linkedin: '#', twitter: '#' },
    gradient: 'from-pink-500 to-rose-500'
  },
  {
    id: 7,
    name: 'Asha',
    role: 'Lead Software Engineer',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Asha&backgroundColor=ddd6fe',
    bio: 'Leads software development with expertise in scalable architecture and clean code practices. Mentors engineering teams while shipping robust applications. Expert in full-stack development and system integration.',
    expertise: ['Full-Stack Development', 'System Architecture', 'Team Leadership'],
    social: { linkedin: '#', github: '#' },
    gradient: 'from-violet-500 to-purple-500'
  },
  {
    id: 8,
    name: 'Ramanan',
    role: 'Software Engineer',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ramanan&backgroundColor=ccfbf1',
    bio: 'Builds efficient, maintainable software solutions with modern technologies. Focuses on writing clean, testable code and implementing best practices. Passionate about continuous learning and solving complex problems.',
    expertise: ['Software Development', 'Backend Systems', 'API Design'],
    social: { linkedin: '#', github: '#' },
    gradient: 'from-teal-500 to-cyan-500'
  }
];

const CreativeTeamCard = ({ member, onClick, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    // Delay opening modal for animation to play
    setTimeout(() => {
      onClick(member);
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
                className={`absolute inset-0 bg-gradient-to-br ${member.gradient} rounded-full`}
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
          className="absolute inset-0 bg-black overflow-hidden"
          animate={{
            filter: isClicked ? 'brightness(1.3)' : 'brightness(1)',
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Portrait Image */}
          <motion.div
            className="absolute inset-0"
            animate={{
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover opacity-90"
            />
          </motion.div>

          {/* Gradient Overlay - Disabled */}

          {/* Pixelated/Grain Effect */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='3.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              backgroundSize: '200px 200px'
            }}
          />

          {/* Show Bio Button - Top Right */}
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
                  <Plus size={20} className="text-white" />
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
              {/* Background blur */}
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
                  {member.name}
                </motion.h3>
                <motion.p
                  className="text-xs text-white/80 font-mono uppercase tracking-widest"
                  animate={{
                    opacity: isHovered ? 1 : 0.7,
                  }}
                  transition={{ duration: 0.4 }}
                >
                  {member.role}
                </motion.p>

                {/* Expertise Pills */}
                <AnimatePresence>
                  {isHovered && member.expertise && member.expertise.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                      className="flex flex-wrap gap-2 mt-3"
                    >
                      {member.expertise.slice(0, 3).map((skill, idx) => (
                        <motion.span
                          key={skill}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: 0.3 + idx * 0.1 }}
                          className="px-2 py-1 bg-white/20 backdrop-blur-sm text-[10px] font-medium text-white rounded-full border border-white/30"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Corner Accent */}
          <motion.div
            className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-white/30"
            animate={{
              opacity: isHovered || isClicked ? 1 : 0,
              scale: isHovered || isClicked ? 1 : 0.8,
            }}
            transition={{ duration: 0.3 }}
          />

          {/* Animated border on click */}
          <AnimatePresence>
            {isClicked && (
              <motion.div
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0 pointer-events-none"
                style={{ zIndex: 30 }}
              >
                <svg className="absolute inset-0 w-full h-full">
                  <motion.rect
                    x="0"
                    y="0"
                    width="100%"
                    height="100%"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="4"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#9c1dca" />
                      <stop offset="100%" stopColor="#ec4899" />
                    </linearGradient>
                  </defs>
                </svg>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Floating indicator */}
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

const BioModal = ({ member, onClose }) => {
  if (!member) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
    >
      {/* Animated backdrop circles */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`absolute w-96 h-96 rounded-full bg-gradient-to-br ${member.gradient} blur-3xl`}
        style={{ top: '20%', left: '10%' }}
      />
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className={`absolute w-96 h-96 rounded-full bg-gradient-to-br ${member.gradient} blur-3xl`}
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
        className="relative max-w-4xl w-full bg-white overflow-hidden shadow-2xl"
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
          className="absolute top-8 right-8 z-20 p-3 bg-black hover:bg-purple-600 transition-colors"
        >
          <X size={20} className="text-white" />
        </motion.button>

        <div className="grid md:grid-cols-2 min-h-[600px]">
          {/* Left - Image */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden"
          >
            <motion.div
              initial={{ scale: 1.3 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 bg-white"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Corner accents with animation */}
            <motion.div
              initial={{ width: 0, height: 0 }}
              animate={{ width: 80, height: 80 }}
              transition={{ duration: 0.5, delay: 0.5, ease: 'easeOut' }}
              className="absolute top-0 left-0 border-t-4 border-l-4 border-white/50"
            />
            <motion.div
              initial={{ width: 0, height: 0 }}
              animate={{ width: 80, height: 80 }}
              transition={{ duration: 0.5, delay: 0.6, ease: 'easeOut' }}
              className="absolute bottom-0 right-0 border-b-4 border-r-4 border-white/50"
            />

            {/* Animated gradient line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.7, ease: 'easeOut' }}
              className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 origin-left"
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
                  <div className="w-12 h-0.5 bg-gradient-to-r from-purple-600 to-transparent" />
                  <span className="text-xs font-mono uppercase tracking-widest text-black/40">Profile</span>
                </motion.div>

                <motion.h2
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="text-4xl md:text-5xl font-light text-black mb-2 tracking-tight"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  {member.name}
                </motion.h2>

                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="text-sm font-mono uppercase tracking-widest text-purple-600"
                >
                  {member.role}
                </motion.p>
              </div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <h3 className="text-xs font-mono uppercase tracking-widest text-black/40 mb-3">Biography</h3>
                <p className="text-base leading-relaxed text-black/80">
                  {member.bio}
                </p>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <h3 className="text-xs font-mono uppercase tracking-widest text-black/40 mb-3">Expertise</h3>
                <div className="flex flex-wrap gap-2">
                  {member.expertise && member.expertise.map((skill, idx) => (
                    <motion.span
                      key={skill}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{
                        duration: 0.3,
                        delay: 0.9 + idx * 0.1,
                        type: 'spring',
                        stiffness: 200
                      }}
                      className="px-4 py-2 bg-black text-white text-xs font-medium uppercase tracking-wider"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
                className="flex gap-3 pt-6 border-t border-black/10"
              >
                {member.social.linkedin && (
                  <motion.a
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 1.1, type: 'spring', stiffness: 200 }}
                    href={member.social.linkedin}
                    className="p-3 bg-black hover:bg-purple-600 transition-colors group"
                  >
                    <Linkedin size={18} className="text-white" />
                  </motion.a>
                )}
                {member.social.twitter && (
                  <motion.a
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 1.15, type: 'spring', stiffness: 200 }}
                    href={member.social.twitter}
                    className="p-3 bg-black hover:bg-purple-600 transition-colors group"
                  >
                    <Twitter size={18} className="text-white" />
                  </motion.a>
                )}
                {member.social.github && (
                  <motion.a
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 1.2, type: 'spring', stiffness: 200 }}
                    href={member.social.github}
                    className="p-3 bg-black hover:bg-purple-600 transition-colors group"
                  >
                    <Github size={18} className="text-white" />
                  </motion.a>
                )}
                <motion.a
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 1.25, type: 'spring', stiffness: 200 }}
                  href="mailto:team@flyerssoft.com"
                  className="p-3 bg-black hover:bg-purple-600 transition-colors group"
                >
                  <Mail size={18} className="text-white" />
                </motion.a>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Team = () => {
  const navigate = useNavigate();
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
      infinite: false,
      syncTouch: false,
    });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar theme="light" />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center bg-black text-white overflow-hidden px-8 md:px-16 lg:px-24">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        <motion.div
          className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />

        <div className="relative z-10 max-w-6xl w-full text-center py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6"
          >
            <span className="text-sm uppercase tracking-[0.3em] text-purple-400 font-medium">
              Meet The Minds Behind The Machine
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="text-[8rem] md:text-[12rem] lg:text-[16rem] font-extralight leading-[0.85] tracking-tighter mb-8"
            style={{
              fontFamily: '-apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif',
              backgroundImage: 'linear-gradient(135deg, #ffffff 0%, #9c1dca 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Team
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-xl md:text-2xl font-light leading-relaxed text-white/70 max-w-3xl mx-auto"
          >
            World-class engineers, researchers, and visionaries who've shipped production AI at Google, Meta, OpenAI, and Amazon.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            onClick={() => navigate('/')}
            className="mt-12 flex items-center gap-2 text-white/60 hover:text-white transition-colors duration-300 group mx-auto"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="text-sm font-light uppercase tracking-wider">Back to Home</span>
          </motion.button>
        </div>

        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Team Grid Section */}
      <section className="relative py-24 px-8 md:px-16 lg:px-24 bg-white overflow-hidden min-h-screen">
        {/* Blackhole Pull Effect Background */}
        <BlackholeEffect />

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Uniform Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM_MEMBERS.map((member, index) => (
              <CreativeTeamCard
                key={member.id}
                member={member}
                onClick={setSelectedMember}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Join Section */}
      <section className="py-32 px-8 relative overflow-hidden bg-black text-white">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(45deg, transparent 49%, white 49%, white 51%, transparent 51%)`,
            backgroundSize: '20px 20px'
          }} />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="inline-block mb-8">
              <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-8" />
            </div>
            <h2
              className="text-6xl md:text-7xl font-light tracking-tight mb-6"
              style={{
                fontFamily: 'Georgia, serif',
                backgroundImage: 'linear-gradient(135deg, #ffffff 0%, #9c1dca 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Want to Join?
            </h2>
            <p className="text-xl text-white/70 mb-12 leading-relaxed max-w-2xl mx-auto">
              We're always looking for exceptional talent who want to push the boundaries of production AI systems.
            </p>
            <a
              href="mailto:careers@flyerssoft.com"
              className="inline-flex items-center gap-3 px-10 py-5 bg-white text-black hover:bg-purple-600 hover:text-white transition-all duration-300 text-sm font-medium tracking-wide uppercase group"
            >
              View Open Positions
              <ArrowLeft size={18} className="rotate-180 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Bio Modal */}
      <AnimatePresence>
        {selectedMember && (
          <BioModal
            member={selectedMember}
            onClose={() => setSelectedMember(null)}
          />
        )}
      </AnimatePresence>

      {/* Footer */}
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Team;
