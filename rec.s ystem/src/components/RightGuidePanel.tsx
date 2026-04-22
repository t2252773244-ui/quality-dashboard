import React from 'react';
import { designPrinciples, globalElements, colorStatus } from '../data/mock';

const RightGuidePanel: React.FC = () => {
  return (
    <div className="w-80 bg-white border-l border-gray-200 h-screen fixed right-0 top-0 overflow-y-auto p-6">
      {/* 页面标题 */}
      <h2 className="text-lg font-bold mb-6">设计规范</h2>

      {/* 界面设计原则 */}
      <div className="mb-8">
        <h3 className="text-md font-semibold mb-4">界面设计原则</h3>
        <div className="space-y-3">
          {designPrinciples.map((principle) => (
            <div key={principle.id} className="p-3 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-primary">{principle.name}</h4>
              <p className="text-sm text-gray-600 mt-1">{principle.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 全局设计元素 */}
      <div className="mb-8">
        <h3 className="text-md font-semibold mb-4">全局设计元素</h3>
        <div className="space-y-3">
          {globalElements.map((element) => (
            <div key={element.id} className="p-3 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-primary">{element.name}</h4>
              <p className="text-sm text-gray-600 mt-1">{element.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 状态颜色规范 */}
      <div>
        <h3 className="text-md font-semibold mb-4">状态颜色规范</h3>
        <div className="space-y-3">
          {colorStatus.map((status) => (
            <div key={status.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium">{status.status}</span>
              <div className="flex items-center">
                <div className={`w-4 h-4 rounded ${status.color} mr-2`}></div>
                <span className="text-xs text-gray-600">{status.hex}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightGuidePanel;