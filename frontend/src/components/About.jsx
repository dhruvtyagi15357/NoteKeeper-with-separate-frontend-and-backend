import React, { useEffect } from "react";

const About = () => {
  return (
    <div>
      <div className="accordion container my-5" id="accordionExample">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle=""
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne">
              INote | Your notebook on the cloud!
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse show"
            data-bs-parent="#accordionExample">
            <div className="accordion-body ">
              <strong>NoteKeeper | Your notebook on the cloud</strong> is a note taking application made with MERN stack that can be 
              used to take notes that can be made available to all your devices having an internet connection. This application
              uses a lot of technologies like: MongoDB, ExpressJS, ReactJS and ofcourse NodeJS.
              <br/>
              Other libraries/frameworks that were used to make this application possible include: 
              <ul>
                <li>Mongoose</li>  
                <li>BcryptJS</li>
                <li>Express Validator</li>
                <li>Json Web Token</li>  
                <li>Create Context hook</li>
                <li>React router dom</li>
                <li>Bootstrap</li>
              </ul>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
