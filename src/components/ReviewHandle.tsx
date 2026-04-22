import React, { useState } from 'react';
import { reviewData, detailedInspectionData } from '../data/mock';

interface ReviewHandleProps {
  role: string;
}

const ReviewHandle: React.FC<ReviewHandleProps> = () => {
  // 搜索条件状态
  const [searchParams, setSearchParams] = useState({
    taskType: '',
    priority: '',
    status: '',
    assignee: '',
    date: '',
    sn: '',
    batch: ''
  });
  
  // 筛选后的数据
  const [filteredData, setFilteredData] = useState(detailedInspectionData.filter(item => item.result === 'NG'));
  
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
      // 只显示NG的记录
      if (item.result !== 'NG') return false;
      
      // 任务类型筛选（这里简化处理，实际应该根据taskType映射）
      if (searchParams.taskType && searchParams.taskType !== '复判') return false;
      
      // 优先级筛选（映射缺陷等级）
      if (searchParams.priority && item.defectLevel !== searchParams.priority) return false;
      
      // 状态筛选
      if (searchParams.status && item.status !== searchParams.status) return false;
      
      // 责任人筛选
      if (searchParams.assignee && item.reviewer !== searchParams.assignee) return false;
      
      // 日期筛选
      if (searchParams.date && item.date !== searchParams.date) return false;
      
      // SN筛选
      if (searchParams.sn && !item.sn.includes(searchParams.sn)) return false;
      
      // 批次筛选
      if (searchParams.batch && !item.batch.includes(searchParams.batch)) return false;
      
      return true;
    });
    
    setFilteredData(filtered);
    setCurrentPage(1); // 重置到第一页
  };

  // 处理重置
  const handleReset = () => {
    setSearchParams({
      taskType: '',
      priority: '',
      status: '',
      assignee: '',
      date: '',
      sn: '',
      batch: ''
    });
    setFilteredData(detailedInspectionData.filter(item => item.result === 'NG'));
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
      <h2 className="text-2xl font-bold mb-6">复判与处置</h2>
      
      {/* 搜索筛选栏 */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4 hover:shadow-md transition-all duration-300">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">任务类型</label>
            <select 
              name="taskType" 
              value={searchParams.taskType} 
              onChange={handleSearchParamChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
            >
              <option value="">请选择</option>
              <option value="复判">复判</option>
              <option value="审批">审批</option>
              <option value="风险评估">风险评估</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">优先级</label>
            <select 
              name="priority" 
              value={searchParams.priority} 
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
              <option value="待处理">待处理</option>
              <option value="处理中">处理中</option>
              <option value="已完成">已完成</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">责任人</label>
            <input 
              type="text" 
              name="assignee" 
              value={searchParams.assignee} 
              onChange={handleSearchParamChange}
              onKeyPress={handleKeyPress}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
              placeholder="输入责任人"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">日期</label>
            <input 
              type="date" 
              name="date" 
              value={searchParams.date} 
              onChange={handleSearchParamChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
            />
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* 左侧任务列表 */}
        <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all duration-300">
          <h4 className="text-sm font-semibold mb-3">复判任务列表</h4>
          <div className="space-y-2">
            {filteredData.length > 0 ? (
              filteredData
                .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                .map((item) => (
                  <div key={item.id} className="p-3 border border-gray-100 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors duration-200">
                    <div className="text-sm font-medium">{item.sn}</div>
                    <div className="text-xs text-gray-600">{item.productModel}</div>
                    <div className="text-xs mt-1">
                      <span className="mr-2">缺陷：{item.defectType}</span>
                      <span className={`px-1 py-0.5 rounded ${item.defectLevel === '高' ? 'bg-danger/10 text-danger' : item.defectLevel === '中' ? 'bg-warning/10 text-warning' : 'bg-gray-100 text-gray-600'}`}>
                        {item.defectLevel}
                      </span>
                    </div>
                  </div>
                ))
            ) : (
              <div className="text-center py-4 text-gray-500 text-sm">
                无任务
              </div>
            )}
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

        {/* 中间工件大图 */}
        <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all duration-300">
          <h4 className="text-sm font-semibold mb-3">工件图像</h4>
          <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center mb-3">
            <span className="text-5xl">📱</span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-100 rounded-lg h-16 flex items-center justify-center hover:bg-gray-200 transition-colors duration-200 cursor-pointer">
                <span className="text-xl">🔍</span>
              </div>
            ))}
          </div>
        </div>

        {/* 右侧判定依据 */}
        <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all duration-300">
          <h4 className="text-sm font-semibold mb-3">判定依据</h4>
          <div className="space-y-3 text-sm">
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
          <div className="mt-5 space-y-2">
            <h4 className="text-sm font-semibold mb-3">处置决策</h4>
            <div className="grid grid-cols-2 gap-3">
              {reviewData.decisionOptions.map((option, index) => (
                <button key={index} className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg text-sm hover:bg-gray-300 transition-colors duration-200">
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewHandle;