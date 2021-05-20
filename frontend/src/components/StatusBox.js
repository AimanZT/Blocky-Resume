import React, { Component } from 'react'

/* Display details of the resume and its status (UI) */
class StatusBox extends Component {
    render() {
        return(
            <div id="fontstyle">
                    
                    <table className=" table-striped">
                        <tbody>
                            <tr>
                                <td> Submitting/Verifying Status: </td>
                                <td id='status'> </td>
                            </tr>
                            <tr>
                                <td> Number Of Resume Submitted: </td>
                                <td id='resumeNo'> </td>
                            </tr>
                            <tr>
                                <td> Resume Submission Date/Time: </td>
                                <td id='resDT'> </td>
                            </tr>
                            <tr>
                                <td> Resume Submitter: </td>
                                <td id='resOwner'> </td>
                            </tr>
                        </tbody>
                    </table>
            </div>
        )
    }
}

export default StatusBox;