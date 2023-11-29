import React, { useState } from 'react';

const Resources = () => {

  const [activeContent, setActiveContent] = useState("totemgen");

   const handleContentChange = content => {
     setActiveContent(content);
   };

   const getStyle = (content) => ({
  textDecoration: activeContent === content ? 'underline' : 'none',
  cursor: 'pointer'
});


  return (
    <>

      <div className="row m-5">

          <div className="col-sm-3 me-3" style={{ border: "" }}>

        <p style={getStyle('totemgen')} onClick={() => handleContentChange('totemgen')}>What is TotemGen?</p>
        <p style={getStyle('tutorial')} onClick={() => handleContentChange('tutorial')}>Tutorial</p>
        <p style={getStyle('dataSculptures')} onClick={() => handleContentChange('dataSculptures')}>Data Sculptures</p>
        <p style={getStyle('community')} onClick={() => handleContentChange('community')}>Community</p>
        <p style={getStyle('selfTracking')} onClick={() => handleContentChange('selfTracking')}>Self Tracking</p>
        <p style={getStyle('workshop')} onClick={() => handleContentChange('workshop')}>Workshop</p>

          </div>


            <div className="col-sm-8 ms-4 resources-text p-3" style={{ border: "2px solid #2B2A29" }}>

              {activeContent === 'totemgen' &&

              <>
              <h1>ABOUT THE PROJECT</h1>
              <h4>Totemgen is a free and opensource tool for creating data sculptures.
              It is being developed for the thesis project of Mattia Tafel, student of
              Politecnico of Milan, Communication Design, School of Design.
              <br/> <br/>
              to do...
              </h4>

              </>

            }

            {activeContent === 'tutorial' &&

            <>
            <h1>GETTING STARTED</h1>

            <h4>On the Home Page, click on the button "CREATE".
            <br/> <br/>
            to do... </h4>

            </>

          }


            {activeContent === 'dataSculptures' && <h2>to do.....</h2>}

            {activeContent === 'community' && <h2>to do...</h2>}

            {activeContent === 'selfTracking' && <h2>to do.....</h2>}

            {activeContent === 'workshop' &&


            <h2>Soon in January 2024 !</h2>


          }



            </div>

      </div>

    </>
  );
}

export default Resources;
