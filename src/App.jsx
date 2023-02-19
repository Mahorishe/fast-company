import React, { useState } from "react";
import Users from "./components/users";
import api from "./api";

const App = () => {
    const [users, setUsers] = useState(api.users.fetchAll());

    const handleDeleteUser = (id) => {
        setUsers((prevState) => prevState.filter((user) => user._id !== id));
    };

    const handleToglleBookmark = (id) => {
        setUsers((prevState) =>
            prevState.map((user) => {
                return user._id === id
                    ? { ...user, bookmark: !user.bookmark }
                    : { ...user };
            })
        );
    };
    return (
        <Users
            users={users}
            onDelete={handleDeleteUser}
            onBookmark={handleToglleBookmark}
        />
    );
};

export default App;
