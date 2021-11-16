import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Button, TextField } from '@mui/material';
import UserTable from '../UserTable/UserTable.jsx';
import './UserPage.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

function UserPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const [displayName, setDisplayName] = useState(user.display_name);

  const updateDisplay = () => {
    //should add error message for this
    if(!displayName) return;

    dispatch({
      type: 'SET_DISPLAY_NAME',
      payload: displayName
    })
  }

  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <p>Your displayName is: </p>
      <TextField
        size="small"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}></TextField>
      <Button variant="contained"
        onClick={updateDisplay}>Update Display Name</Button>
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
