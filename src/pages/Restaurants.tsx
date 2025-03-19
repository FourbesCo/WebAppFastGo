
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "@/components/ui/container";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Restaurant } from "@/types";
import { getRestaurants } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { formatDistance } from "@/utils/geolocation";
import { Clock, MapPin, Search, Star } from "lucide-react";
import { toast } from "sonner";

export default function Restaurants() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setIsLoading(true);
        
        // If user has location, pass it to get restaurants sorted by distance
        let fetchedRestaurants;
        if (user?.location) {
          fetchedRestaurants = await getRestaurants(
            user.location.latitude, 
            user.location.longitude
          );
        } else {
          fetchedRestaurants = await getRestaurants();
          toast.info("Ative sua localização para ver restaurantes próximos", {
            duration: 5000,
          });
        }
        
        setRestaurants(fetchedRestaurants);
      } catch (error) {
        console.error("Failed to fetch restaurants:", error);
        toast.error("Erro ao carregar restaurantes");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchRestaurants();
  }, [user]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Filter restaurants by name or category
    if (!searchQuery.trim()) {
      // If empty search, reload all restaurants
      const fetchRestaurants = async () => {
        try {
          setIsLoading(true);
          const fetchedRestaurants = await getRestaurants(
            user?.location?.latitude,
            user?.location?.longitude
          );
          setRestaurants(fetchedRestaurants);
        } catch (error) {
          console.error("Error reloading restaurants:", error);
        } finally {
          setIsLoading(false);
        }
      };
      
      fetchRestaurants();
      return;
    }
    
    // Client-side filtering
    const filtered = restaurants.filter(restaurant => 
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.categories.some(category => 
        category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    
    setRestaurants(filtered);
  };
  
  const handleRestaurantClick = (restaurantId: string) => {
    navigate(`/restaurants/${restaurantId}`);
  };

  return (
    <div className="min-h-screen py-8 animate-fade-in bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
      <Container>
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">
              Restaurantes FastGo
            </h1>
            
            <form onSubmit={handleSearch} className="w-full sm:w-auto flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar restaurantes ou categorias..."
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
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="h-48 rounded-lg animate-pulse bg-muted"
                />
              ))}
            </div>
          ) : restaurants.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">
                Nenhum restaurante encontrado.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-2">
              {restaurants.map((restaurant) => (
                <Card 
                  key={restaurant.id} 
                  className="overflow-hidden border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-all duration-300 group cursor-pointer"
                  onClick={() => handleRestaurantClick(restaurant.id)}
                >
                  <div className="aspect-[16/9] relative overflow-hidden">
                    <img
                      src={restaurant.image}
                      alt={restaurant.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    {restaurant.distance !== undefined && (
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-white/90 text-black border-0 backdrop-blur-sm">
                          <MapPin className="h-3 w-3 mr-1 text-pink-500" />
                          {formatDistance(restaurant.distance)}
                        </Badge>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-lg">{restaurant.name}</h3>
                        {restaurant.rating && (
                          <div className="flex items-center">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                            <span className="font-medium">{restaurant.rating.toFixed(1)}</span>
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {restaurant.description}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {restaurant.categories.map((category, index) => (
                          <Badge key={index} variant="outline" className="bg-gray-50 dark:bg-gray-800">
                            {category}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="px-4 py-3 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
                    {restaurant.deliveryTime && (
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{restaurant.deliveryTime}</span>
                      </div>
                    )}
                    <Button
                      variant="ghost"
                      className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-950"
                    >
                      Ver Cardápio
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
