import create, { SetState, GetState } from 'zustand';


interface Task {
  id: number;
  title: string;
  completed: boolean;
}

interface TaskManagerState {
  tasks: Task[];
  searchTask: string;
  setSearchTask: (searchTerm: string) => void;
  addTask: (newTask: Task) => void;
  updateTask: (taskId: number, updatedTask: { title: string }) => void;
  deleteTask: (taskId: number) => void;
}
const useTaskManager = create<TaskManagerState>((set: SetState<TaskManagerState>, get: GetState<TaskManagerState>) => ({
  tasks: [],
  searchTask: '',

  setSearchTask: (searchTerm) => {
    set({ searchTask: searchTerm });
  },

  addTask: (newTask) => {
    set((state) => ({ tasks: [...state.tasks, newTask] }));
  },

  updateTask: (taskId, updatedTask) => {
    set((state) => ({
      tasks: state.tasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, ...updatedTask };
        }
        return task;
      }),
    }));
  },

  deleteTask: (taskId) => {
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== taskId),
    }));
  },
}));
export {
  useTaskManager
}