
import React from 'react';
import { useNavigate } from 'react-router-dom';
import CardLayout from '../components/layout/CardLayout';
import { BurgerIcon, SodaIcon, PizzaIcon, CupcakeIcon } from '../components/icons/FoodIcons';
import FastGoLogo from '../components/common/FastGoLogo';

const Produtos = () => {
  const navigate = useNavigate();

  return (
    <CardLayout title="PRODUTOS">
      <div className="flex flex-col h-full">
        <FastGoLogo />
        
        <div className="flex-1 grid grid-cols-2 gap-4 mb-6">
          <button 
            className="fastgo-menu-item menu-card group"
            onClick={() => navigate('/lista-itens')}
          >
            <div className="p-3 rounded-full bg-fastgo-light mb-3 group-hover:bg-fastgo-green/10 transition-colors">
              <BurgerIcon />
            </div>
            <span className="text-sm font-medium text-fastgo-purple">LANCHES</span>
          </button>
          
          <button 
            className="fastgo-menu-item menu-card group"
          >
            <div className="p-3 rounded-full bg-fastgo-light mb-3 group-hover:bg-fastgo-green/10 transition-colors">
              <SodaIcon />
            </div>
            <span className="text-sm font-medium text-fastgo-purple">BEBIDAS</span>
          </button>
        
          <button 
            className="fastgo-menu-item menu-card group"
          >
            <div className="p-3 rounded-full bg-fastgo-light mb-3 group-hover:bg-fastgo-green/10 transition-colors">
              <PizzaIcon />
            </div>
            <span className="text-sm font-medium text-fastgo-purple">PIZZA</span>
          </button>
          
          <button 
            className="fastgo-menu-item menu-card group"
          >
            <div className="p-3 rounded-full bg-fastgo-light mb-3 group-hover:bg-fastgo-green/10 transition-colors">
              <CupcakeIcon />
            </div>
            <span className="text-sm font-medium text-fastgo-purple">SOBREMESA</span>
          </button>
        </div>
        
        <button 
          onClick={() => navigate('/inserir-produto')}
          className="fastgo-button"
        >
          Adicionar Produto
        </button>
      </div>
    </CardLayout>
  );
};

export default Produtos;
