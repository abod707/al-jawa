"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

interface Content {
  id: string
  title: string
  content: string
  type: string
}

export default function EditContent({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [content, setContent] = useState<Content | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await fetch(`/api/admin/content/${params.id}`)
        if (!res.ok) throw new Error('Content not found')
        const data = await res.json()
        setContent(data)
      } catch (error) {
        console.error('Error fetching content:', error)
        setError('لم يتم العثور على المحتوى')
      } finally {
        setLoading(false)
      }
    }

    fetchContent()
  }, [params.id])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSaving(true)
    setError('')

    const formData = new FormData(e.currentTarget)
    const data = {
      title: formData.get("title"),
      content: formData.get("content"),
      type: formData.get("type"),
    }

    try {
      const res = await fetch(`/api/admin/content/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!res.ok) throw new Error(await res.text())

      router.push("/admin")
      router.refresh()
    } catch (error) {
      setError('حدث خطأ أثناء تحديث المحتوى')
      console.error("Error:", error)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="text-center p-8">جاري التحميل...</div>
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4">
          {error}
        </div>
        <button
          onClick={() => router.back()}
          className="btn btn-outline"
        >
          العودة
        </button>
      </div>
    )
  }

  if (!content) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto p-6"
    >
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">تعديل المحتوى</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-group">
            <label className="block text-sm font-medium mb-2">العنوان</label>
            <input
              name="title"
              type="text"
              defaultValue={content.title}
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium mb-2">النوع</label>
            <select 
              name="type" 
              defaultValue={content.type}
              className="form-control"
              required
            >
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
              defaultValue={content.content}
              className="form-control"
              required
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={saving}
              className="btn btn-primary flex-1"
            >
              {saving ? "جاري الحفظ..." : "حفظ التغييرات"}
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