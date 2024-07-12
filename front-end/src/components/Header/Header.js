import React, {useEffect, useState} from "react";
import "./Header.scss";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}


const Home = () => {
	const [showNav, setshowNav] = useState(false);
    const [token, setToken] = useState('');
    let query = useQuery();
    const name = query.get("auth");

    useEffect(() => {
        const userToken = JSON.parse(localStorage.getItem('token'));
        setToken(userToken);
    }, [name]);

	const navItems = [
		{text: "Home", link: token ? "/" : "/login", hideInDesktop: true},
	];

	const navHandler = () => {
		setshowNav((prev) => !prev);
    };
    
    const logoutHandler = () => {
        localStorage.removeItem("token");
        setToken("");
    }

    return (
        <div className="container1">
            <div className='container'>
                <div className='container-header'>
                    <div className='navbar-logo'>
                        <i className='fas fa-bars menu-icon' onClick={navHandler}></i>
                        <div className='header-logo show-in-mobile'>
                            <Link to='/' className='header-logo-name'>
                                <label>Mobily</label>
                            </Link>
                        </div>

                        {showNav && (
                            <div className='navbar-menu'>
                                <ul className='nav-bar-links'>
                                    <li className='list-inline-item avatar-nav-link'>
                                        <a>
                                            <span>
                                                <i className='fas fa-user-alt user-icon'></i>
                                            </span>
                                        </a>
                                        <i
                                            className='fas fa-times close-icon'
                                            onClick={navHandler}></i>
                                    </li>
                                    {navItems &&
                                        navItems.length > 0 &&
                                        navItems.map((item) => (
                                            <Link
                                                key={item.text}
                                                to={item.link}
                                                style={{textDecoration: "none"}}>
                                                <li
                                                    key={item.text}
                                                    className='list-inline-item'
                                                    onClick={navHandler}>
                                                    {item.text}
                                                </li>
                                            </Link>
                                        ))}
                                </ul>
                            </div>
                        )}
                    </div>
                    <div className='header-logo hide-in-mobile'>
                        <Link to='/' className='header-logo-name'>
                            <label>Mobily</label>
                        </Link>
                    </div>
                    

                    <div className='right-sideheader'>
                        <ul className='ul-tag-header ul-right'>
                            {token ?
                                <>
                                <li className='li-tag-header hide-in-mobile' onClick={logoutHandler} >
                                    <Link className='a-tag-header-right' to='/login'>
                                        <i className='fas fa-user header-icon'></i>
                                        <span>Logout</span>
                                    </Link>
                                </li>
                                </> 
                                :
                                <li className='li-tag-header hide-in-mobile'>
                                    <Link className='a-tag-header-right' to='/login'>
                                        <i className='fas fa-user header-icon'></i>
                                        <span>Login</span>
                                    </Link>
                                </li>
                            }  
                        </ul>
                    </div>
                </div>
            </div>
            </div>
	);
};

export default Home;