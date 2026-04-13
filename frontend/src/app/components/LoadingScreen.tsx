import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface LoadingScreenProps {
  onComplete?: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (progress >= 100) {
      onComplete?.();
    }
  }, [progress]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-[#2C1810] via-[#3A2218] to-[#2C1810]">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, #D4AF37 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-12"
        >
          <h1 
            className="text-6xl text-[#F5E6D3] tracking-wide"
            style={{ 
              fontFamily: 'Georgia, serif',
              textShadow: '0 4px 12px rgba(212, 175, 55, 0.3)'
            }}
          >
            Page & Prose
          </h1>
        </motion.div>

        {/* Progress Bar Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-80 mb-16"
        >
          {/* Progress Bar Background */}
          <div className="h-1 bg-[#4A3428] rounded-full overflow-hidden shadow-lg">
            {/* Progress Bar Fill */}
            <motion.div
              className="h-full bg-gradient-to-r from-[#D4AF37] via-[#F4D03F] to-[#D4AF37] rounded-full"
              style={{ 
                width: `${progress}%`,
                boxShadow: '0 0 12px rgba(212, 175, 55, 0.6)'
              }}
              initial={{ width: '0%' }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            />
          </div>
        </motion.div>

        {/* Animated Book Image */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-16"
        >
          <motion.div
            animate={{
              rotateY: [0, 360],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="rounded-lg overflow-hidden relative"
            style={{
              filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.4))',
              transformStyle: 'preserve-3d',
            }}
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1710432102022-6742abc18621?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbnRpcXVlJTIwYm9vayUyMGdvbGQlMjBzcGluZXxlbnwxfHx8fDE3NzM5MTgyNTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Page and Prose"
              className="w-24 h-24 object-cover rounded-lg opacity-80"
            />
            
            {/* Color overlay for warm tone */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#A68A64]/40 via-[#D4AF37]/30 to-[#4A7C2C]/20 mix-blend-overlay" />
            
            {/* Shimmer loading effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent"
              animate={{
                x: ['-200%', '200%'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
                repeatDelay: 0.5,
              }}
            />
            
            {/* Pulsing glow overlay */}
            <motion.div
              className="absolute inset-0 rounded-lg"
              animate={{
                boxShadow: [
                  '0 0 0px rgba(212, 175, 55, 0)',
                  '0 0 20px rgba(212, 175, 55, 0.5)',
                  '0 0 0px rgba(212, 175, 55, 0)',
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            
            {/* Book title overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.p 
                className="text-[10px] text-[#D4AF37] px-2 py-1 bg-[#2C1810]/80 rounded backdrop-blur-sm"
                style={{ 
                  fontFamily: 'Georgia, serif',
                  textShadow: '0 1px 3px rgba(0, 0, 0, 0.5)',
                  letterSpacing: '0.5px'
                }}
                animate={{
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                Page & Prose
              </motion.p>
            </div>
          </motion.div>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-sm text-[#B8A088] tracking-wider"
          style={{ 
            fontFamily: 'Georgia, serif',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
          }}
        >
          Your next great read is just a moment away...
        </motion.p>
      </div>

      {/* Ambient glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#D4AF37] rounded-full opacity-5 blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#A68A64] rounded-full opacity-5 blur-3xl" />
    </div>
  );
}