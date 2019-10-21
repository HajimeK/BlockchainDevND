import React from 'react';
import ReactDOM from 'react-dom';
import { Drizzle, generateStore } from 'drizzle';

import './index.css';
import App from './App.jsx';
import * as serviceWorker from './serviceWorker';

// import drizzle functions and contract artifact

import store from './middleware';
import options from "./drizzleOptions";

// let drizzle know what contracts we want and how to access our test blockchain
// const options = {
//     contracts: [Contract],
//     web3: {
//         fallback: {
//             type: "ws",
//             url: "ws://127.0.0.1:8545",
//         },
//     }
// };

// setup drizzle
const drizzle = new Drizzle(options);

ReactDOM.render(
    <App store={store} drizzle={drizzle} />,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
