exports.id=0,exports.modules={"./src/server/server.js":function(e,n,t){"use strict";t.r(n);var r=t("./build/contracts/FlightSuretyApp.json"),o=t("./src/server/config.json"),s=t("web3"),i=t.n(s),a=t("express"),l=t.n(a);function c(e,n,t,r,o,s,i){try{var a=e[s](i),l=a.value}catch(e){return void t(e)}a.done?n(l):Promise.resolve(l).then(r,o)}var u=t("bignumber.js"),g=o.localhost,f=new i.a(new i.a.providers.WebsocketProvider(g.url.replace("http","ws")));f.eth.defaultAccount=f.eth.accounts[0];var h=new f.eth.Contract(r.abi,g.appAddress),d={};f.eth.defaultAccount=f.eth.accounts[0];var p=new(t("sqlite3").verbose().Database)(":memory:",(function(e){if(e)return console.error(e.message);console.log("Connected to the in-memory SQlite database."),p.run("CREATE TABLE flight (flightKey INTEGER PRIMARY KEY, status INTEGER NOT NULL)")}));h.events.eventRegisterFlight({fromBlock:0},(function(e,n){if(e)console.log(e);else{console.log(n);n.returnValues.flightKey;p.run("INSERT INTO flight ("+flightKen+" , 0)")}})),h.events.eventApprovedAirline({fromBlock:0},function(){var e,n=(e=regeneratorRuntime.mark((function e(n,t){var r,o,s;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!n){e.next=4;break}console.log(n),e.next=13;break;case 4:return console.log(t),r=t.returnValues.index,o=t.returnValues.airline,e.t0=u,e.next=10,h.methods.getRegistrationFee().call();case 10:e.t1=e.sent,s=(0,e.t0)(e.t1).toString(),h.methods.registerOracle().send({from:o,value:s,gas:4e6}).then((function(e){h.methods.getMyIndexes().call({from:o}).then((function(e){d[o]=r,console.log("Oracle registered: "+o+" indices:"+r)}))})).catch((function(e){console.log("Error while registering oracles: "+o+" Error: "+e)}));case 13:case"end":return e.stop()}}),e)})),function(){var n=this,t=arguments;return new Promise((function(r,o){var s=e.apply(n,t);function i(e){c(s,r,o,i,a,"next",e)}function a(e){c(s,r,o,i,a,"throw",e)}i(void 0)}))});return function(e,t){return n.apply(this,arguments)}}()),getRandomIndex(airlineAccount),airlineAccount,h.events.eventUpdateFlightStatus({fromBlock:0},(function(e,n){var t;e?console.log(e):function(){console.log(n);var e=n.returnValues.index,r=n.returnValues.airline,o=n.returnValues.flight,s=n.returnValues.timestamp;for(t in d)d[t].includes(e)&&h.methods.submitOracleResponse(e,r,o,s,20).send({from:t,gas:1e6}).then((function(n){console.log("Oracle response sent with statuscode: 20 for "+o+" and index:"+e)})).catch((function(e){console.log("Error while sending Oracle response  for "+o+" Error:"+e)}))}()}));var v=l()();v.get("/api",(function(e,n){n.send({message:"An API for use with your Dapp!"})})),v.get("/api/GetFlightsByPassenger",(function(e,n){console.log(e.query.passenger),n.send({message:"An API for use with your Dapp!"})})),v.get("/api/GetFlightsByAirline",(function(e,n){console.log(e.query.airline),n.send({message:"An API for use with your Dapp!"})})),v.get("/api/GetFlightStatus",(function(e,n){console.log(e.query.airline),console.log(e.query.flight),n.send({message:"An API for use with your Dapp!"})})),n.default=v}};