
module.exports = function(RED) {
  function xiaomiScale(config) {
    let MiScale = require('./index.js');
    RED.nodes.createNode(this,config);

    var node = this;
    var msg;
    var showalldata = config.showalldata;

    node.warn("create new miscale")
    let miscale = new MiScale();

    node.warn("start scanning")
    miscale.startScanning();

  
    miscale.on('data', function (scale) {
      console.log(scale);
      msg = scale;
      msg.payload  = scale.weight
      // node.warn(showalldata)
      if (showalldata) {
        if(scale.isStabilized == false || scale.loadRemoved == false ) {
          return
        }
      }
      node.send(msg)
    });

    this.on('close', function() {
    // tidy up any state
    node.warn("on close")
    node.warn("stop scanning")
    miscale.stopScanning();
    showalldata = "false";

   
    });

  }
  RED.nodes.registerType("Xiaomi Scale",xiaomiScale);

};
