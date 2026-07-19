import React from 'react';

import { Navbar, NavbarBrand, NavbarContent } from '@nextui-org/react';

import { ThemeSwitch } from './theme-switch';

export default function Header() {
  return (
    <Navbar
      className="bg-background/40 backdrop-blur-2xl border-b border-white/5"
      classNames={{
        wrapper: 'max-w-full px-4 lg:px-8',
      }}
    >
      <NavbarBrand className="flex gap-3 items-center">
        {/* The Sync Loop Logo - Mini Version */}
        <div className="relative flex items-center justify-center space-x-[-8px]">
          <div className="w-6 h-6 rounded-full bg-primary-500/80 backdrop-blur-md flex items-center justify-center z-10 shadow-lg border border-primary-300/30">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3 text-black ml-[2px]"
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
          <div className="w-6 h-6 rounded-full bg-secondary/80 backdrop-blur-md flex items-center justify-center z-0 shadow-lg border border-secondary-300/30">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3 text-white ml-[2px]"
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
        <p className="font-extrabold text-xl tracking-tight text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          C<span className="text-foreground">2</span>Gether
        </p>
      </NavbarBrand>
      <NavbarContent justify="end">
        <ThemeSwitch />
      </NavbarContent>
    </Navbar>
  );
}
