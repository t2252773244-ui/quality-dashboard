import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { inspectionData, detailedInspectionData } from '../data/mock';

interface DetectManageProps {
  role: string;
}

const DetectManage: React.FC<DetectManageProps> = () => {
  // 搜索条件状态
  const [searchParams, setSearchParams] = useState({
    dateRange: '近7天',
    sn: '',
    batch: '',
    workOrder: '',
    line: '',
    model: '',
    defectType: '',
    anomalyLevel: '',
    status: '',
    operator: ''
  });
  
  // 筛选后的数据
  const [filteredData, setFilteredData] = useState(detailedInspectionData);
  
  // 分页状态
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // 排序状态
  const [sortConfig, setSortConfig] = useState({ key: null as string | null, direction: 'ascending' as 'ascending' | 'descending' });
  
  // 详情模态框状态
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  // 处理搜索参数变化
  const handleSearchParamChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({ ...prev, [name]: value }));
  };

  // 处理排序
  const handleSort = (key: string) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // 处理行点击
  const handleRowClick = (item: any) => {
    setSelectedItem(item);
    setShowDetailModal(true);
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
      
      // SN筛选
      if (searchParams.sn && !item.sn.includes(searchParams.sn)) return false;
      
      // 批次筛选
      if (searchParams.batch && !item.batch.includes(searchParams.batch)) return false;
      
      // 工单号筛选
      if (searchParams.workOrder && !item.workOrder.includes(searchParams.workOrder)) return false;
      
      // 线体筛选
      if (searchParams.line && item.line !== searchParams.line) return false;
      
      // 产品型号筛选
      if (searchParams.model && item.productModel !== searchParams.model) return false;
      
      // 缺陷类型筛选
      if (searchParams.defectType && item.defectType !== searchParams.defectType) return false;
      
      // 异常等级筛选
      if (searchParams.anomalyLevel && item.defectLevel !== searchParams.anomalyLevel) return false;
      
      // 状态筛选
      if (searchParams.status && item.status !== searchParams.status) return false;
      
      // 操作人筛选
      if (searchParams.operator && item.operator !== searchParams.operator) return false;
      
      return true;
    });
    
    setFilteredData(filtered);
    setCurrentPage(1); // 重置到第一页
  };

  // 处理重置
  const handleReset = () => {
    setSearchParams({
      dateRange: '近7天',
      sn: '',
      batch: '',
      workOrder: '',
      line: '',
      model: '',
      defectType: '',
      anomalyLevel: '',
      status: '',
      operator: ''
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
      <h2 className="text-2xl font-bold mb-6">检测管理</h2>
      
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
            <label className="block text-sm font-medium text-gray-700 mb-1">SN</label>
            <input 
              type="text" 
              name="sn" 
              value={searchParams.sn} 
              onChange={handleSearchParamChange}
              onKeyPress={handleKeyPress}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
              placeholder="输入序列号"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">批次</label>
            <input 
              type="text" 
              name="batch" 
              value={searchParams.batch} 
              onChange={handleSearchParamChange}
              onKeyPress={handleKeyPress}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
              placeholder="输入批次号"
            />
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
            <label className="block text-sm font-medium text-gray-700 mb-1">产品型号</label>
            <select 
              name="model" 
              value={searchParams.model} 
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
            <label className="block text-sm font-medium text-gray-700 mb-1">缺陷类型</label>
            <select 
              name="defectType" 
              value={searchParams.defectType} 
              onChange={handleSearchParamChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
            >
              <option value="">请选择</option>
              <option value="划痕">划痕</option>
              <option value="变形">变形</option>
              <option value="污渍">污渍</option>
              <option value="色差">色差</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">异常等级</label>
            <select 
              name="anomalyLevel" 
              value={searchParams.anomalyLevel} 
              onChange={handleSearchParamChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
            >
              <option value="">请选择</option>
              <option value="高">高</option>
              <option value="中">中</option>
              <option value="低">低</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">状态</label>
            <select 
              name="status" 
              value={searchParams.status} 
              onChange={handleSearchParamChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
            >
              <option value="">请选择</option>
              <option value="未处理">未处理</option>
              <option value="处理中">处理中</option>
              <option value="已处理">已处理</option>
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
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 手机多角度图片 */}
        <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all duration-300">
          <h4 className="text-sm font-semibold mb-3">手机多角度检测</h4>
          <div className="grid grid-cols-4 gap-3">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="bg-gray-100 rounded-lg h-20 flex items-center justify-center hover:bg-gray-200 transition-colors duration-200 cursor-pointer">
                <span className="text-2xl">📱</span>
              </div>
            ))}
          </div>
        </div>

        {/* 检测记录查询 */}
        <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all duration-300">
          <h4 className="text-sm font-semibold mb-3">检测记录查询</h4>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th onClick={() => handleSort('id')} className="cursor-pointer">
                    序号 {sortConfig.key === 'id' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                  </th>
                  <th onClick={() => handleSort('sn')} className="cursor-pointer">
                    SN {sortConfig.key === 'sn' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                  </th>
                  <th onClick={() => handleSort('batch')} className="cursor-pointer">
                    批次 {sortConfig.key === 'batch' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                  </th>
                  <th onClick={() => handleSort('productModel')} className="cursor-pointer">
                    产品型号 {sortConfig.key === 'productModel' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                  </th>
                  <th onClick={() => handleSort('line')} className="cursor-pointer">
                    线体 {sortConfig.key === 'line' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                  </th>
                  <th onClick={() => handleSort('result')} className="cursor-pointer">
                    结果 {sortConfig.key === 'result' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                  </th>
                  <th onClick={() => handleSort('status')} className="cursor-pointer">
                    状态 {sortConfig.key === 'status' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                  </th>
                  <th onClick={() => handleSort('date')} className="cursor-pointer">
                    日期 {sortConfig.key === 'date' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                  </th>
                  <th onClick={() => handleSort('operator')} className="cursor-pointer">
                    操作人 {sortConfig.key === 'operator' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  [...filteredData]
                    .sort((a, b) => {
                      if (sortConfig.key === null) return 0;
                      const aValue = a[sortConfig.key as keyof typeof a];
                      const bValue = b[sortConfig.key as keyof typeof b];
                      
                      // 处理null值
                      if (aValue === null && bValue === null) return 0;
                      if (aValue === null) return sortConfig.direction === 'ascending' ? -1 : 1;
                      if (bValue === null) return sortConfig.direction === 'ascending' ? 1 : -1;
                      
                      if (aValue < bValue) {
                        return sortConfig.direction === 'ascending' ? -1 : 1;
                      }
                      if (aValue > bValue) {
                        return sortConfig.direction === 'ascending' ? 1 : -1;
                      }
                      return 0;
                    })
                    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                    .map((item) => (
                      <tr key={item.id} className="cursor-pointer hover:bg-gray-50 transition-colors duration-200" onClick={() => handleRowClick(item)}>
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
        
        {/* 详情模态框 */}
        {showDetailModal && selectedItem && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-semibold">检测详情</h4>
                <button 
                  onClick={() => setShowDetailModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">SN</label>
                    <div className="text-sm">{selectedItem.sn}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">批次</label>
                    <div className="text-sm">{selectedItem.batch}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">产品型号</label>
                    <div className="text-sm">{selectedItem.productModel}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">线体</label>
                    <div className="text-sm">{selectedItem.line}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">工位</label>
                    <div className="text-sm">{selectedItem.station}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">工单号</label>
                    <div className="text-sm">{selectedItem.workOrder}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">结果</label>
                    <div className="text-sm">
                      <span className={`px-2 py-1 rounded ${selectedItem.result === 'OK' ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}`}>
                        {selectedItem.result}
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">状态</label>
                    <div className="text-sm">
                      <span className={`px-2 py-1 rounded ${selectedItem.status === '已处理' ? 'bg-success/10 text-success' : selectedItem.status === '处理中' ? 'bg-warning/10 text-warning' : 'bg-danger/10 text-danger'}`}>
                        {selectedItem.status}
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">缺陷类型</label>
                    <div className="text-sm">{selectedItem.defectType || '无'}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">缺陷等级</label>
                    <div className="text-sm">{selectedItem.defectLevel || '无'}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">日期</label>
                    <div className="text-sm">{selectedItem.date}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">操作人</label>
                    <div className="text-sm">{selectedItem.operator}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">复判人</label>
                    <div className="text-sm">{selectedItem.reviewer || '无'}</div>
                  </div>
                </div>
                <div className="mt-4">
                  <h5 className="text-sm font-semibold mb-2">检测轨迹</h5>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="text-sm space-y-2">
                      <div>1. 开始检测 - {selectedItem.date} 09:00</div>
                      <div>2. 外观检测 - {selectedItem.date} 09:05</div>
                      {selectedItem.result === 'NG' && (
                        <div>3. 发现缺陷 - {selectedItem.date} 09:10</div>
                      )}
                      <div>4. 结束检测 - {selectedItem.date} 09:15</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button 
                  onClick={() => setShowDetailModal(false)}
                  className="bg-primary text-white py-2 px-6 rounded-lg text-sm hover:bg-blue-700 transition-colors duration-200"
                >
                  关闭
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 缺陷类型分布 */}
        <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all duration-300">
          <h4 className="text-sm font-semibold mb-3">缺陷类型分布</h4>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={inspectionData.defectTypes}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 单件检测详情 */}
        <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all duration-300">
          <h4 className="text-sm font-semibold mb-3">单件检测详情</h4>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">序列号：</span>
              <span className="font-medium">SN20240501002</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">型号：</span>
              <span className="font-medium">iPhone 15 Pro</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">缺陷类型：</span>
              <span className="font-medium">划痕</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">缺陷位置：</span>
              <span className="font-medium">屏幕左上角</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">AI初判：</span>
              <span className="text-danger font-medium">NG</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">规则命中：</span>
              <span className="font-medium">划痕检测规则 v1.2</span>
            </div>
            <div className="mt-3">
              <button className="bg-primary text-white py-1 px-3 rounded-lg text-sm hover:bg-blue-700 transition-colors duration-200">
                查看完整轨迹
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetectManage;