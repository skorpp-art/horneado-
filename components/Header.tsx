
import React from 'react';

const VaseIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 2H8C6.346 2 5 3.346 5 5v1.172c0 .531.211 1.041.586 1.416l2.43 2.43C8.828 10.829 9 11.668 9 12.516V17c0 1.488-.789 2.804-2 3.454V22h10v-1.546c-1.211-.65-2-1.966-2-3.454v-4.484c0-.848.172-1.687.984-2.498l2.43-2.43c.375-.375.586-.885.586-1.416V5c0-1.654-1.346-3-3-3zm-8 4.172V5c0-.551.449-1 1-1h8c.551 0 1 .449 1 1v1.172l-2.43 2.43c-.812.812-.984 1.65-.984 2.498V17c0 .551.449 1 1 1s1-.449 1-1v-4h-2v4c0 1.654-1.346 3-3 3s-3-1.346-3-3v-4.484c0-.848-.172-1.687-.984-2.498L8 6.172z"></path>
  </svg>
);

const Header: React.FC = () => {
  return (
    <header className="bg-orange-100/50 border-b-2 border-orange-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center space-x-4">
        <VaseIcon className="h-10 w-10 text-orange-600" />
        <div>
          <h1 className="text-2xl font-bold text-stone-800 tracking-tight">Gestor de Taller de Cerámica</h1>
          <p className="text-stone-600">Registro de alumnas y cálculo de horneados</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
