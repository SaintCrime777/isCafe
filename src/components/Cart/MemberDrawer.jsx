import { useState, useEffect } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Package, Award } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { formatTaipeiTime } from '@/utils/dateUtils';
import OrderDetailDialog from './OrderDetailDialog';

export default function MemberDrawer({ children }) {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  // 當 drawer 打開時，載入訂單
  useEffect(() => {
    if (isOpen && user) {
      fetchOrders();
    }
  }, [isOpen, user]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error('❌ 載入訂單失敗:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          {children}
        </SheetTrigger>

        <SheetContent className="w-[400px] sm:w-[500px] overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2 text-xl">
              <User className="h-5 w-5" />
              會員中心
            </SheetTitle>
          </SheetHeader>

          <Tabs defaultValue="orders" className="mt-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="orders" className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                訂單紀錄
              </TabsTrigger>
              <TabsTrigger value="points" className="flex items-center gap-2">
                <Award className="h-4 w-4" />
                會員積分
              </TabsTrigger>
            </TabsList>

            {/* 訂單紀錄 Tab */}
            <TabsContent value="orders" className="space-y-4 mt-4">
              {loading ? (
                <div className="text-center py-8 text-gray-500">載入中...</div>
              ) : orders.length === 0 ? (
                <div className="text-center py-12">
                  <Package className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500">還沒有訂單紀錄</p>
                  <p className="text-sm text-gray-400 mt-2">快去點杯咖啡吧！</p>
                </div>
              ) : (
                orders.map((order) => (
                  <div
                    key={order.id}
                    onClick={() => setSelectedOrder(order.order_number)}
                    className="border rounded-lg p-4 hover:border-primary hover:shadow-md transition-all cursor-pointer bg-white"
                  >
                    {/* 訂單卡片頭部 */}
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="font-mono text-sm text-gray-500">
                          #{order.order_number}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {formatTaipeiTime(order.created_at)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-primary">
                          NT$ {order.total_price}
                        </p>
                        <span className="inline-block mt-1 px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">
                          {order.order_type === 'dine-in' ? '內用' : '外帶'}
                        </span>
                      </div>
                    </div>

                    {/* 桌號（如果有） */}
                    {order.table_number && (
                      <div className="text-sm text-gray-600">
                        桌號：{order.table_number}
                      </div>
                    )}

                    {/* 查看詳情提示 */}
                    <div className="mt-3 pt-3 border-t text-xs text-gray-400 text-right">
                      點擊查看詳情 →
                    </div>
                  </div>
                ))
              )}
            </TabsContent>

            {/* 會員積分 Tab */}
            <TabsContent value="points" className="mt-4">
              <div className="text-center py-12">
                <Award className="h-20 w-20 mx-auto text-gray-300 mb-4" />
                <p className="text-xl font-bold text-gray-700 mb-2">會員積分功能</p>
                <p className="text-gray-500">即將推出，敬請期待！</p>
                
                {/* 可選：顯示當前積分為 0 */}
                <div className="mt-8 p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg border-2 border-dashed border-amber-200">
                  <p className="text-sm text-gray-600 mb-2">目前積分</p>
                  <p className="text-4xl font-bold text-amber-600">0</p>
                  <p className="text-xs text-gray-500 mt-2">快去點餐賺取積分吧！</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </SheetContent>
      </Sheet>

      {/* 訂單詳情 Dialog */}
      {selectedOrder && (
        <OrderDetailDialog
          orderNumber={selectedOrder}
          isOpen={!!selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </>
  );
}