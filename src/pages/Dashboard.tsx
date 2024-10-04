import { useEffect, useState } from "react";
import getRegistrationByPatientByPage from "../api/getRegistrationByPatientByPage";

type DashBoardProp = {
    outletList: {
        id: string;
        outlet_name: string;
    }[];
};

type SessionList = {
    treatment_date: string;
    start_time: string;
    end_time: string;
    population: string;
}[];

const Dashboard = ({ outletList }: DashBoardProp) => {
    const [outletId, setOutletId] = useState("1");
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");
    const [filteredData, setFilteredData] = useState<SessionList>([]);

    useEffect(() => {
        const today = new Date();
        setDateFrom(new Date(today).toISOString().split("T")[0]);
        const date_to = today.setDate(today.getDate() + 1);
        setDateTo(new Date(date_to).toISOString().split("T")[0]);
    }, []);

    const handleFilter = async () => {
        if (dateTo >= dateFrom) {
            const result = await getRegistrationByPatientByPage(
                outletId,
                dateFrom,
                dateTo,
            );
            if (result) {
                setFilteredData(result.patienceArray);
            } else {
                alert("Database failed, try again later");
            }
        } else {
            alert("'Date To' must be greater than 'Date From'");
        }
    };

    return (
        <>
            <div className="pageTitle">Dashboard</div>
            <label>
                outlet_name:
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
            <h2>Filter Events by Date</h2>
            <div>
                <label>
                    Date From:
                    <input
                        type="date"
                        value={dateFrom}
                        onChange={(e) => setDateFrom(e.target.value)}
                        required
                    />
                </label>
            </div>
            <div>
                <label>
                    Date To:
                    <input
                        type="date"
                        value={dateTo}
                        onChange={(e) => setDateTo(e.target.value)}
                        required
                    />
                </label>
            </div>
            <button onClick={handleFilter}>Filter</button>
            <h3>Filtered Events</h3>
            <table>
                <thead>
                    <tr>
                        <th>Treatment Date</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Population</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((data) => (
                        <tr key={data.treatment_date + data.start_time + data.population}>
                            <td>{data.treatment_date}</td>
                            <td>{data.start_time}</td>
                            <td>{data.end_time}</td>
                            <td>{data.population}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default Dashboard;
