
module.exports = function(RED) {
  function xiaomiScale(config) {
    let MiScale = require('./index.js');
    RED.nodes.createNode(this,config);

    var node = this;
    var msg;
    var showalldata = config.showalldata;

    let miscale = new MiScale();
    node.warn("Xiaomi Scale: Start scanning...")
    miscale.startScanning();
  
    miscale.on('data', function (scale) {
      console.log(scale);
      msg = scale;
      msg.payload  = scale.weight
      if (showalldata) {
        if (scale.isStabilized == false || scale.loadRemoved == false ) {
          return
        }
      }
      node.send(msg)
    });

    // tidy up any state
    this.on('close', function() {
      node.warn("Xiaomi Scale: on close")
      miscale.stopScanning();
      showalldata = "false";
    });

  }
  RED.nodes.registerType("Xiaomi Scale", xiaomiScale);

};
