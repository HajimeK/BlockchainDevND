"use strict";

/********************* Slack *********************/


// Format a message and post it to the channel
async function postSlackMessage (adata) {
}

/******************** Ethereum Network ********************/
import Product from 'abi/Product.json';
import Config from 'config.json';
import Web3 from 'web3';

const config = Config['localhost'];
const web3 = new Web3(new Web3.providers.WebsocketProvider(config.url.replace('http', 'ws')));
web3.eth.defaultAccount = web3.eth.accounts[0];
const product = new web3.eth.Contract(Product.abi, config.appAddress);
/********************* Cumulocity IoT *********************/

const { Client, FetchClient, BasicAuth } = require("@c8y/client");

const baseUrl = process.env.C8Y_BASEURL;
let cachedUsers = [];

// Get the subscribed users
async function getUsers () {
    const {
        C8Y_BOOTSTRAP_TENANT: tenant,
        C8Y_BOOTSTRAP_USER: user,
        C8Y_BOOTSTRAP_PASSWORD: password
    } = process.env;

    const client = new FetchClient(new BasicAuth({ tenant, user, password }), baseUrl);
    const res = await client.fetch("/application/currentApplication/subscriptions");

    return res.json();
 }


// where the magic happens...
(async () => {

    cachedUsers = (await getUsers()).users;

    if (Array.isArray(cachedUsers) && cachedUsers.length) {
        // List filter for unresolved alarms only
        const filter = {
            pageSize: 100,
            withTotalPages: true,
            resolved: false
        };

        try {
            cachedUsers.forEach(async (user) => {
                // Service user credentials
                let auth = new BasicAuth({
                    user:     user.name,
                    password: user.password,
                    tenant:   user.tenant
                });

                // Platform authentication
                let client = await new Client(auth, baseUrl);

                // Get filtered alarms and post a message to Slack
                let { data } = await client.alarm.list(filter);
                data.forEach((alarm) => {
                    postSlackMessage(alarm);
                });

                // Real time subscription for active alarms
                client.realtime.subscribe("/alarms/*", (alarm) => {
                    if (alarm.data.data.status === "ACTIVE") {
                        postSlackMessage(alarm.data.data);
                    }
                });
            });
            console.log("listening to alarms...");
        }
        catch (err) {
            console.error(err);
        }
    }
    else {
        console.log("[ERROR]: Not subscribed/authorized users found.");
    }

})();