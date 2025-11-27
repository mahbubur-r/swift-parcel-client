import React from 'react';
import Logo from '../../../components/Logo/Logo';
import { Link, NavLink } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import { FaLocationArrow } from 'react-icons/fa';

const NavBar = () => {
    const {user, logOut} = useAuth();
    // console.log(user);

    const handleLogout = ()=>{
        logOut()
        .then()
        .catch(error => {
            console.log(error);
            
        })
    }
    
    
    const links = <>
        <li><NavLink to= '/'>Home</NavLink></li>
        <li><NavLink to= ''>Services</NavLink></li>
        <li><NavLink to= ''>About Us</NavLink></li>
        <li><NavLink to= '/send-parcel'>Send Parcel</NavLink></li>
        <li><NavLink to= '/coverage'>Coverage</NavLink></li>
    </>
    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow text-xl font-bold">
                        {links}
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">
                    <Logo></Logo>
                </a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 text-xl font-bold">
                    {links}
                </ul>
            </div>
            <div className="navbar-end flex gap-3">
                {
                   user ? <button onClick={handleLogout} className="btn text-lg">Logout</button>:<Link to='/login'><button className="btn text-lg">Login</button></Link>
                }
                <Link to='/rider'><button className="btn btn-primary text-black text-lg">Be a Rider<FaLocationArrow /></button></Link>
            </div>

        </div>
    );
};

export default NavBar;