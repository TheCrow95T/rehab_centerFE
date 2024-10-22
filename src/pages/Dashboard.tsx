import { useEffect, useState } from "react";
import getRegistrationSummaryList from "../api/getRegistrationSummaryList";
import "./Dashboard.css";
import "../index.css";
import { Button } from "@/components/ui/button";

type DashBoardProp = {
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

type SessionList = {
  treatment_date: string;
  timeslot_id: string;
  start_time: string;
  end_time: string;
  population: string;
}[];

type DatesList = (string | null)[];

const Dashboard = ({ outletList, timeslotList }: DashBoardProp) => {
  const [outletId, setOutletId] = useState("1");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [datesList, setDatesList] = useState<DatesList>([]);
  const [filteredData, setFilteredData] = useState<SessionList>([]);

  useEffect(() => {
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const firstDayOfMonth = new Date(year, month, 1);
    const startDay = firstDayOfMonth.getDay();

    let dateFrom: string;
    let dateTo: string;

    const dates = [];
    for (let i = 0; i < startDay; i++) {
      dates.push(null); // Empty cells for days before the first of the month
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const date = `${year}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`;
      dates.push(date);
      if (i == 1) {
        dateFrom = date;
      }
      if (i == daysInMonth) {
        dateTo = date;
      }
    }
    setDatesList(dates);
    const initialList = async () => {
      const result = await getRegistrationSummaryList(
        outletId,
        dateFrom,
        dateTo,
      );
      if (result) {
        setFilteredData(result.patienceArray);
      } else {
        alert("Database failed, try again later");
      }
    };
    initialList();
  }, [currentDate, outletId]);

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(
        currentDate.setFullYear(
          currentDate.getFullYear(),
          currentDate.getMonth() - 1,
        ),
      ),
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(
        currentDate.setFullYear(
          currentDate.getFullYear(),
          currentDate.getMonth() + 1,
        ),
      ),
    );
  };

  const getTimeSlotColor = (id: string) => {
    let colorDisplay;
    switch (id) {
      case "1":
        colorDisplay = "yellow";
        break;
      case "2":
        colorDisplay = "pink";
        break;
      case "3":
        colorDisplay = "#34eb43";
        break;
      case "4":
        colorDisplay = "#34b1eb";
        break;
      default:
        colorDisplay = "#eb34c6";
        break;
    }
    return colorDisplay;
  };

  return (
    <>
      <div className="dashboardTitle">Dashboard</div>
      <div className="calendar">
        <header className="calendar-header">
          <label>
            Outlet name:{"\t"}
            <select
              id="groupName"
              name="groupName"
              value={outletId}
              onChange={(e) => setOutletId(e.target.value)}
              required
            >
              {outletList.map((outlet) => {
                return (
                  <option
                    key={outlet.id + outlet.outlet_name}
                    value={outlet.id}
                  >
                    {outlet.outlet_name}
                  </option>
                );
              })}
            </select>
          </label>
          <div style={{ fontWeight: "800", fontSize: "1.2rem" }}>
            {currentDate.toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </div>
          <div
            style={{
              display: "flex",
              width: "15rem",
              justifyContent: "space-evenly",
            }}
          >
            <Button variant="outline" onClick={() => handlePrevMonth()}>
              Previous
            </Button>
            <Button variant="outline" onClick={() => handleNextMonth()}>
              Next
            </Button>
          </div>
        </header>
        <header className="calendar-header">
          {timeslotList.map((timeslot) => (
            <div
              key={timeslot.id}
              style={{ backgroundColor: getTimeSlotColor(timeslot.id) }}
            >
              {timeslot.start_time + " " + timeslot.end_time}
            </div>
          ))}
        </header>
        <div className="calendar-grid">
          <div className="calendar-title">Sunday</div>
          <div className="calendar-title">Monday</div>
          <div className="calendar-title">Tuesday</div>
          <div className="calendar-title">Wednesday</div>
          <div className="calendar-title">Thursday</div>
          <div className="calendar-title">Friday</div>
          <div className="calendar-title">Saturday</div>
          {datesList.map((dates, index) => (
            <div key={index} className="calendar-day">
              {dates ? (
                <div>
                  <div className="events">
                    <span>
                      {dates.substring(dates.length - 2, dates.length)}
                    </span>
                    {filteredData
                      .filter((data) => data.treatment_date === dates)
                      .map((data, idx) => (
                        <div
                          key={idx}
                          className="event"
                          style={{
                            backgroundColor: getTimeSlotColor(data.timeslot_id),
                          }}
                        >
                          {data.population}
                        </div>
                      ))}
                  </div>
                </div>
              ) : (
                <div className="empty-cell"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
