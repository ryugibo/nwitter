import { authService } from "fbase";
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  signInAnonymously
} from "firebase/auth";
import AuthForm from "components/AuthForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";

const Auth = () => {
  const onSocialClick = async (event) => {
    const { target: { name } } = event;
    if (name === "guest") {
      await signInAnonymously(authService);
    } else {
      let provider;
      if (name === "google") {
        provider = new GoogleAuthProvider();
      } else if (name === "github") {
        provider = new GithubAuthProvider();
      }
      await signInWithPopup(authService, provider);
    }
  };

  return (
    <div className="authContainer">
      <FontAwesomeIcon icon={ faTwitter } color={ "#04AAFF" } size="3x" style={{ marginBottom: 30 }} />
      <AuthForm />
      <div className="authBtns">
        <button onClick={ onSocialClick } name="google" className="authBtn">Continue with Google<FontAwesomeIcon icon={ faGoogle }/></button>
        <button onClick={ onSocialClick } name="github" className="authBtn">Continue with Github<FontAwesomeIcon icon={ faGithub }/></button>
        <button onClick={ onSocialClick } name="guest" className="authBtn">Continue as Guest<FontAwesomeIcon icon={ faUser } /></button>
      </div>
    </div>
  )
}

export default Auth;
