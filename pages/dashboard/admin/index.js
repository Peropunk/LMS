import Link from "next/link";
import AdminLayout from "../../../components/layout/AdminLayout";

const adminLinks = [
  { href: "/dashboard/admin/students", label: "Students" },
  { href: "/dashboard/admin/teachers", label: "Teachers" },
  { href: "/dashboard/admin/subjects", label: "Subjects" },
  { href: "/dashboard/admin/classes", label: "Classes" },
  { href: "/dashboard/admin/timetable", label: "Timetable" },
  { href: "/dashboard/admin/fees", label: "Fees" },
  { href: "/dashboard/admin/overview", label: "Overview" },
  { href: "/dashboard/admin/announcements", label: "Announcements" },
  { href: "/dashboard/admin/leaves", label: "Leaves" },
];

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
      <ul className="space-y-3">
        {adminLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="block px-4 py-2 bg-yellow-100 rounded hover:bg-yellow-200 text-yellow-800 font-medium"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </AdminLayout>
  );
} 