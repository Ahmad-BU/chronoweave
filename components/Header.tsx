
import React from 'react';
import { WeaveIcon } from './icons';

const Header: React.FC = () => {
  return (
    <header className="p-4 border-b border-purple-500/20">
      <div className="container mx-auto flex items-center justify-center text-center">
        <WeaveIcon className="w-10 h-10 text-purple-400 mr-4" />
        <div>
          <h1 className="text-3xl font-bold tracking-wider text-white font-serif">ChronoWeave</h1>
          <p className="text-sm text-purple-300 tracking-widest">Your Personal Life Weaver</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
