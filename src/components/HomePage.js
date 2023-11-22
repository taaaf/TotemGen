import React from 'react';

const HomePage = () => {

  const scrollDown = (e) => {
      e.preventDefault();
      window.scrollBy({
          top: window.innerHeight,
          left: 0,
          behavior: 'smooth'
      });
  };

return(

  <div className="background-image">

    <div className="position-absolute top-50 start-50 translate-middle">

        <button className="scroll-button" id="scrollButton" onClick={scrollDown}>
        <h5 className="mb-0"> About </h5>
        <svg width="1.7vh" viewBox="0 0 46 26" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 2L23 23L44 2" stroke="black" strokeWidth="4"/>
        <path d="M2 2L23 23L44 2" stroke="black" strokeWidth="4"/>
        </svg>
       </button>

    </div>

  </div>


);


}

export default HomePage;
