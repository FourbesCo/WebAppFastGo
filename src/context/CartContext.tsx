
import { CartItem } from "@/types";
import { addToCart, clearCart, getCart, updateCartItem } from "@/lib/api";
import { createContext, useContext, useEffect, useState } from "react";

interface CartContextType {
  items: CartItem[];
  isLoading: boolean;
  addItem: (
    menuItemId: string,
    quantity?: number,
    options?: { optionId: string; choiceIds: string[] }[],
    specialInstructions?: string
  ) => Promise<void>;
  updateItem: (cartItem: Partial<CartItem>) => Promise<void>;
  clearCart: () => Promise<void>;
  totalItems: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const cartItems = await getCart();
        setItems(cartItems);
      } catch (error) {
        console.error("Failed to load cart:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCart();
  }, []);

  const handleAddItem = async (
    menuItemId: string,
    quantity = 1,
    options?: { optionId: string; choiceIds: string[] }[],
    specialInstructions?: string
  ) => {
    try {
      const updatedCart = await addToCart(
        menuItemId,
        quantity,
        options,
        specialInstructions
      );
      setItems(updatedCart);
    } catch (error) {
      console.error("Failed to add item to cart:", error);
      throw error;
    }
  };

  const handleUpdateItem = async (cartItem: Partial<CartItem>) => {
    try {
      const updatedCart = await updateCartItem(cartItem);
      setItems(updatedCart);
    } catch (error) {
      console.error("Failed to update cart item:", error);
      throw error;
    }
  };

  const handleClearCart = async () => {
    try {
      await clearCart();
      setItems([]);
    } catch (error) {
      console.error("Failed to clear cart:", error);
      throw error;
    }
  };

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  
  const subtotal = items.reduce(
    (total, item) => total + item.totalPrice,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        isLoading,
        addItem: handleAddItem,
        updateItem: handleUpdateItem,
        clearCart: handleClearCart,
        totalItems,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
