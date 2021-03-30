import React, {useState , useEffect } from 'react'
import { isEmpty, size } from 'lodash'
import { addDocument, getCollection, updateDocument,deleteDocument } from './actions'
function App() {
  const [task, setTask] = useState("")
  const [tasks, setTasks] = useState([])
  const [editMode, setEditMode] = useState(false)
  const [id, setId] = useState("")
  const [error, setError] = useState(null)

  useEffect (()=>{
    (async()=>{
      const result = await getCollection("task")
      if(result.statusResponse){
        console.log(result)
        setTasks(result.data)
      }
    })()
  },[])
  const validForm = ()=>{
    let isvalid = true
    setError(null)
    if(isEmpty(task)){
      setError("Name is empty")
      isvalid = false
      return
    }

    return isvalid
  }

  const addTask = async (e) =>{
    e.preventDefault()
    if(!validForm()) return

    const result = await addDocument("task",{task})
    if(!result.statusResponse){
      setError(result.error)
      return
    }
    const newTask = {
      id : result.data.id,
      task
    }

    setTasks([...tasks,newTask])
    console.log(newTask)
    setTask("")
  }

  const saveTask = async (e) =>{
    e.preventDefault()
    if(!validForm()) return

    const result = await updateDocument("task",id,{task})
    if(!result.statusResponse){
      setError(result.error)
      return
    } 
    const editedTasks = tasks.map(item=>item.id === id? { id,task: task } : item)
    setTasks(editedTasks)
    setEditMode(false)
    setTask("")
    setId("")
    console.log("Modificada")
    
  }

  const deleteTask = async (id)=>{
    const result = await deleteDocument("task",id)
    if(!result.statusResponse){
      setError(result.error)
      return
    } 
    const filterTask  = tasks.filter(task => task.id !== id)
    setTasks(filterTask)
  }

  

  const editTask = (theTask) => {
    setTask(theTask.task)
    setEditMode(true)
    setId(theTask.id)
  }

  return (
    <div className="container mt-5">
      <h1>Tareas</h1>
      <hr/>
      <div className="row ">
        <div className="col-7">
          <h4 className="text-center">List Task</h4>
          {
            size(tasks) > 0 ?
            <ul className="list-group">
            {
              tasks.map(task=>(
                <li className="list-group-item">
                  <span className="lead">{task.task}</span>
                  <button className="btn btn-danger btn-sm float-right mx-2" onClick={()=> deleteTask(task.id)}>
                    Delete
                  </button>
                  <button className="btn btn-warning btn-sm float-right" onClick={()=> editTask(task)}>
                    Update
                  </button>
                </li>
              ))
              
            }
            </ul>
            : 
            <li className="list-group-item">Task empty</li>
          }
          
        </div>
        <div className="col-5">
          <h4 className="text-center">{editMode ? "Edit Task":"Add Task"}</h4>
          <form onSubmit={editMode? saveTask : addTask}>
            {
              error && <span className="text-danger">{error}</span>
            }
            <input type="text" className="form-control md-2" placeholder="Ingresar tarea.."
            onChange={(text)=> setTask(text.target.value)}
            value={task}/>
            
            <button className={editMode? "btn btn-warning btn-block mt-2": "btn btn-dark btn-block mt-2"} 
             type="submit" >
             {editMode?"Save":"Add"}
            </button>
          </form>

        </div>
      </div>
    </div>
  )
}

export default App;
