import "./App.css";
import { auth, firestore } from "./firebase";


const Todo = ({ id, complete, text }) => {
    const todosRef = firestore.collection(`users/${auth.currentUser.uid}/todos`);
    const onCompleteTodo = (id, complete) =>
      todosRef.doc(id).set({ complete: !complete }, { merge: true });
  
    const onDeleteTodo = (id) => todosRef.doc(id).delete();
  
    return (
      <div key={id} className="todo">
        <p> {text} </p>
        <button  className={`todo-item ${complete ? "complete" : ""}`}
          tabIndex="0"
          onClick={() => onCompleteTodo(id, complete)}>✅</button>
        <button onClick={() => onDeleteTodo(id)}>❌</button>
      </div>
    );
  };

  export default Todo;