import { useState } from "react";
import { Loader } from "../components";
import { toast } from "react-toastify";
import styles from "../styles/settings.module.css";
import { useAuth } from "../hooks";
import { useLocation } from "react-router-dom";

const UserProfile = () => {
  const location = useLocation();
  const { user } = location.state;
  const [loading, setLoading] = useState(true);
  console.log(user);

  if (!user) {
    return <Loader />;
  }

  return (
    <div className={styles.settings}>
      <div className={styles.imgContainer}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/2922/2922510.png"
          alt=""
        />
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Email</div>
        <div className={styles.fieldValue}>{user.email}</div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name</div>
        <div className={styles.fieldValue}>{user.name}</div>
      </div>

      <div className={styles.btnGrp}>
        <button className={`button ${styles.editBtn}`}>Add Friend</button>
        <button className={`button ${styles.editBtn}`}>Remove Friend</button>
      </div>
    </div>
  );
};

export default UserProfile;
