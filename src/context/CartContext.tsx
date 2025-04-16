import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";
import { Property } from "@/lib/data";

interface CartItem {
  id: string;
  property: Property;
  checkIn: string;
  checkOut: string;
  guests: number;
  price: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error);
        localStorage.removeItem("cart");
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const addToCart = (item: CartItem) => {
    // Check if item with same ID and dates already exists
    const existingItemIndex = items.findIndex(
      (i) => i.id === item.id && i.checkIn === item.checkIn && i.checkOut === item.checkOut
    );

    if (existingItemIndex >= 0) {
      // If exists, replace it (update)
      const newItems = [...items];
      newItems[existingItemIndex] = item;
      setItems(newItems);
      toast.success("Booking updated in cart");
    } else {
      // Otherwise add new item
      setItems([...items, item]);
      toast.success("Added to cart");
    }
  };

  const removeFromCart = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
    toast.info("Removed from cart");
  };

  const clearCart = () => {
    setItems([]);
    toast.info("Cart cleared");
  };

  const getCartTotal = () => {
    return items.reduce((total, item) => total + item.price, 0);
  };

  const getCartCount = () => {
    return items.length;
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        clearCart,
        getCartTotal,
        getCartCount,
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
