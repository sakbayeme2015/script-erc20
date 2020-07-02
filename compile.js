const path = require('path');  //builds a path from the current file.
const fs = require('fs');

//Need the solidity compiler
const solc = require('solc');

//__dirname will get the inbox dir path.
//look in the contracts folder and get a path to the Inbox.sol file.
const myContractPath = path.resolve(__dirname,'contracts','myContract.sol');

//Read in the contents of the file. The raw source code.
const source = fs.readFileSync(myContractPath,'utf8');

//console.log(solc.compile(source,1));
//This will export the compiled file. Make it available
//At the moment only interested in the Inbox contract.
module.exports = solc.compile(source,1).contracts[':MyContract']; 


