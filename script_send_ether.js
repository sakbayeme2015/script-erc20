const   Tx = require('ethereumjs-tx') 
const Web3 = require('web3')
const web3 = new Web3('http://localhost:8546')

const account1 = '0x7791Fd3721dCB2799fa49241b344296279A9B006' 
const account2 = '0x00621a469ac414C93A0e0C8aaf105FD348194bC3' 

const privateKey1 = Buffer.from('225e7f2e634ee8940bc0e8c3b5cb28c3855b8a6f880f201ce3be8257cd6c6e0e', 'hex')

web3.eth.getTransactionCount(account1, (err, txCount) => {
  // Build the transaction
  const txObject = {
    nonce:    web3.utils.toHex(txCount),
    to:       account2,
    value:    web3.utils.toHex(web3.utils.toWei('5', 'ether')),
    gasLimit: web3.utils.toHex(21000),
    gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei'))
  }

  // Sign the transaction
  const tx = new Tx(txObject)
  tx.sign(privateKey1)

  const serializedTx = tx.serialize()
  const raw = '0x' + serializedTx.toString('hex')

  // Broadcast the transaction
  web3.eth.sendSignedTransaction(raw, (err, txHash) => {
    console.log('txHash:', txHash)
    // Now go check etherscan to see the transaction!
  })
}) 


