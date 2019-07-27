var Web3 = require('web3');
web3 = new Web3('http://127.0.0.1:7545');
// web3.eth.getAccounts().then(accounts => console.log(accounts));
web3.eth.getAccounts().then(console.log);

var sendingAddress = '0xfeB2a62eC0d6C3a2dbEd722c53B6B5049BC66313'

// -- Step 3: Check the balances of each address
web3.eth.getBalance(sendingAddress).then(console.log)

web3.eth.getTransactionCount(sendingAddress).then(console.log)
