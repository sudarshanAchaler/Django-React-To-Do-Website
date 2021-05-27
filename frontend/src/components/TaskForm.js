import React from 'react'
import {useState} from 'react'
import {Link} from 'react-router-dom'

export const TaskForm = () => {
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [complete, setComplete] = useState(false)

    const handleSubmit = (e)=>{
        e.preventDefault()

        var newTask={
            "title": title,
            "description": desc,
            "completed": complete
        }

        fetch('http://127.0.0.1:8000/api/todos/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTask),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            document.getElementById('redirect1').click();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
        
        setTitle('');
        setDesc('');
        setComplete(false);
    
    }


    return (
        <div  id="form-wrapper">
            <div className="backbtn">
                <h3> <b>Add Task</b> </h3>
                <Link className="btn btn-outline-dark link" to="/">Back</Link>
            </div>
                <form   id="form" onSubmit={handleSubmit}>
                    <div className="my-3">
                        <label htmlFor="title-input" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title-input" placeholder="Enter Task title here..." value={title} onChange={(e)=>{setTitle(e.target.value)}} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description-textarea" className="form-label">Description</label>
                        <textarea className="form-control" id="description-textarea" rows="3" placeholder="Describe task here..." value={desc} onChange={(e)=>{setDesc(e.target.value)}} ></textarea>
                    </div>
                    <div className="form-check">
                        <input  className="form-check-input" type="checkbox"  id="flexCheckDefault" value={complete} onChange={(e)=>{setComplete(e.target.checked)}} />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            Complete
                        </label>
                    </div>

                    <div className="mt-3">
                        <button type="submit" className="btn btn-success">Add Task</button>
                    </div>
                </form>

                <Link hidden to='/' id="redirect1">redirect</Link>
             
        </div>
    )
}
