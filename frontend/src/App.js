import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormModal from "./components/SignupModal";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import AllSpots from './components/Spot'
import SingleSpot from "./components/Spot/spotdetails";
import CreateSpot from "./components/Spot/spotForm";
import EditSpot from "./components/Spot/editSpot";
import { getAllSpots, load } from "./store/spot";
import CreateFormModal from "./components/Review/reviewModal";
import Manager from "./components/Spot/spotManagement";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    // dispatch(getAllSpots())
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path='/hosting'>
              <Manager/>
          </Route>
          <Route path='/:spotId/reviews'>
            <CreateFormModal/>
          </Route>
          <Route path='/:spotId/edit'>
            <EditSpot />
          </Route>
          <Route path='/spot/new'>
            <CreateSpot/>
          </Route>
          <Route path='/spots/:spotId'>
            <SingleSpot/>
          </Route>
          <Route exact path='/' >
            <AllSpots />
          </Route>
          <Route path="/signup">
            <SignupFormModal />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
