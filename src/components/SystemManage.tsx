import React from 'react';
import { systemData } from '../data/mock';

interface SystemManageProps {
  role: string;
}

const SystemManage: React.FC<SystemManageProps> = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">系统管理</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 用户管理 */}
        <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all duration-300">
          <h4 className="text-sm font-semibold mb-3">用户管理</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm table">
              <thead>
                <tr>
                  <th>用户名</th>
                  <th>角色</th>
                  <th>状态</th>
                </tr>
              </thead>
              <tbody>
                {systemData.users.map((user) => (
                  <tr key={user.id} className="cursor-pointer hover:bg-gray-50 transition-colors duration-200">
                    <td>{user.name}</td>
                    <td>{user.role}</td>
                    <td>
                      <span className={`text-xs px-2 py-1 rounded ${user.status === '活跃' ? 'bg-success/10 text-success' : 'bg-gray-100 text-gray-600'}`}>
                        {user.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 角色与权限管理 */}
        <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all duration-300">
          <h4 className="text-sm font-semibold mb-3">角色与权限管理</h4>
          <div className="space-y-3 text-sm">
            {systemData.roles.map((role) => (
              <div key={role.id} className="p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
                <div className="font-medium">{role.name}</div>
                <div className="text-xs text-gray-600 mt-1">权限值：{role.permissions}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 系统配置管理 */}
        <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all duration-300">
          <h4 className="text-sm font-semibold mb-3">系统配置管理</h4>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
              <span>检测超时阈值</span>
              <span className="font-medium">30秒</span>
            </div>
            <div className="flex justify-between items-center p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
              <span>批量异常阈值</span>
              <span className="font-medium">5个</span>
            </div>
            <div className="flex justify-between items-center p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
              <span>AI置信度阈值</span>
              <span className="font-medium">70%</span>
            </div>
            <div className="flex justify-between items-center p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
              <span>数据保留期限</span>
              <span className="font-medium">90天</span>
            </div>
          </div>
        </div>

        {/* 日志与审计 */}
        <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all duration-300">
          <h4 className="text-sm font-semibold mb-3">日志与审计</h4>
          <div className="space-y-3 text-sm">
            <div className="p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
              <div className="font-medium">管理员 - 登录系统</div>
              <div className="text-xs text-gray-600 mt-1">2024-05-01 14:00:00</div>
            </div>
            <div className="p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
              <div className="font-medium">质检员A - 更新检测规则</div>
              <div className="text-xs text-gray-600 mt-1">2024-05-01 13:30:00</div>
            </div>
            <div className="p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
              <div className="font-medium">工程师B - 批量导入数据</div>
              <div className="text-xs text-gray-600 mt-1">2024-05-01 12:15:00</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemManage;