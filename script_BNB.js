var Web3 = require('web3');

//const Web3HDWalletProvider = require("@truffle/hdwallet-provider");

//const mnemonic = "tide aim canvas snake inherit expect source thunder defense income cinnamon crumble"; 

const ERC20TransferABI = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"withdrawEther","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"burn","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"unfreeze","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"freezeOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"freeze","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[{"name":"initialSupply","type":"uint256"},{"name":"tokenName","type":"string"},{"name":"decimalUnits","type":"uint8"},{"name":"tokenSymbol","type":"string"}],"payable":false,"type":"constructor"},{"payable":true,"type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Freeze","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Unfreeze","type":"event"}]


const OMGADDRESS = "0xB8c77482e45F1F44dE1745F52C74426C631bDD52" // OMG contract address

const senderAddress = "0xbe0eb53f46cd790cd13851d5eff43d12404d33e8"  // OMG sender address 

const receiverAddress = "0x00621a469ac414C93A0e0C8aaf105FD348194bC3"

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545', { timeout: 20000000 }));

//web3.setProvider(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/3811bd537b294d8596d76d426a076dbc")); 

//var provider = new Web3HDWalletProvider(mnemonic, web3);


const expectedBlockTime = 1000; 

const omgToken = new web3.eth.Contract(ERC20TransferABI, OMGADDRESS);

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

(async function () {
    let starting_balance = await omgToken.methods.balanceOf(receiverAddress).call();
    omgToken.methods.transfer(receiverAddress, "1000000000000000000000").send({from: senderAddress}, async function(error, transactonHash) {
        console.log("Submitted transaction with hash: ", transactonHash)
        let transactionReceipt = null
        while (transactionReceipt == null) { // Waiting expectedBlockTime until the transaction is mined
            transactionReceipt = await web3.eth.getTransactionReceipt(transactonHash);
            await sleep(expectedBlockTime)
        }
        console.log("Got the transaction receipt: ", transactionReceipt)
        let final_balance = await omgToken.methods.balanceOf(receiverAddress).call();
        console.log('Starting balance was:', starting_balance);
        console.log('Ending balance is:', final_balance);
    });
 
})(); 


