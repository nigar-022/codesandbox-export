import "./styles.css";
import { useState, useEffect } from "react";

export default function App() {
  const [apiData, setApiData] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://dummyjson.com/users")
      .then((response) => response.json())

      .then((data) => {
        setApiData(data.users);

        setFilteredData(data.users);
      })

      .catch((err) => console.log(err))
      .finally(() => {
        // wether we sucessfully get the users or not,
        // we update the loading state
        setLoading(false);
      });
  }, []);

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchInput(searchTerm);

    const filteredItems = apiData.filter((user) =>
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredData(filteredItems);
  };
  return (
    <div className="App">
      <div className="search-bar-container">
        <input
          type="text"
          value={searchInput}
          onChange={handleInputChange}
          placeholder="Search..."
        />
        {loading && <p>Loading...</p>}
        {!loading && filteredData.length === 0 ? (
          <p>No users found</p>
        ) : (
          <div className="result-list">
            {filteredData.map((user) => (
              <div
                key={user.id}
                onClick={(e) => alert(`You Clicked on ${user.firstName}`)}
              >
                {user.firstName}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
