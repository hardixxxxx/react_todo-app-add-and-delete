import React, { useEffect, useRef, useState } from 'react';

import { addTodo, USER_ID } from '../api/todos';
import { Todo } from '../types/Todo';

interface TodoHeaderProps {
  setError: React.Dispatch<React.SetStateAction<string>>;
  setTempTodo: React.Dispatch<React.SetStateAction<Todo | null>>;
}

export const TodoHeader: React.FC<TodoHeaderProps> = ({
  setError,
  setTempTodo,
}) => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!inputValue.trim()) {
      setError('Title should not be empty');

      return;
    }

    (inputRef.current as HTMLInputElement).disabled = true;

    const todoData: Omit<Todo, 'id'> = {
      title: inputValue,
      completed: false,
      userId: USER_ID,
    };

    addTodo(todoData)
      .then(res => console.log(res))
      .catch(e => console.log(e));
    setTempTodo({ ...todoData, id: 0 });
  };

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      <button
        type="button"
        className="todoapp__toggle-all active"
        data-cy="ToggleAllButton"
      />

      {/* Add a todo on form submit */}
      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={inputValue}
          onChange={event => setInputValue(event.target.value)}
        />
      </form>
    </header>
  );
};
