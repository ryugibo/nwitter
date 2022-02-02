import { useEffect, useState } from "react";
import { dbService } from "fbase";
import { getDocs, addDoc, collection } from "firebase/firestore";

const Home = () => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);

  const getNweets = async () => {
    const dbNweets = await getDocs(collection(dbService, "nweets"));
    dbNweets.forEach((document) =>
      setNweets((prev) => [document.data(), ...prev])
    );
  };

  useEffect(() => {
    getNweets();
  }, []);

  console.log(nweets);

  const onSubmit = async (event) => {
    event.preventDefault();
    await addDoc(collection(dbService, "nweets"), {
      text: nweet,
      createdAt: Date.now(),
    });
    setNweet("");
  };

  const onChange = (event) => {
    event.preventDefault();
    const { target: { value } } = event;
    setNweet(value);
  };
  
  return (
    <form onSubmit={ onSubmit }>
      <input value={ nweet } onChange={ onChange } type="text" placeholder="What's on your mind?" maxLength={ 120 } />
      <input type="submit" value="Nweet" />
    </form>
  );
};

export default Home;
