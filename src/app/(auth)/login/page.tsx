"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

export default function Login() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [error, setError] = useState<string | null>(
    searchParams.get("error") || null
  )
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    const formData = new FormData(e.currentTarget)

    try {
      const res = await signIn("credentials", {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        redirect: false,
      })

      if (res?.error) {
        setError(res.error)
      } else {
        router.push("/")
        router.refresh()
      }
    } catch (error: any) {
      setError("حدث خطأ في تسجيل الدخول")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="logo-container">
          <img src="/saudi-logo.png" alt="شعار المدرسة" className="auth-logo" />
        </div>
        <h1 className="auth-title">تسجيل الدخول</h1>
        <p className="auth-subtitle">مرحباً بك في مدرسة المستقبل</p>
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>البريد الإلكتروني</label>
            <Input
              type="email"
              name="email"
              placeholder="أدخل بريدك الإلكتروني"
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label>كلمة المرور</label>
            <Input
              type="password"
              name="password"
              placeholder="أدخل كلمة المرور"
              className="form-control"
              required
            />
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="error-message"
            >
              {error}
            </motion.div>
          )}

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
          </button>

          <div className="auth-footer">
            <p>
              ليس لديك حساب؟{" "}
              <Link href="/register" className="auth-link">
                إنشاء حساب جديد
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
} 