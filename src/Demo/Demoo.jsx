import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Demoo() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editedItem, setEditedItem] = useState(
    { 
      id: "",
      Fname: "",
      Lname: "",
      Email: "",
      dateofbirth: "",
      ClassSention: "",
      Subject: "",
      WorkPhoneNumber: "",
      CellPhoneNumber: "",
      Qualification: "",
      Experience: "",
      Address: "",
      gender: ""
   });

  // useEffect(() => {
  //   // Fetch teachers if needed
  //   axios.get('http://localhost:3000/Teacherapp')
  //     .then(response => {
  //       // Process teacher data if needed
  //     })
  //     .catch(error => {
  //       console.error('Error fetching teachers:', error);
  //     });
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/Teacherapp');
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
      const response = await fetch(`/${itemToDelete.id}`, {
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
      const response = await fetch(`http://localhost:3000/Teacherapp/${editedItem.id}`, {
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
        setEditedItem({ id: "",
        Fname: "",
        Lname: "",
        Email: "",
        dateofbirth: "",
        ClassSention: "",
        Subject: "",
        WorkPhoneNumber: "",
        CellPhoneNumber: "",
        Qualification: "",
        Experience: "",
        Address: "",
        gender: ""});
      } else {
        console.error('Failed to update the item');
      }
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const result = data.filter((item) =>
      item.id.toLowerCase() === searchQuery.toLowerCase() ||
      item.Fname.toLowerCase() === searchQuery.toLowerCase() ||
      item.Lname.toLowerCase() === searchQuery.toLowerCase() ||
      item.Email.toLowerCase() === searchQuery.toLowerCase() ||
      item.dateofbirth.toLowerCase() === searchQuery.toLowerCase() ||
      item.ClassSention.toLowerCase() === searchQuery.toLowerCase() ||
      item.Subject.toLowerCase() === searchQuery.toLowerCase() ||
      item.WorkPhoneNumber.toLowerCase() === searchQuery.toLowerCase() ||
      item.CellPhoneNumber.toLowerCase() === searchQuery.toLowerCase() ||
      item.Qualification.toLowerCase() === searchQuery.toLowerCase() ||
      item.Experience.toLowerCase() === searchQuery.toLowerCase() ||
      item.Address.toLowerCase() === searchQuery.toLowerCase() ||
      item.gender.toLowerCase() === searchQuery.toLowerCase() 
    );
    setFilteredData(result);
  };

  const handleGoBack = () => {
    setFilteredData(data);
  };

  return (
    <div className='hart'>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button type="submit">Search</button>
        <button type="button" onClick={handleGoBack}>Back</button>
      </form>
      <table>
        <thead>
          <tr>
            <th className='TeacherappTh'>id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>call Phone number</th>
            <th>work number</th>
            <th>DOB</th>
            <th>gender</th>
            <th>ClassSention</th>
            <th>Email</th>
            <th>Subject</th>
            <th>Qualification</th>
            <th>Experience</th>
            <th>Address</th>
            <th>Edit/Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index}>
              {editIndex === index ? (
                <>
                  <td><input name="id" value={editedItem.id} onChange={handleInputChange} /></td>
                  <td><input name="Fname" value={editedItem.Fname} onChange={handleInputChange} /></td>
                  <td><input name="Lname" value={editedItem.Lname} onChange={handleInputChange} /></td>
                  <td><input name="WorkPhoneNumber" value={editedItem.WorkPhoneNumber} onChange={handleInputChange} /></td>
                  <td><input name="CellPhoneNumber" value={editedItem.CellPhoneNumber} onChange={handleInputChange} /></td>
                  <td><input name="dateofbirth" value={editedItem.dateofbirth} onChange={handleInputChange} /></td>
                  <td><input name="gender" value={editedItem.gender} onChange={handleInputChange} /></td>
                  <td><input name="ClassSention" value={editedItem.ClassSention} onChange={handleInputChange} /></td>
                  <td><input name="Email" value={editedItem.Email} onChange={handleInputChange} /></td>
                  <td><input name="Subject" value={editedItem.Subject} onChange={handleInputChange} /></td>
                  <td><input name="Qualification" value={editedItem.Qualification} onChange={handleInputChange} /></td>
                  <td><input name="Experience" value={editedItem.Experience} onChange={handleInputChange} /></td>
                  <td><input name="Address" value={editedItem.Address} onChange={handleInputChange} /></td>
                </>
              ) : (
                <>
                  <td>{item.id}</td>
                  <td>{item.Fname}</td>
                  <td>{item.Lname}</td>
                  <td>{item.WorkPhoneNumber}</td>
                  <td>{item.CellPhoneNumber}</td>
                  <td>{item.dateofbirth}</td>
                  <td>{item.gender}</td>
                  <td>{item.ClassSention}</td>
                  <td>{item.Email}</td>
                  <td>{item.Subject}</td>
                  <td>{item.Qualification}</td>
                  <td>{item.Experience}</td>
                  <td>{item.Address}</td>
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
  );
}

export default Demoo;
