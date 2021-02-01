import React from 'react';

function Education() {
    return(
        <React.Fragment>
            <section id="edu">
                <div className="row education">
                    <h1><center><span>Education</span></center></h1> <br/>
                    <div className="twelve columns main-col">
                        <div className="row item">
                            <div className="three columns">
                                <img src="images/igdtuw-graduation.jpeg" alt="igdtuw-graduation-image"></img>
                            </div>
                            <div className="nine columns">
                                <h3>Indira Gandhi Delhi Technical University for Women (IGDTUW), Delhi</h3>
                                <p className="info"> <em className="date">2015 - 2019</em> </p>
                                <p className="info"> 
                                    <span>•</span> Bachelor of Technology (B.Tech) in Information Technology 
                                    <br/> <span>•</span> Vice Chancellor's Gold Medalist 
                                    <br/> <span>•</span> Activities & Societies: ACM Student Chapter, Lean IN, Leaders For Tomorrow
                                </p>
                            </div>
                        </div> 
                        <br/> <br/>
                        <div className="row item">
                            <div className="three columns">
                                <img src="images/school-picture.jpeg"></img>
                            </div>
                            <div className="nine columns">
                                <h3>Bal Bharati Public School, Dwarka, Delhi</h3>
                                <p className="info"> <em className="date">Graduated In 2015</em> </p>
                                <p className="info">
                                    <span>•</span> 96.6% Aggregate in class 12 
                                    <br/> <span>•</span> CGPA 10/10 in class 10 
                                    <br/> <span>•</span> Activities: Deputy Head Girl; Model United Nations Chairperson
                                </p>
                            </div>
                        </div> 
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
}

export default Education;