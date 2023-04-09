import React from "react";
import PropTypes from "prop-types";

const CheckboxField = ({ children, name, value, onChange, error }) => {
    const getInputClasses = () => {
        return "form-check-input" + (error ? " is-invalid" : "");
    };
    const handleChange = ({ target }) => {
        onChange({ name, value: target.checked });
    };
    return (
        <div className="form-check mb-4">
            <input
                className={getInputClasses()}
                type="checkbox"
                value=""
                id={name}
                checked={value}
                onChange={handleChange}
            />
            <label className="form-check-label" htmlFor={name}>
                {children}
            </label>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

CheckboxField.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    name: PropTypes.string,
    value: PropTypes.bool,
    onChange: PropTypes.func,
    error: PropTypes.string
};

export default CheckboxField;
