import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import AllCourses from "./components/AllCourses"
import SingleCourse from "./components/SingleCourse";
import AddCourse from "./components/AddCourse";
import UserCourses from "./components/UserCourses";
import ShowFavorites from "./components/FavoriteCourses";
import ShowCompleted from "./components/CompletedCourses";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <AllCourses />
          </Route>
          <Route path='/courses/completed'>
            <ShowCompleted />
          </Route>
          <Route path='/courses/favorites'>
            <ShowFavorites />
          </Route>
          <Route path='/courses/current'>
            <UserCourses />
          </Route>
          <Route path='/courses/new'>
            <AddCourse />
          </Route>
          <Route path='/courses/:courseId'>
            <SingleCourse />
          </Route>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
