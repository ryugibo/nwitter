import { authService } from "fbase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const Navigate = useNavigate();
  const onLogOutClick = () => {
    signOut(authService);
    Navigate("/");
  };

  return (
    <>
      <button onClick={ onLogOutClick }>Log Out</button>
    </>
  );
};

export default Profile;
