
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, ShoppingBag, CreditCard, User, 
  Settings, Package, List, Plus, ChevronsUpDown 
} from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { useIsMobile } from '@/hooks/use-mobile';

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  
  return (
    <div >
      <div className="container mx-auto flex justify-between items-center">
        <Button 
          variant="ghost" 
          className="md:hidden" 
          onClick={() => navigate('/menu')}
        >
          <Home size={20} />
        </Button>
        
        <div className="hidden md:block">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/menu')}
            className="text-xl font-bold"
          >
            FastGo
          </Button>
        </div>
        
        {!isMobile && (
          <div className="hidden md:flex space-x-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/menu')}
              className={location.pathname === '/menu' ? 'bg-gray-100' : ''}
            >
              <Home size={16} className="mr-2" />
              Menu
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => navigate('/produtos')}
              className={location.pathname === '/produtos' ? 'bg-gray-100' : ''}
            >
              <ShoppingBag size={16} className="mr-2" />
              Produtos
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => navigate('/clientes')}
              className={location.pathname === '/clientes' ? 'bg-gray-100' : ''}
            >
              <User size={16} className="mr-2" />
              Clientes
            </Button>
          </div>
        )}
        
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <ChevronsUpDown className="mr-1" size={16} />
                <span className="hidden md:inline">Páginas</span>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-[200px] gap-3 p-4 md:w-[300px]">
                  <NavigationMenuLink 
                    className="flex items-center py-2 px-3 rounded-md hover:bg-gray-100 cursor-pointer"
                    onClick={() => navigate('/menu')}
                  >
                    <Home size={16} className="mr-2" />
                    Menu Principal
                  </NavigationMenuLink>
                  
                  <NavigationMenuLink 
                    className="flex items-center py-2 px-3 rounded-md hover:bg-gray-100 cursor-pointer"
                    onClick={() => navigate('/produtos')}
                  >
                    <ShoppingBag size={16} className="mr-2" />
                    Produtos
                  </NavigationMenuLink>
                  
                  <NavigationMenuLink 
                    className="flex items-center py-2 px-3 rounded-md hover:bg-gray-100 cursor-pointer"
                    onClick={() => navigate('/opcoes-pagamento')}
                  >
                    <CreditCard size={16} className="mr-2" />
                    Opções de Pagamento
                  </NavigationMenuLink>
                  
                  <NavigationMenuLink 
                    className="flex items-center py-2 px-3 rounded-md hover:bg-gray-100 cursor-pointer"
                    onClick={() => navigate('/inserir-cartao')}
                  >
                    <CreditCard size={16} className="mr-2" />
                    Inserir Cartão
                  </NavigationMenuLink>
                  
                  <NavigationMenuLink 
                    className="flex items-center py-2 px-3 rounded-md hover:bg-gray-100 cursor-pointer"
                    onClick={() => navigate('/inserir-produto')}
                  >
                    <Plus size={16} className="mr-2" />
                    Inserir Produto
                  </NavigationMenuLink>
                  
                  <NavigationMenuLink 
                    className="flex items-center py-2 px-3 rounded-md hover:bg-gray-100 cursor-pointer"
                    onClick={() => navigate('/lista-itens')}
                  >
                    <List size={16} className="mr-2" />
                    Lista de Itens
                  </NavigationMenuLink>
                  
                  <NavigationMenuLink 
                    className="flex items-center py-2 px-3 rounded-md hover:bg-gray-100 cursor-pointer"
                    onClick={() => navigate('/clientes')}
                  >
                    <User size={16} className="mr-2" />
                    Clientes
                  </NavigationMenuLink>
                  
                  <NavigationMenuLink 
                    className="flex items-center py-2 px-3 rounded-md hover:bg-gray-100 cursor-pointer"
                    onClick={() => navigate('/configuracoes')}
                  >
                    <Settings size={16} className="mr-2" />
                    Configurações
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        
        <div className="flex space-x-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden" 
            onClick={() => navigate('/produtos')}
          >
            <Package size={20} />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden" 
            onClick={() => navigate('/configuracoes')}
          >
            <Settings size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
