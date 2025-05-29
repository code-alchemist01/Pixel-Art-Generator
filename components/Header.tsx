
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="w-full py-6 text-center">
      <h1 className="text-4xl font-bold text-sky-400 tracking-tight">
        Pixel Art Generator
      </h1>
      <p className="text-slate-400 mt-1">Transform your ideas into stunning pixel art with AI.</p>
    </header>
  );
};
