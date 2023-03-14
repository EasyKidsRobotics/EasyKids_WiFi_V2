const dirIcon = Vue.prototype.$global.board.board_info.dir;
module.exports = function (Blockly) {
  "use strict";

  let remotexy_username = "";
  let remotexy_password = "";

  Blockly.JavaScript["remote_xy_begin"] = function (block) {
    var text_remotexy_username = block.getFieldValue("USERNAME");
    var text_remotexy_password = block.getFieldValue("PASSWORD");
    var text_remotexy_port = block.getFieldValue("PORT");
    //var text_mqtt_client_id = block.getFieldValue("MQTT_CLIENT_ID");

    remotexy_username = text_remotexy_username;
    remotexy_password = text_remotexy_password;

    // TODO: Assemble JavaScript into code variable.
    var code = `
    #EXTINC #define REMOTEXY_MODE__ESP32CORE_WIFI_POINT #END
    #EXTINC #include <RemoteXY.h> #END
    #EXTINC #define REMOTEXY_WIFI_SSID "${text_remotexy_username}" #END
    #EXTINC #define REMOTEXY_WIFI_PASSWORD "${text_remotexy_password}" #END
    #EXTINC #define REMOTEXY_SERVER_PORT ${text_remotexy_port} #END

    #FUNCTION
    // RemoteXY configurate  
    #pragma pack(push, 1)
    uint8_t RemoteXY_CONF[] =   // 54 bytes
      { 255,9,0,0,0,47,0,16,8,0,1,1,2,2,17,17,78,31,0,1,
      1,81,2,17,17,78,31,0,6,0,34,2,33,33,27,26,5,32,68,31,
      30,30,176,26,31,5,32,2,31,30,30,176,26,31 };
      
    // this structure defines all the variables and events of your control interface 
    struct {

      // input variables
      uint8_t button_1; // =1 if button pressed, else =0 
      uint8_t button_2; // =1 if button pressed, else =0 
      uint8_t rgb_r; // =0..255 Red color value 
      uint8_t rgb_g; // =0..255 Green color value 
      uint8_t rgb_b; // =0..255 Blue color value 
      int8_t joy2_x; // from -100 to 100  
      int8_t joy2_y; // from -100 to 100  
      int8_t joy1_x; // from -100 to 100  
      int8_t joy1_y; // from -100 to 100  

        // other variable
      uint8_t connect_flag;  // =1 if wire connected, else =0 

    } RemoteXY;

    #pragma pack(pop)

    float remote_xy_Read (uint8_t index){
      float tmp = -1;

      switch(index){
        case 1:
          tmp = RemoteXY.button_1;
          break;
        case 2:
          tmp = RemoteXY.button_2;
          break;
        case 3:
          tmp = RemoteXY.rgb_r;
          break;
        case 4:
          tmp = RemoteXY.rgb_g;
          break;
        case 5:
          tmp = RemoteXY.rgb_b;
          break;
        case 6:
          tmp = RemoteXY.joy2_x;
          break;
        case 7:
          tmp = RemoteXY.joy2_y;
          break;
        case 8:
          tmp = RemoteXY.joy1_x;
          break;
        case 9:
          tmp = RemoteXY.joy1_y;
          break;
      }

      return tmp;
    }

    void xy_handle(void* pvParameters)  // This is a task.
    {
      (void)pvParameters;
      uint32_t start_time = xTaskGetTickCount();
      for (;;)
      {
        RemoteXY_Handler();
        vTaskDelayUntil(&start_time, 30);
      }
    }
    /////////////////////////////////////////////
    //           END RemoteXY include          //
    /////////////////////////////////////////////

    #END

    #SETUP
    // RemoteXY connection settings

    RemoteXY_Init();
    delay(100);

    xTaskCreatePinnedToCore(
      xy_handle
      , "xy_handle"
      , 1024 * 2
      , NULL
      , 1
      , NULL
      , 1);

    #END
    \n
    `;
    return code;
  };



  Blockly.JavaScript['remote_xy_get'] = function (block) {
		return [
			'remote_xy_Read(' + block.getFieldValue('OUTPUT') + ')',
			Blockly.JavaScript.ORDER_ATOMIC
		];
	};

  Blockly.JavaScript['remote_xy_robot_run'] = function (block) {
    // TODO: Assemble JavaScript into code variable.
    var code =
      `
      RemoteXY_Handler();
      if (remote_xy_Read(6) > 50) {
        speedm = 50;
        speedm = map(speedm, 0, 100, 0, 255);
        ledcWrite(_MotorA_ch, 0);
        ledcWrite(_MotorB_ch, speedm);
        ledcWrite(_MotorC_ch, speedm);
        ledcWrite(_MotorD_ch, 0);
      } else if (remote_xy_Read(6) < -50) {
        speedm = 50;
        speedm = map(speedm, 0, 100, 0, 255);
        ledcWrite(_MotorA_ch, speedm);
        ledcWrite(_MotorB_ch, 0);
        ledcWrite(_MotorC_ch, 0);
        ledcWrite(_MotorD_ch, speedm);
      } else if (remote_xy_Read(9) > 50) {
        m1 = 50;
        m1 = map(m1, 0, 100, 0, 255);
        ledcWrite(_MotorA_ch, m1);
        ledcWrite(_MotorB_ch, 0);
        ;
        m2 = 50;
        m2 = map(m2, 0, 100, 0, 255);
        ledcWrite(_MotorC_ch, m2);
        ledcWrite(_MotorD_ch, 0);
      } else if (remote_xy_Read(9) < -50) {
        m1 = 50;
        m1 = map(m1, 0, 100, 0, 255);
        ledcWrite(_MotorA_ch, 0);
        ledcWrite(_MotorB_ch, m1);
        ;
        m2 = 50;
        m2 = map(m2, 0, 100, 0, 255);
        ledcWrite(_MotorC_ch, 0);
        ledcWrite(_MotorD_ch, m2);
      } else {
        ledcWrite(_MotorA_ch, 255);
        ledcWrite(_MotorB_ch, 255);
        ledcWrite(_MotorC_ch, 255);
        ledcWrite(_MotorD_ch, 255);
      }
      //delay(10);
\n
`;
    return code;
  };

  Blockly.JavaScript['remote_xy_run'] = function (block) {
    // TODO: Assemble JavaScript into code variable.
    var code =
      `
      RemoteXY_Handler();
      //delay(10);
\n
`;
    return code;
  };

};