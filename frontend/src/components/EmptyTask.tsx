import { AlertCircle } from "lucide-react";

const EmptyTask: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-16 h-16 mb-4 bg-gray-100 rounded-full flex items-center justify-center">
        <AlertCircle className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-1">
        Chưa có công việc nào
      </h3>
      <p className="text-sm text-gray-500 text-center">
        Bạn chưa có công việc nào. Thêm công việc mới để bắt đầu!
      </p>
    </div>
  );
};

export default EmptyTask;