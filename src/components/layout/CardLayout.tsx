
import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

interface CardLayoutProps {
  children: React.ReactNode;
  title?: string;
  showBackButton?: boolean;
}

const CardLayout: React.FC<CardLayoutProps> = ({ 
  children, 
  title,
  showBackButton = true 
}) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  const handleBack = () => {
    navigate(-1);
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-fastgo-dark via-black to-fastgo-dark">
      <div 
        className={`${isMobile ? 'w-full max-w-[350px] h-[550px]' : 'w-full max-w-[900px] min-h-[650px]'} 
          rounded-xl overflow-hidden flex flex-col relative bg-gradient-to-br from-fastgo-green/10 to-fastgo-purple/10 
          backdrop-blur-md border border-white/10 shadow-2xl animate-scale-in`}
      >
        {title && (
          <div className="absolute top-0 left-0 w-full text-center py-3 text-sm font-semibold text-white border-b border-white/10 backdrop-blur-sm bg-gradient-to-r from-fastgo-green/20 to-fastgo-purple/20">
            {title}
          </div>
        )}
        {showBackButton && (
          <div className="absolute top-3 left-3 z-10 animate-fade-in">
            <button 
              onClick={handleBack} 
              className="w-8 h-8 bg-gradient-to-r from-fastgo-green to-fastgo-green/80 rounded-full flex items-center justify-center text-white shadow-glow-sm hover:shadow-glow-green transition-all transform hover:scale-105"
            >
              <ChevronLeft size={18} />
            </button>
          </div>
        )}
        <div className="flex-1 flex flex-col px-5 py-4 pt-12 overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
};

export default CardLayout;
