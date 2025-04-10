import LoginForm from "./components/LoginForm/LoginForm";
import { useContext, useEffect } from "react";
import AuthContext from "./contexts/AuthContext";
import { getMeRequest } from "./api/authApi";
import UserContext from "./contexts/UserContext";

function App() {
  const { refresh, logout, ...state } = useContext(AuthContext);
  const { userInfo, setUserInfo, clearUserInfo } = useContext(UserContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      refresh();
    }
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      clearUserInfo();
    } catch (err) {
      console.error(
        "Logout failed:",
        err.response?.data?.message || err.message,
      );
    }
  };

  const handleGetMe = async () => {
    try {
      const response = await getMeRequest();
      setUserInfo(response.data.user);
    } catch (err) {
      console.error(err);
    }
  };

  if (state.isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!state.isAuth) {
    return <LoginForm />;
  }

  return (
    <>
      <h1>{`User ${state.user.name} is authorized`}</h1>
      <button onClick={handleGetMe}>User info</button>
      <button onClick={handleLogout}>Log out</button>
      {userInfo && (
        <div
          style={{
            marginTop: "20px",
            padding: "10px",
            border: "1px solid #ccc",
          }}
        >
          <h3>Информация о пользователе:</h3>
          <p>
            <strong>Имя:</strong> {userInfo.name}
          </p>
          <p>
            <strong>Email:</strong> {userInfo.email}
          </p>
          <p>
            <strong>Дата регистрации:</strong>{" "}
            {new Date(userInfo.created_at).toLocaleDateString()}
          </p>
          {/* можно добавить и аватар, если есть */}
          {userInfo.avatar_url && (
            <img
              src={userInfo.avatar_url}
              alt="avatar"
              style={{ width: "100px", borderRadius: "50%" }}
            />
          )}
        </div>
      )}
      {/*<RegisterForm />*/}
    </>
  );
}

export default App;
