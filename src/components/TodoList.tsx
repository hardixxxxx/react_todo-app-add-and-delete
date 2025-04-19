import React from 'react';
import { TodoItem } from './TodoItem';
import { Todo } from '../types/Todo';

type TodoListProps = {
  todos: Todo[];
  tempTodo: Todo | null;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
  todoIdsToDelete: number[];
  inputTodoRef: React.MutableRefObject<HTMLInputElement | null>;
};

export const TodoList: React.FC<TodoListProps> = React.memo(
  ({ todos, tempTodo, setTodos, setError, todoIdsToDelete, inputTodoRef }) => {
    return (
      <section className="todoapp__main" data-cy="TodoList">
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            setTodos={setTodos}
            setError={setError}
            todoIdsToDelete={todoIdsToDelete}
            inputTodoRef={inputTodoRef}
          />
        ))}
        {tempTodo && <TodoItem todo={tempTodo} isLoad={true} />}
      </section>
    );
  },
);

TodoList.displayName = 'TodoList';
