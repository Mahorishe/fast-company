import React from "react";
import PropTypes from "prop-types";

const Bookmark = ({ user, onBookmark }) => {
    return (
        <button
            className="border border-secondary"
            onClick={() => onBookmark(user._id)}
        >
            {user.bookmark ? (
                <i className="bi bi-bookmark-heart-fill"></i>
            ) : (
                <i className="bi bi-bookmark"></i>
            )}
        </button>
    );
};

Bookmark.propTypes = {
    user: PropTypes.object.isRequired,
    onBookmark: PropTypes.func.isRequired
};

export default Bookmark;
