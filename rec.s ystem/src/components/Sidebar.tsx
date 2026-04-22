import React from 'react';
import { navigationData } from '../data/mock';

interface SidebarProps {
  onMenuClick: (id: number) => void;
  activeMenuId: number;
}

const Sidebar: React.FC<SidebarProps> = ({ onMenuClick, activeMenuId }) => {
  return (
    <div className="w-64 bg-primary text-white h-screen fixed left-0 top-0 flex flex-col">
      {/* 系统名称 */}
      <div className="p-6 border-b border-blue-800">
        <div className="flex items-center mb-4">
          {/* 图标区域 */}
          <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mr-3">
            <span className="text-xl">🔍</span>
          </div>
          <div>
            <div className="text-xs text-blue-200">智能检测系统</div>
            <div className="font-bold">手机外观检测</div>
          </div>
        </div>
        <h2 className="text-sm font-medium">
           检测 -&gt; 判定 -&gt; 决策
        </h2>

      </div>

      {/* 导航菜单 */}
      <nav className="flex-1 p-4">
        <ul>
          {navigationData.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onMenuClick(item.id)}
                className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-all duration-200 ${item.id === activeMenuId ? 'bg-blue-700' : 'hover:bg-blue-800'}`}
              >
                <span className="mr-3">{item.icon}</span>
                <span className="menu-text">{item.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* 底部用户信息 */}
      <div className="p-4 border-t border-blue-800">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3">
            <span>👤</span>
          </div>
          <div>
            <div className="text-sm font-medium">管理员</div>
            <div className="text-xs text-blue-200">系统管理员</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;