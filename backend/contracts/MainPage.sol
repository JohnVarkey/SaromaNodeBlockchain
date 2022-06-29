//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;



contract  MainPagebc {


      struct Buyonce  {
          
        string  productid;
        string  name;
        string  price;
        string  farmer_id;
    
      }
     
 
      mapping(string => Buyonce) public buys; 
   
      
      Buyonce public newUser ;
     
      uint public length;
      address public owner;
      
      
      constructor() {
          
          owner = msg.sender;
      }
      
      
      
      
      function createNewUser(string memory productid,string memory name,string memory price,string memory farmer_id) public  {

        buys[productid]=Buyonce(productid,name,price,farmer_id);
          
      }


      
    
}