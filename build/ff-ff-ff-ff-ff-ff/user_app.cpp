#include <Arduino.h>
#include <vector>
#include <WiFi.h>
#include <Wire.h>
#include "Servo.h"
#include "SPI.h"

#include <esp_now.h>
#include "TFT_eSPI.h" //for matrix led
TFT_eSPI tft = TFT_eSPI();

typedef int Number;
typedef int Boolean;
using namespace std;
Servo Servo1;
Servo Servo2;
Servo Servo3;
Servo Servo4;
#define _EN_A  22
#define _EN_B  12
#define _EN_C  16
#define _EN_D  17
#define _MotorA_ch  6
#define _MotorB_ch  7
#define _MotorC_ch  1
#define _MotorD_ch  0
int m1 = 0;
int m2 = 0;
int m3 = 0;
int m4 = 0;
int speedm = 0;



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
        //Serial.print("Bytes received: ");
        // Serial.println(len);

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

          // int speedMLR = LR1;
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
          ledcWrite(3, 0);
          ledcWrite(4, 255);
        }

      }


void setup()
{
Servo1.attach(19);
Servo2.attach(21);
Servo3.attach(5);
Servo4.attach(25);

ledcSetup(_MotorA_ch, 75, 8);
ledcAttachPin(_EN_A, _MotorA_ch);
ledcSetup(_MotorB_ch, 75, 8);
ledcAttachPin(_EN_B, _MotorB_ch);
ledcSetup(_MotorC_ch, 75, 8);
ledcAttachPin(_EN_C, _MotorC_ch);
ledcSetup(_MotorD_ch, 75, 8);
ledcAttachPin(_EN_D, _MotorD_ch);
  
  WiFi.mode(WIFI_STA);

      // Init ESP-NOW
      if (esp_now_init() != ESP_OK) {
      Serial.println("Error initializing ESP-NOW");
      return;
      }

      // Once ESPNow is successfully Init, we will register for recv CB to
      // get recv packer info
      esp_now_register_recv_cb(OnDataRecv);
}
void loop()
{
  
  
}