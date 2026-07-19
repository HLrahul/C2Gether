import React from 'react';

export default function AnimatedHeroObject() {
  return (
    <div className="relative flex items-center justify-center w-full h-[300px] md:h-[400px]">
      {/* Background glow for the sphere */}
      <div className="absolute inset-0 m-auto w-48 h-48 md:w-64 md:h-64 bg-primary-500 rounded-full blur-[80px] opacity-60 animate-pulseGlow" />

      {/* The main glassmorphic sphere */}
      <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full border border-white/20 bg-white/5 backdrop-blur-xl shadow-[0_0_40px_rgba(0,240,255,0.2)] flex items-center justify-center overflow-hidden animate-floatSphere">
        {/* Inner subtle gradient to give it a 3D feel */}
        <div className="absolute inset-0 bg-gradient-to-tr from-secondary/40 via-transparent to-primary/40 opacity-70" />

        {/* Play Button inside the sphere (Sync Loop Concept simplified) */}
        <div className="relative flex items-center justify-center space-x-[-15px]">
          <div className="w-16 h-16 rounded-full bg-primary-500/80 backdrop-blur-md flex items-center justify-center z-10 shadow-lg border border-primary-300/30">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-black ml-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="w-16 h-16 rounded-full bg-secondary/80 backdrop-blur-md flex items-center justify-center z-0 shadow-lg border border-secondary-300/30">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-white ml-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        {/* Glossy reflection on top */}
        <div className="absolute top-[10%] left-[10%] w-[40%] h-[30%] bg-gradient-to-b from-white/30 to-transparent rounded-full rotate-[-45deg]" />
      </div>
    </div>
  );
}
