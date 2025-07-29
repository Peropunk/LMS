// pages/dashboard/student/attendance.js

import { useState, useEffect } from 'react';
import StudentLayout from '../../../components/layout/StudentLayout';

// A helper function to process the raw attendance records from the API
const processAttendanceData = (records) => {
  if (!records || records.length === 0) {
    return {
      overview: { totalClasses: 0, attendedClasses: 0, percentage: 0, status: 'N/A' },
      monthlyData: [],
      subjectWiseAttendance: [],
      recentRecords: [],
    };
  }

  // 1. Calculate Overview
  const totalClasses = records.length;
  const attendedClasses = records.filter(r => r.status === 'Present').length;
  const percentage = totalClasses > 0 ? Math.round((attendedClasses / totalClasses) * 100) : 0;
  let status = 'Poor';
  if (percentage >= 90) status = 'Excellent';
  else if (percentage >= 75) status = 'Good';

  const overview = { totalClasses, attendedClasses, percentage, status };

  // 2. Calculate Subject-wise Attendance
  const subjectMap = new Map();
  records.forEach(record => {
    const subjectName = record.subjects.name;
    if (!subjectMap.has(subjectName)) {
      subjectMap.set(subjectName, { attended: 0, total: 0 });
    }
    const current = subjectMap.get(subjectName);
    current.total += 1;
    if (record.status === 'Present') {
      current.attended += 1;
    }
  });

  const subjectWiseAttendance = Array.from(subjectMap.entries()).map(([subject, data]) => ({
    subject,
    ...data,
    percentage: data.total > 0 ? parseFloat(((data.attended / data.total) * 100).toFixed(1)) : 0,
  }));

  // 3. Calculate Monthly Attendance
  const monthMap = new Map();
  records.forEach(record => {
    const month = new Date(record.date).toLocaleString('default', { month: 'long' });
    if (!monthMap.has(month)) {
      monthMap.set(month, { present: 0, absent: 0, total: 0 });
    }
    const current = monthMap.get(month);
    current.total += 1;
    if (record.status === 'Present') {
      current.present += 1;
    } else {
      current.absent += 1;
    }
  });

  const monthlyData = Array.from(monthMap.entries()).map(([month, data]) => ({
    month,
    ...data,
    percentage: data.total > 0 ? Math.round((data.present / data.total) * 100) : 0,
  }));

  return {
    overview,
    monthlyData,
    subjectWiseAttendance,
    recentRecords: records.slice(0, 8), // The API already sorts by date, limit to 8 for the table
  };
};

export default function StudentAttendance() {
  const [attendanceData, setAttendanceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState('current-year');
  const [selectedSubject, setSelectedSubject] = useState('all');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.id) {
      setError("No user found. Please log in again.");
      setLoading(false);
      return;
    }

    const fetchAttendance = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3001/api/attendance/student/${user.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data from the server.');
        }
        const records = await response.json();
        const processedData = processAttendanceData(records);
        setAttendanceData(processedData);
      } catch (err) {
        setError(err.message);
        console.error("Failed to fetch attendance:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, []); // Empty dependency array ensures this runs only once on mount

  const getStatusColor = (percentage) => {
    if (percentage >= 90) return 'text-green-600 bg-green-100';
    if (percentage >= 75) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getAttendanceStatusBadge = (status) => {
    return status === 'Present' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800';
  };
  
  if (loading) {
    return (
      <StudentLayout>
        <div className="flex justify-center items-center h-64">
          <p className="text-lg">Loading attendance data...</p>
        </div>
      </StudentLayout>
    );
  }

  if (error) {
    return (
      <StudentLayout>
        <div className="text-center p-8 bg-red-100 text-red-700 rounded-lg">
          <h2 className="text-xl font-bold">An Error Occurred</h2>
          <p>{error}</p>
        </div>
      </StudentLayout>
    );
  }
  
  if (!attendanceData) {
      return <StudentLayout><p>No attendance data available.</p></StudentLayout>;
  }

  return (
    <StudentLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Attendance Overview</h1>
            <p className="text-gray-600">Track your class attendance and performance</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              disabled // Filters are for display, not yet functional with this setup
            >
              <option value="current-year">Current Year</option>
            </select>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              disabled // Filters are for display, not yet functional
            >
              <option value="all">All Subjects</option>
            </select>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <p className="text-sm font-medium text-gray-600">Total Classes</p>
            <p className="text-2xl font-bold text-gray-900">{attendanceData.overview.totalClasses}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <p className="text-sm font-medium text-gray-600">Classes Attended</p>
            <p className="text-2xl font-bold text-green-600">{attendanceData.overview.attendedClasses}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <p className="text-sm font-medium text-gray-600">Attendance Rate</p>
            <p className="text-2xl font-bold text-purple-600">{attendanceData.overview.percentage}%</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <p className="text-sm font-medium text-gray-600">Status</p>
            <p className={`text-2xl font-bold ${getStatusColor(attendanceData.overview.percentage)}`}>
              {attendanceData.overview.status}
            </p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Attendance Trend</h3>
            <div className="space-y-3">
              {attendanceData.monthlyData.map((month, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-900">{month.month}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-600">{month.present}/{month.total}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(month.percentage)}`}>
                      {month.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Subject-wise Attendance</h3>
            <div className="space-y-3">
              {attendanceData.subjectWiseAttendance.map((subject, index) => (
                <div key={index} className="p-3 border border-gray-100 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">{subject.subject}</span>
                    <span className="text-sm text-gray-600">{subject.attended}/{subject.total}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                      style={{ width: `${subject.percentage}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-xs text-gray-500">Attendance Rate</span>
                    <span className={`text-xs font-medium ${getStatusColor(subject.percentage)}`}>
                      {subject.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Attendance Records */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Attendance Records</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {attendanceData.recentRecords.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(record.date).toLocaleDateString('en-US', { 
                        weekday: 'short', month: 'short', day: 'numeric' 
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {record.subjects.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getAttendanceStatusBadge(record.status)}`}>
                        {record.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}

/*
Supabase Database Schema for Attendance:

1. attendance_records table:
   - id: uuid (primary key)
   - student_id: uuid (foreign key to students table)
   - subject_id: uuid (foreign key to subjects table)
   - class_date: date
   - class_time: time
   - status: enum ('present', 'absent', 'late', 'excused')
   - created_at: timestamp
   - updated_at: timestamp

2. Example Supabase queries to replace mock data:

// Get student attendance overview
const getAttendanceOverview = async (studentId, startDate, endDate) => {
  const { data: attendanceOverview } = await supabase
    .from('attendance_records')
    .select('status')
    .eq('student_id', studentId)
    .gte('class_date', startDate)
    .lte('class_date', endDate);
  return attendanceOverview;
};

// Get monthly attendance data
const getMonthlyAttendance = async (studentId, startOfYear) => {
  const { data: monthlyAttendance } = await supabase
    .from('attendance_records')
    .select('class_date, status')
    .eq('student_id', studentId)
    .gte('class_date', startOfYear)
    .order('class_date', { ascending: true });
  return monthlyAttendance;
};

// Get subject-wise attendance
const getSubjectAttendance = async (studentId, startDate) => {
  const { data: subjectAttendance } = await supabase
    .from('attendance_records')
    .select('status, subjects(name)')
    .eq('student_id', studentId)
    .gte('class_date', startDate);
  return subjectAttendance;
};

// Get recent attendance records
const getRecentRecords = async (studentId) => {
  const { data: recentRecords } = await supabase
    .from('attendance_records')
    .select('*, subjects(name)')
    .eq('student_id', studentId)
    .order('class_date', { ascending: false })
    .limit(10);
  return recentRecords;
};
*/
