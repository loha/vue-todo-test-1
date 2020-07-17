type TodoItem = {
  id: string;
  completed: boolean;
  title: string;
  text: string;
};

type TodoItemValueError = {
  id: {
    value: string;
    error: boolean;
  };
  title: {
    value: string;
    error: boolean;
  };
  text: {
    value: string;
    error: boolean;
  };
};

export { TodoItem, TodoItemValueError };
