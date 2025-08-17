
import React from 'react';
import { Student } from '../types';

interface StudentListProps {
  students: Student[];
  deleteStudent: (id: string) => void;
}

const DownloadIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);

const TrashIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);

const StudentList: React.FC<StudentListProps> = ({ students, deleteStudent }) => {

  const downloadCSV = () => {
    const headers = ['ID', 'Nombre', 'Contacto', 'Días de Clase'];
    const rows = students.map(s =>
      [s.id, `"${s.name}"`, `"${s.contact}"`, `"${s.classDays.join(', ')}"`].join(',')
    );

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "lista_alumnas.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md border border-stone-200">
      <div className="flex justify-between items-center border-b pb-4 mb-4">
        <h3 className="text-xl font-semibold text-stone-700">Lista de Alumnas ({students.length})</h3>
        {students.length > 0 && (
          <button
            onClick={downloadCSV}
            className="flex items-center space-x-2 text-sm bg-stone-100 text-stone-700 px-3 py-2 rounded-lg border border-stone-200 hover:bg-stone-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors"
          >
            <DownloadIcon className="h-4 w-4"/>
            <span>Descargar CSV</span>
          </button>
        )}
      </div>

      {students.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-stone-500">No hay alumnas registradas todavía.</p>
          <p className="text-sm text-stone-400">Usa el botón "Agregar Alumna" para empezar.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {students.map(student => (
            <div key={student.id} className="bg-stone-50 p-4 rounded-lg border border-stone-200 shadow-sm relative group">
              <h4 className="font-bold text-lg text-orange-800">{student.name}</h4>
              <p className="text-stone-600 text-sm mt-1">{student.contact}</p>
              <div className="mt-3">
                {student.classDays.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {student.classDays.map(day => (
                      <span key={day} className="bg-orange-200 text-orange-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">{day}</span>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-stone-400 italic">Sin días de clase asignados.</p>
                )}
              </div>
               <button
                  onClick={() => window.confirm(`¿Seguro que quieres eliminar a ${student.name}?`) && deleteStudent(student.id)}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-stone-200 text-stone-500 opacity-0 group-hover:opacity-100 hover:bg-red-200 hover:text-red-700 transition-all duration-200"
                  aria-label={`Eliminar a ${student.name}`}
               >
                   <TrashIcon className="h-4 w-4" />
               </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentList;
