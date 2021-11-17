import { useHistory } from 'react-router';
import './Home.css';

function Home(props) {
    const history = useHistory();

    const redirect = (path) => {
        history.push(path);
    }

    return (
        <>
            <div>Home Page</div>
            <div className="primary-btn"
                onClick={()=>redirect('/golf')}>Cribbage Golf</div>
            <div className="primary-btn"
                onClick={()=>redirect('/user')}>Profile</div>
            <div className="primary-btn"
                onClick={()=>redirect('/leaderboards')}>Leaderboards</div>
            <div className="primary-btn"
                onClick={()=>redirect('/logout')}>Logout</div>
        </>
    )
}

export default Home;