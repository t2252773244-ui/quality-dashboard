import React from 'react';
import { ruleData } from '../data/mock';

interface RuleStandardProps {
  role: string;
}

const RuleStandard: React.FC<RuleStandardProps> = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">规则与标准</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 客户标准管理 */}
        <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all duration-300">
          <h4 className="text-sm font-semibold mb-3">客户标准管理</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm table">
              <thead>
                <tr>
                  <th>名称</th>
                  <th>客户</th>
                  <th>版本</th>
                  <th>状态</th>
                </tr>
              </thead>
              <tbody>
                {ruleData.standards.map((standard) => (
                  <tr key={standard.id} className="cursor-pointer hover:bg-gray-50 transition-colors duration-200">
                    <td>{standard.name}</td>
                    <td>{standard.client}</td>
                    <td>{standard.version}</td>
                    <td>
                      <span className={`text-xs px-2 py-1 rounded ${standard.status === '生效中' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'}`}>
                        {standard.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 缺陷规则管理 */}
        <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all duration-300">
          <h4 className="text-sm font-semibold mb-3">缺陷规则管理</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm table">
              <thead>
                <tr>
                  <th>规则名称</th>
                  <th>严重程度</th>
                  <th>状态</th>
                </tr>
              </thead>
              <tbody>
                {ruleData.rules.map((rule) => (
                  <tr key={rule.id} className="cursor-pointer hover:bg-gray-50 transition-colors duration-200">
                    <td>{rule.name}</td>
                    <td>{rule.severity}</td>
                    <td>
                      <span className={`text-xs px-2 py-1 rounded ${rule.status === '启用' ? 'bg-success/10 text-success' : 'bg-gray-100 text-gray-600'}`}>
                        {rule.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 接管策略管理 */}
        <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all duration-300">
          <h4 className="text-sm font-semibold mb-3">接管策略管理</h4>
          <div className="space-y-3 text-sm">
            <div className="p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
              <div className="font-medium">AI置信度 &lt; 70% → 人工复判</div>
              <div className="text-xs text-gray-600 mt-1">适用于所有缺陷类型</div>
            </div>
            <div className="p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
              <div className="font-medium">批量异常 → 暂停生产</div>
              <div className="text-xs text-gray-600 mt-1">连续5个相同缺陷</div>
            </div>
            <div className="p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
              <div className="font-medium">新机型 → 严格模式</div>
              <div className="text-xs text-gray-600 mt-1">前1000件全部人工审核</div>
            </div>
          </div>
        </div>

        {/* 版本与发布管理 */}
        <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all duration-300">
          <h4 className="text-sm font-semibold mb-3">版本与发布管理</h4>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
              <span>规则包 v2.1</span>
              <span className="text-success font-medium">已发布</span>
            </div>
            <div className="flex justify-between items-center p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
              <span>规则包 v2.0</span>
              <span className="text-success font-medium">已发布</span>
            </div>
            <div className="flex justify-between items-center p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
              <span>规则包 v1.9</span>
              <span className="text-gray-600 font-medium">已归档</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RuleStandard;