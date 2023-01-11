import { useState } from "react";
import "./App.css";
import { List, Detail } from "./components";
import { useUserAPI } from "./hooks";

function App() {
  const [filter, setFilter] = useState({ page: 1, perPage: 6, email: "" });
  const { loading, success, data } = useUserAPI(filter.page, filter.perPage);
  const [selectedUser, setSelectedUser] = useState(null);

  if (loading) return <p className="text-center">Loading</p>;
  if (!success) return <p className="text-center">Error</p>;

  return (
    <div className="app">
      {selectedUser ? (
        <Detail user={selectedUser} onBack={() => setSelectedUser(null)} />
      ) : (
        <List
          apiData={data}
          onUserSelect={(user) => setSelectedUser(user)}
          filter={filter}
          onFilterChange={(page = 1, perPage = 6, email = "") =>
            setFilter({ page, perPage, email })
          }
        />
      )}
    </div>
  );
}

export default App;
