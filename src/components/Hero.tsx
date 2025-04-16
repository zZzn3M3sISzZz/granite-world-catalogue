import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface HeroProps {
  hasAnimated: boolean;
  setHasAnimated: (value: boolean) => void;
}

const Hero: React.FC<HeroProps> = ({ hasAnimated, setHasAnimated }) => {
  const heroRef = useRef<HTMLElement>(null);
  const animationComplete = useRef(false);

  useEffect(() => {
    // Set hasAnimated to true after the component mounts
    if (!hasAnimated && !animationComplete.current) {
      // Use a timeout to ensure the animation has time to complete
      const timer = setTimeout(() => {
        setHasAnimated(true);
        animationComplete.current = true;
      }, 2000); // 2 seconds should be enough for all animations to complete
      
      return () => clearTimeout(timer);
    }
  }, [hasAnimated, setHasAnimated]);

  // Define animation variants based on whether animation has already played
  const getAnimationProps = (delay = 0) => {
    if (hasAnimated) {
      // If animation has already played, start in the final state
      return {
        initial: { opacity: 1, y: 0 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0 }
      };
    } else {
      // If animation hasn't played yet, use the animation
      return {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, delay }
      };
    }
  };

  return (
    <section 
      id="home" 
      ref={heroRef}
      className="min-h-screen flex items-center justify-center relative"
    >
      {/* Background overlay */}
      <motion.div 
        initial={{ opacity: hasAnimated ? 1 : 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: hasAnimated ? 0 : 1 }}
        className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent z-10" 
      />
      
      {/* Background image */}
      <motion.div 
        initial={{ scale: hasAnimated ? 1 : 1.1, opacity: hasAnimated ? 1 : 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: hasAnimated ? 0 : 1.5, ease: "easeOut" }}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("/hero-bg.jpg")',
        }}
      />

      {/* Content */}
      <motion.div 
        className="container relative z-20 text-center"
        {...getAnimationProps()}
      >
        <motion.h1 
          {...getAnimationProps(0.2)}
          className="text-5xl md:text-7xl font-display font-bold text-white mb-6"
        >
          The Granite World
        </motion.h1>
        
        <motion.p 
          {...getAnimationProps(0.4)}
          className="text-xl md:text-2xl text-white/90 mb-8"
        >
          Elegance in Every Stone
        </motion.p>
        
        <motion.div 
          {...getAnimationProps(0.6)}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.a
            href="#catalogue"
            className="btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Our Collection
          </motion.a>
          <motion.a
            href="#contact"
            className="btn-secondary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get in Touch
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center">
          <span className="text-white/80 text-sm mb-2">Scroll to explore</span>
          <motion.div
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            <svg
              className="w-6 h-6 text-white/80"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero; 