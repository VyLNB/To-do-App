
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ToDoForm from '../../components/ToDoForm';
import { createTask } from '../../api/todo';
import type { ToDoItemFormData } from '../../interfaces/todo';

// Interface cục bộ của ToDoForm (để khớp kiểu dữ liệu khi nhận từ Form)
interface ToDoFormItem {
    id?: string;
    title: string;
    description: string;
    deadline: string;
    priority: string;
    tags: string[];
}

const AddTask = () => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (formData: ToDoFormItem) => {
        try {
            setIsSubmitting(true);
            
            // Chuẩn bị dữ liệu gửi lên API (chỉ lấy title và description)
            const payload: ToDoItemFormData = {
                title: formData.title,
                description: formData.description
            };

            console.log('Creating task:', payload);
            await createTask(payload);
            
            // Tạo thành công thì quay về danh sách
            navigate("/todoapp/tasks");
            
        } catch (error) {
            console.error('Error creating task:', error);
            alert("Có lỗi xảy ra khi tạo công việc mới!");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        navigate("/todoapp/tasks");
    };

    return (
        <div className="text-white relative">
            {/* Loading Overlay */}
            {isSubmitting && (
                <div className="absolute inset-0 bg-black/50 z-10 flex items-center justify-center rounded-lg">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                </div>
            )}

            <ToDoForm 
                isEditMode={false} 
                onSubmit={handleSubmit}
                // Nếu ToDoForm của bạn chưa hỗ trợ prop onCancel, bạn có thể bỏ dòng này
                // hoặc cập nhật ToDoForm để xử lý nút Hủy
                onCancel={handleCancel}
            />
        </div>
    );
};

export default AddTask;