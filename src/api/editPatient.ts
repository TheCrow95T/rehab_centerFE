import axios from "axios";
import { API_KEY, PATIENT_URL_API_URL } from "../config.js";
import getCookie from "../utilities/getCookie.js";

type Address = {
    street: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
};

export default async function editPatient(
    identification_number: string,
    phone_number: string,
    home_address: Address,
    email: string,
    recovery: boolean,
) {
    try {
        const result = await axios({
            // Endpoint to send files
            url: PATIENT_URL_API_URL + "/update",
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
                phone_number,
                home_address,
                email,
                recovery: recovery ? "true" : "false"
            },
        });

        if (result.data.message == "Patient edit success") {
            return result.data;
        }
    } catch (error) {
        console.error(error);
    }
    return false;
}

