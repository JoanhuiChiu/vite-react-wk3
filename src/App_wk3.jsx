import { useState, useEffect } from 'react';
import axios from 'axios';

const apiSite = 'https://todolist-api.hexschool.io';

//註冊
function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [nickname, setNickname] = useState('');

  const signUp = async () => {
    try {
      const response = await axios.post(`${apiSite}/users/sign_up`, {
        email,
        password,
        nickname,
      });
      setMessage('註冊成功. UID: ' + response.data.uid);
      
    } catch (error) {
       //console.log(error.response.data.message);
      setMessage('註冊失敗:' +  error.messag+'>>'+error.response.data.message);
    }
  };

  return (
    
    <div >
      <h2>註冊帳號</h2>
      <input className='Col'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Email'
        />
        <input className='Col'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
          type='password'
        />
         <input className='Col'
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder='Nickname'
            type='text' 
          />
           <button onClick={signUp}>註冊</button>
           <p>Message:{message}</p>
           
    </div>
  );
}
//登入
function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [message, setMessage] = useState('');

  const signIn = async () => {
    try {
      const response = await axios.post(`${apiSite}/users/sign_in`, {
        email: email,
        password: password,
      });
      setToken(response.data.token);
      setMessage('登入成功 UID: ' + response.data.uid+'  ◎使用者: ' + response.data.nickname);
     
    } catch (error) {
      setToken('登入失敗: ' + error.message);
      setMessage('登入失敗: ' + error.response.data.message);
    }
  };

  return (
    <div >
      <h2>登入</h2>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder='Email'
        type='email'
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder='Password'
        type='password'
      />
      <button onClick={signIn}>登入</button>
      <p>Token: {token}</p>
      <p>Message:{message}</p>
    </div>
  );
}

//身份驗證
function CheckOut({ token, setToken }) {
  const [message, setMessage] = useState('');

  const checkOut = async () => {
    // 將 Token 儲存，到期日為明天
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    document.cookie = `hexschoolTodo=${token}; expires=${tomorrow.toUTCString()}`;
    console.log(
      document.cookie
        .split('; ')
        .find((row) => row.startsWith('hexschoolTodo')),
    );
    try {
      const response = await axios.get(`${apiSite}/users/checkout`, {
        headers: {
          Authorization: token,
        },
      });
      setMessage('身份驗證成功 UID: ' + response.data.uid);
    } catch (error) {
      setMessage('身份驗證失敗: ' + error.message+','+error.response.data.message);
    }
  };

  return (
    <div >
      <h2>身份驗證</h2>
      <input
        value={token}
        onChange={(e) => {
          setToken(e.target.value);
        }}
        placeholder='Token'
      />
      <button onClick={checkOut}>驗證</button>
      <p>Token: {token}</p>
      <p>Message:{message}</p>
    </div>
  );
}

//登出
function SignOut() {
  const [token, setToken] = useState('');
  const [message, setMessage] = useState('');
  const signOut = async () => {
    try {
      const response = await axios.post(
        `${apiSite}/users/sign_out`,
        {},
        {
          headers: {
            Authorization: token,
          },
        },
      );
      //console.log(response.data);
      setMessage('成功登出: ' + response.data.message);
    } catch (error) {
      setToken('登出錯誤: ' + error.message);
      setMessage('登出錯誤: ' + error.response.data.message);
    }
  };

  return (
    <div >
      <h2>登出</h2>
      <input
        value={token}
        onChange={(e) => {
          setToken(e.target.value);
        }}
        placeholder='Token'
      />
      <button onClick={signOut}>登出</button>
      <p>Message:{message}</p>
    </div>
  );
}


//待辦清單
const TodoList = ({ token }) => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [todoEdit, setTodoEdit] = useState({});

  useEffect(() => {
    getTodos();
  }, []);

  //取得待辦清單
  const getTodos = async () => {
    const response = await axios.get(`${apiSite}/todos`, {
      headers: {
        Authorization: token,
      },
    });
    setTodos(response.data.data);
  };
  //新增待辦清單
  const addTodo = async () => {
    if (!newTodo) return;
    const todo = {
      content: newTodo,
    };
    await axios.post(`${apiSite}/todos`, todo, {
      headers: {
        Authorization: token,
      },
    });
    setNewTodo('');
    getTodos();
  };

   //刪除待辦清單
  const deleteTodo = async (id) => {
    await axios.delete(`${apiSite}/todos/${id}`, {
      headers: {
        Authorization: token,
      },
    });
    getTodos();
  };

  //更新待辦清單
  const updateTodo = async (id) => {
    const todo = todos.find((todo) => todo.id === id);
    todo.content = todoEdit[id]
    await axios.put(`${apiSite}/todos/${id}`, todo, {
      headers: {
        Authorization: token,
      },
    });
    getTodos();
    setTodoEdit({
      ...todoEdit,
      [id]: ''
    })
  };

  const toggleStatus = async (id) => {
    await axios.patch(
      `${apiSite}/todos/${id}/toggle`,
      {},
      {
        headers: {
          Authorization: token,
        },
      },
    );
    getTodos();
  };

  return (
    <div >
      <input
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder='New Todo'
      />
      <button onClick={addTodo}>新增待辦任務</button>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo.content} {todo.status ? '完成' : '未完成'}
            | {todoEdit[todo.id]}
            <input type="text" placeholder='更新值' onChange={
              (e) => {
                const newTodoEdit = {
                  ...todoEdit
                }
                newTodoEdit[todo.id] = e.target.value
                setTodoEdit(newTodoEdit)
              }
            } />
            <button onClick={() => deleteTodo(todo.id)}>刪除</button>
            <button onClick={() => updateTodo(todo.id)}>更新</button>
            <button onClick={() => toggleStatus(todo.id)}>
              狀態更新
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};


//render UI : 作業3
function App_wk3() {  
  const [token, setToken] = useState('');
  const TodoToken = document.cookie
    .split('; ')
    .find((row) => row.startsWith('hexschoolTodo='))
    ?.split('=')[1];
  useEffect(() => {
    if (TodoToken) {
      setToken(TodoToken);
    }
  }, []);

  return (
    <>

 <h1>(wk3) : 註冊/登入/身份驗證/登出</h1>
  
  <div className="col bg-yellow" >
      <div className="row">
      <SignUp />
      </div>
      <div className="row">
      <SignIn />
      </div>
      <div className="row">     
        <CheckOut setToken={setToken} token={token} />
        <SignOut />
      
      </div>
  </div>


        <div className="col">
          <h2>待辦清單</h2>
          {
            token && <TodoList token={token} />
          }
        </div>
    </>
  );
}

export default App_wk3;
