import styles from "../styles/navbar.module.css";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks";
import { useEffect, useState } from "react";
import { SearchUsers } from "../api";

const Navbar = () => {
  const auth = useAuth();
  const [results, setResults] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await SearchUsers(searchText);
      if (response.success) {
        setResults(response.data.users);
      }
    };
    if (searchText.length > 2) {
      fetchUsers();
    } else {
      setResults([]);
    }
  }, [searchText]);

  return (
    <div className={styles.nav}>
      <div className={styles.leftDiv}>
        <Link to="/">
          <img
            alt=""
            src="https://ninjasfiles.s3.amazonaws.com/0000000000003454.png"
          ></img>
        </Link>
      </div>
      <div className={styles.searchContainer}>
        <img
          className={styles.searchIcon}
          src="https://cdn-icons-png.flaticon.com/512/954/954591.png"
          alt=""
        />
        <input
          placeholder="Search Users"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        {results.length > 0 && (
          <div className={styles.searchResults}>
            <ul>
              {results.map((user) => (
                <Link to={`/user/${user._id}`}>
                  <li
                    className={styles.searchResultsRow}
                    key={`user-${user._id}`}
                    onClick={() => {
                      setResults("");
                    }}
                  >
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/2922/2922510.png"
                      alt=""
                    />
                    <span>{user.name}</span>
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className={styles.rightNav}>
        {auth.user && (
          <div className={styles.user}>
            <Link to="/settings">
              <img
                alt=""
                src="https://cdn-icons-png.flaticon.com/512/2922/2922510.png"
                className={styles.userDp}
              ></img>
            </Link>
            <span>{auth.user.name}</span>
          </div>
        )}

        <div className={styles.navLinks}>
          <ul>
            {auth.user ? (
              <>
                <li onClick={auth.logout}>Log out</li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">Log in</Link>
                </li>

                <li>
                  <Link to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
