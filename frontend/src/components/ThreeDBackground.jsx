import React from 'react';
import { motion } from 'framer-motion';

const ThreeDBackground = ({ type = 'auth' }) => {
  if (type === 'auth') {
    return (
      <div className="fixed inset-0 z-0 overflow-hidden bg-[#F8FAF9]">
        {/* Animated Perspective Grid (Light Theme) */}
        <div className="absolute inset-0 z-0 pointer-events-none" style={{ perspective: '1200px' }}>
          <motion.div 
            className="absolute top-1/2 left-1/2 w-[300%] h-[300%] -translate-x-1/2"
            style={{ 
              backgroundImage: 'linear-gradient(rgba(45, 106, 79, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(45, 106, 79, 0.1) 1px, transparent 1px)', 
              backgroundSize: '80px 80px',
              rotateX: '70deg',
              originY: '50%'
            }}
            animate={{
              backgroundPosition: ['0px 0px', '0px 80px']
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>

        {/* Farming Effects: Growing Stalks (Light Theme) */}
        <div className="absolute inset-0 z-0 pointer-events-none" style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}>
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={`stalk-${i}`}
              className="absolute bottom-0 w-[2px] bg-gradient-to-t from-[#2D6A4F]/20 to-[#2D6A4F]/50"
              style={{
                left: `${Math.random() * 100}%`,
                height: '40vh',
                rotateX: '45deg',
                transformOrigin: 'bottom',
                translateZ: `${Math.random() * 400 - 200}px`,
                opacity: 0.4
              }}
              animate={{
                height: ['15vh', '45vh', '20vh'],
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{
                duration: 10 + Math.random() * 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 5
              }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#40916C]/30 blur-md" />
            </motion.div>
          ))}
        </div>

        {/* Falling Nutrients/Rain Particles (Light Theme) */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={`drop-${i}`}
              className="absolute w-[1.5px] h-10 bg-gradient-to-b from-transparent via-[#2D6A4F]/20 to-transparent"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-10%`,
              }}
              animate={{
                top: ['-10%', '110%'],
                opacity: [0, 0.6, 0]
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 5
              }}
            />
          ))}
        </div>

        {/* Floating Wireframe Cubes (Light Theme) */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute border border-[#2D6A4F]/10"
              style={{
                width: `${Math.random() * 100 + 50}px`,
                height: `${Math.random() * 100 + 50}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                perspective: '1000px',
                transformStyle: 'preserve-3d'
              }}
              animate={{
                rotateX: [0, 360],
                rotateY: [0, 360],
                rotateZ: [0, 180],
                y: [0, -100, 0],
                opacity: [0.05, 0.2, 0.05],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 15 + Math.random() * 15,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 10
              }}
            >
              <div className="absolute inset-0 border border-[#2D6A4F]/5" style={{ transform: 'translateZ(10px)' }} />
            </motion.div>
          ))}
        </div>

        {/* Floating Particles (Light Theme) */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`p-${i}`}
            className="absolute w-1 h-1 bg-[#2D6A4F]/20 rounded-full blur-[1px]"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 0.4, 0],
              scale: [0, 1.5, 0],
              y: [0, -100]
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
          />
        ))}

        {/* Cinematic Radial Glows */}
        <div className="absolute top-0 left-1/4 w-[60vw] h-[60vw] bg-[#2D6A4F]/15 blur-[180px] rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-1/4 w-[50vw] h-[50vw] bg-[#1B4332]/15 blur-[180px] rounded-full translate-x-1/2 translate-y-1/2" />
      </div>
    );
  }

  // Dashboard / Other Pages Background
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#F8FAF9]">
      {/* Floating 3D Soft Spheres */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 400 + 200}px`,
              height: `${Math.random() * 400 + 200}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `radial-gradient(circle at 30% 30%, rgba(45, 106, 79, ${0.06 + Math.random() * 0.08}), transparent 70%)`,
              boxShadow: 'inset -20px -20px 60px rgba(255, 255, 255, 0.4), inset 10px 10px 40px rgba(0, 0, 0, 0.03)',
              backdropFilter: 'blur(2px)'
            }}
            animate={{
              x: [0, Math.random() * 150 - 75, 0],
              y: [0, Math.random() * 150 - 75, 0],
              scale: [1, 1.1, 1],
              rotate: [0, 360]
            }}
            transition={{
              duration: 25 + Math.random() * 15,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>

      {/* Subtle Depth Lines */}
      <div className="absolute inset-0 z-0 opacity-[0.04]" style={{ perspective: '1000px' }}>
        <motion.div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'linear-gradient(transparent 39px, #2D6A4F 40px), linear-gradient(90deg, transparent 39px, #2D6A4F 40px)',
            backgroundSize: '40px 40px',
            rotateX: '45deg',
            scale: 2
          }}
          animate={{
            y: [0, 40]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>
      
      {/* Dynamic Vibrant Accents */}
      <div className="absolute top-0 right-0 w-[70vw] h-[70vw] bg-[#2D6A4F]/5 blur-[150px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-[60vw] h-[60vw] bg-[#3A86FF]/5 blur-[150px] rounded-full" />
    </div>
  );
};

export default ThreeDBackground;
