exports.id=0,exports.modules={"./src/server.js":function(o,e,r){"use strict";r.r(e);var s=r("./build/contracts/Verifier.json"),t=r("./src/config.json"),l=r("web3"),n=r.n(l);let c=t.localhost,i=new n.a(new n.a.providers.HttpProvider(c.url)),a=new i.eth.Contract(s.abi,c.appAddress),u=i.eth.accounts[0];let d=i.eth.sign(u,"0x"+function(o){for(var e="",r=0;r<o.length;r++)e+=""+o.charCodeAt(r).toString(16);return e}("Hello, signature"));console.log(d);const g="0x"+(d=d.substr(2)).slice(0,64),p="0x"+d.slice(64,128),v="0x"+d.slice(128,130);console.log("Elliptic Curve "),console.log(g),console.log(p),console.log(v),console.log(a.recoverAddr(d,v,g,p)),e.default=app}};