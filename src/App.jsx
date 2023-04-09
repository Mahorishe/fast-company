import React from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./components/ui/navbar";
import Users from "./layouts/users";
import Main from "./layouts/main";
import Login from "./layouts/login";

const App = () => {
    return (
        <>
            <NavBar />
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/login/:type?" component={Login} />
                <Route path="/users/:id?" component={Users} />
            </Switch>
        </>
    );
};

export default App;
