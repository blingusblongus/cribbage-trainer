import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import './Home.css';

function Home(props) {
    const history = useHistory();
    const dispatch = useDispatch();

    const redirect = (path) => {
        history.push(path);
    }

    return (
        <>
            <div className="menu-container">
                <div className="primary-btn"
                    onClick={() => redirect('/learn/1')}>Learn</div>
                <div className="primary-btn"
                    onClick={() => redirect('/golf')}>Cribbage Golf</div>
                <div className="primary-btn"
                    onClick={() => redirect('/user')}>Profile</div>
                <div className="primary-btn"
                    onClick={() => redirect('/leaderboards')}>Leaderboards</div>
                <div className="primary-btn"
                    onClick={() => dispatch({ type: 'LOGOUT' })}>Logout</div>
            </div>
        </>
    )
}

export default Home;