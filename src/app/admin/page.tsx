"use client"

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface Content {
  id: string
  title: string
  content: string
  type: string
  created_at: string
}

export default function AdminDashboard() {
  const { data: session } = useSession()
  const router = useRouter()
  const [contents, setContents] = useState<Content[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    if (!session?.user.is_admin) {
      router.push("/")
      return
    }

    const fetchContents = async () => {
      try {
        const res = await fetch("/api/admin/content")
        const data = await res.json()
        setContents(data)
      } catch (error) {
        console.error("Error fetching contents:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchContents()
  }, [session, router])

  const handleDelete = async (id: string) => {
    if (confirm("هل أنت متأكد من حذف هذا المحتوى؟")) {
      try {
        await fetch(`/api/admin/content/${id}`, {
          method: "DELETE"
        })
        setContents(contents.filter(c => c.id !== id))
      } catch (error) {
        console.error("Error deleting content:", error)
      }
    }
  }

  const filteredContents = contents.filter(content =>
    content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    content.type.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'news':
        return 'bg-blue-100 text-blue-800'
      case 'announcement':
        return 'bg-green-100 text-green-800'
      case 'article':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">جاري التحميل...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <div className="flex justify-between items-center flex-wrap">
          <div>
            <h1 className="text-xl font-bold text-gray-900">لوحة التحكم</h1>
            <p className="text-sm text-gray-600 mt-1">إدارة محتوى الموقع</p>
          </div>
          <div className="flex items-center gap-2 mt-2 sm:mt-0">
            <div className="admin-search">
              <div className="relative">
                <input
                  type="text"
                  placeholder="بحث..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="admin-search-icon text-gray-400 absolute top-1/2 transform -translate-y-1/2" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <Link href="/admin/content/new" className="admin-add-button">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              <span>إضافة</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="admin-table">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-right">العنوان</th>
              <th className="text-right hide-on-mobile">النوع</th>
              <th className="text-right hide-on-mobile">التاريخ</th>
              <th className="text-right">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {filteredContents.map((content) => (
              <tr key={content.id}>
                <td className="content-cell">
                  <div className="content-title">{content.title}</div>
                  <div className="content-meta md:hidden">
                    {content.type} - {new Date(content.created_at).toLocaleDateString('ar-SA')}
                  </div>
                </td>
                <td className="hide-on-mobile">
                  <span className={`type-badge ${getTypeColor(content.type)}`}>
                    {content.type}
                  </span>
                </td>
                <td className="hide-on-mobile text-gray-500">
                  {new Date(content.created_at).toLocaleDateString('ar-SA')}
                </td>
                <td>
                  <div className="action-buttons">
                    <button
                      onClick={() => router.push(`/admin/content/${content.id}/edit`)}
                      className="edit-button"
                    >
                      تعديل
                    </button>
                    <button
                      onClick={() => handleDelete(content.id)}
                      className="delete-button"
                    >
                      حذف
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
} 