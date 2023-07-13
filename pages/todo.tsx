import { State, Todo } from '@/interfaces';
import { useEffect, useState } from 'react';
import "../style.css";

const initialTodo: Todo = {
    id: '',
    todo: '',
    isCompleted: false
};

const initialState: State = {
  searchTerm: '',
  todoItems: '',
  currentTodo: '',
  editingTodo: initialTodo,
  error: '',
};

const TodoList: React.FC = () => {
  const [state, setState] = useState<State>(initialState);
  const [searchTerm, setSearchTerm] = useState('');
  const [todoItems, setTodoItems] = useState<Todo[]>([]);
  // const [currentTodo, setCurrentTodo] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/todo')
    .then(response => response.json())
    .then(response => {
      setTodoItems(response);
    });
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setState(prevState => ({
      ...prevState, 
      currentTodo: value,
      editingTodo: {...prevState.editingTodo, todo: value},
      error: ''
    }));
  };

  const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (state.currentTodo.trim()) {
      const duplicateTodo = todoItems.find((todo) => todo.todo.toLowerCase() === state.currentTodo.toLowerCase());

      if (duplicateTodo && !state.editingTodo.id) {
        setError('Todo already exists');
        return;
      }
      
      if (state.editingTodo.id) {
        fetch(`/api/todo/${state.editingTodo.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(state.editingTodo)
        })
        .then(response => response.json())
        .then(response => {
          const foundAtIndex = todoItems.findIndex(todoItem => todoItem.id === state.editingTodo.id);
          todoItems[foundAtIndex] = response;
          setTodoItems([...todoItems]);
        })
        .finally(() => setState(prevState => ({...prevState, editingTodo: initialTodo, currentTodo: ''})))
        .catch(error => {
          console.error('Error editing todo item:', error.message);
        });
      } else {
        const newTodoItem: Todo = {
          id: Date.now().toString(),
          todo: state.currentTodo,
          isCompleted: false
        };

        fetch('/api/todo', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newTodoItem)
        })
        .then(response => response.json())
        .then(response => {
          setTodoItems([response, ...todoItems]);
        })
        .catch(error => {
          console.error('Error create todo item:', error);
        });
      }

      setState(prevState => ({...prevState, currentTodo: '', error: ''}));
    }
  };

  const handleRemove = (id: string) => {
    if (confirm('Are you sure?')) {
      fetch(`/api/todo/${id}`, {
        method: 'DELETE'
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Request failed with status code ' + response.status);
        }
        return response.json();
      })
      .then(() => {
        const updatedTodos = todoItems.filter((todo) => todo.id !== id);
        setTodoItems(updatedTodos);
      })
      .catch(error => {
        console.error('Error create todo item:', error);
      });
    }
  };

  const handleEdit = (todo: Todo) => {
    setState(prevState => ({
      ...prevState,
      currentTodo: todo.todo, 
      editingTodo: todo
    }));
  };

  const handleMarkComplete = (id: string) => {
    const updatedTodoItems = todoItems.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          isCompleted: !todo.isCompleted,
        };
      }
      return todo;
    });
    setTodoItems(updatedTodoItems);
  };
  
  const filteredTodos = todoItems.filter((todo) => todo.todo.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div id="wrap-todo">
      <h1>Todo List</h1>
      <div className="add-todo">
        <form onSubmit={handleSave}>
          <input
            type="text"
            placeholder="Add new todo"
            value={state.currentTodo}
            onChange={handleInputChange}
          />
          <button style={{marginLeft: 15}} type="submit">{state.editingTodo?.id ? 'Update' : 'Save'}</button>
        </form>
        {error && <p className="error">{error}</p>}
      </div>
      <div className="todo-list">
        <input 
          type="text" 
          placeholder="Search todo"
          onChange={handleSearchChange}
        />
        <table className="bordered-table">
          <thead>
            <tr>
              <th style={{textAlign: 'left'}}>Todo</th>
            </tr>
          </thead>
          <tbody>
            {filteredTodos.length > 0 ? (
              filteredTodos.map((todo) => (
                <tr key={todo.id}>
                  <td>
                    <div style={{display: "flex"}}>
                      <span className={todo.isCompleted ? 'completed' : ''}>{todo.todo}</span>

                      <div className="group-action-button">
                      <button className="action-button" onClick={() => handleEdit(todo)}>Edit</button>
                      <button className="action-button" onClick={() => handleRemove(todo.id)}>Remove</button>
                      <button className="action-button" onClick={() => handleMarkComplete(todo.id)}>
                        {todo.isCompleted ? 'Mark as Incomplete' : 'Mark as Complete'}
                      </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3}>No result. Create a new one instead!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TodoList;
