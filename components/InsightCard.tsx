
import React from 'react';
import { Insight } from '../types';
import { EchoIcon, RippleIcon } from './icons';

interface InsightCardProps {
  insight: Insight;
}

// Fix: Corrected component definition to destructure props.
const InsightCard: React.FC<InsightCardProps> = ({ insight }) => {
  return (
    <div className="bg-gray-800/50 p-6 rounded-lg border border-purple-500/20 shadow-lg space-y-6">
      <h2 className="text-xl font-serif font-bold text-purple-300">Proactive Insights</h2>
      
      {/* Echo */}
      <div className="flex items-start space-x-4">
        <div className="mt-1 flex-shrink-0">
          <EchoIcon className="w-8 h-8 text-cyan-400" />
        </div>
        <div>
          <h3 className="font-bold text-cyan-300">Echo Detected: <span className="font-normal font-serif italic">{insight.echo.title}</span></h3>
          <p className="text-gray-300 text-sm mt-1">{insight.echo.description}</p>
        </div>
      </div>

      {/* Ripple */}
      <div className="flex items-start space-x-4">
        <div className="mt-1 flex-shrink-0">
          <RippleIcon className="w-8 h-8 text-yellow-400" />
        </div>
        <div>
          <h3 className="font-bold text-yellow-300">Ripple Effect: <span className="font-normal font-serif italic">{insight.ripple.title}</span></h3>
          <p className="text-gray-300 text-sm mt-1">{insight.ripple.description}</p>
        </div>
      </div>
    </div>
  );
};

export default InsightCard;
