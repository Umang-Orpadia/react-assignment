import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css';

function App() {
  const [todos,setTodos] = useState('')
  const [task,setTask] = useState('')
  const [desc,setDesc] = useState('')
  const handelAdd = ()=>{
    axios.post('http://localhost:4000/add',{task:task,desc:desc})
    .then(result => console.log(result))
    .catch(err => console.log(err))
  }
  useEffect(()=>{
    axios.get('http://localhost:4000/get')
    .then(result => setTodos(result.data))
    .catch(err => console.log(err))
  },[])
  const handelEdit = (id)=>{
    axios.put('http://localhost:4000/update/'+id)
    .then(result => console.log(result))
    .catch(err => console.log(err))
  }
  const handelDelete = (id)=>{
    axios.delete('http://localhost:4000/delete/'+id)
    .then(result =>console.log(result))
    .catch(err => console.log(err))
  }
  return (
    <div className="App">
      <h1>Todo list</h1>
      <div className="inputElements">
        <input type="text" placeholder='Enter your task' className="task" onChange={(e) => setTask(e.target.value)} required/>
        <input type="text" placeholder='Enter description' className="desc" onChange = {(e) => setDesc(e.target.value)} required/>
        <button type="button" className='addTask' onClick={handelAdd}>Add</button>
      </div>
        {/* <hr /> */}
        {
          todos.length === 0 ?
          <div><h2>No record</h2></div>
          :
          todos.map(todo => (
            <div onClick={() => handelEdit(todo._id)} className='listOfTasks'>
              <p className={todo.completed ? 'line-through' : 'linethrough' }>{todo.task} {todo.desc}</p>
              <button type="button" className='deleteBtn' onClick={() => handelDelete(todo._id)}>Delete</button><br /><br />
            </div>
          ))
        }
    </div>
  );
}

export default App;
