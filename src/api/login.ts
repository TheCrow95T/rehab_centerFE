import axios from "axios";
import { API_KEY, LOGIN_API_URL } from "../config.js";
import getCookie from "../utilities/getCookie.js";

export default async function login(username: string, password: string) {
    try {
        const result = await axios({
            // Endpoint to send files
            url: LOGIN_API_URL,
            method: "POST",
            headers: {
                "Access-Control-Allow-Origin": "http://localhost:5173",
                "api-key": API_KEY,
            },
            withCredentials: true,
            // Attaching the form data
            data: {
                username: username,
                password: password,
            },
        });

        if (result.data.message == "Login success!") {
            return getCookie("accessToken");
        }

        console.log("failed");
    } catch (error) {
        console.error(error);
    }
    return false;
}
