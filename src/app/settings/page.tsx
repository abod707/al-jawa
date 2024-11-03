"use client"

export default function SettingsPage() {
  return (
    <div>
      <h1>إعدادات الموقع</h1>
      <form className="settings-form">
        <div className="form-group">
          <label>اسم الموقع</label>
          <input type="text" defaultValue="موقعي" />
        </div>
        <div className="form-group">
          <label>وصف الموقع</label>
          <textarea defaultValue="وصف الموقع الافتراضي" />
        </div>
        <div className="form-group">
          <label>البريد الإلكتروني للإدارة</label>
          <input type="email" defaultValue="admin@example.com" />
        </div>
        <button type="submit">حفظ الإعدادات</button>
      </form>
    </div>
  );
} 