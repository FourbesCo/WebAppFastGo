
import React, { useState } from 'react';
import CardLayout from '../components/layout/CardLayout';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const InserirCartao = () => {
  const [formData, setFormData] = useState({
    numero: '',
    validade: '',
    cvv: '',
    cpf: ''
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.numero || !formData.validade || !formData.cvv || !formData.cpf) {
      toast.error('Preencha todos os campos');
      return;
    }
    toast.success('Cartão cadastrado com sucesso');
    navigate('/menu');
  };

  return (
    <CardLayout title="INSERIR CARTÃO">
      <form onSubmit={handleSubmit} className="flex flex-col h-full">
        <div className="space-y-4 flex-1 mt-8">
          <div className="space-y-1">
            <label className="text-xs text-fastgo-purple">Número do cartão</label>
            <input
              type="text"
              name="numero"
              value={formData.numero}
              onChange={handleChange}
              className="w-full border border-fastgo-purple rounded-full px-4 py-3 focus:outline-none focus:ring-1 focus:ring-fastgo-green"
              placeholder="0000 0000 0000 0000"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs text-fastgo-purple">Validade</label>
              <input
                type="text"
                name="validade"
                value={formData.validade}
                onChange={handleChange}
                className="w-full border border-fastgo-purple rounded-full px-4 py-3 focus:outline-none focus:ring-1 focus:ring-fastgo-green"
                placeholder="MM/AA"
              />
            </div>
            
            <div className="space-y-1">
              <label className="text-xs text-fastgo-purple">CVC</label>
              <input
                type="text"
                name="cvv"
                value={formData.cvv}
                onChange={handleChange}
                className="w-full border border-fastgo-purple rounded-full px-4 py-3 focus:outline-none focus:ring-1 focus:ring-fastgo-green"
                placeholder="123"
              />
            </div>
          </div>
          
          <div className="space-y-1">
            <label className="text-xs text-fastgo-purple">CPF</label>
            <input
              type="text"
              name="cpf"
              value={formData.cpf}
              onChange={handleChange}
              className="w-full border border-fastgo-purple rounded-full px-4 py-3 focus:outline-none focus:ring-1 focus:ring-fastgo-green"
              placeholder="000.000.000-00"
            />
          </div>
        </div>
        
        <button 
          type="submit" 
          className="w-full bg-[#8AE58D] text-white rounded-full py-3 font-medium hover:bg-opacity-90 transition-all mt-6 text-lg uppercase"
        >
          Cadastrar
        </button>
      </form>
    </CardLayout>
  );
};

export default InserirCartao;
