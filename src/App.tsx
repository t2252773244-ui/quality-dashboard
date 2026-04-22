import { useState } from 'react';
import Sidebar from './components/Sidebar';
import RightGuidePanel from './components/RightGuidePanel';
import Dashboard from './components/Dashboard';
import DetectManage from './components/DetectManage';
import ReviewHandle from './components/ReviewHandle';
import QualityMonitor from './components/QualityMonitor';
import RuleStandard from './components/RuleStandard';
import SystemManage from './components/SystemManage';
import DataReport from './components/DataReport';
import MyWork from './components/MyWork';

function App() {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [role, setRole] = useState('manager'); // 默认角色为质量经理

  const handleMenuClick = (menuId: string) => {
    setActiveMenu(menuId);
  };

  const handleRoleChange = (roleId: string) => {
    setRole(roleId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部标题区域 */}
      <div className="bg-white border-b border-gray-200 py-6 px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-center">手机整机外观智能检测与决策建议系统</h1>
          <p className="text-gray-600 text-center mt-2">用于产品评审、客户演示、研发拆解和设计对齐</p>
        </div>
      </div>

      {/* 主要内容区域 */}
      <div className="flex">
        {/* 左侧导航栏 */}
        <div className="sidebar">
          <Sidebar 
            onMenuClick={handleMenuClick} 
            activeMenu={activeMenu} 
            onRoleChange={handleRoleChange} 
            currentRole={role} 
          />
        </div>

        {/* 中央主展示区 */}
        <div className="flex-1 ml-64 mr-80 p-8 main-content">
          <div className="max-w-7xl mx-auto">
            {/* 根据当前激活的菜单和角色显示对应的模块 */}
            {activeMenu === 'dashboard' && <Dashboard role={role} onMenuClick={handleMenuClick} />}
            {activeMenu === 'detect' && <DetectManage role={role} />}
            {activeMenu === 'review' && <ReviewHandle role={role} />}
            {activeMenu === 'quality' && <QualityMonitor role={role} />}
            {activeMenu === 'rule' && <RuleStandard role={role} />}
            {activeMenu === 'system' && <SystemManage role={role} />}
            {activeMenu === 'data' && <DataReport role={role} />}
            {activeMenu === 'mywork' && <MyWork role={role} />}
          </div>
        </div>

        {/* 右侧设计规范区 */}
        <div className="right-panel">
          <RightGuidePanel />
        </div>
      </div>
    </div>
  );
}

export default App;