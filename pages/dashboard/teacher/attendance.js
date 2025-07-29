// pages/dashboard/teacher/attendance.js

import { useState, useEffect } from 'react';
import TeacherLayout from '../../../components/layout/TeacherLayout';

export default function UpdateAttendance() {
    const [students, setStudents] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [status, setStatus] = useState('Present');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch both students and subjects when the component mounts
        const fetchData = async () => {
            try {
                // Promise.all fetches both in parallel for efficiency
                const [studentsRes, subjectsRes] = await Promise.all([
                    fetch('http://localhost:3001/api/students'),
                    fetch('http://localhost:3001/api/subjects')
                ]);

                if (!studentsRes.ok || !subjectsRes.ok) {
                    throw new Error('Failed to load initial data.');
                }

                const studentsData = await studentsRes.json();
                const subjectsData = await subjectsRes.json();

                setStudents(studentsData);
                setSubjects(subjectsData);
                
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        if (!selectedStudent || !selectedSubject) {
            setError('Please select a student and a subject.');
            return;
        }

        try {
            const response = await fetch('http://localhost:3001/api/attendance', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    student_id: selectedStudent,
                    subject_id: selectedSubject,
                    date,
                    status,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'An unknown error occurred.');
            }
            
            setMessage('Attendance updated successfully!');

        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) {
        return <TeacherLayout><p>Loading data...</p></TeacherLayout>;
    }

    return (
        <TeacherLayout>
            <div className="max-w-2xl mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Update Student Attendance</h1>
                <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Student</label>
                        <select onChange={(e) => setSelectedStudent(e.target.value)} required className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
                            <option value="">Select a Student</option>
                            {students.map(student => (
                                <option key={student.id} value={student.id}>{student.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Subject</label>
                        <select onChange={(e) => setSelectedSubject(e.target.value)} required className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
                            <option value="">Select a Subject</option>
                            {subjects.map(subject => (
                                <option key={subject.id} value={subject.id}>{subject.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Date</label>
                        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Status</label>
                        <select value={status} onChange={(e) => setStatus(e.target.value)} required className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
                            <option value="Present">Present</option>
                            <option value="Absent">Absent</option>
                        </select>
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Update Attendance</button>
                    {message && <p className="mt-4 text-center text-green-600">{message}</p>}
                    {error && <p className="mt-4 text-center text-red-600">{error}</p>}
                </form>
            </div>
        </TeacherLayout>
    );
}