import React, { useState, useEffect } from "react";
import API from "../../../api";
import { SelectField, TextAreaField } from "../form/index";
import { validator } from "../../../utils/validator";
import PropTypes from "prop-types";

const initialData = { userId: "", content: "" };

const AddCommentForm = ({ onSubmit }) => {
    const [data, setData] = useState(initialData);
    const [users, setUsers] = useState({});
    const [errors, setErrors] = useState({});

    const handleChange = (target) => {
        setData((prevState) => ({ ...prevState, [target.name]: target.value }));
    };

    const validatorConfig = {
        userId: {
            isRequired: {
                message: "Выберите от чьего иени будет создан комментарий"
            }
        },
        content: {
            isRequired: {
                message: "Текст комментария не может быть пустым"
            }
        }
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors.length === 0);
    };

    useEffect(() => {
        API.users.fetchAll().then((data) => setUsers(data));
    }, []);

    const clearForm = () => {
        setData(initialData);
        setErrors({});
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        onSubmit(data);
        clearForm();
    };

    const arrayOfUsers =
        users &&
        Object.keys(users).map((userId) => ({
            label: users[userId].name,
            value: users[userId]._id
        }));
    return (
        <div>
            <h2>New comment</h2>
            <form onSubmit={handleSubmit}>
                {arrayOfUsers && arrayOfUsers.length > 0 && (
                    <SelectField
                        onChange={handleChange}
                        options={arrayOfUsers}
                        name="userId"
                        value={data.userId}
                        defaultOption="Выберите пользователя"
                        error={errors.userId}
                    />
                )}
                <TextAreaField
                    onChange={handleChange}
                    name="content"
                    value={data.content}
                    label="Комментарий"
                    error={errors.content}
                />
                <div className="d-flex justify-content-end">
                    <button className="btn btn-primary">Опубликовать</button>
                </div>
            </form>
        </div>
    );
};

AddCommentForm.propTypes = {
    onSubmit: PropTypes.func
};

export default AddCommentForm;
