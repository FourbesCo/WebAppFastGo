
import React, { useState, useEffect } from 'react';
import CardLayout from '../components/layout/CardLayout';
import { BurgerIcon, HotDogIcon, FriesIcon } from '../components/icons/FoodIcons';
import { Plus, Edit, Trash, Search, Filter, ArrowUpDown } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Pagination, 
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

// Food item data
const foodItems = [
  {
    id: 1,
    name: 'HAMBÚRGUER SALADA',
    price: 25.00,
    description: 'Hambúrguer, alface, tomate, cebola, queijo e maionese especial',
    icon: BurgerIcon,
    category: 'lanches'
  },
  {
    id: 2,
    name: 'SALSICHA-CHIPS',
    price: 15.00,
    description: 'Pão-maior com salsicha, batata-frita e ketchup',
    icon: HotDogIcon,
    category: 'lanches'
  },
  {
    id: 3,
    name: 'HOT-DOG',
    price: 10.00,
    description: 'Pão-menor com salsicha e ketchup. Saboroso e rápido.',
    icon: HotDogIcon,
    category: 'lanches'
  },
  {
    id: 4,
    name: 'BATATA-FRITA',
    price: 18.00,
    description: 'Porção de batatas crocantes, fritas com tempero especial.',
    icon: FriesIcon,
    category: 'lanches'
  },
  {
    id: 5,
    name: 'X-TUDO',
    price: 29.90,
    description: 'Pão, hambúrguer, ovo, bacon, salada, queijo e molho especial',
    icon: BurgerIcon,
    category: 'lanches'
  },
  {
    id: 6,
    name: 'X-BACON',
    price: 26.90,
    description: 'Pão, hambúrguer, bacon, queijo, e molho da casa',
    icon: BurgerIcon,
    category: 'lanches'
  },
  {
    id: 7,
    name: 'X-SALADA',
    price: 24.90,
    description: 'Pão, hambúrguer, queijo, alface, tomate e molho',
    icon: BurgerIcon,
    category: 'lanches'
  },
  {
    id: 8,
    name: 'PORÇÃO MISTA',
    price: 35.00,
    description: 'Batata frita, calabresa, polenta e aipim',
    icon: FriesIcon,
    category: 'lanches'
  },
  {
    id: 9,
    name: 'CACHORRO-QUENTE ESPECIAL',
    price: 18.00,
    description: 'Pão, salsicha, purê, batata palha, milho, ervilha e molhos',
    icon: HotDogIcon,
    category: 'lanches'
  },
  {
    id: 10,
    name: 'COMBO FAMÍLIA',
    price: 65.00,
    description: '2 hambúrgueres, 2 hot-dogs, batata grande e refrigerante 2L',
    icon: BurgerIcon,
    category: 'lanches'
  },
  {
    id: 11,
    name: 'REFRIGERANTE LATA',
    price: 5.00,
    description: 'Coca-cola, Pepsi, Guaraná, Sprite (350ml)',
    icon: FriesIcon,
    category: 'bebidas'
  },
  {
    id: 12,
    name: 'SUCO NATURAL',
    price: 8.00,
    description: 'Laranja, abacaxi, maracujá ou limão (300ml)',
    icon: FriesIcon,
    category: 'bebidas'
  }
];

// Available sort options
const sortOptions = [
  { value: "name-asc", label: "Nome (A-Z)" },
  { value: "name-desc", label: "Nome (Z-A)" },
  { value: "price-asc", label: "Preço (menor-maior)" },
  { value: "price-desc", label: "Preço (maior-menor)" },
];

const ListaItens = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState('lanches');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('name-asc');
  const itemsPerPage = 5;
  
  // Reset pagination when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchTerm]);
  
  // Filter items by category and search term
  const filteredItems = foodItems.filter(item => {
    const categoryMatch = item.category === activeCategory;
    const searchMatch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return categoryMatch && (searchTerm === '' || searchMatch);
  });
  
  // Sort items based on selected option
  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      default:
        return 0;
    }
  });
  
  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedItems.slice(indexOfFirstItem, indexOfLastItem);
  
  // Calculate total pages
  const totalPages = Math.ceil(sortedItems.length / itemsPerPage);
  
  return (
    <CardLayout title="CARDÁPIO">
      <div className="flex flex-col h-full">
        {/* Search bar */}
        <div className="relative flex-1 mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-fastgo-green opacity-70" />
          <Input 
            type="text" 
            placeholder="Buscar item..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="fastgo-input pl-10 py-2 text-sm w-full bg-white/5 border-white/10"
          />
        </div>
        
        {/* Filter and Sort section */}
        <div className="flex items-center justify-between mb-4">
          <button 
            onClick={() => setShowFilters(!showFilters)} 
            className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors border border-white/10 flex items-center gap-2"
          >
            <Filter className="h-4 w-4 text-fastgo-green" />
            <span className="text-sm">Filtros</span>
          </button>
          
          {showFilters && (
            <div className="flex-1 ml-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="bg-white/5 border-white/10 text-white">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent className="bg-fastgo-dark border-white/10">
                  {sortOptions.map((option) => (
                    <SelectItem 
                      key={option.value} 
                      value={option.value}
                      className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white"
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
        
        {/* Category Tabs */}
        <Tabs defaultValue="lanches" className="w-full mb-4" onValueChange={setActiveCategory}>
          <TabsList className="w-full bg-fastgo-dark/50 backdrop-blur-sm border border-white/10 rounded-xl p-1">
            <TabsTrigger 
              value="lanches" 
              className="flex-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-fastgo-green data-[state=active]:to-fastgo-green/80 data-[state=active]:text-white rounded-lg"
            >
              Lanches
            </TabsTrigger>
            <TabsTrigger 
              value="bebidas" 
              className="flex-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-fastgo-green data-[state=active]:to-fastgo-green/80 data-[state=active]:text-white rounded-lg"
            >
              Bebidas
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="lanches" className="mt-2">
            <div className="flex justify-between items-center mb-3">
              <div className="text-white font-medium text-lg flex items-center gap-2">
                <div className="w-8 h-8 bg-fastgo-green/20 rounded-lg flex items-center justify-center">
                  <BurgerIcon className="w-5 h-5" />
                </div>
                <span>LANCHES</span>
              </div>
              <button className="text-xs bg-fastgo-green text-white flex items-center gap-1 rounded-full px-3 py-1.5 hover:bg-fastgo-green/90 transition-colors shadow-glow-sm">
                <Plus size={14} />
                <span>Novo</span>
              </button>
            </div>
          </TabsContent>
          
          <TabsContent value="bebidas" className="mt-2">
            <div className="flex justify-between items-center mb-3">
              <div className="text-white font-medium text-lg flex items-center gap-2">
                <div className="w-8 h-8 bg-fastgo-green/20 rounded-lg flex items-center justify-center">
                  <FriesIcon className="w-5 h-5" />
                </div>
                <span>BEBIDAS</span>
              </div>
              <button className="text-xs bg-fastgo-green text-white flex items-center gap-1 rounded-full px-3 py-1.5 hover:bg-fastgo-green/90 transition-colors shadow-glow-sm">
                <Plus size={14} />
                <span>Novo</span>
              </button>
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Results count */}
        {filteredItems.length > 0 ? (
          <div className="text-xs text-gray-400 mb-3">
            Mostrando {Math.min(indexOfFirstItem + 1, filteredItems.length)} - {Math.min(indexOfLastItem, filteredItems.length)} de {filteredItems.length} itens
          </div>
        ) : (
          <div className="text-center py-8 text-gray-400">
            Nenhum item encontrado para "{searchTerm}"
          </div>
        )}
        
        {/* Food items list */}
        <div className="space-y-4 flex-1 overflow-y-auto pr-1 scrollbar-hide">
          {currentItems.map((item, index) => (
            <div 
              key={item.id} 
              className="food-item-card animate-fade-in"
              style={{animationDelay: `${index * 50}ms`}}
            >
              <div className="flex gap-3">
                <div className="flex-shrink-0 p-3 bg-gradient-to-br from-white/10 to-transparent rounded-xl group-hover:from-white/15 transition-all">
                  <item.icon className="w-12 h-12" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <h3 className="text-base font-semibold text-white mb-1">{item.name}</h3>
                    <div className="price-tag bg-gradient-to-r from-fastgo-green to-fastgo-green/80 shadow-glow-sm">
                      R$ {item.price.toFixed(2).replace('.', ',')}
                    </div>
                  </div>
                  <p className="text-sm text-gray-300 line-clamp-2">{item.description}</p>
                  
                  <div className="mt-3 pt-2 border-t border-white/5 flex justify-end gap-2">
                    <button className="p-1.5 rounded-full hover:bg-white/10 transition-colors">
                      <Edit size={18} className="text-fastgo-green" />
                    </button>
                    <button className="p-1.5 rounded-full hover:bg-white/10 transition-colors">
                      <Trash size={18} className="text-fastgo-purple" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-4 pt-2 border-t border-white/10">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    className={`${currentPage === 1 ? 'opacity-50 pointer-events-none' : ''} bg-gradient-to-r from-fastgo-green/20 to-fastgo-green/10 border border-white/10 hover:bg-white/10 transition-colors`}
                  />
                </PaginationItem>
                
                {Array.from({ length: totalPages }).map((_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      onClick={() => setCurrentPage(index + 1)}
                      isActive={currentPage === index + 1}
                      className={`${currentPage === index + 1 
                        ? 'bg-gradient-to-r from-fastgo-green to-fastgo-green/80 border-transparent shadow-glow-sm' 
                        : 'bg-white/5 border-white/10 hover:bg-white/10'} transition-all duration-300`}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    className={`${currentPage === totalPages ? 'opacity-50 pointer-events-none' : ''} bg-gradient-to-r from-fastgo-green/20 to-fastgo-green/10 border border-white/10 hover:bg-white/10 transition-colors`}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </CardLayout>
  );
};

export default ListaItens;
