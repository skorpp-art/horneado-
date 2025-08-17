import React, { useState, useMemo } from 'react';

enum ClientType {
  Student = 'STUDENT',
  External = 'EXTERNAL',
}

const FiringCalculator: React.FC = () => {
  const [height, setHeight] = useState<number | string>('');
  const [width, setWidth] = useState<number | string>('');
  const [depth, setDepth] = useState<number | string>('');
  const [clientType, setClientType] = useState<ClientType>(ClientType.Student);

  const { price, message } = useMemo(() => {
    const dims = [Number(height), Number(width), Number(depth)]
      .filter(d => d > 0)
      .sort((a, b) => a - b);

    if (dims.length === 0) {
      return { price: 0, message: 'Ingresa las dimensiones de la pieza.' };
    }

    const largest = dims[dims.length - 1];
    const secondLargest = dims.length >= 2 ? dims[dims.length - 2] : 0;
    
    // Regla especial para alumnas: si el lado más largo es <= 12cm, es gratis.
    if (clientType === ClientType.Student) {
        if (largest <= 12) {
            return { price: 0, message: `Categoría: Hasta 12 cm (lado más largo).` };
        }
    }
    
    // Para las demás reglas, se necesitan al menos dos dimensiones.
    if (dims.length < 2) {
        return { price: 0, message: 'Ingresa al menos dos dimensiones.' };
    }

    const checkTier = (max1: number, max2: number) => {
        return (secondLargest <= max1 && largest <= max2) || (secondLargest <= max2 && largest <= max1);
    }
    
    if (clientType === ClientType.Student) {
        if (checkTier(12, 18)) return { price: 4000, message: `Categoría: Hasta 12x18 cm.` };
        if (checkTier(18, 25)) return { price: 6000, message: `Categoría: Hasta 18x25 cm.` };
        if (checkTier(25, 45)) return { price: 8000, message: `Categoría: Hasta 25x45 cm.` };
    } else { // Cliente Externo
        if (checkTier(12, 12)) return { price: 0, message: `Categoría: Hasta 12x12 cm.` };
        if (checkTier(12, 18)) return { price: 5500, message: `Categoría: Hasta 12x18 cm.` };
        if (checkTier(18, 25)) return { price: 7500, message: `Categoría: Hasta 18x25 cm.` };
        if (checkTier(25, 45)) return { price: 9500, message: `Categoría: Hasta 25x45 cm.` };
    }

    return { price: null, message: 'La pieza excede los tamaños predefinidos. Consultar precio.' };

  }, [height, width, depth, clientType]);

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string | number>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || (Number(value) >= 0 && !isNaN(Number(value)))) {
      setter(value);
    }
  };

  const PriceTable = ({ prices, title }: { prices: {label: string; price: number}[], title: string }) => (
    <div>
      <h4 className="font-semibold text-stone-600">{title}</h4>
      <ul className="list-disc list-inside text-stone-500 text-sm mt-2 space-y-1">
        {prices.map(p => (
          <li key={p.label}>
            {p.label}: <span className="font-bold text-stone-700">${p.price.toLocaleString('es-AR')}</span>
          </li>
        ))}
      </ul>
    </div>
  );
  
  const studentPriceTiers = [
    { label: 'Hasta 12 cm (lado más largo)', price: 0 },
    { label: 'Hasta 12x18 cm', price: 4000 },
    { label: 'Hasta 18x25 cm', price: 6000 },
    { label: 'Hasta 25x45 cm', price: 8000 },
  ];

  const externalPriceTiers = [
      { label: 'Hasta 12x12 cm', price: 0 },
      { label: 'Hasta 12x18 cm', price: 5500 },
      { label: 'Hasta 18x25 cm', price: 7500 },
      { label: 'Hasta 25x45 cm', price: 9500 },
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold text-stone-700 mb-6">Calculadora de Horneado</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Input section */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-stone-200 space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-stone-700 mb-2">1. Tipo de Cliente</h3>
            <div className="flex space-x-2 sm:space-x-4">
              <label className={`flex-1 p-3 border rounded-lg cursor-pointer text-center transition-all ${clientType === ClientType.Student ? 'bg-orange-100 border-orange-400 ring-2 ring-orange-300' : 'bg-stone-50 border-stone-200 hover:bg-stone-100'}`}>
                <input type="radio" name="clientType" value={ClientType.Student} checked={clientType === ClientType.Student} onChange={() => setClientType(ClientType.Student)} className="sr-only" aria-labelledby="student-label" />
                <span id="student-label" className="font-medium text-stone-800 text-sm sm:text-base">Alumna Taller</span>
              </label>
              <label className={`flex-1 p-3 border rounded-lg cursor-pointer text-center transition-all ${clientType === ClientType.External ? 'bg-orange-100 border-orange-400 ring-2 ring-orange-300' : 'bg-stone-50 border-stone-200 hover:bg-stone-100'}`}>
                <input type="radio" name="clientType" value={ClientType.External} checked={clientType === ClientType.External} onChange={() => setClientType(ClientType.External)} className="sr-only" aria-labelledby="external-label" />
                <span id="external-label" className="font-medium text-stone-800 text-sm sm:text-base">Cliente Externo</span>
              </label>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-stone-700 mb-1">2. Dimensiones de la Pieza</h3>
            <p className="text-sm text-stone-500">El cálculo se basa en los dos lados más largos.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="height" className="block text-sm font-medium text-stone-600">Alto (cm)</label>
              <input type="number" id="height" value={height} onChange={handleInputChange(setHeight)} placeholder="10" className="mt-1 w-full p-2 border border-stone-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500" min="0" />
            </div>
            <div>
              <label htmlFor="width" className="block text-sm font-medium text-stone-600">Ancho (cm)</label>
              <input type="number" id="width" value={width} onChange={handleInputChange(setWidth)} placeholder="8" className="mt-1 w-full p-2 border border-stone-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500" min="0" />
            </div>
            <div>
              <label htmlFor="depth" className="block text-sm font-medium text-stone-600">Prof. (cm)</label>
              <input type="number" id="depth" value={depth} onChange={handleInputChange(setDepth)} placeholder="8" className="mt-1 w-full p-2 border border-stone-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500" min="0" />
            </div>
          </div>
        </div>

        {/* Result section */}
        <div className="bg-orange-50 p-6 rounded-xl border-2 border-dashed border-orange-300 flex flex-col justify-center items-center text-center">
          <h3 className="text-xl font-semibold text-stone-700 mb-2">Costo de Horneado</h3>
          {price !== null ? (
            <p className="text-5xl font-bold text-orange-600 tracking-tight">
              ${price.toLocaleString('es-AR')}
            </p>
          ) : (
             <p className="text-3xl font-bold text-orange-600 tracking-tight">Consultar</p>
          )}
          <p className="mt-4 text-stone-500 text-sm h-5">{message}</p>
        </div>
      </div>
      
      {/* Price tables as reference */}
      <div className="mt-8 bg-white p-6 rounded-xl shadow-md border border-stone-200">
        <h3 className="text-xl font-semibold text-stone-700 mb-4">Tabla de Precios de Referencia</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PriceTable title="Alumnas del Taller" prices={studentPriceTiers} />
          <PriceTable title="Clientes Externos" prices={externalPriceTiers} />
        </div>
      </div>
    </div>
  );
};

export default FiringCalculator;
