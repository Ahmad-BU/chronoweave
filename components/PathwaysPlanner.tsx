
import React, { useState } from 'react';
import { Goal } from '../types';
import { CheckIcon, PathIcon } from './icons';

interface PathwaysPlannerProps {
  onSetGoal: (goalTitle: string) => void;
  goal: Goal | null;
  isLoading: boolean;
}

// Fix: Corrected component definition to destructure props.
const PathwaysPlanner: React.FC<PathwaysPlannerProps> = ({ onSetGoal, goal, isLoading }) => {
  const [goalTitle, setGoalTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (goalTitle.trim() && !isLoading) {
      onSetGoal(goalTitle);
      setGoalTitle('');
    }
  };

  return (
    <div className="bg-gray-800/50 p-6 rounded-lg border border-purple-500/20 shadow-lg">
      <div className="flex items-center mb-4">
        <PathIcon className="w-6 h-6 text-purple-300 mr-3"/>
        <h2 className="text-xl font-serif font-bold text-purple-300">The 'Pathways' Engine</h2>
      </div>

      {!goal ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={goalTitle}
            onChange={(e) => setGoalTitle(e.target.value)}
            placeholder="What new path will you weave? (e.g., Learn Piano)"
            className="w-full p-2 bg-gray-900 border border-gray-700 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none text-gray-300"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !goalTitle.trim()}
            className="mt-3 w-full px-4 py-2 bg-purple-600 text-white font-bold rounded-md hover:bg-purple-700 disabled:bg-gray-600 transition-colors"
          >
            {isLoading ? 'Analyzing...' : 'Generate My Pathway'}
          </button>
        </form>
      ) : (
        <div className="space-y-4">
          <h3 className="font-bold font-serif text-lg text-green-300">{goal.pathway.title}</h3>
          <p className="text-sm italic text-gray-400">{goal.pathway.strategy}</p>
          <ul className="space-y-2">
            {goal.pathway.steps.map((step, index) => (
              <li key={index} className="flex items-start">
                <CheckIcon className="w-5 h-5 text-green-400 mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-300">{step}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PathwaysPlanner;
