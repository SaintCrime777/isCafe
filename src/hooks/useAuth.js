// src/hooks/useAuth.js
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export function useAuth() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 取得當前 session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // 監聽登入狀態變化
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  // Google 登入
  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin, // 登入後回到首頁
      },
    })
    if (error) {
      console.error('登入失敗:', error)
      alert('登入失敗，請稍後再試')
    }
  }

  // 登出
  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('登出失敗:', error)
    }
  }

  return {
    user,
    loading,
    signInWithGoogle,
    signOut,
  }
}