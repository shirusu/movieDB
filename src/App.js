import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Home from "./views/Home";
import FilmDetails from "./views/FilmDetails";
import Header from "./component/Header";

const App = () => {
    return (
       <div className="container my-5">
           <Router>
               <Header/>
               <Route exact path="/"><Home/></Route>
               <Route path="/film/:id"><FilmDetails/></Route>
           </Router>
       </div>
    );
};

export default App;