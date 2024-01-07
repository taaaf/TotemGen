import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import logo from "../assets/logo.svg";
import res01 from "../assets/resources_01.png";
import res02 from "../assets/resources_02.png";
import res03 from "../assets/resources_03.png";
import res04 from "../assets/resources_04.png";
import res05 from "../assets/resources_05.png";
import res06 from "../assets/resources_06.png";
import dataSculptureExample1 from "../assets/example_photo1.JPG";
import dataSculptureExample2 from "../assets/example_photo2.JPG";
import dataSculptureExample3 from "../assets/example_photo3.JPG";
import keychain from "../assets/keychain.png";
import colab1 from "../assets/colab1.png";
import colab2 from "../assets/colab2.png";

const Resources = () => {
  const location = useLocation();

  useEffect(() => {
    console.log(location); // To see what the location object contains
    if (location.state?.activeContent) {
      setActiveContent(location.state.activeContent);
    }
  }, [location]);

  const [activeContent, setActiveContent] = useState("workshop");

  const handleContentChange = (content) => {
    setActiveContent(content);
  };

  const getStyle = (content) => ({
    textDecoration: activeContent === content ? "underline" : "none",
    cursor: "pointer",
  });

  return (
    <>
      <div className="row m-4 mt-5">
        <div className="col-sm-2 me-3" style={{ border: "" }}>
          <p
            style={getStyle("workshop")}
            onClick={() => handleContentChange("workshop")}
          >
            Workshop
          </p>

          <p
            style={getStyle("totemgen")}
            onClick={() => handleContentChange("totemgen")}
          >
            What is TotemGen?
          </p>

          <p
            style={getStyle("gettingStarted")}
            onClick={() => handleContentChange("gettingStarted")}
          >
            Getting Started
          </p>

          <p
            style={getStyle("tutorial")}
            onClick={() => handleContentChange("tutorial")}
          >
            Tutorial
          </p>

          <p
            style={getStyle("Resources")}
            onClick={() => handleContentChange("Resources")}
          >
            Resources
          </p>

          {/*  <p style={getStyle('community')} onClick={() => handleContentChange('community')}>Community</p>
        <p style={getStyle('dataSculptures')} onClick={() => handleContentChange('dataSculptures')}>Data Sculptures</p>
        <p style={getStyle('selfTracking')} onClick={() => handleContentChange('selfTracking')}>Self Tracking</p>
        <p style={getStyle('workshop')} onClick={() => handleContentChange('workshop')}>Workshop</p>
    */}
        </div>

        <div
          className="col-sm-9 ms-4 resources-text p-3"
          style={{ border: "2px solid #2B2A29" }}
        >
          {activeContent === "totemgen" && (
            <>
              <h1>ABOUT THE PROJECT</h1>
              <div className="row mt-3">
                <div className="col-xl-5 py-2 px-3">
                  <img src={logo} style={{ width: "100%", padding: "10%" }} />
                </div>

                <div className="col-xl-7 p-4">
                  <h4>
                    Totemgen is a free and opensource tool for generating data
                    sculptures. It was developed to simplify the process of
                    translating table data into three-dimensional shapes.
                    <br /> <br />
                    The website is built with{" "}
                    <a
                      href="https://react.dev/"
                      style={{ color: "#2B2A29" }}
                      target="_blank"
                    >
                      React
                    </a>
                    ,{" "}
                    <a
                      href="https://github.com/P5-wrapper/react"
                      style={{ color: "#2B2A29" }}
                      target="_blank"
                    >
                      ReactP5Wrapper
                    </a>{" "}
                    and{" "}
                    <a
                      href="https://getbootstrap.com/"
                      style={{ color: "#2B2A29" }}
                      target="_blank"
                    >
                      Bootstrap
                    </a>
                    . It uses the font{" "}
                    <a
                      href="https://www.redaction.us/"
                      style={{ color: "#2B2A29" }}
                      target="_blank"
                    >
                      Redaction
                    </a>
                    .
                    <br /> <br />
                    It's part of the Master's thesis project of Mattia Tafel,
                    student at Politecnico di Milano.
                    <br /> <br />
                    If you want to be updated on the development of this
                    web-tool check out the{" "}
                    <a
                      href="https://github.com/taaaf/TotemGen"
                      style={{ color: "#2B2A29" }}
                      target="_blank"
                    >
                      Github page
                    </a>{" "}
                    or{" "}
                    <a
                      href="https://www.instagram.com/form____plusmemories/"
                      style={{ color: "#2B2A29" }}
                      target="_blank"
                    >
                      Form +Memories
                    </a>
                    .
                    <br /> <br />
                    Totemgen is licensed under the{" "}
                    <a
                      href="https://github.com/taaaf/Totemgen/blob/main/LICENSE"
                      style={{ color: "#2B2A29" }}
                      target="_blank"
                    >
                      MIT License
                    </a>
                    .
                  </h4>
                </div>
              </div>
            </>
          )}

          {activeContent === "tutorial" && (
            <>
              <h1>HOW TO</h1>
              <div className="row mt-3 mb-5">
                <div className="col-xl-5 py-5 p-5">
                  <img
                    src={res01}
                    style={{ width: "100%", border: "1px solid #2B2A29" }}
                  />
                </div>

                <div className="col-xl-7 p-4 pt-5">
                  <h4>
                    By clicking on “CREATE” on the home page of the website, a
                    file selector and a text box will be shown. Upload your
                    table data.
                    <br />
                    Note: CSVs are currently the only file type accepted. If you
                    do not have data to upload and just want a demo of the tool,
                    click on the “Generate random table” button. This will show
                    a compatible table that you can use.
                  </h4>
                </div>

                <div className="col-xl-5 p-5">
                  <img
                    src={res02}
                    style={{ width: "100%", border: "1px solid #2B2A29" }}
                  />
                </div>

                <div className="col-xl-7 p-4 pt-5">
                  <h4>
                    Since data will be mapped to the three different axis, to
                    generate a topologically sound shape you should always have
                    a column that has ascending or descending order of values.
                    Also, values do not have to be of constant increments.
                  </h4>
                </div>

                <div className="col-xl-5 p-5">
                  <img
                    src={res04}
                    style={{ width: "100%", border: "1px solid #2B2A29" }}
                  />
                </div>

                <div className="col-xl-7 p-4 pt-5">
                  <h4>
                    After submitting the table data, you will have to map the
                    columns you want to be translated to 3D form to the axis of
                    your choice.
                    <br />
                    Note: the Z axis accepts only one column of values while the
                    X axis supports the entry of multiple ones. It is suggested
                    to map the column with values in ascending or descending
                    order to the Z axis.
                  </h4>
                </div>

                <div className="col-xl-5 p-5">
                  <img
                    src={res05}
                    style={{ width: "100%", border: "1px solid #2B2A29" }}
                  />
                </div>

                <div className="col-xl-7 p-4 pt-5">
                  <h4>
                    Once submitted the mapping of the columns the shape will be
                    displayed. Now you can use the modifiers to change the
                    topology of the 3D shape.
                  </h4>
                </div>

                <div className="col-xl-5 p-5">
                  <img
                    src={res06}
                    style={{ width: "100%", border: "1px solid #2B2A29" }}
                  />
                </div>

                <div className="col-xl-7 p-4 pt-5">
                  <h4>
                    When you are satisfied with the result, click submit and
                    then export. The 3D shape downloaded will be in .STL file
                    format, ready to be 3D printed.
                  </h4>
                </div>
              </div>
            </>
          )}

          {activeContent === "gettingStarted" && (
            <>
              <h1>CREATE YOUR OWN SCULPTURE</h1>
              <div className="row mt-3 mb-5">
                <div className="col-xl-5 py-5 p-5">
                  <img
                    src={dataSculptureExample1}
                    style={{ width: "100%", border: "1px solid #2B2A29" }}
                  />

                  <img
                    src={dataSculptureExample2}
                    style={{
                      width: "100%",
                      border: "1px solid #2B2A29",
                      margin: " 10% 0%",
                    }}
                  />

                  <img
                    src={dataSculptureExample3}
                    style={{ width: "100%", border: "1px solid #2B2A29" }}
                  />
                </div>

                <div className="col-xl-7 p-4 pt-5">
                  <h4>
                    To create a data sculpture you will need to track some data.{" "}
                    <a
                      href="https://docs.google.com/spreadsheets/d/1QQA8T7UwnBClrBLdQPLHF_j7UFUASzgioxVUJui6j70/edit?usp=sharing"
                      style={{ color: "#2B2A29" }}
                      target="_blank"
                    >
                      Click here
                    </a>{" "}
                    if you'd like to have a template as a starting point. You
                    can also write your data on a piece of paper, on the notes
                    on your phone... Do whatever is handier and more convenient
                    to you!
                    <br />
                    <br />
                    Naturally you can use data you already have, like the meters
                    you walked the past week, how many calories you had today or
                    how much time you spent listening to Lofi Girl the past
                    month.
                    <br />
                    <br />
                    Once data is collected, you need to format it in a table
                    like so:
                    <br />
                  </h4>
                  <br />
                  <p>
                    STEPS, DATA 1, DATA 2, DATA 3 <br />
                    1, 7, 8, 5 <br />
                    2, 4, 3, 4 <br />
                    3, 6, 7, 6 <br />
                    4, 7, 7, 8 <br />
                    5, 8, 2, 8 <br />
                    6, 9, 5, 9 <br />
                    7, 10, 4, 7 <br />
                  </p>

                  <h4>
                    You can now use Totemgen to genereate the data sculpture.
                    Check out the{" "}
                    <a
                      style={{
                        ...getStyle("tutorial"),
                        textDecoration: "underline",
                      }}
                      onClick={() => handleContentChange("tutorial")}
                    >
                      tutorial
                    </a>{" "}
                    if you need help.
                    <br />
                  </h4>
                </div>
              </div>
            </>
          )}

          {activeContent === "Resources" && (
            <>
              <h1>GOOGLE DRIVE FOLDER</h1>

              <div className="row">
                <div className="col-xl-5 py-2 p-5"> </div>
                <div className="col-xl-7 p-4 pt-5">
                  <h4>
                    <a
                      href="https://drive.google.com/drive/folders/1fZ1Pa8w-FydmPdEQNzteUTOLyB9w97rA?usp=drive_link"
                      style={{ color: "#2B2A29" }}
                      target="_blank"
                    >
                      Link to the Extras Folder
                    </a>{" "}
                    where you can find:
                  </h4>
                </div>

                <div className="col-xl-5 py-5 p-5">
                  <img
                    src={keychain}
                    style={{ width: "100%", border: "1px solid #2B2A29" }}
                  />
                </div>

                <div className="col-xl-7 p-4 pt-5">
                  <h4>
                    <h2> 1 </h2> Stl file of a keychain attachment. This can be
                    used to create a pendant or a keychain.
                  </h4>
                </div>

                <div className="col-xl-5 py-5 p-5">
                  <img
                    src={colab1}
                    style={{ width: "100%", border: "1px solid #2B2A29" }}
                  />
                </div>

                <div className="col-xl-7 p-4 pt-5">
                  <h4>
                    <h2> 2 </h2> Python code ready to be executed on Google
                    Colab that can extrapolate those messages that contain
                    certain keywords. You can use it to find how many times you
                    said "Miss you!" to your significant other.
                  </h4>
                </div>

                <div className="col-xl-5 py-5 p-5">
                  <img
                    src={colab2}
                    style={{ width: "100%", border: "1px solid #2B2A29" }}
                  />
                </div>

                <div className="col-xl-7 p-4 pt-5">
                  <h4>
                    <h2> 3 </h2> Python code ready to be executed on Google
                    Colab that can translate a sound track (.mp3) into a table (.csv).
                    Try it out with your favourite song or a vocal message!
                  </h4>
                </div>
              </div>
            </>
          )}

          {activeContent === "workshop" && (
            <>
              <h1>DATE, PROGRAM AND OTHER INFO SOON!</h1>

              <iframe
                src="https://docs.google.com/forms/d/e/1FAIpQLSd3EUubMz7pSguvp0N2TCP3bqs3Tq11YIZJ-noR2HekFaKqbA/viewform?embedded=true"
                width="100%"
                height="520"
                frameborder="0"
                marginheight="0"
                marginwidth="0"
                className="mt-4"
              >
                Loading…
              </iframe>
            </>
          )}

          {activeContent === "dataSculptures" && <h2>to do.....</h2>}

          {activeContent === "community" && <h2>to do...</h2>}

          {activeContent === "selfTracking" && <h2>to do.....</h2>}
        </div>
      </div>
    </>
  );
};

export default Resources;
