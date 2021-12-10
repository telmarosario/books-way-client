import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

function ProfilePage() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <div>
      <h1>Profile Page</h1>
      {isLoggedIn && (
        <div>
          <button onClick={logOutUser}>Logout</button>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
