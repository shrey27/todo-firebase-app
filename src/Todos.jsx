import "./App.css";
import { useState } from "react";
import firebase, {  firestore } from "./firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";

//const addTodo = functions.httpsCallable("addTodo");
//functions are not added in the Firebase backend so calling them will throw CORS error
//instead directly call firestore.collection(`users/${auth.currentUser.uid}/todos`).add() as on line 21

const Todos = () => {
  const [todo, setTodo] = useState("");
  const todosRef = firestore.collection("todos");
  const [todos] = useCollectionData(todosRef, { idField: "id" });

  const onSubmitTodo = (event) => {
    event.preventDefault();

    setTodo("");
    todosRef.add({
      text: todo,
      complete: false,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };

  return (<>
        <main>
        <div class="header"> 
            <h2> To Do List ...✏️ </h2>
        </div>
        <form onSubmit={onSubmitTodo}>
          <input required value={todo} onChange={(e) => setTodo(e.target.value)}placeholder="Enter a task"/>
          <button class="addButton" type="submit">Add</button>
        </form>
        <div>
        {todos && todos.map((todo) => <Todo key={todo.id} {...todo} />)}
        </div>
      </main>
    </>
  );
};

const Todo = ({ id, complete, text }) => {
  const todosRef = firestore.collection("todos");
  const onCompleteTodo = (id, complete) => todosRef.doc(id).set({ complete: !complete },{ merge: true });
  const onDeleteTodo = (id) => todosRef.doc(id).delete();

  return (
    <div key={id} className="todo">
      <p className={`todo-item ${complete ? "complete" : ""}`} tabIndex="0" > {text} </p>
      <p className = "marker" onClick={() => onCompleteTodo(id, complete)}>✅</p>
      <p className = "marker" onClick={() => onDeleteTodo(id)}>❌</p>
    </div>
  );
};

export default Todos;
