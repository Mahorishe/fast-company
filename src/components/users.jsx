import React, { useState } from "react";
import api from "../api";
import { pluralForm } from "../utils/pluralForm";

export default function Users() {
  const [users, setUsers] = useState(api.users.fetchAll());
  console.log(users);
  const renderQualities = (user) => {
    return user.qualities.map((quality) => {
      const bgColor = `badge bg-${quality.color} m-1`;
      return (
        <span key={quality._id} className={bgColor}>
          {quality.name}
        </span>
      );
    });
  };

  const renderRow = () => {
    return users.map((user) => {
      return (
        <tr key={user._id}>
          <th scope="row">{user.name}</th>
          <td>{renderQualities(user)}</td>
          <td>{user.profession.name}</td>
          <td>{user.completedMeetings}</td>
          <td>{`${user.rate} / 5`}</td>
          <td>
            <button
              className="badge bg-danger"
              onClick={() => handleDeleteUser(user._id)}>
              Удалить
            </button>
          </td>
        </tr>
      );
    });
  };

  const handleDeleteUser = (id) => {
    setUsers((prevState) => prevState.filter((user) => user._id !== id));
  };

  return users.length === 0 ? (
    <h1>
      <span className="badge bg-danger">Никто с тобой не тусанет</span>
    </h1>
  ) : (
    <>
      <h1>
        <span className="badge bg-primary">
          {pluralForm(users.length)} тусанет с тобой сегодня
        </span>
      </h1>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качества</th>
            <th scope="col">Профессия</th>
            <th scope="col">Встретился, раз</th>
            <th scope="col">Оценка</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>{renderRow()}</tbody>
      </table>
    </>
  );
}
