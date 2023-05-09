import { React, useEffect, useState } from "react";
import PropTypes from "prop-types";
// import { useHistory } from "react-router-dom";
import api from "../../../api";
import UserCard from "../../ui/userCard";
import QualitiesCard from "../../ui/qualitiesCard";
import ComplitingMeetings from "../../ui/completedMeetings";
import Comments from "../../ui/comments";
import BackHistoryButton from "../../common/table/backHistoryButton";
// import Qualitie from "../../ui/qualitie";

const UserPage = ({ userId }) => {
    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, [userId]);

    if (user) {
        return (
            <div className="container">
                <BackHistoryButton />
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <UserCard user={user} />
                        <QualitiesCard data={user.qualities} />
                        <ComplitingMeetings data={user.completedMeetings} />
                    </div>
                    <div className="col-md-8">
                        <Comments />
                    </div>
                </div>
            </div>
        );
    }
    return "Loading...";
};

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserPage;
