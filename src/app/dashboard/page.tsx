"use client"

export default function DashboardPage() {
  return (
    <div>
      <h1>لوحة التحكم الرئيسية</h1>
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>عدد المقالات</h3>
          <p>150</p>
        </div>
        <div className="stat-card">
          <h3>عدد المستخدمين</h3>
          <p>1,240</p>
        </div>
        <div className="stat-card">
          <h3>الزيارات اليوم</h3>
          <p>3,500</p>
        </div>
      </div>
    </div>
  );
} 