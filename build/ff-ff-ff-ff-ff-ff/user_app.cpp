#include <Arduino.h>
#include <vector>
#include <WiFi.h>
#include <Wire.h>
#include "Servo.h"
#include "SPI.h"

#define REMOTEXY_MODE__ESP32CORE_WIFI_POINT
#include <RemoteXY.h>
#define REMOTEXY_WIFI_SSID "EasyKids_Controller"
#define REMOTEXY_WIFI_PASSWORD "12345678"
#define REMOTEXY_SERVER_PORT 6377
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


void setup()
{
Servo1.attach(19);
Servo2.attach(21);
Servo3.attach(5);
Servo4.attach(25);

ledcSetup(_MotorA_ch, 1000, 8);
ledcAttachPin(_EN_A, _MotorA_ch);
ledcSetup(_MotorB_ch, 1000, 8);
ledcAttachPin(_EN_B, _MotorB_ch);
ledcSetup(_MotorC_ch, 1000, 8);
ledcAttachPin(_EN_C, _MotorC_ch);
ledcSetup(_MotorD_ch, 1000, 8);
ledcAttachPin(_EN_D, _MotorD_ch);
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
tft.begin();
        tft.setRotation(0);
        tft.fillScreen(0xffff);

        // tft.setTextFont(GLCD);
        tft.setTextSize(4);
        tft.setCursor(65, 65);
        tft.setTextColor(0x367f);
        tft.println(String("ROBOT "));

        // tft.setTextFont(GLCD);
        tft.setTextSize(4);
        tft.setCursor(65, 62);
        tft.setTextColor(0x319f);
        tft.println(String("ROBOT "));

        // tft.setTextFont(GLCD);
        tft.setTextSize(4);
        tft.setCursor(80, 110);
        tft.setTextColor(0x9cdf);
        tft.println(String("WiFi"));

        // tft.setTextFont(GLCD);
        tft.setTextSize(4);
        tft.setCursor(80, 107);
        tft.setTextColor(0x6019);
        tft.println(String("WiFi"));

        // tft.setTextFont(GLCD);
        tft.setTextSize(4);
        tft.setCursor(43, 150);
        tft.setTextColor(0xfcdf);
        tft.println(String("Control"));

        // tft.setTextFont(GLCD);
        tft.setTextSize(4);
        tft.setCursor(43, 147);
        tft.setTextColor(0xf800);
        tft.println(String("Control"));
  
}
void loop()
{
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
          ledcWrite(_MotorA_ch, 0);
          ledcWrite(_MotorB_ch, m1);
          ;
          m2 = 50;
          m2 = map(m2, 0, 100, 0, 255);
          ledcWrite(_MotorC_ch, 0);
          ledcWrite(_MotorD_ch, m2);
        } else if (remote_xy_Read(9) < -50) {
          m1 = 50;
          m1 = map(m1, 0, 100, 0, 255);
          ledcWrite(_MotorA_ch, m1);
          ledcWrite(_MotorB_ch, 0);
          ;
          m2 = 50;
          m2 = map(m2, 0, 100, 0, 255);
          ledcWrite(_MotorC_ch, m2);
          ledcWrite(_MotorD_ch, 0);
        } else {
          ledcWrite(_MotorA_ch, 255);
          ledcWrite(_MotorB_ch, 255);
          ledcWrite(_MotorC_ch, 255);
          ledcWrite(_MotorD_ch, 255);
        }
        //delay(10);

  
}