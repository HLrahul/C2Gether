import { Cloud, HardDrive } from 'lucide-react';
import React from 'react';
import {
  SiDailymotion,
  SiFacebook,
  SiMixcloud,
  SiSoundcloud,
  SiTwitch,
  SiVimeo,
  SiWistia,
  SiYoutube,
} from 'react-icons/si';

const platforms = [
  {
    name: 'YouTube',
    icon: SiYoutube,
    hoverColor: 'group-hover:text-[#FF0000]',
  },
  {
    name: 'SoundCloud',
    icon: SiSoundcloud,
    hoverColor: 'group-hover:text-[#FF3300]',
  },
  {
    name: 'Facebook',
    icon: SiFacebook,
    hoverColor: 'group-hover:text-[#1877F2]',
  },
  { name: 'Vimeo', icon: SiVimeo, hoverColor: 'group-hover:text-[#1AB7EA]' },
  { name: 'Twitch', icon: SiTwitch, hoverColor: 'group-hover:text-[#9146FF]' },
  { name: 'Streamable', icon: Cloud, hoverColor: 'group-hover:text-[#0055FF]' },
  { name: 'Wistia', icon: SiWistia, hoverColor: 'group-hover:text-[#54BBFF]' },
  {
    name: 'DailyMotion',
    icon: SiDailymotion,
    hoverColor: 'group-hover:text-[#0066DC]',
  },
  {
    name: 'Mixcloud',
    icon: SiMixcloud,
    hoverColor: 'group-hover:text-[#5000FF]',
  },
  {
    name: 'Kaltura',
    icon: HardDrive,
    hoverColor: 'group-hover:text-[#FF8800]',
  },
];

export default function PlatformsMarquee() {
  return (
    <div className="w-full flex flex-col items-center py-10 overflow-hidden border-t border-black/5 dark:border-white/5 relative bg-transparent">
      {/* Soft gradient masks on the left and right edges for a fade-out effect */}
      <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <p className="text-sm font-semibold tracking-widest text-gray-500 uppercase mb-8 z-20">
        Supports playing from anywhere
      </p>

      <div className="flex w-max animate-marquee">
        {/* Render the list exactly twice to create a seamless infinite loop with -50% translateX */}
        {[...platforms, ...platforms].map((platform, idx) => (
          <div
            key={`${platform.name}-${idx}`}
            className="group flex items-center justify-center space-x-3 px-8 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 cursor-pointer transition-all duration-300"
          >
            <platform.icon
              size={28}
              className={`text-gray-700 dark:text-gray-300 transition-colors duration-300 ${platform.hoverColor}`}
            />
            <span
              className={`text-xl font-bold tracking-tight text-gray-700 dark:text-gray-300 transition-colors duration-300 ${platform.hoverColor} whitespace-nowrap`}
            >
              {platform.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
