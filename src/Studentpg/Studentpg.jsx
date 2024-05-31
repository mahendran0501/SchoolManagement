import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Studentpg.css';
// import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import Demo from '../Demo/Demo';

const Studentpg = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [newAddress, setNewAddress] = useState('');
  const [isDirty, setIsDirty] = useState(false); // Track if the address has been changed
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axios.get('http://localhost:3000/Studentapp/3537');
      setProfile(response.data);
    } catch (error) {
      setError(`Error fetching profile data: ${error.message}`);
    }
  };

  const handleAddressChange = (event) => {
    setNewAddress(event.target.value);
    setIsDirty(true); // Set dirty flag when the address is changed
  };

  const handleUpdateAddress = async () => {
    setIsDirty(false); // Reset dirty flag upon update button click
    try {
      const updatedProfile = { ...profile, Address: newAddress };
      await axios.put('http://localhost:3000/Studentapp/3537', updatedProfile);
      setProfile(updatedProfile);
    } catch (error) {
      setError(`Error updating address: ${error.message}`);
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!profile) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div>
        <h1 className='StudentpgName'>Hi {profile.Fname}</h1>
      </div>
      <h1 className='StudentpgProfileHeading'>Profile</h1>
      <div className='StudentpgMainProfileRow'>
        <div className='StudentpgProfileBox'>
          <div className='StudentpgProfileRow'>
            <h1 className='StudentpgProfile'>First Name: <small className='StudentpgProfileNames'>{profile.Fname}</small></h1>
            <h1 className='StudentpgProfile'>Last Name: <small className='StudentpgProfileNames'>{profile.Lname}</small></h1>
          </div>
          <div className='StudentpgProfileRowSecondLine'>
            <h1 className='StudentpgProfile'>Standard: <small className='StudentpgProfileNames'>{profile.Standar}</small><sup>th</sup></h1>
            <h1 className='StudentpgProfile'>Class Section: <small className='StudentpgProfileNames'>{profile.ClassSention}</small></h1>
            <h1 className='StudentpgProfile'>Roll No: <small className='StudentpgProfileNames'>{profile.RollNo}</small></h1>
          </div>
          <div className='StudentpgProfileRow'>
            <h1 className='StudentpgProfile'>Date of Birth: <small className='StudentpgProfileNames'>{profile.dateofbirth}</small></h1>
            <h1 className='StudentpgProfile'>Gender: <small className='StudentpgProfileNames'>{profile.gender}</small></h1>
          </div>
          <div className='StudentpgProfileRow'>
            <h1 className='StudentpgProfile'>Father's Name: <small className='StudentpgProfileNames'>{profile.FathersName}</small></h1>
            <h1 className='StudentpgProfile'>Mother's Name: <small className='StudentpgProfileNames'>{profile.MothersName}</small></h1>
          </div>
          <div className='StudentpgProfileRowThirdLine'>
            <h1 className='StudentpgProfile'>Phone Number: <small className='StudentpgProfileNames'>{profile.PhoneNumber}</small></h1>
            <h1 className='StudentpgProfile'>Email: <small className='StudentpgProfileNames'>{profile.Email}</small></h1>
          </div>
          <div className='StudentpgProfileRowFourthLine'>
            <h1 className='StudentpgProfile'>Address:<input
              type="text"
              value={newAddress || profile.Address}
              onChange={handleAddressChange}
              className='StudentpgProfileAddress'
            /></h1>
            <button onClick={handleUpdateAddress}>Update</button>
          </div>
        </div>
        <div className='StudentpgProfileBox'>
           <Demo/>
        </div>
      </div>
    </div>
  );
};

export default Studentpg;
