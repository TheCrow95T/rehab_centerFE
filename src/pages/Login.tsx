import { SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import login from "../api/login";
import "./Login.css";

type NavBarProp = {
  setUser: (Status: string) => void;
};

const Login = ({ setUser }: NavBarProp) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    if (!username || !password) {
      console.log("Both fields are required.");
      return;
    }

    const response = await login(username, password);

    if (response) {
      setUser(response);
      navigate("/");
    } else {
      alert("Wrong username or password");
    }

    // Reset form fields
    setUsername("");
    setPassword("");
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="loginForm">
        <div className="pageTitle">Login</div>
        <div className="formItem">
          <Label htmlFor="username">Username:</Label>
          <Input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="formItem">
          <Label htmlFor="password">Password:</Label>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Button className="loginButton" variant="outline" type="submit">
          Login
        </Button>
      </form>
    </>
  );
};

export default Login;
