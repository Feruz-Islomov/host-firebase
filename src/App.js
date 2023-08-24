import { useEffect, useState } from "react";
import "./App.css";
import { Auth } from "./components/Auth";
import { auth, db, storage } from "./config/firebase-config";
import {
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import UpdateMovie from "./components/UpdateMovie";
import { uploadBytes, ref } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [movieList, setMovieList] = useState([]);
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState(0);
  const [newMovieOscar, setNewMovieOscar] = useState(false);

  const movieCollectionRef = collection(db, "movies");

  const getMovieList = async () => {
    try {
      const data = await getDocs(movieCollectionRef);
      const fileteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMovieList(fileteredData);
    } catch (err) {
      console.error(err);
    }
  };

  const onSubmitMovie = async () => {
    try {
      const uploading = await addDoc(movieCollectionRef, {
        // id: uuidv4(),
        title: newMovieTitle,
        releaseDate: newReleaseDate,
        Oscar: newMovieOscar,
        userId: auth?.currentUser?.uid,
      });
      getMovieList();
      alert("movie is submitted!");
    } catch (err) {
      console.error(err);
    }
  };

  const deleteMovie = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await deleteDoc(movieDoc);
    getMovieList();
    alert("deleted!");
  };
  const [filesUpload, setFilesUpload] = useState();

  const uploadImage = async () => {
    if (!filesUpload) return;
    const filesUploadRef = ref(
      storage,
      `projectFiles/${filesUpload.name + uuidv4()}`
    );
    try {
      await uploadBytes(filesUploadRef, filesUpload);
      alert("uploaded!");
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <div className="App">
      <h1>FIREBASE CRUD NEW</h1>
      {auth?.currentUser?.uid && (
        <>
          <p>name: {auth?.currentUser?.displayName}</p>
          <p>userid: {auth?.currentUser?.uid}</p>
          <p>email: {auth?.currentUser?.email}</p>
        </>
      )}
      <Auth />

      <hr />
      {auth?.currentUser?.uid || (
        <div>
          <input
            onChange={(e) => setNewMovieTitle(e.target.value)}
            type="text"
            placeholder="movie title..."
          />
          <input
            onChange={(e) => setNewReleaseDate(Number(e.target.value))}
            type="number"
            placeholder="movie date..."
          />
          <input
            onChange={(e) => setNewMovieOscar(e.target.checked)}
            checked={newMovieOscar}
            type="checkbox"
          />
          <label>Oscar </label>
          <button onClick={onSubmitMovie}>submit movie</button>
        </div>
      )}

      {movieList.map((movie) => {
        return (
          <div key={movie.id}>
            <h1 style={{ color: movie.Oscar ? "green" : "red" }}>
              {movie.title}
            </h1>
            <p>Date: {movie.releaseDate}</p>
            {auth?.currentUser?.uid && (
              <>
                <button onClick={() => deleteMovie(movie.id)}>delete</button>
                <UpdateMovie
                  id={movie.id}
                  movie={movie}
                  getMovieList={getMovieList}
                />
              </>
            )}
          </div>
        );
      })}

      <hr />
      <input onChange={(e) => setFilesUpload(e.target.files[0])} type="file" />
      <button onClick={uploadImage}>upload Image</button>
    </div>
  );
}

export default App;
// allow create, write, delete: if request.auth.uid != null && request.auth.uid == request.resource.data.userId;
// allow read: if true;
