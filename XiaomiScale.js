
module.exports = function(RED) {
  function xiaomiScale(config) {
    let MiScale = require('./index.js');
    RED.nodes.createNode(this,config);

    var node = this;
    var msg;


    let miscale = new MiScale();

    miscale.startScanning();

    miscale.on('data', function (scale) {
      console.log(scale);
      node.send(scale)
    });
  }
  RED.nodes.registerType("Xiaomi Scale",xiaomiScale);

};
