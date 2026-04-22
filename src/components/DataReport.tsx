import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface DataReportProps {
  role: string;
}

const DataReport: React.FC<DataReportProps> = () => {
  // 搜索条件状态
  const [searchParams, setSearchParams] = useState({
    dateRange: '近7天',
    productModel: '',
    line: '',
    workOrder: ''
  });

  // 图表类型状态
  const [chartType, setChartType] = useState('line'); // line 或 bar
  
  // 时间粒度状态
  const [timeGranularity, setTimeGranularity] = useState('day'); // day, week, month

  // 处理搜索参数变化
  const handleSearchParamChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({ ...prev, [name]: value }));
  };

  // 处理搜索
  const handleSearch = () => {
    console.log('搜索参数:', searchParams);
    // 这里可以添加搜索逻辑
  };

  // 处理重置
  const handleReset = () => {
    setSearchParams({
      dateRange: '近7天',
      productModel: '',
      line: '',
      workOrder: ''
    });
  };

  // 处理Enter键触发搜索
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // 处理导出
  const handleExport = () => {
    console.log('导出数据');
    // 这里可以添加导出逻辑
  };

  // 处理图表点击联动
  const handleChartClick = (data: any) => {
    console.log('图表点击:', data);
    // 这里可以添加图表点击联动逻辑
  };

  // 模拟数据 - 日/周/月
  const getInspectionTrendData = () => {
    if (timeGranularity === 'day') {
      return [
        { date: '5/1', value: 1200 },
        { date: '5/2', value: 1350 },
        { date: '5/3', value: 1180 },
        { date: '5/4', value: 1420 },
        { date: '5/5', value: 1300 },
        { date: '5/6', value: 1250 },
        { date: '5/7', value: 1480 },
      ];
    } else if (timeGranularity === 'week') {
      return [
        { date: '第1周', value: 8500 },
        { date: '第2周', value: 9200 },
        { date: '第3周', value: 8800 },
        { date: '第4周', value: 9500 },
      ];
    } else {
      return [
        { date: '1月', value: 8540 },
        { date: '2月', value: 9230 },
        { date: '3月', value: 10560 },
        { date: '4月', value: 11870 },
        { date: '5月', value: 12548 },
      ];
    }
  };

  const getDefectRateTrendData = () => {
    if (timeGranularity === 'day') {
      return [
        { date: '5/1', value: 2.1 },
        { date: '5/2', value: 1.8 },
        { date: '5/3', value: 2.3 },
        { date: '5/4', value: 1.9 },
        { date: '5/5', value: 2.0 },
        { date: '5/6', value: 1.7 },
        { date: '5/7', value: 1.6 },
      ];
    } else if (timeGranularity === 'week') {
      return [
        { date: '第1周', value: 2.0 },
        { date: '第2周', value: 1.9 },
        { date: '第3周', value: 1.8 },
        { date: '第4周', value: 1.7 },
      ];
    } else {
      return [
        { date: '1月', value: 3.5 },
        { date: '2月', value: 2.8 },
        { date: '3月', value: 2.2 },
        { date: '4月', value: 1.9 },
        { date: '5月', value: 1.8 },
      ];
    }
  };

  const lineComparisonData = [
    { name: '线体A', value: 12548 },
    { name: '线体B', value: 10234 },
    { name: '线体C', value: 8765 },
  ];

  const productComparisonData = [
    { name: 'iPhone 15', value: 15678 },
    { name: 'iPhone 15 Pro', value: 12345 },
    { name: 'iPhone 15 Pro Max', value: 8923 },
  ];

  const topDefectsData = [
    { name: '划痕', value: 45 },
    { name: '变形', value: 25 },
    { name: '污渍', value: 15 },
    { name: '色差', value: 10 },
    { name: '其他', value: 5 },
  ];

  const qualityMetricsData = [
    { name: '一次通过率', value: 95.2 },
    { name: '复判通过率', value: 88.7 },
    { name: '漏检率', value: 0.5 },
    { name: '误判率', value: 1.2 },
  ];

  const batchQualityData = [
    { name: '批次A', pass: 98, fail: 2 },
    { name: '批次B', pass: 95, fail: 5 },
    { name: '批次C', pass: 92, fail: 8 },
    { name: '批次D', pass: 97, fail: 3 },
  ];

  // 颜色配置
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">数据与报表</h2>
      
      {/* 搜索筛选栏 */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4 hover:shadow-md transition-all duration-300">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">日期范围</label>
            <select 
              name="dateRange" 
              value={searchParams.dateRange} 
              onChange={handleSearchParamChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
            >
              <option value="近7天">近7天</option>
              <option value="近30天">近30天</option>
              <option value="近90天">近90天</option>
              <option value="自定义">自定义</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">产品型号</label>
            <select 
              name="productModel" 
              value={searchParams.productModel} 
              onChange={handleSearchParamChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
            >
              <option value="">请选择</option>
              <option value="iPhone 15">iPhone 15</option>
              <option value="iPhone 15 Pro">iPhone 15 Pro</option>
              <option value="iPhone 15 Pro Max">iPhone 15 Pro Max</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">线体</label>
            <select 
              name="line" 
              value={searchParams.line} 
              onChange={handleSearchParamChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
            >
              <option value="">请选择</option>
              <option value="A">线体A</option>
              <option value="B">线体B</option>
              <option value="C">线体C</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">工单号</label>
            <input 
              type="text" 
              name="workOrder" 
              value={searchParams.workOrder} 
              onChange={handleSearchParamChange}
              onKeyPress={handleKeyPress}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
              placeholder="输入工单号"
            />
          </div>
        </div>
        <div className="flex justify-end mt-4 space-x-3">
          <button 
            onClick={handleReset}
            className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg text-sm hover:bg-gray-300 transition-colors duration-200"
          >
            重置
          </button>
          <button 
            onClick={handleSearch}
            className="bg-primary text-white py-2 px-6 rounded-lg text-sm hover:bg-blue-700 transition-colors duration-200 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            查询
          </button>
          <button 
            onClick={handleExport}
            className="bg-success text-white py-2 px-6 rounded-lg text-sm hover:bg-green-700 transition-colors duration-200 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            导出 Excel
          </button>
        </div>
      </div>

      {/* 图表类型和时间粒度切换 */}
      <div className="flex justify-end mb-4 space-x-4">
        <div className="flex space-x-3">
          <button 
            onClick={() => setChartType('line')}
            className={`py-1 px-4 rounded-lg text-sm ${chartType === 'line' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-800'} transition-colors duration-200`}
          >
            折线图
          </button>
          <button 
            onClick={() => setChartType('bar')}
            className={`py-1 px-4 rounded-lg text-sm ${chartType === 'bar' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-800'} transition-colors duration-200`}
          >
            柱状图
          </button>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={() => setTimeGranularity('day')}
            className={`py-1 px-4 rounded-lg text-sm ${timeGranularity === 'day' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-800'} transition-colors duration-200`}
          >
            日
          </button>
          <button 
            onClick={() => setTimeGranularity('week')}
            className={`py-1 px-4 rounded-lg text-sm ${timeGranularity === 'week' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-800'} transition-colors duration-200`}
          >
            周
          </button>
          <button 
            onClick={() => setTimeGranularity('month')}
            className={`py-1 px-4 rounded-lg text-sm ${timeGranularity === 'month' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-800'} transition-colors duration-200`}
          >
            月
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 检测量趋势 */}
        <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all duration-300">
          <h4 className="text-sm font-semibold mb-3">检测量趋势</h4>
          <ResponsiveContainer width="100%" height={220}>
            {chartType === 'line' ? (
              <LineChart data={getInspectionTrendData()} onClick={handleChartClick}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#3b82f6" name="检测量" strokeWidth={2} />
              </LineChart>
            ) : (
              <BarChart data={getInspectionTrendData()} onClick={handleChartClick}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#3b82f6" name="检测量" radius={[4, 4, 0, 0]} />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* 不良率趋势 */}
        <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all duration-300">
          <h4 className="text-sm font-semibold mb-3">不良率趋势</h4>
          <ResponsiveContainer width="100%" height={220}>
            {chartType === 'line' ? (
              <LineChart data={getDefectRateTrendData()} onClick={handleChartClick}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#ef4444" name="不良率 (%)" strokeWidth={2} />
              </LineChart>
            ) : (
              <BarChart data={getDefectRateTrendData()} onClick={handleChartClick}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#ef4444" name="不良率 (%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* 各线体对比 */}
        <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all duration-300">
          <h4 className="text-sm font-semibold mb-3">各线体对比</h4>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={lineComparisonData} onClick={handleChartClick}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#00C49F" name="检测量" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 各产品对比 */}
        <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all duration-300">
          <h4 className="text-sm font-semibold mb-3">各产品对比</h4>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={productComparisonData} onClick={handleChartClick}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#FFBB28" name="检测量" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* TOP缺陷排行 */}
        <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all duration-300">
          <h4 className="text-sm font-semibold mb-3">TOP缺陷排行</h4>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={topDefectsData} layout="vertical" onClick={handleChartClick}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" name="占比 (%)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 缺陷类型分布 */}
        <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all duration-300">
          <h4 className="text-sm font-semibold mb-3">缺陷类型分布</h4>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart onClick={handleChartClick}>
              <Pie
                data={topDefectsData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                label
              >
                {topDefectsData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* 质量指标 */}
        <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all duration-300">
          <h4 className="text-sm font-semibold mb-3">质量指标</h4>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={qualityMetricsData} onClick={handleChartClick}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#3b82f6" name="数值 (%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 批次质量分布 */}
        <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all duration-300">
          <h4 className="text-sm font-semibold mb-3">批次质量分布</h4>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={batchQualityData} onClick={handleChartClick}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="pass" stackId="a" fill="#10b981" name="通过" />
              <Bar dataKey="fail" stackId="a" fill="#ef4444" name="失败" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* SN检测轨迹 */}
        <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all duration-300 col-span-1 md:col-span-2">
          <h4 className="text-sm font-semibold mb-3">SN检测轨迹</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
              <span className="text-sm font-medium">SN20240501002</span>
              <div className="flex items-center space-x-3">
                <span className="text-xs px-2 py-1 bg-success/10 text-success">检测通过</span>
                <span className="text-xs text-gray-600">2024-05-01 14:30</span>
              </div>
            </div>
            <div className="flex justify-between items-center p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
              <span className="text-sm font-medium">SN20240501001</span>
              <div className="flex items-center space-x-3">
                <span className="text-xs px-2 py-1 bg-success/10 text-success">检测通过</span>
                <span className="text-xs text-gray-600">2024-05-01 14:28</span>
              </div>
            </div>
            <div className="flex justify-between items-center p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
              <span className="text-sm font-medium">SN20240501003</span>
              <div className="flex items-center space-x-3">
                <span className="text-xs px-2 py-1 bg-warning/10 text-warning">边界件</span>
                <span className="text-xs text-gray-600">2024-05-01 14:25</span>
              </div>
            </div>
          </div>
        </div>

        {/* 工单质量统计 */}
        <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all duration-300 col-span-1 md:col-span-2">
          <h4 className="text-sm font-semibold mb-3">工单质量统计</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm table">
              <thead>
                <tr>
                  <th>工单号</th>
                  <th>产品型号</th>
                  <th>检测数量</th>
                  <th>通过数量</th>
                  <th>失败数量</th>
                  <th>通过率</th>
                </tr>
              </thead>
              <tbody>
                <tr className="cursor-pointer hover:bg-gray-50 transition-colors duration-200">
                  <td>WO20240501001</td>
                  <td>iPhone 15 Pro</td>
                  <td>1000</td>
                  <td>985</td>
                  <td>15</td>
                  <td className="text-success">98.5%</td>
                </tr>
                <tr className="cursor-pointer hover:bg-gray-50 transition-colors duration-200">
                  <td>WO20240501002</td>
                  <td>iPhone 15</td>
                  <td>1200</td>
                  <td>1176</td>
                  <td>24</td>
                  <td className="text-success">98.0%</td>
                </tr>
                <tr className="cursor-pointer hover:bg-gray-50 transition-colors duration-200">
                  <td>WO20240501003</td>
                  <td>iPhone 15 Pro Max</td>
                  <td>800</td>
                  <td>784</td>
                  <td>16</td>
                  <td className="text-success">98.0%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataReport;