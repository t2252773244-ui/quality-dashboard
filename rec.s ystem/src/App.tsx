import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import RightGuidePanel from './components/RightGuidePanel';
import ModuleCard from './components/ModuleCard';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { dashboardData, inspectionData, reviewData, qualityData, ruleData, systemData, reportData, myWorkData } from './data/mock';

function App() {
  const [activeMenuId, setActiveMenuId] = useState(1);

  const handleMenuClick = (id: number) => {
    setActiveMenuId(id);
  };

  // 颜色配置
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部标题区域 */}
      <div className="bg-white border-b border-gray-200 py-6 px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-center">手机整机外观智能检测与决策建议系统 - 功能界面总览</h1>
          <p className="text-gray-600 text-center mt-2">展示系统核心功能结构、关键页面布局与设计规范</p>
          <p className="text-gray-500 text-center text-sm mt-1">用于产品评审、客户演示、研发拆解和设计对齐</p>
        </div>
      </div>

      {/* 主要内容区域 */}
      <div className="flex">
        {/* 左侧导航栏 */}
        <div className="sidebar">
          <Sidebar onMenuClick={handleMenuClick} activeMenuId={activeMenuId} />
        </div>

        {/* 中央主展示区 */}
        <div className="flex-1 ml-64 mr-80 p-8 main-content">
          <div className="max-w-7xl mx-auto">
          {/* 模块1：首页/工作台 */}
          <ModuleCard 
            id={1} 
            title="首页 / 工作台" 
            description="用于总览关键指标、实时产线状态、异常预警和待办事项。" 
            features={[
              '关键指标概览',
              '实时产线状态',
              '异常预警看板',
              '待办事项提醒'
            ]}
            color="bg-primary"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* KPI卡片 */}
              <div className="grid grid-cols-2 gap-4">
                {dashboardData.kpi.map((item, index) => (
                  <div key={index} className="bg-white p-3 rounded-lg border border-gray-200">
                    <div className="text-sm text-gray-600">{item.name}</div>
                    <div className="text-xl font-bold mt-1">{item.value}</div>
                    <div className={`text-xs mt-1 ${item.trend === 'up' ? 'text-success' : 'text-danger'}`}>
                      {item.change}
                    </div>
                  </div>
                ))}
              </div>

              {/* 检测趋势 */}
              <div className="bg-white p-3 rounded-lg border border-gray-200">
                <h4 className="text-sm font-semibold mb-2">近期检测趋势</h4>
                <ResponsiveContainer width="100%" height={150}>
                  <LineChart data={dashboardData.trend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#3b82f6" />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* 问题结构分布 */}
              <div className="bg-white p-3 rounded-lg border border-gray-200">
                <h4 className="text-sm font-semibold mb-2">问题结构分布</h4>
                <ResponsiveContainer width="100%" height={150}>
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
                      {dashboardData.defectDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* 实时状态 */}
              <div className="bg-white p-3 rounded-lg border border-gray-200">
                <h4 className="text-sm font-semibold mb-2">实时产线状态</h4>
                <div className="space-y-2">
                  {dashboardData.lineStatus.map((line, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm">{line.name}</span>
                      <span className={`text-sm px-2 py-1 rounded ${line.status === '运行中' ? 'bg-success/10 text-success' : 'bg-gray-100 text-gray-600'}`}>
                        {line.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 待办事项 */}
            <div className="mt-4 bg-white p-3 rounded-lg border border-gray-200">
              <h4 className="text-sm font-semibold mb-2">待办事项提醒</h4>
              <div className="space-y-2">
                {dashboardData.todoList.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
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
          </ModuleCard>

          {/* 模块2：检测管理 */}
          <ModuleCard 
            id={2} 
            title="检测管理" 
            description="负责单次检测和检测记录查询，是系统核心业务模块之一。" 
            features={[
              '实时检测监控',
              '检测记录查询',
              '单件检测详情',
              '批量检测回溯'
            ]}
            color="bg-success"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 手机多角度图片 */}
              <div className="bg-white p-3 rounded-lg border border-gray-200">
                <h4 className="text-sm font-semibold mb-2">手机多角度检测</h4>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <div key={i} className="bg-gray-100 rounded-lg h-16 flex items-center justify-center">
                      <span>📱</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 检测记录查询 */}
              <div className="bg-white p-3 rounded-lg border border-gray-200">
                <h4 className="text-sm font-semibold mb-2">检测记录查询</h4>
                <div className="overflow-x-auto">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>序号</th>
                        <th>序列号</th>
                        <th>型号</th>
                        <th>状态</th>
                        <th>时间</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inspectionData.recentInspections.map((item) => (
                        <tr key={item.id}>
                          <td>{item.id}</td>
                          <td className="text-sm">{item.serial}</td>
                          <td className="text-sm">{item.model}</td>
                          <td>
                            <span className={`text-xs px-2 py-1 rounded ${item.status === '通过' ? 'bg-success/10 text-success' : item.status === 'NG' ? 'bg-danger/10 text-danger' : 'bg-warning/10 text-warning'}`}>
                              {item.status}
                            </span>
                          </td>
                          <td className="text-sm">{item.time}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 缺陷类型分布 */}
              <div className="bg-white p-3 rounded-lg border border-gray-200">
                <h4 className="text-sm font-semibold mb-2">缺陷类型分布</h4>
                <ResponsiveContainer width="100%" height={150}>
                  <BarChart data={inspectionData.defectTypes}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* 单件检测详情 */}
              <div className="bg-white p-3 rounded-lg border border-gray-200">
                <h4 className="text-sm font-semibold mb-2">单件检测详情</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>序列号：</span>
                    <span>SN20240501002</span>
                  </div>
                  <div className="flex justify-between">
                    <span>型号：</span>
                    <span>iPhone 15 Pro</span>
                  </div>
                  <div className="flex justify-between">
                    <span>缺陷类型：</span>
                    <span>划痕</span>
                  </div>
                  <div className="flex justify-between">
                    <span>缺陷位置：</span>
                    <span>屏幕左上角</span>
                  </div>
                  <div className="flex justify-between">
                    <span>AI初判：</span>
                    <span className="text-danger">NG</span>
                  </div>
                  <div className="flex justify-between">
                    <span>规则命中：</span>
                    <span>划痕检测规则 v1.2</span>
                  </div>
                </div>
              </div>
            </div>
          </ModuleCard>

          {/* 模块3：复判与处置 */}
          <ModuleCard 
            id={3} 
            title="复判与处置" 
            description="处理自动 NG、边界 Case、风险放行候选等问题件。" 
            features={[
              '复判任务列表',
              '复判工作台',
              '处置决策',
              '复判记录追溯'
            ]}
            color="bg-warning"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* 左侧任务列表 */}
              <div className="bg-white p-3 rounded-lg border border-gray-200">
                <h4 className="text-sm font-semibold mb-2">复判任务列表</h4>
                <div className="space-y-2">
                  {reviewData.tasks.map((task) => (
                    <div key={task.id} className="p-2 border border-gray-100 rounded-lg hover:bg-gray-50">
                      <div className="text-sm font-medium">{task.serial}</div>
                      <div className="text-xs text-gray-600">{task.model}</div>
                      <div className="text-xs mt-1">
                        <span className="mr-2">缺陷：{task.defect}</span>
                        <span className={`px-1 py-0.5 rounded ${task.priority === '高' ? 'bg-danger/10 text-danger' : task.priority === '中' ? 'bg-warning/10 text-warning' : 'bg-gray-100 text-gray-600'}`}>
                          {task.priority}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 中间工件大图 */}
              <div className="bg-white p-3 rounded-lg border border-gray-200">
                <h4 className="text-sm font-semibold mb-2">工件图像</h4>
                <div className="bg-gray-100 rounded-lg h-40 flex items-center justify-center mb-2">
                  <span className="text-4xl">📱</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-gray-100 rounded-lg h-12 flex items-center justify-center">
                      <span>🔍</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 右侧判定依据 */}
              <div className="bg-white p-3 rounded-lg border border-gray-200">
                <h4 className="text-sm font-semibold mb-2">判定依据</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium">客户标准：</span>
                    <span>苹果标准包 v1.0</span>
                  </div>
                  <div>
                    <span className="font-medium">相似案例：</span>
                    <span>3个类似案例</span>
                  </div>
                  <div>
                    <span className="font-medium">AI理由：</span>
                    <span>划痕长度超过阈值</span>
                  </div>
                  <div>
                    <span className="font-medium">风险建议：</span>
                    <span className="text-warning">建议NG</span>
                  </div>
                </div>

                {/* 处置按钮 */}
                <div className="mt-4 space-y-2">
                  <h4 className="text-sm font-semibold mb-2">处置决策</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {reviewData.decisionOptions.map((option, index) => (
                      <button key={index} className="btn btn-outline text-xs">
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ModuleCard>

          {/* 模块4：质量监控 */}
          <ModuleCard 
            id={4} 
            title="质量监控" 
            description="从质量管理视角查看良率、缺陷结构、趋势和批量风险。" 
            features={[
              '良率与趋势分析',
              '缺陷分布分析',
              '异常趋势监控',
              '批量风险监控'
            ]}
            color="bg-info"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 良率趋势 */}
              <div className="bg-white p-3 rounded-lg border border-gray-200">
                <h4 className="text-sm font-semibold mb-2">良率趋势分析</h4>
                <ResponsiveContainer width="100%" height={150}>
                  <LineChart data={qualityData.yieldTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[95, 100]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#10b981" />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* 缺陷趋势 */}
              <div className="bg-white p-3 rounded-lg border border-gray-200">
                <h4 className="text-sm font-semibold mb-2">缺陷趋势分析</h4>
                <ResponsiveContainer width="100%" height={150}>
                  <BarChart data={qualityData.defectTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#ef4444" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* 异常告警 */}
              <div className="bg-white p-3 rounded-lg border border-gray-200">
                <h4 className="text-sm font-semibold mb-2">异常告警</h4>
                <div className="space-y-2">
                  {qualityData.riskAlerts.map((alert) => (
                    <div key={alert.id} className="p-2 border border-gray-100 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{alert.type}</span>
                        <span className={`text-xs px-2 py-1 rounded ${alert.level === '高' ? 'bg-danger/10 text-danger' : alert.level === '中' ? 'bg-warning/10 text-warning' : 'bg-gray-100 text-gray-600'}`}>
                          {alert.level}
                        </span>
                      </div>
                      <div className="text-xs text-gray-600 mt-1">{alert.description}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 批量风险 */}
              <div className="bg-white p-3 rounded-lg border border-gray-200">
                <h4 className="text-sm font-semibold mb-2">批量风险监控</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center p-2 border border-gray-100 rounded-lg">
                    <span>线体A - 批次20240501</span>
                    <span className="text-danger">高风险</span>
                  </div>
                  <div className="flex justify-between items-center p-2 border border-gray-100 rounded-lg">
                    <span>线体B - 批次20240502</span>
                    <span className="text-warning">中风险</span>
                  </div>
                  <div className="flex justify-between items-center p-2 border border-gray-100 rounded-lg">
                    <span>线体C - 批次20240503</span>
                    <span className="text-success">低风险</span>
                  </div>
                </div>
              </div>
            </div>
          </ModuleCard>

          {/* 模块5：规则与标准 */}
          <ModuleCard 
            id={5} 
            title="规则与标准" 
            description="管理客户标准包、缺陷规则、接管策略和版本。" 
            features={[
              '客户标准管理',
              '缺陷规则管理',
              '接管策略管理',
              '版本与发布管理'
            ]}
            color="bg-primary"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 客户标准管理 */}
              <div className="bg-white p-3 rounded-lg border border-gray-200">
                <h4 className="text-sm font-semibold mb-2">客户标准管理</h4>
                <div className="overflow-x-auto">
                  <table className="table">
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
                        <tr key={standard.id}>
                          <td className="text-sm">{standard.name}</td>
                          <td className="text-sm">{standard.client}</td>
                          <td className="text-sm">{standard.version}</td>
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
              <div className="bg-white p-3 rounded-lg border border-gray-200">
                <h4 className="text-sm font-semibold mb-2">缺陷规则管理</h4>
                <div className="overflow-x-auto">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>规则名称</th>
                        <th>严重程度</th>
                        <th>状态</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ruleData.rules.map((rule) => (
                        <tr key={rule.id}>
                          <td className="text-sm">{rule.name}</td>
                          <td className="text-sm">{rule.severity}</td>
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
              <div className="bg-white p-3 rounded-lg border border-gray-200">
                <h4 className="text-sm font-semibold mb-2">接管策略管理</h4>
                <div className="space-y-2 text-sm">
                  <div className="p-2 border border-gray-100 rounded-lg">
                    <div className="font-medium">AI置信度 &lt; 70% → 人工复判</div>
                    <div className="text-xs text-gray-600 mt-1">适用于所有缺陷类型</div>
                  </div>
                  <div className="p-2 border border-gray-100 rounded-lg">
                    <div className="font-medium">批量异常 → 暂停生产</div>
                    <div className="text-xs text-gray-600 mt-1">连续5个相同缺陷</div>
                  </div>
                  <div className="p-2 border border-gray-100 rounded-lg">
                    <div className="font-medium">新机型 → 严格模式</div>
                    <div className="text-xs text-gray-600 mt-1">前1000件全部人工审核</div>
                  </div>
                </div>
              </div>

              {/* 版本与发布管理 */}
              <div className="bg-white p-3 rounded-lg border border-gray-200">
                <h4 className="text-sm font-semibold mb-2">版本与发布管理</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center p-2 border border-gray-100 rounded-lg">
                    <span>规则包 v2.1</span>
                    <span className="text-success">已发布</span>
                  </div>
                  <div className="flex justify-between items-center p-2 border border-gray-100 rounded-lg">
                    <span>规则包 v2.0</span>
                    <span className="text-success">已发布</span>
                  </div>
                  <div className="flex justify-between items-center p-2 border border-gray-100 rounded-lg">
                    <span>规则包 v1.9</span>
                    <span className="text-gray-600">已归档</span>
                  </div>
                </div>
              </div>
            </div>
          </ModuleCard>

          {/* 模块6：系统管理 */}
          <ModuleCard 
            id={6} 
            title="系统管理" 
            description="管理用户、角色、权限、系统配置和审计。" 
            features={[
              '用户管理',
              '角色与权限管理',
              '系统配置管理',
              '日志与审计'
            ]}
            color="bg-dark"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 用户管理 */}
              <div className="bg-white p-3 rounded-lg border border-gray-200">
                <h4 className="text-sm font-semibold mb-2">用户管理</h4>
                <div className="overflow-x-auto">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>用户名</th>
                        <th>角色</th>
                        <th>状态</th>
                      </tr>
                    </thead>
                    <tbody>
                      {systemData.users.map((user) => (
                        <tr key={user.id}>
                          <td className="text-sm">{user.name}</td>
                          <td className="text-sm">{user.role}</td>
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
              <div className="bg-white p-3 rounded-lg border border-gray-200">
                <h4 className="text-sm font-semibold mb-2">角色与权限管理</h4>
                <div className="space-y-2 text-sm">
                  {systemData.roles.map((role) => (
                    <div key={role.id} className="p-2 border border-gray-100 rounded-lg">
                      <div className="font-medium">{role.name}</div>
                      <div className="text-xs text-gray-600 mt-1">权限值：{role.permissions}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 系统配置管理 */}
              <div className="bg-white p-3 rounded-lg border border-gray-200">
                <h4 className="text-sm font-semibold mb-2">系统配置管理</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center">
                    <span>检测超时阈值</span>
                    <span>30秒</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>批量异常阈值</span>
                    <span>5个</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>AI置信度阈值</span>
                    <span>70%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>数据保留期限</span>
                    <span>90天</span>
                  </div>
                </div>
              </div>

              {/* 日志与审计 */}
              <div className="bg-white p-3 rounded-lg border border-gray-200">
                <h4 className="text-sm font-semibold mb-2">日志与审计</h4>
                <div className="space-y-2 text-xs">
                  <div className="p-1 border border-gray-100 rounded-lg">
                    <div>管理员 - 登录系统</div>
                    <div className="text-gray-600">2024-05-01 14:00:00</div>
                  </div>
                  <div className="p-1 border border-gray-100 rounded-lg">
                    <div>质检员A - 更新检测规则</div>
                    <div className="text-gray-600">2024-05-01 13:30:00</div>
                  </div>
                  <div className="p-1 border border-gray-100 rounded-lg">
                    <div>工程师B - 批量导入数据</div>
                    <div className="text-gray-600">2024-05-01 12:15:00</div>
                  </div>
                </div>
              </div>
            </div>
          </ModuleCard>

          {/* 模块7：数据与报表 */}
          <ModuleCard 
            id={7} 
            title="数据与报表" 
            description="支持导出、看板配置和自定义报表。" 
            features={[
              '自定义报表',
              '数据导出',
              '数据看板配置'
            ]}
            color="bg-secondary"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 自定义报表 */}
              <div className="bg-white p-3 rounded-lg border border-gray-200">
                <h4 className="text-sm font-semibold mb-2">自定义报表</h4>
                <div className="space-y-2">
                  {reportData.reportTypes.map((report) => (
                    <div key={report.id} className="flex justify-between items-center p-2 border border-gray-100 rounded-lg">
                      <span className="text-sm">{report.name}</span>
                      <span className="text-xs px-2 py-1 bg-gray-100 rounded">{report.format}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 数据导出 */}
              <div className="bg-white p-3 rounded-lg border border-gray-200">
                <h4 className="text-sm font-semibold mb-2">数据导出</h4>
                <div className="flex flex-wrap gap-2">
                  <button className="btn btn-outline text-xs">导出 Excel</button>
                  <button className="btn btn-outline text-xs">导出 CSV</button>
                  <button className="btn btn-outline text-xs">导出 PDF</button>
                  <button className="btn btn-outline text-xs">导出 JSON</button>
                </div>
                <div className="mt-4">
                  <h5 className="text-xs font-semibold mb-2">导出范围</h5>
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span>最近7天</span>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span>最近30天</span>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span>自定义时间范围</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 数据看板配置 */}
              <div className="bg-white p-3 rounded-lg border border-gray-200 col-span-1 md:col-span-2">
                <h4 className="text-sm font-semibold mb-2">数据看板配置</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {reportData.dashboards.map((dashboard) => (
                    <div key={dashboard.id} className="border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow">
                      <h5 className="font-medium text-sm">{dashboard.name}</h5>
                      <p className="text-xs text-gray-600 mt-1">{dashboard.widgets} 个组件</p>
                      <div className="mt-2 bg-gray-50 rounded h-20 flex items-center justify-center">
                        <span>📊</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ModuleCard>

          {/* 模块8：我的工作 */}
          <ModuleCard 
            id={8} 
            title="我的工作" 
            description="承接个人任务、审批、待办和收藏。" 
            features={[
              '我的待办',
              '我的复判',
              '我的审批',
              '我的收藏'
            ]}
            color="bg-success"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 我的待办 */}
              <div className="bg-white p-3 rounded-lg border border-gray-200">
                <h4 className="text-sm font-semibold mb-2">我的待办</h4>
                <div className="space-y-2">
                  {myWorkData.todos.map((todo) => (
                    <div key={todo.id} className="p-2 border border-gray-100 rounded-lg">
                      <div className="text-sm font-medium">{todo.title}</div>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-xs text-gray-600">截止：{todo.deadline}</span>
                        <span className={`text-xs px-2 py-1 rounded ${todo.status === '待处理' ? 'bg-info/10 text-info' : 'bg-warning/10 text-warning'}`}>
                          {todo.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 我的复判 */}
              <div className="bg-white p-3 rounded-lg border border-gray-200">
                <h4 className="text-sm font-semibold mb-2">我的复判</h4>
                <div className="overflow-x-auto">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>序列号</th>
                        <th>结果</th>
                        <th>时间</th>
                      </tr>
                    </thead>
                    <tbody>
                      {myWorkData.reviews.map((review) => (
                        <tr key={review.id}>
                          <td className="text-sm">{review.serial}</td>
                          <td>
                            <span className={`text-xs px-2 py-1 rounded ${review.result === '通过' ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}`}>
                              {review.result}
                            </span>
                          </td>
                          <td className="text-sm">{review.time}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 我的审批 */}
              <div className="bg-white p-3 rounded-lg border border-gray-200">
                <h4 className="text-sm font-semibold mb-2">我的审批</h4>
                <div className="space-y-2 text-sm">
                  <div className="p-2 border border-gray-100 rounded-lg">
                    <div className="font-medium">批量风险审批</div>
                    <div className="text-xs text-gray-600 mt-1">线体A - 批次20240501</div>
                    <div className="text-xs text-gray-600 mt-1">状态：待审批</div>
                  </div>
                  <div className="p-2 border border-gray-100 rounded-lg">
                    <div className="font-medium">规则更新审批</div>
                    <div className="text-xs text-gray-600 mt-1">划痕检测规则 v1.3</div>
                    <div className="text-xs text-gray-600 mt-1">状态：已审批</div>
                  </div>
                </div>
              </div>

              {/* 我的收藏 */}
              <div className="bg-white p-3 rounded-lg border border-gray-200">
                <h4 className="text-sm font-semibold mb-2">我的收藏</h4>
                <div className="space-y-2">
                  <div className="flex items-center p-2 border border-gray-100 rounded-lg hover:bg-gray-50">
                    <span className="mr-3">📏</span>
                    <span className="text-sm">划痕检测规则 v1.2</span>
                  </div>
                  <div className="flex items-center p-2 border border-gray-100 rounded-lg hover:bg-gray-50">
                    <span className="mr-3">📊</span>
                    <span className="text-sm">生产概览看板</span>
                  </div>
                  <div className="flex items-center p-2 border border-gray-100 rounded-lg hover:bg-gray-50">
                    <span className="mr-3">⚙️</span>
                    <span className="text-sm">系统配置页面</span>
                  </div>
                </div>
              </div>
            </div>
          </ModuleCard>
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