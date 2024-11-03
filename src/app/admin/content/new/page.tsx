"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

export default function NewContent() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const formData = new FormData(e.currentTarget)
    const data = {
      title: formData.get("title"),
      content: formData.get("content"),
      type: formData.get("type"),
    }

    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        throw new Error(await res.text())
      }

      router.push("/admin")
      router.refresh()
    } catch (error) {
      setError('حدث خطأ أثناء إنشاء المحتوى')
      console.error("Error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto p-6"
    >
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">إضافة محتوى جديد</h1>
        
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-group">
            <label className="block text-sm font-medium mb-2">العنوان</label>
            <input
              name="title"
              type="text"
              className="form-control"
              placeholder="أدخل عنوان المحتوى"
              required
            />
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium mb-2">النوع</label>
            <select 
              name="type" 
              className="form-control"
              required
            >
              <option value="">اختر نوع المحتوى</option>
              <option value="news">خبر</option>
              <option value="announcement">إعلان</option>
              <option value="article">مقال</option>
            </select>
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium mb-2">المحتوى</label>
            <textarea
              name="content"
              rows={6}
              className="form-control"
              placeholder="اكتب المحتوى هنا"
              required
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary flex-1"
            >
              {loading ? "جاري الحفظ..." : "حفظ المحتوى"}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="btn btn-cancel"
            >
              إلغاء
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  )
} 