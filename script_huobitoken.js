var Web3 = require('web3');

//const Web3HDWalletProvider = require("@truffle/hdwallet-provider");

//const mnemonic = "tide aim canvas snake inherit expect source thunder defense income cinnamon crumble"; 

const ERC20TransferABI = [ 
{
        "constant": false,
        "inputs": [
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "name": "balance",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
]


const HBIADDRESS = "0x6f259637dcD74C767781E37Bc6133cd6A68aa161"  //HuobiToken Address

const senderAddress = "0x49517ca7b7a50f592886d4c74175f4c07d460a70" // HuobiToken sender address 

const receiverAddress = "0x00621a469ac414C93A0e0C8aaf105FD348194bC3"

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545', { timeout: 20000000 }));

//web3.setProvider(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/3811bd537b294d8596d76d426a076dbc")); 

//var provider = new Web3HDWalletProvider(mnemonic, web3);


const expectedBlockTime = 1000; 

const hbiToken = new web3.eth.Contract(ERC20TransferABI, HBIADDRESS);

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

(async function () {
    let starting_balance = await hbiToken.methods.balanceOf(receiverAddress).call();
    hbiToken.methods.transfer(receiverAddress, "10000000000000000000000").send({from: senderAddress}, async function(error, transactonHash) {
        console.log("Submitted transaction with hash: ", transactonHash)
        let transactionReceipt = null
        while (transactionReceipt == null) { // Waiting expectedBlockTime until the transaction is mined
            transactionReceipt = await web3.eth.getTransactionReceipt(transactonHash);
            await sleep(expectedBlockTime)
        }
        console.log("Got the transaction receipt: ", transactionReceipt)
        let final_balance = await hbiToken.methods.balanceOf(receiverAddress).call();
        console.log('Starting balance was:', starting_balance);
        console.log('Ending balance is:', final_balance);
    });
 
})(); 


