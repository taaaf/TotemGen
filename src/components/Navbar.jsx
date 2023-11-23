import React from 'react';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light pb-1 pt-3">
            <div className="container-fluid">
                <div className="row w-100">
                    <div className="col text-start">
                        <a className="navbar-brand" href=".">Home</a>
                    </div>
                    <div className="col text-center">
                        <a className="navbar-brand" href="#">Resources</a>
                    </div>
                    <div className="col text-end">
                        <a className="navbar-brand" href="#">Contribute</a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
