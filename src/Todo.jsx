import React, { useState } from "react";
function Todo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const apiurl = "http://localhost:8000";
  const handleSubmit = (e) => {
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
            setError("");
          } else {
            setError("unable to create todo item");
            setMessage("");
          }
        })
        .catch((err) => {
          setError("something went wrong" + err.message);
        });
    } else {
      setError("tITLE AND DESCRIPTION ARE required");
      setMessage("");
    }
  };
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
    </>
  );
}

export default Todo;
