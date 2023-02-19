import { React, useState } from "react";
import PropTypes from "prop-types";
import SearchStatus from "./searchStatus";
import User from "./user";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";

const Users = ({ users, onDelete, onBookmark }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 4;
    const usersCount = users.length;
    const handelPageChange = (page) => {
        setCurrentPage(page);
    };

    const pageUsers = paginate(users, currentPage, pageSize);
    return (
        <>
            <SearchStatus countUsers={usersCount} />
            {usersCount !== 0 && (
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Имя</th>
                            <th scope="col">Качества</th>
                            <th scope="col">Профессия</th>
                            <th scope="col">Встретился, раз</th>
                            <th scope="col">Оценка</th>
                            <th scope="col">Избранное</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {pageUsers.map((user) => (
                            <User
                                user={user}
                                onDelete={onDelete}
                                onBookmark={onBookmark}
                                key={user._id}
                            />
                        ))}
                    </tbody>
                </table>
            )}
            <Pagination
                itemsCount={usersCount}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handelPageChange}
            />
        </>
    );
};

Users.propTypes = {
    users: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
    onBookmark: PropTypes.func.isRequired
};

export default Users;
