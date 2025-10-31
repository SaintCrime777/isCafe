import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { supabase } from '@/lib/supabase';
import { formatTaipeiTime } from '@/utils/dateUtils';

export default function OrderDetailDialog({ orderNumber, isOpen, onClose }) {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen && orderNumber) {
      fetchOrderDetail();
    }
  }, [isOpen, orderNumber]);

  const fetchOrderDetail = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (*)
        `)
        .eq('order_number', orderNumber)
        .single();

      if (error) throw error;
      
      
      setOrder(data);
    } catch (error) {
      console.error('❌ 查詢訂單失敗:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>載入中</DialogTitle>
          </DialogHeader>
          <p className="text-center py-8">載入中...</p>
        </DialogContent>
      </Dialog>
    );
  }

  if (!order) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>錯誤</DialogTitle>
          </DialogHeader>
          <p className="text-center py-8 text-red-500">找不到訂單</p>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>訂單詳情</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* 訂單資訊 */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">訂單編號</span>
              <span className="font-mono font-bold">#{order.order_number}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">訂單時間</span>
              <span>{formatTaipeiTime(order.created_at)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">訂單類型</span>
              <span>{order.order_type === 'dine-in' ? '內用' : '外帶'}</span>
            </div>
            {order.table_number && (
              <div className="flex justify-between">
                <span className="text-gray-600">桌號</span>
                <span>{order.table_number}</span>
              </div>
            )}
            {order.payment_method && (
              <div className="flex justify-between">
                <span className="text-gray-600">付款方式</span>
                <span>{order.payment_method === 'cash' ? '現金' : '信用卡'}</span>
              </div>
            )}
          </div>

          {/* 商品列表 */}
          <div>
            <h4 className="font-semibold mb-3">訂單內容</h4>
            <div className="space-y-2">
              {order.order_items && order.order_items.map((item) => (
                <div key={item.id} className="flex justify-between items-center py-2 border-b">
                  <div className="flex-1">
                    <p className="font-medium">{item.product_name}</p>
                    <p className="text-sm text-gray-500">NT$ {item.unit_price} x {item.quantity}</p>
                  </div>
                  <p className="font-bold">NT$ {item.subtotal}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 總計 */}
          <div className="flex justify-between items-center pt-4 border-t-2">
            <span className="text-lg font-bold">總計</span>
            <span className="text-2xl font-bold text-primary">NT$ {order.total_price}</span>
          </div>

          {/* 備註 */}
          {order.notes && (
            <div className="bg-yellow-50 rounded-lg p-3">
              <p className="text-sm text-gray-600">備註</p>
              <p className="text-sm">{order.notes}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}