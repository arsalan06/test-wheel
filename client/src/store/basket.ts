import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface BasketItem {
  id: string;
  wheelId: string;
  name: string;
  image: string;
  selectedSize: string;
  selectedFinish: string;
  quantity: number;
  pricePerWheel: number;
}

interface BasketStore {
  items: BasketItem[];
  isOpen: boolean;
  sessionId: string;
  addItem: (item: Omit<BasketItem, "id">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearBasket: () => void;
  openBasket: () => void;
  closeBasket: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

export const useBasketStore = create<BasketStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      sessionId: crypto.randomUUID(),
      
      addItem: (newItem) => {
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            item => 
              item.wheelId === newItem.wheelId && 
              item.selectedSize === newItem.selectedSize &&
              item.selectedFinish === newItem.selectedFinish
          );
          
          if (existingItemIndex >= 0) {
            const updatedItems = [...state.items];
            updatedItems[existingItemIndex].quantity += newItem.quantity;
            return { items: updatedItems };
          } else {
            return {
              items: [...state.items, { ...newItem, id: crypto.randomUUID() }]
            };
          }
        });
      },
      
      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter(item => item.id !== id)
        }));
      },
      
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        
        set((state) => ({
          items: state.items.map(item =>
            item.id === id ? { ...item, quantity } : item
          )
        }));
      },
      
      clearBasket: () => {
        set({ items: [] });
      },
      
      openBasket: () => {
        set({ isOpen: true });
      },
      
      closeBasket: () => {
        set({ isOpen: false });
      },
      
      getTotalPrice: () => {
        return get().items.reduce((total, item) => 
          total + (item.pricePerWheel * item.quantity), 0
        );
      },
      
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
    }),
    {
      name: "basket-storage",
    }
  )
);
