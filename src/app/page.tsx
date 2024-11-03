"use client"

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface Content {
  id: string
  title: string
  content: string
  type: string
  created_at: string
}

export default function HomePage() {
  const [contents, setContents] = useState<Content[]>([])

  useEffect(() => {
    const fetchContents = async () => {
      const res = await fetch('/api/content')
      const data = await res.json()
      setContents(data)
    }
    fetchContents()
  }, [])

  return (
    <div className="home-container">
      {/* قسم الهيرو */}
      <section className="hero-section">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="hero-content"
        >
          <h1 className="hero-title">مدرسة الجاوة</h1>
          <p className="hero-subtitle">نحو تعليم متميز يواكب العصر</p>
          <div className="hero-buttons">
            <a href="#features" className="btn btn-primary">تعرف علينا</a>
            <a href="#news" className="btn btn-outline">آخر الأخبار</a>
          </div>
        </motion.div>
      </section>

      {/* قسم المميزات */}
      <section id="features" className="features-section">
        <h2 className="section-title">ما يميزنا</h2>
        <div className="features-grid">
          <motion.div 
            className="feature-card"
            whileHover={{ y: -5 }}
          >
            <div className="feature-icon">👨‍🏫</div>
            <h3>كادر تعليمي متميز</h3>
            <p>نخبة من المعلمين والمعلمات ذوي الخبرة والكفاءة</p>
          </motion.div>
          <motion.div 
            className="feature-card"
            whileHover={{ y: -5 }}
          >
            <div className="feature-icon">📚</div>
            <h3>مناهج متطورة</h3>
            <p>مناهج دراسية حديثة تواكب متطلبات العصر</p>
          </motion.div>
          <motion.div 
            className="feature-card"
            whileHover={{ y: -5 }}
          >
            <div className="feature-icon">🎨</div>
            <h3>أنشطة متنوعة</h3>
            <p>برامج وأنشطة تعليمية وترفيهية متنوعة</p>
          </motion.div>
        </div>
      </section>

      {/* قسم الإحصائيات */}
      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-item">
            <h4>500+</h4>
            <p>طالب وطالبة</p>
          </div>
          <div className="stat-item">
            <h4>50+</h4>
            <p>معلم ومعلمة</p>
          </div>
          <div className="stat-item">
            <h4>20+</h4>
            <p>سنة خبرة</p>
          </div>
        </div>
      </section>

      {/* قسم الأخبار والإعلانات */}
      <section id="news" className="news-section">
        <h2 className="section-title">آخر الأخبار والإعلانات</h2>
        <div className="news-grid">
          {contents.map((content) => (
            <motion.article 
              key={content.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="news-card"
            >
              <div className="news-type">{content.type}</div>
              <h3>{content.title}</h3>
              <p>{content.content}</p>
              <time>
                {new Date(content.created_at).toLocaleDateString('ar-SA')}
              </time>
            </motion.article>
          ))}
        </div>
      </section>
    </div>
  )
}
