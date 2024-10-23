import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import listPatientSessionByPage from "../api/listPatientSessionByPage";
import { useParams } from "react-router-dom";
import updatePatientAttendance from "../api/updatePatientAttendance";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
      <Table>
        <TableCaption className="pageTitle">Session Register List</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>No.</TableHead>
            <TableHead>Outlet Name</TableHead>
            <TableHead>Treatment Date</TableHead>
            <TableHead>Start time</TableHead>
            <TableHead>End time</TableHead>
            <TableHead>Attendance</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sessionList.map((session, index) => (
            <TableRow key={session.id}>
              <TableCell>{(pageNumber - 1) * 10 + index + 1}</TableCell>
              <TableCell>{session.outlet_name}</TableCell>
              <TableCell>{session.treatment_date}</TableCell>
              <TableCell>{session.start_time}</TableCell>
              <TableCell>{session.end_time}</TableCell>
              <TableCell>
                {session.attendance ? (
                  "Attended"
                ) : (
                  <Button
                    variant="destructive"
                    onClick={() => updateAttendance(session.id)}
                  >
                    Not Attend
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
          }}
        >
          <Button
            variant="outline"
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
          <Button
            variant="outline"
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

export default PatientSessions;
