import { useEffect, useRef, useState } from "react";
import getPatientByIdentificationCard from "../api/getPatientByIdentificationCard";
import listPatientSessionByPage from "../api/listPatientSessionByPage";
import editPatient from "../api/editPatient";

type PatientManagementProp = {
  outletList: {
    id: string;
    outlet_name: string;
  }[];
  timeslotList: {
    id: string;
    start_time: string;
    end_time: string;
  }[];
  detailID: string;
  setDetailID: (Status: string) => void;
};

type sessionListType = {
  outlet_id: string;
  outlet_name: string;
  treatment_date: string;
  start_time: string;
  end_time: string;
  attendance: boolean;
}[];

const DetailPatient = ({
  outletList,
  timeslotList,
  detailID,
  setDetailID,
}: PatientManagementProp) => {
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
  const [totalPage, setTotalPage] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  const [sessionList, setSessionList] = useState<sessionListType>([]);

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

  useEffect(() => {
    const loadDetails = async () => {
      const result = await getPatientByIdentificationCard(detailID);
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

      const sessionListResult = await listPatientSessionByPage(
        detailID,
        pageNumber,
      );
      if (sessionListResult) {
        setSessionList(sessionListResult.patienceArray);
        setTotalPage(sessionListResult.patienceTotalPage);
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
        detailID,
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
      <h2>Patient details</h2>
      <button onClick={() => setDetailID("")}>Back</button>
      <div>{detailID}</div>
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
        <button type="button" onClick={() => savePatientChange()}>
          {isEdit ? "Save" : "Edit"}
        </button>
        {isEdit ? (
          <button type="button" onClick={() => resetEditForm()}>
            Cancel
          </button>
        ) : null}
      </form>
      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>Outlet Name</th>
            <th>Treatment Date</th>
            <th>Start time</th>
            <th>End time</th>
            <th>Attendance</th>
          </tr>
        </thead>
        <tbody>
          {sessionList.map((session, index) => (
            <tr key={session.treatment_date + detailID + index}>
              <td>{index + 1}</td>
              <td>{session.outlet_name}</td>
              <td>{session.treatment_date}</td>
              <td>{session.start_time}</td>
              <td>{session.end_time}</td>
              <td>{session.attendance ? "True" : "False"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
          }}
        >
          <button
            onClick={() =>
              pageNumber - 1 > 0 ? setPageNumber(pageNumber - 1) : null
            }
          >
            Prev Page
          </button>
          <label>
            <select
              id="groupName"
              name="groupName"
              value={pageNumber}
              onChange={(e) => setPageNumber(parseInt(e.target.value))}
              required
            >
              {Array.from(Array(totalPage).keys()).map((index) => (
                <option key={index + 1} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>
          </label>
          <div>{totalPage}</div>
          <button
            onClick={() =>
              pageNumber + 1 <= totalPage ? setPageNumber(pageNumber + 1) : null
            }
          >
            Next Page
          </button>
        </div>
      </div>
    </>
  );
};

export default DetailPatient;
// Detail page
//TODO: register a session
//TODO: update attendance
