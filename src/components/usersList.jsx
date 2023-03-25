import { React, useEffect, useState } from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import SearchStatus from "./searchStatus";

import Pagination from "./pagination";
import api from "../api";
import { paginate } from "../utils/paginate";
import GroupList from "./groupList";
import UserTable from "./userTable";

const UsersList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sorter, setSorter] = useState({ path: "name", order: "asc" });
    const [users, setUsers] = useState();
    const pageSize = 4;

    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);

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
    const handelSort = (item) => {
        setSorter(item);
    };

    const handleDeleteUser = (id) => {
        setUsers((prevState) => prevState.filter((user) => user._id !== id));
    };

    const handleToggleBookmark = (id) => {
        setUsers((prevState) =>
            prevState.map((user) => {
                return user._id === id
                    ? { ...user, bookmark: !user.bookmark }
                    : { ...user };
            })
        );
    };
    if (users) {
        const filteredUsers = selectedProf
            ? users.filter((user) => {
                  return (
                      JSON.stringify(user.profession) ===
                      JSON.stringify(selectedProf)
                  );
              })
            : users;

        const usersCount = filteredUsers.length;
        const sorterUser = _.orderBy(
            filteredUsers,
            [sorter.path],
            [sorter.order]
        );
        const pageUsers = paginate(sorterUser, currentPage, pageSize);
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
                        <UserTable
                            users={pageUsers}
                            onDelete={handleDeleteUser}
                            onBookmark={handleToggleBookmark}
                            selectedSort={sorter}
                            onSort={handelSort}
                        />
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
    }
    return "Loading";
};

UsersList.propTypes = {
    users: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
    onBookmark: PropTypes.func.isRequired
};

export default UsersList;
