import React from 'react';

interface Props {
  todoDescrip: Todo;
  toggleTodo: ToggleTodo;
}

export const TodoListItem: React.FC<Props> = ({ todoDescrip, toggleTodo }) => {
  return (
    <li>
      <label
        style={{ textDecoration: todoDescrip.complete ? 'line-through' : undefined }}>
        <input
          type="checkbox"
          checked={todoDescrip.complete}
          onClick={() => {
            toggleTodo(todoDescrip);
          }}
        />{' '}
        {todoDescrip.text}
      </label>
    </li>
  );
};