const Tx = require('ethereumjs-tx')

const Web3 = require('web3')

const web3 = new Web3('https://ropsten.infura.io/v3/3811bd537b294d8596d76d426a076dbc')

const account1 = '0x7791Fd3721dCB2799fa49241b344296279A9B006' 

//const account2 = '' // Your account address 2

const privateKey1 = Buffer.from('225e7f2e634ee8940bc0e8c3b5cb28c3855b8a6f880f201ce3be8257cd6c6e0e', 'hex')
//const privateKey2 = Buffer.from('YOUR_PRIVATE_KEY_2', 'hex')

// Deploy the contract
web3.eth.getTransactionCount(account1, (err, txCount) => {
  const data = '60806040523480156100115760006000fd5b50610017565b6092806100256000396000f3fe608060405234801560105760006000fd5b5060043610602c5760003560e01c8063f8a8fd6d14603257602c565b60006000fd5b6038604e565b6040518082815260200191505060405180910390f35b600061053990506059565b9056fea26469706673582212209fe4e0312f15d9cce248cf8709277b387f86c1c53fd7fb247008e426485c5d4e64736f6c63430006060033'                                                                                                                                    
                                                                                                                                                                                                                              
  const txObject = {
    nonce:    web3.utils.toHex(txCount),
    gasLimit: web3.utils.toHex(5000000), // Raise the gas limit to a much higher amount
    gasPrice: web3.utils.toHex(web3.utils.toWei('50', 'gwei')),
    data: data
  }



  const tx = new Tx(txObject)
  tx.sign(privateKey1)

  const serializedTx = tx.serialize()
  const raw = '0x' + serializedTx.toString('hex')

   web3.eth.sendSignedTransaction(raw, (err, txHash) => {
   console.log('err:', err, 'txHash:', txHash)
    // Use this txHash to find the contract on Etherscan!
  })
})


