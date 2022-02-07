import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Navigation from "components/Navigation";

const AppRouter = ({ isLoggedIn, userObj, userDisplayName, refreshUser }) => {
  return (
    <Router>
      { isLoggedIn && <Navigation userObj={ userObj } /> }
      <Routes>
        { isLoggedIn ? (
          <>
            <Route exact path="/" element={ <Home userObj={ userObj } /> } />
            <Route exact path="/profile" element={ <Profile displayName={ userDisplayName } userObj={ userObj } refreshUser={ refreshUser } userDisplayName={ userDisplayName } /> }/>
          </>
        ) : (
          <Route exact path="/" element={ <Auth /> } />
        )}
      </Routes>
    </Router>
  )
}

export default AppRouter;
