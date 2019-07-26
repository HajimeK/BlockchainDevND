/*##########################
CONFIGURATION
##########################*/

// -- Step 1: Set up the appropriate configuration
//var Web3 = require('web3');
//web3 = new Web3('http://127.0.0.1:7545');
var Web3 = require('web3')
const EthereumTransaction = require('ethereumjs-tx').Transaction
web3 = new Web3('HTTP://127.0.0.1:7545')

// -- Step 2: Set the sending and receiving addresses for the transaction.
var sendingAddress = '0xfeB2a62eC0d6C3a2dbEd722c53B6B5049BC66313'
var receivingAddress = '0x84223511Db0d804DAcE7a58AF1cEC444A698D4B7'

// -- Step 3: Check the balances of each address
web3.eth.getBalance(sendingAddress).then(console.log)
web3.eth.getBalance(receivingAddress).then(console.log)

/*##########################
CREATE A TRANSACTION
##########################*/

// -- Step 4: Set up the transaction using the transaction variables as shown
var rawTransaction = { nonce: 0, to: receivingAddress, gasPrice: 20000000, gasLimit: 30000, value: 1, data: "" }

// -- Step 5: View the raw transaction
rawTransaction

// -- Step 6: Check the new account balances (they should be the same)
web3.eth.getBalance(sendingAddress).then(console.log)
web3.eth.getBalance(receivingAddress).then(console.log)

// Note: They haven't changed because they need to be signed...

/*##########################
Sign the Transaction
##########################*/
// -- Step 7: Sign the transaction with the Hex value of the private key of the sender
var transaction = new EthereumTransaction(rawTransaction)
var privateKeySender = 'ed81d21e99a3689473b68dc5bb6f008fe6194da7533c9c1267388bf78cd91c9f'
var privateKeySenderHex = new Buffer(privateKeySender, 'hex')
transaction.sign(privateKeySenderHex)

/*#########################################
Send the transaction to the network
#########################################*/
// -- Step 8: Send the serialized signed transaction to the Ethereum network.
var serializedTransaction = transaction.serialize();
web3.eth.sendSignedTransaction(serializedTransaction);

//web3.eth.getBalance(sender).then(console.log)
//web3.eth.getBalance(receiver).then(console.log)
web3.eth.getBalance(sendingAddress).then(console.log)
web3.eth.getBalance(receivingAddress).then(console.log)
