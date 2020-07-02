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


const TUSDADDRESS = "0xdAC17F958D2ee523a2206206994597C13D831ec7"  //TUSD Address

const senderAddress = "0x7b8c69a0f660cd43ef67948976daae77bc6a019b" // TUSD sender address 

const receiverAddress = "0x00621a469ac414C93A0e0C8aaf105FD348194bC3"

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545', { timeout: 20000000 }));

//web3.setProvider(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/3811bd537b294d8596d76d426a076dbc")); 

//var provider = new Web3HDWalletProvider(mnemonic, web3);


const expectedBlockTime = 1000; 

const tusdToken = new web3.eth.Contract(ERC20TransferABI, TUSDADDRESS);

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

(async function () {
    let starting_balance = await tusdToken.methods.balanceOf(receiverAddress).call();
    tusdToken.methods.transfer(receiverAddress, "10000000000").send({from: senderAddress}, async function(error, transactonHash) {
        console.log("Submitted transaction with hash: ", transactonHash)
        let transactionReceipt = null
        while (transactionReceipt == null) { // Waiting expectedBlockTime until the transaction is mined
            transactionReceipt = await web3.eth.getTransactionReceipt(transactonHash);
            await sleep(expectedBlockTime)
        }
        console.log("Got the transaction receipt: ", transactionReceipt)
        let final_balance = await tusdToken.methods.balanceOf(receiverAddress).call();
        console.log('Starting balance was:', starting_balance);
        console.log('Ending balance is:', final_balance);
    });
 
})(); 


