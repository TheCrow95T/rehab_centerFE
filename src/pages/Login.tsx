import { SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import login from "../api/login";

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
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <Button variant="outline" type="submit">Login</Button>
            </form>
        </>
    );
};

export default Login;
