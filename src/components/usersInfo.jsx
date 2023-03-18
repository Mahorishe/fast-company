import React from "react";
import { useParams } from "react-router-dom";
import Users from "./users";
import User from "./user";

const UsersInfo = () => {
    const { id } = useParams();
    return <>{id ? <User userId={id} /> : <Users />}</>;
};

export default UsersInfo;
