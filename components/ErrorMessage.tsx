
import React from 'react';

interface ErrorMessageProps {
  message: string | null;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="mt-4 p-4 w-full bg-red-500 border border-red-700 text-white rounded-lg shadow-md" role="alert">
      <p className="font-semibold">Error:</p>
      <p>{message}</p>
    </div>
  );
};
