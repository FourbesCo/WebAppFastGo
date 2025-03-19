
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Star } from "lucide-react";
import { Restaurant } from "@/types";
import { formatDistance } from "@/utils/geolocation";

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export function RestaurantCard({ restaurant }: RestaurantCardProps) {
  const { id, name, description, image, categories, rating, deliveryTime, distance } = restaurant;

  return (
    <Link to={`/restaurants/${id}`}>
      <Card className="h-full overflow-hidden transition-all hover:shadow-md">
        <div className="aspect-video w-full overflow-hidden">
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover transition-transform hover:scale-105"
          />
        </div>
        <CardHeader className="p-4 pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-xl">{name}</CardTitle>
            {rating && (
              <div className="flex items-center text-amber-500">
                <Star className="h-4 w-4 fill-current mr-1" />
                <span className="text-sm font-medium">{rating.toFixed(1)}</span>
              </div>
            )}
          </div>
          <CardDescription className="line-clamp-2">{description}</CardDescription>
        </CardHeader>
        <CardContent className="p-4 pt-0 pb-2">
          <div className="flex flex-wrap gap-1">
            {categories.slice(0, 3).map((category, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {category}
              </Badge>
            ))}
            {categories.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{categories.length - 3}
              </Badge>
            )}
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 text-sm text-muted-foreground">
          <div className="flex justify-between w-full">
            {deliveryTime && (
              <div className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                <span>{deliveryTime}</span>
              </div>
            )}
            {distance !== undefined && (
              <div className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                <span>{formatDistance(distance)}</span>
              </div>
            )}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
