// src/stores/useCartStore.js
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { supabase } from '@/lib/supabase'

export const useCartStore = create(
  persist(
    (set, get) => ({
      // 狀態
      items: [],
      
      // 加入商品
      addItem: (product) => {
        const items = get().items
        const existingItem = items.find(item => item.id === product.id)
        
        if (existingItem) {
          set({
            items: items.map(item =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          })
        } else {
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
      },

      // ✅ 建立訂單（修正版）
      createOrder: async (orderData) => {
        try {
          console.log('🚀 createOrder 被呼叫了！');
          
          const items = get().items;
          const total = get().getTotal();

          console.log('📦 orderData:', orderData);
          console.log('🛒 購物車內容:', items);
          console.log('💰 總金額:', total);

          // 1️⃣ 檢查是否有商品
          if (items.length === 0) {
            throw new Error('購物車是空的');
          }

          // 2️⃣ 檢查用戶是否登入
          const { data: { user } } = await supabase.auth.getUser();
          if (!user) {
            throw new Error('請先登入');
          }

          console.log('👤 用戶資料:', user);

          // 3️⃣ 生成訂單編號
          const orderNumber = `${Date.now()}`;

          // 4️⃣ 建立訂單主資料（完全符合資料庫結構）
          const { data: order, error: orderError } = await supabase
            .from('orders')
            .insert({
              order_number: orderNumber,
              user_id: user.id,
              customer_name: orderData.customerName,
              phone: orderData.phone || null,
              order_type: orderData.orderType,
              table_number: orderData.tableNumber || null,
              address: orderData.address || null,
              payment_method:orderData.paymentMethod || null,
              notes: orderData.notes || null,
              total_price: Math.round(total),  // ✅ 確保是整數
              status: 'pending'
              // created_at 和 updated_at 會自動生成
            })
            .select()
            .single();

          if (orderError) {
            console.error('❌ 訂單建立失敗:', orderError);
            throw orderError;
          }

          console.log('✅ 訂單建立成功:', order);

          // 5️⃣ 建立訂單項目
          const orderItems = items.map(item => ({
            order_id: order.id,
            product_id: item.id,
            product_name: item.name,
            quantity: item.quantity,
            unit_price: item.price,
            subtotal: item.price * item.quantity
          }));

          const { error: itemsError } = await supabase
            .from('order_items')
            .insert(orderItems);

          if (itemsError) {
            console.error('❌ 訂單項目建立失敗:', itemsError);
            throw itemsError;
          }

          console.log('✅ 訂單項目建立成功');

          // 6️⃣ 清空購物車
          get().clearCart();

          return { 
            success: true, 
            order,
            orderNumber 
          };

        } catch (error) {
          console.error('❌ 建立訂單失敗:', error);
          return { 
            success: false, 
            error: error.message 
          };
        }
      }
    }),
    {
      name: 'coffee-cart-storage',
    }
  )
)