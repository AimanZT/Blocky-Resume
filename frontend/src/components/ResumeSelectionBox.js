import React, { Component } from "react";
import Hash from "object-hash";
import $ from "jquery";

/* Upload Resume and Generate Hash from it */
export default class ResumeSelectionBox extends Component {
  constructor() {
    super();
    this.state = {
      resume: null,  /* Initialize resume file */
    };

    this.FileDetected = this.FileDetected.bind(this); 
    this.FileSubmitted = this.onSubmit.bind(this);
  }
 
  FileDetected(event) { /* Construct Resume Detection Event */
    this.setState({ resume: event.target.files[0] });
  }

  onSubmit(event) { /* Construct Resume Submission Event */
    event.preventDefault();
    const { web3 } = this.props;

    if (!this.state.resume) {
      alert("Upload A Resume First (PDF Format)"); /* Throw error when there is no resume selected */
      return;
    }

    let elem = document.getElementById("myBar"); /* Hash loading bar initialize*/
    let width = 1;
    let id = setInterval(frame, 20);

    function frame() {
      if (width >= 100) {
        clearInterval(id);
      } else {
        width++;
        elem.style.width = width + "%";
      }
    }

    setTimeout(() => {
      let resume = this.state.resume; /* Initializa resume */
      let reader = new FileReader(); /* Initializa FileReader function  */  /* Reference from :https://cutt.ly/dk0bxSC */

      reader.onload = (event) => {  
        let hash = Hash(event.target.result); 
        let rhash = web3.utils.toHex(hash);  /* Initializes hash value */
        $("#resumeHash").html(rhash); /* Capture the generated hash to be passed to transaction box */
      };

      reader.readAsBinaryString(resume); /* Start reading and generating hash based on resume */
    },2000);
  }


  /* (UI) */
  render() {
    return (
      <div>
        <div id="fontstyle">
          <form onSubmit={(event) => this.onSubmit(event)}>
            <div className="file-field input-field">
              <div className="btn">
                <span>Select Resume File</span>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(event) => this.FileDetected(event)}
                />
              </div>
              <div className="file-path-wrapper">
                <input className="file-path validate" type="text" />
              </div>
            </div>

            <div id="myProgress">
              <div id="myBar"></div>
            </div>
            <br />

            <div className="text-right">
              <button
                className="btn"
                type="submit"
              >
                {" "}
                Generate Hash{" "}
              </button>
              <br />
              &nbsp;
            </div>
          </form>
        </div>
      </div>
    );
  }
}
