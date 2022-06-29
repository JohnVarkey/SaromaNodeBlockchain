//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
contract Userbc {


      struct User{
          
        string  user_id;
        string  hashValue;
        string  datetime;
      }
     
 
      mapping(string => User) public users; 
   
      User public newUser ;
     
      uint public length;
      address public owner;
      
      
      constructor() {
          
          owner = msg.sender;
      }
      
      
      
      
      function createNewUser(string memory user_id,string memory hashValue,string memory datetime) public  {

        users[user_id]=User(user_id,hashValue,datetime);
          
      }  
}