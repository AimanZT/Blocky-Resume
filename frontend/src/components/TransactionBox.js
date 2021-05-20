import React, { Component } from "react";
import $ from "jquery";

/* Where submitting and verifying resume happens */
class TransactionBox extends Component {

  componentDidMount() {   /*  Gets invoked when render() has run aka mounted */
    this.props.contract.methods /* props = properties (read only)*/
      .CapTotalResume()     /* call funtion from contract */
      .call({ from: this.props.accounts[0] })
      .then((res) => {    /* res = response */
        $("#resumeNo").html(res.resumeNo);
      });
  }

  submitresume = (event) => {  /* Initialize submit resume proccess */
    $("#status").html("Submitting resume, please wait...");     /* Update status */

    setTimeout(async () => {
      let hash = $("#resumeHash").text();  /* Initialize hash from generated hash */
      const { contract, accounts } = this.props;

      await contract.methods
        .NewResume(hash)  /* Call function from ResumeCheck.sol */
        .send({ from: accounts[0] }) 
        .then((res) => {
          $("#status").html("Resume's hash is successfully submitted");
        })
        .catch((err) => {
          console.log(err.message);
          $("#status").html("Error in submitting resume hash");
        });

      contract.methods
        .CapTotalResume()  /* Call function from ResumeCheck.sol  */
        .call({ from: accounts[0] })
        .then((resumeNo) => {
          $("#resumeNo").html(resumeNo);   /* Capture resume total amount and send it to status box */
        });

      contract.methods
        .CapResume(hash)  /* Call function from ResumeCheck.sol  */
        .call({ from: accounts[0] })
        .then((result) => {
          let date = this.formatDate(result);
          $("#resDT").html(date);      /* Capture resume date and time and send it to status box */
          $("#resOwner").html(result.owner);    /* Capture resume submitter and send it to status box */
        });
    }, 2000);
  };

  verifyresume = (event) => {   /* Initialize verifying resume proccess */
    $("#status").html("Verifying resume, please wait.");

    setTimeout(async () => {
      let hash = $("#resumeHash").text();   /* Initialize hash from generated hash */

      const { contract, accounts } = this.props;
      await contract.methods
        .ResumeExist(hash)          /* Call function from ResumeCheck.sol along with resume hash */
        .call({ from: accounts[0] })
        .then((res) => {
          console.log(typeof res);
          console.log(res);
          if (res === true) {  /* If there is response from contract, resume is verified */
            $("#status").html("Resume Verified");  /* Capture resume verified status and send it to status box */
          } else if (res === false) {   /* If there no response from contract, resume is verified */
            $("#status").html("Resume is Not Verified");  /* Capture resume verified status and send it to status box */
            $("#resDT").html("-");
            $("#resOwner").html("-");
          }
        });

      contract.methods 
        .CapResume(hash)    /* Call function from ResumeCheck.sol along with resume hash */
        .call({ from: accounts[0] })
        .then((result) => {
          let date = this.formatDate(result); 
          $("#resDT").html(date);  /* Capture resume date and time and send it to status box */
          $("#resOwner").html(result.owner);   /* Capture resume submitter and send it to status box */
        }
       );
    }, 2000);
  };

  formatDate(result) {  /* Initialize date from the information passed from above functions */
    let date = new Date(result.date * 1000); 

    //Date//
    const day = date.getDate().toString();  // set day
    const dayf = day.length === 1 ? "0" + day : day;

    const month = (date.getMonth() + 1).toString();   // set month
    const monthf = month.length === 1 ? "0" + month : month;

    const yearF = date.getFullYear();  // set year

    //Time//
    const hour = date.getHours().toString();    // set hours
    const hourf = hour.length === 1 ? "0" + hour : hour;

    const min = date.getMinutes().toString();   // set minutes
    const minf = min.length === 1 ? "0" + min : min;

    const sec = date.getSeconds().toString();   // set second
    const secf = sec.length === 1 ? "0" + sec : sec;

    date = `${hourf}:${minf}:${secf} - ${monthf}/${dayf}/${yearF} `; // Compile all information from date function
    return date;
  }

  /* (UI) */
  render() {
    return (
      <div id="fontstyle">
        <div className="my_table">
          <table className="table-striped">
            <br></br>
            <br></br>
            <tbody>
              <tr>
                <td>Hash:</td>
                <td>
                  <span id="resumeHash"></span>
                </td>
              </tr>
            </tbody>
          </table>

          <div className="text-right">
            <button
              className="whitespace btn"
              onClick={(a) => this.submitresume(a)}
            >
              {" "}
              Send To BlockChain{" "}
            </button>{" "}
            &nbsp;
            <button
              className="whitespace btn"
              onClick={(a) => this.verifyresume(a)}
            >
              {" "}
              Verify Resume
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default TransactionBox;
