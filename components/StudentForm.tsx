
import React, { useState } from 'react';
import { Student } from '../types';
import { DAYS_OF_WEEK } from '../constants';

interface StudentFormProps {
  addStudent: (student: Omit<Student, 'id'>) => void;
  onStudentAdded: () => void;
}

const StudentForm: React.FC<StudentFormProps> = ({ addStudent, onStudentAdded }) => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [classDays, setClassDays] = useState<string[]>([]);
  const [error, setError] = useState('');

  const handleDayChange = (day: string) => {
    setClassDays(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !contact.trim()) {
      setError('Nombre y contacto son obligatorios.');
      return;
    }
    setError('');
    addStudent({ name, contact, classDays });
    setName('');
    setContact('');
    setClassDays([]);
    onStudentAdded();
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-stone-200 transition-all duration-300">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h3 className="text-xl font-semibold text-stone-700 border-b pb-2">Nueva Alumna</h3>
        {error && <div className="bg-red-100 text-red-700 p-3 rounded-md">{error}</div>}
        
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-stone-600 mb-1">Nombre Completo</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full px-3 py-2 border border-stone-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
            placeholder="Ej: Ana Pérez"
          />
        </div>

        <div>
          <label htmlFor="contact" className="block text-sm font-medium text-stone-600 mb-1">Contacto (Teléfono/Email)</label>
          <input
            type="text"
            id="contact"
            value={contact}
            onChange={e => setContact(e.target.value)}
            className="w-full px-3 py-2 border border-stone-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
            placeholder="Ej: 11-2345-6789"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-600 mb-2">Días de Clase</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
            {DAYS_OF_WEEK.map(day => (
              <label key={day} className={`flex items-center space-x-2 p-2 border rounded-md cursor-pointer transition-colors duration-200 ${classDays.includes(day) ? 'bg-orange-100 border-orange-400' : 'bg-stone-50 border-stone-200 hover:bg-stone-100'}`}>
                <input
                  type="checkbox"
                  checked={classDays.includes(day)}
                  onChange={() => handleDayChange(day)}
                  className="h-4 w-4 rounded border-stone-300 text-orange-600 focus:ring-orange-500"
                />
                <span className="text-sm text-stone-700">{day}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <button type="submit" className="bg-orange-600 text-white px-5 py-2 rounded-lg shadow hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors">
            Guardar Alumna
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentForm;
