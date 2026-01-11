import { Plus } from "lucide-react";
import type { Todo } from "../../components/TodoItem";
import { useState, useEffect } from "react";
import EmptyTask from "../../components/EmptyTask";
import ToDoItem from "../../components/TodoItem";
import { getAllToDo, updateTask } from "../../api/todo";
import type { ToDoItemInterface } from "../../interfaces/todo";
import { useNavigate } from "react-router-dom";

const TasksPage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  // Fetch tasks from API
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true);
        const data = await getAllToDo();
        
        // Convert ToDoItem to Todo format
        const convertedTodos: Todo[] = data.map((item: ToDoItemInterface) => ({
          id: item._id,
          title: item.title,
          dueDate: new Date(item.createdAt).toLocaleDateString('vi-VN'),
          priority: 'Trung bình' as const,
          status: item.completed ? 'completed' : 'pending'
        }));
        
        setTodos(convertedTodos);
        setError(null);
      } catch (err) {
        console.error('Error fetching todos:', err);
        setError('Không thể tải danh sách công việc');
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const handleToggle = async (id: string) => {
    // Tìm task hiện tại để lấy trạng thái cũ
    const currentTodo = todos.find(todo => todo.id === id);
    if (!currentTodo) return;

    const newStatusBoolean = currentTodo.status !== 'completed'; 
    const newStatusString = newStatusBoolean ? 'completed' : 'pending';

    try {
      // Gọi API cập nhật xuống Database
      await updateTask(id, { completed: newStatusBoolean });

      // Nếu API thành công, cập nhật lại State ở Frontend
      setTodos(todos.map(todo => 
        todo.id === id 
          ? { ...todo, status: newStatusString }
          : todo
      ));
    } catch (err) {
      console.error("Lỗi khi cập nhật trạng thái:", err);
    }
  };

  const activeTodos = todos.filter(todo => todo.status === 'pending');

  const completedTodos = todos.filter(todo => todo.status === 'completed');

  return (
    <div className="text-white">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-3xl font-semibold">Danh sách công việc</h1>
        </div>

        <button className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm hover:bg-white/20 transition"
        onClick={() => navigate("/todoapp/newTask")}>
          <Plus size={16} />
          Tạo công việc mới
        </button>
      </div>


      {/* Task List */}
      <div className="mx-auto pt-4">
        <div className="bg-green rounded-lg shadow-sm overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-xl font-semibold text-white">
              Đang thực hiện
              <span className="ml-2 text-sm font-normal text-white">
                {activeTodos.length}
              </span>
            </h1>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="p-8 text-center text-white">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
              <p className="mt-2">Đang tải...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="p-8 text-center text-red-300">
              <p>{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-white/10 rounded hover:bg-white/20"
              >
                Thử lại
              </button>
            </div>
          )}

          {/* Todo List */}
          {!loading && !error && (
            <div className="divide-y divide-gray-200">
              {activeTodos.length === 0 ? (
                <EmptyTask />
              ) : (
                activeTodos.map(todo => (
                  <ToDoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={handleToggle}
                  />
                ))
              )}
            </div>
          )}
        </div>

        {/* Đã hoàn thành */}
          {completedTodos.length > 0 && (
            <div className="bg-green rounded-lg shadow-sm overflow-hidden">
              {/* Header */}
              <div className="px-6 py-4 border-b border-gray-200">
                <h1 className="text-xl font-semibold text-white">
                  Đã hoàn thành
                  <span className="ml-2 text-sm font-normal text-white">
                    {completedTodos.length}
                  </span>
                </h1>
              </div>

              <div className="divide-y divide-gray-200">
                  {/* Chỉ render completedTodos ở đây */}
                  {completedTodos.map(todo => (
                    <ToDoItem
                      key={todo.id}
                      todo={todo}
                      onToggle={handleToggle}
                    />
                  ))}
              </div>
            </div>
          )}
      </div>
    </div>
  );
};

export default TasksPage;