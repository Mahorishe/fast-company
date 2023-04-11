import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
    TextField,
    SelectField,
    RadioField,
    MultiSelectField
} from "../../common/form";
import api from "../../../api";
import { validator } from "../../../utils/validator";
import { useHistory } from "react-router-dom";

const EditUserPage = ({ userId }) => {
    const hist = useHistory();
    const [data, setData] = useState({
        name: "",
        password: "",
        profession: "",
        sex: "male",
        qualities: []
    });
    const [professions, setProfessions] = useState([]);
    const [qualities, setQualities] = useState([]);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const isValid = Object.keys(errors).length === 0;

    const transformData = (data) => {
        const res = data.map((item) => ({
            label: item.name,
            value: item._id,
            color: item.color
        }));
        return res;
    };

    const getProfessionById = (id) => {
        for (const prof of professions) {
            if (prof.value === id) {
                return { _id: prof.value, name: prof.label };
            }
        }
    };

    const getQualities = (elements) => {
        const qualitiesArray = [];
        for (const elem of elements) {
            for (const quality in qualities) {
                if (elem.value === qualities[quality].value) {
                    qualitiesArray.push({
                        _id: qualities[quality].value,
                        name: qualities[quality].label,
                        color: qualities[quality].color
                    });
                }
            }
        }
        return qualitiesArray;
    };
    useEffect(() => {
        if (professions.length > 0 && qualities.length > 0 && data._id) {
            setLoading(false);
        }
    }, [data, professions, qualities]);

    useEffect(() => {
        setLoading(true);
        api.users.getById(userId).then((user) => {
            console.log("USER", user);
            setData((prevData) => ({
                ...prevData,
                ...user,
                profession: user.profession._id,
                qualities: transformData(user.qualities)
            }));
        });
        api.professions.fetchAll().then((data) => {
            const professionList = Object.keys(data).map((professionName) => ({
                label: data[professionName].name,
                value: data[professionName]._id
            }));
            setProfessions(professionList);
        });
        api.qualities.fetchAll().then((data) => {
            const qualitiesList = Object.keys(data).map((optionName) => ({
                value: data[optionName]._id,
                label: data[optionName].name,
                color: data[optionName].color
            }));
            setQualities(qualitiesList);
        });
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
        profession: {
            isRequired: {
                message: "Обязательно выберите профессию"
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
        if (!isValid) return;
        const { profession, qualities } = data;
        api.users
            .update(userId, {
                ...data,
                profession: getProfessionById(profession),
                qualities: getQualities(qualities)
            })
            .then(() => hist.goBack());
    };
    return (
        <>
            {!loading ? (
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 offset-md-3 shadow p-4">
                            <form onSubmit={handleFinish}>
                                <TextField
                                    label="Имя"
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    onChange={handleChange}
                                    error={errors.name}
                                />
                                <TextField
                                    label="Email"
                                    name="email"
                                    value={data.email}
                                    onChange={handleChange}
                                    error={errors.email}
                                />
                                <SelectField
                                    label="Выбери свою профессию"
                                    defaultOption="Choose..."
                                    options={professions}
                                    name="profession"
                                    onChange={handleChange}
                                    value={data.profession}
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
                                    defaultValue={data.qualities}
                                    onChange={handleChange}
                                />

                                <button
                                    disabled={!isValid}
                                    className="btn btn-primary w-100"
                                >
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            ) : (
                <h1>Loading...</h1>
            )}
        </>
    );
};

EditUserPage.propTypes = {
    userId: PropTypes.string
};

export default EditUserPage;
