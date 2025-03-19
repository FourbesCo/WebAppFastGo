
import { useState, useEffect } from "react";
import { Container } from "@/components/ui/container";
import { getCategories, getMenuItems } from "@/lib/api";
import { Category, MenuItem } from "@/types";
import { useCart } from "@/context/CartContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Minus, Search, Leaf, Wheat } from "lucide-react";
import { toast } from "sonner";

export default function Menu() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  
  const { addItem } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const categoriesData = await getCategories();
        setCategories(categoriesData);
        
        if (categoriesData.length > 0) {
          setActiveCategory(categoriesData[0].id);
          const items = await getMenuItems(categoriesData[0].id);
          setMenuItems(items);
        }
      } catch (error) {
        console.error("Failed to fetch menu data:", error);
        toast.error("Erro ao carregar o cardápio");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  const handleCategoryChange = async (categoryId: string) => {
    if (categoryId === activeCategory) return;
    
    setIsLoading(true);
    setActiveCategory(categoryId);
    
    try {
      const items = await getMenuItems(categoryId);
      setMenuItems(items);
    } catch (error) {
      console.error("Failed to fetch menu items:", error);
      toast.error("Erro ao carregar os itens do menu");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleAddToCart = async () => {
    if (!selectedItem) return;
    
    try {
      await addItem(selectedItem.id, quantity, undefined, specialInstructions.trim() || undefined);
      setSelectedItem(null);
      setQuantity(1);
      setSpecialInstructions("");
      toast.success("Item adicionado ao carrinho!");
    } catch (error) {
      console.error("Failed to add item to cart:", error);
      toast.error("Erro ao adicionar item ao carrinho");
    }
  };
  
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      if (activeCategory) {
        const items = await getMenuItems(activeCategory);
        setMenuItems(items);
      }
      return;
    }
    
    setIsLoading(true);
    try {
      const allItems = await getMenuItems();
      const filtered = allItems.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setMenuItems(filtered);
      setActiveCategory(null);
    } catch (error) {
      console.error("Error searching items:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const filteredItems = menuItems;

  return (
    <div className="min-h-screen py-8 animate-fade-in bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
      <Container>
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">Cardápio FastGo</h1>
            
            <form onSubmit={handleSearch} className="w-full sm:w-auto flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar itens..."
                  className="pl-10 w-full sm:w-[200px] md:w-[300px] bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-indigo-200 dark:border-gray-700"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button 
                type="submit" 
                variant="secondary"
                className="bg-gradient-to-r from-indigo-600 to-pink-500 text-white hover:from-indigo-700 hover:to-pink-600"
              >
                Buscar
              </Button>
            </form>
          </div>
          
          {categories.length > 0 && (
            <Tabs 
              value={activeCategory || "all"} 
              onValueChange={handleCategoryChange}
              className="w-full"
            >
              <TabsList className="h-auto flex flex-nowrap overflow-x-auto p-1 w-full md:justify-center bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg mb-4 border border-indigo-100 dark:border-gray-800">
                {categories.map((category) => (
                  <TabsTrigger 
                    key={category.id} 
                    value={category.id}
                    className="py-2 px-4 whitespace-nowrap data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-pink-500 data-[state=active]:text-white"
                  >
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          )}
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="h-48 rounded-lg animate-pulse bg-muted"
                />
              ))}
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">
                Nenhum item encontrado nesta categoria.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-2">
              {filteredItems.map((item) => (
                <Card 
                  key={item.id} 
                  className="overflow-hidden border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="aspect-[16/10] relative overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute top-2 right-2 flex flex-col gap-2">
                      {item.popular && (
                        <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0">
                          Popular
                        </Badge>
                      )}
                      {item.featured && (
                        <Badge className="bg-gradient-to-r from-indigo-600 to-pink-500 text-white border-0">
                          Destaque
                        </Badge>
                      )}
                    </div>
                    <div className="absolute top-2 left-2 flex flex-col gap-2">
                      {item.vegetarian && (
                        <Badge className="bg-green-500 text-white flex items-center gap-1 border-0">
                          <Leaf className="h-3 w-3" />
                          Vegetariano
                        </Badge>
                      )}
                      {item.vegan && (
                        <Badge className="bg-emerald-500 text-white flex items-center gap-1 border-0">
                          <Leaf className="h-3 w-3" />
                          Vegano
                        </Badge>
                      )}
                      {item.glutenFree && (
                        <Badge className="bg-amber-600 text-white flex items-center gap-1 border-0">
                          <Wheat className="h-3 w-3" />
                          Sem Glúten
                        </Badge>
                      )}
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg">{item.name}</h3>
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                        R$ {item.price.toFixed(2)}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {item.description}
                    </p>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          className="w-full bg-gradient-to-r from-indigo-600 to-pink-500 text-white hover:from-indigo-700 hover:to-pink-600"
                          onClick={() => setSelectedItem(item)}
                        >
                          Adicionar ao Carrinho
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle className="text-xl font-bold">
                            {item.name}
                          </DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          {item.image && (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-48 object-cover rounded-lg"
                            />
                          )}
                          <p className="text-sm text-muted-foreground">
                            {item.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <Label htmlFor="quantity">Quantidade:</Label>
                            <div className="flex items-center">
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                disabled={quantity <= 1}
                                className="border-indigo-200 text-indigo-600"
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="w-10 text-center">
                                {quantity}
                              </span>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => setQuantity(quantity + 1)}
                                className="border-indigo-200 text-indigo-600"
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="special-instructions">
                              Instruções especiais:
                            </Label>
                            <Textarea
                              id="special-instructions"
                              placeholder="Ex: Sem cebola, molho à parte..."
                              value={specialInstructions}
                              onChange={(e) => setSpecialInstructions(e.target.value)}
                              className="border-indigo-200"
                            />
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="font-semibold">
                              Total: R$ {(item.price * quantity).toFixed(2)}
                            </span>
                            <Button 
                              onClick={handleAddToCart}
                              className="bg-gradient-to-r from-indigo-600 to-pink-500 text-white hover:from-indigo-700 hover:to-pink-600"
                            >
                              Adicionar ao Carrinho
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
