import React from 'react';
import { myWorkData } from '../data/mock';

interface MyWorkProps {
  role: string;
}

const MyWork: React.FC<MyWorkProps> = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">我的工作</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 我的待办 */}
        <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all duration-300">
          <h4 className="text-sm font-semibold mb-3">我的待办</h4>
          <div className="space-y-3">
            {myWorkData.todos.map((todo) => (
              <div key={todo.id} className="p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
                <div className="text-sm font-medium">{todo.title}</div>
                <div className="flex justify-between items-center mt-2">
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
        <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all duration-300">
          <h4 className="text-sm font-semibold mb-3">我的复判</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm table">
              <thead>
                <tr>
                  <th>序列号</th>
                  <th>结果</th>
                  <th>时间</th>
                </tr>
              </thead>
              <tbody>
                {myWorkData.reviews.map((review) => (
                  <tr key={review.id} className="cursor-pointer hover:bg-gray-50 transition-colors duration-200">
                    <td>{review.serial}</td>
                    <td>
                      <span className={`text-xs px-2 py-1 rounded ${review.result === '通过' ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}`}>
                        {review.result}
                      </span>
                    </td>
                    <td>{review.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 我的审批 */}
        <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all duration-300">
          <h4 className="text-sm font-semibold mb-3">我的审批</h4>
          <div className="space-y-3 text-sm">
            <div className="p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
              <div className="font-medium">批量风险审批</div>
              <div className="text-xs text-gray-600 mt-1">线体A - 批次20240501</div>
              <div className="text-xs text-gray-600 mt-1">状态：待审批</div>
            </div>
            <div className="p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
              <div className="font-medium">规则更新审批</div>
              <div className="text-xs text-gray-600 mt-1">划痕检测规则 v1.3</div>
              <div className="text-xs text-gray-600 mt-1">状态：已审批</div>
            </div>
          </div>
        </div>

        {/* 我的收藏 */}
        <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all duration-300">
          <h4 className="text-sm font-semibold mb-3">我的收藏</h4>
          <div className="space-y-3">
            <div className="flex items-center p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
              <span className="mr-4 text-lg">📏</span>
              <span className="text-sm">划痕检测规则 v1.2</span>
            </div>
            <div className="flex items-center p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
              <span className="mr-4 text-lg">📊</span>
              <span className="text-sm">生产概览看板</span>
            </div>
            <div className="flex items-center p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
              <span className="mr-4 text-lg">⚙️</span>
              <span className="text-sm">系统配置页面</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyWork;