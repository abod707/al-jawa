"use client"

import { motion } from 'framer-motion'

export default function AboutPage() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  return (
    <div className="about-page">
      <motion.div 
        className="about-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h1>عن مدرسة الجاوة</h1>
        <p>نحو تعليم متميز يواكب العصر</p>
      </motion.div>

      <div className="about-content">
        <motion.section 
          className="vision-mission"
          {...fadeIn}
        >
          <div className="vision">
            <h2>رؤيتنا</h2>
            <p>
              نسعى لأن نكون نموذجاً رائداً في التعليم المتكامل الذي يجمع بين
              أصالة القيم وحداثة التعليم، مع الحفاظ على هويتنا الإسلامية.
            </p>
          </div>
          <div className="mission">
            <h2>رسالتنا</h2>
            <p>
              توفير بيئة تعليمية محفزة تساعد الطلاب على الإبداع والابتكار،
              وتنمية مهاراتهم وقدراتهم ليكونوا قادة المستقبل.
            </p>
          </div>
        </motion.section>

        <motion.section 
          className="values"
          {...fadeIn}
          transition={{ delay: 0.2 }}
        >
          <h2>قيمنا</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">🎯</div>
              <h3>التميز</h3>
              <p>نسعى دائماً للتميز في كل ما نقدمه</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h3>التعاون</h3>
              <p>نؤمن بأهمية العمل الجماعي</p>
            </div>
            <div className="value-card">
              <div className="value-icon">💡</div>
              <h3>الإبداع</h3>
              <p>نشجع الابتكار والتفكير الإبداعي</p>
            </div>
            <div className="value-card">
              <div className="value-icon">⚖️</div>
              <h3>المسؤولية</h3>
              <p>نغرس قيم المسؤولية في طلابنا</p>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  )
} 