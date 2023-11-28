import React from 'react';
import logo from "../assets/logo.svg"
import mit from "../assets/mit-license.png"
import github from "../assets/github-mark.png"

const HomePage = () => {

return(

  <>
    <div className="position-absolute top-50 start-50 translate-middle">
      <img src={logo} />
        <p className="mt-4 text-center description"> A free and opensource tool for creating data sculptures.</p>
    </div>

    <div className="position-absolute bottom-0 start-0 p-3">
        <div className="row align-items-center">

        <div className="col">
            <a href="https://github.com/taaaf/TotemGen/tree/main" target="_blank" >
             <img src={github} className="images" alt="GitHub page" />
           </a>
         </div>

            <div className="col">
              <a href="https://github.com/taaaf/TotemGen/blob/main/LICENSE" target="_blank" >
                 <img src={mit} className="images" alt="MIT License" />
              </a>
            </div>


        </div>
     </div>

    </>

);

}

export default HomePage;
