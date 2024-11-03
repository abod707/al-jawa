import React from 'react';
import styles from './AddContentForm.module.css';

export default function AddContentForm() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>إضافة محتوى جديد</h1>
      <form className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="title">العنوان</label>
          <input 
            type="text" 
            id="title" 
            className={styles.input}
            placeholder="أدخل العنوان هنا"
          />
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="type">النوع</label>
          <select id="type" className={styles.select}>
            <option value="">اختر النوع</option>
            <option value="news">خبر</option>
            <option value="article">مقال</option>
          </select>
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="content">المحتوى</label>
          <textarea 
            id="content" 
            className={styles.textarea}
            rows={6}
            placeholder="أدخل المحتوى هنا"
          />
        </div>
        
        <button type="submit" className={styles.button}>
          حفظ المحتوى
        </button>
      </form>
    </div>
  );
} 