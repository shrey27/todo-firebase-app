import "./App.css";
import { useState } from "react";
import firebase, { auth, firestore } from "./firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Todo from "./Todo";

//const addTodo = functions.httpsCallable("addTodo");
//functions are not added in the Firebase backend so calling them will throw CORS error
//instead directly call firestore.collection(`users/${auth.currentUser.uid}/todos`).add() as on line 21

const Todos = () => {
  const [todo, setTodo] = useState("");
  const todosRef = firestore.collection(`users/${auth.currentUser.uid}/todos`);
  const [todos] = useCollectionData(todosRef, { idField: "id" });

  const signOut = () => auth.signOut();

  const onSubmitTodo = (event) => {
    event.preventDefault();

    setTodo("");
    todosRef.add({
      text: todo,
      status: "InProgress",
      complete: false,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };

  return (<>
        <main>
        <div class="header">
            <h2> To Do List ...✏️ </h2>
            <button class="signIn" onClick={signOut}>Sign Out</button>
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

export default Todos;
