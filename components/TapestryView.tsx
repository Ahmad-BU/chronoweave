
import React from 'react';
import { Entry, Sentiment } from '../types';

interface TapestryViewProps {
  entries: Entry[];
  onSelectEntry: (entry: Entry) => void;
}

const sentimentColorMap: Record<Sentiment, string> = {
  [Sentiment.POSITIVE]: 'bg-green-500 hover:bg-green-400 border-green-300',
  [Sentiment.NEGATIVE]: 'bg-red-500 hover:bg-red-400 border-red-300',
  [Sentiment.NEUTRAL]: 'bg-blue-500 hover:bg-blue-400 border-blue-300',
  [Sentiment.MIXED]: 'bg-yellow-500 hover:bg-yellow-400 border-yellow-300',
};

const TapestryNode: React.FC<{ entry: Entry; onSelect: (entry: Entry) => void; }> = ({ entry, onSelect }) => {
  const size = 16 + entry.content.length / 20; // Basic size calculation
  const colorClasses = sentimentColorMap[entry.sentiment];

  return (
    <div
      className={`absolute transform -translate-x-1/2 -translate-y-1/2 rounded-full cursor-pointer transition-all duration-500 ease-out flex items-center justify-center shadow-lg hover:shadow-2xl border-2 ${colorClasses}`}
      style={{
        left: `${entry.position.x}%`,
        top: `${entry.position.y}%`,
        width: `${size}px`,
        height: `${size}px`,
        opacity: 0.9,
      }}
      onClick={() => onSelect(entry)}
    >
        <div className="absolute w-full h-full rounded-full bg-black opacity-20 group-hover:opacity-0 transition-opacity"></div>
    </div>
  );
};

// Fix: Corrected component definition to destructure props.
const TapestryView: React.FC<TapestryViewProps> = ({ entries, onSelectEntry }) => {
  return (
    <div className="w-full h-full relative overflow-hidden bg-grid-purple-400/10 rounded-lg">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900/80 to-transparent"></div>
      {entries.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-gray-400 font-serif text-xl">Your Tapestry Awaits its First Thread...</p>
          </div>
      )}
      {entries.map((entry) => (
        <TapestryNode key={entry.id} entry={entry} onSelect={onSelectEntry} />
      ))}
    </div>
  );
};

export default TapestryView;
