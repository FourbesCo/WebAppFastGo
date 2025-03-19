
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  role?: "user" | "admin" | "restaurant_owner";
  location?: {
    latitude: number;
    longitude: number;
  };
}

export interface Restaurant {
  id: string;
  ownerId: string;
  name: string;
  description: string;
  address: string;
  phone: string;
  email?: string;
  image: string;
  categories: string[];
  openingHours: {
    days: string;
    hours: string;
  }[];
  location: {
    latitude: number;
    longitude: number;
  };
  rating?: number;
  deliveryTime?: string;
  distance?: number; // Calculated based on user location
  menu?: MenuItem[]; // Each restaurant has its own menu items
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  image?: string;
  restaurantId?: string; // To associate with specific restaurant
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  categoryId: string;
  restaurantId: string; // To associate with specific restaurant
  options?: MenuItemOption[];
  popular?: boolean;
  vegetarian?: boolean;
  vegan?: boolean;
  glutenFree?: boolean;
  featured?: boolean;
}

export interface MenuItemOption {
  id: string;
  name: string;
  choices: {
    id: string;
    name: string;
    price?: number;
  }[];
  required?: boolean;
  multiple?: boolean;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  selectedOptions?: {
    optionId: string;
    choiceIds: string[];
  }[];
  specialInstructions?: string;
  totalPrice: number;
}

export interface Order {
  id: string;
  userId: string;
  restaurantId: string;
  items: CartItem[];
  status: 'pending' | 'confirmed' | 'ready' | 'completed' | 'cancelled';
  createdAt: string;
  estimatedPickupTime?: string;
  paymentMethod: string;
  totalAmount: number;
  specialInstructions?: string;
}

export type AuthStatus = 'authenticated' | 'unauthenticated' | 'loading';
