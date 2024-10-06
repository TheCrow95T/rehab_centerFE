import axios from "axios";
import { API_KEY, SESSION_API_URL } from "../config.js";
import getCookie from "../utilities/getCookie.js";

export default async function updatePatientAttendance(
    identification_number: string,
    id: number,
) {
    try {
        const result = await axios({
            // Endpoint to send files
            url: SESSION_API_URL + "/update",
            method: "PUT",
            headers: {
                "Access-Control-Allow-Origin": "http://localhost:5173",
                "api-key": API_KEY,
                authorization: getCookie("accessToken"),
            },
            withCredentials: true,
            // Attaching the form data
            data: {
                identification_number,
                id,
            },
        });

        if (result.data.message == "Patient update attendance success") {
            return true;
        }
    } catch (error) {
        console.error(error);
    }
    return false;
}



