import React, { useEffect, useState } from "react";
import { validator } from "../../utils/validator";
import { TextField, CheckboxField } from "../common/form";

const LoginForm = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
        stayOut: false
    });
    const [errors, setErrors] = useState({});

    const isValid = Object.keys(errors).length === 0;
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
            <h3 className="mb-4">Login Form</h3>
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
                <CheckboxField
                    value={data.stayOut}
                    onChange={handleChange}
                    error={errors.stayOut}
                    name="stayOut"
                >
                    Остаться в системе
                </CheckboxField>
                <button disabled={!isValid} className="btn btn-primary w-100">
                    Submit
                </button>
            </form>
        </>
    );
};

export default LoginForm;
