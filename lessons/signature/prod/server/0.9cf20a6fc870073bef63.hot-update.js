exports.id=0,exports.modules={"./src/server.js":function(o,e,l){"use strict";l.r(e);var s=l("./build/contracts/Verifier.json"),r=l("./src/config.json"),t=l("web3"),c=l.n(t);let n=r.localhost;console.log(n);let i=new c.a(new c.a.providers.HttpProvider(n.url)),g=new i.eth.Contract(s.abi,n.appAddress);console.log(g);let a=i.eth.accounts[0],d="Hello, signature";for(var u="",p=0;p<d.length;p++)u+=""+d.charCodeAt(p).toString(16);console.log(a),console.log(u);let v=i.eth.sign(a,"0x"+u);console.log(v);const h="0x"+(v=v.substr(2)).slice(0,64),x="0x"+v.slice(64,128),f="0x"+v.slice(128,130);console.log("Elliptic Curve "),console.log(h),console.log(x),console.log(f),console.log(g.recoverAddr(v,f,h,x)),e.default=app}};