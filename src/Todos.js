import { useState } from "react";
import firebase, {  firestore } from "./firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";

//const addTodo = functions.httpsCallable("addTodo");
//functions are not added in the Firebase backend so calling them will throw CORS error
//instead directly call firestore.collection(`users/${auth.currentUser.uid}/todos`).add() as on line 21

const Todos = () => {
    const todosRef = firestore.collection("users");
    
    const [input, setInput] = useState('');
    const [todos] = useCollectionData(todosRef, { idField: "id" });
    
    // useCollectionData provides faster response than useEffect
    // Try by clicking ✅ or ❌ 
    // useEffect works with some delay
    
    /*
        const [todos, setTodos] = useState([]);
        useEffect(()=>{ getTodos(); })
    
        function getTodos() { todosRef.onSnapshot(
        (querySnapshot) => { setTodos( querySnapshot.docs.map((doc)=>({
                id: doc.id,
                text: doc.data().text,
                complete: doc.data().complete  }) ) ) } )
        }
    */
    
    function addTodo(event) { event.preventDefault();
      todosRef.add({
        text: input,
        complete: false,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
      setInput("")
    }
  
  return (<>
          <main>
          <div className="header"> 
              <h2> To Do List ...✏️ </h2>
          </div>
          <form onSubmit={addTodo}>
            <input required value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter a task"/>
            <button class="addButton" type="submit">Add</button>
          </form>
          <div>
              {todos && todos.map((todo) => <Todo key={todo.id} id={todo.id} complete={todo.complete} text={todo.text} />)}
          </div>
        </main>
      </>
    );
  };
  
  const Todo = ({ id, complete, text }) => {
    const todosRef = firestore.collection("users");
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