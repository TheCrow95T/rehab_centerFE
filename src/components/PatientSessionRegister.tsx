import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import registerSession from "../api/registerSession";
import "./PatientSessionRegister.css";

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
  setRegisterForm: (Status: boolean) => void;
};

const PatientSessionRegister = ({
  outletList,
  timeslotList,
  setRegisterForm,
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
    <div className="popUpForm">
      <div className="pageTitle">Register Session</div>
      <form className="popUpFormContent">
        <Label>Outlet Name:</Label>
        <Select onValueChange={setOutletId}>
          <SelectTrigger>
            <SelectValue placeholder={"Select a rehab center"} />
          </SelectTrigger>
          <SelectContent>
            {outletList.map((outlet) => (
              <SelectItem
                key={outlet.id + outlet.outlet_name}
                value={outlet.id}
              >
                {outlet.outlet_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Label>Treatment Date:</Label>
        <Input
          type="date"
          value={treatmentDate}
          onChange={(e) => setTreatmentDate(e.target.value)}
          required
        />
        <Label>Time Slot:</Label>
        <Select onValueChange={setTimeSlotId}>
          <SelectTrigger>
            <SelectValue placeholder={"Select a time slot"} />
          </SelectTrigger>
          <SelectContent>
            {timeslotList.map((timeslot) => (
              <SelectItem
                key={timeslot.id + timeslot.start_time}
                value={timeslot.id}
              >
                {timeslot.start_time + " - " + timeslot.end_time}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="button_section">
          <Button
            variant="outline"
            type="button"
            onClick={() => savePatientChange()}
          >
            Create
          </Button>
          <Button
            variant="outline"
            type="button"
            onClick={() => setRegisterForm(false)}
          >
            Close
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PatientSessionRegister;
