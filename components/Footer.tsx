
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full py-4 text-center text-slate-500 text-sm">
      <p>&copy; {new Date().getFullYear()} Pixel Art Generator. Powered by Google Gemini.</p>
    </footer>
  );
};
