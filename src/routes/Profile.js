import { authService } from "fbase";
import { signOut } from "firebase/auth";

const Profile = () => {
  const onLogOutClick = () => signOut(authService);

  return (
    <>
      <button onClick={ onLogOutClick }>Log Out</button>
    </>
  );
};

export default Profile;
