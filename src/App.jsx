import { useEffect, useRef, useState } from "react";

function App() {
  const [inputField, setInputField] = useState("");

  const [todo, setTodo] = useState([]);
  const [todoId, setTodoId] = useState([]);

  useEffect(function () {
    fetch("https://pleasant-wear-duck.cyclic.app/api/v1/users")
      .then((res) => {
        if (!res.ok) return;
        return res.json();
      })
      .then((data) => {
        setTodoId(() => [...data.map((el) => el.id)]);
        setTodo(() => [...data.map((el) => el.title)]);
      });
  }, []);

  function addTodo(e) {
    e.preventDefault();
    if (!inputField) return;
    fetch("https://pleasant-wear-duck.cyclic.app/api/v1/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: inputField,
      }),
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        console.log(data);
        setTodo((todo) => [...todo, inputField]);
        setTodoId(() => [...data.Data.map((el) => el.id)]);
        setInputField("");
      });
    console.log(todoId);
  }

  function deleteTodo(e, i, id) {
    fetch(`https://pleasant-wear-duck.cyclic.app/api/v1/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        console.log(data);
        todo.splice(i, 1);
        todoId.splice(i, 1);
        setTodo((todo) => [...todo]);
        setTodoId((todoId) => [...todoId]);
      });
  }

  function updateTodo(e, index, id) {
    const updatedValue = prompt("Edit your todo");
    console.log(updatedValue);
    fetch(`https://pleasant-wear-duck.cyclic.app/api/v1/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: updatedValue,
      }),
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        todo.splice(index, 1, updatedValue);

        setTodo((todo) => [...todo]);

        console.log(todo);
      });
  }

  return (
    <>
      <form onSubmit={(e) => addTodo(e)}>
        <input
          type="text"
          value={inputField}
          onChange={(e) => setInputField(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <div>
        {todo.length > 0
          ? todo.map((el, index) => {
              return (
                <div key={index} id={todoId[index]}>
                  {el}
                  {todoId[index]}
                  <button onClick={(e) => deleteTodo(e, index, todoId[index])}>
                    delete
                  </button>
                  <button onClick={(e) => updateTodo(e, index, todoId[index])}>
                    Update
                  </button>
                </div>
              );
            })
          : "not found"}
      </div>
    </>
  );
}

export default App;
