import React, { useState } from "react";
import { useParams } from "react-router-dom";
import LoginForm from "../components/ui/loginFrom";
import RegisterForm from "../components/ui/registerForm";
const Login = () => {
    const { type } = useParams();
    const [formType, setFormType] = useState(
        type === "register" ? type : "login"
    );
    const handleToggleType = () => {
        setFormType((prevState) =>
            prevState === "register" ? "login" : "register"
        );
    };
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {" "}
                    {formType === "register" ? (
                        <>
                            <RegisterForm />
                            <p>
                                Аккаунт уже существует ?{" "}
                                <a type="button" onClick={handleToggleType}>
                                    Войти
                                </a>
                            </p>
                        </>
                    ) : (
                        <>
                            <LoginForm />
                            <p>
                                Нет аккаунта ?{" "}
                                <a type="button" onClick={handleToggleType}>
                                    Создать
                                </a>
                            </p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;
