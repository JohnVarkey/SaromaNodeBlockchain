require("dotenv").config();

const express = require("express");
const app = express();
const Web3 = require("web3");
let web3 = null;
let contractABI = null;
const axios = require('axios').default;

const cors = require("cors");

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
const { getValidUsers, getPendingUser, updateUserStatus } = require("./database")


const init = async () => {

    web3 = new Web3(new Web3.providers.HttpProvider(process.env.IP));
    let id = await web3.eth.net.getId();
    let contractJSON = require("../contract/build/contracts/LedgerMail.json");
    let deployedNetwork = contractJSON.networks[id];
    contract = new web3.eth.Contract(contractJSON.abi, deployedNetwork.address);
    run();

}

init();


const run =async () => {
    console.log("started")

    let pendingUser = await getPendingUser();
    console.log("Pending User", pendingUser);


    while (pendingUser != 0) {
        console.log("Pending User", pendingUser);
        try {

            console.log("getting data");

            let Mongobody = await getValidUsers(300); //
            console.log(Mongobody)

            for (let rec of Mongobody) {

                let email_id = rec.emailId;
                console.log("email_id", email_id)

                //COMMENT BELOW TWO LINES FOR Xinfin
                let wallet_address = await contract.methods.getwalletAddres(email_id).call()
                console.log(wallet_address)

                //COMMENT BELOW TWO LINES FOR ganache
              //  let wallet_address = rec.walletInfo.address;
              //  console.log("email_id", email_id)


                let balance = await contract.methods.balanceOf(wallet_address).call()

                console.log("balance", balance)


                reqBodyObj = {
                    "objJsonData": [{ "email": email_id, "coin": balance, "walletaddres": wallet_address }],
                    "endPoint": "insertOperation1"
                }
                const response = await axios.post(process.env.PRIVATE_API + '/insert', reqBodyObj, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                })

                const p = await updateUserStatus(email_id)


            };


            pendingUser = await getPendingUser();
            console.log("pendingUser", pendingUser)

        }
        catch (e) {
            console.log(e)
            
        }


    }
    console.log("Completed")
    
};
