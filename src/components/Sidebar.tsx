import React, { useState } from 'react';
import { navigationData } from '../data/mock';

interface SidebarProps {
  onMenuClick: (menuId: string) => void;
  activeMenu: string;
  onRoleChange: (role: string) => void;
  currentRole: string;
}

const Sidebar: React.FC<SidebarProps> = ({ onMenuClick, activeMenu, onRoleChange, currentRole }) => {
  // 菜单ID映射
  const getMenuId = (id: number): string => {
    switch (id) {
      case 1: return 'dashboard';
      case 2: return 'detect';
      case 3: return 'review';
      case 4: return 'quality';
      case 5: return 'rule';
      case 6: return 'system';
      case 7: return 'data';
      case 8: return 'mywork';
      default: return 'dashboard';
    }
  };

  // 角色选项
  const roles = [
    { id: 'leader', name: '班组长' },
    { id: 'qc', name: 'QC（质检）' },
    { id: 'engineer', name: '质量工程师' },
    { id: 'manager', name: '质量经理' }
  ];

  // 角色下拉菜单状态
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);

  // 获取当前角色名称
  const getRoleName = (roleId: string): string => {
    const role = roles.find(r => r.id === roleId);
    return role ? role.name : '质量经理';
  };

  // 处理角色切换
  const handleRoleChange = (roleId: string) => {
    onRoleChange(roleId);
    setShowRoleDropdown(false);
  };

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
        <h2 className="text-sm font-medium">检测 &rarr; 判定 &rarr; 决策</h2>
      </div>

      {/* 导航菜单 */}
      <nav className="flex-1 p-4">
        <ul>
          {navigationData.map((item) => {
            const menuId = getMenuId(item.id);
            return (
              <li key={item.id}>
                <button
                  onClick={() => onMenuClick(menuId)}
                  className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-all duration-200 ${menuId === activeMenu ? 'bg-blue-700' : 'hover:bg-blue-800'}`}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span className="menu-text">{item.name}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* 底部用户信息 */}
      <div className="p-4 border-t border-blue-800">
        <div className="relative">
          <div 
            className="flex items-center cursor-pointer"
            onClick={() => setShowRoleDropdown(!showRoleDropdown)}
          >
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3">
              <span>👤</span>
            </div>
            <div>
              <div className="text-sm font-medium">{getRoleName(currentRole)}</div>
              <div className="text-xs text-blue-200">点击切换角色</div>
            </div>
          </div>
          
          {/* 角色下拉菜单 */}
          {showRoleDropdown && (
            <div className="absolute bottom-full left-0 right-0 mb-2 bg-blue-800 rounded-lg shadow-lg z-10">
              <ul>
                {roles.map((role) => (
                  <li key={role.id}>
                    <button
                      onClick={() => handleRoleChange(role.id)}
                      className={`w-full text-left px-4 py-2 hover:bg-blue-700 ${currentRole === role.id ? 'bg-blue-700' : ''}`}
                    >
                      {role.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;