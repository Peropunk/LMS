# AI LMS Frontend

## Roles & Logins
- Admin: admin@ailms.com / admin123
- Teacher: teacher@ailms.com / teach123
- Student: student@ailms.com / stud123

## Auth Strategy
- Using dummy login system (can be replaced by Supabase Auth)
- Store role in localStorage (temporary)

## Routing
- Admin Login: http://admin.localhost:3000/login/admin
- Other Login: http://localhost:3000/login

## Dashboard Pages
Student, Teacher, and Admin dashboards are located under:
- `/dashboard/{role}/...`

Each page includes `TODO` comments for backend integration.

## To-do
- Connect to Supabase DB
- Add real-time data fetching
- Replace dummy login with Supabase Auth 