import React from "react";
import PropTypes from "prop-types";
import { renderPhrase } from "../../utils/renderPhrase";
const SearchStatus = ({ countUsers }) => {
    return countUsers === 0 ? (
        <h1>
            <span className="badge bg-danger">Никто с тобой не тусанет</span>
        </h1>
    ) : (
        <h1>
            <span className="badge bg-primary">
                {renderPhrase(countUsers)} с тобой сегодня
            </span>
        </h1>
    );
};
SearchStatus.propTypes = {
    countUsers: PropTypes.number.isRequired
};

export default SearchStatus;
