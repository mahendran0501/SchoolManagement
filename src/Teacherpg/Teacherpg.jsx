import { Link } from "react-router-dom";
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Message } from 'primereact/message';
import { Paginator } from 'primereact/paginator';

function Teacher() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [first, setFirst] = useState(0);
  const [timetableData, setTimetableData] = useState([]);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const rowsPerPage = 1;
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editableProfile, setEditableProfile] = useState({
    Fname: '',
    Subject: '',
    WorkPhoneNumber: '',
    Address: ''
  });

  // Fetch messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('http://localhost:3000/messega');
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };
    fetchMessages();
  }, []);

  // Handle new message submission
  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/messega', {
        id: messages.length + 1,
        username: 'magi',
        text: newMessage
      });
      setMessages([...messages, response.data]);
      setNewMessage('');
    } catch (error) {
      console.error('Error creating message:', error);
    }
  };

  // Fetch timetable
  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        const response = await axios.get("http://localhost:3000/timetable");
        setTimetableData(response.data);
        setLoading(false);
      } catch (error) {
        setMessage({ severity: 'error', summary: 'Error', detail: 'Error fetching timetable' });
        console.error('Error fetching timetable:', error);
        setLoading(false);
      }
    };
    fetchTimetable();
  }, []);

  // Fetch profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:3000/Teacherapp/9d43');
        setProfile(response.data);
        setEditableProfile(response.data);
      } catch (error) {
        setError(`Error fetching profile data: ${error.message}`);
      }
    };
    fetchProfile();
  }, []);

  // Handle profile edit click
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // Handle profile save click
  const handleSaveClick = async () => {
    try {
      await axios.put(`http://localhost:3000/Teacherapp/9d43`, editableProfile);
      setProfile(editableProfile);
      setIsEditing(false);
    } catch (error) {
      setError(`Error updating profile: ${error.message}`);
    }
  };

  // Handle profile change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableProfile({ ...editableProfile, [name]: value });
  };

  // Handle pagination change
  const onPageChange = (event) => {
    setFirst(event.first);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!profile) {
    return <p>Loading profile...</p>;
  }

  const currentData = timetableData.slice(first, first + rowsPerPage);

  return (
    <div className="Teacherpg">
      <div className="TeacherpgHeatingRow">
        <h1 className="TeacherpgHeating">Hi {profile.Fname}</h1>
        <Link to="/Attendance"><button className="TeacherpgHeatingRoxMassegaBox">Attendance</button></Link>
        <Link to="/"><button className="TeacherpgHeatingRoxBark">X</button></Link>
      </div>
      <div className="TeacherpgMessageBoxAndProfileRow">
        <div className="TeacherpgTimeTableBox">
          <div className='TIMETABLE'>
            {message && <Message severity={message.severity} text={message.detail}/>}
            <div>
              {currentData.map((classData, index) => (
                <div key={index} className="TIMETABLE1">
                  <h2 className="ClassSection">Class Section: {classData.classSection}</h2>
                  <table className='TIMETABLE-Table'>
                    <thead>
                      <tr>
                        <th>Day/Period</th>
                        <th>9:30-10:20</th>
                        <th>10:20-11:10</th>
                        <th>11:10-12:00</th>
                        <th>12:00-12:40</th>
                        <th>12:40-1:30</th>
                        <th>1:30-2:20</th>
                        <th>2:20-3:10</th>
                        <th>3:10-4:00</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.keys(classData.timetable).map((day, dayIndex) => (
                        <tr key={dayIndex}>
                          <td className="highlight"><b>{day}</b></td>
                          {classData.timetable[day].map((period, periodIndex) => (
                            <td key={periodIndex} className='row'>
                              {period.subject}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
              <Paginator 
                className="pg"
                first={first} 
                rows={rowsPerPage} 
                totalRecords={timetableData.length} 
                onPageChange={onPageChange} 
                template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink" 
              />
            </div>
          </div>  
        </div>
        <div className="TeacherpgMessageBoxAndProfile">
          <div className="TeacherpgMessageBox">
            <div className="teacher-app">
              <h1 className="TeacherpgAbminMessage">Admin Messages</h1>
              <div className="TeacherpgAbminMessage-list Scrollbox">
                {messages.map((message) => (
                  <div key={message.id} className="TeacherpgAbminMessageBox">
                    <strong>{message.text}:</strong><small className="TeacherpgAbminMessageUsername">{message.username}</small>
                  </div>
                ))}
              </div>
              <form onSubmit={handleMessageSubmit}>
                <input
                  className="TeacherpgMessageinput"
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Message"
                />
                <button type="submit" className="TeacherpgAbminMessageButton">Send</button>
              </form>
            </div>
          </div>
          <div className="TeacherpgMessageBox">
            <h1 className="TeacherpgTimeTable">Your Profile</h1>
            <div className="TeacherpgProfileImg"></div>
            <div className="TeacherpgProfileDetailBox">
              {isEditing ? (
                <>
                  <div>
                    <label>First Name: </label>
                    <input
                      type="text"
                      name="Fname"
                      value={editableProfile.Fname}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label>Subject: </label>
                    <input
                      type="text"
                      name="Subject"
                      value={editableProfile.Subject}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label>Work Phone Number: </label>
                    <input
                      type="text"
                      name="WorkPhoneNumber"
                      value={editableProfile.WorkPhoneNumber}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label>Address: </label>
                    <input
                      type="text"
                      name="Address"
                      value={editableProfile.Address}
                      onChange={handleChange}
                    />
                  </div>
                  <button onClick={handleSaveClick} className="TeacherpgProfileUpdate">Save</button>
                </>
              ) : (
                <>
                  <p className="TeacherpgProfileDetail">{profile.Fname}</p>
                  <p className="TeacherpgProfileDetail">{profile.Subject}</p>
                  <p className="TeacherpgProfileDetail">{profile.WorkPhoneNumber}</p>
                  <p className="TeacherpgProfileDetail">{profile.Address}</p>
                  <button onClick={handleEditClick} className="TeacherpgProfileUpdate">Update</button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Teacher;
