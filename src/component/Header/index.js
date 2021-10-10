import React from 'react';
import {Link} from "react-router-dom";

const Header = () => {
    return (
        <nav className="navbar navbar-light bg-light mb-5">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">Home</Link>
            </div>
        </nav>
    );
};

export default Header;