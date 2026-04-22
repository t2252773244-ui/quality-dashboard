import React from 'react';

interface ModuleCardProps {
  id: number;
  title: string;
  description: string;
  features: string[];
  children: React.ReactNode;
  color: string;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ id, title, description, features, children, color }) => {
  return (
    <div className="card mb-8 border-l-4" style={{ borderLeftColor: color.split('bg-')[1] }}>
      <div className="flex flex-col md:flex-row gap-6">
        {/* 左侧信息区 */}
        <div className="w-full md:w-1/3 module-card left-section">
          <div className="flex items-center mb-4">
            <div className={`w-8 h-8 rounded-full ${color} flex items-center justify-center text-white font-bold mr-3`}>
              {id}
            </div>
            <h3 className="text-lg font-bold">{title}</h3>
          </div>
          <p className="text-gray-600 mb-4 text-sm">{description}</p>
          <div className="mb-4">
            <h4 className="text-sm font-semibold mb-2">二级功能</h4>
            <ul className="space-y-1">
              {features.map((feature, index) => (
                <li key={index} className="text-sm flex items-start">
                  <span className="mr-2 mt-1">•</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 右侧预览区 */}
        <div className="w-full md:w-2/3 module-card right-section">
          <div className="bg-gray-50 rounded-lg p-4 h-full border border-gray-100">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleCard;