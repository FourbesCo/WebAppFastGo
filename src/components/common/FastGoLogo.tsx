
import React from 'react';

const FastGoLogo: React.FC = () => {
  return (
    <div className="flex justify-center items-center my-6">
      <div className="relative">
        <h1 className="text-4xl font-bold relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-fastgo-green to-fastgo-purple">
          <span>fast</span>
          <span>Go</span>
        </h1>
        <div className="absolute -bottom-1 right-0 w-4 h-4 rounded-full bg-fastgo-accent shadow-glow animate-pulse"></div>
        <div className="absolute -bottom-2 -left-2 w-20 h-3 bg-gradient-to-r from-fastgo-green/20 to-transparent rounded-full blur-md"></div>
      </div>
    </div>
  );
};

export default FastGoLogo;
