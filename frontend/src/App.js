import './App.css';
import {TaskForm} from './components/TaskForm.js'
import {TaskList} from './components/TaskList'
import {useState, useEffect} from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function App() {

  const fetchTasks= ()=>{
    fetch('http://127.0.0.1:8000/api/todos/')
    .then(response=>response.json())
    .then(data=>{
      setTasks(data)
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  const [tasks, setTasks] = useState([])
  useEffect(()=>{
    fetchTasks()

  }, [tasks])

  return (
    <div className="App">
      <div id="task-container">
        <div className="heading-bar">
          <h2>ToDo List</h2>
        </div>
        <Router>
          <Switch>
            <Route exact path="/">
              <div className="addTask my-3 mx-4 ">
                <h3> <b>  Task List </b> </h3>
                <Link className="btn btn-outline-danger link" to="/addTask">Add Task</Link>
              </div>
              <TaskList tasks={tasks} />
            </Route>

            <Route exact path="/addTask">
              <TaskForm setTasks={setTasks} />
            </Route>

          </Switch>
        </Router>
        
      </div>
    </div>
  );
}

export default App;
