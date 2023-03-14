module.exports = function(Blockly){
  
  // =============================================================================
  // EasyKidsRobotics
  // =============================================================================

// Blockly.JavaScript['easykbbegin'] = function(block) {
//   var text_adds = block.getFieldValue('ADDS');
//   // TODO: Assemble JavaScript into code variable.
//   var code =
//       `
// #EXTINC#include <Wire.h>#END
// #EXTINC#include <EasyKB.h>#END

// #VARIABLE
// EasyKB KB1;
// #END
// KB1.begin(0x42);
// \n
// `;
//   return code;
// };

Blockly.JavaScript['easykb_setuppin'] = function(block) {
  var dropdown_pinio = block.getFieldValue('PINIO');
  var dropdown_mode = block.getFieldValue('MODE');
  // TODO: Assemble JavaScript into code variable.
  var code = `pinMode(${dropdown_pinio},${dropdown_mode});\n`;
  return code;
};

Blockly.JavaScript['easykb_writeio'] = function(block) {
  var dropdown_easykb_writeiopin = block.getFieldValue('EasyKB WriteIOPIN');
  var dropdown_logic = block.getFieldValue('Logic');
  // TODO: Assemble JavaScript into code variable.
  var code = `digitalWrite(${dropdown_easykb_writeiopin},${dropdown_logic});\n`;
  return code;
};

Blockly.JavaScript['easykb_readadc'] = function(block) {
  var dropdown_pinadc = block.getFieldValue('PINADC');
  // TODO: Assemble JavaScript into code variable.
  var code = `analogRead(${dropdown_pinadc})`;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

// Blockly.JavaScript['easykb_readadcmv'] = function(block) {
//   var dropdown_pinadc = block.getFieldValue('PINADC');
//   // TODO: Assemble JavaScript into code variable.
//   var code = `KB1.ReadadcmV(${dropdown_pinadc})`;
//   // TODO: Change ORDER_NONE to the correct strength.
//   return [code, Blockly.JavaScript.ORDER_NONE];
// };

Blockly.JavaScript['easykb_readio'] = function(block) {
  var dropdown_pinreadio = block.getFieldValue('PINReadIO');
  // TODO: Assemble JavaScript into code variable.
  var code = `digitalRead(${dropdown_pinreadio})`;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};
Blockly.JavaScript['easykb_readsw'] = function(block) {
  //var dropdown_pinreadio = block.getFieldValue('PINReadIO');
  // TODO: Assemble JavaScript into code variable.
  var code = `digitalRead(0)`;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};
Blockly.JavaScript['easykb_sw'] = function(block) {
  //var dropdown_sw = block.getFieldValue('swpin');
  // TODO: Assemble JavaScript into code variable.
  var code = `
  #SETUP pinMode(0,INPUT);#END
  while(digitalRead(0) == 1){}`;
  // TODO: Change ORDER_NONE to the correct strength.
  //return [code, Blockly.JavaScript.ORDER_NONE];
  return code;
};

Blockly.JavaScript['easykb_vr'] = function(block) {
  var value_pin = Blockly.JavaScript.valueToCode(block, 'pin', Blockly.JavaScript.ORDER_ATOMIC);  
  var code = `
  #FUNCTION
      int vr(int a){
      int valueVr = analogRead(34);
      int mapValue = map(valueVr,0,4095,0,a);
      return mapValue;
    }
  #END
  vr(${value_pin})
  `
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['easykb_pwm_write'] = function(block) {
  var value_pin = block.getFieldValue('pin');
  var value_value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);
  var number_timer = block.getFieldValue('timer');
  var code = `
    #SETUP  ledcSetup(${number_timer}, 5000, 8);#END
    #SETUP  ledcAttachPin(${value_pin}, ${number_timer});#END

    int val = ${value_value};
    val = map(val, 0, 100, 0, 255);
    ledcWrite(${number_timer}, val);
  `;
  return code;
};

Blockly.JavaScript['easykb_motor'] = function(block) {
  var value_easykb_motor = block.getFieldValue('EasyKB MotorNumber');
  var value_easykb_motor1dir = block.getFieldValue('EasyKB MotorDIR');
  var value_easykb_motor1speed = Blockly.JavaScript.valueToCode(block, 'EasyKB MotorSPEED', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = `KB1.Motor${value_easykb_motor}(${value_easykb_motor1dir},${value_easykb_motor1speed});\n`;
  return code;
};

  // #############################  DC Motor  ##################################
//   Blockly.JavaScript['easy_dc_init'] = function (block) {

//     var code =
//       `
// #VARIABLE
// #define _EN_A  16
// #define _EN_B  17
// #define _EN_C  18
// #define _EN_D  19
// #define _MotorA_ch  5
// #define _MotorB_ch  6
// #define _MotorC_ch  7
// #define _MotorD_ch  8
// int m1 = 0;
// int m2 = 0;
// int m3 = 0;
// int m4 = 0;
// #END

// ledcSetup(_MotorA_ch, 5000, 8);
// ledcAttachPin(_EN_A, _MotorA_ch);
// ledcSetup(_MotorB_ch, 5000, 8);
// ledcAttachPin(_EN_B, _MotorB_ch);
// ledcSetup(_MotorC_ch, 5000, 8);
// ledcAttachPin(_EN_C, _MotorC_ch);
// ledcSetup(_MotorD_ch, 5000, 8);
// ledcAttachPin(_EN_D, _MotorD_ch);\n`;
//     return code;
//   };
  Blockly.JavaScript['easy_motor_forward'] = function (block) {
  var number_speed1 = Blockly.JavaScript.valueToCode(block, 'SPEED1', Blockly.JavaScript.ORDER_ATOMIC);
  var number_speed2 = Blockly.JavaScript.valueToCode(block, 'SPEED2', Blockly.JavaScript.ORDER_ATOMIC);
  var code = `
      m1 = ${number_speed1};
      m1 = map(m1, 0, 100, 0, 255);
      ledcWrite(_MotorA_ch, 0);
      ledcWrite(_MotorB_ch, m1);;
      m2 = ${number_speed2};
      m2 = map(m2, 0, 100, 0, 255);
      ledcWrite(_MotorC_ch, 0);
      ledcWrite(_MotorD_ch, m2);\n`;
  return code;
  };

  Blockly.JavaScript['easy_motor_backward'] = function (block) {
    var number_speed1 = Blockly.JavaScript.valueToCode(block, 'SPEED1', Blockly.JavaScript.ORDER_ATOMIC);
    var number_speed2 = Blockly.JavaScript.valueToCode(block, 'SPEED2', Blockly.JavaScript.ORDER_ATOMIC);
    var code = `
        m1 = ${number_speed1};
        m1 = map(m1, 0, 100, 0, 255);
        ledcWrite(_MotorA_ch, m1);
        ledcWrite(_MotorB_ch, 0);;
        m2 = ${number_speed2};
        m2 = map(m2, 0, 100, 0, 255);
        ledcWrite(_MotorC_ch, m2);
        ledcWrite(_MotorD_ch, 0);\n`;
    return code;
    };

  Blockly.JavaScript['easy_dc_forward'] = function (block) {
    var number_speed = Blockly.JavaScript.valueToCode(block, 'SPEED', Blockly.JavaScript.ORDER_ATOMIC);
    var code = `
m1 = ${number_speed};
m1 = map(m1, 0, 100, 0, 255);
ledcWrite(_MotorA_ch, 0);
ledcWrite(_MotorB_ch, m1);\n`;
    return code;
  };

  Blockly.JavaScript['easy_dc_forward2'] = function (block) {
    var number_speed = Blockly.JavaScript.valueToCode(block, 'SPEED', Blockly.JavaScript.ORDER_ATOMIC);
    var code = `
m3 = ${number_speed};
m3 = map(m3, 0, 100, 0, 255);
ledcWrite(_MotorC_ch, 0);
ledcWrite(_MotorD_ch, m3);\n`;
    return code;
  };

  Blockly.JavaScript['easy_dc_backward'] = function (block) {
    var number_speed = Blockly.JavaScript.valueToCode(block, 'SPEED', Blockly.JavaScript.ORDER_ATOMIC);
    var code = `
m2 = ${number_speed};
m2 = map(m2, 0, 100, 0, 255);
ledcWrite(_MotorA_ch, m2);
ledcWrite(_MotorB_ch, 0);\n`;
    return code;
  };

  Blockly.JavaScript['easy_dc_backward2'] = function (block) {
    var number_speed = Blockly.JavaScript.valueToCode(block, 'SPEED', Blockly.JavaScript.ORDER_ATOMIC);
    var code = `
m4 = ${number_speed};
m4 = map(m4, 0, 100, 0, 255);
ledcWrite(_MotorC_ch, m4);
ledcWrite(_MotorD_ch, 0);\n`;
    return code;
  };

Blockly.JavaScript['easykb_spinleft'] = function(block) {
  var number_speed = Blockly.JavaScript.valueToCode(block, 'SPEED', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = `
    speedm = ${number_speed};
    speedm = map(speedm, 0, 100, 0, 255);
    ledcWrite(_MotorA_ch, speedm);
    ledcWrite(_MotorB_ch, 0);
    ledcWrite(_MotorC_ch, 0);
    ledcWrite(_MotorD_ch, speedm);\n`;
    return code;
  };

  Blockly.JavaScript['easykb_spinright'] = function(block) {
    var number_speed = Blockly.JavaScript.valueToCode(block, 'SPEED', Blockly.JavaScript.ORDER_ATOMIC);
      // TODO: Assemble JavaScript into code variable.
      var code = `
      speedm = ${number_speed};
      speedm = map(speedm, 0, 100, 0, 255);
      ledcWrite(_MotorA_ch, 0);
      ledcWrite(_MotorB_ch, speedm);
      ledcWrite(_MotorC_ch, speedm);
      ledcWrite(_MotorD_ch, 0);\n`;
      return code;
    };

  Blockly.JavaScript['easy_dc_stop'] = function (block) {
    var checkbox_fill = block.getFieldValue("fill") == "TRUE";

    if (checkbox_fill) {
      var code = `
      ledcWrite(_MotorA_ch, 0);
      ledcWrite(_MotorB_ch, 0);
      ledcWrite(_MotorC_ch, 0);
      ledcWrite(_MotorD_ch, 0);\n`;
    } else {
      var code = `
      ledcWrite(_MotorA_ch, 255);
      ledcWrite(_MotorB_ch, 255);
      ledcWrite(_MotorC_ch, 255);
      ledcWrite(_MotorD_ch, 255);\n`;
    }
    return code;
  };

//   Blockly.JavaScript['easy_dc_free'] = function (block) {
//     var code = `
// ledcWrite(_MotorA_ch, 0);
// ledcWrite(_MotorB_ch, 0);
// ledcWrite(_MotorC_ch, 0);
// ledcWrite(_MotorD_ch, 0);\n`;
//     return code;
//   };

// Blockly.JavaScript['easykb_extmotor'] = function(block) {
//   var value_easykb_extmotor = block.getFieldValue('EasyKB extMotorNumber');
//   var value_easykb_extmotor1dir = block.getFieldValue('EasyKB extMotorDIR');
//   var value_easykb_extmotor1speed = Blockly.JavaScript.valueToCode(block, 'EasyKB extMotorSPEED', Blockly.JavaScript.ORDER_ATOMIC);
//   // TODO: Assemble JavaScript into code variable.
//   var code = `KB1.Motor${value_easykb_extmotor}(${value_easykb_extmotor1dir},${value_easykb_extmotor1speed});\n`;
//   return code;
// };
Blockly.JavaScript['easykb_motor1_stop'] = function(block) { 
  // TODO: Assemble JavaScript into code variable.
  var code = `
  ledcWrite(_MotorA_ch, 0);
  ledcWrite(_MotorB_ch, 0);\n`;
  
  return code;
};

Blockly.JavaScript['easykb_motor2_stop'] = function(block) { 
  // TODO: Assemble JavaScript into code variable.
  var code = `
  ledcWrite(_MotorC_ch, 0);
  ledcWrite(_MotorD_ch, 0);\n`;
  return code;
};


Blockly.JavaScript['easymotorstopall'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = `
  ledcWrite(_MotorA_ch, 255);
  ledcWrite(_MotorB_ch, 255);
  ledcWrite(_MotorC_ch, 255);
  ledcWrite(_MotorD_ch, 255);\n`;
  return code;
};

// Blockly.JavaScript['easykb_servowritem'] = function(block) {
//   var dropdown_pinservo = block.getFieldValue('PINServo');
//   var value_easykb_servowritemvalue = Blockly.JavaScript.valueToCode(block, 'EasyKB ServowriteMvalue', Blockly.JavaScript.ORDER_ATOMIC);
//   // TODO: Assemble JavaScript into code variable.
//   var code = `KB1.ServowriteM(${dropdown_pinservo},${value_easykb_servowritemvalue});\n`;
//   return code;
// };
// }

// Blockly.JavaScript['easykb_servowritem'] = function(block) {
//   var dropdown_pinservo = block.getFieldValue('PINServo');
//   var value_easykb_servowritemvalue = Blockly.JavaScript.valueToCode(block, 'EasyKB ServowriteMvalue', Blockly.JavaScript.ORDER_ATOMIC);
//   // TODO: Assemble JavaScript into code variable.
//   var code = `KB1.ServowriteM(${dropdown_pinservo},${value_easykb_servowritemvalue});\n`;
//   return code;
// };
// }


Blockly.JavaScript['easykb_servo'] = function(block) {
  var dropdown_pinservo = block.getFieldValue('pin');
  var value_servo = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);
  if(dropdown_pinservo == 1){
    dropdown_pinservo = 1;
  }
  if(dropdown_pinservo == 2){
    dropdown_pinservo = 2;
  }
  if(dropdown_pinservo == 3){
    dropdown_pinservo = 3;
  }
  if(dropdown_pinservo == 4){
    dropdown_pinservo = 4;
  }
  var code = `
  Servo${dropdown_pinservo}.write(${value_servo});\n`;
  return code;
};

}