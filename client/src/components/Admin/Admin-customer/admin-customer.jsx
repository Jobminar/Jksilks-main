import React, { useState, useEffect } from 'react';
import './admin-customer.css';
import profileimg from '../images/profile.png';
import dots from '../images/dots.png';
import Adminheader from '../adminheader';

const Admincustomer = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    fetch('https://server.sharetravel.in/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []); 

  const formatDOB = (dob) => {
    const date = new Date(dob);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };


  return (
    <>
      <Adminheader />
      <div className="admincustomer">
        <h2>Customers</h2>
        {/* <ul>
         
              <p>{JSON.stringify(users, null, 2)}</p>
      
        </ul> */}
        <div className='main-con-users'>
          {users.map(user => (
            <div key={user.id} className='sub-con-users'>
                <h1 className='username'>{user.fullName}</h1>
                <p>Name : {user.fullName || 'N/A'}</p>
                <p>Email : {user.email || 'N/A'}</p>
                <p>Mobile Number :{user.mobileNumber}</p>
                <p>Gender : {user.gender}</p>
                <p>Date of Birth: {formatDOB(user.dateOfBirth)}</p>
                <p>Location : {user.location}</p>
    
            </div>
          ))}
        </div>
        
      </div>
    </>
  );
};

export default Admincustomer;

