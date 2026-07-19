import { AudioLines, Brush, MessagesSquare, Video } from 'lucide-react';
import React from 'react';

const features = [
  {
    Icon: Video,
    title: 'Synced video player',
    description: (
      <>
        Stream videos from any platform with your friends and{' '}
        <span className="text-gray-900 dark:text-white font-medium">
          stay perfectly in sync
        </span>{' '}
        with every pause, rewind, and play.
      </>
    ),
    upcoming: false,
    className:
      'md:col-span-2 bg-gradient-to-br from-primary-500/10 to-primary-900/5',
  },
  {
    Icon: MessagesSquare,
    title: 'Live chat',
    description: (
      <>
        Share your thoughts and reactions in{' '}
        <span className="text-gray-900 dark:text-white font-medium">
          real-time chat
        </span>{' '}
        seamlessly.
      </>
    ),
    upcoming: false,
    className:
      'md:col-span-1 bg-gradient-to-br from-secondary/10 to-secondary/5',
  },
  {
    Icon: AudioLines,
    title: 'Voice channels',
    description: (
      <>
        Talk to your friends with{' '}
        <span className="text-gray-900 dark:text-white font-medium">
          crystal clear audio
        </span>{' '}
        while watching.
      </>
    ),
    upcoming: true,
    className:
      'md:col-span-1 bg-gradient-to-tr from-secondary/10 to-transparent',
  },
  {
    Icon: Brush,
    title: 'Collaborative Canvas',
    description: (
      <>
        Collaborate visually with a{' '}
        <span className="text-gray-900 dark:text-white font-medium">
          shared whiteboard
        </span>{' '}
        right next to your video.
      </>
    ),
    upcoming: true,
    className:
      'md:col-span-2 bg-gradient-to-tl from-primary-500/10 to-transparent',
  },
];

export default function HeroSection() {
  return (
    <div className="w-full mt-0">
      <section className="w-full mt-12 md:mt-0">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Everything you need for a <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              perfect watch party
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Our platform is packed with features designed to bring you and your
            friends closer together, no matter the distance.
          </p>
        </div>

        {/* Bento Box Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto px-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-3xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 backdrop-blur-xl p-8 transition-all duration-500 hover:border-primary/50 hover:shadow-[0_0_40px_rgba(0,240,255,0.15)] hover:-translate-y-1 ${feature.className}`}
            >
              {/* Subtle animated gradient background on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />

              <div className="relative z-10 flex flex-col h-full justify-between space-y-8">
                <div className="flex items-start justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:text-white group-hover:bg-primary transition-all duration-500 shadow-lg">
                    <feature.Icon size={26} strokeWidth={2.5} />
                  </div>

                  {feature.upcoming && (
                    <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase bg-secondary/20 text-secondary border border-secondary/30 shadow-[0_0_10px_rgba(112,0,255,0.3)]">
                      Coming Soon
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
