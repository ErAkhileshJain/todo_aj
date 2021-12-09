import { useState} from 'react'
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [editInputValue, setEditInputValue] = useState('');
  const [editId, setEditId] = useState('');
  const [todoList, setTodoList] = useState([]);
  const [errMsg, setErrMsg] = useState('')
   const [showEditBox, setShowEditBox] = useState(false);
   const [showInputBox, setShowInputBox] = useState(true);

  const addTodoList = () => {
    if (!inputValue) {
      setErrMsg("Can't be empty")
      return
    }
    const todo = [...todoList]
    todo.push({ id: (Date.now() + "").substring(10, 13), inputValue });
    setTodoList(todo)
    setInputValue('')
    setErrMsg('')
  }

  const clearTodo = () => {
    setTodoList([])
  }


  const deleteTodo = (id) => {
    setTodoList(todoList.filter((val) => val.id !== id));
  }

  const EditInput = () => {
    setShowInputBox(false);
    return (
      <div>
        <span className="p-text">Update Text</span>
        <input
          type="text"
          placeholder="Enter Text"
          onChange={(e) => setEditInputValue(e.target.value)}
          value={editInputValue}
        />
        <button className="submit-update" onClick={updateValue}>
          Update
        </button>
      </div>
    );
    
  }

  const InputText=()=> {
    return (
      <div>
        <span className="p-text">Enter Text</span>
        <input
          type="text"
          placeholder="Enter Text"
          onChange={e => setInputValue(e.target.value)}
          value={inputValue}
        />
        <button className="submit-add" onClick={addTodoList}>
          Submit
        </button>
      </div>
    );
  }

  const updateValue = () => {
    const arr=todoList.map(val => {
      if (val.id === editId) {
        val.inputValue=editInputValue
      }
      return val;
    })
    setShowEditBox(false)
    setEditId('')
    setTodoList(arr)
    setEditInputValue('')
    setShowInputBox(true)
  }



  return (
    <div>
      <div className="header">
        <p className="p-header">TODO List</p>
      </div>
      {showInputBox ? <InputText /> : null}
      {showEditBox ? <EditInput /> : null}
      {errMsg ? <p className="p-error">{errMsg}</p> : null}
      {todoList.length > 0 ? (
        <div>
          <table id="data">
            <thead>
              <th>ID</th>
              <th>Value</th>
              <th>Action</th>
            </thead>
            <tbody>
              {todoList.map((val) => {
                return (
                  <tr>
                    <td>{val.id}</td>
                    <td>{val.inputValue}</td>
                    <td id="td-1">
                      <button
                        className="button-red"
                        onClick={() => deleteTodo(val.id)}
                      >
                        Delete
                      </button>
                      <button
                        className="button-blue"
                        onClick={() => {
                          setEditId(val.id);
                          setShowEditBox(true);
                        }}
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <button className="button-red" onClick={clearTodo}>
            Clear All
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default App;
