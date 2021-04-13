import "./App.css";
import Todos from "./Todos";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import firebase from "firebase";

const sighInWithGoogle = () =>
  auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());

const SignIn = () => (
  <main>
    <h2> To Do List ...✏️ </h2>
    <button class="signIn" onClick={sighInWithGoogle}>Sign In</button>
  </main>
);

const App = () => {
  const [user] = useAuthState(auth);

  return user ? <Todos /> : <SignIn />;
};

export default App;
