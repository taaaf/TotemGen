import React, { useState } from 'react';
import logo from "../assets/logo.svg"
import res01 from "../assets/resources_01.png"
import res02 from "../assets/resources_02.png"
import res03 from "../assets/resources_03.png"
import res04 from "../assets/resources_04.png"
import res05 from "../assets/resources_05.png"
import res06 from "../assets/resources_06.png"



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

      <div className="row m-4 mt-5">

          <div className="col-sm-2 me-3" style={{ border: "" }}>

        <p style={getStyle('totemgen')} onClick={() => handleContentChange('totemgen')}>What is TotemGen?</p>
        <p style={getStyle('tutorial')} onClick={() => handleContentChange('tutorial')}>Tutorial</p>
  {/*  <p style={getStyle('community')} onClick={() => handleContentChange('community')}>Community</p>
        <p style={getStyle('dataSculptures')} onClick={() => handleContentChange('dataSculptures')}>Data Sculptures</p>
        <p style={getStyle('selfTracking')} onClick={() => handleContentChange('selfTracking')}>Self Tracking</p>
        <p style={getStyle('workshop')} onClick={() => handleContentChange('workshop')}>Workshop</p>
    */}
          </div>


            <div className="col-sm-9 ms-4 resources-text p-3" style={{ border: "2px solid #2B2A29" }}>

              {activeContent === 'totemgen' &&

              <>

              <h1>ABOUT THE PROJECT</h1>
              <div className="row mt-3">

              <div className="col-xl-5 py-2 px-3">
                  <img src={logo} style={{width:"100%", padding:"10%"}}/>
              </div>

                <div className="col-xl-7 p-4">

                  <h4>Totemgen is a free and opensource tool for generating data sculptures.
                  It was developed to simplify the process of translating table data into three-dimensional shapes.
                  <br/>
                  The website is built with React, ReactP5Wrapper and Bootstrap.
                  <br/> <br/>
                  It's part of the Master's thesis project of Mattia Tafel, student at
                  Politecnico di Milano.
                  <br/> <br/>

                  If you want to be updated on the development of this web-tool check out
                  the <a href="https://github.com/taaaf/TotemGen" style={{color:"#2B2A29"}} target="_blank">Github page</a> or <a href="https://www.instagram.com/form____plusmemories/" style={{color:"#2B2A29"}} target="_blank">Form +Memories</a>.
                  </h4>

                </div>
                </div>

              </>

            }

            {activeContent === 'tutorial' &&

            <>


            <h1>GETTING STARTED</h1>
            <div className="row mt-3 mb-5">

                <div className="col-xl-5 py-5 p-5">
                    <img src={res01} style={{width:"100%", border: "1px solid #2B2A29" }}/>
                </div>

                <div className="col-xl-7 p-4 pt-5">

                <h4>By clicking on “CREATE” on the home page of the website, a file selector and a text box will be shown.
                Upload your table data.
                <br/>
                Note: CSVs are currently the only file type accepted. If you do not have data to upload
                and just want a demo of the tool, click on the “Generate random table”. This will show a compatible table
                that you can use.
                </h4>

                </div>

                <div className="col-xl-5 p-5">
                  <img src={res02} style={{width:"100%", border: "1px solid #2B2A29" }}/>
                </div>

                <div className="col-xl-7 p-4 pt-5">
                <h4>
                Table formatting
                Since data will be mapped to the three different axis, to generate a topologically sound shape you should always
                have a column that has ascending or descending order of values. Also, values do not have to be of constant increments.
                </h4>

                </div>

                <div className="col-xl-5 p-5">
                    <img src={res04} style={{width:"100%", border: "1px solid #2B2A29"}}/>
                </div>

                <div className="col-xl-7 p-4 pt-5">
                <h4>
                After submitting the table data, you will have to map the columns you want to be translated to 3D form to the
                axis of your choice.
                <br/>
                Note: the Z axis accepts only one column of values while the X axis supports the entry of
                multiple ones. It is suggested to map the column with values in ascending or descending order to the Z axis.
                </h4>

                </div>


                <div className="col-xl-5 p-5">
                  <img src={res05}style={{width:"100%", border: "1px solid #2B2A29"}}/>
                </div>

                <div className="col-xl-7 p-4 pt-5">
                <h4>
                Once submitted the mapping of the columns the shape will be displayed. Now you can use the modifiers to change
                the topology of the 3D shape.
                  </h4>
                </div>

                <div className="col-xl-5 p-5">
                  <img src={res06}style={{width:"100%", border: "1px solid #2B2A29"}}/>
                </div>

                <div className="col-xl-7 p-4 pt-5">
                  <h4>
                  When you are satisfied with the result, click submit and then export. The 3D shape downloaded will be in .STL
                  file format, ready to be 3D printed.
                  </h4>
              </div>


            </div>

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
