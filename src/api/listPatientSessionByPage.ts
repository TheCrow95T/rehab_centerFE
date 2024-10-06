import axios from "axios";
import { API_KEY, PATIENT_URL_API_URL } from "../config.js";
import getCookie from "../utilities/getCookie.js";

export default async function listPatientSessionByPage(
    identification_number: string,
    pageNumber: number
) {
    try {
        const result = await axios({
            // Endpoint to send files
            url: PATIENT_URL_API_URL + "/list/register?page=" + pageNumber,
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
