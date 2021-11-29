import React from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LeaderboardOutlinedIcon from '@mui/icons-material/LeaderboardOutlined';
import CardIcon from './CardIcon.svg';

function Nav() {
  const user = useSelector((store) => store.user);
  const history = useHistory();
  const location = useLocation();
  console.log(location)

  const redirect = (path) => {
    if(path === location.pathname) return;
    history.push(path);
}

  const parsePathname = (pathname) => {
    if(!user.id && pathname !== '/leaderboards'){
      return 'Log In';
    } 
    
    switch(pathname){
      case '/home': return 'Home';
      case '/golf': return 'Cribbage Golf';
      case '/leaderboards': return 'Leaderboards';
      case '/user': return 'Profile';
      case '/login': return 'Log In';
      default: return 'Cribbage Trainer';
    }
  }

  return (
    <>
    {user.id === null ?
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

      </div>
    </div>

    :

    <>
    <nav id="top-bar" className="nav-bar">
        <h1 className="page-title">{parsePathname(location.pathname)}</h1>
    </nav>

    <nav className="nav-bar bottom-bar">
          <div 
            className="nav-icon flex-grow text-center bar-item"
            onClick={() => redirect('/home')}>
            <HomeOutlinedIcon fontSize={'large'}/>
          </div>
          <div id="card-icon-container" 
            className="nav-icon flex-grow text-center bar-item"
            onClick={() => redirect('/golf')}>
            <img id="custom-card-icon" src={CardIcon}/>
          </div>
          <div 
            className="nav-icon flex-grow text-center bar-item"
            onClick={() => redirect('/user')}>
            <PersonOutlineOutlinedIcon fontSize={'large'}/>
          </div>
          <div 
            className="nav-icon flex-grow text-center bar-item"
            onClick={() => redirect('/leaderboards')}>
            <LeaderboardOutlinedIcon fontSize={'large'}/>
          </div>
        </nav>
        </>
}
    </>
  );
}

export default Nav;
