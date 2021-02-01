import React from 'react';

function Experience() {
    return(
        <React.Fragment>
            <section id="experience">
                <div className="row work">
                    <h1><center><span>Experience</span></center></h1> <br/>
                    <div className="twelve columns main-col">
                        <div className="row item">
                            <div className="three columns">
                                <img src="images/intuit-picture.jpeg"></img>
                            </div>
                            <div className="nine columns">
                                <h3>Intuit</h3>
                                <p className="info">Software Engineer <span>•</span> <em className="date">July 22, 2019 – Present</em></p>
                                <p>
                                    Software Engineer in the Product Development Core Team for QuickBooks Online Advanced: a complete cloud-based accounting software for mid-market businesses. Full-stack web developer with expertise in client-side technologies like HTML, CSS, JavaScript, React, TypeScript, GraphQL, Apollo Client along with web accessibility, proper analytics & code coverage and web performance optimizations.
                                </p>
                            </div>
                        </div> 
                        <div className="row item">
                            <div className="three columns">
                                <img src="images/intuit-internship-picture.jpeg"></img>
                            </div>
                            <div className="nine columns">
                                <h3>Intuit</h3>
                                <p className="info">Software Engineering Intern <span>•</span> <em className="date">June 4, 2018 - July 27, 2018</em></p>
                                <p>
                                    Integrated publish-subscribe messaging system- Kafka with existing Logit service to decompose monolith application.
                                </p>
                            </div>
                        </div> 
                        <div className="row item">
                            <div className="three columns">
                                <img src="images/coding-ninjas.jpeg"></img>
                            </div>
                            <div className="nine columns">
                                <h3>Coding Ninjas – Programming Institute (New Delhi)</h3>
                                <p className="info">Problem Setter & Curator (Intern) <span>•</span> <em className="date">June 2, 2017 - August 2, 2017</em></p>
                                <p>
                                    Built problem statements with solutions in C++ & Java for online coding platform.
                                </p>
                            </div>
                        </div> 
                        <div className="row item">
                            <div className="three columns">
                                <img src="images/gmr-igi-airport.jpeg"></img>
                            </div>
                            <div className="nine columns">
                                <h3>GMR – Delhi International Airport Pvt. Ltd.</h3>
                                <p className="info">Summer Industrial Project Trainee <span>•</span> <em className="date">June 2, 2016 - June 29, 2016</em></p>
                                <p>
                                    Built a sample Web-Application using HTML, CSS, Java, JSP, Servlets & SQL for Flight Schedule Information at Indira Gandhi International (IGI) Airport, Delhi.
                                </p>
                            </div>
                        </div> 
                    </div>
                </div> 
            </section>
        </React.Fragment>
    );
}

export default Experience;