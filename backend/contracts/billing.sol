//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;



contract Billingbc  {


      struct Billing{
          
        string  name;
        string  mobileno;
        string  houseno;
        
      }
     
 
      mapping(string => Billing) public bills; 
   
      
      Billing public newUser ;
     
      uint public length;
      address public owner;
      
      
      constructor() {
          
          owner = msg.sender;
      }
      
      
      
      
      function createNewUser(string memory name,string memory mobileno,string memory houseno) public  {

        bills[mobileno]=Billing(name,mobileno,houseno);
          
      }


      
    
}