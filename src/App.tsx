import "./App.css";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
function App() {
  const {
    isLoading,
    isAuthenticated,
    error,
    user,
    loginWithRedirect,
    logout,
    getAccessTokenSilently,
  } = useAuth0();

  const callAPIProtected = async () => {
    try {
      const token = await getAccessTokenSilently();
      const response = await axios.get("http://localhost:4000/protected", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Opps..{error.message}</div>;
  }

  if (isAuthenticated) {
    return (
      <div>
        Hello {user?.name}{" "}
        <button onClick={() => callAPIProtected()}>
          Only for authorization
        </button>
        <button
          onClick={() =>
            logout({
              logoutParams: { returnTo: window.location.origin },
            })
          }
        >
          Log out
        </button>
        <pre style={{ textAlign: "start" }}>
          {JSON.stringify(user, null, 1)}
        </pre>
      </div>
    );
  } else
    return (
      <div>
        <button onClick={() => loginWithRedirect()}>Login with Google</button>
      </div>
    );
}

export default App;
