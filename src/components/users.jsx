import SearchStatus from "./searchStatus";
import User from "./user";

const Users = ({ users, onDelete, onBookmark }) => {
  return (
    <>
      <SearchStatus countUsers={users.length} />
      {users.length !== 0 && (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качества</th>
              <th scope="col">Профессия</th>
              <th scope="col">Встретился, раз</th>
              <th scope="col">Оценка</th>
              <th scope="col">Избранное</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <User user={user} onDelete={onDelete} onBookmark={onBookmark} />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Users;
