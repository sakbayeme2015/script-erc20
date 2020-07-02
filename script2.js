var Web3 = require('web3');

const ERC20TransferABI = require('./abi/dai');  


const DAIADDRESS = "0x6b175474e89094c44da98b954eedeac495271d0f" 

const web3 = new Web3("http://localhost:8545");

const daiToken = new web3.eth.Contract(ERC20TransferABI, DAIADDRESS);

const senderAddress = "0x9eb7f2591ed42dee9315b6e2aaf21ba85ea69f8c" 

const receiverAddress = "0x00621a469ac414C93A0e0C8aaf105FD348194bC3"


daiToken.methods.balanceOf(senderAddress).call(function(err, res) {
    if (err) {
        console.log("An error occured", err);
        return
    }
    console.log("The balance is: ",res)
}) 


daiToken.methods.transfer(receiverAddress, "100000000000000000000").send({from: senderAddress}, function(err, res) {
    if (err) {
        console.log("An error occured", err);
        return
    }
    console.log("Hash of the transaction: " + res)
}) 






