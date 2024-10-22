import { SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import createPatient from "../api/createPatient";

type Address = {
  street: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
};

const CreatePatient = () => {
  const [identificationNumber, setIdentificationNumber] = useState("");
  const [fullname, setFullname] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("YYYY-MM-DD");
  const [gender, setGender] = useState("M");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state_a, setState_a] = useState("");
  const [postcode, setPostcode] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    if (
      !identificationNumber ||
      !fullname ||
      !dateOfBirth ||
      !gender ||
      !phoneNumber ||
      !street ||
      !city ||
      !state_a ||
      !postcode ||
      !country ||
      !email
    ) {
      alert("All fields are required.");
      return;
    }
    
    const cleanPhoneNumber = phoneNumber.replace(/\D/g, '');

    const address: Address = {
      street,
      city,
      state: state_a,
      postcode,
      country,
    };

    const response = await createPatient(
      identificationNumber,
      fullname,
      dateOfBirth,
      gender,
      cleanPhoneNumber,
      address,
      email,
    );

    if (response) {
      alert("Create patient success!");
    } else {
      alert("Create patient failed, try again later");
    }

    // Reset form fields
    setIdentificationNumber("");
    setFullname("");
    setDateOfBirth("YYYY-MM-DD");
    setGender("M");
    setPhoneNumber("");
    setStreet("");
    setCity("");
    setState_a("");
    setPostcode("");
    setCountry("");
    setEmail("");
  };

  return (
    <>
      <h2>Create New Patient</h2>
      <Button variant="outline" onClick={()=>navigate('/patient')}>Back</Button>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="identification">Identification No:</label>
          <input
            type="text"
            id="identification"
            value={identificationNumber}
            placeholder="123456789012"
            onChange={(e) => setIdentificationNumber(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="fullname">Full Name:</label>
          <input
            type="text"
            id="fullname"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            required
          />
        </div>
        <div>
          <label>
            Gender:
            <select
              id="gender"
              name="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option key="Male" value={"M"}>
                Male
              </option>
              <option key="Female" value={"F"}>
                Female
              </option>
            </select>
          </label>
        </div>
        <div>
          <label htmlFor="phoneno">Phone Number:</label>
          <input
            type="text"
            id="phoneno"
            value={phoneNumber}
            placeholder="0166727967"
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <div>
          <label>
            Date From:
            <input
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label htmlFor="street">Street:</label>
          <input
            type="text"
            id="street"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="state">State:</label>
          <input
            type="text"
            id="state"
            value={state_a}
            onChange={(e) => setState_a(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="postcode">Postcode:</label>
          <input
            type="text"
            id="postcode"
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="country">Country:</label>
          <input
            type="text"
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email Address:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <Button variant="outline" type="submit">Create</Button>
      </form>
    </>
  );
};

export default CreatePatient;
