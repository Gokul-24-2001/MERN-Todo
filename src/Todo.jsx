import React, { useEffect, useState } from "react";
function Todo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  // Edit

  const[editid,setEditId]=useState(-1);
  const[editTitle,setEditTitle]=useState("")
  const [editDescription,setEditDescription]=useState("");
  
  const apiurl = "http://localhost:8000";
  const handleSubmit = (e) => {
    // before submitting error message removal
    setError("");
    if (title !== "" && description !== "") {
      e.preventDefault();
      fetch(apiurl + "/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      })
        .then((res) => {
          if (res.ok) {
            // add item in list
            setTodos([...todos, { title, description }]);
            setMessage("item added successfully");
            setTimeout(()=>{
     setMessage("");
            },3000)
          } else {
            setError("unable to create todo item");
          }
        })
        .catch((err) => {
          setError("something went wrong" + err.message);
        });
    } else {
      setError("tITLE AND DESCRIPTION ARE required");
    }
  };
  useEffect(()=>{
 getItems();
  },[])
  const getItems=()=>{
    fetch(apiurl+'/todos')
    .then((res)=>{
      return res.json()
    })
    .then((res)=>{
      setTodos(res);
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  const handleEdit=(item)=>{
    setEditId(item._id);
    setEditTitle(item.title);
    setEditDescription(item.description);
  }
  const handleEditCancel=()=>{
    setEditId(-1);
  }
  const handleUpdate=(e)=>{
    setError("");
    if (editTitle !== "" && editDescription !== "") {
      e.preventDefault();
      fetch(apiurl + "/todos/"+editid, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title:editTitle, description:editDescription }),
      })
        .then((res) => {
          if (res.ok) {
            // update item in list
            const updatedTodos= todos.map((item)=>{
         if(item._id==editid){
          item.title=editTitle;
          item.description=editDescription;
         }
         return item;
            })
            setTodos(updatedTodos);
            setMessage("item updated successfully");
            setTimeout(()=>{
     setMessage("");
            },3000)
            setEditId(-1);
          } else {
            setError("unable to create todo item");
          }
        })
        .catch((err) => {
          setError("something went wrong" + err.message);
        });
    } else {
      setError("tITLE AND DESCRIPTION ARE required");
    }
  }
  console.log(todos);
  return (
    <>
      <div className="row p-2 bg-success text-light text-center">
        <h1>Todos Items</h1>
      </div>
      <div className="row d-flex justify-items-center ">
        <h3>Text item</h3>
        {message && <p className="text-success">{message}</p>}
        <div className="form-group d-flex gap-2">
          <input
            placeholder="Title"
            className="form-control"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            type="text"
          ></input>
          <input
            placeholder="descripton"
            className="form-control"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            type="text"
          ></input>
          <button className="btn btn-dark" onClick={handleSubmit}>
            submit
          </button>
        </div>
      </div>
      {error && <p className="text-danger">{error}</p>}
      <div className="row mt-3">
        <h1>Tasks</h1>
        <ul className="list-group">
         { todos.map((item)=>{
         return  <li className="list-group-item my-2 d-flex bg-info justify-content-between">
          <div className="d-flex flex-column text-danger"> 
           {editid==-1 || editid!==item._id?<><span className="fw-bold">{item.title}</span>
           <span> {item.description} </span></>:<> <div className="form-group d-flex gap-2 me-2">
           <input
            placeholder="Title"
            className="form-control"
            onChange={(e) => setEditTitle(e.target.value)}
            value={editTitle}
            type="text"
          ></input>
          <input
            placeholder="descripton"
            className="form-control"
            onChange={(e) => setEditDescription(e.target.value)}
            value={editDescription}
            type="text"
          ></input>
          </div></>} 
          </div>
          <div className="d-flex gap-2 align-items-center">
           {editid==-1 || editid!==item._id?<button className="btn btn-warning"onClick={()=>{handleEdit(item)}}>Edit</button>:<button className="btn btn-warning" onClick={handleUpdate}>update</button>}
        {editid==-1 || editid!==item._id?<button className="btn btn-danger">delete</button>:<button onClick={()=>handleEditCancel()} className="btn btn-danger">Cancel</button>}  
          </div> 
         </li>
         })}
        </ul>
      </div>
    </>
  );
}

export default Todo;
