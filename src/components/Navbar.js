import React, { useState } from 'react';

const Navbar = ({ isReadyCreate }) => {


    return (
        <nav className="navbar pb-1 pt-3">
            <div className="container-navbar">
                <div className="row px-4">
                    <div className="col-4 text-start p-0">
                    {isReadyCreate && <a className="navbar-brand no-margin" href=".">Home</a> }
                    </div>
                    <div className="col-4 text-center p-0">
                        <a className="navbar-brand no-margin" href="#">Resources</a>
                    </div>
                    <div className="col-4 text-end p-0">
                        <a className="navbar-brand no-margin" href="#">Contribute</a>
                    </div>

                </div>

              <div className="row">
                  <hr className="rule w-100 no-margin" />
              </div>

              <div className="row px-4 pt-1">
                  <div className="col-4 text-start p-0">
                  {!isReadyCreate && <a className="navbar-brand no-margin" href=".">Home</a> }
                  </div>
                  <div className="col-4 text-center p-0">
                    {false &&  <a className="navbar-brand no-margin" href="#">Resources</a>}
                  </div>
                  <div className="col-4 text-end p-0">
                    {false && <a className="navbar-brand no-margin" href="#">Contribute</a>}
                  </div>

              </div>


            </div>
        </nav>
    );
};

export default Navbar;
