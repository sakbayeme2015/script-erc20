var Web3 = require('web3'); 

const web3 = new Web3('https://mainnet.infura.io/v3/3811bd537b294d8596d76d426a076dbc'); 

web3.eth.getBlockNumber(function(error, result) {
	console.log(result); 

}) 

async function getBlockNumber() { 
	const latestBlockNumber = await web3.eth.getBlockNumber(); 
	console.log(latestBlockNumber); 
	return (latestBlockNumber); 

} 

getBlockNumber(); 


