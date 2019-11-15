import Verifier from '../build/contracts/Verifier.json';
import Config from './config.json';
import Web3 from 'web3';

import express from 'express';
import { toHex } from 'web3-utils';

let config = Config['localhost'];
console.log(config);
let web3 = new Web3(new Web3.providers.HttpProvider(config.url));
let verifier = new web3.eth.Contract(Verifier.abi, config.appAddress);
let msg = 'Hello, signature';
let hash = web3.utils.sha3(msg);

console.log("message: " + msg);
console.log("message hash: " + hash);


web3.eth.getAccounts(async (error, accounts) => {
  let signature = await web3.eth.sign(hash, accounts[0]);
  console.log("account: " + accounts[0]);
  signature = signature.substr(2); //remove 0x
  const r = '0x' + signature.slice(0, 64);
  const s = '0x' + signature.slice(64, 128);
  let v = '0x' + signature.slice(128, 130);
  if (v == '0x00') {
    v = '0x1b';
  } else if (v1 == '0x01') {
    v = '0x1c';
  }

console.log("Signature");
console.log("r: " + r);
console.log("s: " + s);
console.log("v: " + v);
const v_decimal = web3.utils.toDecimal(v);
console.log("v_decimal: " + v_decimal);
let a = await verifier.methods.recoverAddr(hash, v, r, s).send({
  from: accounts[0],
  gas: 4712388,
  gasPrice: 100000000000
});
console.log(a);
});


const app = express();
app.get('/api', (req, res) => {
  res.send({
    message: 'An API for use with your Dapp!'
  })
})

export default app;