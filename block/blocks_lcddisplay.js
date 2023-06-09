const app = require("electron").remote;
const nativeImage = require("electron").nativeImage;
const dialog = app.dialog;

function floyd_steinberg(imageData, w) {
  var imageDataLength = imageData.length;
  var lumR = [],
    lumG = [],
    lumB = [];
  var newPixel, err;
  for (var i = 0; i < 256; i++) {
    lumR[i] = i * 0.299;
    lumG[i] = i * 0.587;
    lumB[i] = i * 0.110;
  }
  // Greyscale luminance (sets r pixels to luminance of rgb)
  for (var i = 0; i <= imageDataLength; i += 4) {
    imageData[i] = Math.floor(lumR[imageData[i]] + lumG[imageData[i + 1]] +
      lumB[imageData[i + 2]]);
  }
  for (var currentPixel = 0; currentPixel <=
    imageDataLength; currentPixel += 4) {
    // threshold for determining current pixel's conversion to a black or white pixel
    newPixel = imageData[currentPixel] < 150
      ? 0
      : 255;
    err = Math.floor((imageData[currentPixel] - newPixel) / 23);
    imageData[currentPixel + 0 * 1 - 0] = newPixel;
    imageData[currentPixel + 4 * 1 - 0] += err * 7;
    imageData[currentPixel + 4 * w - 4] += err * 3;
    imageData[currentPixel + 4 * w - 0] += err * 5;
    imageData[currentPixel + 4 * w + 4] += err * 1;
    // Set g and b values equal to r (effectively greyscales the image fully)
    imageData[currentPixel + 1] = imageData[currentPixel +
      2] = imageData[currentPixel];
  }
  return imageData;
}

module.exports = function (Blockly) {
  "use strict";

    Blockly.Blocks["tft_display_setcolorText"] = {
      init: function () {
        this.appendDummyInput()
          // .appendField(new Blockly.FieldImage("https://www.flaticon.com/premium-icon/icons/svg/1163/1163412.svg", 20, 20, "*"))
          .appendField("display SetcolorText:")
          .appendField(new Blockly.FieldColour("#FF0000"), "COLOR");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(360);
        this.setTooltip("");
        this.setHelpUrl("");
      }
    };

    Blockly.Blocks["tft_display_setcolorBg"] = {
      init: function () {
        this.appendDummyInput()
          // .appendField(new Blockly.FieldImage("https://www.flaticon.com/premium-icon/icons/svg/1163/1163412.svg", 20, 20, "*"))
          .appendField("display SetcolorBackground:")
          .appendField(new Blockly.FieldColour("#000000"), "COLOR");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(360);
        this.setTooltip("");
        this.setHelpUrl("");
      }
    };


    Blockly.Blocks["i2c128x64_create_image"] = {
      init: function () {
        this.appendDummyInput()
          .appendField("create image from PNG file");
        this.appendDummyInput()
          .appendField(new Blockly.FieldImage(
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAABACAIAAABdtOgoAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAJ/SURBVHhe7ZbbdQIxDES3LgraeqiGZiiG2JLWHhmbx08Gkrk/kWU9GR/IdhNUJAAZCUBGApCRAGQkABkJQEYCkJEAZCQAGQlARgKQkQBkJAAZCUBGApCRAGQkABkJQEYCkJEAZCQAGQlARgKQkQBkJACZFwW47Nu2nc7XOP4ZbK9tv8SRgASQAP+bhQDX86k+jYo9jxDgbA+mAG/GH5GDEs393dtLQLNRZL9qTnwHs/oeHpUh18xjfHzvkBAxF/NUirf16DnQts+KsxTiwos7PXZgKkDesxrRweZw20dCGxZe+aHw9bzH33obC9p92A4WhfRF/VTszj+UrkBCxKT4sVfxm+s+8a492pO9GjMB+p6N5OqHHOk96/Ghv18U0pzTSWfdVvVTte5GMwMJKSYVyt2CPAymQbW2iUW3EzIRYMg10gztkGaGi5X/MB3rAOfGMGiqalWW9dPoEJX8CFykoikBxh/m7cUH65W9nKUA0TDAGeCQ3DD1yn/QW+TIORaznU5tu2X91Kk3mUwQwAWEDwmtG3r7CO4NjqFe2cuYfQWlUeA3YFIc/fPx0F+s8PV7s45VF7QVI/tJX7fd9CAMScCFm5OavZl5PcKrD04EJnnI9Ef4GKAC/Y4u6dAjC9Bv7gdvj/VZG5OhIw3XXPVtxeIfGsvx4GVhu3AzWqQE2LePuu/FHJ1Ga/N8r8JCgE8DPoNPI422VHrJdwjgb+mdvX6N/JG/P+g3COA7fubnX8lfNW+O+SVfQX8XCUBGApCRAGQkABkJQEYCkJEAZCQAGQlARgKQkQBkJAAZCUBGApCRAGQkABkJQEYCkJEAZCQAGQlARgKQkQBkJACV2+0HImEfdtax+UEAAAAASUVORK5CYII=",
            240,
            240,
            "click to upload",
            function (e) {
              let myself = this;
              let id = this.sourceBlock_.id.toUpperCase();
              const dialogOptions = {
                filters: [{ name: "Images PNG", extensions: ["png"] }],
                properties: ["openFile"]
              };
              dialog.showOpenDialog(dialogOptions, imageFileName => {
                console.log(imageFileName);
                if (imageFileName != undefined) {
                  imageFileName = imageFileName[0];
                  //--- resize image ---//
                  let image = nativeImage.createFromPath(imageFileName);
                  let size = image.getSize();
                  if (size.width > 240) {
                    image = image.resize({ width: 240 });
                    size = image.getSize();
                  }
                  if (size.height > 240) {
                    image = image.resize({ height: 240 });
                    size = image.getSize();
                  }
                  var buff = image.getBitmap();
                  //---- dithering image ----//
                  //floyd_steinberg(buff,size.width);
                  //---- display image ----//
                  myself.sourceBlock_.inputList[2].fieldRow[0].setValue(`image size ${size.width} x ${size.height}`);
                  myself.sourceBlock_.inputList[2].fieldRow[0].init();
                  myself.setValue(image.toDataURL());
                  myself.init();
                }
              });
            },
            true));
        this.appendDummyInput().appendField("image size 240 x 240");

        this.setOutput(true, "std::vector<uint16_t>");
        this.setColour(230);
        this.setTooltip(
          "create image from PNG file (for best quality result please use size within 160x80 pixel otherwise, it'll resize)");
        this.setHelpUrl("");
      }
    };

    Blockly.Blocks["i2c128x64_display_image"] = {
      init: function () {
        this.appendValueInput("img")
          // .appendField(new Blockly.FieldImage("https://www.flaticon.com/premium-icon/icons/svg/1163/1163412.svg", 20, 20, "*"))
          .setCheck("std::vector<uint16_t>")
          .appendField("draw image");
        this.appendValueInput("x")
          .setCheck("Number")
          .appendField(" at (X");
        this.appendValueInput("y")
          .setCheck("Number")
          .appendField(",Y");
        this.appendValueInput("width")
          .setCheck("Number")
          .appendField(") width");
        this.appendValueInput("height")
          .setCheck("Number")
          .appendField("height");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("display image to display");
        this.setHelpUrl("");
      }
    };

    Blockly.Blocks["i2c128x64_display_clear"] = {
      init: function () {
        this.appendDummyInput()
          // .appendField(new Blockly.FieldImage("https://www.flaticon.com/premium-icon/icons/svg/1163/1163412.svg", 20, 20, "*"))
          .appendField("clear display");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("clear display");
        this.setHelpUrl("");
      }
    };

    Blockly.Blocks["i2c128x64_display_display"] = {
      init: function () {
        this.appendDummyInput()
          // .appendField(new Blockly.FieldImage("https://www.flaticon.com/premium-icon/icons/svg/1163/1163412.svg", 20, 20, "*"))
          .appendField("display");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("display everything to screen");
        this.setHelpUrl("");
      }
    };

    // ######################################################################
    Blockly.Blocks["tft_display_setRotation"] = {
      init: function () {
        this.appendDummyInput()
          // .appendField(new Blockly.FieldImage("https://www.flaticon.com/premium-icon/icons/svg/1163/1163412.svg", 20, 20, "*"))
          .appendField("display setRotation")
          .appendField(new Blockly.FieldDropdown([
            ["Normal", "0"],
            ["Rotate 90°", "1"],
            ["Rotate 180°", "2"],
            ["Rotate 360°", "3"]
          ]),
            "rotation");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
      }
    };

    Blockly.Blocks["tft_display_fillScreen"] = {
      init: function () {
        this.appendDummyInput()
          // .appendField(new Blockly.FieldImage("https://www.flaticon.com/premium-icon/icons/svg/1163/1163412.svg", 20, 20, "*"))
          .appendField("display fillScreen:")
          .appendField(new Blockly.FieldColour("#FFFFFF"), "COLOR");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
      }
    };

	Blockly.Blocks['basic_TFT_setFonts'] = {
		init: function () {
			this.appendDummyInput()
				.appendField("TFT Fonts:")
				.appendField(new Blockly.FieldDropdown([
					["Kanit-Regular-9", "R_09"],
					["Kanit-Regular-12", "R_12"],
					["Kanit-Regular-18", "R_18"],
					["Kanit-Regular-24", "R_24"],
					["Kanit-Bold-9", "B_09"],
					["Kanit-Bold-12", "B_12"],
					["Kanit-Bold-18", "B_18"],
					["Kanit-Bold-24", "B_24"],
					["Kanit-Bold Italic-9", "BI_09"],
					["Kanit-Bold Italic-12", "BI_12"],
					["Kanit-Bold Italic-18", "BI_18"],
					["Kanit-Bold Italic-24", "BI_24"],
					["Kanit-Italic-9", "I_09"],
					["Kanit-Italic-12", "I_12"],
					["Kanit-Italic-18", "I_18"],
					["Kanit-Italic-24", "I_24"]
        ]),	"sText");
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(160);
			this.setTooltip("");
			this.setHelpUrl("");
		}
	};
	
    Blockly.Blocks["tft_display_setTextSize"] = {
      init: function () {
        this.appendDummyInput()
          // .appendField(new Blockly.FieldImage("https://www.flaticon.com/premium-icon/icons/svg/1163/1163412.svg", 20, 20, "*"))
          .appendField("set Text Size")
          .appendField(new Blockly.FieldDropdown([
            ["1", "1"],
            ["2", "2"],
            ["3", "3"],
            ["4", "4"],
            ["5", "5"],
            ["6", "6"],
            ["7", "7"]
          ]),
            "textSize");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
      }
    };

    Blockly.Blocks["tft_display_print"] = {
      init: function () {
        this.appendValueInput("TEXT")
          // .appendField(new Blockly.FieldImage("https://www.flaticon.com/premium-icon/icons/svg/1163/1163412.svg", 20, 20, "*"))
          //.setCheck("String")
          .appendField("display text");
        this.appendValueInput("X")
          .setCheck("Number")
          .appendField("at (X");
        this.appendValueInput("Y")
          .setCheck("Number")
          .appendField(", Y");
        this.appendDummyInput()
          .appendField(") set Text Size")
          .appendField(new Blockly.FieldDropdown([
            ["1", "1"],
            ["2", "2"],
            ["3", "3"],
            ["4", "4"],
            ["5", "5"],
            ["6", "6"],
            ["7", "7"]
          ]),
            "textSize");
        this.appendDummyInput()
          .appendField("color")
          .appendField(new Blockly.FieldColour("#000000"), "COLOR");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("display string at x,y");
        this.setHelpUrl("");
      }
    };

	Blockly.Blocks['basic_TFT_print_TH'] = {
		init: function () {
			this.appendDummyInput()
				.appendField("TFT print fonts Thai x:")
			this.appendValueInput('X')
				.setCheck("Number")
			this.appendDummyInput()
				.appendField("y:")
			this.appendValueInput('Y')
				.setCheck("Number")
			this.appendValueInput('TEXT')
				.appendField("message:")
				.setCheck("String")
			this.appendDummyInput()
				.appendField("fonts:")
				.appendField(new Blockly.FieldDropdown([
					["Kanit-Regular-9", "KN_R_09"],
					["Kanit-Regular-12", "KN_R_12"],
					["Kanit-Regular-18", "KN_R_18"],
					["Kanit-Regular-24", "KN_R_24"],
					["Kanit-Bold-9", "KN_B_09"],
					["Kanit-Bold-12", "KN_B_12"],
					["Kanit-Bold-18", "KN_B_18"],
					["Kanit-Bold-24", "KN_B_24"],
					["THSarabunNew-Regular-8", "TH_R_08"],
					["THSarabunNew-Regular-9", "TH_R_09"],
					["THSarabunNew-Regular-10", "TH_R_10"],
          ["THSarabunNew-Regular-12", "TH_R_12"],
          ["THSarabunNew-Regular-14", "TH_R_14"],
          ["THSarabunNew-Regular-16", "TH_R_16"],
          ["THSarabunNew-Regular-18", "TH_R_18"],
					["THSarabunNew-Bold-8", "TH_B_8"],
					["THSarabunNew-Bold-9", "TH_B_9"],
					["THSarabunNew-Bold-10", "TH_B_10"],
          ["THSarabunNew-Bold-12", "TH_B_12"],
          ["THSarabunNew-Bold-14", "TH_B_14"],
          ["THSarabunNew-Bold-16", "TH_B_16"],
          ["THSarabunNew-Bold-18", "TH_B_18"]
        ]), "sText")
				.appendField("Text Color:")
				.appendField(new Blockly.FieldColour('#ffffff'), 'tColor')
				.appendField("Background Color:")
				.appendField(new Blockly.FieldColour('#000000'), 'bColor');
			this.setInputsInline(true);
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(230);
			this.setTooltip("display thai fonts");
			this.setHelpUrl("");
		}
	};
	
    Blockly.Blocks["tft_display_draw_line"] = {
      init: function () {
        this.appendValueInput("x0")
          // .appendField(new Blockly.FieldImage("https://www.flaticon.com/premium-icon/icons/svg/1163/1163412.svg", 20, 20, "*"))
          .setCheck("Number")
          .appendField("draw line from (X");
        this.appendValueInput("y0")
          .setCheck("Number")
          .appendField(",Y");
        this.appendValueInput("x1")
          .setCheck("Number")
          .appendField(")  to  (X");
        this.appendValueInput("y1")
          .setCheck("Number")
          .appendField(",Y");
        this.appendDummyInput()
          .appendField(")");
        this.appendDummyInput()
          .appendField("color")
          .appendField(new Blockly.FieldColour("#FF0000"), "COLOR");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("draw line from (x0,y0) to (x1,y1)");
        this.setHelpUrl("");
      }
    };

    Blockly.Blocks["tft_display_draw_rect"] = {
      init: function () {
        this.appendValueInput("x")
          // .appendField(new Blockly.FieldImage("https://www.flaticon.com/premium-icon/icons/svg/1163/1163412.svg", 20, 20, "*"))
          .setCheck("Number")
          .appendField("draw rectangle at (X");
        this.appendValueInput("y")
          .setCheck("Number")
          .appendField(", Y");
        this.appendValueInput("width")
          .setCheck("Number")
          .appendField(")  width");
        this.appendValueInput("height")
          .setCheck("Number")
          .appendField(" height");
        this.appendDummyInput()
          .appendField("color")
          .appendField(new Blockly.FieldColour("#00FF00"), "COLOR");
        this.appendDummyInput()
          .appendField(" fill ")
          .appendField(new Blockly.FieldCheckbox("FALSE"), "fill");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("draw rectangle to display");
        this.setHelpUrl("");
      }
    };

    Blockly.Blocks["tft_display_draw_circle"] = {
      init: function () {
        this.appendValueInput("x")
          // .appendField(new Blockly.FieldImage("https://www.flaticon.com/premium-icon/icons/svg/1163/1163412.svg", 20, 20, "*"))
          .setCheck("Number")
          .appendField("draw circle at (X");
        this.appendValueInput("y")
          .setCheck("Number")
          .appendField(",Y");
        this.appendValueInput("r")
          .setCheck("Number")
          .appendField(")  radius");
        this.appendDummyInput()
          .appendField("color")
          .appendField(new Blockly.FieldColour("#0000FF"), "COLOR");
        this.appendDummyInput()
          .appendField(" fill")
          .appendField(new Blockly.FieldCheckbox("FALSE"), "fill");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("draw circle on screen");
        this.setHelpUrl("");
      }
    };

    Blockly.Blocks["i2c128x64_display_draw_progress_bar"] = {
      init: function () {
        this.appendValueInput("x")
          // .appendField(new Blockly.FieldImage("https://www.flaticon.com/premium-icon/icons/svg/1163/1163412.svg", 20, 20, "*"))
          .setCheck("Number")
          .appendField("draw progress bar at (X");
        this.appendValueInput("y")
          .setCheck("Number")
          .appendField(",Y");
        this.appendValueInput("width")
          .setCheck("Number")
          .appendField(")  width");
        this.appendValueInput("height")
          .setCheck("Number")
          .appendField("  height");
        this.appendValueInput("progress")
          .setCheck("Number")
          .appendField("  progress");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("draw progress bar on the screen");
        this.setHelpUrl("");
      }
    };

    Blockly.Blocks["i2c128x64_display_draw_pixel"] = {
      init: function () {
        this.appendValueInput("x")
          // .appendField(new Blockly.FieldImage("https://www.flaticon.com/premium-icon/icons/svg/1163/1163412.svg", 20, 20, "*"))
          .setCheck("Number")
          .appendField("draw pixel (X");
        this.appendValueInput("y")
          .setCheck("Number")
          .appendField(",Y");
        this.appendDummyInput()
          .appendField(") color")
          .appendField(new Blockly.FieldColour("#000000"), "COLOR");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("set pixel color");
        this.setHelpUrl("");
      }
    };

    Blockly.Blocks["i2c128x64_display_string_width"] = {
      init: function () {
        this.appendValueInput("text")
          // .appendField(new Blockly.FieldImage("https://www.flaticon.com/premium-icon/icons/svg/1163/1163412.svg", 20, 20, "*"))
          .setCheck("String")
          .appendField("get pixel width of string");
        this.setInputsInline(true);
        this.setOutput(true, "Number");
        this.setColour(230);
        this.setTooltip("get pixel width from given string");
        this.setHelpUrl("");
      }
    };

    Blockly.Blocks["i2c128x64_display_width"] = {
      init: function () {
        this.appendDummyInput()
          // .appendField(new Blockly.FieldImage("https://www.flaticon.com/premium-icon/icons/svg/1163/1163412.svg", 20, 20, "*"))
          .appendField("get screen width");
        this.setOutput(true, "Number");
        this.setColour(230);
        this.setTooltip("get screen size width in pixel");
        this.setHelpUrl("");
      }
    };

    Blockly.Blocks["i2c128x64_display_height"] = {
      init: function () {
        this.appendDummyInput()
          // .appendField(new Blockly.FieldImage("https://www.flaticon.com/premium-icon/icons/svg/1163/1163412.svg", 20, 20, "*"))
          .appendField("get screen height");
        this.setOutput(true, "Number");
        this.setColour(230);
        this.setTooltip("get display screen height in pixel");
        this.setHelpUrl("");
      }
    };

  };
