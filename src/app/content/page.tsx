"use client"

export default function ContentPage() {
  const content = [
    { id: 1, title: "مقال 1", type: "مقال", date: "2024-03-20" },
    { id: 2, title: "خبر عاجل", type: "خبر", date: "2024-03-19" },
    // المزيد من المحتوى...
  ];

  return (
    <div>
      <h1>إدارة المحتوى</h1>
      <table className="content-table">
        <thead>
          <tr>
            <th>العنوان</th>
            <th>النوع</th>
            <th>التاريخ</th>
            <th>الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          {content.map((item) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>{item.type}</td>
              <td>{item.date}</td>
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