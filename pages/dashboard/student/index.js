import Link from "next/link";
import StudentLayout from "../../../components/layout/StudentLayout";

const studentLinks = [
  { href: "/dashboard/student/classes", label: "Classes" },
  { href: "/dashboard/student/attendance", label: "Attendance" },
  { href: "/dashboard/student/quizzes", label: "Quizzes" },
  { href: "/dashboard/student/wallet", label: "Wallet" },
  { href: "/dashboard/student/store", label: "Store" },
  { href: "/dashboard/student/announcements", label: "Announcements" },
  { href: "/dashboard/student/parent-view", label: "Parent View" },
];

export default function StudentDashboard() {
  return (
    <StudentLayout>
      <h2 className="text-2xl font-bold mb-6">Student Dashboard</h2>
      <ul className="space-y-3">
        {studentLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="block px-4 py-2 bg-blue-100 rounded hover:bg-blue-200 text-blue-800 font-medium"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </StudentLayout>
  );
}