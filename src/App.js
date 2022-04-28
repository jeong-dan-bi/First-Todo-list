import React, { useRef, useState, useCallback } from 'react';
import TodoTemplate from 'components/TodoTemplate';
import TodoInsert from 'components/TodoInsert';
import TodoList from 'components/TodoList';


const App = () => {
  const [todos, setTodos] = useState([
    {
      id : 1,
      text : '할일1',
      checked : true,
    },
    {
      id : 2,
      text : '할일2',
      checked : true,
    },
    {
      id : 3,
      text : '할일3',
      checked : false,
    }
  ]);

  //고윳값을 가질 id생성
  const nextId = useRef(4);

  //onInsert함수
  const onInsert = useCallback(
    (text) => {
      const todo = {
        id : nextId.current,
        text,
        checked :false
      };
      setTodos(todos.concat(todo));
      nextId.current += 1; 
    }
  );

  //항목 지우기
  const onRemove = useCallback(
    (id) => {
      setTodos(todos.filter((todo) => todo.id !== id));
    },
    [todos]
  );

  //onToggle 버튼
  const onToggle = useCallback(
    (id) => {
      setTodos(
        todos.map((todo) => 
          todo.id === id ? {...todo, checked : !todo.checked}  : todo,
        ),
      );
    },
    [todos]
  )

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
    </TodoTemplate>
  );
};

export default App;