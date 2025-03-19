
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Restaurant } from "@/types";
import { calculateDistance } from "@/utils/geolocation";
import { useUserLocation } from "@/components/location/UserLocationProvider";

// Mock API function to get restaurants with more options
// In a real app, this would be an API call with location parameters
const fetchRestaurants = async (): Promise<Restaurant[]> => {
  // This is a mock implementation - in a real app you'd call an API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "1",
          ownerId: "owner1",
          name: "Burger Palace",
          description: "The best burgers in town with a variety of options",
          address: "Rua Augusta, 1234, São Paulo",
          phone: "(11) 99999-9999",
          email: "contact@burgerpalace.com",
          image: "https://images.unsplash.com/photo-1561758033-d89a9ad46330",
          categories: ["Hambúrguer", "Fast Food", "Americano"],
          openingHours: [
            { days: "Segunda - Sexta", hours: "11:00 - 22:00" },
            { days: "Sábado - Domingo", hours: "12:00 - 23:00" }
          ],
          location: {
            latitude: -23.561684,
            longitude: -46.655046
          },
          rating: 4.7,
          deliveryTime: "30-45 min"
        },
        {
          id: "2",
          ownerId: "owner2",
          name: "Pizza Express",
          description: "Authentic Italian pizzas made with fresh ingredients",
          address: "Av. Paulista, 1000, São Paulo",
          phone: "(11) 88888-8888",
          email: "contact@pizzaexpress.com",
          image: "https://images.unsplash.com/photo-1513104890138-7c749659a591",
          categories: ["Pizza", "Italiano", "Massas"],
          openingHours: [
            { days: "Segunda - Domingo", hours: "18:00 - 23:00" }
          ],
          location: {
            latitude: -23.563987,
            longitude: -46.652828
          },
          rating: 4.5,
          deliveryTime: "40-55 min"
        },
        {
          id: "3",
          ownerId: "owner3",
          name: "Sushi Master",
          description: "Freshest sushi and Japanese cuisine in the city",
          address: "Rua Liberdade, 400, São Paulo",
          phone: "(11) 77777-7777",
          email: "contact@sushimaster.com",
          image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c",
          categories: ["Japonês", "Sushi", "Asiático"],
          openingHours: [
            { days: "Terça - Domingo", hours: "12:00 - 15:00, 18:00 - 22:30" }
          ],
          location: {
            latitude: -23.558204,
            longitude: -46.635778
          },
          rating: 4.8,
          deliveryTime: "45-60 min"
        },
        {
          id: "4",
          ownerId: "owner4",
          name: "Taco Fiesta",
          description: "Authentic Mexican street food with a modern twist",
          address: "Rua Oscar Freire, 800, São Paulo",
          phone: "(11) 66666-6666",
          email: "contact@tacofiesta.com",
          image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b",
          categories: ["Mexicano", "Fast Food", "Latino"],
          openingHours: [
            { days: "Segunda - Sábado", hours: "11:30 - 22:00" }
          ],
          location: {
            latitude: -23.566232,
            longitude: -46.672206
          },
          rating: 4.3,
          deliveryTime: "25-40 min"
        },
        {
          id: "5",
          ownerId: "owner5",
          name: "Salad & Co",
          description: "Healthy and delicious salads and smoothies",
          address: "Av. Brigadeiro Faria Lima, 1500, São Paulo",
          phone: "(11) 55555-5555",
          email: "contact@saladco.com",
          image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
          categories: ["Saudável", "Saladas", "Vegano"],
          openingHours: [
            { days: "Segunda - Sexta", hours: "08:00 - 20:00" },
            { days: "Sábado", hours: "09:00 - 18:00" }
          ],
          location: {
            latitude: -23.567238,
            longitude: -46.693559
          },
          rating: 4.6,
          deliveryTime: "15-30 min"
        },
        {
          id: "6",
          ownerId: "owner6",
          name: "Cantina Da Nonna",
          description: "Traditional Italian cuisine with family recipes passed down for generations",
          address: "Rua Avanhandava, 75, Centro",
          phone: "(11) 44444-4444",
          email: "cantina@danonna.com",
          image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5",
          categories: ["Italiano", "Massas", "Tradicional"],
          openingHours: [
            { days: "Terça - Domingo", hours: "12:00 - 16:00, 19:00 - 23:00" }
          ],
          location: {
            latitude: -23.551234,
            longitude: -46.642351
          },
          rating: 4.9,
          deliveryTime: "40-60 min"
        },
        {
          id: "7",
          ownerId: "owner7",
          name: "Bistrô Francês",
          description: "Authentic French cuisine with a modern twist in an elegant atmosphere",
          address: "Alameda Santos, 800, Jardins",
          phone: "(11) 33333-3333",
          email: "info@bistrofrances.com",
          image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0",
          categories: ["Francês", "Gourmet", "Vinhos"],
          openingHours: [
            { days: "Terça - Sábado", hours: "19:00 - 23:30" },
            { days: "Domingo", hours: "12:00 - 16:00" }
          ],
          location: {
            latitude: -23.569461,
            longitude: -46.648355
          },
          rating: 4.8,
          deliveryTime: "50-70 min"
        },
        {
          id: "8",
          ownerId: "owner8",
          name: "Cafeteria Grão",
          description: "Specialty coffee, artisanal pastries and light meals in a cozy atmosphere",
          address: "Rua dos Pinheiros, 300, Pinheiros",
          phone: "(11) 22222-2222",
          email: "hello@cafegraos.com",
          image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb",
          categories: ["Café", "Brunch", "Doces"],
          openingHours: [
            { days: "Segunda - Domingo", hours: "08:00 - 20:00" }
          ],
          location: {
            latitude: -23.566121,
            longitude: -46.678987
          },
          rating: 4.5,
          deliveryTime: "15-25 min"
        },
        {
          id: "9",
          ownerId: "owner9",
          name: "Sabor da Terra",
          description: "Authentic Brazilian cuisine focusing on regional specialties and local ingredients",
          address: "Rua Bela Cintra, 1500, Consolação",
          phone: "(11) 11111-1111",
          email: "contato@sabordaterra.com",
          image: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0",
          categories: ["Brasileira", "Regional", "Orgânico"],
          openingHours: [
            { days: "Segunda - Sábado", hours: "11:30 - 15:00, 18:00 - 22:00" }
          ],
          location: {
            latitude: -23.555678,
            longitude: -46.660123
          },
          rating: 4.6,
          deliveryTime: "30-45 min"
        },
        {
          id: "10",
          ownerId: "owner10",
          name: "Cozinha Árabe",
          description: "Authentic Middle Eastern cuisine with fresh ingredients and traditional recipes",
          address: "Alameda Lorena, 600, Jardins",
          phone: "(11) 00000-0000",
          email: "info@cozinhaarabe.com",
          image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
          categories: ["Árabe", "Mediterrâneo", "Vegetariano"],
          openingHours: [
            { days: "Segunda - Domingo", hours: "11:00 - 23:00" }
          ],
          location: {
            latitude: -23.571234,
            longitude: -46.659876
          },
          rating: 4.7,
          deliveryTime: "25-40 min"
        }
      ]);
    }, 500);
  });
};

export function useNearbyRestaurants(maxDistance?: number) {
  const { userLocation } = useUserLocation();
  const [sortedRestaurants, setSortedRestaurants] = useState<Restaurant[]>([]);

  const { data: restaurants, isLoading, error } = useQuery({
    queryKey: ["restaurants"],
    queryFn: fetchRestaurants,
  });

  useEffect(() => {
    if (restaurants && userLocation) {
      // Calculate distance for each restaurant
      const restaurantsWithDistance = restaurants.map(restaurant => {
        const distance = calculateDistance(
          userLocation.latitude,
          userLocation.longitude,
          restaurant.location.latitude,
          restaurant.location.longitude
        );
        
        return {
          ...restaurant,
          distance
        };
      });
      
      // Filter by max distance if provided
      const filteredRestaurants = maxDistance 
        ? restaurantsWithDistance.filter(r => r.distance <= maxDistance)
        : restaurantsWithDistance;
      
      // Sort by distance (closest first)
      const sorted = [...filteredRestaurants].sort((a, b) => {
        if (a.distance === undefined) return 1;
        if (b.distance === undefined) return -1;
        return a.distance - b.distance;
      });
      
      setSortedRestaurants(sorted);
    } else if (restaurants) {
      // If no user location, just return unsorted
      setSortedRestaurants(restaurants);
    }
  }, [restaurants, userLocation, maxDistance]);

  return {
    restaurants: sortedRestaurants,
    isLoading,
    error,
    userLocation
  };
}
