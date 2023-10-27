import React from "react";
import ProfileImg from '../Images/Profile.svg';
import DashboardImage from '../Images/Dashboard.svg'
import '../Styles/Navbar.scss'

export default function Navbar(){
    return (
        <nav className="navbar">
            <button className="btn-profile">
                <img src={ProfileImg} alt="Profile SVG" />
            </button>
            <button className="btn-dashboard">
                <img src={DashboardImage} alt="Dashboard SVG" />
            </button>
        </nav>
    );
}