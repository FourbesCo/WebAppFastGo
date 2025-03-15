
import React from 'react';
import CardLayout from '../components/layout/CardLayout';
import { Settings } from 'lucide-react';

const Configuracoes = () => {
  return (
    <CardLayout title="CONFIGURAÇÕES">
      <div className="flex flex-col h-full justify-center items-center">
        <Settings size={84} className="text-gray-400 mb-4" />
        <p className="text-gray-500 text-center">
          Página de configurações em desenvolvimento
        </p>
      </div>
    </CardLayout>
  );
};

export default Configuracoes;
