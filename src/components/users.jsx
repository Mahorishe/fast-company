import { React, useEffect, useState } from "react";
import PropTypes from "prop-types";
import SearchStatus from "./searchStatus";
import User from "./user";
import Pagination from "./pagination";
import api from "../api";
import { paginate } from "../utils/paginate";
import GroupList from "./groupList";

const Users = ({ users, onDelete, onBookmark }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const pageSize = 4;
    console.log("PROFESSION", professions);
    console.log("SELECTED PROFESSION", selectedProf);

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data));
    }, []);
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
    };
    const handelPageChange = (page) => {
        setCurrentPage(page);
    };
    const clearFilter = () => {
        setSelectedProf();
    };
    const filteredUsers = selectedProf
        ? users.filter((user) => {
              return (
                  JSON.stringify(user.profession) ===
                  JSON.stringify(selectedProf)
              );
          })
        : users;
    console.log(filteredUsers);
    const usersCount = filteredUsers.length;
    const pageUsers = paginate(filteredUsers, currentPage, pageSize);
    return (
        <div className="d-flex">
            {professions && (
                <div className="d-flex flex-column flex-shrink-0 p-3">
                    <GroupList
                        selectedItem={selectedProf}
                        items={professions}
                        onItemSelect={handleProfessionSelect}
                    />
                    <button
                        onClick={clearFilter}
                        className="btn btn-secondary mt-2"
                    >
                        Очистить
                    </button>
                </div>
            )}
            <div className="d-flex flex-column">
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
                <div className="d-flex justify-content-center">
                    <Pagination
                        itemsCount={usersCount}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={handelPageChange}
                    />
                </div>
            </div>
        </div>
    );
};

Users.propTypes = {
    users: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
    onBookmark: PropTypes.func.isRequired
};

export default Users;
