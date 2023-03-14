const dirIcon = Vue.prototype.$global.board.board_info.dir;
module.exports = function (Blockly) {
  "use strict";

  Blockly.Blocks["remote_xy_begin"] = {
    init: function () {

      this.appendDummyInput()
        .appendField(new Blockly.FieldImage(
          "https://freepngimg.com/thumb/joystick/25115-4-joystick-file.png",
          24,
          24,
          "*"))
        .appendField("RemoteXY : Setup");
      this.appendDummyInput()
        .setAlign(Blockly.ALIGN_LEFT)
        .appendField("Wifi : AP Mode")
      this.appendDummyInput()
        .setAlign(Blockly.ALIGN_LEFT)
        .appendField("USERNAME")
        .appendField(new Blockly.FieldTextInput("EasyKids_Controller"), "USERNAME");
      this.appendDummyInput()
        .setAlign(Blockly.ALIGN_LEFT)
        .appendField("PASSWORD")
        .appendField(new Blockly.FieldTextInput("12345678"), "PASSWORD");
      this.appendDummyInput()
        .setAlign(Blockly.ALIGN_LEFT)
        .appendField("PORT")
        .appendField(new Blockly.FieldTextInput("6377"), "PORT");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(30);
      this.setTooltip("");
      this.setHelpUrl("");
    }
  };

	Blockly.Blocks['remote_xy_get'] = {
		init: function () {
			this.appendDummyInput()
				.appendField("Read Data")
				.appendField(new Blockly.FieldDropdown([
					["botton_1", "1"],
					["botton_2", "2"],
					["rgb_red", "3"],
					["rgb_green", "4"],
					["rgb_blue", "5"],
					["Joy2_x", "6"],
          ["Joy2_y", "7"],
					["Joy1_x", "8"],
					["Joy1_y", "9"],
				]), 'OUTPUT')
				.appendField("");

			this.setOutput(true, "Number");
			this.setInputsInline(true);
			this.setPreviousStatement(null);
			this.setNextStatement(null);
			this.setColour(350);
			this.setTooltip("");
			this.setHelpUrl("");
		}
	};

  Blockly.Blocks['remote_xy_robot_run'] = {
    init: function () {
      this.appendDummyInput()
        .appendField("RemoteXY: Robot Control");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(210);
      this.setTooltip("");
      this.setHelpUrl("");
    }
  };
  Blockly.Blocks['remote_xy_run'] = {
    init: function () {
      this.appendDummyInput()
        .appendField("RemoteXY: App Control");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(190);
      this.setTooltip("");
      this.setHelpUrl("");
    }
  };


};