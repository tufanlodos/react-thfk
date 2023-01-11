import { useState } from "react";

export function List({
  apiData,
  onUserSelect,
  filter: { page, perPage, email: filteredEmail },
  onFilterChange,
}) {
  const [tempEmail, setTempEmail] = useState(filteredEmail);
  if (!apiData) return null;
  const { data, total, total_pages } = apiData;
  const users = filteredEmail
    ? data.filter((user) =>
        user.email.toLowerCase().includes(filteredEmail.toLowerCase())
      )
    : data;

  const handleReset = () => {
    setTempEmail("");
    onFilterChange(1, 6, "");
  };

  const handleSearch = () => {
    if (tempEmail) {
      onFilterChange(1, total, tempEmail);
    } else {
      handleReset();
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <h2>Employees</h2>

      <div className="input-container">
        <input
          type="text"
          placeholder="Search by e-mail.."
          onChange={(e) => {
            setTempEmail(e.target.value);
          }}
          onKeyDown={handleKeyDown}
          value={tempEmail}
        />
        {tempEmail !== filteredEmail && (
          <button onClick={handleSearch}>Enter</button>
        )}
        {filteredEmail && <button onClick={handleReset}>X</button>}
      </div>

      {users.length === 0 ? (
        <p className="text-center">No result</p>
      ) : (
        <>
          <table className="table">
            <thead className="header">
              <tr>
                <th></th>
                <th>Name</th>
                <th>Surname</th>
                <th>E-Mail</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                const { id, avatar, first_name, last_name, email } = user;
                return (
                  <tr key={id}>
                    <td
                      onClick={() => onUserSelect(user)}
                      className="cursor-pointer"
                    >
                      <img src={avatar} alt="Avatar" className="avatar" />
                    </td>
                    <td>{first_name}</td>
                    <td>{last_name}</td>
                    <td>{email}</td>
                    <td
                      onClick={() => onUserSelect(user)}
                      className="cursor-pointer"
                    >
                      &#8594;
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <p className="text-center">
            Showing {users.length} of {total} employees
          </p>
        </>
      )}

      <Pagination
        page={page}
        totalPages={total_pages}
        onPageChange={(newPage) =>
          onFilterChange(newPage, perPage, filteredEmail)
        }
      />
    </>
  );
}

const Pagination = ({ page, totalPages, onPageChange }) => {
  if (!totalPages) return null;
  const paginationList = Array(totalPages).fill("x");

  return (
    <div className="pagination">
      {paginationList.map((_, index) => (
        <button
          key={index.toString()}
          onClick={() => onPageChange(index + 1)}
          className={index + 1 === page ? "active" : ""}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};
