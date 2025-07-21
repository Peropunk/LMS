import Link from "next/link";
import TeacherLayout from "../../../components/layout/TeacherLayout";

const teacherLinks = [
  { href: "/dashboard/teacher/attendance", label: "Attendance" },
  { href: "/dashboard/teacher/syllabus", label: "Syllabus" },
  { href: "/dashboard/teacher/quizzes", label: "Quizzes" },
  { href: "/dashboard/teacher/performance", label: "Performance" },
  { href: "/dashboard/teacher/leave", label: "Leave" },
  { href: "/dashboard/teacher/salary", label: "Salary" },
];

export default function TeacherDashboard() {
  return (
    <TeacherLayout>
      <h2 className="text-2xl font-bold mb-6">Teacher Dashboard</h2>
      <ul className="space-y-3">
        {teacherLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="block px-4 py-2 bg-green-100 rounded hover:bg-green-200 text-green-800 font-medium"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </TeacherLayout>
  );
} 