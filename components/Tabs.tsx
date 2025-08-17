
import React from 'react';
import { Tab } from '../types';

interface TabsProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

const Tabs: React.FC<TabsProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { key: Tab.Students, label: 'Alumnas' },
    { key: Tab.Firing, label: 'Horneado' },
  ];

  const baseClasses = "px-4 py-2 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors duration-200";
  const activeClasses = "bg-orange-600 text-white shadow";
  const inactiveClasses = "text-stone-600 hover:bg-stone-200";

  return (
    <div className="flex space-x-2 bg-stone-100 p-1 rounded-lg border-2 border-stone-200">
      {tabs.map(tab => (
        <button
          key={tab.key}
          onClick={() => setActiveTab(tab.key)}
          className={`${baseClasses} ${activeTab === tab.key ? activeClasses : inactiveClasses}`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
