
import React from 'react';
import CardLayout from '../components/layout/CardLayout';
import { ShoppingCart } from 'lucide-react';

const OpcoesPagamento = () => {
  return (
    <CardLayout title="OPÇÕES DE PAGAMENTO">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-end mt-2 mb-6">
          <ShoppingCart className="mr-2 text-fastgo-green" />
          <span className="text-fastgo-green font-medium text-xl">10,00 R$</span>
        </div>
        
        <div className="space-y-4 flex-1">
          <button className="w-full border border-fastgo-purple rounded-full py-3 text-center hover:bg-gray-50 text-fastgo-purple font-medium">
            PIX
          </button>
          
          <button className="w-full border border-fastgo-purple rounded-full py-3 text-center hover:bg-gray-50 text-fastgo-purple font-medium">
            CRÉDITO
          </button>
          
          <button className="w-full border border-fastgo-purple rounded-full py-3 text-center hover:bg-gray-50 text-fastgo-purple font-medium">
            DÉBITO
          </button>
          
          <button className="w-full border border-fastgo-purple rounded-full py-3 text-center hover:bg-gray-50 text-fastgo-purple font-medium">
            DINHEIRO
          </button>
        </div>
      </div>
    </CardLayout>
  );
};

export default OpcoesPagamento;
