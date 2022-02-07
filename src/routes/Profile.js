import { authService } from "fbase";
import {
  signOut,
  updateProfile
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";
import { dbService } from "fbase";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import Nweet from "components/Nweet";

const Profile = ({ userObj, userDisplayName, refreshUser }) => {
  const Navigate = useNavigate();
  const [newDisplayName, setNewDisplayName] = useState(userDisplayName);
  const [myNweets, setMyNweets] = useState([]);

  const onLogOutClick = () => {
    signOut(authService);
    Navigate("/");
  };

  const onChange = (event) => {
    const { target: { value } } = event;
    setNewDisplayName(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (userDisplayName !== newDisplayName) {
      await updateProfile(userObj, { displayName: newDisplayName });
      refreshUser();
    }
  };

  const onSocialClick = async (event) => {
    const { target: { name } } = event;
    if (name === "google") {
      console.log("!!!");
    } else if (name === "github") {
      console.log("???");
    }
  };

  const FetchMyNweets = async (userObj) => {
    const myNweets = (await getDocs(query(collection(dbService, "nweets"), where("creatorId", "==", userObj.uid), orderBy("createdAt", "asc")))).docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));
    setMyNweets(myNweets);
  };

  useEffect(() => {
    FetchMyNweets(userObj);
  }, [userObj]);

  return (
    <div
      style={{
        maxWidth: 890,
        width: "100%",
        margin: "0 auto",
        marginTop: 80,
        display: "flex",
        justifyContent: "center",
    }}>
      <div className="container">
        <form className="profileForm" onSubmit={ onSubmit }>
          <input className="formInput" autoFocus type="text" placeholder="Display name" onChange={ onChange } value={newDisplayName} />
          <input className="formBtn" type="submit" value="Update Profile" style={{ marginTop: 10 }} />
        </form>
        <span className="formBtn cancelBtn logOut" onClick={ onLogOutClick }>Log Out</span>
        { userObj.isAnonymous && <>
          <span className="formBtn" onClick={ onSocialClick } name="google">
            Credential with Google<FontAwesomeIcon icon={ faGoogle }/>
          </span>
          <span className="formBtn" onClick={ onSocialClick } name="github">
            Credential with Github<FontAwesomeIcon icon={ faGithub }/>
          </span>
        </>}
        <div className="container">
          <div style={{ marginTop: 30 }}>
            { myNweets.map((nweet) => {
              console.log(nweet);
              return <Nweet key={ nweet.id } nweetObj={ nweet } isOwner={ nweet.creatorId === userObj.uid } />
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
