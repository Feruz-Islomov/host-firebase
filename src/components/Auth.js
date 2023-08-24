import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, googleProvider } from "../config/firebase-config";
import { useState } from "react";

export const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //   console.log(auth?.currentUser?.email);
  //   console.log(auth?.currentUser?.photoURL);

  const signin = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("signed in!");
    } catch (err) {
      console.error(err);
    }
  };

  const signinWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      alert("signed in with GOOOOOOOOOGLE!");
    } catch (err) {
      console.error(err);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      alert("OUT!");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {!auth?.currentUser?.uid ? (
        <div>
          <input
            type="email"
            placeholder="Email..."
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password..."
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={signin}>Sign in</button>
          <button onClick={signinWithGoogle}>Sign in with GOOGLE</button>
        </div>
      ) : (
        <button onClick={logout}>Logout</button>
      )}
    </div>
  );
};
