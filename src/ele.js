const crypto = require('crypto');
const moment = require('moment');

module.exports = function(context) {
  const user = context.request.getEnvironmentVariable('ELEMENTAL_user');
  const key = context.request.getEnvironmentVariable('ELEMENTAL_key');
  const expire_seconds = parseInt(context.request.getEnvironmentVariable('ELEMENTAL_secs'));
  const url = context.request.getUrl()
  console.log('requested url: ' + url);

  

  /*
  *  When authentication is enabled on the Elemental Live system, additional information must be sent with the REST command in order to properly authenticate the request. The following additional headers must be set: X-Auth-User, X-Auth-Expires, X-Auth-Key.
  *  The X-Auth-User header contains the login of the user to authenticate.
  *  The X-Auth-Expires header contains the Unix timestamp (in UTC) that indicates the time after which the server will no longer accept the request as valid. For security purposes, Elemental recommends that this value should be ~30 seconds in the future.
  *  The X-Auth-Key header should be constructed using the following algorithm:
  */

  var t = moment().add(expire_seconds, 'seconds').milliseconds(0)
  var expire = t.valueOf()
  let md51 = crypto.createHash('md5');
  let md52 = crypto.createHash('md5');
  const xurl = new URL(url).pathname.replace(/api\//, '');
  console.log('adapted url: ' + xurl);

  //  seguo le indicazioni di Elemental
  //
  //  md5('1acpJN7oEDn3BDDYhQ' + md5('/live_events/1'+'admin'+'1acpJN7oEDn3BDDYhQ'+'1306886400'))
  //  => md5('1acpJN7oEDn3BDDYhQ' + md5('/live_events/1admin1acpJN7oEDn3BDDYhQ1306886400'))
  //  => '180c88df8d0d4182385f6eb7e7045a42'
  md51.update(String(xurl) + String(user) + String(key) + String(expire))
  md52.update(String(key) + String(md51.digest("hex")));
  //
  //  creo un array dove metto entrambi i valori
  //  poi con la variabile obj selezioni quale prendere   
  //  
  console.log('added header: Content-Type');
  console.log('added header: Accept');
  console.log('added header: X-Auth-User');
  console.log('added header: X-Auth-Expires');
  console.log('added header: X-Auth-key');
  context.request.setHeader('Content-Type', 'application/xml');
  context.request.setHeader('Accept','application/xml');
  context.request.setHeader('X-Auth-User', user);
  context.request.setHeader('X-Auth-Expires', expire);
  context.request.setHeader('X-Auth-key', md52.digest('hex'));



  console.log()

};
