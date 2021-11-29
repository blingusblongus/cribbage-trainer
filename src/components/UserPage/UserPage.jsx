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
    if (!displayName) return;

    dispatch({
      type: 'SET_DISPLAY_NAME',
      payload: displayName
    });

    alert('Display Name Updated')

    // Not working - WHY?
    // setNameIsUpdated(true);
  }

  const promptMsg = `Are you sure?
  Type 'delete ${user.username}' to remove your account and all associated data`;

  const deleteAccount = () => {
    if (prompt(promptMsg) === `delete ${user.username}`) {
      dispatch({ type: 'DELETE_USER' });
    } else {
      return;
    }
  }

  useEffect(() => {
    dispatch({ type: 'FETCH_USER_SCORES' });
  }, []);

  return (
    <div className="container">
      <div className="flex justify-between">
        <LogOutButton className="btn" />
        <Button variant="contained"
          color="warning"
          onClick={deleteAccount}>Delete Account</Button>
      </div>
      
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <p>Your displayName is: </p>

      <div className="flex justify-between">
        <input
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)} />
        <Button
          variant="contained"
          size="small"
          disabled={displayName === user.display_name}
          onClick={updateDisplay}>Update Display Name</Button>
      </div>

      {/* {nameIsUpdated && <p>Display Name Updated to '{displayName}'</p>} */}
      {/* Commented out until rows is resolved */}
      <h2>Personal High Scores</h2>
      {userScores.length > 1 ? <UserTable rows={userScores} /> : <div>No Scores Yet</div>}
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
