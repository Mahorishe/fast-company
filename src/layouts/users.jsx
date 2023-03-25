import React from "react";
import { useParams } from "react-router-dom";
import UsersList from "../components/usersList";
import User from "../components/user";

const Users = () => {
    const { id } = useParams();
    return <>{id ? <User userId={id} /> : <UsersList />}</>;
};

export default Users;
