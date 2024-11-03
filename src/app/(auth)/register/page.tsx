"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import HCaptcha from '@hcaptcha/react-hcaptcha'

export default function RegisterPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)
  const captchaRef = useRef<HCaptcha>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!captchaToken) {
      setError("يرجى التحقق من أنك لست روبوتاً")
      return
    }

    setLoading(true)
    setError(null)
    
    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      captchaToken
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!res.ok) throw new Error(await res.text())

      const result = await res.json()
      setSuccess(result.message)
      
    } catch (error: any) {
      setError(error.message)
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
        <h1 className="auth-title">إنشاء حساب جديد</h1>
        <p className="auth-subtitle">انضم إلى مدرسة المستقبل</p>
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>الاسم الكامل</label>
            <Input
              type="text"
              name="name"
              placeholder="أدخل اسمك الكامل"
              className="form-control"
              required
            />
          </div>
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

          <div className="captcha-container">
            <HCaptcha
              sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY!}
              onVerify={(token) => {
                setCaptchaToken(token)
                setError('')
              }}
              ref={captchaRef}
              languageOverride="ar"
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

          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="success-message"
            >
              {success}
            </motion.div>
          )}

          <button 
            type="submit" 
            className="auth-button" 
            disabled={loading}
          >
            {loading ? "جاري إنشاء الحساب..." : "إنشاء حساب"}
          </button>

          <div className="auth-footer">
            <p>
              لديك حساب بالفعل؟{" "}
              <Link href="/login" className="auth-link">
                تسجيل الدخول
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
} 