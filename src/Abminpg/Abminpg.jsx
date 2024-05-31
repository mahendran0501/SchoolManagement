import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';
import './Abminpg.css';
import Demoo from '../Demo/Demoo';
function Table() {
  const [data, setData] = useState(null); // Use a single object instead of an array

  useEffect(() => {
    axios.get('http://localhost:3000/Abminapp')
      .then(response => {
        if (response.data && response.data.length > 0) {
          setData(response.data[0]); // Set the first item from the array
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);


  return (
    <div>
      {data ? <h1 className="Abminpgheatingname">{data.fname}</h1> : <p>Loading...</p>} {/* Display the first name or loading message */}
    </div>
  );
}

const AdminPage = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  useEffect(() => {
    fetchMessages();
  }, []);
  const fetchMessages = async () => {
    try {
      const response = await axios.get('http://localhost:3000/messega');
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }h  
  };

  const handleSendMessage = async () => {
    if (!newMessage) return;

    try {
      const response = await axios.post('http://localhost:3000/messega', {
        text: newMessage,
        sender: 'Admin', // Assuming the sender is Admin
      });
      setMessages([...messages, response.data]);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="AdminpgTeacherMessagesBox">
      <h1 className='AdminpgTeacherLeaveMessages'>Teacher leave messages</h1>
      <div className='AdminpgMessageScrollbox'>
        {messages.map((message, index) => (
          <div key={index} >
            <div className="AdminpgMessages-list">
            <p>{message.text}</p>
            </div>
            <p className='messageNeme'><Table/></p>
          </div>
        ))}
      </div>
      <div className='AdminpgMessagesmargin'>
        <input
          className='AdminpgMessages'
          placeholder='message'
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button className='AdminpgMessagesButton' onClick={handleSendMessage}>
          send
        </button>
      </div>
    </div>
  );
};

const Abminpg = () => {
  const [teachers, setTeachers] = useState([]);
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editedItem, setEditedItem] = useState({ Fname: '', Lname: '', Email: '' });
  const [filteredData, setFilteredData] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3000/Teacherapp')
      .then(response => {
        setTeachers(response.data);
      })
      .catch(error => {
        console.error('Error fetching teachers:', error);
      });
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/Studentapp'); 
        const result = await response.json();
        setData(result);
        setFilteredData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  const handleEditClick = (index) => {
    setEditIndex(index);
    setEditedItem(data[index]);
  };

  const handleDeleteClick = async (index) => {
    const itemToDelete = data[index];
    try {
      const response = await fetch(`http://localhost:3000/Studentapp/${itemToDelete.id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        const updatedData = data.filter((_, i) => i !== index);
        setData(updatedData);
        setFilteredData(updatedData);
      } else {
        console.error('Failed to delete the item');
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedItem((prevItem) => ({
      ...prevItem,
      [name]: value
    }));
  };

  const handleSaveClick = async () => {
    try {
      const response = await fetch(`http://localhost:3000/Studentapp/${editedItem.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedItem),
      });

      if (response.ok) {
        const updatedData = data.map((item, index) =>
          index === editIndex ? editedItem : item
        );
        setData(updatedData);
        setFilteredData(updatedData);
        setEditIndex(null);
        setEditedItem({ Fname: '', Lname: '', Email: '' });
      } else {
        console.error('Failed to update the item');
      }
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    console.log("Search Query:", searchQuery);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Search Query:", searchQuery);
    const result = data.filter((item) =>
      item.Fname.toLowerCase() === searchQuery.toLowerCase() ||
      item.Lname.toLowerCase() === searchQuery.toLowerCase() ||
      item.Email.toLowerCase() === searchQuery.toLowerCase()
    );
    console.log("Filtered Data:", result);
    setFilteredData(result);
  };
  const handleGoBack = () => {
    window.location.reload();// This will navigate back in the browser's history
  };


  const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  };

  return (
    <div>
      <div className="AbminpgheatingRow">
      <h1 className="Abminpgheatingname">Hi<Table /></h1>
        <div className="Abminpg-TimeTable-TeachersAdd-StudentsAdd-And-Back-Button">
          <Link to="/Timetable"><button className="AbminpgHeatingTeachersButton">Time table</button></Link>
          <Link to="/Teacherapp"><button className="AbminpgHeatingTeachersButton">Teachers Add</button></Link>
          <Link to="/Studentadd"><button className="AbminpgHeatingStudentButton">Students Add</button></Link>
          <Link to="/"><button className="back">X</button></Link>
        </div>
      </div>
      <h1 className="AbminpgTeachersReports">Teachers Reports</h1>
      <div className="d-flex">
        <div className="AbminpgTeachersReportsTabul AdminpgTeachersReportsScrollbox">
          <Demoo/>
        </div>
        <div className="AbminpgTeachersMessageBox">
          <AdminPage />
        </div>
      </div>
      {/* <h1 className="AbminpgSearchStudents">Search Students</h1> */}
      <div className='hart'>
        <form onSubmit={handleSearchSubmit}>
          <input 
            type="text" 
            placeholder="Search by name or email" 
            value={searchQuery} 
            onChange={handleSearchChange} 
          />
          <button type="submit">Search</button>
          <button onClick={handleGoBack}>Back</button>
        </form>
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index}>
                {editIndex === index ? (
                  <>
                    <td><input name="Fname" value={editedItem.Fname} onChange={handleInputChange} /></td>
                    <td><input name="Lname" value={editedItem.Lname} onChange={handleInputChange} /></td>
                    <td><input name="Email" value={editedItem.Email} onChange={handleInputChange} /></td>
                  </>
                ) : (
                  <>
                    <td>{item.Fname}</td>
                    <td>{item.Lname}</td>
                    <td>{item.Email}</td>
                  </>
                )}
                <td>
                  {editIndex === index ? (
                    <button onClick={handleSaveClick}>Save</button>
                  ) : (
                    <button onClick={() => handleEditClick(index)}>Edit</button>
                  )}
                  <button onClick={() => handleDeleteClick(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Abminpg;
