import axios from "axios";
import { API_KEY, DATA_API_URL } from "../config.js";
import getCookie from "../utilities/getCookie.js";

export default async function getRehabCenterData() {
    try {
        const result = await axios({
            // Endpoint to send files
            url: DATA_API_URL,
            method: "GET",
            headers: {
                "Access-Control-Allow-Origin": "http://localhost:5173",
                "api-key": API_KEY,
                authorization: getCookie("accessToken"),
            },
            withCredentials: true,
        });

        if (result.data.message == "database success") {
            return result.data;
        }
    } catch (error) {
        console.error(error);
    }
    return false;
}
