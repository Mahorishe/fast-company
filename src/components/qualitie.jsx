import React from "react";
import PropTypes from "prop-types";
const Qualitie = ({ qualities }) => {
    return qualities.map((quality) => {
        const bgColor = `badge bg-${quality.color} m-1`;
        return (
            <span key={quality._id} className={bgColor}>
                {quality.name}
            </span>
        );
    });
};

Qualitie.propTypes = {
    qualities: PropTypes.array.isRequired
};

export default Qualitie;
