import { Restaurant, MenuItem, Category, User, CartItem, Order } from "@/types";

// Mock data for restaurants
export const restaurants: Restaurant[] = [
  {
    id: "1",
    ownerId: "owner1",
    name: "Burger Palace",
    description: "Delicious gourmet burgers made with premium ingredients.",
    address: "123 Main St, Cidade Alta, SP",
    phone: "(11) 98765-4321",
    email: "contact@burgerpalace.com",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1899&q=80",
    categories: ["Hambúrguer", "Fast Food", "Americana"],
    openingHours: [
      { days: "Segunda - Sexta", hours: "11:00 - 22:00" },
      { days: "Sábado - Domingo", hours: "11:00 - 23:00" }
    ],
    location: {
      latitude: -23.5505,
      longitude: -46.6333
    },
    rating: 4.8,
    deliveryTime: "30-45 min",
    menu: [
      {
        id: "item1",
        name: "Classic Burger",
        description: "Beef patty, lettuce, tomato, cheese, and special sauce",
        price: 28.90,
        image: "https://images.unsplash.com/photo-1551782450-17144efb9c50?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80",
        categoryId: "cat1",
        restaurantId: "1",
        popular: true,
        vegetarian: false
      },
      {
        id: "item2",
        name: "Chicken Burger",
        description: "Grilled chicken breast, avocado, bacon and honey mustard",
        price: 32.90,
        image: "https://images.unsplash.com/photo-1585039261108-7e15c2c21e38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
        categoryId: "cat1",
        restaurantId: "1"
      }
    ]
  },
  {
    id: "2",
    ownerId: "owner2",
    name: "Pizza Express",
    description: "Authentic Italian pizzas baked in wood-fired ovens.",
    address: "456 Oak St, Jardins, SP",
    phone: "(11) 99876-5432",
    email: "info@pizzaexpress.com",
    image: "https://images.unsplash.com/photo-1579751626657-72bc17010498?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80",
    categories: ["Pizza", "Italiana", "Vegetariana"],
    openingHours: [
      { days: "Segunda - Domingo", hours: "17:00 - 23:00" }
    ],
    location: {
      latitude: -23.5658,
      longitude: -46.6400
    },
    rating: 4.6,
    deliveryTime: "40-55 min",
    menu: [
      {
        id: "item3",
        name: "Margherita",
        description: "Tomato sauce, mozzarella, fresh basil",
        price: 45.90,
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80",
        categoryId: "cat2",
        restaurantId: "2",
        vegetarian: true,
        popular: true
      },
      {
        id: "item4",
        name: "Pepperoni",
        description: "Tomato sauce, mozzarella, pepperoni",
        price: 49.90,
        image: "https://images.unsplash.com/photo-1588315029754-2dd089d39a1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1771&q=80",
        categoryId: "cat2",
        restaurantId: "2",
        popular: true
      }
    ]
  },
  {
    id: "3",
    ownerId: "owner3",
    name: "Sushi Japan",
    description: "Premium sushi and Japanese cuisine prepared by master chefs.",
    address: "789 Pine St, Liberdade, SP",
    phone: "(11) 91234-5678",
    email: "hello@sushijapan.com",
    image: "https://images.unsplash.com/photo-1611143669185-af224c5e3252?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80",
    categories: ["Japonesa", "Sushi", "Asiática"],
    openingHours: [
      { days: "Segunda - Domingo", hours: "11:30 - 15:00, 18:00 - 22:30" }
    ],
    location: {
      latitude: -23.5750,
      longitude: -46.6350
    },
    rating: 4.9,
    deliveryTime: "45-60 min",
    menu: [
      {
        id: "item5",
        name: "Sashimi Mix",
        description: "Selection of fresh salmon, tuna and white fish sashimi",
        price: 69.90,
        image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
        categoryId: "cat3",
        restaurantId: "3",
        popular: true
      },
      {
        id: "item6",
        name: "California Roll",
        description: "Crab, avocado, cucumber, tobiko",
        price: 42.90,
        image: "https://images.unsplash.com/photo-1617196034183-421b4917c92d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
        categoryId: "cat3",
        restaurantId: "3"
      }
    ]
  }
];

// Mock data for categories
export const categories: Category[] = [
  {
    id: "cat1",
    name: "Burgers",
    description: "Delicious handcrafted burgers",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1965&q=80",
    restaurantId: "1"
  },
  {
    id: "cat2",
    name: "Pizzas",
    description: "Authentic Italian pizzas",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    restaurantId: "2"
  },
  {
    id: "cat3",
    name: "Sushi",
    description: "Fresh and delicious sushi",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    restaurantId: "3"
  },
  {
    id: "cat4",
    name: "Sides",
    description: "Perfect accompaniments",
    image: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    restaurantId: "1"
  },
  {
    id: "cat5",
    name: "Desserts",
    description: "Sweet treats",
    image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1864&q=80",
    restaurantId: "2"
  }
];

// Updated API Functions to work with multiple restaurants
export const getRestaurants = async (latitude?: number, longitude?: number): Promise<Restaurant[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (latitude !== undefined && longitude !== undefined) {
        const restaurantsWithDistance = restaurants.map(restaurant => {
          const distance = calculateDistance(
            latitude,
            longitude,
            restaurant.location.latitude,
            restaurant.location.longitude
          );
          return { ...restaurant, distance };
        });
        
        const sorted = [...restaurantsWithDistance].sort((a, b) => 
          (a.distance || Infinity) - (b.distance || Infinity)
        );
        
        resolve(sorted);
      } else {
        resolve(restaurants);
      }
    }, 500);
  });
};

export const getRestaurant = async (id: string): Promise<Restaurant> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const restaurant = restaurants.find(r => r.id === id);
      
      if (restaurant) {
        resolve(restaurant);
      } else {
        reject(new Error("Restaurant not found"));
      }
    }, 500);
  });
};

export const getCategories = async (restaurantId?: string): Promise<Category[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (restaurantId) {
        const filteredCategories = categories.filter(cat => cat.restaurantId === restaurantId);
        resolve(filteredCategories);
      } else {
        resolve(categories);
      }
    }, 500);
  });
};

export const getRestaurantCategories = async (restaurantId: string): Promise<Category[]> => {
  return getCategories(restaurantId);
};

export const getMenuItems = async (categoryId?: string): Promise<MenuItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const allMenuItems: MenuItem[] = restaurants.flatMap(restaurant => restaurant.menu || []);
      
      if (categoryId) {
        const filteredItems = allMenuItems.filter(item => item.categoryId === categoryId);
        resolve(filteredItems);
      } else {
        resolve(allMenuItems);
      }
    }, 500);
  });
};

export const getRestaurantMenuItems = async (restaurantId: string, categoryId?: string): Promise<MenuItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const restaurant = restaurants.find(r => r.id === restaurantId);
      
      if (!restaurant || !restaurant.menu) {
        resolve([]);
        return;
      }
      
      if (categoryId) {
        const filteredItems = restaurant.menu.filter(item => item.categoryId === categoryId);
        resolve(filteredItems);
      } else {
        resolve(restaurant.menu);
      }
    }, 500);
  });
};

// Mock cart state
let cart: CartItem[] = [];

export const addToCart = async (
  menuItemId: string,
  quantity: number = 1,
  selectedOptions?: { optionId: string; choiceIds: string[] }[],
  specialInstructions?: string
): Promise<CartItem[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let foundMenuItem: MenuItem | undefined;
      
      for (const restaurant of restaurants) {
        if (restaurant.menu) {
          const menuItem = restaurant.menu.find(item => item.id === menuItemId);
          if (menuItem) {
            foundMenuItem = menuItem;
            break;
          }
        }
      }
      
      if (!foundMenuItem) {
        reject(new Error("Menu item not found"));
        return;
      }
      
      let totalPrice = foundMenuItem.price * quantity;
      
      if (selectedOptions && foundMenuItem.options) {
        for (const selected of selectedOptions) {
          const option = foundMenuItem.options.find(opt => opt.id === selected.optionId);
          if (option) {
            for (const choiceId of selected.choiceIds) {
              const choice = option.choices.find(c => c.id === choiceId);
              if (choice && choice.price) {
                totalPrice += choice.price * quantity;
              }
            }
          }
        }
      }
      
      const cartItem: CartItem = {
        menuItem: foundMenuItem,
        quantity,
        selectedOptions,
        specialInstructions,
        totalPrice
      };
      
      cart.push(cartItem);
      
      resolve([...cart]);
    }, 500);
  });
};

export const getCart = async (): Promise<CartItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...cart]);
    }, 300);
  });
};

export const clearCart = async (): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      cart = [];
      resolve();
    }, 300);
  });
};

// Mock orders
let orders: Order[] = [];

export const createOrder = async (
  paymentMethod: string,
  specialInstructions?: string
): Promise<Order> => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        if (cart.length === 0) {
          reject(new Error("Cart is empty"));
          return;
        }
        
        const userStr = localStorage.getItem("currentUser");
        if (!userStr) {
          reject(new Error("User not logged in"));
          return;
        }
        
        const user = JSON.parse(userStr);
        
        const totalAmount = cart.reduce((sum, item) => sum + item.totalPrice, 0);
        
        const restaurantId = cart[0].menuItem.restaurantId;
        
        const order: Order = {
          id: `order-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
          userId: user.id,
          restaurantId,
          items: [...cart],
          status: 'pending',
          createdAt: new Date().toISOString(),
          estimatedPickupTime: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
          paymentMethod,
          totalAmount,
          specialInstructions
        };
        
        orders.push(order);
        resolve(order);
      } catch (error) {
        reject(error);
      }
    }, 1000);
  });
};

export const getOrders = async (userId: string): Promise<Order[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const userOrders = orders.filter(order => order.userId === userId);
      resolve(userOrders);
    }, 500);
  });
};

export const getAllOrders = async (): Promise<Order[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...orders]);
    }, 500);
  });
};

export const getRestaurantOrders = async (restaurantId: string): Promise<Order[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const restaurantOrders = orders.filter(order => order.restaurantId === restaurantId);
      resolve(restaurantOrders);
    }, 500);
  });
};

export const getUser = async (id: string): Promise<User | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockUser: User = {
        id: "user1",
        name: "John Doe",
        email: "john.doe@example.com",
        role: "user",
      };
      resolve(mockUser);
    }, 500);
  });
};

// Functions for AuthContext - CONSOLIDATED
export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const userStr = localStorage.getItem("currentUser");
      if (userStr) {
        resolve(JSON.parse(userStr));
      } else {
        resolve(null);
      }
    }, 300);
  });
};

// Consolidated register function with complete implementation
export const register = async (userData: { 
  name: string;
  email: string;
  password: string;
  role?: "user" | "restaurant_owner"
}): Promise<User> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const { password, ...userWithoutPassword } = userData;
      
      const newUser: User = {
        id: `user-${Date.now()}`,
        ...userWithoutPassword
      };
      
      localStorage.setItem("currentUser", JSON.stringify(newUser));
      
      resolve(newUser);
    }, 1000);
  });
};

// Consolidated login function with complete implementation
export const login = async (
  email: string,
  password: string
): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === "demo@example.com" && password === "password") {
        const mockUser: User = {
          id: "user1",
          name: "John Doe",
          email: "demo@example.com",
          role: "user",
        };
        localStorage.setItem("currentUser", JSON.stringify(mockUser));
        resolve(mockUser);
      } else if (email === "admin@fastgo.com" && password === "admin123") {
        const mockUser: User = {
          id: "admin1",
          name: "Admin User",
          email: "admin@fastgo.com",
          role: "admin",
        };
        localStorage.setItem("currentUser", JSON.stringify(mockUser));
        resolve(mockUser);
      } else if (
        email === "restaurant@fastgo.com" &&
        password === "restaurant"
      ) {
        const mockUser: User = {
          id: "owner1",
          name: "Restaurant Owner",
          email: "restaurant@fastgo.com",
          role: "restaurant_owner",
        };
        localStorage.setItem("currentUser", JSON.stringify(mockUser));
        resolve(mockUser);
      } else {
        reject(new Error("Invalid credentials"));
      }
    }, 1000);
  });
};

export const logout = async (): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      localStorage.removeItem("currentUser");
      resolve();
    }, 300);
  });
};

export const updateProfile = async (updates: Partial<User>): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const userStr = localStorage.getItem("currentUser");
      if (!userStr) {
        reject(new Error("User not logged in"));
        return;
      }
      
      const user = JSON.parse(userStr);
      
      const updatedUser = {
        ...user,
        ...updates
      };
      
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
      
      resolve(updatedUser);
    }, 500);
  });
};

// Admin and Restaurant Owner API Functions
export const updateOrderStatus = async (orderId: string, status: Order["status"]): Promise<Order> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const orderIndex = orders.findIndex(order => order.id === orderId);
      
      if (orderIndex === -1) {
        reject(new Error("Order not found"));
        return;
      }
      
      orders[orderIndex] = {
        ...orders[orderIndex],
        status
      };
      
      resolve(orders[orderIndex]);
    }, 500);
  });
};

export const addMenuItem = async (menuItem: Omit<MenuItem, "id">): Promise<MenuItem> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const restaurant = restaurants.find(r => r.id === menuItem.restaurantId);
      
      if (!restaurant) {
        reject(new Error("Restaurant not found"));
        return;
      }
      
      const newMenuItem: MenuItem = {
        ...menuItem,
        id: `item-${Date.now()}-${Math.floor(Math.random() * 1000)}`
      };
      
      if (!restaurant.menu) {
        restaurant.menu = [];
      }
      
      restaurant.menu.push(newMenuItem);
      resolve(newMenuItem);
    }, 500);
  });
};

export const updateMenuItem = async (id: string, updates: Partial<MenuItem>): Promise<MenuItem> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let foundMenuItem: MenuItem | undefined;
      let restaurantIndex: number = -1;
      let menuItemIndex: number = -1;
      
      for (let i = 0; i < restaurants.length; i++) {
        if (restaurants[i].menu) {
          const idx = restaurants[i].menu.findIndex(item => item.id === id);
          if (idx !== -1) {
            restaurantIndex = i;
            menuItemIndex = idx;
            foundMenuItem = restaurants[i].menu[idx];
            break;
          }
        }
      }
      
      if (!foundMenuItem || restaurantIndex === -1 || menuItemIndex === -1) {
        reject(new Error("Menu item not found"));
        return;
      }
      
      const updatedMenuItem: MenuItem = {
        ...foundMenuItem,
        ...updates
      };
      
      restaurants[restaurantIndex].menu[menuItemIndex] = updatedMenuItem;
      
      resolve(updatedMenuItem);
    }, 500);
  });
};

export const deleteMenuItem = async (id: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let restaurantIndex: number = -1;
      
      for (let i = 0; i < restaurants.length; i++) {
        if (restaurants[i].menu) {
          const idx = restaurants[i].menu.findIndex(item => item.id === id);
          if (idx !== -1) {
            restaurantIndex = i;
            restaurants[i].menu.splice(idx, 1);
            break;
          }
        }
      }
      
      if (restaurantIndex === -1) {
        reject(new Error("Menu item not found"));
        return;
      }
      
      resolve();
    }, 500);
  });
};

// Functions for CartContext
export const updateCartItem = async (
  cartItem: Partial<CartItem>
): Promise<CartItem[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = cart.findIndex(item => 
        item.menuItem.id === cartItem.menuItem?.id
      );
      
      if (index === -1 && !cartItem.menuItem) {
        reject(new Error("Cart item not found"));
        return;
      }
      
      if (index !== -1) {
        if (cartItem.quantity === 0) {
          cart.splice(index, 1);
        } else {
          cart[index] = {
            ...cart[index],
            ...cartItem
          };
          
          if (cartItem.quantity) {
            cart[index].totalPrice = cart[index].menuItem.price * cartItem.quantity;
          }
        }
      } else if (cartItem.menuItem && cartItem.quantity) {
        cart.push({
          menuItem: cartItem.menuItem,
          quantity: cartItem.quantity,
          selectedOptions: cartItem.selectedOptions || [],
          specialInstructions: cartItem.specialInstructions,
          totalPrice: cartItem.menuItem.price * cartItem.quantity
        });
      }
      
      resolve([...cart]);
    }, 300);
  });
};

// Functions for RestaurantDashboard
export const getMyRestaurants = async (ownerId: string): Promise<Restaurant[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const ownerRestaurants = restaurants.filter(r => r.ownerId === ownerId);
      resolve(ownerRestaurants);
    }, 500);
  });
};

// Utility functions
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const d = R * c;
  return d;
}

function deg2rad(deg: number): number {
  return deg * (Math.PI/180);
}
