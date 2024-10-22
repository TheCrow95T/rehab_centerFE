import { useEffect, useState, SyntheticEvent } from "react";
import { Button } from "@/components/ui/button";
import listPatientsByPage from "../api/listPatientsByPage";
import getPatientByIdentificationCard from "../api/getPatientByIdentificationCard";
import { useNavigate } from "react-router-dom";

type PatientList = {
  identification_number: string;
  fullname: string;
  date_of_birth: string;
  gender: string;
  recover: boolean;
}[];

const PatientList = () => {
  const [listPatient, setListPatient] = useState<PatientList>([]);
  const [totalPage, setTotalPage] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchID, setSearchID] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (searchID == "") {
      const rehabDataUponLogin = async () => {
        const result = await listPatientsByPage(pageNumber);
        if (result) {
          setListPatient(result.patienceArray);
          setTotalPage(result.patienceTotalPage);
        }
        if (result.patienceArray.length == 0) {
          alert("No record is found!");
        }
      };
      rehabDataUponLogin();
    }
  }, [searchID, pageNumber]);

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    if (!searchID) {
      alert("Full Identification Number are required.");
      return;
    }

    const result = await getPatientByIdentificationCard(searchID);

    if (result) {
      setListPatient(result.patienceArray);
      setTotalPage(result.patienceTotalPage);
      setPageNumber(1);
    }
    if (result.patienceArray.length == 0) {
      alert("No record is found!");
    }
  };

  return (
    <>
      <div className="pageTitle">Patient List</div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="searchID">Identification Number:</label>
          <input
            type="text"
            id="searchID"
            value={searchID}
            placeholder="123456789012"
            onChange={(e) => setSearchID(e.target.value)}
            required
          />
        </div>
        <Button variant="outline" type="submit">Search</Button>
        <Button variant="outline" onClick={() => navigate("/patient/create")}>Register new patient</Button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Identification Number</th>
            <th>Full Name</th>
            <th>Date of Birth</th>
            <th>Gender</th>
            <th>Recovery Status</th>
          </tr>
        </thead>
        <tbody>
          {listPatient.map((patient) => (
            <tr
              className="row-select"
              key={patient.identification_number}
              onClick={() =>
                navigate("/patient/" + btoa(patient.identification_number))
              }
            >
              <td>{patient.identification_number}</td>
              <td>{patient.fullname}</td>
              <td>{patient.date_of_birth}</td>
              <td>{patient.gender == "M" ? "Male" : "Female"}</td>
              <td>{patient.recover ? "Recover" : "in progress"}</td>
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
          <Button variant="outline"
            onClick={() =>
              pageNumber - 1 > 0 ? setPageNumber(pageNumber - 1) : null
            }
          >
            Prev Page
          </Button>
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
          <Button variant="outline"
            onClick={() =>
              pageNumber + 1 <= totalPage ? setPageNumber(pageNumber + 1) : null
            }
          >
            Next Page
          </Button>
        </div>
      </div>
    </>
  );
};

export default PatientList;
