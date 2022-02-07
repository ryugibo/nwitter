import { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  // @TODO: userObj를 다이어트하지 않기위해 추가했으나, Profile컴포넌트에서 authService에 접근하면 될것으로 보여 이후에 개선 검토
  const [userDisplayName, setUserDisplayName] = useState("");

  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if (user) {
        setUserObj(user);
        setUserDisplayName(user.displayName || "");
      } else {
        setUserObj(false);
        setUserDisplayName("");
      }
      setInit(true);
    })
  }, []);

  const refreshUser = () => {
    setUserObj(authService.currentUser);
    setUserDisplayName(userObj.displayName || "");
  };

  return (
    <>
      { init ? <AppRouter refreshUser={ refreshUser } isLoggedIn={ Boolean(userObj) } userObj={ userObj } userDisplayName={ userDisplayName } /> : "initializing..."}
    </>
  )
}

export default App;
