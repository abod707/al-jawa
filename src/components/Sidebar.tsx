import React from 'react';
import Link from 'next/link';
import styles from './Sidebar.module.css';

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <h2>لوحة التحكم</h2>
      </div>
      <nav className={styles.nav}>
        <ul>
          <li>
            <Link href="/dashboard">الرئيسية</Link>
          </li>
          <li>
            <Link href="/content">المحتوى</Link>
          </li>
          <li>
            <Link href="/content/add">إضافة محتوى</Link>
          </li>
          <li>
            <Link href="/users">المستخدمين</Link>
          </li>
          <li>
            <Link href="/settings">الإعدادات</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
} 