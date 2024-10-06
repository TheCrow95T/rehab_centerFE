import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

type NavBarProp = {
    setUser: (Status: string) => void;
};

const NavBar = ({ setUser }: NavBarProp) => {
    const navigate = useNavigate();
    const logout = () => {
        const confirmLogout = confirm("Confirm Logout?");

        if (confirmLogout) {
            document.cookie = "accessToken=; path=/;";
            navigate("/login");
            setUser("");
        }
    };
    return (
        <div className="navbar">
            <div className="title">Rehab Center</div>
            <Link to={"/"}>Dashboard</Link>
            <Link to={"/patient"}>Patient Management</Link>
            <Link to={"/reports"}>Report</Link>
            <div onClick={logout}>Logout</div>
        </div>
    );
};

export default NavBar;
