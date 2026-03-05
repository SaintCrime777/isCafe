import { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Search, X } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useCartStore } from "@/stores/useCartStore";
import { toast } from "sonner";

export default function SearchDrawer() {
  const addItem = useCartStore((s) => s.addItem);

  const [isOpen, setIsOpen] = useState(false);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const keyword = q.trim();

  // Drawer 打開時才查；輸入停 300ms 查一次（最省事的 debounce）
  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(async () => {
      if (!keyword) {
        setResults([]);
        return;
      }

      setLoading(true);

      // ✅ 最簡單的商城搜尋：同時找 名稱/描述/分類
      const orQuery = [
        `name.ilike.%${keyword}%`,
        `description.ilike.%${keyword}%`,
        `category.ilike.%${keyword}%`,
      ].join(",");

      const { data, error } = await supabase
        .from("products")
        .select("*")
        .or(orQuery)
        .order("created_at", { ascending: false })
        .limit(20);

      if (error) {
        console.error("❌ 搜尋失敗:", error);
        setResults([]);
      } else {
        setResults(data ?? []);
      }

      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [keyword, isOpen]);

  // 關閉 Drawer 時清理（讓下次打開是乾淨的）
  useEffect(() => {
    if (!isOpen) {
      setQ("");
      setResults([]);
      setLoading(false);
    }
  }, [isOpen]);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        {/* ✅ 這顆就是 Navbar 的放大鏡按鈕 */}
        <button
          className="relative w-14 h-14 flex items-center justify-center rounded-lg hover:bg-black/5 transition-colors"
          aria-label="搜尋"
        >
          <Search className="h-8 w-8" />
        </button>
      </SheetTrigger>

      {/* ✅ 寬度跟購物車一致 */}
      <SheetContent side="right" className="w-[400px] sm:w-[540px] flex flex-col">
        <SheetHeader>
          <SheetTitle className="text-xl">搜尋商品</SheetTitle>
        </SheetHeader>

        {/* 搜尋輸入 */}
        <div className="mt-4">
          <div className="flex items-center gap-2 bg-white border-2 border-gray-300 rounded-lg px-3 py-2">
            <Search className="h-5 w-5 text-gray-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="輸入關鍵字，例如：金烏、拿鐵、豆"
              className="flex-1 outline-none text-gray-700 placeholder:text-gray-400"
              autoFocus
            />
            {q && (
              <button
                onClick={() => setQ("")}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="清除"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>

        {/* 結果 */}
        <div className="flex-1 overflow-auto mt-4 space-y-3">
          {!keyword ? (
            <p className="text-gray-500">輸入關鍵字開始搜尋</p>
          ) : loading ? (
            <p className="text-gray-500">搜尋中…</p>
          ) : results.length === 0 ? (
            <p className="text-gray-500">找不到符合「{keyword}」的商品</p>
          ) : (
            results.map((p) => (
              <div key={p.id} className="flex gap-3 items-start border rounded-xl p-3 bg-white">
                <img
                  src={p.image_url}
                  alt={p.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <div className="font-bold">{p.name}</div>
                  <div className="text-sm text-gray-600 line-clamp-2">{p.description}</div>
                  <div className="mt-1 font-semibold">NT$ {p.price}</div>

                  <div className="mt-2 flex gap-2">
                    <button
                      onClick={() => {
                        addItem({
                          id: p.id,
                          name: p.name,
                          price: p.price,
                          image_url: p.image_url,
                          description: p.description || "",
                          quantity: 1,
                        });
                        toast.success(`已加入購物車!`, { id: "cart-toast",duration: 1000 });
                      }}
                      className="px-3 py-1 rounded-full bg-[#5A3211] text-white text-sm hover:opacity-90"
                    >
                      加入清單
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}