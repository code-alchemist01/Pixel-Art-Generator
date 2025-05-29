
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { PromptInput } from './components/PromptInput';
import { ImageDisplay } from './components/ImageDisplay';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { generateImageFromPrompt } from './services/geminiService';
import { PIXEL_ART_STYLE_SUFFIX } from './constants';

const App: React.FC = () => {
  const [userPrompt, setUserPrompt] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateArt = useCallback(async (promptText: string) => {
    if (!promptText.trim()) {
      setError("Prompt cannot be empty.");
      return;
    }
    setUserPrompt(promptText);
    setIsLoading(true);
    setError(null);
    setImageUrl(null); // Clear previous image

    const fullPrompt = `${promptText}${PIXEL_ART_STYLE_SUFFIX}`;

    try {
      const generatedImageUrl = await generateImageFromPrompt(fullPrompt);
      setImageUrl(generatedImageUrl);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred while generating the image.");
      }
      setImageUrl(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-slate-900 text-slate-100 p-4 selection:bg-sky-500 selection:text-white">
      <Header />
      <main className="flex-grow container mx-auto max-w-2xl w-full flex flex-col items-center py-8 space-y-6">
        <PromptInput onSubmit={handleGenerateArt} isLoading={isLoading} />
        
        {error && <ErrorMessage message={error} />}
        
        {isLoading && (
          <div className="mt-8 text-center">
            <LoadingSpinner />
            <p className="mt-2 text-sky-400">Generating your pixel masterpiece...</p>
          </div>
        )}
        
        {!isLoading && imageUrl && (
          <ImageDisplay imageUrl={imageUrl} altText={`Pixel art of ${userPrompt}`} />
        )}
        
        {!isLoading && !imageUrl && !error && (
           <div className="mt-8 p-8 border-2 border-dashed border-slate-700 rounded-lg text-center text-slate-500 w-full aspect-square flex items-center justify-center">
            <p>Your generated pixel art will appear here.</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default App;
