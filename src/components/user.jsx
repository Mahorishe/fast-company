import React from "react";
import PropTypes from "prop-types";
import Bookmark from "./bookmark";
import Qualitie from "./qualitie";

const User = ({ user, onDelete, onBookmark }) => {
    return (
        <tr key={user._id}>
            <th scope="row">{user.name}</th>
            <td>
                <Qualitie qualities={user.qualities} />
            </td>
            <td>{user.profession.name}</td>
            <td>{user.completedMeetings}</td>
            <td>{`${user.rate} / 5`}</td>
            <td>
                <Bookmark user={user} onBookmark={onBookmark} />
                {user.bookmark}
            </td>
            <td>
                <button
                    className="btn btn-danger"
                    onClick={() => onDelete(user._id)}
                >
                    Удалить
                </button>
            </td>
        </tr>
    );
};

User.propTypes = {
    user: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
    onBookmark: PropTypes.func.isRequired
};

export default User;
