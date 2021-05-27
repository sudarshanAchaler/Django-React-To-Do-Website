import React from 'react'

export const TaskList = (props) => {

    function getCookie(name){
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    const handleDelete = (taskId) =>{
        var url = 'http://127.0.0.1:8000/api/todos/'+taskId+ '/'
        var csrftoken = getCookie('csrftoken')
        fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken':csrftoken,
            },
        })
        .then(console.log('Delete successful'))
    }

    const handleComplete = (id,title,desc,completed)=>{
        var newdata={
            "id": id,
            "title": title,
            "description": desc,
            "completed": !completed
        }
        var url = 'http://127.0.0.1:8000/api/todos/'+id+ '/'
        var csrftoken = getCookie('csrftoken')
        fetch(url,{
            method:"PUT",
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken':csrftoken,
            },
            body: JSON.stringify(newdata),
        })
        .then(response=>response.json())
        .then(data=>console.log(data))
        .catch((error) => {
            console.error('Error:', error);
        });

    }

    return (
        <div className="list-wrapper">

            { props.tasks.map((task, index)=>{
                return(
                    <div className="task-wrapper flex-wrapper" key={index} >
                        <p>{task.completed ? <s>{task.title}</s> : task.title  }</p>
                        <span className="listbtns">
                            <button className="btn btn-success btn-sm mx-1" onClick={()=>{handleComplete(task.id,task.title,task.description,task.completed)}}>{ task.completed ? ' Not Completed?' :'Completed?'}</button>
                            <button className="btn btn-danger btn-sm mx-1" onClick={()=>{handleDelete(task.id)}}>Delete</button>
                        </span>
                    </div>
                )
                
            })}
            
        </div>
    )
}
