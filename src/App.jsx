// import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  onSnapshot,
  query,
} from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCSfPVoSFsdskHPv9qLwonKtaQKdy6o3_Y",
  authDomain: "facebook-with-database.firebaseapp.com",
  projectId: "facebook-with-database",
  storageBucket: "facebook-with-database.appspot.com",
  messagingSenderId: "287155094336",
  appId: "1:287155094336:web:cf93e76dc20a1c353f70a5",
  measurementId: "G-6D913L5E12",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

function App() {
  const [postText, setPostText] = useState("");
  const [posts, setPosts] = useState([]);

  // ==========================================================================================/

  useEffect(() => {
    // const getData = async () => {
    //   const querySnapshot = await getDocs(collection(db, "posts"));
    //   querySnapshot.forEach((doc) => {
    //     console.log(`${doc.id} => $`, doc.data());

    //     setPosts((prev) => {
    //       let newArry = [...prev, doc.data()];

    //       return newArry;
    //     });
    //   });
    // };

    // getData();

    // ===================  realtime data ================================

    const getRealTimeData = () => {
      
      const q = query(collection(db, "posts"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const posts = [];
        querySnapshot.forEach((doc) => {
          posts.push(doc.data().name);
        });

          setPosts((prev) => {
           let newArry = [...prev, doc.data()];

           return newArry;
        });


        //  setPosts(posts);
        console.log("posts : ",newArry);


       
      });
    };
    getRealTimeData();
  }, []);

  // =================================================================================================

  const savePost = async (e) => {
    e.preventDefault();
    console.log("postText", postText);

    try {
      const docRef = await addDoc(collection(db, "posts"), {
        text: postText,
        createdOn: new Date().getTime(),
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  // ============================================================================================

  return (
    <div>
      <form action="#" onSubmit={savePost}>
        <textarea
          type="text"
          placeholder="What's in your mind"
          onChange={(e) => {
            setPostText(e.target.value);
          }}
        />
        <br />

        <button type="submit">Post</button>
      </form>
      <div>
        {posts.map((eachPost, i) => (
          <div key={i} className={"news"}>
            <h3>{eachPost?.text}</h3>
            <p>{eachPost?.createdOn}</p>
            {/* <p>
              {moment(eachPost?.datePublished).format(" Do MMMM YYYY, h:mm:")}
            </p>

            <a href={eachPost?.url} target="_blank" rel="noreferrer">
              <button className="btn btn-success">Read more...</button>
            </a>

            <div className="image">
              <img
                className="img-fluid my-3"
                src={eachPost?.image?.thumbnail?.contentUrl
                  ?.replace("&pid=News", "")
                  .replace("pid=News&", "")
                  .replace("pid=News", "")}
                alt=""
              />
            </div> */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
