// src/stores/useCartStore.js
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useCartStore = create(
  persist(
    (set, get) => ({
      // 狀態
      items: [], // [{ id, name, price, quantity, image_url, description }]
      
      // 加入商品
      addItem: (product) => {
        const items = get().items
        const existingItem = items.find(item => item.id === product.id)
        
        if (existingItem) {
          // 已存在，數量 +1
          set({
            items: items.map(item =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          })
        } else {
          // 新商品，數量設為 1
          set({ 
            items: [...items, { ...product, quantity: 1 }] 
          })
        }
      },
      
      // 移除商品
      removeItem: (id) => {
        set({ 
          items: get().items.filter(item => item.id !== id) 
        })
      },
      
      // 更新數量
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id)
          return
        }
        
        set({
          items: get().items.map(item =>
            item.id === id ? { ...item, quantity } : item
          )
        })
      },
      
      // 清空購物車
      clearCart: () => set({ items: [] }),
      
      // 計算總價
      getTotal: () => {
        return get().items.reduce(
          (total, item) => total + (item.price * item.quantity),
          0
        )
      },
      
      // 計算總數量
      getTotalItems: () => {
        return get().items.reduce(
          (total, item) => total + item.quantity,
          0
        )
      }
    }),
    {
      name: 'coffee-cart-storage', // localStorage 的 key
    }
  )
)