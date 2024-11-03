"use client"

export default function UsersPage() {
  const users = [
    { id: 1, name: "أحمد محمد", email: "ahmed@example.com", role: "مدير" },
    { id: 2, name: "سارة أحمد", email: "sara@example.com", role: "محرر" },
    // المزيد من المستخدمين...
  ];

  return (
    <div>
      <h1>إدارة المستخدمين</h1>
      <table className="users-table">
        <thead>
          <tr>
            <th>الاسم</th>
            <th>البريد الإلكتروني</th>
            <th>الدور</th>
            <th>الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button>تعديل</button>
                <button>حذف</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 