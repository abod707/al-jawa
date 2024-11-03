"use client"

import { motion } from 'framer-motion'

export default function ContactPage() {
  const contactMethods = [
    {
      title: "تواصل عبر الواتساب",
      icon: "💬",
      description: "للتواصل المباشر والسريع",
      action: "https://wa.me/966558286069",
      color: "bg-emerald-900",
      hoverColor: "hover:bg-emerald-700",
      borderColor: "border-emerald-500"
    },
    {
      title: "اتصل بنا",
      icon: "📞",
      description: "متاح خلال ساعات الدوام",
      action: "tel:+966110000000",
      color: "bg-blue-600",
      hoverColor: "hover:bg-blue-700",
      borderColor: "border-blue-500"
    },
    {
      title: "راسلنا",
      icon: "✉️",
      description: "عبر البريد الإلكتروني",
      action: "mailto:info@school.edu.sa",
      color: "bg-violet-600",
      hoverColor: "hover:bg-violet-700",
      borderColor: "border-violet-500"
    }
  ]

  const handleContact = (action: string) => {
    window.open(action, '_blank')
  }

  return (
    <div className="about-page">
      <motion.div 
        className="about-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h1>تواصل معنا</h1>
        <p>نسعد بتواصلكم معنا في أي وقت</p>
      </motion.div>

      <div className="about-content">
        <motion.section 
          className="values"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="values-grid">
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="value-card group"
              >
                <div className="value-icon text-5xl mb-10">
                  {method.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{method.title}</h3>
                <p className="text-gray-600 mb-8">{method.description}</p>
                <button
                  onClick={() => handleContact(method.action)}
                  className="btn btn-primary w-full"
                >
                  {method.title}
                </button>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section 
          className="vision-mission"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="vision hover:shadow-lg transition-all duration-300">
            <h2 className="text-2xl font-bold mb-4">ساعات العمل</h2>
            <div className="space-y-3">
              <p className="flex items-center gap-3 text-lg">
                <span className="text-2xl">📅</span>
                <span className="font-medium">الأحد - الخميس</span>
              </p>
              <p className="flex items-center gap-3 text-lg">
                <span className="text-2xl">⏰</span>
                <span className="font-medium">7:00 صباحاً - 2:00 مساءً</span>
              </p>
            </div>
          </div>
          <div className="mission hover:shadow-lg transition-all duration-300">
            <h2 className="text-2xl font-bold mb-4">موقعنا</h2>
            <div className="space-y-3">
              <p className="flex items-center gap-3 text-lg">
                <span className="text-2xl">🏫</span>
                <span className="font-medium">مدرسة الجاوة</span>
              </p>
              <p className="flex items-center gap-3 text-lg">
                <span className="text-2xl">📍</span>
                <span className="font-medium">الرياض، المملكة العربية السعودية</span>
              </p>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  )
} 