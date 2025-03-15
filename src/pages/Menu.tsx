
import React from 'react';
import { useNavigate } from 'react-router-dom';
import CardLayout from '../components/layout/CardLayout';
import { BurgerIcon, UserIcon, SettingsIcon } from '../components/icons/FoodIcons';
import FastGoLogo from '../components/common/FastGoLogo';

const Menu = () => {
  const navigate = useNavigate();

  return (
    <CardLayout title="MENU">
      <div className="flex flex-col h-full">
        <FastGoLogo />
        
        <div className="flex-1 flex flex-col justify-center gap-6">
          <div className="grid grid-cols-2 gap-4">
            <button 
              className="fastgo-menu-item menu-card group"
              onClick={() => navigate('/produtos')}
            >
              <div className="p-3 rounded-full bg-fastgo-light mb-3 group-hover:bg-fastgo-green/10 transition-colors">
                <BurgerIcon />
              </div>
              <span className="text-sm font-medium text-fastgo-purple">Produtos</span>
            </button>
            
            <button 
              className="fastgo-menu-item menu-card group"
              onClick={() => navigate('/clientes')}
            >
              <div className="p-3 rounded-full bg-fastgo-light mb-3 group-hover:bg-fastgo-green/10 transition-colors">
                <UserIcon />
              </div>
              <span className="text-sm font-medium text-fastgo-purple">Clientes</span>
            </button>
          </div>
          
          <div>
            <button 
              className="fastgo-menu-item menu-card group w-full"
              onClick={() => navigate('/configuracoes')}
            >
              <div className="p-3 rounded-full bg-fastgo-light mb-3 group-hover:bg-fastgo-green/10 transition-colors">
                <SettingsIcon />
              </div>
              <span className="text-sm font-medium text-fastgo-purple">Configurações</span>
            </button>
          </div>
        </div>
        
        <div className="text-center text-fastgo-muted text-xs mt-8">
          FastGo © {new Date().getFullYear()} - Todos os direitos reservados
        </div>
      </div>
    </CardLayout>
  );
};

export default Menu;
