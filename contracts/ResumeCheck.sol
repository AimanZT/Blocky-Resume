pragma solidity ^0.5.0;

contract ResumeCheck {
    
    struct resume {   // Initialize arrays for resume data
        address owner;
        uint date;
    }
    
    address public creator;
    uint public ResumeNo;
    mapping(bytes32 => resume) public resumeHashMap; // Set mapping
    
    constructor() public {
        creator = msg.sender;
        ResumeNo = 0;
    }
    
    function NewResume(bytes32 hash) public returns (bool success) {
        if (ResumeExist(hash)) {     // Check resume existance first
            success = false;        // If resume already exist no resume will be added to the HashMap 
        }else {
            resume storage d = resumeHashMap[hash]; // If resume does not exist, start resume addition process 
            d.owner = msg.sender;
            d.date = now;
            ResumeNo++; // Counter for amount of resume added to the HashMap
            success = true;
        }
        return success;
    }
    
    function ResumeExist(bytes32 hash) public view returns (bool exists) { 
        if (resumeHashMap[hash].date > 0) { // Check if resume hash exsist in the HashMap (date as the condition)
            exists = true;
        } else {
            exists = false;
        }
        return exists;
    }
    
    function CapResume(bytes32 hash) public view returns (uint date, address owner) { // Get resume hash and assign date and owner to it
        date = resumeHashMap[hash].date;
        owner = resumeHashMap[hash].owner;
    }

    function CapTotalResume() public view returns (uint resumeNo) {  //Call Amount of resume from NewResume function
        return ResumeNo;
    }
}