import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Button, TextField } from '@mui/material';
import UserTable from '../UserTable/UserTable.jsx';
import './UserPage.css';

function UserPage() {
  const history = useHistory();
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <p>Your displayName is: </p>
      <TextField
        size="small"
        value={"hello"}></TextField>
      <Button variant="contained"
        onClick={() => history.push('/golf')}>PLAY GOLF</Button>
      <br />
      <br />
      {/* Commented out until rows is resolved */}
      {/* <UserTable/> */}
      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
