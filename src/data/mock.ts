// 模拟数据

// 工作台数据
export const dashboardData = {
  kpi: [
    { name: '检测总量', value: '12,548', change: '+12.5%', trend: 'up' },
    { name: '通过率', value: '98.2%', change: '+0.8%', trend: 'up' },
    { name: '异常率', value: '1.8%', change: '-0.3%', trend: 'down' },
    { name: '待处理数', value: '245', change: '+12', trend: 'up' },
  ],
  trend: [
    { date: '1月', value: 8540 },
    { date: '2月', value: 9230 },
    { date: '3月', value: 10560 },
    { date: '4月', value: 11870 },
    { date: '5月', value: 12548 },
  ],
  defectDistribution: [
    { name: '划痕', value: 45 },
    { name: '变形', value: 25 },
    { name: '污渍', value: 15 },
    { name: '其他', value: 15 },
  ],
  lineStatus: [
    { name: '线体A', status: '运行中', efficiency: '98%' },
    { name: '线体B', status: '运行中', efficiency: '96%' },
    { name: '线体C', status: '待机', efficiency: '0%' },
  ],
  todoList: [
    { id: 1, title: '边界件待复判', count: 12, priority: '高' },
    { id: 2, title: '批量风险待审批', count: 5, priority: '中' },
    { id: 3, title: '规则更新待确认', count: 3, priority: '低' },
  ],
};

// 检测管理数据
export const inspectionData = {
  recentInspections: [
    { id: 1, serial: 'SN20240501001', model: 'iPhone 15 Pro', status: '通过', time: '2024-05-01 14:30' },
    { id: 2, serial: 'SN20240501002', model: 'iPhone 15 Pro', status: 'NG', time: '2024-05-01 14:28' },
    { id: 3, serial: 'SN20240501003', model: 'iPhone 15', status: '通过', time: '2024-05-01 14:25' },
    { id: 4, serial: 'SN20240501004', model: 'iPhone 15', status: '边界', time: '2024-05-01 14:22' },
  ],
  defectTypes: [
    { id: 1, name: '划痕', severity: '轻度', count: 128 },
    { id: 2, name: '变形', severity: '中度', count: 45 },
    { id: 3, name: '污渍', severity: '轻度', count: 89 },
    { id: 4, name: '色差', severity: '轻度', count: 67 },
  ],
};

// 复判与处置数据
export const reviewData = {
  tasks: [
    { id: 1, serial: 'SN20240501002', model: 'iPhone 15 Pro', defect: '划痕', priority: '高' },
    { id: 2, serial: 'SN20240501004', model: 'iPhone 15', defect: '变形', priority: '中' },
    { id: 3, serial: 'SN20240501005', model: 'iPhone 15 Pro', defect: '污渍', priority: '低' },
  ],
  decisionOptions: ['放行', 'NG', '返修', '隔离', '批量评估'],
};

// 质量监控数据
export const qualityData = {
  yieldTrend: [
    { date: '1月', value: 96.5 },
    { date: '2月', value: 97.2 },
    { date: '3月', value: 97.8 },
    { date: '4月', value: 98.0 },
    { date: '5月', value: 98.2 },
  ],
  defectTrend: [
    { date: '1月', value: 350 },
    { date: '2月', value: 320 },
    { date: '3月', value: 280 },
    { date: '4月', value: 250 },
    { date: '5月', value: 220 },
  ],
  riskAlerts: [
    { id: 1, type: '批量风险', level: '高', description: '线体A连续出现5个同类型缺陷' },
    { id: 2, type: '异常趋势', level: '中', description: '线体B良率下降2%' },
    { id: 3, type: '规则警告', level: '低', description: '新规则与历史数据匹配度低' },
  ],
};

// 规则与标准数据
export const ruleData = {
  standards: [
    { id: 1, name: '苹果标准包 v1.0', client: 'Apple', version: '1.0', status: '生效中' },
    { id: 2, name: '三星标准包 v2.1', client: 'Samsung', version: '2.1', status: '生效中' },
    { id: 3, name: '小米标准包 v3.0', client: 'Xiaomi', version: '3.0', status: '测试中' },
  ],
  rules: [
    { id: 1, name: '划痕检测规则', severity: '中度', status: '启用' },
    { id: 2, name: '变形检测规则', severity: '高度', status: '启用' },
    { id: 3, name: '污渍检测规则', severity: '轻度', status: '启用' },
    { id: 4, name: '色差检测规则', severity: '轻度', status: '禁用' },
  ],
};

// 系统管理数据
export const systemData = {
  users: [
    { id: 1, name: '管理员', role: '系统管理员', status: '活跃' },
    { id: 2, name: '质检员A', role: '质检员', status: '活跃' },
    { id: 3, name: '工程师B', role: '工程师', status: '活跃' },
    { id: 4, name: '审核员C', role: '审核员', status: '离线' },
  ],
  roles: [
    { id: 1, name: '系统管理员', permissions: 255 },
    { id: 2, name: '质检员', permissions: 128 },
    { id: 3, name: '工程师', permissions: 192 },
    { id: 4, name: '审核员', permissions: 64 },
  ],
};

// 数据与报表数据
export const reportData = {
  reportTypes: [
    { id: 1, name: '每日检测报告', format: 'Excel' },
    { id: 2, name: '周度质量报告', format: 'PDF' },
    { id: 3, name: '月度缺陷分析', format: 'CSV' },
  ],
  dashboards: [
    { id: 1, name: '生产概览', widgets: 5 },
    { id: 2, name: '质量分析', widgets: 4 },
    { id: 3, name: '效率监控', widgets: 3 },
  ],
};

// 我的工作数据
export const myWorkData = {
  todos: [
    { id: 1, title: '复判SN20240501002', deadline: '2024-05-01 18:00', status: '待处理' },
    { id: 2, title: '审批批量风险', deadline: '2024-05-02 10:00', status: '待处理' },
    { id: 3, title: '更新检测规则', deadline: '2024-05-03 12:00', status: '进行中' },
  ],
  reviews: [
    { id: 1, serial: 'SN20240501002', result: 'NG', time: '2024-05-01 15:30' },
    { id: 2, serial: 'SN20240501001', result: '通过', time: '2024-05-01 14:45' },
  ],
};

// 详细检测数据（100条）
export const detailedInspectionData = (() => {
  const data = [];
  const productModels = ['iPhone 15 Pro', 'iPhone 15', 'iPhone 14 Pro', 'iPhone 14', 'iPhone 13'];
  const lines = ['A', 'B', 'C'];
  const stations = ['外观检测', '功能检测', '包装检测'];
  const defectTypes = ['划痕', '变形', '污渍', '色差', '装配不良'];
  const defectLevels = ['高', '中', '低'];
  const statuses = ['未处理', '处理中', '已处理'];
  const results = ['OK', 'NG'];
  const operators = ['张三', '李四', '王五', '赵六', '钱七'];
  const reviewers = ['孙八', '周九', '吴十', '郑一', '王二'];
  
  // 生成最近7天的日期
  const getRandomDate = () => {
    const today = new Date();
    const daysAgo = Math.floor(Math.random() * 7);
    const date = new Date(today);
    date.setDate(date.getDate() - daysAgo);
    return date.toISOString().split('T')[0];
  };
  
  for (let i = 1; i <= 100; i++) {
    const result = results[Math.floor(Math.random() * results.length)];
    const hasDefect = result === 'NG';
    
    data.push({
      id: i,
      sn: `SN${20240500000 + i}`,
      batch: `B${202405000 + Math.floor((i - 1) / 20) + 1}`,
      productModel: productModels[Math.floor(Math.random() * productModels.length)],
      line: lines[Math.floor(Math.random() * lines.length)],
      station: stations[Math.floor(Math.random() * stations.length)],
      defectType: hasDefect ? defectTypes[Math.floor(Math.random() * defectTypes.length)] : null,
      defectLevel: hasDefect ? defectLevels[Math.floor(Math.random() * defectLevels.length)] : null,
      status: hasDefect ? statuses[Math.floor(Math.random() * statuses.length)] : '已处理',
      result,
      date: getRandomDate(),
      operator: operators[Math.floor(Math.random() * operators.length)],
      reviewer: hasDefect ? reviewers[Math.floor(Math.random() * reviewers.length)] : null,
      workOrder: `WO${202405000 + Math.floor((i - 1) / 10) + 1}`,
    });
  }
  
  return data;
})();

// 导航菜单数据
export const navigationData = [
  { id: 1, name: '首页 / 工作台', icon: '🏠', active: true },
  { id: 2, name: '检测管理', icon: '🔍' },
  { id: 3, name: '复判与处置', icon: '⚖️' },
  { id: 4, name: '质量监控', icon: '📊' },
  { id: 5, name: '规则与标准', icon: '📏' },
  { id: 6, name: '系统管理', icon: '⚙️' },
  { id: 7, name: '数据与报表', icon: '📈' },
  { id: 8, name: '我的工作', icon: '👤' },
];

// 设计原则数据
export const designPrinciples = [
  { id: 1, name: '清晰直观', description: '界面布局清晰，操作流程直观，减少用户认知负担' },
  { id: 2, name: '高效操作', description: '优化操作路径，减少不必要的步骤，提高工作效率' },
  { id: 3, name: '状态可视', description: '关键状态实时可见，让用户随时了解系统运行情况' },
  { id: 4, name: '追溯可查', description: '所有操作和决策可追溯，便于问题分析和责任认定' },
  { id: 5, name: '响应式布局', description: '适配不同屏幕尺寸，确保在各种设备上都能正常使用' },
];

// 全局设计元素数据
export const globalElements = [
  { id: 1, name: '顶部导航栏', description: '显示系统名称、用户信息和全局操作' },
  { id: 2, name: '左侧导航菜单', description: '提供系统主要功能模块的快速访问' },
  { id: 3, name: '面包屑导航', description: '显示当前页面路径，便于用户定位' },
  { id: 4, name: '操作按钮区', description: '集中展示页面主要操作按钮' },
  { id: 5, name: '数据展示区', description: '以表格、图表等形式展示数据' },
  { id: 6, name: '详情侧边栏', description: '展示选中项目的详细信息' },
];

// 状态颜色规范数据
export const colorStatus = [
  { id: 1, status: '正常 / 通过', color: 'bg-success text-white', hex: '#10b981' },
  { id: 2, status: '警告 / 关注', color: 'bg-warning text-white', hex: '#f59e0b' },
  { id: 3, status: '异常 / 失败', color: 'bg-danger text-white', hex: '#ef4444' },
  { id: 4, status: '待处理', color: 'bg-info text-white', hex: '#3b82f6' },
  { id: 5, status: '已完成', color: 'bg-dark text-white', hex: '#1e293b' },
  { id: 6, status: '已禁用', color: 'bg-gray-300 text-gray-600', hex: '#cbd5e1' },
];
