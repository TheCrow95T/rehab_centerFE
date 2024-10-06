import { useEffect, useRef, useState } from "react";
import listPatientSessionByPage from "../api/listPatientSessionByPage";
import { useParams } from "react-router-dom";
import updatePatientAttendance from "../api/updatePatientAttendance";

type sessionListType = {
  id: string;
  outlet_id: string;
  outlet_name: string;
  treatment_date: string;
  start_time: string;
  end_time: string;
  attendance: boolean;
}[];

const PatientSessions = () => {
  const { id = "" } = useParams();
  const [totalPage, setTotalPage] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  const [sessionList, setSessionList] = useState<sessionListType>([]);

  const identificationNo = useRef(atob(id));

  useEffect(() => {
    const changePage = async () => {
      const sessionListResult = await listPatientSessionByPage(
        identificationNo.current,
        pageNumber,
      );
      if (sessionListResult) {
        setSessionList(sessionListResult.patienceArray);
        setTotalPage(sessionListResult.patienceTotalPage);
      }
    };
    changePage();
  }, [pageNumber]);


  const updateAttendance = async (id: string) => {
    const confirmAttend = confirm("Confirm patient attended?");

    if (confirmAttend) {
      const result = await updatePatientAttendance(
        identificationNo.current,
        parseInt(id),
      );

      if (result) {
        const tempSessionList = [...sessionList];
        for (let i = 0; i < tempSessionList.length; i++) {
          if (tempSessionList[i].id == id) {
            tempSessionList[i].attendance = true;
            break;
          }
        }
        setSessionList(tempSessionList);
      }
    }
  };

  return (
    <>
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
            <tr key={session.id}>
              <td>{(pageNumber -1)*10 + index + 1}</td>
              <td>{session.outlet_name}</td>
              <td>{session.treatment_date}</td>
              <td>{session.start_time}</td>
              <td>{session.end_time}</td>
              <td>
                {session.attendance ? (
                  "Attended"
                ) : (
                  <button onClick={() => updateAttendance(session.id)}>
                    Not Attend
                  </button>
                )}
              </td>
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

export default PatientSessions;
// Detail page
//TODO: register a session

