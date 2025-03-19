
import React, { createContext, useContext, useState, useEffect } from "react";
import { getCurrentPosition } from "@/utils/geolocation";
import { useToast } from "@/components/ui/use-toast";

interface UserLocationContextType {
  userLocation: { latitude: number; longitude: number } | null;
  isLoading: boolean;
  error: string | null;
  refreshLocation: () => Promise<void>;
}

const UserLocationContext = createContext<UserLocationContextType>({
  userLocation: null,
  isLoading: false,
  error: null,
  refreshLocation: async () => {},
});

export const useUserLocation = () => useContext(UserLocationContext);

export function UserLocationProvider({ children }: { children: React.ReactNode }) {
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const getLocation = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const position = await getCurrentPosition();
      const location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
      setUserLocation(location);
      localStorage.setItem("userLocation", JSON.stringify(location));
    } catch (err) {
      console.error("Error getting user location:", err);
      setError("Não foi possível obter sua localização. Alguns recursos podem estar limitados.");
      
      // Try to use saved location
      const savedLocation = localStorage.getItem("userLocation");
      if (savedLocation) {
        try {
          setUserLocation(JSON.parse(savedLocation));
        } catch (e) {
          console.error("Error parsing saved location:", e);
        }
      }
      
      toast({
        title: "Erro de localização",
        description: "Não foi possível obter sua localização. Alguns recursos podem estar limitados.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Try to use saved location first
    const savedLocation = localStorage.getItem("userLocation");
    if (savedLocation) {
      try {
        setUserLocation(JSON.parse(savedLocation));
        setIsLoading(false);
      } catch (e) {
        console.error("Error parsing saved location:", e);
        getLocation();
      }
    } else {
      getLocation();
    }
  }, []);

  const refreshLocation = async () => {
    await getLocation();
  };

  return (
    <UserLocationContext.Provider
      value={{
        userLocation,
        isLoading,
        error,
        refreshLocation,
      }}
    >
      {children}
    </UserLocationContext.Provider>
  );
}
