
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getCurrentPosition } from "@/utils/geolocation";

interface RestaurantGeolocationProps {
  onLocationChange: (location: { latitude: number; longitude: number }) => void;
  defaultLocation?: { latitude: number; longitude: number };
}

export function RestaurantGeolocation({ onLocationChange, defaultLocation }: RestaurantGeolocationProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(
    defaultLocation || null
  );

  useEffect(() => {
    if (defaultLocation) {
      setLocation(defaultLocation);
    }
  }, [defaultLocation]);

  const handleGetLocation = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const position = await getCurrentPosition();
      const newLocation = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
      
      setLocation(newLocation);
      onLocationChange(newLocation);
    } catch (err) {
      console.error("Error getting location:", err);
      setError("Não foi possível obter sua localização. Por favor, verifique as permissões do navegador e tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium">Localização</h3>
          <p className="text-sm text-muted-foreground">
            {location
              ? `Latitude: ${location.latitude.toFixed(6)}, Longitude: ${location.longitude.toFixed(6)}`
              : "Nenhuma localização definida"}
          </p>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleGetLocation}
          disabled={isLoading}
        >
          <MapPin className="mr-2 h-4 w-4" />
          {isLoading ? "Obtendo..." : "Obter Localização"}
        </Button>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Erro</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
