import Link from "next/link";

const linksByRole = {
  student: [
    { href: "/dashboard/student", label: "Dashboard Home" },
    { href: "/dashboard/student/classes", label: "Classes" },
    { href: "/dashboard/student/attendance", label: "Attendance" },
    { href: "/dashboard/student/quizzes", label: "Quizzes" },
    { href: "/dashboard/student/wallet", label: "Wallet" },
    { href: "/dashboard/student/store", label: "Store" },
    { href: "/dashboard/student/announcements", label: "Announcements" },
    { href: "/dashboard/student/parent-view", label: "Parent View" },
  ],
  teacher: [
    { href: "/dashboard/teacher", label: "Dashboard Home" },
    { href: "/dashboard/teacher/attendance", label: "Attendance" },
    { href: "/dashboard/teacher/syllabus", label: "Syllabus" },
    { href: "/dashboard/teacher/quizzes", label: "Quizzes" },
    { href: "/dashboard/teacher/performance", label: "Performance" },
    { href: "/dashboard/teacher/leave", label: "Leave" },
    { href: "/dashboard/teacher/salary", label: "Salary" },
  ],
  admin: [
    { href: "/dashboard/admin", label: "Dashboard Home" },
    { href: "/dashboard/admin/students", label: "Students" },
    { href: "/dashboard/admin/teachers", label: "Teachers" },
    { href: "/dashboard/admin/subjects", label: "Subjects" },
    { href: "/dashboard/admin/classes", label: "Classes" },
    { href: "/dashboard/admin/timetable", label: "Timetable" },
    { href: "/dashboard/admin/fees", label: "Fees" },
    { href: "/dashboard/admin/overview", label: "Overview" },
    { href: "/dashboard/admin/announcements", label: "Announcements" },
    { href: "/dashboard/admin/leaves", label: "Leaves" },
  ],
};

export default function Sidebar({ role = "student" }) {
  const links = linksByRole[role] || [];
  return (
    <aside className="w-64 h-full bg-gray-200 p-4">
      <nav>
        <ul className="space-y-2">
          {links.map((link) => (
            <li key={link.href}>
              {/* The <a> tag is removed, and its className is moved to the Link component */}
              <Link
                href={link.href}
                className="block px-3 py-2 rounded hover:bg-gray-300 text-gray-800 font-medium"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}