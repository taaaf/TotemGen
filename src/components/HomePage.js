import React from 'react';
import logo from "../assets/logo.svg"

const HomePage = () => {

console.log(logo);

return(
    <div className="position-absolute top-50 start-50 translate-middle">
      <img src={logo} />
        <p className="mt-4 text-center description"> A free and opensource tool for creating data sculptures.</p>
    </div>
);

}

export default HomePage;
