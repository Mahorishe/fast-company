import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";

const MultiSelectField = ({ label, name, onChange, options }) => {
    const optionsArray =
        !Array.isArray(options) && typeof options === "object"
            ? Object.keys(options).map((optionName) => {
                  return {
                      label: options[optionName].name,
                      value: options[optionName]._id
                  };
              })
            : options;

    const handleChange = (value) => {
        onChange({ name, value });
    };
    return (
        <div className="mb-4">
            <label className="form-label">{label}</label>
            <Select
                closeMenuOnSelect={false}
                isMulti
                name={name}
                options={optionsArray}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={handleChange}
            />
        </div>
    );
};

MultiSelectField.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func,
    options: PropTypes.oneOfType(PropTypes.object, PropTypes.array)
};

export default MultiSelectField;
