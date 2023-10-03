#include <Arduino.h>
#include <vector>
#include <WiFi.h>
#include <Wire.h>
#include "Servo.h"
#include "SPI.h"


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
  
  
}
void loop()
{
          m1 = 50;
        m1 = map(m1, 0, 100, 0, 255);
        ledcWrite(_MotorA_ch, 0);
        ledcWrite(_MotorB_ch, m1);;
        m2 = 50;
        m2 = map(m2, 0, 100, 0, 255);
        ledcWrite(_MotorC_ch, 0);
        ledcWrite(_MotorD_ch, m2);
  delay(1000);
          m1 = 50;
          m1 = map(m1, 0, 100, 0, 255);
          ledcWrite(_MotorA_ch, m1);
          ledcWrite(_MotorB_ch, 0);;
          m2 = 50;
          m2 = map(m2, 0, 100, 0, 255);
          ledcWrite(_MotorC_ch, m2);
          ledcWrite(_MotorD_ch, 0);
  delay(1000);

  
}