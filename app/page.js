import AdminApp from '@/components/admin/AdminApp';

// noindex عشان صفحة الأدمن متظهرش في نتائج البحث خالص، ومش متلينكة من أي مكان في المتجر
export const metadata = {
  title: 'لوحة تحكم SIWAR',
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return <AdminApp />;
}
