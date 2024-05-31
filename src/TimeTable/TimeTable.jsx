import React, { useState } from 'react';
import axios from 'axios';
import { Message } from 'primereact/message';
import { Link } from 'react-router-dom';

function Timetable() {
    const [timetableData, setTimetableData] = useState({
        Monday: ['', '', '', '', '', '', '', ''],
        Tuesday: ['', '', '', '', '', '', '', ''],
        Wednesday: ['', '', '', '', '', '', '', ''],
        Thursday: ['', '', '', '', '', '', '', ''],
        Friday: ['', '', '', '', '', '', '', ''],
        Saturday: ['', '', '', '', '', '', '', '']
    });
    const [classSection, setClassSection] = useState('');
    const [error, setError] = useState({});
    const [message, setMessage] = useState(null);

    const timeSlots = [
        "9:30-10:20",
        "10:20-11:10",
        "11:10-12:00",
        "12:00-12:40",
        "12:40-1:30",
        "1:30-2:20",
        "2:20-3:10",
        "3:10-4:00"
    ];

    const handleInputChange = (day, period, value) => {
        const updatedTimetableData = { ...timetableData };
        updatedTimetableData[day][period] = value;
        setTimetableData(updatedTimetableData);
    };

    const handleSaveTimetable = async () => {
        let isValid = true;
        const validationErrors = {};

        // Check if the first period for each day is empty
        for (const day of Object.keys(timetableData)) {
            if (timetableData[day][0] === '') {
                isValid = false;
                validationErrors[day] = `First period on ${day} is required`;
            }
        }

        // Check all periods for each day
        for (const day in timetableData) {
            for (const period in timetableData[day]) {
                if (!timetableData[day][period]) {
                    isValid = false;
                    validationErrors[`${day}-${period}`] = `Subject for period ${parseInt(period) + 1} on ${day} is required`;
                }
            }
        }

        setError(validationErrors);

        if (!isValid) {
            return;
        }

        try {
            const dataToSend = {
                classSection,
                timetable: Object.keys(timetableData).reduce((acc, day) => {
                    acc[day] = timetableData[day].map((subject, index) => ({
                        time: timeSlots[index],
                        subject
                    }));
                    return acc;
                }, {})
            };
            await axios.post("http://localhost:3000/timetable", dataToSend);
            setMessage({ severity: 'success', summary: 'Success', detail: 'Timetable saved successfully' });
            alert("Timetable saved successfully");
            window.location.reload();
        } catch (error) {
            setMessage({ severity: 'error', summary: 'Error', detail: 'Error saving timetable' });
            console.error('Error saving timetable:', error);
        }
    };

    return (
        <div className='TIMETABLE'>
            <h1>TIME TABLE</h1>
            <select
                name="ClassSection"
                className='ClassSection'
                value={classSection}
                onChange={(e) => setClassSection(e.target.value)}
            >
                <option >Class Section</option>
                <option value="ClassSection-I">I</option>
                <option value="ClassSection-II">II</option>
                <option value="ClassSection-III">III</option>
                <option value="ClassSection-IV">IV</option>
                <option value="ClassSection-V">V</option>
                <option value="ClassSection-VI">VI</option>
                <option value="ClassSection-VII">VII</option>
                <option value="ClassSection-VIII">VIII</option>
                <option value="ClassSection-IX">IX</option>
                <option value="ClassSection-X">X</option>
            </select>
            {message && <Message severity={message.severity} text={message.detail} />}
            <table className='TIMETABLE1'>
                <tbody>
                    <tr>
                        <th>Day/Period</th>
                        {timeSlots.map((slot, index) => (
                            <th key={index} value={slot}>{slot}</th>
                        ))}
                    </tr>
                    {Object.keys(timetableData).map((day, index) => (
                        <tr key={index}>
                            <td className="highlight"><b>{day}</b></td>
                            {timetableData[day].map((subject, period) => (
                                <td key={period} className='row'>
                                    <input
                                        className='input'
                                        type="text"
                                        value={subject}
                                        onChange={(e) => handleInputChange(day, period, e.target.value)}
                                    />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={handleSaveTimetable} className="AbminpgHeatingTeachersButton">Submit</button>
            <Link to="/Abminpg"><button className="AbminpgHeatingTeachersButton">Back</button></Link>
            {Object.keys(error).map((key, index) => (
                <small key={index} className="TeacherappOutputmessage">{error[key]}</small>
            ))}
        </div>
    );
}

export default Timetable;
