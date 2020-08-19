import React from "react";
import Home from "./pages/Home/Home";
import Search from "./pages/Search/Search";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";

function App(props: any) {
    return (
        <Router>
            <Switch>
                <Route exact path="/search" component={Search} />
                <Route exact path="/" component={Home} />
            </Switch>
        </Router>
    );
}

export default App;
