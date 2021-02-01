import React from 'react';

function NavBar() {
    return(
        <React.Fragment>
            <nav id="nav-wrap">
                <a className="mobile-btn" href="#nav-wrap" title="Show navigation">Show navigation</a>
                <a className="mobile-btn" href="#" title="Hide navigation">Hide navigation</a>
                <ul id="nav" className="nav">
                    <li className="current">
                        <a className="smoothscroll" href="#home">Home</a>
                    </li>
                    <li>
                        <a className="smoothscroll" href="#edu">Education</a>
                    </li>
                    <li>
                        <a className="smoothscroll" href="#experience">Experience</a>
                    </li>
                </ul>
            </nav>
        </React.Fragment>
    );
}

export default NavBar;