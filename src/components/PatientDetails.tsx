import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import getPatientByIdentificationCard from "../api/getPatientByIdentificationCard";
import editPatient from "../api/editPatient";

const PatientDetails = () => {
  const { id = "" } = useParams();
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
  const [recover, setRecover] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const backupData = useRef({
    phoneBK: "",
    streetBK: "",
    cityBK: "",
    stateBK: "",
    postcodeBK: "",
    countryBK: "",
    emailBK: "",
    recover: false,
  });

  const identificationNo = useRef(atob(id));

  useEffect(() => {
    const loadDetails = async () => {
      const result = await getPatientByIdentificationCard(
        identificationNo.current,
      );
      if (result) {
        const details = result.patienceArray[0];
        setFullname(details.fullname);
        setDateOfBirth(details.date_of_birth);
        setGender(details.gender);
        setPhoneNumber(details.phone_number);
        setEmail(details.email);
        setRecover(details.recover);

        const addressArray = details.home_address
          .slice(1, -1)
          .replace(/['"]+/g, "")
          .split(",");
        setStreet(addressArray[0]);
        setCity(addressArray[1]);
        setState_a(addressArray[2]);
        setPostcode(addressArray[3]);
        setCountry(addressArray[4]);

        backupData.current = {
          phoneBK: details.phone_number,
          streetBK: addressArray[0],
          cityBK: addressArray[1],
          stateBK: addressArray[2],
          postcodeBK: addressArray[3],
          countryBK: addressArray[4],
          emailBK: details.email,
          recover: details.recover,
        };
      }
    };
    loadDetails();
  }, []);

  const resetEditForm = () => {
    setPhoneNumber(backupData.current.phoneBK);
    setStreet(backupData.current.streetBK);
    setCity(backupData.current.cityBK);
    setState_a(backupData.current.stateBK);
    setPostcode(backupData.current.postcodeBK);
    setCountry(backupData.current.countryBK);
    setEmail(backupData.current.emailBK);
    setRecover(backupData.current.recover);
    setIsEdit(false);
  };

  const savePatientChange = async () => {
    if (isEdit) {
      const address = {
        street,
        city,
        state: state_a,
        postcode,
        country,
      };
      const result = await editPatient(
        identificationNo.current,
        phoneNumber,
        address,
        email,
        recover,
      );

      if (result) {
        alert("Patient info is saved");
        backupData.current = {
          phoneBK: phoneNumber,
          streetBK: street,
          cityBK: city,
          stateBK: state_a,
          postcodeBK: postcode,
          countryBK: country,
          emailBK: email,
          recover: recover,
        };
        setIsEdit(false);
      } else {
        alert("Failed to save patient info");
        resetEditForm();
      }
    } else {
      setIsEdit(true);
    }
  };

  return (
    <>
      <form>
        <div>
          <label>Full Name:</label>
          <span>{fullname}</span>
        </div>
        <div>
          <label>Date of Birth:</label>
          <span>{dateOfBirth}</span>
        </div>
        <div>
          <label>Gender:</label>
          <span>{gender == "M" ? "Male" : "Female"}</span>
        </div>
        <div>
          <label>Phone Number:</label>
          {!isEdit ? (
            <span>{phoneNumber}</span>
          ) : (
            <input
              type="tel"
              name="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          )}
        </div>
        <div>
          <label>Street:</label>
          {!isEdit ? (
            <span>{street}</span>
          ) : (
            <input
              type="text"
              name="street"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              disabled={!isEdit}
              required
            />
          )}
        </div>
        <div>
          <label>City:</label>
          {!isEdit ? (
            <span>{city}</span>
          ) : (
            <input
              type="text"
              name="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              disabled={!isEdit}
              required
            />
          )}
        </div>
        <div>
          <label>State:</label>
          {!isEdit ? (
            <span>{state_a}</span>
          ) : (
            <input
              type="text"
              name="state"
              value={state_a}
              onChange={(e) => setState_a(e.target.value)}
              disabled={!isEdit}
              required
            />
          )}
        </div>
        <div>
          <label>Postcode:</label>
          {!isEdit ? (
            <span>{postcode}</span>
          ) : (
            <input
              type="text"
              name="postcode"
              value={postcode}
              onChange={(e) => setPostcode(e.target.value)}
              disabled={!isEdit}
              required
            />
          )}
        </div>
        <div>
          <label>Country:</label>
          {!isEdit ? (
            <span>{country}</span>
          ) : (
            <input
              type="text"
              name="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              disabled={!isEdit}
              required
            />
          )}
        </div>
        <div>
          <label>Email:</label>
          {!isEdit ? (
            <span>{email}</span>
          ) : (
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={!isEdit}
              required
            />
          )}
        </div>
        <div>
          <label>Recovery Status:</label>
          {!isEdit ? (
            <span>{recover ? "Recover" : "In progress"}</span>
          ) : (
            <select
              id="recovery"
              name="recovery"
              value={recover ? "Recover" : "In progress"}
              onChange={(e) => setRecover(e.target.value === "Recover")}
              disabled={!isEdit}
              required
            >
              <option value={"Recover"}>Recover</option>
              <option value={"In progress"}>In progress</option>
            </select>
          )}
        </div>
        <Button variant="outline" type="button" onClick={() => savePatientChange()}>
          {isEdit ? "Save" : "Edit"}
        </Button>
        {isEdit ? (
          <Button variant="outline" type="button" onClick={() => resetEditForm()}>
            Cancel
          </Button>
        ) : null}
      </form>
    </>
  );
};

export default PatientDetails;
