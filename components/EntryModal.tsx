
import React from 'react';
import { Entry, Sentiment } from '../types';

interface EntryModalProps {
  entry: Entry;
  onClose: () => void;
}

const sentimentStyles: Record<Sentiment, { bg: string; text: string; border: string }> = {
  [Sentiment.POSITIVE]: { bg: 'bg-green-900/50', text: 'text-green-300', border: 'border-green-500/30' },
  [Sentiment.NEGATIVE]: { bg: 'bg-red-900/50', text: 'text-red-300', border: 'border-red-500/30' },
  [Sentiment.NEUTRAL]: { bg: 'bg-blue-900/50', text: 'text-blue-300', border: 'border-blue-500/30' },
  [Sentiment.MIXED]: { bg: 'bg-yellow-900/50', text: 'text-yellow-300', border: 'border-yellow-500/30' },
};

// Fix: Corrected component definition to destructure props.
const EntryModal: React.FC<EntryModalProps> = ({ entry, onClose }) => {
  const styles = sentimentStyles[entry.sentiment];

  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className={`w-full max-w-2xl ${styles.bg} rounded-xl border ${styles.border} shadow-2xl shadow-purple-900/40 p-8 relative transform transition-all duration-300 ease-out scale-95 animate-modal-in`}
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="mb-4">
          <span className="text-sm text-gray-400">{entry.date.toLocaleString()}</span>
          <p className={`mt-1 text-lg font-bold ${styles.text}`}>{entry.sentiment}</p>
        </div>
        
        <p className="text-gray-200 leading-relaxed font-serif text-lg mb-6">
          "{entry.content}"
        </p>

        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-gray-400 mr-2">Themes:</span>
          {entry.themes.map((theme, index) => (
            <span key={index} className="px-3 py-1 bg-purple-800/50 text-purple-300 text-xs font-medium rounded-full">
              {theme}
            </span>
          ))}
        </div>
        <style>{`
            @keyframes modal-in {
                from { opacity: 0; transform: scale(0.95) translateY(10px); }
                to { opacity: 1; transform: scale(1) translateY(0); }
            }
            .animate-modal-in {
                animation: modal-in 0.3s ease-out forwards;
            }
        `}</style>
      </div>
    </div>
  );
};

export default EntryModal;
