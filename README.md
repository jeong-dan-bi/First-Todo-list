# TodoList
## 1. `프로젝트 준비 및 라이브러리 설치`
1. 터미널에서 리액트 프로젝트를 만든다.
```
yarn create react-app todo-app
```
2. 프로젝트가 생성되면 todo-app 디렉터리로 들어가서 필요한 라이브러리를 설치한다.
```
cd todo-app
```
3. `styled-componets`와 `react-icons`를 설치한다.
```
yarn add styled-components react-icons
```
4. classnames를 설치한다.
```
yarn add classnames
```
5. root폴더에 `.prettierrc`파일을 생성한다. 
   협업시에 설정을 동일하게 하는 작업을 하면 코드의 가독성을 높일 수 있다.
```javascript
    { "arrowParens": "always",
    "semi": true,
    "singleQuote": true,
    "useTabs": false,
    "trailingComma": "all",
    "tabWidth": 2,
    "printWidth": 80 }
```
6. root폴더에 jsconfig.json 파일을 생성하여 import를 위한 절대경로 설정을 한다.
```javascript
 {
    "compilerOptions": {
        "target": "es6",
        "baseUrl": "src"
    },
    "include": ["src"]
}
```
7. `index.css` 수정하고 `index.js`에 import 한다.  `import 'index.css'`;
```css
body {
  margin: 0;
  padding: 0;
  background: #e9ecef;
}
```
8. `App.js`컴포넌트를 기존에 있는 내용을 삭제하고 `rsc`  탭을 입력하여 기본 명령어가 나오게 설정한다.
```javascript
import React from 'react';

const App = () => {
  return (
    <div>
      Todo리스트 만들기 준비 완료!!
    </div>
  );
};

export default App;
```
2. ## `UI 구성하기`
1. __TodoTemplate__ : 화면을 가운데 정렬시켜 주며, 앱 타이틀(Todo List)을 보여 준다. children으로 내부 JSX를 props로 받아 와서 렌더링 해준다.
2. __TodoInsert__ : 새로운 항목을 입력하고 추가 할 수 있는 컴포넌트이다. state를 통해 input의 상태 관리를 한다.
3. __TodoListItem__ : 각 할 일 항목에 대한 정보를 보여 주는 컴포넌트이다. todo객체를 props로 받아 와서 상태에 따라 다른 스타일의 UI를 보여준다.
4. __TodoList__ : todos 배열을 props로 받아 온 후, 이를 배열 내장 함수 map을 사용해서 여러 개의 TodoListItem 컴포넌트로 변환하여 보여준다. 

3. ## `UI 제작하기`
src폴더 내에 components 폴더를 생성하고 다음과 같은 컴포넌트를 생성한다.

1. `TodoTemplate.js` 컴포넌트 만들기
```javascript
import React from 'react';
import styled from 'styled-components';

const TodoTemplate = ({ children }) => {
  return (
    <TodoWrapper>
      <AppTile>Todo List</AppTile>
      <Content>{children}</Content>
    </TodoWrapper>
  );
};
const TodoWrapper = styled.div`
  width: 512px;
  margin: 6rem auto 0;
  border-radius: 4px;
  overflow: hidden;
`;

const AppTile = styled.div`
  background: #22b8cf;
  color: #fff;
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  background: #ffffff;
`;

export default TodoTemplate;
```

2. 위 컴포넌트를 `App.js`에 불러와 렌더링 한다
```javascript
import React from 'react';
import TodoTemplate from 'components/TodoTemplate';

const App = () => {
  return <TodoTemplate>Todo 리스트 만들기 준비완료</TodoTemplate>;
};

export default App;
```

3. `TodoInsert.js` 컴포넌트 만들기
* react-icons을 사용하기 위해 import {MdAdd} from "react-icons/md"; import를 상단에 선언한다
* https://react-icons.github.io/react-icons/search?q=mdadd
```javascript
import { MdAdd } from 'react-icons/md';
import styled from 'styled-components';

const TodoInsert = () => {
  return (
    <TodoInsertWrapper>
      <input type="text" placeholder="할 일을 입력하세요" />
      <button type="submit">
        <MdAdd />
      </button>
    </TodoInsertWrapper>
  );
};

const TodoInsertWrapper = styled.form`
  display: flex;
  background: #495057;
  input {
    background: none;
    outline: none;
    border: none;
    padding: 0.5rem;
    font-size: 1.125rem;
    line-height: 1.5;
    color: #fff;
    &::placeholder {
      color: #dee2e6;
    }
    flex: 1;
  }
  button {
    background: #868296;
    outline: none;
    border: none;
    color: #fff;
    padding: 0 1rem;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: 0.1s background ease-in;
    &:hover {
      background: #adb5bd;
    }
  }
`;

export default TodoInsert;
```

4. 위 컴포넌트를 `App.js`에 불러와 렌더링 한다.
```javascript
import React from 'react';
import TodoTemplate from 'components/TodoTemplate';
import TodoInsert from 'components/TodoInsert';

const App = () => {
  return (
    <TodoTemplate>
      <TodoInsert />
    </TodoTemplate>
  );
};

export default App;
```

5. `TodoListItem.js` 컴포넌트 만들기
```javascript
import React from 'react';
import styled from 'styled-components';
import {
  MdCheckBox,
  MdCheckBoxOutlineBlank,
  MdRemoveCircleOutline,
} from 'react-icons/md';

const TodoListItem = () => {
  return (
    <TodoItemWrapper>
      <CheckBox>
        <MdCheckBoxOutlineBlank />
        <div className="text">할 일</div>
      </CheckBox>
      <Remove>
        <MdRemoveCircleOutline />
      </Remove>
    </TodoItemWrapper>
  );
};

const TodoItemWrapper = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
  &:nth-child(even) {
    background: #f8f9fa;
  }
  & + & {
    border-top: 1px solid #dee2e6;
  }
`;

const CheckBox = styled.div`
  cursor: pointer;
  flex: 1;
  display: flex;
  align-items: center;
  svg {
    font-size: 1.5rem;
  }
  .text {
    margin-left: 0.5rem;
    flex: 1;
  }
  &.checked {
    svg {
      color: #22b8cf;
    }
    .text {
      color: #adb5bd;
      text-decoration: line-through;
    }
  }
`;

const Remove = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  color: #ff6b6b;
  cursor: pointer;
  &:hover {
    color: #ff8787;
  }
`;

export default TodoListItem;
```

6. `TodoList.js` 컴포넌트 만들기
```javascript
import React from 'react';
import TodoListItem from 'components/TodoListItem';
import styled from 'styled-components';

const TodoList = () => {
  return (
    <TodoListWrapper>
      <TodoListItem />
      <TodoListItem />
      <TodoListItem />
    </TodoListWrapper>
  );
};

const TodoListWrapper = styled.div`
  min-height: 320px;
  max-height: 513px;
  overflow: auto;
`;

export default TodoList;
```

7. 위 컴포넌트를 `App.js`에 불러와 렌더링 한다.
```javascript
import React from 'react';
import TodoTemplate from 'components/TodoTemplate';
import TodoInsert from 'components/TodoInsert';
import TodoList from 'components/TodoList';

const App = () => {
  return (
    <TodoTemplate>
      <TodoInsert />
      <TodoList />
    </TodoTemplate>
  );
};

export default App;
```

## 4. `기능 구현하기`
* 나중에 추가할 일정 항목에 대한 상태들은 모두 App 컴포넌트에서 관리한다.
* App에서 useState를 사용하여 todos라는 상태를 정의하고, todos를 props로 전달한다.

1. `App.js` 컴포넌트를 다음과 같이 수정한다.
```javascript
import React, { useState } from 'react';
import TodoTemplate from 'components/TodoTemplate';
import TodoInsert from 'components/TodoInsert';
import TodoList from 'components/TodoList';

const App = () => {
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: '할일1',
      checked: true,
    },
    {
      id: 2,
      text: '할일2',
      checked: true,
    },
    {
      id: 3,
      text: '할일3',
      checked: false,
    },
  ]);
  return (
    <TodoTemplate>
      <TodoInsert />
      <TodoList todos={todos} />
    </TodoTemplate>
  );
};

export default App;
```

2. `TodoList.js` 컴포넌트를 다음과 같이 수정한다.
* todos 배열 안에는 id, text, checked 값이 포함 되어 있다. 이 배열은 TodoList에 props전달 해야 한다.
* TodoList에서 이 값을 받아 온 후 TodoItem으로 변환하여 렌더링하도록 설정한다.
* props로 받아온 todos 배열을 배열 내장 함수 map을 통해 TodoListItem으로 이루어진 배열로 변환하여 렌더링해 준다.
```javascript
import React from 'react';
import TodoListItem from 'components/TodoListItem';
import styled from 'styled-components';

const TodoList = ({ todos }) => {
  return (
    <TodoListWrapper>
      {todos.map((todo) => (
        <TodoListItem todo={todo} key={todo.id} />
      ))}
    </TodoListWrapper>
  );
};

const TodoListWrapper = styled.div`
  min-height: 320px;
  max-height: 513px;
  overflow: auto;
`;

export default TodoList;
```

3. `TodoListItem.js` 컴포넌트를 다음과 같이 수정한다.
```javascript
import React from 'react';
import styled from 'styled-components';
import {
  MdCheckBox,
  MdCheckBoxOutlineBlank,
  MdRemoveCircleOutline,
} from 'react-icons/md';
import cn from 'classnames';

const TodoListItem = ({ todo }) => {
  const { id, text, checked } = todo;

  return (
    <TodoItemWrapper>
      <CheckBox className={cn('checkbox', { checked })}>
        {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
        <div className="text">{text}</div>
      </CheckBox>
      <Remove>
        <MdRemoveCircleOutline />
      </Remove>
    </TodoItemWrapper>
  );
};

const TodoItemWrapper = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
  &:nth-child(even) {
    background: #f8f9fa;
  }
  & + & {
    border-top: 1px solid #dee2e6;
  }
`;

const CheckBox = styled.div`
  cursor: pointer;
  flex: 1;
  display: flex;
  align-items: center;
  svg {
    font-size: 1.5rem;
  }
  .text {
    margin-left: 0.5rem;
    flex: 1;
  }
  &.checked {
    svg {
      color: #22b8cf;
    }
    .text {
      color: #adb5bd;
      text-decoration: line-through;
    }
  }
`;

const Remove = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  color: #ff6b6b;
  cursor: pointer;
  &:hover {
    color: #ff8787;
  }
`;

export default TodoListItem;
```

## 5. `항목 추가 기능 구현하기`
* 이번에는 일정 항목을 추가하는 기능을 구현해 보자.
* 이 기능을 구현하려면 TodoInsert 컴포넌트에서 input 상태를 관리하고 App 컴포넌트에는 todos 배열에 새로운 객체를 추가하는 함수를 만들어 주면 된다.

1. `TodoInsert.js` value 상태 관리하기
* TodoInsert 컴포넌트에서 input에 입력하는 값을 관리할 수 있도록 useState를 사용하여 value 상태를 정의 하여 보자. 추가로 input에 넣어 줄 onChange 함수도 작성해 보자. 
```javascript
import React, { useState, useCallback } from 'react';
import { MdAdd } from 'react-icons/md';
import styled from 'styled-components';

const TodoInsert = () => {
  const [value, setValue] = useState('');

  const onChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  return (
    <TodoInsertWrapper>
      <input
        type="text"
        placeholder="할 일을 입력하세요"
        value={value}
        onChange={onChange}
      />
      <button type="submit">
        <MdAdd />
      </button>
    </TodoInsertWrapper>
  );
};

const TodoInsertWrapper = styled.form`
  display: flex;
  background: #495057;
  input {
    background: none;
    outline: none;
    border: none;
    padding: 0.5rem;
    font-size: 1.125rem;
    line-height: 1.5;
    color: #fff;
    &::placeholder {
      color: #dee2e6;
    }
    flex: 1;
  }
  button {
    background: #868296;
    outline: none;
    border: none;
    color: #fff;
    padding: 0 1rem;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: 0.1s background ease-in;
    &:hover {
      background: #adb5bd;
    }
  }
`;

export default TodoInsert;
```

2. `App.js`에 todos 배열에 새 객체 추가하기
* App 컴포넌트에서 todos 배열에 새 객체를 추가하는 onInsert 함수를 만들기
* 이 함수에서는 새로운 객체를 만들 때마다 id 값에 1개씩 추가할 수 있도록 만들기
* id 값은 useRef를 사용하여 변수값이 유지가 될 수 있도록 만든다.
* onInsert 함수의 컴포넌트 성능을 아낄 수 있도록 useCallback으로 만들고 해당 함수를 props 설정해준다.
```javascript
import React, { useState, useRef, useCallback } from 'react';
import TodoTemplate from 'components/TodoTemplate';
import TodoInsert from 'components/TodoInsert';
import TodoList from 'components/TodoList';

const App = () => {
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: '할일1',
      checked: true,
    },
    {
      id: 2,
      text: '할일2',
      checked: true,
    },
    {
      id: 3,
      text: '할일3',
      checked: false,
    },
  ]);

  //고윳값으로 사용될 id
  //ref를 사용하여 변수 담기
  const nextId = useRef(4);

  //onInsert함수 만들기
  const onInsert = useCallback(
    (text) => {
      const todo = {
        id: nextId.current,
        text,
        checked: false,
      };
      setTodos(todos.concat(todo));
      nextId.current += 1; //nextID 1씩 더하기
    },
    [todos],
  );

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} />
    </TodoTemplate>
  );
};

export default App;
```

3. `TodoInsert.js`에서 onSubmit 이벤트 설정하기
* 버튼을 클릭하면 발생할 이벤트를 설정
* App.js에서 TodoInsert에 넣어 준 onInsert함수에 현재 useState를 통해 관리하고 있는 value 값을 파라미터로 넣어서 호출한다.
```javascript
import React, { useState, useCallback } from 'react';
import { MdAdd } from 'react-icons/md';
import styled from 'styled-components';

const TodoInsert = ({ onInsert }) => {
  const [value, setValue] = useState('');

  const onChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  //onSubmit 이벤트 설정
  const onSubmit = useCallback(
    (e) => {
      onInsert(value);
      setValue(''); //value값 초기화
      e.preventDefault(); //새로고침을 발생하므로 이 함수를 호출
    },
    [onInsert, value],
  );

  return (
    <TodoInsertWrapper onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="할 일을 입력하세요"
        value={value}
        onChange={onChange}
      />
      <button type="submit">
        <MdAdd />
      </button>
    </TodoInsertWrapper>
  );
};

export default TodoInsert;
```

## 6. `지우기 기능 구현하기`
* filter 함수는 기존 배열은 그대로 둔 상태에서 특정 조건을 만족하는 원소들만 따로 추출하여 새로운 배열을 만들어 준다.
* filter 함수에는 조건을 확인해 주는 함수를 파라미터로 넣어주어야 한다. 파라미터로 넣은 함수는 true 또는 false 값을 반환해야하며 여기서 true를 반환하는 경우만 새로운 배열에 포함된다.
```javascript
const array = [1,2,3,4,5,6,7,8,9,10];
const biggerThanFive = array.filter(number => number > 5);
//결과 : [6,7,8,9,10]
```

1. `App.js`에서 todos 배열에서 id로 항목 지우기
*  filter 함수를 사용하여 onRemove 함수를 만들기
*  이 함수를 만들고 props로 전달하여 준다.
```javascript
import React, { useState, useRef, useCallback } from 'react';
import TodoTemplate from 'components/TodoTemplate';
import TodoInsert from 'components/TodoInsert';
import TodoList from 'components/TodoList';

const App = () => {
  const [todos, setTodos] = useState([
    {
      id: 1,..
      text: '할일1',
      checked: true,
    },
    {
      id: 2,
      text: '할일2',
      checked: true,
    },
    {
      id: 3,
      text: '할일3',
      checked: false,
    },
  ]);

  //고윳값으로 사용될 id
  //ref를 사용하여 변수 담기
  const nextId = useRef(4);

  //onInsert함수 만들기
  const onInsert = useCallback(
    (text) => {
      const todo = {
        id: nextId.current,
        text,
        checked: false,
      };
      setTodos(todos.concat(todo));
      nextId.current += 1; //nextID 1씩 더하기
    },
    [todos],
  );

  //항목 지우기
  const onRemove = useCallback(
    (id) => {
      setTodos(todos.filter((todo) => todo.id !== id));
    },
    [todos],
  );

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} />
    </TodoTemplate>
  );
};

export default App;
```

2. `TodoListItem.js`에서 삭제한 함수 호출하기
* onRemove를 사용하려면 우선 TodoList 컴포넌트를 거쳐야 한다.
* props로 받아 온 onRemove 함수를 TodoListItem에 그대로 전달하기.

> TodoList.js 컴포넌트 수정
```javascript
const TodoList = ({ todos, onRemove }) => {
  return (
    <TodoListWrapper>
      {todos.map((todo) => (
        <TodoListItem todo={todo} key={todo.id} onRemove={onRemove} />
      ))}
    </TodoListWrapper>
  );
};

export default TodoList;
```

> TodoListItem.js 컴포넌트 수정
```javascript
const TodoListItem = ({ todo, onRemove }) => {
  const { id, text, checked } = todo;

  return (
    <TodoItemWrapper>
      <CheckBox className={cn('checkbox', { checked })}>
        {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
        <div className="text">{text}</div>
      </CheckBox>
      <Remove onClick={() => onRemove(id)}>
        <MdRemoveCircleOutline />
      </Remove>
    </TodoItemWrapper>
  );
};

export default TodoListItem;
```

## 7. `수정 기능 구현하기`
* onToggle이라는 함수를 만들어서 왼쪽 체크박스에 체크 또는 해제 하는 기능을 추가
* App.js 만들고 TodoList에 props 전달하고 TodoListItem까지전달

1. `App.js` 컴포넌트 수정
```javascript
  //항목 지우기
  const onRemove = useCallback(
    (id) => {
      setTodos(todos.filter((todo) => todo.id !== id));
    },
    [todos],
  );

  //onToggle 체크박스
  const onToggle = useCallback(
    (id) => {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, checked: !todo.checked } : todo,
        ),
      );
    },
    [todos],
  );

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
    </TodoTemplate>
  );
};

export default App;
```

2. `TodoList.js` 컴포넌트 수정
```javascript
const TodoList = ({ todos, onRemove, onToggle }) => {
  return (
    <TodoListWrapper>
      {todos.map((todo) => (
        <TodoListItem
          todo={todo}
          key={todo.id}
          onRemove={onRemove}
          onToggle={onToggle}
        />
      ))}
    </TodoListWrapper>
  );
};

export default TodoList;
```

3. `TodoListItem.js` 컴포넌트 수정
```javascript
const TodoListItem = ({ todo, onRemove, onToggle }) => {
  const { id, text, checked } = todo;

  return (
    <TodoItemWrapper>
      <CheckBox
        className={cn('checkbox', { checked })}
        onClick={() => onToggle(id)}
      >
        {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
        <div className="text">{text}</div>
      </CheckBox>
      <Remove onClick={() => onRemove(id)}>
        <MdRemoveCircleOutline />
      </Remove>
    </TodoItemWrapper>
  );
};

export default TodoListItem;
```
