import React from 'react';
import NavBar from './NavBar';
import ProfileCard from './ProfileCard';

function Header() {
    return(
        <React.Fragment>
            <header id="home">
                <NavBar />
                <ProfileCard />
            </header>
        </React.Fragment>
    );
}

export default Header;