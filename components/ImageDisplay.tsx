
import React from 'react';

interface ImageDisplayProps {
  imageUrl: string;
  altText: string;
}

export const ImageDisplay: React.FC<ImageDisplayProps> = ({ imageUrl, altText }) => {
  return (
    <div className="mt-8 w-full p-2 bg-slate-800 rounded-lg shadow-xl border border-slate-700">
      <img
        src={imageUrl}
        alt={altText}
        className="w-full h-auto rounded object-contain aspect-square"
        style={{ imageRendering: 'pixelated' }}
      />
       <p className="text-xs text-slate-500 mt-2 text-center px-2 italic">Generated art for: "{altText.replace('Pixel art of ', '')}"</p>
    </div>
  );
};
