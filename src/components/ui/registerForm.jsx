import React, { useEffect, useState } from "react";
import { validator } from "../../utils/validator";
import {
    TextField,
    RadioField,
    SelectField,
    MultiSelectField,
    CheckboxField
} from "../common/form";
import api from "../../api";
const RegisterForm = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
        profession: "",
        sex: "male",
        qualities: [],
        licence: false
    });
    const [professions, setProfessions] = useState();
    const [qualities, setQualities] = useState();
    const [errors, setErrors] = useState({});

    const isValid = Object.keys(errors).length === 0;

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data));
        api.qualities.fetchAll().then((data) => setQualities(data));
    }, []);
    useEffect(() => {
        validate();
    }, [data]);

    const validateConfig = {
        email: {
            isRequired: {
                message: "Email обязательен для заполнения"
            },
            isEmail: {
                message: "Email некорректный"
            }
        },
        password: {
            isRequired: {
                message: "Пароль обязательен для заполнения"
            },
            isCapitalSymbol: {
                message: "Пароль должен содержать хотя бы одну заглавную букву"
            },
            isContainDigit: {
                message: "Пароль должен содержать хотя бы одну цифру"
            },
            min: {
                message: "Пароль должен быть не менее 8 символов",
                value: 8
            }
        },
        profession: {
            isRequired: {
                message: "Обязательно выберите профессию"
            }
        },
        licence: {
            isRequired: {
                message: "Необходимо согласиться с лицензионным соглашением"
            }
        }
    };
    const handleChange = (target) => {
        setData((prevData) => ({ ...prevData, [target.name]: target.value }));
    };
    const validate = () => {
        const errors = validator(data, validateConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const handleFinish = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return null;
    };
    return (
        <>
            {" "}
            <h3 className="mb-4">Register Form</h3>
            <form onSubmit={handleFinish}>
                <TextField
                    label="Email"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    error={errors.email}
                />
                <TextField
                    label="Password"
                    type="password"
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                    error={errors.password}
                />
                <SelectField
                    label="Профессия"
                    name="profession"
                    defaultValue="Выберите профессию"
                    options={professions}
                    value={data.profession}
                    onChange={handleChange}
                    error={errors.profession}
                />
                <RadioField
                    label=""
                    name="sex"
                    options={[
                        { name: "Мужчина", value: "male" },
                        { name: "Женщина", value: "female" },
                        { name: "Другое", value: "other" }
                    ]}
                    value={data.sex}
                    onChange={handleChange}
                />
                <MultiSelectField
                    label="Выберите качества"
                    name="qualities"
                    options={qualities}
                    onChange={handleChange}
                />
                <CheckboxField
                    value={data.licence}
                    onChange={handleChange}
                    error={errors.licence}
                    name="licence"
                >
                    Подтвердить <a>лицензионное соглашение</a>
                </CheckboxField>

                <button disabled={!isValid} className="btn btn-primary w-100">
                    Submit
                </button>
            </form>
        </>
    );
};

export default RegisterForm;
