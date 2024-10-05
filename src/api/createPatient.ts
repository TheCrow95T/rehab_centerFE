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

export default async function createPatient(
    identification_number: string,
    fullname: string,
    date_of_birth: string,
    gender: string,
    phone_number: string,
    home_address: Address,
    email: string,
) {
    try {
        const result = await axios({
            // Endpoint to send files
            url: PATIENT_URL_API_URL + "/create",
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
                fullname,
                date_of_birth,
                gender,
                phone_number,
                home_address,
                email,
            },
        });

        if (result.data.message == "Patient create success") {
            return result.data;
        }
    } catch (error) {
        console.error(error);
    }
    return false;
}
