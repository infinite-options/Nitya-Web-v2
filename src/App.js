import logo from './logo.svg';
import React, { useState, useEffect } from "react";
import axios from "axios";

import './App.css';
import { useHistory } from 'react-router';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Navigation from './Navigation/navigation'
import Home from './Home/Home';
import About from './About/about';
import Contact from './Contact/contact';
import Services from './Services/services';
import LearnMore from './Services/LearnMore';
import Appointment from './Appointment/AppointmentPage';
import AppointmentConfirm from './Appointment/AppointmentPageConfirm';
import Blog from './Blog/Blog';
import FullBlog from './Blog/FullBlog';
import Footer from './Footer/Footer';
import HealthyTips from './Blog/HealthyTips';
import Recipes from './Blog/Recipes';
import LivingWell from './Blog/LivingWell';
import Login from './Admin/Login';
import SignUp from './Admin/SignUp';
import AddPost from './Blog/AddPost';
import Temp from './New Temp/Temp.jsx';
import ConfirmationPage from './Appointment/confirmationPage';
export const MyContext = React.createContext();

function App() {

  const url =
    "https://mfrbehiqnb.execute-api.us-west-1.amazonaws.com/dev/api/v2/treatments";
  const [servicesLoaded, setServicesLoaded] = useState(false);
  const [serviceArr, setServiceArr] = useState([]);

  useEffect(() => {
    if (!servicesLoaded) {
      console.log("app.js treatment")
      axios.get(url).then((res) => {
        setServiceArr(res.data.result);
        setServicesLoaded(true);
      });
    }
  });

  const history = useHistory()

  return (
    <div className="App">
      <Router>

        <div>

          <Navigation />

          <Switch>
            <Route exact path="/:treatmentID/appt/">
              <MyContext.Provider value={{ serviceArr, servicesLoaded }}>
                <Appointment />
              </MyContext.Provider>
            </Route>
            <Route path="/:treatmentID/confirm">
              <MyContext.Provider value={{ serviceArr, servicesLoaded }}>

                <AppointmentConfirm />
              </MyContext.Provider>

            </Route>
            <Route path="/healthy tips">

              <HealthyTips />

            </Route>

            <Route path="/login">

              <Login />

            </Route>

            <Route path="/apptconfirm">
              <ConfirmationPage />
            </Route>

            <Route path="/addpost">

              <AddPost />

            </Route>

            <Route path="/signup">

              <SignUp />

            </Route>

            <Route path="/recipes">

              <Recipes />

            </Route>

            <Route path="/living well">

              <LivingWell />

            </Route>


            <Route path="/learnMore">

              <LearnMore />

            </Route>

            <Route path="/about">

              <About />

            </Route>
            <Route path="/:blog_uid/fullblog">

              <FullBlog />
            </Route>

            <Route path="/blog">

              <Blog />
            </Route>

            <Route path="/contact">

              <Contact />

            </Route>

            <Route path="/services">

              <Services />

            </Route>

            <Route path="/">

              <Home />

            </Route>




          </Switch>

          <Footer />

        </div>



      </Router>

    </div>
  );
}

export default App;
