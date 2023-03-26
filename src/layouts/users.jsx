import React from "react";
import { useParams } from "react-router-dom";
import UsersListPage from "../components/page/usersListPage";
import UserPage from "../components/page/userPage";

const Users = () => {
    const { id } = useParams();
    return <>{id ? <UserPage userId={id} /> : <UsersListPage />}</>;
};

export default Users;
