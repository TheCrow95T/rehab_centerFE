import axios from "axios";
import { API_KEY, SESSION_API_URL } from "../config.js";
import getCookie from "../utilities/getCookie.js";

export default async function registerSession(
    identification_number: string,
    outlet_id: string,
    timeslot_id: string,
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
                outlet_id: parseInt(outlet_id),
                timeslot_id: parseInt(timeslot_id),
                treatment_date,
            },
        });

        if (result.data.message.length > 0) {
            return result.data;
        }
    } catch (error) {
        console.error(error);
    }
    return false;
}
