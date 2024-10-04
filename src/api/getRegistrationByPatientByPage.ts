import axios from "axios";
import { API_KEY, SESSION_API_URL } from "../config.js";
import getCookie from "../utilities/getCookie.js";

export default async function getRegistrationByPatientByPage(
    outlet_id: string,
    start_date: string,
    end_date: string,
) {
    try {
        const result = await axios({
            // Endpoint to send files
            url: SESSION_API_URL + "/list",
            method: "POST",
            headers: {
                "Access-Control-Allow-Origin": "http://localhost:5173",
                "api-key": API_KEY,
                authorization: getCookie("accessToken"),
            },
            withCredentials: true,
            // Attaching the form data
            data: {
                outlet_id,
                start_date,
                end_date,
            },
        });

        if (result.data.message == "database success") {
            return result.data;
        }
    } catch (error) {
        console.error(error);
    }
    return false;
}
