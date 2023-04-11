import { React, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import api from "../../../api";
import Qualitie from "../../ui/qualitie";

const UserPage = ({ userId }) => {
    const [user, setUser] = useState();
    const hist = useHistory();
    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, [userId]);

    const handleAllUser = () => {
        hist.replace("/users");
    };
    if (user) {
        return (
            <>
                <h1>{user.name}</h1>
                <h2>Профессия:{user.profession.name}</h2>
                <Qualitie qualities={user.qualities} />
                <div>Встретился раз: {user.completedMeetings}</div>
                <h3>Оценка {user.rate}</h3>
                <button onClick={() => handleAllUser()}>
                    Все пользователи
                </button>
                <button onClick={() => hist.push(`/users/${userId}/edit`)}>
                    Изменить
                </button>
            </>
        );
    }
    return "Loading...";
};

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserPage;
