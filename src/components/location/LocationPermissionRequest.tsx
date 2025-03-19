
import { useState } from "react";
import { MapPin, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useUserLocation } from "@/components/location/UserLocationProvider";

export function LocationPermissionRequest() {
  const { userLocation, isLoading, error, refreshLocation } = useUserLocation();
  const [showCard, setShowCard] = useState(!userLocation && !isLoading);

  if (userLocation || !showCard) {
    return null;
  }

  return (
    <Card className="mb-6 border-yellow-200 bg-amber-50">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <MapPin className="h-5 w-5 text-amber-500" />
          Permitir acesso à localização?
        </CardTitle>
        <CardDescription className="text-amber-700">
          Permitir o acesso à sua localização nos ajudará a mostrar restaurantes próximos a você.
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Erro de permissão</AlertTitle>
            <AlertDescription>
              {error}
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          variant="ghost" 
          onClick={() => setShowCard(false)}
        >
          Mais tarde
        </Button>
        <Button 
          className="bg-amber-500 hover:bg-amber-600 text-white"
          disabled={isLoading}
          onClick={refreshLocation}
        >
          {isLoading ? "Obtendo localização..." : "Permitir localização"}
        </Button>
      </CardFooter>
    </Card>
  );
}
