import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const Logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    alert("User logged out");
    navigate("/auth");
  };

  return (
    <div className="navbar">
      <h2 className="nav-h2">COSC 459</h2>
      <Link to="/">Home</Link>
      <Link to="/createbook">Create Book</Link>
      {!cookies.access_token ? (
        <Link to="/auth">Login/Register</Link>
      ) : (
        <>
          <Link to="/savedbooks">Saved Books</Link>
          <button onClick={Logout}>Logout</button>
        </>
      )}
    </div>
  );
};

//provide styling for the navbar
// all the links should be left aligned

// the logout button should be right aligned
