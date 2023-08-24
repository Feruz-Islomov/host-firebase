import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../config/firebase-config";

const UpdateMovie = ({ id, movie, getMovieList }) => {
  const [updatedTitle, setUpdatedTitle] = useState("");

  const updateMovieTitle = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await updateDoc(movieDoc, { title: updatedTitle });
    getMovieList();
    alert("updated!");
  };
  return (
    <>
      <input
        onChange={(e) => setUpdatedTitle(e.target.value)}
        placeholder="new title..."
      />
      <button onClick={() => updateMovieTitle(movie.id)}>update title</button>
    </>
  );
};

export default UpdateMovie;
