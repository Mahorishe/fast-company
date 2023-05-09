import React from "react";
import { useHistory } from "react-router";

const BackHistoryButton = () => {
    const hist = useHistory();
    return (
        <button className="btn btn-primary" onClick={() => hist.goBack()}>
            <i className="bi bi-caret-left"></i>
            Назад
        </button>
    );
};

export default BackHistoryButton;
