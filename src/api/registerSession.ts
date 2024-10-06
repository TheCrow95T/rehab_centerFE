import axios from "axios";
import { API_KEY, SESSION_API_URL } from "../config.js";
import getCookie from "../utilities/getCookie.js";

export default async function registerSession(
    identification_number: string,
    outlet_id: number,
    timeslot_id: number,
    treatment_date: string,
) {
    try {
        const result = await axios({
            // Endpoint to send files
            url: SESSION_API_URL + "/register",
            method: "POST",
            headers: {
                "Access-Control-Allow-Origin": "http://localhost:5173",
                "api-key": API_KEY,
                authorization: getCookie("accessToken"),
            },
            withCredentials: true,
            // Attaching the form data
            data: {
                identification_number,
                outlet_id,
                timeslot_id,
                treatment_date,
            },
        });

        if (result.data.message == "Patient register attendance success") {
            return result.data;
        }
    } catch (error) {
        console.error(error);
    }
    return false;
}
