'use client';

import { createContext, useContext, useEffect, useReducer, type ReactNode } from 'react';

export type CartItem = {
  sku: string;
  name: string;
  color: string;
  colorHex: string;
  ralCode?: string;
  pieceLengthM: number;
  qty: number;           // number of pieces
  pricePerM: number;     // EUR/m incl. VAT
};

type CartState = { items: CartItem[] };

type CartAction =
  | { type: 'ADD'; item: CartItem }
  | { type: 'REMOVE'; sku: string; color: string }
  | { type: 'UPDATE_QTY'; sku: string; color: string; qty: number }
  | { type: 'CLEAR' }
  | { type: 'HYDRATE'; items: CartItem[] };

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'HYDRATE':
      return { items: action.items };
    case 'ADD': {
      const key = action.item.sku + action.item.color + (action.item.ralCode ?? '');
      const exists = state.items.find((i) => i.sku + i.color + (i.ralCode ?? '') === key);
      if (exists) {
        return { items: state.items.map((i) => i.sku + i.color + (i.ralCode ?? '') === key ? { ...i, qty: i.qty + action.item.qty } : i) };
      }
      return { items: [...state.items, action.item] };
    }
    case 'REMOVE':
      return { items: state.items.filter((i) => !(i.sku === action.sku && i.color === action.color)) };
    case 'UPDATE_QTY':
      return { items: state.items.map((i) => i.sku === action.sku && i.color === action.color ? { ...i, qty: Math.max(1, action.qty) } : i) };
    case 'CLEAR':
      return { items: [] };
    default:
      return state;
  }
}

type CartContextValue = {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  shipping: number;
  total: number;
  addItem: (item: CartItem) => void;
  removeItem: (sku: string, color: string) => void;
  updateQty: (sku: string, color: string, qty: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = 'vp-cart';

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [] });

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) dispatch({ type: 'HYDRATE', items: JSON.parse(raw) });
    } catch {}
  }, []);

  // Persist on every change
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items)); } catch {}
  }, [state.items]);

  const subtotal = state.items.reduce((s, i) => s + i.pricePerM * i.qty * i.pieceLengthM, 0);
  const shipping = subtotal >= 200 || subtotal === 0 ? 0 : 25;
  const total = subtotal + shipping;

  const value: CartContextValue = {
    items: state.items,
    totalItems: state.items.reduce((s, i) => s + i.qty, 0),
    subtotal,
    shipping,
    total,
    addItem: (item) => dispatch({ type: 'ADD', item }),
    removeItem: (sku, color) => dispatch({ type: 'REMOVE', sku, color }),
    updateQty: (sku, color, qty) => dispatch({ type: 'UPDATE_QTY', sku, color, qty }),
    clear: () => dispatch({ type: 'CLEAR' }),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
