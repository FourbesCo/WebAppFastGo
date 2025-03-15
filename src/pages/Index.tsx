
import React from 'react';
import { useNavigate } from 'react-router-dom';
import FastGoLogo from '../components/common/FastGoLogo';
import { ArrowRight } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-fastgo-dark to-black p-4">
      <div className="text-center max-w-xl animate-fade-in">
        <div className="scale-150 mb-12">
          <FastGoLogo />
        </div>
        
        <h1 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-fastgo-green to-fastgo-purple">
          Welcome to FastGo
        </h1>
        
        <p className="text-xl text-white/80 mb-8">
          The future of fast food ordering is here. Simple, quick, and delicious.
        </p>
        
        <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 justify-center">
          <button 
            onClick={() => navigate('/login')}
            className="fastgo-button flex items-center justify-center space-x-2 group"
          >
            <span>Get Started</span>
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </button>
          
          <button 
            onClick={() => navigate('/menu')}
            className="px-6 py-3 border border-white/20 rounded-xl text-white hover:bg-white/5 transition-all backdrop-blur-sm"
          >
            Explore Menu
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
