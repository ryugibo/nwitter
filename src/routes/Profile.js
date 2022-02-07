import { authService } from "fbase";
import {
  signOut,
  updateProfile
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";

const Profile = ({ userObj, userDisplayName, refreshUser }) => {
  const Navigate = useNavigate();
  const [newDisplayName, setNewDisplayName] = useState(userDisplayName);

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
  
  // @TODO: 내 글 목록 표시하기
  // const getMyNweets = async () => {
  //   const nweets = await getDocs(query(collection(dbService, "nweets"), where("creatorId", "==", userObj.uid), orderBy("createdAt", "asc")));

  //   console.log(nweets.docs.map((doc) => doc.data()));
  // };

  // useEffect(() => {
  //   getMyNweets();
  // }, []);

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
          <span className="formBtn logOut" onClick={ onSocialClick } name="google">
            Credential with Google<FontAwesomeIcon icon={ faGoogle }/>
          </span>
          <span className="formBtn logOut" onClick={ onSocialClick } name="github">
            Credential with Github<FontAwesomeIcon icon={ faGithub }/>
          </span>
        </>}
      </div>
    </div>
  );
};

export default Profile;
