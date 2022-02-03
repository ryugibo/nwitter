import { authService, dbService } from "fbase";
import { signOut } from "firebase/auth";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Profile = ({ userObj }) => {
  const Navigate = useNavigate();
  const onLogOutClick = () => {
    signOut(authService);
    Navigate("/");
  };

  const getMyNweets = async () => {
    const nweets = await getDocs(query(collection(dbService, "nweets"), where("creatorId", "==", userObj.uid), orderBy("createdAt", "asc")));

    console.log(nweets.docs.map((doc) => doc.data()));
    // @TODO: 내 글 목록 표시하기
  };

  useEffect(() => {
    getMyNweets();
  }, []);

  return (
    <>
      <button onClick={ onLogOutClick }>Log Out</button>
    </>
  );
};

export default Profile;
