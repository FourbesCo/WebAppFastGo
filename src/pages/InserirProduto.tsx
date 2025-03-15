
import React, { useState } from 'react';
import CardLayout from '../components/layout/CardLayout';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { HotDogIcon } from '../components/icons/FoodIcons';
import { Camera, Plus } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button';

const InserirProduto = () => {
  const [formData, setFormData] = useState({
    familia: '',
    nome: '',
    valor: '',
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nome || !formData.valor) {
      toast.error('Nome e valor são obrigatórios');
      return;
    }
    toast.success('Produto adicionado com sucesso');
    navigate('/produtos');
  };

  return (
    <CardLayout title="INSERIR PRODUTO">
      <form onSubmit={handleSubmit} className="flex flex-col h-full">
        <div className="space-y-5 flex-1 mt-6">
          <div className="space-y-2">
            <Label className="text-xs text-fastgo-purple">Família</Label>
            <Input
              type="text"
              name="familia"
              value={formData.familia}
              onChange={handleChange}
              className="border-fastgo-purple/40 rounded-xl focus-visible:ring-fastgo-green"
              placeholder="Selecione ou digite a família"
            />
          </div>
          
          <div className="space-y-2">
            <Label className="text-xs text-fastgo-purple">Nome</Label>
            <Input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              className="border-fastgo-purple/40 rounded-xl focus-visible:ring-fastgo-green"
              placeholder="Nome do produto"
            />
          </div>
          
          <div className="space-y-2">
            <Label className="text-xs text-fastgo-purple">Valor</Label>
            <Input
              type="text"
              name="valor"
              value={formData.valor}
              onChange={handleChange}
              className="border-fastgo-purple/40 rounded-xl focus-visible:ring-fastgo-green"
              placeholder="R$ 0,00"
            />
          </div>
          
          <div className="space-y-2 mt-4">
            <div className="flex justify-between items-center">
              <Label className="text-xs text-fastgo-purple">Imagem</Label>
              <button 
                type="button" 
                className="text-xs text-fastgo-purple flex items-center gap-1 hover:text-fastgo-green transition-colors"
              >
                <Camera size={12} />
                <span>Adicionar foto</span>
              </button>
            </div>
            <div className="bg-fastgo-light rounded-xl p-4 flex items-center justify-center h-32 cursor-pointer hover:bg-fastgo-green/10 transition-colors group">
              <div className="p-3 rounded-full bg-white group-hover:scale-110 transition-transform">
                <HotDogIcon className="w-14 h-14" />
              </div>
            </div>
          </div>
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-fastgo-green hover:bg-fastgo-green/90 text-white rounded-xl py-6 font-medium mt-6 text-lg uppercase shadow-md"
        >
          Salvar
        </Button>
      </form>
    </CardLayout>
  );
};

export default InserirProduto;
