
import React, { useState } from 'react';

interface InputFormProps {
  onAddEntry: (content: string) => void;
  isLoading: boolean;
}

// Fix: Corrected component definition to destructure props.
const InputForm: React.FC<InputFormProps> = ({ onAddEntry, isLoading }) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim() && !isLoading) {
      onAddEntry(content);
      setContent('');
    }
  };

  return (
    <div className="bg-gray-800/50 p-6 rounded-lg border border-purple-500/20 shadow-lg">
      <h2 className="text-xl font-serif font-bold mb-4 text-purple-300">Add a new thread to your Tapestry...</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind? Capture a thought, a feeling, a moment..."
          className="w-full h-28 p-3 bg-gray-900 border border-gray-700 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all resize-none text-gray-300"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !content.trim()}
          className="mt-4 w-full px-4 py-2 bg-purple-600 text-white font-bold rounded-md hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Weaving...
            </>
          ) : (
            'Weave this Moment'
          )}
        </button>
      </form>
    </div>
  );
};

export default InputForm;
