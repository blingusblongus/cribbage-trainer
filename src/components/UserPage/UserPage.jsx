import React, { useEffect, useState } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { Button, TextField } from '@mui/material';
import UserTable from '../UserTable/UserTable.jsx';
import './UserPage.css';

function UserPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const userScores = useSelector(store => store.userScores);
  const [displayName, setDisplayName] = useState(user.display_name);

  const updateDisplay = () => {
    //should add error message for this
    if(!displayName) return;

    dispatch({
      type: 'SET_DISPLAY_NAME',
      payload: displayName
    })
  }

  useEffect(()=>{
    dispatch({type: 'FETCH_USER_SCORES'});
  },[]);

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
      {userScores.length >  1 ? <UserTable rows={userScores}/> : <div>No Scores Yet</div>};
      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
