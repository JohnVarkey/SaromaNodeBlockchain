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



const init = async () => {

    web3 = new Web3(new Web3.providers.HttpProvider(process.env.IP));
    let id = await web3.eth.net.getId();
    let contractJSON = require("./build/contracts/MainPagebc.json");
    let contractJSON1 = require("./build/contracts/Billingbc.json");
    let contractJSON2 = require("./build/contracts/Userbc.json");
    let deployedNetwork = contractJSON.networks[id];
    contract = new web3.eth.Contract(contractJSON.abi, deployedNetwork.address);
    contract1 = new web3.eth.Contract(contractJSON1.abi, deployedNetwork.address);
    contract2 = new web3.eth.Contract(contractJSON2.abi, deployedNetwork.address);

}

init();

app.get('/', (req, res) => {
    res.send("connected")
})


//mainpage
app.post("/createUserMainPage", async (req, res) => {
    try {
        console.log(req.body)
        
        let productid = req.body.productid
        let name = req.body.name
        let price = req.body.price
        let farmer_id = req.body.farmer_id
        

        //const gas= null 
        // gas =await contractABI.methods.createNewUser("0x88DE49ECf0c5da1dCADd8c24D2F4c4a71ee0c19B","2","3","4","5","6").estimateGas({from: wallet_address})

        //console.log(gas)

        let contractABI = await contract.methods.createNewUser(productid, name, price, farmer_id).encodeABI();

        let signTx = await web3.eth.accounts.signTransaction({
            to: process.env.CONTRACT_ADDRESS,
            gas: 1000000,
            data: contractABI,
        }, process.env.CONTRACT_OWNER_PRI_KEY)

        let resp = await web3.eth.sendSignedTransaction(signTx.rawTransaction)

              console.log(resp);


        res.status(200).send("inserted");

    }
    catch (err) {
        console.log(err);
        res.send("Failed");

    }
}
)

app.post("/getUserMainPage", async (req, res) => {
    try {
        console.log("getmyuser", req.body.productid)
        let productid = req.body.productid;
        let user = await contract.methods.buys(productid).call()
        console.log(user)
        
         res.status(200).json(user);

    }
    catch (e) {
        console.log(e)
        res.send("err")
    }
});


//billing
app.post("/createUserBilling", async (req, res) => {
    try {
        console.log(req.body)
        
        let name = req.body.name
        let mobileno = req.body.mobileno
        let houseno = req.body.houseno
       
        

        //const gas= null 
        // gas =await contractABI.methods.createNewUser("0x88DE49ECf0c5da1dCADd8c24D2F4c4a71ee0c19B","2","3","4","5","6").estimateGas({from: wallet_address})

        //console.log(gas)

        let contractABI = await contract1.methods.createNewUser(name,mobileno, houseno).encodeABI();

        let signTx = await web3.eth.accounts.signTransaction({
            to: process.env.CONTRACT_ADDRESS1,
            gas: 1000000,
            data: contractABI,
        }, process.env.CONTRACT_OWNER_PRI_KEY)

        let resp = await web3.eth.sendSignedTransaction(signTx.rawTransaction)

              console.log(resp);


        res.status(200).send("inserted");

    }
    catch (err) {
        console.log(err);
        res.send("Failed");

    }
}
)

app.post("/getUserBilling", async (req, res) => {
    try {
        console.log("getmyuser", req.body.mobileno)
        let mobileno = req.body.mobileno;
        let user = await contract1.methods.bills(mobileno).call()
        console.log(user)
        
         res.status(200).json(user);

    }
    catch (e) {
        console.log(e)
        res.send("err")
    }
});


app.listen(process.env.SERVER_PORT, () => {
    console.log("Server at", process.env.SERVER_PORT);
})



//USER
app.post("/createUserUser", async (req, res) => {
    try {
        console.log(req.body)
        
        let user_id = req.body.user_id
        let hashValue = req.body.hashValue
        let datetime = req.body.datetime
       
        

        //const gas= null 
        // gas =await contractABI.methods.createNewUser("0x88DE49ECf0c5da1dCADd8c24D2F4c4a71ee0c19B","2","3","4","5","6").estimateGas({from: wallet_address})

        //console.log(gas)

        let contractABI = await contract2.methods.createNewUser(user_id,hashValue, datetime).encodeABI();

        let signTx = await web3.eth.accounts.signTransaction({
            to: process.env.CONTRACT_ADDRESS2,
            gas: 1000000,
            data: contractABI,
        }, process.env.CONTRACT_OWNER_PRI_KEY)

        let resp = await web3.eth.sendSignedTransaction(signTx.rawTransaction)

              console.log(resp);


        res.status(200).send("inserted");

    }
    catch (err) {
        console.log(err);
        res.send("Failed");

    }
}
)

app.post("/getUserUser", async (req, res) => {
    try {
        console.log("getmyuser", req.body.mobileno)
        let mobileno = req.body.mobileno;
        let user = await contract1.methods.users(user_id).call()
        console.log(user)
        
         res.status(200).json(user);

    }
    catch (e) {
        console.log(e)
        res.send("err")
    }
});


app.listen(process.env.SERVER_PORT, () => {
    console.log("Server at", process.env.SERVER_PORT);
})
