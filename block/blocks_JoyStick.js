module.exports = function(Blockly){
  'use strict';
  // =============================================================================
  // EasyKidsRobotics
  // =============================================================================

Blockly.Blocks['Robot_Setup'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("ESP-NOW Robot Control ")
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(100);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Blocks['Read_Mac_Address'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("ESP-NOW Read MAC Address")
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(200);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['JoyStick_Setup'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("ESP-NOW JoyStick Control");
    this.appendValueInput("text")
        .setCheck("String")
    this.appendDummyInput()
        .appendField("Robot MAC Address");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(250);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
}