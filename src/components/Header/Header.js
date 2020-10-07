import React from 'react';
import logo from '../../images/logo.png';
import './Header.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { userContext } from '../../App';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    return (
        <div className="header">
            <img src={logo} alt=""/>
            <nav>
                {/* Link can only by added to the components which are inside the Router */}
                <Link to='/shop'>Shop</Link>
                <Link to='/review'>Review</Link>
                <Link to='/inventory'>Manage Inventory</Link>
                <button onClick={() => setLoggedInUser({})}>Sign Out</button>
            </nav>
        </div>
    );
};

export default Header;