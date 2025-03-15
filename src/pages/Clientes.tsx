
import React from 'react';
import CardLayout from '../components/layout/CardLayout';
import { Users } from 'lucide-react';

const Clientes = () => {
  return (
    <CardLayout title="CLIENTES">
      <div className="flex flex-col h-full justify-center items-center">
        <Users size={84} className="text-gray-400 mb-4" />
        <p className="text-gray-500 text-center">
          Página de clientes em desenvolvimento
        </p>
      </div>
    </CardLayout>
  );
};

export default Clientes;
