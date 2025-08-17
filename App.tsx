
import React, { useState, useCallback } from 'react';
import { Student, Tab } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import Header from './components/Header';
import Tabs from './components/Tabs';
import StudentManagement from './components/StudentManagement';
import FiringCalculator from './components/FiringCalculator';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.Students);
  const [students, setStudents] = useLocalStorage<Student[]>('students', []);

  const addStudent = useCallback((student: Omit<Student, 'id'>) => {
    const newStudent: Student = { ...student, id: new Date().toISOString() };
    setStudents(prevStudents => [...prevStudents, newStudent]);
  }, [setStudents]);

  const deleteStudent = useCallback((id: string) => {
    setStudents(prevStudents => prevStudents.filter(student => student.id !== id));
  }, [setStudents]);

  return (
    <div className="min-h-screen font-sans">
      <Header />
      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="mt-8">
          {activeTab === Tab.Students && (
            <StudentManagement 
              students={students} 
              addStudent={addStudent} 
              deleteStudent={deleteStudent}
            />
          )}
          {activeTab === Tab.Firing && <FiringCalculator />}
        </div>
      </main>
      <footer className="text-center py-4 text-stone-500 text-sm">
        <p>Hecho con ❤️ para ceramistas.</p>
      </footer>
    </div>
  );
};

export default App;
