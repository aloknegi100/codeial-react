import { useEffect, useState } from "react";
import { Loader } from "../components";
import { toast } from "react-toastify";
import styles from "../styles/settings.module.css";
import { useAuth } from "../hooks";
import { useNavigate, useParams } from "react-router-dom";
import { addFriend, fetchUserProfile, removeFriend } from "../api";

const UserProfile = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [requestInProgress, setRequestInProgress] = useState(false);
  const { userId } = useParams();
  const Navigate = useNavigate();
  const auth = useAuth();
  useEffect(() => {
    const getUser = async () => {
      const response = await fetchUserProfile(userId);
      if (response.success) {
        setUser(response.data.user);
      } else {
        toast.error(response.message);
        return Navigate("/");
      }
      setLoading(false);
    };
    getUser();
  }, [userId, Navigate]);

  if (loading) {
    return <Loader />;
  }

  const checkIfUserIsAFriend = () => {
    const friends = auth.user.friends;
    const friendIds = friends.map((friend) => friend.to_user._id);
    const index = friendIds.indexOf(userId);
    if (index !== -1) {
      return true;
    } else {
      return false;
    }
  };
  const showAddFriendsBtn = checkIfUserIsAFriend();

  const handleRemoveFriendClick = async () => {
    setRequestInProgress(true);
    const response = await removeFriend(userId);
    if (response.success) {
      const friendship = auth.user.friends.filter(
        (friend) => friend.to_user._id === userId
      );
      auth.updateUserFriends(false, friendship[0]);
      toast.success("Friend removed successfully");
    } else {
      toast.error(response.message);
    }
    setRequestInProgress(false);
  };

  const handleAddFriendClick = async () => {
    setRequestInProgress(true);
    const response = await addFriend(userId);
    if (response.success) {
      const { friendship } = response.data;
      auth.updateUserFriends(true, friendship);
      toast.success("Friend added successfully");
    } else {
      toast.error(response.message);
    }
    setRequestInProgress(false);
  };

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
        {checkIfUserIsAFriend() ? (
          <button
            className={`button ${styles.editBtn}`}
            onClick={handleRemoveFriendClick}
          >
            {requestInProgress ? "Removing friend..." : "Remove Friend"}
          </button>
        ) : (
          <button
            className={`button ${styles.editBtn}`}
            onClick={handleAddFriendClick}
            disabled={requestInProgress}
          >
            {requestInProgress ? "Adding friend..." : "Add Friend"}
          </button>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
