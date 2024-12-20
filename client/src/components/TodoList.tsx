import React from 'react';
import styled from 'styled-components';
import {Todo} from '../types';
import {TodoItem} from './TodoItem';

export interface TodoListProps {
  todos: Array<Todo>;
  onTodoUpdate: (todoId: string, updates: Partial<Todo>) => Promise<void>;
  className?: string;
}

const _TodoList: React.FC<TodoListProps> = ({
  todos,
  onTodoUpdate,
  className,
}) => {
  return (
    <ul data-cy='TodoList' className={className}>
      {todos.map((todo, index) => (
        <TodoItem key={index} todo={todo} onUpdate={onTodoUpdate} />
      ))}
    </ul>
  );
};

export const TodoList = styled(_TodoList)`
  list-style: none;
  padding: 0;
`;
