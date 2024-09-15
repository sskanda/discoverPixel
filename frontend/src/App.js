import React, { useState, useCallback, useEffect, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Users from "./user/pages/Users";
// import NewPlaces from "./places/pages/NewPlaces";
// import UserPlaces from "./places/pages/UserPlaces";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
// import UpdatePlace from "./places/pages/UpdatePlace";
// import Auth from "./user/pages/Auth";
import { AuthContext } from "./shared/context/auth-context";
import LoadingSpinner from "./shared/components/UIElements/LoadingSpinner";
import SearchPlaces from "./recommend/pages/SearchPlaces";
import PlaceDetails from "./recommend/pages/PlaceDetails";

function App() {
  const UserPlaces = React.lazy(() => import("./places/pages/UserPlaces"));
  const NewPlaces = React.lazy(() => import("./places/pages/NewPlaces"));
  const UpdatePlace = React.lazy(() => import("./places/pages/UpdatePlace"));
  const Auth = React.lazy(() => import("./user/pages/Auth"));
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(false);

  const login = useCallback((uid) => {
    setIsLoggedIn(true);
    setUserId(uid);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
  }, []);

  // Log view on component mount
  useEffect(() => {
    const logView = async () => {
      try {
        await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/views/viewcount`,
          { method: "GET" }
        );
      } catch (error) {
        console.error("Error logging view:", error);
      }
    };

    logView();
  }, []); // Runs once on component mount

  let routes;
  if (isLoggedIn) {
    routes = (
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/:userId/places" element={<UserPlaces />} />
        <Route path="/places/new" element={<NewPlaces />} />
        <Route path="/places/:placeId" element={<UpdatePlace />} />
        <Route path="/search" element={<SearchPlaces />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/:userId/places" element={<UserPlaces />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/search" element={<SearchPlaces />} />
        <Route path="/place/:placeName" element={<PlaceDetails />} />
      </Routes>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <MainNavigation />
        <main>
          <Suspense
            fallback={
              <div className="center">
                <LoadingSpinner />
              </div>
            }
          >
            {routes}
          </Suspense>
        </main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
