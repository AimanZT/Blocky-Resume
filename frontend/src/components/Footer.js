import React, { Component } from "react";


/* Simple navigation bar on top of the website (UI)*/
class Footer extends Component {
  render() {
    return (
        <div class="site-footer">
          <div class="container">
            <div class="row">
              <div class="col-sm-12 col-md-6">
                <h6>About</h6>
                <p class="text-justify">Welcome to Blocky-Resume.</p>
                <p class="text-justify">This website functionality allows hiring company and university to reduce the time taken to go through all of their resume application and validate them manually one by one.</p>
              </div>
    
              <div class="col-xs-6 col-md-3">
                <h6>How To Use:</h6>
                <ul>
                <li class="text-justify">1. Make sure your ETH wallet is not empty.</li>
                <li class="text-justify">2. Select resume to be submitted or verified.</li>
                <li class="text-justify">3.  Click generate Hash.</li>
                <li class="text-justify">4. Choose either two option (Send to Blockchain / Verify Resume).</li>
                <li class="text-justify">3. Profit :)</li>
                </ul>
              </div>
    
              <div class="col-xs-6 col-md-3">
                <h6>Contact Me:</h6>
                <ul>
                <li class="text-justify"><a href="tel:601-100-9876">(60+) 011-009876</a></li>
                <li class="text-justify"><a href="mailto:1171101292@student.mmu.edu.my">1171101292@student.mmu.edu.my</a></li>
                </ul>
              </div>
            </div>
            <hr>
          </hr>
          <div class="container">
            <div class="row">
              <div class="">
                <p class="copyright-text">Created by: Muhamad Amirul Aiman &copy; 2021
                </p>
              </div>
  
            </div>
          </div>
          </div>
          </div>
    );
  }
}

export default Footer;
