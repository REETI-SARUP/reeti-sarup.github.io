import React from 'react';

function ProfileCard() {
    return(
        <React.Fragment>
        <div className="container">
            <div className="row">
                <div className="banner">
                    <div className="card profile-card-2">
                        <div className="card-img-block"></div>
                        <div className="card-body pt-5">
                        <div>
                            <img src="images/profile-picture.jpeg" alt="profile-image" className="profile" />
                        </div>
                        <div className="card-content">
                            <h5 className="card-title">Reeti Sarup</h5>
                            <br/>
                            <p className="card-text">Software Engineer at Intuit in Product Development Core team for QuickBooks Online Advanced. <br/> Vice-Chancellor's Gold Medalist at IGDTUW </p>
                        </div>
                        <p>
                            <a href="documents/resume.pdf" className="button" target="_blank"><i className="fa fa-download" />Download Resume</a>
                        </p>
                    </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <hr />  
                <ul className="social">
                    <li><a href="https://in.linkedin.com/in/reeti-sarup" target="_blank"><i className="fa fa-linkedin"></i></a></li>
                    <li><a href="https://github.com/REETI-SARUP" target="_blank"><i className="fa fa-github"></i></a></li>
                    <li><a href="https://medium.com/@reetisarup" target="_blank"><i className="fa fa-medium"></i></a></li>
                    <li><a href="https://twitter.com/reeti_sarup" target="_blank"><i className="fa fa-twitter"></i></a></li>
                </ul>
            </div> 
        </div>
        </React.Fragment>
    );
}

export default ProfileCard;