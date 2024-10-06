import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import registerSession from "../api/registerSession";

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
};

const PatientSessionRegister = ({
  outletList,
  timeslotList,
}: PatientManagementProp) => {
  const { id = "" } = useParams();
  const [outletId, setOutletId] = useState("1");
  const [timeslotId, setTimeSlotId] = useState("1");
  const [treatmentDate, setTreatmentDate] = useState("YYYY-MM-DD");

  const identificationNo = useRef(atob(id));

  useEffect(() => {
    const today = new Date();
    const todayDate = new Date(today).toISOString().split("T")[0];
    setTreatmentDate(todayDate);
  }, []);

  const savePatientChange = async () => {
    const result = await registerSession(
      identificationNo.current,
      outletId,
      timeslotId,
      treatmentDate,
    );

    if (
      result.message == "Patient register attendance success" ||
      result.message == "This patient has register today!" ||
      result.message == "This patient has reach weekly limit!" ||
      result.message == "Busy time slot, try another time slot!"
    ) {
      alert(result.message);
    } else {
      alert("Failed to register");
    }
  };

  return (
    <div>
      <form>
        <label>
          Outlet Name:
          <select
            id="groupName"
            name="groupName"
            value={outletId}
            onChange={(e) => setOutletId(e.target.value)}
            required
          >
            {outletList.map((outlet) => {
              return (
                <option key={outlet.id + outlet.outlet_name} value={outlet.id}>
                  {outlet.outlet_name}
                </option>
              );
            })}
          </select>
        </label>
        <div>
          <label>
            Treatment Date:
            <input
              type="date"
              value={treatmentDate}
              onChange={(e) => setTreatmentDate(e.target.value)}
              required
            />
          </label>
        </div>
        <label>
          Time Slot:
          <select
            id="groupName"
            name="groupName"
            value={timeslotId}
            onChange={(e) => setTimeSlotId(e.target.value)}
            required
          >
            {timeslotList.map((timeslot) => {
              return (
                <option
                  key={timeslot.id + timeslot.start_time}
                  value={timeslot.id}
                >
                  {timeslot.start_time + " - " + timeslot.end_time}
                </option>
              );
            })}
          </select>
        </label>
        <button type="button" onClick={() => savePatientChange()}>
          Create
        </button>
      </form>
    </div>
  );
};

export default PatientSessionRegister;
