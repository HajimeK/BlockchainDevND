exports.id=0,exports.modules={"./src/server.js":function(o,e,s){"use strict";s.r(e);var l=s("./build/contracts/Verifier.json"),t=s("./src/config.json"),n=s("web3"),r=s.n(n),c=s("express"),i=s.n(c),a=s("web3-utils");let g=t.localhost;console.log(g);let u=new r.a(new r.a.providers.HttpProvider(g.url)),d=new u.eth.Contract(l.abi,g.appAddress),p="Hello, signature";console.log(p),console.log(Object(a.toHex)(p)),u.eth.getAccounts(async(o,e)=>{let s=await u.eth.sign("0x"+function(o){for(var e="",s=0;s<p.length;s++)e+=""+p.charCodeAt(s).toString(16);return e}(),e[0]);console.log(s);const l="0x"+(s=s.substr(2)).slice(0,64),t="0x"+s.slice(64,128),n="0x"+s.slice(128,130);console.log("Elliptic Curve "),console.log(u.utils.fromAscii(s)),console.log(l),console.log(t),console.log(n),console.log(d.methods.recoverAddr(s,n,l,t).call())});const f=i()();f.get("/api",(o,e)=>{e.send({message:"An API for use with your Dapp!"})}),e.default=f}};