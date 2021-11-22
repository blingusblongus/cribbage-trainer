import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LeaderboardOutlinedIcon from '@mui/icons-material/LeaderboardOutlined';

function Nav() {
  const user = useSelector((store) => store.user);
  const history = useHistory();

  return (
    <div className="nav">
      <Link to="/home">
        <h2 className="nav-title">Cribbage Trainer</h2>
      </Link>
      <div>
        {/* If no user is logged in, show these links */}
        {user.id === null &&
          // If there's no user, show login/registration links
          <>
            <Link className="navLink" to="/login">
              Login / Register
            </Link>

            <Link className="navLink" to="/leaderboards">
              Leaderboards
            </Link>
          </>
        }

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            <Link className="navLink" to="/user">
              Profile
            </Link>
            {/* 
            <Link className="navLink" to="/info">
              Info Page
            </Link> */}

            <Link className="navLink" to="/golf">
              Cribbage Golf
            </Link>

            <Link className="navLink" to="/leaderboards">
              Leaderboards
            </Link>

            <LogOutButton className="navLink" />
          </>
        )}

        {/* <Link className="navLink" to="/about">
          About
        </Link> */}
        <nav className="bottom-bar">
          <div class="nav-icon flex-grow text-center">
            <HomeOutlinedIcon fontSize={'large'}/>
          </div>
          <div class="nav-icon flex-grow text-center">
            <PersonOutlineOutlinedIcon fontSize={'large'}/>
          </div>
          <div class="nav-icon flex-grow text-center">
            <LeaderboardOutlinedIcon fontSize={'large'}/>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Nav;
