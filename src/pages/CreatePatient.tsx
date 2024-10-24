import { SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import createPatient from "../api/createPatient";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

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

    const cleanPhoneNumber = phoneNumber.replace(/\D/g, "");

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
      <div className="pageTitle">Create New Patient</div>
      <form onSubmit={handleSubmit} className="patientData">
        <div>
          <Label htmlFor="identification">Identification No:</Label>
          <Input
            type="text"
            id="identification"
            value={identificationNumber}
            placeholder="123456789012"
            onChange={(e) => setIdentificationNumber(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="fullname">Full Name:</Label>
          <Input
            type="text"
            id="fullname"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            required
          />
        </div>
        <div>
          <Label>Gender:</Label>
          <Select onValueChange={setGender}>
            <SelectTrigger className="w-[10rem]">
              <SelectValue placeholder={gender == "M" ? "Male" : "Female"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem key="Male" value={"M"}>
                Male
              </SelectItem>
              <SelectItem key="Female" value={"F"}>
                Female
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="phoneno">Phone Number:</Label>
          <Input
            type="text"
            id="phoneno"
            value={phoneNumber}
            placeholder="0166727967"
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <div>
          <Label>Date From:</Label>
          <Input
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="street">Street:</Label>
          <Input
            type="text"
            id="street"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="city">City:</Label>
          <Input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="state">State:</Label>
          <Input
            type="text"
            id="state"
            value={state_a}
            onChange={(e) => setState_a(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="postcode">Postcode:</Label>
          <Input
            type="text"
            id="postcode"
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="country">Country:</Label>
          <Input
            type="text"
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="email">Email Address:</Label>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <Button variant="outline" className="mr-4" type="submit">
            Create
          </Button>
          <Button variant="outline" onClick={() => navigate("/patient")}>
            Back
          </Button>
        </div>
      </form>
    </>
  );
};

export default CreatePatient;
