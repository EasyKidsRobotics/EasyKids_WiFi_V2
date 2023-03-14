module.exports = function(Blockly){
  
  // =============================================================================
  // EasyKidsRobotics
  // =============================================================================


  Blockly.JavaScript['Robot_Setup'] = function(block) {
    //var dropdown_sw = block.getFieldValue('swpin');
    // TODO: Assemble JavaScript into code variable.
    var code = `
    #EXTINC #include <esp_now.h> #END
    #FUNCTION 
    typedef struct struct_message {
      int rightJoyXvalue;
      int rightJoyYvalue;
      int rightJoySWvalue;
      int leftJoyXvalue;
      int leftJoyYvalue;
      int leftJoySWvalue;
    } struct_message;
    
    int FB;
    int LR;
    int FB1;
    int LR1;
    int moveBackward;
    
    int rotateRight;
    int moveSidewaysRight;
    int moveSidewaysLeft;
    
    // Create a struct_message called myData
    struct_message readingData;
    
    // callback function that will be executed when data is received
    void OnDataRecv(const uint8_t * mac, const uint8_t *incomingData, int len) {
      memcpy(&readingData, incomingData, sizeof(readingData));
    
      LR = map(readingData.leftJoyXvalue, 0, 4092, -180, 180);
      FB = map(readingData.leftJoyYvalue, 0, 4092, -255, 255);
      LR1 = map(readingData.rightJoyXvalue, 0, 4092, -180, 180);
      FB1 = map(readingData.rightJoyYvalue, 0, 4092, -255, 255);
      int speedMLR = LR ;
      int speedMFB = FB ;
      int speedMLR1 = LR1;
      int speedMFB1 = FB1;
    
    
      if (LR > 50) {
        ledcWrite(1, 0);
        ledcWrite(2, speedMLR-100);
        ledcWrite(3, speedMLR-100);
        ledcWrite(4, 0);
      }
      else if (LR1 > 50) {
        ledcWrite(1, 0);
        ledcWrite(2, speedMLR1-100);
        ledcWrite(3, speedMLR1-100);
        ledcWrite(4, 0);
      }
      else if (LR < -50) {
    
        ledcWrite(1, (speedMLR * -1));
        ledcWrite(2, 0);
        ledcWrite(3, 0);
        ledcWrite(4, (speedMLR * -1));
      }
      else if (LR1 < -50) {
    
        ledcWrite(1,(speedMLR1 * -1));
        ledcWrite(2, 0);
        ledcWrite(3, 0);
        ledcWrite(4, (speedMLR1 * -1));
      }
      else if (FB < -50) {
    
        ledcWrite(1, speedMFB * -1);
        ledcWrite(2, 0);
        ledcWrite(3,  speedMFB * -1);
        ledcWrite(4, 0);
      }
      else if (FB1 < -50) {
    
        ledcWrite(1, speedMFB1 * -1);
        ledcWrite(2, 0);
        ledcWrite(3,  speedMFB1 * -1);
        ledcWrite(4, 0);
      }
      else if (FB > 50) {
        ledcWrite(1, 0);
        ledcWrite(2, speedMFB);
        ledcWrite(3, 0);
        ledcWrite(4, speedMFB);
      }
      else if  (FB1 > 50) {
        ledcWrite(1, 0);
        ledcWrite(2, speedMFB1);
        ledcWrite(3, 0);
        ledcWrite(4, speedMFB1);
      }
    
      else {
        ledcWrite(1, 255);
        ledcWrite(2, 255);
        ledcWrite(3, 255);
        ledcWrite(4, 255);
      }
    
    }
    #END
    WiFi.mode(WIFI_STA);

    // Init ESP-NOW
    if (esp_now_init() != ESP_OK) {
    Serial.println("Error initializing ESP-NOW");
    return;
    }

    // Once ESPNow is successfully Init, we will register for recv CB to
    // get recv packer info
    esp_now_register_recv_cb(OnDataRecv);

    `;
    // TODO: Change ORDER_NONE to the correct strength.
    //return [code, Blockly.JavaScript.ORDER_NONE];
    return code;
  };
  Blockly.JavaScript['Read_Mac_Address'] = function(block) {
    //var dropdown_pinreadio = block.getFieldValue('PINReadIO');
    // TODO: Assemble JavaScript into code variable.
    var code = `WiFi.macAddress()
    
    
    
    
    `;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code];
  };
  Blockly.JavaScript['JoyStick_Setup'] = function (block) {
    var MAC = Blockly.JavaScript.valueToCode(block, 'text', Blockly.JavaScript.ORDER_ATOMIC);
    var code = `
    #EXTINC #include <esp_now.h> #END
    #FUNCTION
    #define rightJoyX     32
    #define rightJoyY     35
    #define rightJoySW    26
    #define leftJoyX      34
    #define leftJoyY      33
    #define leftJoySW     25
    int rightJoyXstate;
    int rightJoyYstate;
    int rightJoySWstate;
    int leftJoyXstate;
    int leftJoyYstate;
    int leftJoySWstate;
    uint8_t broadcastAddress[] = {0x94, 0xB5, 0x55, 0x15, 0x8C, 0xE0};
    typedef struct struct_message {
      int rightJoyXvalue;
      int rightJoyYvalue;
      int rightJoySWvalue;
    
      int leftJoyXvalue;
      int leftJoyYvalue;
      int leftJoySWvalue;
    
    } struct_message;
    
    // Create a struct_message called myData
    struct_message handControllerData;
    
    esp_now_peer_info_t peerInfo;
    // callback when data is sent
    void OnDataSent(const uint8_t *mac_addr, esp_now_send_status_t status) {
    //Serial.print("\r\nLast Packet Send Status:\t");
    // Serial.println(status == ESP_NOW_SEND_SUCCESS ? "Delivery Success" : "Delivery Fail");
    }
    #END
    #SETUP
    pinMode(rightJoyX, INPUT);
    pinMode(rightJoyY, INPUT);
    pinMode(rightJoySW, INPUT);

    pinMode(leftJoyX, INPUT);
    pinMode(leftJoyY, INPUT);
    pinMode(leftJoySW, INPUT);
    
    WiFi.mode(WIFI_STA);

    // Init ESP-NOW
    if (esp_now_init() != ESP_OK) {
      Serial.println("Error initializing ESP-NOW");
      return;
    }
    // Once ESPNow is successfully Init, we will register for Send CB to
    // get the status of Trasnmitted packet
    esp_now_register_send_cb(OnDataSent);
    // Register peer
    memcpy(peerInfo.peer_addr, broadcastAddress, 6);
    peerInfo.channel = 0;
    peerInfo.encrypt = false;
    // Add peer
    if (esp_now_add_peer(&peerInfo) != ESP_OK) {
      Serial.println("Failed to add peer");
      return;
    }
    #END
    rightJoyXstate = analogRead(rightJoyX);
    handControllerData.rightJoyXvalue = rightJoyXstate;
    rightJoyYstate = analogRead(rightJoyY);
    handControllerData.rightJoyYvalue = rightJoyYstate;
    rightJoySWstate = digitalRead(rightJoySW);
    handControllerData.rightJoySWvalue = rightJoySWstate;

    leftJoyXstate = analogRead(leftJoyX);
    handControllerData.leftJoyXvalue = leftJoyXstate;
    leftJoyYstate = analogRead(leftJoyY);
    handControllerData.leftJoyYvalue = leftJoyYstate;
    leftJoySWstate = digitalRead(leftJoySW);
    handControllerData.leftJoySWvalue = leftJoySWstate;

    // Send message via ESP-NOW
    esp_err_t result = esp_now_send(broadcastAddress, (uint8_t *) &handControllerData, sizeof(handControllerData));
    if (result == ESP_OK) {
      //Serial.println("Sent with success");
    }
    else {
      Serial.println("Error sending the data");
    }
    mac = ${MAC}; \n`;
    return code;
  };
}