import React from 'react';
import styled from 'styled-components';
import {TodosFooter} from './components/TodosFooter';
import {TodosHeader} from './components/TodosHeader';
import {OnSubmit, TodoInput} from './components/TodoInput';
import {TodoList} from './components/TodoList';
import {Todo} from './types';
import {TodoStatusBar} from './components/TodoStatusBar';

export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 400px;
  margin: 0 auto;
  height: 100vh;
`;

export interface AppState {
  todos: Array<Todo>;
}

export const App: React.FC = () => {
  const [todos, setTodos] = React.useState<Todo[]>([]);

  React.useEffect(() => {
    (async () => {
      const response = await fetch('http://localhost:8000/todos');
      setTodos(await response.json());
    })();
  }, []);

  const [online, setOnline] = React.useState<boolean>(false);

  React.useEffect(() => {
    (async () => {
      const response = await fetch('http://localhost:8000/status');
      setOnline(response.ok);
    })();
  }, []);

  const createTodo: OnSubmit = async text => {
    const newTodo = {
      text,
      // done: false,                   Removed as it's false as default
      // createdTimestamp: Date.now(),  Removed as it's managed by server side
    };

    const response = await fetch('http://localhost:8000/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTodo),
    });
    if (!response.ok) {
      window.alert(
        `Unexpected error ${response.status}: ${response.statusText}`,
      );
      return text;
    }
    setTodos([await response.json(), ...todos]);
    return '';
  };

  const updateTodo = async (todoId: string, updates: Partial<Todo>) => {
    const response = await fetch(`http://localhost:8000/todos/${todoId}/done`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      window.alert(
        `Unexpected error ${response.status}: ${response.statusText}`,
      );
      return;
    }

    const updatedTodo = await response.json();
    setTodos(todos.map(todo => (todo.id === todoId ? updatedTodo : todo)));
  };

  return (
    <AppContainer className='App'>
      <TodosHeader online={online}>
        <TodoStatusBar
          total={todos.length}
          done={todos.filter(todo => todo.done).length}
        />
      </TodosHeader>
      <TodoInput onSubmit={createTodo} />
      <TodoList todos={todos} onTodoUpdate={updateTodo} />
      <TodosFooter>
        <TodoStatusBar
          total={todos.length}
          done={todos.filter(todo => todo.done).length}
        />
      </TodosFooter>
    </AppContainer>
  );
};
