import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import TextField from "./textField";

const SearchUser = ({
    onSearchUser,
    onClearProf,
    clearValue,
    onClearValueChange
}) => {
    const [userName, setUserName] = useState("");
    console.log(clearValue);
    useEffect(() => {
        if (clearValue) {
            setUserName("");
        }
    }, [clearValue]);
    useEffect(() => {
        if (clearValue) {
            setTimeout(() => {
                onClearValueChange();
                onSearchUser(userName);
            }, 0);
        }
    }, [clearValue]);
    const handleChange = ({ target }) => {
        setUserName(target.value);
        onClearProf();
        onSearchUser(target.value);
    };

    return (
        <TextField name="searchUser" value={userName} onChange={handleChange} />
    );
};

SearchUser.propTypes = {
    onSearchUser: PropTypes.func,
    onClearProf: PropTypes.func,
    clearValue: PropTypes.bool,
    onClearValueChange: PropTypes.func
};

export default SearchUser;
