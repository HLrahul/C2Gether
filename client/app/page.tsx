'use client';

import { nanoid } from 'nanoid';
import { useState } from 'react';

import { Divider } from '@nextui-org/react';

import AnimatedHeroObject from '@/components/AnimatedHeroObject';
import BottomBar from '@/components/BottomBar';
import CreateRoomButton from '@/components/CreateRoom';
import HeroSection from '@/components/HeroSection';
import JoinRoom from '@/components/JoinRoom';
import PlatformsMarquee from '@/components/PlatformsMarquee';
import Navbar from '@/components/navbar';

export default function Home() {
  const [roomId] = useState<string>(nanoid());

  return (
    <div className="h-screen w-full bg-background text-foreground overflow-y-auto overflow-x-hidden snap-y snap-mandatory scroll-smooth selection:bg-primary/30">
      {/* Dynamic Background Mesh */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary-500/20 blur-[120px] animate-blob" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/20 blur-[120px] animate-blobTwo" />
      </div>

      <section className="snap-start min-h-screen relative w-full flex flex-col justify-between">
        <div className="w-full z-50">
          <Navbar />
        </div>
        <div className="flex-1 w-full max-w-7xl mx-auto px-6 lg:px-8 flex flex-col-reverse lg:flex-row items-center justify-center gap-12 mt-4 lg:mt-0">
          {/* Left Content Area */}
          <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left z-10">
            <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold text-primary ring-1 ring-primary/30 bg-primary/10 mb-6 backdrop-blur-sm shadow-[0_0_15px_rgba(0,240,255,0.15)]">
              ✨ The New Standard of Watch Parties
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1]">
              Experience video, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                in perfect sync.
              </span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-gray-400 max-w-2xl font-light">
              Host watch parties, chat in real-time, and enjoy your favorite
              content with friends as if you were in the very same room. No more
              counting down to press play.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
              <div className="hover:scale-105 transition-transform duration-300">
                <CreateRoomButton roomId={roomId} />
              </div>
              <div className="hidden sm:block h-8">
                <Divider orientation="vertical" className="bg-white/10" />
              </div>
              <div className="hover:scale-105 transition-transform duration-300">
                <JoinRoom />
              </div>
            </div>
          </div>

          {/* Right Animated Object Area */}
          <div className="flex-1 w-full max-w-lg lg:max-w-none flex justify-center z-10">
            <AnimatedHeroObject />
          </div>
        </div>

        <div className="w-full mt-12">
          <PlatformsMarquee />
        </div>
      </section>

      {/* Additional Sections */}
      <section className="snap-start min-h-screen relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 pb-10 flex flex-col justify-center">
        <HeroSection />
      </section>

      <div className="snap-end">
        <BottomBar />
      </div>
    </div>
  );
}
