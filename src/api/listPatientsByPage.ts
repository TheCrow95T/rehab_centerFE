import axios from "axios";
import { API_KEY, PATIENT_URL_API_URL } from "../config.js";

export default async function listPatientsByPage( pageNumber: number) {
    try {
        const result = await axios({
            // Endpoint to send files
            url: PATIENT_URL_API_URL+ '/list?page=' + pageNumber,
            method: "GET",
            headers: {
                "Access-Control-Allow-Origin": "http://localhost:5173",
                "api-key": API_KEY,
            },
            withCredentials: true,
            // Attaching the form data
        });

        if (result.data.message == "database success") {
            return result.data;
        }
    } catch (error) {
        console.error(error);
    }
    return false;
}

