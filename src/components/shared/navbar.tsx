"use client"

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { useState } from 'react'

export function Navbar() {
  const { data: session } = useSession()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="navbar">
      <div className="container">
        <div className="nav-content">
          <div className="nav-brand">
            <Link href="/" className="logo">
              مدرسة الجاوة
            </Link>
          </div>

          <button 
            className="menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="القائمة"
          >
            <span className={`hamburger ${isMenuOpen ? 'active' : ''}`}></span>
          </button>

          <div className={`nav-menu ${isMenuOpen ? 'show' : ''}`}>
            <div className="nav-links">
              <Link href="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                الرئيسية
              </Link>
              <Link href="/about" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                عن المدرسة
              </Link>
              <Link href="/contact" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                تواصل معنا
              </Link>
            </div>

            <div className="nav-auth">
              {session ? (
                <>
                  <span className="user-name">
                    مرحباً، {session.user?.name}
                  </span>
                  {session.user.is_admin && (
                    <Link 
                      href="/admin" 
                      className="btn btn-outline"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      لوحة التحكم
                    </Link>
                  )}
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      setIsMenuOpen(false)
                      signOut({ callbackUrl: "/" })
                    }}
                  >
                    تسجيل الخروج
                  </button>
                </>
              ) : (
                <div className="auth-buttons">
                  <Link 
                    href="/login" 
                    className="btn btn-outline"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    تسجيل الدخول
                  </Link>
                  <Link 
                    href="/register" 
                    className="btn btn-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    إنشاء حساب
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
} 