import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { qualityData, detailedInspectionData } from '../data/mock';

interface QualityMonitorProps {
  role: string;
}

const QualityMonitor: React.FC<QualityMonitorProps> = () => {
  // 搜索条件状态
  const [searchParams, setSearchParams] = useState({
    dateRange: '近7天',
    productModel: '',
    line: '',
    workOrder: '',
    isAnomaly: ''
  });
  
  // 筛选后的数据
  const [filteredData, setFilteredData] = useState(detailedInspectionData);
  
  // 分页状态
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // 处理搜索参数变化
  const handleSearchParamChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({ ...prev, [name]: value }));
  };

  // 处理搜索
  const handleSearch = () => {
    console.log('搜索参数:', searchParams);
    
    // 筛选逻辑
    const filtered = detailedInspectionData.filter(item => {
      // 日期范围筛选
      if (searchParams.dateRange === '近7天') {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        const itemDate = new Date(item.date);
        if (itemDate < sevenDaysAgo) return false;
      }
      
      // 产品型号筛选
      if (searchParams.productModel && item.productModel !== searchParams.productModel) return false;
      
      // 线体筛选
      if (searchParams.line && item.line !== searchParams.line) return false;
      
      // 工单号筛选
      if (searchParams.workOrder && !item.workOrder.includes(searchParams.workOrder)) return false;
      
      // 是否异常筛选
      if (searchParams.isAnomaly === '是' && item.result === 'OK') return false;
      if (searchParams.isAnomaly === '否' && item.result === 'NG') return false;
      
      return true;
    });
    
    setFilteredData(filtered);
    setCurrentPage(1); // 重置到第一页
  };

  // 处理重置
  const handleReset = () => {
    setSearchParams({
      dateRange: '近7天',
      productModel: '',
      line: '',
      workOrder: '',
      isAnomaly: ''
    });
    setFilteredData(detailedInspectionData);
    setCurrentPage(1);
  };

  // 处理Enter键触发搜索
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">质量监控</h2>
      
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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">是否异常</label>
            <select 
              name="isAnomaly" 
              value={searchParams.isAnomaly} 
              onChange={handleSearchParamChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
            >
              <option value="">请选择</option>
              <option value="是">是</option>
              <option value="否">否</option>
            </select>
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
            className="bg-success text-white py-2 px-6 rounded-lg text-sm hover:bg-green-700 transition-colors duration-200 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            导出
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 良率与趋势分析 */}
        <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all duration-300">
          <h4 className="text-sm font-semibold mb-3">良率与趋势分析</h4>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={qualityData.yieldTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* 缺陷分布分析 */}
        <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all duration-300">
          <h4 className="text-sm font-semibold mb-3">缺陷分布分析</h4>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={qualityData.defectTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 异常趋势监控 */}
        <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all duration-300">
          <h4 className="text-sm font-semibold mb-3">异常趋势监控</h4>
          <div className="space-y-3">
            {qualityData.riskAlerts.map((alert) => (
              <div key={alert.id} className="p-3 border border-gray-100 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors duration-200">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">{alert.type}</span>
                  <span className={`text-xs px-2 py-1 rounded ${alert.level === '高' ? 'bg-danger/10 text-danger' : alert.level === '中' ? 'bg-warning/10 text-warning' : 'bg-info/10 text-info'}`}>
                    {alert.level}
                  </span>
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  {alert.description}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 批量风险监控 */}
        <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all duration-300">
          <h4 className="text-sm font-semibold mb-3">批量风险监控</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center cursor-pointer hover:bg-gray-50 p-3 rounded transition-colors duration-200">
              <span className="text-sm">批次 A20240501</span>
              <span className="text-danger font-medium">异常</span>
            </div>
            <div className="flex justify-between items-center cursor-pointer hover:bg-gray-50 p-3 rounded transition-colors duration-200">
              <span className="text-sm">批次 A20240430</span>
              <span className="text-success font-medium">正常</span>
            </div>
            <div className="flex justify-between items-center cursor-pointer hover:bg-gray-50 p-3 rounded transition-colors duration-200">
              <span className="text-sm">批次 A20240429</span>
              <span className="text-success font-medium">正常</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* 检测数据表格 */}
      <div className="mt-4 bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all duration-300">
        <h4 className="text-sm font-semibold mb-3">检测数据明细</h4>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>序号</th>
                <th>SN</th>
                <th>批次</th>
                <th>产品型号</th>
                <th>线体</th>
                <th>结果</th>
                <th>状态</th>
                <th>日期</th>
                <th>操作人</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData
                  .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                  .map((item) => (
                    <tr key={item.id} className="cursor-pointer hover:bg-gray-50 transition-colors duration-200">
                      <td>{item.id}</td>
                      <td className="text-sm">{item.sn}</td>
                      <td className="text-sm">{item.batch}</td>
                      <td className="text-sm">{item.productModel}</td>
                      <td className="text-sm">{item.line}</td>
                      <td>
                        <span className={`text-xs px-2 py-1 rounded ${item.result === 'OK' ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}`}>
                          {item.result}
                        </span>
                      </td>
                      <td>
                        <span className={`text-xs px-2 py-1 rounded ${item.status === '已处理' ? 'bg-success/10 text-success' : item.status === '处理中' ? 'bg-warning/10 text-warning' : 'bg-danger/10 text-danger'}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="text-sm">{item.date}</td>
                      <td className="text-sm">{item.operator}</td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td colSpan={9} className="text-center py-4 text-gray-500">
                    无数据
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* 分页 */}
        {filteredData.length > 0 && (
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-gray-600">
              共 {filteredData.length} 条记录
            </div>
            <div className="flex space-x-1">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50"
              >
                上一页
              </button>
              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredData.length / itemsPerPage)))}
                disabled={currentPage === Math.ceil(filteredData.length / itemsPerPage)}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50"
              >
                下一页
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QualityMonitor;