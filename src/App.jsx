import React from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./components/navbar";
import UsersInfo from "./components/usersInfo";
import Main from "./components/main";
import Login from "./components/login";

const App = () => {
    return (
        <>
            <NavBar />
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/login" component={Login} />
                <Route path="/users/:id?" component={UsersInfo} />
            </Switch>
        </>
    );
};

export default App;
