import React, { Component } from "react";

/* General Overview (UI) */
class InformationBox extends Component {
  render() {
    return (
      <div>
        <div id="fontstyle">
          <table className="table-striped">
            <tbody>
              <tr>
                <td> Transaction Address: </td>  
                <td> {this.props.tr_address} </td>   {/* Address account where the payment will be send */}
              </tr>
              <tr>
                <td> Account Balance: </td>
                <td> {this.props.ac_balance} ETH </td>  {/* Balance of user Ethereum */}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default InformationBox;
