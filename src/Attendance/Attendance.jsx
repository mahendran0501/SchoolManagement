import { useState, useEffect } from "react";

function Attendance() {
  const [attendance, setAttendance] = useState([]);
  const [date, setDate] = useState('');
  const [attendanceStatus, setAttendanceStatus] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3000/Studentapp'); // Replace with your actual API endpoint
      const result = await response.json();
      setAttendance(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleAttendanceChange = (studentId, status) => {
    setAttendanceStatus((prevStatus) => ({
      ...prevStatus,
      [studentId]: status,
    }));
  };

  // Calculate the total counts for Present and Absent
  const presentCount = Object.values(attendanceStatus).filter(status => status === 'Present').length;
  const absentCount = Object.values(attendanceStatus).filter(status => status === 'Absent').length;

  const handleSubmit = async () => {
    // Check if the date is valid
    if (!date) {
      setError("Please select a date.");
      return;
    }

    const dataToSave = attendance.map(student => ({
      id: student.id,
      Fname: student.Fname,
      attendance: attendanceStatus[student.id] || 'Absent',
      date: date
    }));

    try {
      const response = await fetch('http://localhost:3000/Attendance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSave),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setSuccessMessage('Attendance data saved successfully!');
      setAttendanceStatus({}); // Clear attendance status after submission
      setDate(''); // Clear date after submission
      fetchData(); // Refresh data
      setError(''); // Clear any previous error messages
    } catch (error) {
      console.error('Error saving attendance data:', error);
      setSuccessMessage('');
      setError('Error saving attendance data. Please try again.');
    }

    // Clear the messages after 3 seconds
    setTimeout(() => {
      setSuccessMessage('');
      setError('');
    }, 3000);
  };

  return (
    <div>
      {successMessage && <div className="success-message">{successMessage}</div>}
      {error && <div className="error-message">{error}</div>}
      <div>
        <input 
          type="date" 
          value={date} 
          onChange={handleDateChange} 
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Present</th>
            <th>Absent</th>
          </tr>
        </thead>
        <tbody>
          {attendance.map((student, index) => (
            <tr key={student.id}>
              <td>{index + 1}</td>
              <td>{student.Fname}</td>
              <td>
                <input 
                  type="radio" 
                  name={`attendance-${student.id}`} 
                  value="Present" 
                  checked={attendanceStatus[student.id] === 'Present'}
                  onChange={() => handleAttendanceChange(student.id, 'Present')}
                />
              </td>
              <td>
                <input 
                  type="radio" 
                  name={`attendance-${student.id}`} 
                  value="Absent" 
                  checked={attendanceStatus[student.id] === 'Absent'}
                  onChange={() => handleAttendanceChange(student.id, 'Absent')}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h3>Totals</h3>
        <p>Present: {presentCount}</p>
        <p>Absent: {absentCount}</p>
      </div>
      <button onClick={handleSubmit}>Submit Attendance</button>
    </div>
  );
}

export default Attendance;
