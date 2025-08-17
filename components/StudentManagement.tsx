
import React, { useState } from 'react';
import { Student } from '../types';
import StudentForm from './StudentForm';
import StudentList from './StudentList';

interface StudentManagementProps {
  students: Student[];
  addStudent: (student: Omit<Student, 'id'>) => void;
  deleteStudent: (id: string) => void;
}

const StudentManagement: React.FC<StudentManagementProps> = ({ students, addStudent, deleteStudent }) => {
  const [showForm, setShowForm] = useState(false);
  
  const handleStudentAdded = () => {
    setShowForm(false);
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-stone-700">Registro de Alumnas</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center space-x-2 bg-orange-600 text-white px-4 py-2 rounded-lg shadow hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-200 transform hover:scale-105"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          <span>{showForm ? 'Cerrar Formulario' : 'Agregar Alumna'}</span>
        </button>
      </div>

      {showForm && <StudentForm addStudent={addStudent} onStudentAdded={handleStudentAdded} />}

      <StudentList students={students} deleteStudent={deleteStudent} />
    </div>
  );
};

export default StudentManagement;
