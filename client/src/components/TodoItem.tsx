import React from 'react';
import styled from 'styled-components';
import {Todo} from '../types';

const TodoText = styled.span<{done: boolean}>`
  text-decoration: ${p => (p.done ? 'line-through' : 'none')};
`;

const TodoCheckbox = styled.input`
  margin-right: 8px;
`;

export interface TodoItemProps {
  todo: Todo;
  onUpdate: (todoId: string, updates: Partial<Todo>) => Promise<void>;
  className?: string;
}

const _TodoItem: React.FC<TodoItemProps> = ({todo, onUpdate, className}) => {
  const handleCheckboxChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    await onUpdate(todo.id.toString(), {done: e.target.checked});
  };

  return (
    <li data-cy='TodoItem' className={className}>
      <TodoCheckbox
        type='checkbox'
        checked={todo.done}
        onChange={handleCheckboxChange}
      />
      <TodoText done={todo.done}>{todo.text}</TodoText>
    </li>
  );
};

export const TodoItem = styled(_TodoItem)`
  display: flex;
  padding: 8px;
`;
