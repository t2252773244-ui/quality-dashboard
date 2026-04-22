import React, { useState, useEffect } from 'react';
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { dashboardData } from '../data/mock';

interface DashboardProps {
  role: string;
  onMenuClick: (menuId: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ role, onMenuClick }) => {
  // 颜色配置
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  // 实时告警数据
  const realTimeAlerts = [
    { id: 1, message: '线体A连续出现3个同类型缺陷', level: 'high' },
    { id: 2, message: '线体B良率下降2%', level: 'medium' },
    { id: 3, message: '新规则与历史数据匹配度低', level: 'low' },
    { id: 4, message: '批次A20240501异常率超过阈值', level: 'high' },
    { id: 5, message: '线体C设备需要维护', level: 'medium' },
  ];

  // 今日TOP问题
  const topIssues = [
    { id: 1, issue: '划痕', count: 25, rate: '45%' },
    { id: 2, issue: '变形', count: 15, rate: '27%' },
    { id: 3, issue: '污渍', count: 10, rate: '18%' },
    { id: 4, issue: '其他', count: 5, rate: '10%' },
  ];

  // 滚动告警状态
  const [scrollIndex, setScrollIndex] = useState(0);

  // 自动滚动告警
  useEffect(() => {
    const interval = setInterval(() => {
      setScrollIndex((prev) => (prev + 1) % realTimeAlerts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">首页 / 质量驾驶舱</h2>
      
      {/* 角色特定内容 */}
      {role === 'manager' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* 全局KPI */}
          <div className="grid grid-cols-2 gap-4">
            {dashboardData.kpi.map((item, index) => (
              <div 
                key={index} 
                className="bg-white p-4 rounded-lg border border-gray-200 cursor-pointer hover:shadow-md transition-all duration-300"
                onClick={() => {
                  if (item.name === '异常率') {
                    onMenuClick('detect');
                  }
                }}
              >
                <div className="text-sm text-gray-600">{item.name}</div>
                <div className="text-xl font-bold mt-1">{item.value}</div>
                <div className={`text-xs mt-1 ${item.trend === 'up' ? 'text-success' : 'text-danger'}`}>
                  {item.change}
                </div>
              </div>
            ))}
          </div>

          {/* 指标对比 */}
          <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all duration-300">
            <h4 className="text-sm font-semibold mb-2">指标对比</h4>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>检测总量</span>
                  <span className="text-success">+12.5% (昨日)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-success h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>通过率</span>
                  <span className="text-success">+0.8% (昨日)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-success h-2 rounded-full" style={{ width: '98%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>异常率</span>
                  <span className="text-danger">-0.3% (昨日)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-danger h-2 rounded-full" style={{ width: '2%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>复判通过率</span>
                  <span className="text-success">+1.2% (上周)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-success h-2 rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {role === 'leader' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* 本线体KPI */}
          <div className="grid grid-cols-2 gap-4">
            {dashboardData.kpi.slice(0, 2).map((item, index) => (
              <div 
                key={index} 
                className="bg-white p-4 rounded-lg border border-gray-200 cursor-pointer hover:shadow-md transition-all duration-300"
                onClick={() => {
                  if (item.name === '异常率') {
                    onMenuClick('detect');
                  }
                }}
              >
                <div className="text-sm text-gray-600">{item.name}</div>
                <div className="text-xl font-bold mt-1">{item.value}</div>
                <div className={`text-xs mt-1 ${item.trend === 'up' ? 'text-success' : 'text-danger'}`}>
                  {item.change}
                </div>
              </div>
            ))}
            <div className="bg-white p-4 rounded-lg border border-gray-200 cursor-pointer hover:shadow-md transition-all duration-300">
              <div className="text-sm text-gray-600">本线体效率</div>
              <div className="text-xl font-bold mt-1">98%</div>
              <div className="text-xs mt-1 text-success">+1.2%</div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200 cursor-pointer hover:shadow-md transition-all duration-300">
              <div className="text-sm text-gray-600">待处理任务</div>
              <div className="text-xl font-bold mt-1">12</div>
              <div className="text-xs mt-1 text-danger">+3</div>
            </div>
          </div>

          {/* 线体状态 */}
          <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all duration-300">
            <h4 className="text-sm font-semibold mb-2">线体状态</h4>
            <div className="space-y-2">
              {dashboardData.lineStatus.map((line, index) => (
                <div 
                  key={index} 
                  className="flex justify-between items-center cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors duration-200"
                  onClick={() => {
                    // 线体详情点击事件
                    console.log('线体详情:', line.name);
                  }}
                >
                  <span className="text-sm">{line.name}</span>
                  <div className="flex items-center">
                    <span className={`text-sm px-2 py-1 rounded ${line.status === '运行中' ? 'bg-success/10 text-success' : line.status === '预警' ? 'bg-warning/10 text-warning' : line.status === '异常' ? 'bg-danger/10 text-danger' : 'bg-gray-100 text-gray-600'}`}>
                      {line.status}
                    </span>
                    <span className="text-xs text-gray-600 ml-2">{line.efficiency}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {role === 'qc' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* 今日检测数据 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg border border-gray-200 cursor-pointer hover:shadow-md transition-all duration-300">
              <div className="text-sm text-gray-600">今日检测量</div>
              <div className="text-xl font-bold mt-1">125</div>
              <div className="text-xs mt-1 text-success">+15</div>
            </div>
            <div 
              className="bg-white p-4 rounded-lg border border-gray-200 cursor-pointer hover:shadow-md transition-all duration-300"
              onClick={() => onMenuClick('detect')}
            >
              <div className="text-sm text-gray-600">异常数量</div>
              <div className="text-xl font-bold mt-1">3</div>
              <div className="text-xs mt-1 text-danger">+1</div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200 cursor-pointer hover:shadow-md transition-all duration-300">
              <div className="text-sm text-gray-600">待复判</div>
              <div className="text-xl font-bold mt-1">5</div>
              <div className="text-xs mt-1 text-warning">+2</div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200 cursor-pointer hover:shadow-md transition-all duration-300">
              <div className="text-sm text-gray-600">通过率</div>
              <div className="text-xl font-bold mt-1">97.6%</div>
              <div className="text-xs mt-1 text-success">+0.5%</div>
            </div>
          </div>

          {/* 快速操作 */}
          <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all duration-300">
            <h4 className="text-sm font-semibold mb-2">快速操作</h4>
            <div className="grid grid-cols-2 gap-3">
              <button className="bg-primary text-white py-2 px-4 rounded-lg text-sm hover:bg-blue-700 transition-colors duration-200">
                录入检测数据
              </button>
              <button 
                className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg text-sm hover:bg-gray-300 transition-colors duration-200"
                onClick={() => onMenuClick('detect')}
              >
                查看异常
              </button>
              <button className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg text-sm hover:bg-gray-300 transition-colors duration-200">
                复判任务
              </button>
              <button className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg text-sm hover:bg-gray-300 transition-colors duration-200">
                检测历史
              </button>
            </div>
          </div>
        </div>
      )}

      {role === 'engineer' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* 趋势分析 */}
          <div className="bg-white p-4 rounded-lg border border-gray-200 cursor-pointer hover:shadow-md transition-all duration-300">
            <h4 className="text-sm font-semibold mb-2">近期检测趋势</h4>
            <ResponsiveContainer width="100%" height={160}>
              <LineChart data={dashboardData.trend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#3b82f6" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* 缺陷分析 */}
          <div className="bg-white p-4 rounded-lg border border-gray-200 cursor-pointer hover:shadow-md transition-all duration-300">
            <h4 className="text-sm font-semibold mb-2">问题结构分布</h4>
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie
                  data={dashboardData.defectDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={60}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label
                >
                  {dashboardData.defectDistribution.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* 通用内容 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* 今日TOP问题 */}
        <div className="bg-white p-4 rounded-lg border border-gray-200 cursor-pointer hover:shadow-md transition-all duration-300">
          <h4 className="text-sm font-semibold mb-2">今日TOP问题</h4>
          <div className="space-y-2">
            {topIssues.map((issue) => (
              <div key={issue.id} className="flex justify-between items-center hover:bg-gray-50 p-2 rounded transition-colors duration-200">
                <span className="text-sm">{issue.issue}</span>
                <div className="flex items-center">
                  <span className="text-sm mr-2">{issue.count} 件</span>
                  <span className="text-xs text-gray-600">{issue.rate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 实时告警 */}
        <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all duration-300">
          <h4 className="text-sm font-semibold mb-2">实时告警</h4>
          <div className="relative h-48 overflow-hidden">
            <div 
              className="space-y-3 transition-transform duration-500 ease-in-out"
              style={{ transform: `translateY(-${scrollIndex * 70}px)` }}
            >
              {realTimeAlerts.map((alert) => (
                <div key={alert.id} className={`p-3 rounded ${alert.level === 'high' ? 'bg-danger/10' : alert.level === 'medium' ? 'bg-warning/10' : 'bg-info/10'} transition-colors duration-200`}>
                  <div className="text-sm">{alert.message}</div>
                  <div className={`text-xs mt-1 ${alert.level === 'high' ? 'text-danger' : alert.level === 'medium' ? 'text-warning' : 'text-info'}`}>
                    {alert.level === 'high' ? '高' : alert.level === 'medium' ? '中' : '低'}优先级
                  </div>
                </div>
              ))}
              {/* 复制告警以实现无缝滚动 */}
              {realTimeAlerts.map((alert) => (
                <div key={`copy-${alert.id}`} className={`p-3 rounded ${alert.level === 'high' ? 'bg-danger/10' : alert.level === 'medium' ? 'bg-warning/10' : 'bg-info/10'} transition-colors duration-200`}>
                  <div className="text-sm">{alert.message}</div>
                  <div className={`text-xs mt-1 ${alert.level === 'high' ? 'text-danger' : alert.level === 'medium' ? 'text-warning' : 'text-info'}`}>
                    {alert.level === 'high' ? '高' : alert.level === 'medium' ? '中' : '低'}优先级
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 结论区 */}
      <div className="mt-4 bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all duration-300">
        <h4 className="text-sm font-semibold mb-2">质量结论</h4>
        <div className="text-sm p-3 bg-blue-50 rounded-lg">
          本周异常率上升2.3%，主要集中在线体B划痕问题。建议检查线体B的生产设备和操作流程，加强员工培训，降低划痕缺陷率。
        </div>
      </div>

      {/* 待办事项 */}
      <div className="mt-4 bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all duration-300">
        <h4 className="text-sm font-semibold mb-2">待办事项提醒</h4>
        <div className="space-y-2">
          {dashboardData.todoList.map((item) => (
            <div key={item.id} className="flex justify-between items-center cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors duration-200">
              <span className="text-sm">{item.title}</span>
              <div className="flex items-center">
                <span className="text-sm mr-2">{item.count} 件</span>
                <span className={`text-xs px-2 py-1 rounded ${item.priority === '高' ? 'bg-danger/10 text-danger' : item.priority === '中' ? 'bg-warning/10 text-warning' : 'bg-gray-100 text-gray-600'}`}>
                  {item.priority}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;