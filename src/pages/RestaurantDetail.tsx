
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container } from "@/components/ui/container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Restaurant, MenuItem, Category } from "@/types";
import { getRestaurant, getRestaurantCategories, getRestaurantMenuItems } from "@/lib/api";
import { useCart } from "@/context/CartContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { formatDistance } from "@/utils/geolocation";
import { Plus, Minus, MapPin, Clock, Phone, Mail, Leaf, Wheat, Star, Info } from "lucide-react";
import { toast } from "sonner";

export default function RestaurantDetail() {
  const { id } = useParams<{ id: string }>();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState("");
  const { addItem } = useCart();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!id) return;
    
    const fetchRestaurantData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch restaurant
        const restaurantData = await getRestaurant(id);
        setRestaurant(restaurantData);
        
        // Fetch categories for this restaurant
        const categoriesData = await getRestaurantCategories(id);
        setCategories(categoriesData);
        
        if (categoriesData.length > 0) {
          setActiveCategory(categoriesData[0].id);
          
          // Fetch menu items for first category
          const items = await getRestaurantMenuItems(id, categoriesData[0].id);
          setMenuItems(items);
        }
      } catch (error) {
        console.error("Failed to fetch restaurant data:", error);
        toast.error("Erro ao carregar dados do restaurante");
        navigate('/restaurants'); // Redirect back to restaurants page on error
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchRestaurantData();
  }, [id, navigate]);
  
  const handleCategoryChange = async (categoryId: string) => {
    if (categoryId === activeCategory || !id) return;
    
    setIsLoading(true);
    setActiveCategory(categoryId);
    
    try {
      const items = await getRestaurantMenuItems(id, categoryId);
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
    } catch (error) {
      console.error("Failed to add item to cart:", error);
      toast.error("Erro ao adicionar item ao carrinho");
    }
  };
  
  if (!restaurant && !isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Restaurante não encontrado</h1>
          <Button 
            onClick={() => navigate('/restaurants')} 
            className="mt-4"
          >
            Voltar para restaurantes
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 animate-fade-in bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
      <Container>
        {isLoading && !restaurant ? (
          <div className="flex flex-col space-y-6">
            <div className="h-64 rounded-lg animate-pulse bg-muted" />
            <div className="h-8 w-64 rounded animate-pulse bg-muted" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="h-48 rounded-lg animate-pulse bg-muted" />
              ))}
            </div>
          </div>
        ) : restaurant && (
          <div className="flex flex-col space-y-6">
            <div className="relative h-64 md:h-80 rounded-xl overflow-hidden">
              <img 
                src={restaurant.image} 
                alt={restaurant.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{restaurant.name}</h1>
                
                <div className="flex flex-wrap items-center gap-4 mb-3">
                  {restaurant.rating && (
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                      <span className="font-medium">{restaurant.rating.toFixed(1)}</span>
                    </div>
                  )}
                  
                  {restaurant.distance !== undefined && (
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{formatDistance(restaurant.distance)}</span>
                    </div>
                  )}
                  
                  {restaurant.deliveryTime && (
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{restaurant.deliveryTime}</span>
                    </div>
                  )}
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {restaurant.categories.map((category, index) => (
                    <Badge key={index} className="bg-white/20 backdrop-blur-sm text-white border-0">
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                  <h2 className="text-xl font-bold mb-4">Sobre o restaurante</h2>
                  <p className="text-muted-foreground mb-4">{restaurant.description}</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-indigo-600 mr-2 mt-0.5" />
                      <div>
                        <h3 className="font-medium">Endereço</h3>
                        <p className="text-sm text-muted-foreground">{restaurant.address}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Phone className="h-5 w-5 text-indigo-600 mr-2 mt-0.5" />
                      <div>
                        <h3 className="font-medium">Telefone</h3>
                        <p className="text-sm text-muted-foreground">{restaurant.phone}</p>
                      </div>
                    </div>
                    
                    {restaurant.email && (
                      <div className="flex items-start">
                        <Mail className="h-5 w-5 text-indigo-600 mr-2 mt-0.5" />
                        <div>
                          <h3 className="font-medium">Email</h3>
                          <p className="text-sm text-muted-foreground">{restaurant.email}</p>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-start">
                      <Clock className="h-5 w-5 text-indigo-600 mr-2 mt-0.5" />
                      <div>
                        <h3 className="font-medium">Horários</h3>
                        <div className="text-sm text-muted-foreground">
                          {restaurant.openingHours.map((schedule, index) => (
                            <div key={index}>{schedule.days}: {schedule.hours}</div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-100 dark:border-gray-700 h-fit">
                <h2 className="text-xl font-bold mb-4">Informações</h2>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Info className="h-5 w-5 text-indigo-600 mr-2" />
                    <span className="text-muted-foreground">Retirada no local</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-indigo-600 mr-2" />
                    <span className="text-muted-foreground">Tempo estimado: {restaurant.deliveryTime}</span>
                  </div>
                  <Button 
                    className="w-full mt-4 bg-gradient-to-r from-indigo-600 to-pink-500 text-white hover:from-indigo-700 hover:to-pink-600"
                    onClick={() => document.getElementById('menu-section')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Ver Cardápio
                  </Button>
                </div>
              </div>
            </div>
            
            <div id="menu-section" className="pt-6">
              <h2 className="text-2xl font-bold mb-6">Cardápio</h2>
              
              {categories.length > 0 && (
                <Tabs 
                  value={activeCategory || categories[0].id} 
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
                  
                  {categories.map((category) => (
                    <TabsContent 
                      key={category.id} 
                      value={category.id}
                      className="space-y-6"
                    >
                      {isLoading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {[...Array(6)].map((_, index) => (
                            <div key={index} className="h-48 rounded-lg animate-pulse bg-muted" />
                          ))}
                        </div>
                      ) : menuItems.length === 0 ? (
                        <div className="text-center py-12">
                          <p className="text-lg text-muted-foreground">
                            Nenhum item encontrado nesta categoria.
                          </p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {menuItems.map((item) => (
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
                    </TabsContent>
                  ))}
                </Tabs>
              )}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
