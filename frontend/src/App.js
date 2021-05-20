import React, { Component } from "react";
import ResumeCheck from "./contracts/ResumeCheck.json";
import getWeb3 from "./utils/getWeb3";
import NavBar from "./components/NavBar";
import LoadBar from "./components/LoadBar";
import Footer from "./components/Footer";
import "./css/main.css";

import InformationBox from "./components/InformationBox";
import ResumeSelectionBox from "./components/ResumeSelectionBox";
import TransactionBox from "./components/TransactionBox";
import StatusBox from "./components/StatusBox";

class App extends Component {
  state = {  // Initialize every variable
    ResumeNo: 0,
    web3: null,
    accounts: null,
    contract: null,
    balance: null,
    correctNetwork: true,
  };

  componentDidMount = async () => {
    try {
      
      const web3 = await getWeb3();  // Capture network and web3 instance.

      const accounts = await web3.eth.getAccounts();  // Capture account details
      web3.eth.defaultAccount = accounts[0];

      const networkId = await web3.eth.net.getId();  // Capture current network
      const deployedNetwork = ResumeCheck.networks[networkId];
      const instance = new web3.eth.Contract(
        ResumeCheck.abi,
        deployedNetwork && deployedNetwork.address // Get contract from deployed contract
      );

      if (networkId === 5777) {   //Condition set so that network is always pointing to local network
        this.setState(
          { web3, accounts, contract: instance },
          this.getUserBalance
        );
      } else {
        this.setState({ correctNetwork: false });
      }
    } catch (error) {

      alert(
        `Check Contract Deployment and MetaMask`
      );
      console.error(error);
    }
  };

  getUserBalance = async () => {  //Get user wallet ETH balance
    let balance = await this.state.web3.eth.getBalance(
      this.state.web3.eth.defaultAccount
    );
    this.setState({ balance: this.state.web3.utils.fromWei(balance, "ether") });
  };

  // (UI) //
  render() {
    if (!this.state.web3) {
      return <LoadBar />;
    }

    return (
      <div className="App">
        <div className="gradient-border">
        <NavBar cbAddress={this.state.web3.eth.defaultAccount} />
        </div>
        <div className="App grid-container">
          <div className="gradient-border center whitespace grid-item grid-item-1 col-md-8 ">
            <InformationBox
              tr_address={this.state.contract.options.address}
              ac_balance={this.state.balance}
            />
          </div>
          <div className="gradient-border left grid-item grid-item-2">
            <ResumeSelectionBox web3={this.state.web3} />
          </div>
          <div className=" gradient-border right grid-item grid-item-3">
            <TransactionBox
              contract={this.state.contract}
              accounts={this.state.accounts}
              web3={this.state.web3}
            />
          </div>
          <div className=" gradient-border center grid-item grid-item-4 col-md-8">
            <StatusBox />
          </div>
          <div className=" gradient-border grid-item grid-item-4 "><Footer/></div>
        </div>
      </div>
    );
  }
}

export default App;
