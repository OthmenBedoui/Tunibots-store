import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem } from '../data/types';
import { useAuth } from './AuthContext';
import { toast } from 'sonner';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'qty'> & { qty?: number }) => void;
  removeFromCart: (productId: string) => void;
  updateQty: (productId: string, qty: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  rawTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('tunibots_cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('tunibots_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item: Omit<CartItem, 'qty'> & { qty?: number }) => {
    const qtyToAdd = item.qty ?? 1;
    setCartItems(prev => {
      const existing = prev.find(i => i.productId === item.productId);
      if (existing) {
        toast.success(`Quantité mise à jour : ${existing.title} (${existing.qty + qtyToAdd})`);
        return prev.map(i =>
          i.productId === item.productId
            ? { ...i, qty: i.qty + qtyToAdd }
            : i
        );
      }
      toast.success(`${item.title} ajouté au panier !`);
      return [...prev, { ...item, qty: qtyToAdd }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.productId === productId);
      if (existing) {
        toast.info(`${existing.title} retiré du panier.`);
      }
      return prev.filter(i => i.productId !== productId);
    });
  };

  const updateQty = (productId: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(i => (i.productId === productId ? { ...i, qty } : i))
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const { isVIP } = useAuth();

  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const rawTotal = cartItems.reduce((acc, item) => acc + item.unitPrice * item.qty, 0);
  const cartTotal = isVIP ? rawTotal * 0.85 : rawTotal;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        cartCount,
        cartTotal,
        rawTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
